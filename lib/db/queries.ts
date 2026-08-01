import { db } from './index'
import { courses, phases, lessons, quizQuestions, userProgress } from './schema'
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

  return { lesson, phase: phase ?? null, questions }
}

export async function getCompletedLessonIds(userId: string): Promise<Set<string>> {
  const rows = await db
    .select({ lessonId: userProgress.lessonId })
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
  return new Set(rows.map((r) => r.lessonId))
}
