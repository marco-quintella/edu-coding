import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from './reveal'

interface PhaseData {
  lessons: { id: string; title: string }[]
}

interface HeroProps {
  course: { id: string; title: string; phases: PhaseData[] } | null
  completedIds: Set<string>
  user: { id: string } | null
}

export function Hero({ course, completedIds, user }: HeroProps) {
  const totalLessons = course?.phases.reduce((acc, p) => acc + p.lessons.length, 0) ?? 0
  const doneCount =
    course?.phases.flatMap((p) => p.lessons).filter((l) => completedIds.has(l.id)).length ?? 0
  const pct = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0

  return (
    <header className="px-6 pb-16 pt-[72px]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <Reveal>
          <div>
            <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-black leading-[1.12] tracking-tight">
              Aprenda IA <em className="italic pb-1 text-accent-strong">escrevendo código</em>,
              não assistindo aula.
            </h1>
            <p className="mt-5 max-w-[36ch] text-[17px] leading-relaxed text-ink-secondary">
              Lições interativas com editor e sandbox embutidos. IA para devs, no seu ritmo,
              com certificado por fase.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/courses/ia-para-devs"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-accent-deep active:scale-[0.98] dark:bg-accent dark:text-zinc-950 dark:hover:bg-accent-strong"
              >
                Começar grátis
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full border border-line-strong px-6 py-3 text-[15px] font-bold text-ink transition-colors hover:bg-background-hover active:scale-[0.98]"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Card de progresso - a assinatura (real component preview, não fake screenshot) */}
        {course && (
          <Reveal delay={120}>
            <div className="rounded-[16px] border border-line bg-surface p-7 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[15px] font-bold">{course.title}</h3>
                  <p className="mt-1 text-[13px] text-ink-muted">
                    Sua trilha · {doneCount} de {totalLessons} lições
                    {user ? '' : ' (faça login para salvar progresso)'}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[13px] font-bold text-accent-strong">
                  {pct}%
                </span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-background-hover">
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-5 flex flex-col">
                {course.phases.slice(0, 2).flatMap((p) =>
                  p.lessons.map((l, i) => {
                    const done = completedIds.has(l.id)
                    return (
                      <Link
                        key={l.id}
                        href={`/lessons/${l.id}`}
                        className="group flex items-center gap-3 border-t border-line py-2.5 text-sm first:border-t-0 first:pt-0 last:pb-0"
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
                        <span
                          className={
                            done
                              ? 'font-medium text-ink'
                              : 'font-medium text-ink-secondary group-hover:text-ink'
                          }
                        >
                          {l.title.replace(/—|–/g, '-')}
                        </span>
                      </Link>
                    )
                  }),
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Faixa de fatos sob o hero — substitui o micro-strip que estava dentro do hero */}
      <Reveal delay={200}>
        <div className="mx-auto mt-14 max-w-[1280px]">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-5 text-[13px] font-medium text-ink-secondary">
            <span>Fase 01 gratuita</span>
            <span aria-hidden className="hidden h-4 w-px bg-line-strong sm:block" />
            <span>Sem cartão de crédito</span>
            <span aria-hidden className="hidden h-4 w-px bg-line-strong sm:block" />
            <span>Certificado por fase</span>
            <span aria-hidden className="hidden h-4 w-px bg-line-strong sm:block" />
            <span>Conteúdo 100% em português</span>
          </div>
        </div>
      </Reveal>
    </header>
  )
}
