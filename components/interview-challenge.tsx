'use client'

import { useState } from 'react'
import { Lightning } from '@phosphor-icons/react/dist/ssr'

interface RubricScore {
  score: number
  feedback: string
  strengths: string[]
  gaps: string[]
}

interface InterviewChallengeProps {
  /** A pergunta de entrevista */
  question: string
  /** O que uma boa resposta deveria cobrir (usado na rubrica) */
  hint?: string
  /** Fase do desafio (para título) */
  phase?: number
}

/**
 * Desafio de entrevista — pergunta aberta de ML. O aluno responde em
 * texto e recebe avaliação com rubrica (conceito, exemplo, profundidade).
 */
export function InterviewChallenge({
  question,
  hint,
  phase,
}: InterviewChallengeProps) {
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<RubricScore | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit() {
    if (answer.trim().length < 10 || pending) return
    setPending(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer, hint }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.message ?? data.error)
        return
      }
      setResult(data.rubric)
    } catch {
      setError('Erro de conexão. Tente de novo.')
    } finally {
      setPending(false)
    }
  }

  const scoreColor =
    result && result.score >= 70
      ? 'text-accent-strong'
      : result && result.score >= 50
        ? 'text-amber-500'
        : 'text-danger'

  return (
    <div className="my-8 overflow-hidden rounded-[16px] border border-line bg-surface shadow-card">
      <div className="flex items-center justify-between gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[13px] font-bold text-ink">
          <Lightning size={15} weight="fill" className="text-accent" />
          Desafio de entrevista{phase ? ` — Fase ${phase}` : ''}
        </span>
        <span className="font-mono text-[11px] text-ink-muted">pergunta aberta</span>
      </div>

      <div className="px-4 py-4">
        <p className="text-[15px] font-bold leading-relaxed text-ink">{question}</p>
        {hint && (
          <p className="mt-2 text-xs text-ink-muted">
            💡 Uma boa resposta cobre: {hint}
          </p>
        )}

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder="Responda como em uma entrevista real — defina o conceito, dê um exemplo concreto, conecte com a prática…"
          className="mt-3 w-full rounded-[12px] border border-line-strong bg-surface px-3 py-2.5 text-sm leading-relaxed text-ink outline-none transition-colors focus:border-accent"
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-ink-muted">{answer.trim().length} caracteres</span>
          <button
            onClick={submit}
            disabled={answer.trim().length < 10 || pending}
            className="rounded-full bg-accent px-5 py-2 text-[13px] font-bold text-white transition-all hover:bg-accent-strong active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-accent dark:text-zinc-950"
          >
            {pending ? 'Avaliando…' : 'Avaliar resposta'}
          </button>
        </div>

        {error && <p className="mt-3 text-sm font-semibold text-danger">{error}</p>}

        {result && (
          <div className="mt-4 rounded-[12px] border border-line bg-surface-2 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-ink">Avaliação</span>
              <span className={`font-mono text-2xl font-black ${scoreColor}`}>
                {result.score}
                <span className="text-sm text-ink-muted">/100</span>
              </span>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              {result.feedback}
            </p>

            {result.strengths.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-bold text-accent-strong">✅ Pontos fortes</p>
                <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs text-ink-secondary">
                  {result.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.gaps.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-bold text-amber-500">📌 O que faltou</p>
                <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs text-ink-secondary">
                  {result.gaps.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
