import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/server'
import { userStreaks, userXp } from '@/drizzle/gamification.schema'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { getTotalXp } from '@/lib/gamification/xp'
import { getCompletedLessonIds } from '@/lib/db/queries'

export const runtime = 'nodejs'

/**
 * Progresso consolidado do usuário logado:
 * - streak atual + recorde
 * - XP total + XP por fase
 * - lições concluídas (ids)
 *
 * Consumido pela home (cartão de progresso) e pelo sidebar da lição.
 */
export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  }

  const [streakRow] = await db
    .select()
    .from(userStreaks)
    .where(eq(userStreaks.userId, user.id))
    .limit(1)

  const xpRows = await db
    .select()
    .from(userXp)
    .where(eq(userXp.userId, user.id))

  const completedIds = await getCompletedLessonIds(user.id)

  return NextResponse.json({
    streak: {
      current: streakRow?.currentStreak ?? 0,
      longest: streakRow?.longestStreak ?? 0,
    },
    xp: {
      total: await getTotalXp(user.id),
      byPhase: xpRows.map((r) => ({ phaseId: r.phaseId, totalXp: r.totalXp })),
    },
    completedLessonIds: [...completedIds],
  })
}
