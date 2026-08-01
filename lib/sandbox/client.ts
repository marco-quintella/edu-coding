import { exec as execCb } from 'node:child_process'
import { promisify } from 'node:util'
import type { ExecResult, SandboxOptions } from './types'

const execAsync = promisify(execCb)

interface SandboxJson {
  id: string
  status: string
  region: string
  environmentId: string
  createdAt: string
  idleTimeoutMinutes: number
}

/**
 * Roda código Python num sandbox efêmero da Railway.
 *
 * Ciclo: create (de checkpoint) → exec → destroy. Para evitar pagar boot quando
 * vários execs acontecem na mesma lição, idealmente o caller mantém 1 sandbox
 * quente e chama `execOnSandbox()` em vez de `runCode()`.
 *
 * Limites medidos:
 *  - Primeiro exec pós-boot: ~12s (FS cache cold)
 *  - Execs subsequentes: ~2s steady-state
 *  - Boot do checkpoint: ~4.6s
 */
export async function runCode(
  code: string,
  options: SandboxOptions
): Promise<ExecResult> {
  const sid = await createSandbox(options.checkpointId, options.env)
  try {
    return await execOnSandbox(sid, code, options)
  } finally {
    await destroySandbox(sid)
  }
}

/**
 * Roda código num sandbox já existente. Mais barato pra execs em sequência.
 */
export async function execOnSandbox(
  sandboxId: string,
  code: string,
  options: SandboxOptions
): Promise<ExecResult> {
  const { timeoutSec = 30, pythonPath = '/opt/venv/bin/python' } = options
  const start = Date.now()

  try {
    const { stdout, stderr } = await execAsync(
      `railway sandbox exec --id ${sandboxId} --timeout ${timeoutSec} -- ${pythonPath} -c ${shellQuote(code)}`,
      { maxBuffer: 1024 * 1024 }
    )
    return {
      stdout,
      stderr,
      exitCode: 0,
      durationMs: Date.now() - start,
    }
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; code?: number; message?: string }
    return {
      stdout: e.stdout ?? '',
      stderr: e.stderr ?? e.message ?? String(err),
      exitCode: e.code ?? 1,
      durationMs: Date.now() - start,
    }
  }
}

export async function createSandbox(
  checkpointId: string,
  env?: Record<string, string>
): Promise<string> {
  const envArgs = env
    ? Object.entries(env)
        .map(([k, v]) => `--variable ${k}=${shellQuote(v)}`)
        .join(' ')
    : ''

  const cmd = `railway sandbox create --checkpoint ${checkpointId} --idle-timeout-minutes 5 --json ${envArgs}`.trim()
  const { stdout } = await execAsync(cmd, { maxBuffer: 64 * 1024 })
  const json = parseJsonFromMixedOutput(stdout)
  if (!json?.id) {
    throw new Error(`Failed to parse sandbox id from: ${stdout.slice(0, 200)}`)
  }
  return json.id
}

export async function destroySandbox(sandboxId: string): Promise<void> {
  try {
    await execAsync(`railway sandbox destroy ${sandboxId}`, { maxBuffer: 16 * 1024 })
  } catch {
    // swallow — destroy failures shouldn't break the user flow
  }
}

/**
 * A CLI mistura warnings (stdout/stderr) com JSON. Estratégia: encontrar o
 * último `{` e parsear até o `}` final balanceado.
 */
function parseJsonFromMixedOutput(output: string): SandboxJson | null {
  const start = output.lastIndexOf('{')
  if (start === -1) return null
  let depth = 0
  for (let i = start; i < output.length; i++) {
    if (output[i] === '{') depth++
    else if (output[i] === '}') {
      depth--
      if (depth === 0) {
        try {
          return JSON.parse(output.slice(start, i + 1)) as SandboxJson
        } catch {
          return null
        }
      }
    }
  }
  return null
}

function shellQuote(s: string): string {
  return `'${s.replace(/'/g, `'\\''`)}'`
}
