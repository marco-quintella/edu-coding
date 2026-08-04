import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'
import { user } from '@/lib/auth/schema'
import { phases, courses } from '@/lib/db/schema'

/**
 * Perfil público do aluno (opt-in).
 *
 * `profiles`: dados exibidos no perfil público. `public` default FALSE —
 * nada é exposto até o aluno ativar explicitamente.
 *
 * `certificates`: certificados emitidos (por fase e do curso). O `token`
 * público permite compartilhar sem login — quem tem o link vê o
 * certificado (e nada mais sensível).
 */
export const profiles = pgTable('profiles', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id),
  /** Username único para o perfil público (ex: /u/marco) */
  username: text('username').notNull().unique(),
  bio: text('bio'),
  public: boolean('public').notNull().default(false),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const certificates = pgTable('certificates', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  /** null = certificado do curso completo; senão, o da fase */
  phaseId: uuid('phase_id').references(() => phases.id),
  courseId: uuid('course_id')
    .notNull()
    .references(() => courses.id),
  /** Token público compartilhável (hash aleatório) */
  token: text('token').notNull().unique(),
  /** Nome no certificado (snapshot no momento da emissão) */
  displayName: text('display_name').notNull(),
  issuedAt: timestamp('issued_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Profile = typeof profiles.$inferSelect
export type Certificate = typeof certificates.$inferSelect
