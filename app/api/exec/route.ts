import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { execWarm } from '@/lib/sandbox/pool'
import { checkRateLimit, incrementRateLimit, WINDOW_LIMIT } from '@/lib/sandbox/rate-limit'
import { db } from '@/lib/db'
import { lessons } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/server'
import { clientIp } from '@/lib/net/ip'
import { ExecRequest } from './schema'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * Resolve a lição por `lessonId` (legado) ou `lessonSlug`.
 * Slug é preferível: estável entre seeds (UUIDs mudam a cada reseed).
 */
async function resolveLesson(body: { lessonId?: string; lessonSlug?: string }) {
  if (body.lessonId) {
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, body.lessonId))
    return lesson
  }
  if (body.lessonSlug) {
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.slug, body.lessonSlug))
    return lesson
  }
  return undefined
}

export async function POST(req: NextRequest) {
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
  const { lessonId, lessonSlug, code, apiKey } = parsed.data

  // Autenticação é opcional — visitante pode rodar (fase de beta).
  // Quando logado, usa o userId como chave do rate limit (mais justo que IP).
  const user = await getCurrentUser()
  const rateKey = user ? `u:${user.id}` : `ip:${clientIp(req)}`

  // --- Rate limit anti-abuso (janela de 10min, generoso) ---
  const rl = await checkRateLimit(rateKey)
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Muitas execuções em pouco tempo. Tente de novo em ${rl.retryAfterSec}s.`,
      },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
    )
  }

  // Resolve a lição por ID (legado) ou slug (estável entre seeds)
  const lesson = await resolveLesson({ lessonId, lessonSlug })
  if (!lesson) {
    return NextResponse.json({ error: 'lesson_not_found' }, { status: 404 })
  }

  const env: Record<string, string> = {}
  if (apiKey) env.OPENAI_API_KEY = apiKey

  try {
    // Warm pool: sandbox quente por chave (user ou IP do visitante)
    const result = await execWarm(rateKey, code, {
      checkpointId: lesson.checkpointId,
      env,
      timeoutSec: 30,
      runtime: (lesson.runtime ?? 'python') as 'python' | 'node' | 'ts' | 'react',
    })

    // Incrementa contador após execução bem-sucedida
    await incrementRateLimit(rateKey)

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
      plots: result.plots ?? [],
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      { error: 'sandbox_failed', message },
      { status: 502 }
    )
  }
}

// Exports para testes
export { clientIp, WINDOW_LIMIT }
