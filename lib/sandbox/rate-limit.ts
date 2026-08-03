import { db } from '@/lib/db'
import { execRateLimit } from '@/drizzle/exec-rate-limit.schema'
import { eq, sql } from 'drizzle-orm'

/** Janela fixa: 10 minutos */
const WINDOW_MS = 10 * 60 * 1000
/** Execuções permitidas por janela (generoso; bloqueia só abuso) */
export const WINDOW_LIMIT = 30

/**
 * Verifica e incrementa o contador de execuções para uma chave.
 * Retorna o count atual (0 = primeira execução na janela).
 * `limit` permite sobrescrever o limite por janela (default: WINDOW_LIMIT).
 */
export async function checkRateLimit(
  key: string,
  limit: number = WINDOW_LIMIT
): Promise<{
  allowed: boolean
  count: number
  retryAfterSec?: number
}> {
  const now = Date.now()
  const windowStart = new Date(Math.floor(now / WINDOW_MS) * WINDOW_MS)

  const [row] = await db
    .select()
    .from(execRateLimit)
    .where(eq(execRateLimit.key, key))
    .limit(1)

  // Janela antiga: reseta (mesma chave, janela diferente)
  if (!row || row.windowStart.getTime() !== windowStart.getTime()) {
    return { allowed: true, count: 0 }
  }

  if (row.count >= limit) {
    const retryAfterSec = Math.max(
      1,
      Math.ceil((windowStart.getTime() + WINDOW_MS - now) / 1000),
    )
    return { allowed: false, count: row.count, retryAfterSec }
  }

  return { allowed: true, count: row.count }
}

/**
 * Incrementa o contador após execução bem-sucedida (idempotente por janela).
 */
export async function incrementRateLimit(key: string): Promise<void> {
  const now = Date.now()
  const windowStart = new Date(Math.floor(now / WINDOW_MS) * WINDOW_MS)

  await db
    .insert(execRateLimit)
    .values({ key, windowStart, count: 1 })
    .onConflictDoUpdate({
      target: [execRateLimit.key, execRateLimit.windowStart],
      set: {
        count: sql`${execRateLimit.count} + 1`,
        updatedAt: new Date(),
      },
    })
}
