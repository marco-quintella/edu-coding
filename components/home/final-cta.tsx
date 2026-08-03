import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from './reveal'

export function FinalCta() {
  return (
    <section className="px-6 pb-20 pt-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] bg-zinc-950 px-8 py-16 text-center dark:bg-surface-2 dark:ring-1 dark:ring-line">
            {/* Gradiente de apoio em esmeralda, sutil — não é AI-purple */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgb(16_185_129/0.18),transparent_70%)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-[18ch] text-[clamp(1.8rem,3.6vw,2.6rem)] font-black leading-[1.08] tracking-tight text-white">
                Pronto para começar?
              </h2>
              <p className="mx-auto mt-4 max-w-[40ch] text-[15px] leading-relaxed text-zinc-400">
                A Fase 01 é inteiramente gratuita. A primeira lição está a dois minutos de distância.
              </p>
              <Link
                href="/signup"
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[15px] font-bold text-zinc-950 transition-colors hover:bg-accent-strong active:scale-[0.98]"
              >
                Começar grátis
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
