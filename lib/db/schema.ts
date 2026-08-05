import { pgTable, uuid, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { user } from '@/lib/auth/schema'

/**
 * `users` mantida como snapshot da tabela `user` do BetterAuth (id, email, createdAt).
 * Sincronizada via sign-up — fica como coluna cópia para queries simples.
 * O `userId` em user_progress referencia a `user.id` do BetterAuth.
 */
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const phases = pgTable('phases', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: uuid('course_id')
    .notNull()
    .references(() => courses.id),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  position: integer('position').notNull(),
})

export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  phaseId: uuid('phase_id')
    .notNull()
    .references(() => phases.id),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  mdxPath: text('mdx_path').notNull(),
  checkpointId: text('checkpoint_id').notNull(),
  /** Runtime do sandbox: 'python' (padrão) ou 'node' */
  runtime: text('runtime').notNull().default('python'),
  estimatedMinutes: integer('estimated_minutes').default(10),
  position: integer('position').notNull(),
})

export const userProgress = pgTable('user_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  // FK para `user.id` do BetterAuth. Mantemos o nome `user_id` no banco para evitar migration.
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  lessonId: uuid('lesson_id')
    .notNull()
    .references(() => lessons.id),
  completedAt: timestamp('completed_at').defaultNow().notNull(),
  quizScore: integer('quiz_score'),
})

export const quizQuestions = pgTable('quiz_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  lessonId: uuid('lesson_id')
    .notNull()
    .references(() => lessons.id),
  question: text('question').notNull(),
  options: jsonb('options').notNull(),
  correctOptionId: text('correct_option_id').notNull(),
  position: integer('position').notNull(),
})

// Relations — Drizzle precisa pra `with: { ... }` funcionar
export const coursesRelations = relations(courses, ({ many }) => ({
  phases: many(phases),
}))

export const phasesRelations = relations(phases, ({ one, many }) => ({
  course: one(courses, {
    fields: [phases.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}))

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  phase: one(phases, {
    fields: [lessons.phaseId],
    references: [phases.id],
  }),
  quizQuestions: many(quizQuestions),
}))

export const quizQuestionsRelations = relations(quizQuestions, ({ one }) => ({
  lesson: one(lessons, {
    fields: [quizQuestions.lessonId],
    references: [lessons.id],
  }),
}))

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  lesson: one(lessons, {
    fields: [userProgress.lessonId],
    references: [lessons.id],
  }),
}))

export type Course = typeof courses.$inferSelect
export type Phase = typeof phases.$inferSelect
export type Lesson = typeof lessons.$inferSelect
export type QuizQuestion = typeof quizQuestions.$inferSelect
export type QuizOption = { id: string; text: string }
