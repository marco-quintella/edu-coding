import { pgTable, uuid, text, timestamp, integer, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { user } from '@/lib/auth/schema'

/**
 * Controle de uso do sandbox exec — rate limiting por user/dia.
 * O endpoint /api/exec consulta e incrementa antes de spawnar sandbox.
 */
export const execUsage = pgTable(
  'exec_usage',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    date: text('date').notNull(), // YYYY-MM-DD (UTC)
    count: integer('count').notNull().default(0),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => [uniqueIndex('exec_usage_user_date_unique').on(t.userId, t.date)]
)

export const execUsageRelations = relations(execUsage, ({ one }) => ({
  user: one(user, {
    fields: [execUsage.userId],
    references: [user.id],
  }),
}))

export type ExecUsage = typeof execUsage.$inferSelect
