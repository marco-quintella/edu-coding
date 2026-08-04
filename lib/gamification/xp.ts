/**
 * Gamificação — XP por ação e persistência.
 *
 * XP é por fase (user_xp soma por fase; total do usuário = soma das linhas).
 * Streak é global (user_streaks).
 *
 * Integrado em: complete/route.ts (lição concluída + quiz), api/exec
 * (execução de exercício — só quando logado, para não poluir visitantes).
 */
import { eq, and } from 'drizzle-orm'
import { db } from '@/lib/db'
import { userStreaks, userXp } from '@/drizzle/gamification.schema'
import { nextStreak, todayLocal, type StreakState } from './streak'

/** XP por tipo de atividade (pontos). */
export const XP = {
  LESSON: 10, // concluir lição (sem quiz)
  QUIZ_PASS: 15, // quiz com >= 80%
  EXERCISE: 5, // exercício verificado correto
  CAPSTONE: 50, // capstone concluído
} as const

export type ActivityKind = keyof typeof XP

/**
 * Registra atividade de gamificação para um usuário:
 * 1. Atualiza streak (dias consecutivos)
 * 2. Soma XP na fase da atividade (se phaseId for informado)
 *
 * Idempotente por natureza (upsert). Retorna o estado atualizado.
 */
export async function registerActivity(params: {
  userId: string
  kind: ActivityKind
  phaseId?: string
  timestamp?: Date
}): Promise<{ streak: StreakState; xpTotal: number }> {
  const today = todayLocal()
  const now = params.timestamp ?? new Date()

  const [streakRow] = await db
    .select()
    .from(userStreaks)
    .where(eq(userStreaks.userId, params.userId))
    .limit(1)

  const prev: StreakState = {
    currentStreak: streakRow?.currentStreak ?? 0,
    longestStreak: streakRow?.longestStreak ?? 0,
    lastActiveDate: streakRow?.lastActiveDate ?? null,
  }

  const next = nextStreak(prev, today)

  // Upsert streak
  await db
    .insert(userStreaks)
    .values({
      userId: params.userId,
      currentStreak: next.currentStreak,
      longestStreak: next.longestStreak,
      lastActiveDate: next.lastActiveDate,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: userStreaks.userId,
      set: {
        currentStreak: next.currentStreak,
        longestStreak: next.longestStreak,
        lastActiveDate: next.lastActiveDate,
        updatedAt: now,
      },
    })

  // XP por fase (só se a atividade pertence a uma fase)
  let xpTotal = 0
  if (params.phaseId) {
    const amount = XP[params.kind]
    const [xpRow] = await db
      .select()
      .from(userXp)
      .where(and(eq(userXp.userId, params.userId), eq(userXp.phaseId, params.phaseId)))
      .limit(1)

    const newTotal = (xpRow?.totalXp ?? 0) + amount

    await db
      .insert(userXp)
      .values({
        userId: params.userId,
        phaseId: params.phaseId,
        totalXp: newTotal,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [userXp.userId, userXp.phaseId],
        set: { totalXp: newTotal, updatedAt: now },
      })

    xpTotal = newTotal
  }

  return { streak: next, xpTotal }
}

/** Soma total de XP do usuário (todas as fases). */
export async function getTotalXp(userId: string): Promise<number> {
  const rows = await db
    .select({ totalXp: userXp.totalXp })
    .from(userXp)
    .where(eq(userXp.userId, userId))
  return rows.reduce((acc, r) => acc + r.totalXp, 0)
}
