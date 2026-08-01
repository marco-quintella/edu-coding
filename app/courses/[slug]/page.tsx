import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCourseWithPhases, getCompletedLessonIds } from '@/lib/db/queries'

// Mock user até BetterAuth (Phase 3) entrar
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000001'

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await getCourseWithPhases(slug)
  if (!course) notFound()

  const completedIds = await getCompletedLessonIds(MOCK_USER_ID)

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/courses"
          className="text-blue-600 text-sm hover:underline mb-6 inline-block"
        >
          ← Catálogo
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
          {course.description && (
            <p className="text-gray-600">{course.description}</p>
          )}
        </header>

        {course.phases.length === 0 ? (
          <p className="text-gray-500">Este curso ainda não tem fases.</p>
        ) : (
          <div className="space-y-10">
            {course.phases.map((phase) => {
              const completedInPhase = phase.lessons.filter((l) =>
                completedIds.has(l.id)
              ).length
              return (
                <section key={phase.id}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-baseline justify-between">
                    <span>{phase.title}</span>
                    {phase.lessons.length > 0 && (
                      <span className="text-sm font-normal text-gray-500">
                        {completedInPhase}/{phase.lessons.length} concluídas
                      </span>
                    )}
                  </h2>
                  {phase.lessons.length === 0 ? (
                    <p className="text-gray-500 text-sm">Nenhuma lição nesta fase.</p>
                  ) : (
                    <ul className="space-y-2">
                      {phase.lessons.map((lesson) => {
                        const done = completedIds.has(lesson.id)
                        return (
                          <li key={lesson.id}>
                            <Link
                              href={`/lessons/${lesson.id}`}
                              className={`flex items-center justify-between p-4 rounded-md border transition-all bg-white ${
                                done
                                  ? 'border-green-300 bg-green-50/40 hover:border-green-400'
                                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50'
                              }`}
                            >
                              <span className="font-medium text-gray-900 flex items-center gap-2">
                                {done && (
                                  <span
                                    className="text-green-600 font-bold"
                                    aria-label="concluída"
                                  >
                                    ✓
                                  </span>
                                )}
                                <span className={done ? 'text-green-900' : ''}>
                                  {lesson.title}
                                </span>
                              </span>
                              <span className="text-sm text-gray-500">
                                {lesson.estimatedMinutes ?? '?'} min
                              </span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
