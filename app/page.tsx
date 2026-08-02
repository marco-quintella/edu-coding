import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth/server'
import { getCourses, getCourseWithPhases, getCompletedLessonIds } from '@/lib/db/queries'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export default async function Home() {
  const user = await getCurrentUser()
  const courses = await getCourses()
  const course = await getCourseWithPhases('ia-para-devs')

  let completedIds: Set<string> = new Set()
  if (user && course) {
    completedIds = await getCompletedLessonIds(user.id)
  }

  const totalLessons = course?.phases.reduce((acc, p) => acc + p.lessons.length, 0) ?? 0
  const doneCount = course?.phases.flatMap((p) => p.lessons).filter((l) => completedIds.has(l.id)).length ?? 0
  const pct = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0

  return (
    <>
      <Nav user={user} />
      <main>
        {/* HERO */}
        <header className="px-6 pb-10 pt-[72px]">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="text-[clamp(2.2rem,4.5vw,3.4rem)] font-black leading-[1.08] tracking-tight">
                Aprenda IA <em className="italic text-accent-strong">escrevendo código</em>,
                não assistindo aula.
              </h1>
              <p className="mt-4 max-w-[30ch] text-[17px] leading-relaxed text-ink-secondary">
                Lições interativas com editor e sandbox embutidos. IA para devs, no seu ritmo,
                com certificado por fase.
              </p>
              <div className="mt-7 flex items-center gap-3">
                <Link
                  href="/courses/ia-para-devs"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-strong"
                >
                  Começar grátis
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-background-hover"
                >
                  Ver catálogo
                </Link>
              </div>
              <p className="mt-4 text-[13px] text-ink-muted">Fase 01 gratuita. Sem cartão de crédito.</p>
            </div>

            {/* Card de progresso - a assinatura */}
            {course && (
              <div className="rounded-[16px] border border-line bg-surface p-7 shadow-card">
                <h3 className="text-[15px] font-bold">IA para Devs</h3>
                <p className="mt-1 text-[13px] text-ink-muted">
                  Sua trilha · {doneCount} de {totalLessons} lições
                  {user ? '' : ' (faça login para salvar progresso)'}
                </p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-background-hover">
                  <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-5 flex flex-col gap-2.5">
                  {course.phases.slice(0, 2).flatMap((p) =>
                    p.lessons.map((l, i) => {
                      const done = completedIds.has(l.id)
                      return (
                        <Link
                          key={l.id}
                          href={`/lessons/${l.id}`}
                          className="flex items-center gap-3 text-sm"
                        >
                          <span
                            className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                              done
                                ? 'bg-accent text-white'
                                : i === 0 && !done
                                  ? 'border-2 border-accent bg-accent-soft text-accent-strong'
                                  : 'border-2 border-line-strong bg-background text-ink-muted'
                            }`}
                          >
                            {done ? '✓' : i + 1}
                          </span>
                          <span className={done ? 'font-medium' : 'font-medium text-ink-secondary'}>
                            {l.title}
                          </span>
                        </Link>
                      )
                    }),
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* COMO FUNCIONA */}
        <section className="px-6 py-14">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="text-[1.9rem] font-black tracking-tight">Por que é diferente</h2>
            <p className="mt-2 max-w-[52ch] text-[15px] text-ink-secondary">
              O código roda de verdade ao lado do conteúdo. Cada conceito vira algo que você executa e vê funcionando.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                { icon: '01', title: 'Conceito em texto', desc: 'Explicação direta, sem enrolação. O essencial para entender o algoritmo antes de tocar no código.' },
                { icon: '02', title: 'Você executa', desc: 'Editor e sandbox Python embutidos. Rode, quebre, corrija. O feedback é imediato.' },
                { icon: '03', title: 'Quiz e certificado', desc: 'Cada fase termina com verificação e micro-certificado. Progresso que você pode comprovar.' },
              ].map((s) => (
                <div key={s.icon} className="rounded-[16px] border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-pop">
                  <div className="mb-3.5 grid h-10 w-10 place-items-center rounded-[12px] bg-accent-soft font-mono font-bold text-accent-strong">
                    {s.icon}
                  </div>
                  <h3 className="text-base font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATÁLOGO */}
        <section className="px-6 py-14">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="text-[1.9rem] font-black tracking-tight">Catálogo</h2>
            <p className="mt-2 max-w-[52ch] text-[15px] text-ink-secondary">
              Um curso agora, mais a caminho. Todo o conteúdo em português.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {courses.map((c) => (
                <Link
                  key={c.id}
                  href={`/courses/${c.slug}`}
                  className="group rounded-[16px] border border-line bg-surface p-7 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-pop"
                >
                  <span className="inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-strong">
                    {c.slug === 'ia-para-devs' ? 'Disponível' : 'Em breve'}
                  </span>
                  <h3 className="mt-3 text-xl font-extrabold tracking-tight">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{c.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="px-6 pb-20 pt-10 text-center">
          <h2 className="text-[1.8rem] font-black tracking-tight">Pronto para começar?</h2>
          <p className="mt-3 text-ink-secondary">A Fase 01 é inteiramente gratuita.</p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-[15px] font-bold text-white transition-colors hover:bg-accent-strong"
          >
            Criar minha conta
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
