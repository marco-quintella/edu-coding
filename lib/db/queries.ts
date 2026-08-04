import { db } from './index'
import { courses, phases, lessons, quizQuestions, userProgress } from './schema'
import { userStreaks, userXp } from '@/drizzle/gamification.schema'
import { eq, asc } from 'drizzle-orm'

type Course = typeof courses.$inferSelect
type Phase = typeof phases.$inferSelect
type Lesson = typeof lessons.$inferSelect
type QuizQuestion = typeof quizQuestions.$inferSelect

export type QuizOption = { id: string; text: string }

export interface QuizQuestionWithOptions extends Omit<QuizQuestion, 'options'> {
  options: QuizOption[]
}

export async function getCourses(): Promise<Course[]> {
  return db.select().from(courses).orderBy(asc(courses.title))
}

export async function getCourseWithPhases(slug: string) {
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, slug),
  })
  if (!course) return null

  const coursePhases = await db
    .select()
    .from(phases)
    .where(eq(phases.courseId, course.id))
    .orderBy(asc(phases.position))

  const phasesWithLessons = await Promise.all(
    coursePhases.map(async (phase) => {
      const phaseLessons = await db
        .select()
        .from(lessons)
        .where(eq(lessons.phaseId, phase.id))
        .orderBy(asc(lessons.position))
      return { ...phase, lessons: phaseLessons }
    })
  )

  return { ...course, phases: phasesWithLessons }
}

export async function getLessonById(id: string): Promise<{
  lesson: Lesson
  phase: Phase | null
  questions: QuizQuestionWithOptions[]
  phaseLessons: Lesson[]
} | null> {
  const [lesson] = await db
    .select()
    .from(lessons)
    .where(eq(lessons.id, id))
    .limit(1)
  if (!lesson) return null

  const [phase] = await db
    .select()
    .from(phases)
    .where(eq(phases.id, lesson.phaseId))
    .limit(1)

  const qs = await db
    .select()
    .from(quizQuestions)
    .where(eq(quizQuestions.lessonId, lesson.id))
    .orderBy(asc(quizQuestions.position))

  const questions: QuizQuestionWithOptions[] = qs.map((q) => ({
    ...q,
    options: q.options as QuizOption[],
  }))

  const phaseLessons = phase
    ? await db
        .select()
        .from(lessons)
        .where(eq(lessons.phaseId, phase.id))
        .orderBy(asc(lessons.position))
    : []

  return { lesson, phase: phase ?? null, questions, phaseLessons }
}

export async function getCompletedLessonIds(userId: string): Promise<Set<string>> {
  const rows = await db
    .select({ lessonId: userProgress.lessonId })
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
  return new Set(rows.map((r) => r.lessonId))
}

/**
 * Dashboard: progresso do usuário por curso.
 * Retorna total de lições, concluídas, fase atual, fases completas (certificados).
 */
export async function getUserDashboard(userId: string) {
  const allCourses = await db.select().from(courses).orderBy(asc(courses.title))
  const completedIds = await getCompletedLessonIds(userId)

  const result = await Promise.all(
    allCourses.map(async (course) => {
      const coursePhases = await db
        .select()
        .from(phases)
        .where(eq(phases.courseId, course.id))
        .orderBy(asc(phases.position))

      const phasesWithLessons = await Promise.all(
        coursePhases.map(async (phase) => {
          const phaseLessons = await db
            .select()
            .from(lessons)
            .where(eq(lessons.phaseId, phase.id))
            .orderBy(asc(lessons.position))
          return { ...phase, lessons: phaseLessons }
        })
      )

      const allLessonIds = phasesWithLessons.flatMap((p) => p.lessons.map((l) => l.id))
      const doneCount = allLessonIds.filter((id) => completedIds.has(id)).length
      const totalLessons = allLessonIds.length
      const pct = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0

      const currentPhase =
        phasesWithLessons.find((p) => p.lessons.some((l) => !completedIds.has(l.id))) ??
        phasesWithLessons[phasesWithLessons.length - 1]

      const completedPhases = phasesWithLessons
        .filter((p) => p.lessons.length > 0 && p.lessons.every((l) => completedIds.has(l.id)))
        .map((p) => ({ id: p.id, title: p.title, courseId: course.id, courseSlug: course.slug, courseTitle: course.title }))

      // Última lição concluída
      const completedInCourse = allLessonIds.filter((id) => completedIds.has(id))
      const lastLessonId = completedInCourse.length > 0 ? completedInCourse[completedInCourse.length - 1] : null

      return {
        course,
        totalLessons,
        doneCount,
        pct,
        currentPhase: currentPhase
          ? { id: currentPhase.id, title: currentPhase.title, lessons: currentPhase.lessons.map(l => ({ id: l.id, title: l.title, done: completedIds.has(l.id) })) }
          : null,
        completedPhases,
        lastLessonId,
      }
    })
  )

  return result
}

/**
 * Gamificação do usuário (streak + XP total + XP por fase).
 * Usado pela home/nav para o cartão de progresso.
 */
export async function getUserGamification(userId: string) {
  const [streakRow] = await db
    .select()
    .from(userStreaks)
    .where(eq(userStreaks.userId, userId))
    .limit(1)

  const xpRows = await db
    .select()
    .from(userXp)
    .where(eq(userXp.userId, userId))

  return {
    streak: {
      current: streakRow?.currentStreak ?? 0,
      longest: streakRow?.longestStreak ?? 0,
    },
    xp: {
      total: xpRows.reduce((acc, r) => acc + r.totalXp, 0),
      byPhase: xpRows.map((r) => ({ phaseId: r.phaseId, totalXp: r.totalXp })),
    },
  }
}
