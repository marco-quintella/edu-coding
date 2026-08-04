/**
 * Serviço de revisão espaçada — persistência dos estados SM-2.
 */
import { eq, and } from 'drizzle-orm'
import { db } from '@/lib/db'
import { reviews } from '@/drizzle/review.schema'
import { nextReviewState, initialReviewState, type ReviewQuality } from '@/lib/gamification/review'
import { REVIEW_CARDS, getReviewCard } from '@/lib/lessons/review-cards'

/**
 * Busca os cards vencidos (nunca revisados OU next_review <= agora),
 * com o estado SM-2 de cada um. Inclui fase para filtrar.
 */
export async function getDueReviews(userId: string, phase?: number) {
  const now = new Date()

  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.userId, userId))

  const stateByCard = new Map(rows.map((r) => [r.cardId, r]))
  const nowTime = now.getTime()

  const due = REVIEW_CARDS.filter((card) => {
    if (phase !== undefined && card.phase !== phase) return false
    const review = stateByCard.get(card.id)
    if (!review) return true // nunca revisado
    if (!review.nextReviewAt) return true
    return review.nextReviewAt.getTime() <= nowTime
  })

  return due.map((card) => ({
    card,
    state: stateByCard.get(card.id)
      ? {
          ease: stateByCard.get(card.id)!.ease,
          interval: stateByCard.get(card.id)!.interval,
          repetitions: stateByCard.get(card.id)!.repetitions,
        }
      : initialReviewState(),
  }))
}

/**
 * Registra a resposta de um card: atualiza o estado SM-2 e agenda a
 * próxima revisão. Cria o registro se for a primeira vez.
 */
export async function answerReview(params: {
  userId: string
  cardId: string
  quality: ReviewQuality
}): Promise<{ nextReviewAt: Date; interval: number }> {
  const { userId, cardId, quality } = params
  const card = getReviewCard(cardId)
  if (!card) throw new Error('card_not_found')

  const [existing] = await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.cardId, cardId)))
    .limit(1)

  const prevState = existing
    ? { ease: existing.ease, interval: existing.interval, repetitions: existing.repetitions }
    : initialReviewState()

  const next = nextReviewState(prevState, quality)
  const now = new Date()
  const nextReviewAt = new Date(now.getTime() + next.interval * 86_400_000)

  await db
    .insert(reviews)
    .values({
      userId,
      cardId,
      ease: next.ease,
      interval: next.interval,
      repetitions: next.repetitions,
      nextReviewAt,
      lastReviewedAt: now,
    })
    .onConflictDoUpdate({
      target: [reviews.userId, reviews.cardId],
      set: {
        ease: next.ease,
        interval: next.interval,
        repetitions: next.repetitions,
        nextReviewAt,
        lastReviewedAt: now,
      },
    })

  return { nextReviewAt, interval: next.interval }
}

/**
 * Estatísticas da revisão: quantos cards no total, quantos vencidos,
 * cards por fase.
 */
export async function getReviewStats(userId: string) {
  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.userId, userId))

  const stateByCard = new Map(rows.map((r) => [r.cardId, r]))
  const now = Date.now()

  const total = REVIEW_CARDS.length
  const due = REVIEW_CARDS.filter((card) => {
    const review = stateByCard.get(card.id)
    if (!review) return true
    if (!review.nextReviewAt) return true
    return review.nextReviewAt.getTime() <= now
  }).length

  const byPhase = [1, 2, 3, 4, 5].map((phase) => {
    const cards = REVIEW_CARDS.filter((c) => c.phase === phase)
    const done = cards.filter((c) => stateByCard.has(c.id)).length
    return { phase, total: cards.length, done }
  })

  return { total, due, byPhase }
}
