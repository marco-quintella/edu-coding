import { BookOpenText, TerminalWindow, SealCheck } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from './reveal'

const steps = [
  {
    icon: BookOpenText,
    title: 'Conceito em texto',
    desc: 'Explicação direta, sem enrolação. O essencial para entender o algoritmo antes de tocar no código.',
  },
  {
    icon: TerminalWindow,
    title: 'Você executa',
    desc: 'Editor e sandbox Python embutidos. Rode, quebre, corrija. O feedback é imediato.',
  },
  {
    icon: SealCheck,
    title: 'Quiz e certificado',
    desc: 'Cada fase termina com verificação e micro-certificado. Progresso que você pode comprovar.',
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-line px-6 py-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <Reveal>
              <h2 className="max-w-[16ch] text-[clamp(1.8rem,3.4vw,2.4rem)] font-black leading-[1.1] tracking-tight">
                O código roda de verdade ao lado do conteúdo
              </h2>
            </Reveal>
            <div className="mt-10">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 90}>
                  <div className="group grid gap-4 border-t border-line py-7 transition-colors first:border-t-0 sm:grid-cols-[64px_1fr] sm:items-start sm:gap-6">
                    <div className="grid h-12 w-12 place-items-center rounded-[12px] bg-accent-soft text-accent-strong transition-colors group-hover:bg-accent group-hover:text-white">
                      <step.icon size={22} weight="bold" />
                    </div>
                    <div>
                      <h3 className="pt-1 text-lg font-bold tracking-tight">{step.title}</h3>
                      <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-ink-secondary">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Imagem editorial de apoio — foto real de código, self-hosted */}
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[24px] border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/editor-sandbox.jpg"
                alt="Editor de código aberto com um sandbox de execução ao lado"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
