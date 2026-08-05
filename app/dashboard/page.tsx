import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, BookOpen, Trophy, Clock } from '@phosphor-icons/react/dist/ssr'
import { getCurrentUser } from '@/lib/auth/server'
import { getUserDashboard } from '@/lib/db/queries'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  const dashboard = await getUserDashboard(user.id)

  const totalDone = dashboard.reduce((acc, c) => acc + c.doneCount, 0)
  const totalLessons = dashboard.reduce((acc, c) => acc + c.totalLessons, 0)
  const totalCertificates = dashboard.reduce((acc, c) => acc + c.completedPhases.length, 0)

  // Curso em andamento (primeiro com progresso > 0 e < 100)
  const activeCourse = dashboard.find((c) => c.doneCount > 0 && c.pct < 100)
  // Se nenhum em andamento, pega o primeiro com 0%
  const nextCourse = activeCourse ?? dashboard.find((c) => c.pct === 0)

  return (
    <>
      <Nav user={user} />
      <main className="px-6 py-12">
        <div className="mx-auto max-w-[1280px]">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-[clamp(1.8rem,3.4vw,2.4rem)] font-black tracking-tight">
              Olá, {user.name ?? user.email.split('@')[0]}
            </h1>
            <p className="mt-2 text-[15px] text-ink-secondary">
              Continue de onde parou ou explore novos cursos.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[16px] border border-line bg-surface p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft">
                  <BookOpen size={20} className="text-accent-strong" />
                </div>
                <div>
                  <p className="font-mono text-2xl font-black text-ink">{totalDone}/{totalLessons}</p>
                  <p className="text-[13px] text-ink-muted">lições concluídas</p>
                </div>
              </div>
            </div>
            <div className="rounded-[16px] border border-line bg-surface p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft">
                  <Trophy size={20} className="text-accent-strong" />
                </div>
                <div>
                  <p className="font-mono text-2xl font-black text-ink">{totalCertificates}</p>
                  <p className="text-[13px] text-ink-muted">certificados</p>
                </div>
              </div>
            </div>
            <div className="rounded-[16px] border border-line bg-surface p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft">
                  <Clock size={20} className="text-accent-strong" />
                </div>
                <div>
                  <p className="font-mono text-2xl font-black text-ink">{dashboard.length}</p>
                  <p className="text-[13px] text-ink-muted">cursos disponíveis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Curso em andamento — destaque */}
          {activeCourse && (
            <section className="mb-10">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-muted">
                Continue aprendendo
              </h2>
              <Link
                href={`/courses/${activeCourse.course.slug}`}
                className="group block overflow-hidden rounded-[16px] border border-accent/40 bg-accent-soft/30 p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-pop"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-white">
                      Em andamento
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold tracking-tight">{activeCourse.course.title}</h3>
                    {activeCourse.currentPhase && (
                      <p className="mt-1 text-[13px] text-ink-secondary">
                        Fase atual: {activeCourse.currentPhase.title}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-2xl font-black text-accent-strong">
                    {activeCourse.pct}%
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-background-hover">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{ width: `${activeCourse.pct}%` }}
                  />
                </div>
                {/* Lições da fase atual */}
                {activeCourse.currentPhase && (
                  <div className="mt-5 flex flex-col">
                    {activeCourse.currentPhase.lessons.map((l, i) => (
                      <Link
                        key={l.id}
                        href={`/lessons/${l.id}`}
                        className="group flex items-center gap-3 border-t border-line/60 py-2 text-sm first:border-t-0 first:pt-0 last:pb-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span
                          className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                            l.done
                              ? 'bg-accent text-white'
                              : 'border-2 border-line-strong bg-background text-ink-muted'
                          }`}
                        >
                          {l.done ? '✓' : i + 1}
                        </span>
                        <span className={l.done ? 'font-medium text-ink' : 'font-medium text-ink-secondary'}>
                          {l.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-bold text-accent-strong">
                  Continuar
                  <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </section>
          )}

          {/* Todos os cursos */}
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-muted">
              Seus cursos
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {dashboard.map((c) => (
                <Link
                  key={c.course.id}
                  href={`/courses/${c.course.slug}`}
                  className="group block rounded-[16px] border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-pop"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold tracking-tight">{c.course.title}</h3>
                      <p className="mt-1 text-[13px] text-ink-secondary">
                        {c.doneCount} de {c.totalLessons} lições
                      </p>
                    </div>
                    <span
                      className={`font-mono text-sm font-bold ${
                        c.pct === 100 ? 'text-green-600 dark:text-green-400' : 'text-accent-strong'
                      }`}
                    >
                      {c.pct}%
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background-hover">
                    <div
                      className={`h-full rounded-full transition-all ${
                        c.pct === 100 ? 'bg-green-500 dark:bg-green-400' : 'bg-accent'
                      }`}
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  {/* Certificados */}
                  {c.completedPhases.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.completedPhases.map((cp) => (
                        <span
                          key={cp.id}
                          className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent-strong"
                        >
                          <Trophy size={10} />
                          {cp.title}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>

          {/* Se nenhum curso começou */}
          {dashboard.every((c) => c.doneCount === 0) && nextCourse && (
            <section className="mt-10 rounded-[16px] border border-dashed border-line-strong p-10 text-center">
              <p className="text-ink-secondary">
                Você ainda não começou nenhum curso.
              </p>
              <Link
                href={`/courses/${nextCourse.course.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-accent-deep"
              >
                Começar agora
                <ArrowRight size={16} weight="bold" />
              </Link>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
