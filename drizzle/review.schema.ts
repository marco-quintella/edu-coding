import { pgTable, text, timestamp, real, integer, uuid, uniqueIndex } from 'drizzle-orm/pg-core'
import { user } from '@/lib/auth/schema'

/**
 * Revisão espaçada (flashcards) — algoritmo SM-2 simplificado.
 *
 * Cada linha = estado de um card para um usuário. `ease` começa em 2.5,
 * `interval` em dias. Ao responder:
 * - "Acertei fácil" → ease +0.15, intervalo multiplica
 * - "Acertei" → intervalo multiplica (ease inalterado)
 * - "Errei" → ease -0.20, intervalo volta a 1 dia
 *
 * `nextReviewAt` = quando o card volta à fila de revisão.
 */
export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    /** Id do card (chave em lib/lessons/review-cards.ts) */
    cardId: text('card_id').notNull(),
    ease: real('ease').notNull().default(2.5),
    /** Intervalo atual em dias */
    interval: integer('interval').notNull().default(0),
    /** Repetições bem-sucedidas consecutivas */
    repetitions: integer('repetitions').notNull().default(0),
    /** Próxima revisão (null = nunca revisado) */
    nextReviewAt: timestamp('next_review_at', { withTimezone: true }),
    /** Última vez que o card foi respondido */
    lastReviewedAt: timestamp('last_reviewed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex('reviews_user_card_unique').on(t.userId, t.cardId)]
)

export type Review = typeof reviews.$inferSelect
