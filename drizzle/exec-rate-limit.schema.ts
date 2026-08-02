import { pgTable, uuid, text, timestamp, integer, uniqueIndex } from 'drizzle-orm/pg-core'

/**
 * Rate limit anti-abuso do sandbox exec — janela fixa de 10min por IP.
 *
 * Sem autenticação obrigatória (visitante pode rodar), então a chave é o
 * IP do cliente. Generoso (30 execs/10min) para não atrapalhar uso normal,
 * mas bloqueia loops de abuso (spam de sandbox = custo real na Railway).
 */
export const execRateLimit = pgTable(
  'exec_rate_limit',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    key: text('key').notNull(), // IP ou 'u:'+userId quando logado
    windowStart: timestamp('window_start', { withTimezone: true }).notNull(),
    count: integer('count').notNull().default(0),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex('exec_rate_limit_key_window_unique').on(t.key, t.windowStart)]
)

export type ExecRateLimit = typeof execRateLimit.$inferSelect
