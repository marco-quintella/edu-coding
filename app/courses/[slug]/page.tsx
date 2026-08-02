import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCourseWithPhases, getCompletedLessonIds } from '@/lib/db/queries'
import { getCurrentUser } from '@/lib/auth/server'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await getCourseWithPhases(slug)
  if (!course) notFound()

  const user = await getCurrentUser()
  const completedIds = user
    ? await getCompletedLessonIds(user.id)
    : new Set<string>()

  const totalLessons = course.phases.reduce((acc, p) => acc + p.lessons.length, 0)
  const doneCount = course.phases
    .flatMap((p) => p.lessons)
    .filter((l) => completedIds.has(l.id)).length
  const pct = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0

  return (
    <>
      <Nav user={user} />
      <main className="px-6 py-12">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href="/courses"
            className="text-sm font-medium text-accent-strong hover:underline"
          >
            ← Catálogo
          </Link>

          <header className="mt-4 max-w-[720px]">
            <h1 className="text-[2.4rem] font-black tracking-tight">{course.title}</h1>
            {course.description && (
              <p className="mt-2 leading-relaxed text-ink-secondary">
                {course.description}
              </p>
            )}
            <div className="mt-5 flex items-center gap-4 text-[13px] text-ink-muted">
              <span>
                {course.phases.length} fase{course.phases.length !== 1 ? 's' : ''}
              </span>
              <span>·</span>
              <span>{totalLessons} lições</span>
              {user && (
                <>
                  <span>·</span>
                  <span>
                    {doneCount} de {totalLessons} concluídas
                  </span>
                </>
              )}
            </div>
            {user && (
              <div className="mt-3 h-2 max-w-[400px] overflow-hidden rounded-full bg-background-hover">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}
          </header>

          {course.phases.length === 0 ? (
            <p className="mt-10 text-ink-muted">Este curso ainda não tem fases.</p>
          ) : (
            <div className="mt-10 space-y-10">
              {course.phases.map((phase) => {
                const completedInPhase = phase.lessons.filter((l) =>
                  completedIds.has(l.id),
                ).length
                const allDone =
                  phase.lessons.length > 0 &&
                  completedInPhase === phase.lessons.length

                return (
                  <section key={phase.id}>
                    <h2 className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2 text-2xl font-semibold tracking-tight">
                      <span>{phase.title}</span>
                      <span className="text-sm font-normal text-ink-muted">
                        {completedInPhase}/{phase.lessons.length} concluídas
                      </span>
                    </h2>

                    {allDone && user && (
                      <div className="mb-4 flex items-center justify-between gap-4 rounded-[16px] border border-accent/40 bg-accent-soft p-4">
                        <div>
                          <p className="font-semibold text-accent-strong">
                            Fase completa!
                          </p>
                          <p className="text-sm text-ink-secondary">
                            Baixe seu certificado de conclusão.
                          </p>
                        </div>
                        <a
                          href={`/api/phases/${phase.id}/certificate`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-accent-strong"
                        >
                          Certificado
                        </a>
                      </div>
                    )}

                    {phase.lessons.length === 0 ? (
                      <p className="text-sm text-ink-muted">
                        Nenhuma lição nesta fase.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {phase.lessons.map((lesson, idx) => {
                          const done = completedIds.has(lesson.id)
                          return (
                            <li key={lesson.id}>
                              <Link
                                href={`/lessons/${lesson.id}`}
                                className={`flex items-center justify-between rounded-[12px] border p-4 transition-all ${
                                  done
                                    ? 'border-accent/40 bg-accent-soft/40 hover:border-accent'
                                    : 'border-line bg-surface hover:border-accent hover:bg-accent-soft/30'
                                }`}
                              >
                                <span className="flex items-center gap-3 font-medium text-ink">
                                  <span
                                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                                      done
                                        ? 'bg-accent text-white'
                                        : 'border-2 border-line-strong text-ink-muted'
                                    }`}
                                  >
                                    {done ? '✓' : idx + 1}
                                  </span>
                                  <span>{lesson.title}</span>
                                </span>
                                <span className="font-mono text-sm text-ink-muted">
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
      <Footer />
    </>
  )
}
