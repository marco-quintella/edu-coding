import { getCurrentUser } from '@/lib/auth/server'
import { CHALLENGES } from '@/lib/challenges/definitions'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { InterviewChallenge } from '@/components/interview-challenge'

export const metadata = {
  title: 'Desafios de entrevista — Edu Coding',
}

const PHASE_NAMES: Record<number, string> = {
  1: 'Fundamentos',
  2: 'Evolução da IA',
  3: 'OpenAI/LangChain',
  4: 'Multimídia',
  5: 'Privacidade',
}

export default async function ChallengesPage() {
  const user = await getCurrentUser()

  return (
    <>
      <Nav user={user} />
      <main className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Desafios de entrevista</h1>
            <p className="mt-1 text-sm text-ink-muted">
              5 perguntas clássicas de entrevista de ML — uma por fase. Responda como em
              uma entrevista real e receba avaliação por rubrica (conceito, exemplo,
              profundidade). Posiciona seu conhecimento pro mercado.
            </p>
          </div>

          {CHALLENGES.map((c) => (
            <section key={c.id}>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ink-muted">
                Fase {c.phase} — {PHASE_NAMES[c.phase]}
              </p>
              <InterviewChallenge
                question={c.question}
                hint={c.hint}
                phase={c.phase}
              />
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
