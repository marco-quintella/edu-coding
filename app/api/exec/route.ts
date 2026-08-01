import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { runCode } from '@/lib/sandbox/client'
import { db } from '@/lib/db'
import { lessons } from '@/lib/db/schema'
import { execUsage } from '@/drizzle/exec-usage.schema'
import { getCurrentUser } from '@/lib/auth/server'
import { ExecRequest } from './schema'

export const runtime = 'nodejs'
export const maxDuration = 60

/** Limite de execuções por user/dia (sandbox é pago!) */
const DAILY_LIMIT = 50

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  }

  // --- Rate limit (sandbox é recurso pago) ---
  const date = todayUTC()
  const [usageRow] = await db
    .select()
    .from(execUsage)
    .where(eq(execUsage.userId, user.id))
    .limit(1)

  const count = usageRow?.date === date ? usageRow.count : 0
  if (count >= DAILY_LIMIT) {
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Limite diário de ${DAILY_LIMIT} execuções atingido. Volte amanhã.`,
      },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const parsed = ExecRequest.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'bad_request', details: z.treeifyError(parsed.error) },
      { status: 400 }
    )
  }
  const { lessonId, code, apiKey } = parsed.data

  const [lesson] = await db
    .select()
    .from(lessons)
    .where(eq(lessons.id, lessonId))
  if (!lesson) {
    return NextResponse.json({ error: 'lesson_not_found' }, { status: 404 })
  }

  const env: Record<string, string> = {}
  if (apiKey) env.OPENAI_API_KEY = apiKey

  try {
    const result = await runCode(code, {
      checkpointId: lesson.checkpointId,
      env,
      timeoutSec: 30,
    })

    // Incrementa contador após execução bem-sucedida (não conta falhas de validação)
    await db
      .insert(execUsage)
      .values({ userId: user.id, date, count: 1 })
      .onConflictDoUpdate({
        target: [execUsage.userId, execUsage.date],
        set: {
          count: count + 1,
          updatedAt: new Date(),
        },
      })

    const cleanStderr = result.stderr
      .split('\n')
      .filter((l) => !l.startsWith('Warning: Railway sandboxes are experimental'))
      .join('\n')
      .trim()

    return NextResponse.json({
      stdout: result.stdout,
      stderr: cleanStderr,
      exitCode: result.exitCode,
      durationMs: result.durationMs,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      { error: 'sandbox_failed', message },
      { status: 502 }
    )
  }
}
