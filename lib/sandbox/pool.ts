import { createSandbox, destroySandbox, execOnSandbox } from './client'
import type { ExecResult, SandboxOptions } from './types'

/**
 * Warm pool de sandboxes — mantém 1 sandbox "quente" por usuário ativo.
 *
 * O cold start (criar sandbox + primeiro exec) leva ~15s; executar num
 * sandbox já criado leva ~2s. O pool troca esse custo por um keep-alive:
 * o sandbox fica vivo (idle timeout de 5min no create) enquanto o usuário
 * segue executando.
 *
 * Limitação honesta: o pool é em memória (por instância). Em múltiplas
 * instâncias, cada uma tem o seu — ainda assim elimina o cold start para
 * o usuário na maioria dos casos. Para precisão total seria preciso um
 * pool compartilhado (Redis), fora do escopo do MVP.
 */

const warmPool = new Map<string, string>() // userId -> sandboxId

/**
 * Executa código usando o sandbox quente do usuário (cria se necessário).
 * O sandbox NÃO é destruído — volta ao pool.
 */
export async function execWarm(
  userId: string,
  code: string,
  options: SandboxOptions
): Promise<ExecResult> {
  let sid = warmPool.get(userId)

  // Se não tem sandbox quente, cria um
  if (!sid) {
    sid = await createSandbox(options.checkpointId, options.env)
    warmPool.set(userId, sid)
  }

  return execOnSandbox(sid, code, options)
}

/**
 * Encerra o sandbox quente de um usuário (ex: logout, fim de sessão).
 */
export async function releaseWarm(userId: string): Promise<void> {
  const sid = warmPool.get(userId)
  if (sid) {
    await destroySandbox(sid)
    warmPool.delete(userId)
  }
}

/**
 * Estado do pool (debug/monitoramento).
 */
export function poolStats(): { users: number; sandboxes: string[] } {
  return {
    users: warmPool.size,
    sandboxes: [...warmPool.values()],
  }
}

/**
 * Tamanho máximo do pool — evita vazar sandboxes se usuários não saem.
 * Quando o limite é atingido, destrói o sandbox mais antigo (FIFO).
 */
const MAX_POOL_SIZE = 100

export function ensurePoolSize(): void {
  if (warmPool.size <= MAX_POOL_SIZE) return
  const overflow = warmPool.size - MAX_POOL_SIZE
  const entries = [...warmPool.entries()]
  for (let i = 0; i < overflow; i++) {
    const [uid, sid] = entries[i]
    destroySandbox(sid).catch(() => {})
    warmPool.delete(uid)
  }
}
