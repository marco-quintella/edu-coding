import { pgTable, text, integer, timestamp, date, uuid, uniqueIndex } from 'drizzle-orm/pg-core'
import { user } from '@/lib/auth/schema'
import { phases } from '@/lib/db/schema'

/**
 * Gamificação — streak de dias ativos e XP por fase.
 *
 * `user_streaks`: um registro por usuário. `current_streak` = dias
 * consecutivos com atividade; `longest_streak` = recorde histórico.
 *
 * `user_xp`: XP acumulado por fase (soma por fase). O total do usuário
 * é a soma de todas as linhas.
 */
export const userStreaks = pgTable('user_streaks', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id),
  currentStreak: integer('current_streak').notNull().default(0),
  longestStreak: integer('longest_streak').notNull().default(0),
  /** Última data com atividade (fuso local, formato YYYY-MM-DD) */
  lastActiveDate: date('last_active_date'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const userXp = pgTable(
  'user_xp',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    phaseId: uuid('phase_id')
      .notNull()
      .references(() => phases.id),
    totalXp: integer('total_xp').notNull().default(0),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex('user_xp_user_phase_unique').on(t.userId, t.phaseId)]
)

export type UserStreak = typeof userStreaks.$inferSelect
export type UserXp = typeof userXp.$inferSelect
