import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { runCode } from '@/lib/sandbox/client'
import { db } from '@/lib/db'
import { lessons } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/auth/server'
import { ExecRequest } from './schema'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
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
