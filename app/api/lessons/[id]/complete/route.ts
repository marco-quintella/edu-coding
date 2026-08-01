import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { lessons, userProgress, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { CompleteRequest } from './schema'

// Mock user até BetterAuth (Phase 3) entrar.
// O user é criado on-demand para evitar FK violation.
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000001'
const MOCK_USER_EMAIL = 'mock@edu.local'

export const runtime = 'nodejs'

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id: lessonId } = await ctx.params

  const [lesson] = await db
    .select()
    .from(lessons)
    .where(eq(lessons.id, lessonId))
  if (!lesson) {
    return NextResponse.json({ error: 'lesson_not_found' }, { status: 404 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = CompleteRequest.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  // Garantir que o mock user existe (Phase 3 remove isso)
  await db
    .insert(users)
    .values({ id: MOCK_USER_ID, email: MOCK_USER_EMAIL })
    .onConflictDoNothing()

  await db
    .insert(userProgress)
    .values({
      userId: MOCK_USER_ID,
      lessonId,
      quizScore: parsed.data.quizScore,
    })
    .onConflictDoUpdate({
      target: [userProgress.userId, userProgress.lessonId],
      set: {
        quizScore: parsed.data.quizScore,
        completedAt: new Date(),
      },
    })

  return NextResponse.json({ ok: true, score: parsed.data.quizScore })
}
