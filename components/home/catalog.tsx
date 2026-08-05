import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from './reveal'

interface Course {
  id: string
  slug: string
  title: string
  description: string | null
}

const coverSrc = (slug: string) =>
  slug === 'ia-para-devs' ? '/images/course-ia-para-devs.jpg' : null

export function Catalog({ courses }: { courses: Course[] }) {
  return (
    <section className="border-t border-line px-6 py-16">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(1.8rem,3.4vw,2.4rem)] font-black leading-[1.1] tracking-tight">
            Catálogo
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15px] text-ink-secondary">
            Um curso agora, mais a caminho. Todo o conteúdo em português.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {courses.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <Link
                href={`/courses/${c.slug}`}
                className="group block overflow-hidden rounded-[16px] border border-line bg-surface transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-pop active:scale-[0.99]"
              >
                {/* Imagem real temática (foto de código, self-hosted) — nunca div-fake */}
                <div className="relative aspect-[16/9] overflow-hidden bg-background-hover">
                  {coverSrc(c.slug) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={coverSrc(c.slug)!}
                      alt={`Capa do curso ${c.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-accent-soft">
                      <span className="text-sm font-semibold text-accent-strong">Em breve</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-strong">
                    {c.slug === 'ia-para-devs' ? 'Disponível' : 'Em breve'}
                  </span>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-extrabold tracking-tight">{c.title}</h3>
                    <ArrowRight
                      size={18}
                      weight="bold"
                      className="mt-1 shrink-0 text-ink-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{c.description ?? ''}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
