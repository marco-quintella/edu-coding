import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { lessons, userProgress, users } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/auth/server'
import { registerActivity, XP } from '@/lib/gamification/xp'
import { CompleteRequest } from './schema'

export const runtime = 'nodejs'

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id: lessonId } = await ctx.params

  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  }

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

  // Sincroniza snapshot na tabela `users` (auth-api já tem o user em `user`)
  await db
    .insert(users)
    .values({ id: user.id, email: user.email })
    .onConflictDoNothing()

  // XP é dado APENAS na primeira conclusão da lição (não duplica em re-submit)
  const [existing] = await db
    .select()
    .from(userProgress)
    .where(and(eq(userProgress.userId, user.id), eq(userProgress.lessonId, lessonId)))
    .limit(1)
  const isFirstCompletion = !existing

  await db
    .insert(userProgress)
    .values({
      userId: user.id,
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

  // Gamificação: streak (sempre) + XP (só na primeira conclusão)
  let gamification: { streak: number; xp: number } | null = null
  if (isFirstCompletion) {
    const quizPassed = parsed.data.quizScore >= 80
    const xpKind = quizPassed ? 'QUIZ_PASS' : 'LESSON'
    const result = await registerActivity({
      userId: user.id,
      kind: xpKind,
      phaseId: lesson.phaseId,
    })
    gamification = { streak: result.streak.currentStreak, xp: XP[xpKind] }
  } else {
    // Re-submit: só atualiza o streak (dia ativo), sem XP
    const result = await registerActivity({
      userId: user.id,
      kind: 'LESSON',
      phaseId: undefined,
    })
    gamification = { streak: result.streak.currentStreak, xp: 0 }
  }

  return NextResponse.json({
    ok: true,
    score: parsed.data.quizScore,
    xp: gamification?.xp ?? 0,
    streak: gamification?.streak ?? 0,
  })
}
