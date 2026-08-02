'use client'

import { useState } from 'react'
import type { QuizOption, QuizQuestionWithOptions } from '@/lib/db/queries'

interface Props {
  lessonId: string
  questions: QuizQuestionWithOptions[]
}

export function Quiz({ lessonId, questions }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const totalCorrect = questions.filter(
    (q) => answers[q.id] === q.correctOptionId,
  ).length
  const pct = Math.round((totalCorrect / questions.length) * 100)

  async function submit() {
    setSubmitted(true)
    setSaving(true)
    setSaveError(null)
    try {
      const res = await fetch(`/api/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizScore: pct }),
      })
      if (!res.ok) {
        setSaveError(`HTTP ${res.status}`)
      }
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : String(e))
    } finally {
      setSaving(false)
    }
  }

  function reset() {
    setAnswers({})
    setSubmitted(false)
    setSaveError(null)
  }

  const allAnswered = Object.keys(answers).length === questions.length

  return (
    <div className="my-8 rounded-[16px] border border-line bg-surface p-6 shadow-card">
      <h2 className="mb-4 text-2xl font-bold tracking-tight">Quiz</h2>

      <ol className="space-y-6">
        {questions.map((q, i) => (
          <li key={q.id}>
            <p className="mb-3 font-semibold text-ink">
              {i + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt: QuizOption) => {
                const isAnswered = answers[q.id] === opt.id
                const isCorrect = submitted && opt.id === q.correctOptionId
                const isWrong =
                  submitted && isAnswered && opt.id !== q.correctOptionId

                return (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-[12px] border p-3 transition-colors ${
                      isCorrect
                        ? 'border-accent bg-accent-soft'
                        : isWrong
                          ? 'border-danger bg-danger/5'
                          : isAnswered
                            ? 'border-accent bg-accent-soft/40'
                            : 'border-line hover:border-line-strong'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt.id}
                      checked={isAnswered}
                      disabled={submitted}
                      onChange={() => setAnswers({ ...answers, [q.id]: opt.id })}
                      className="mt-1 accent-accent"
                    />
                    <span className="flex-1 text-ink">{opt.text}</span>
                    {submitted && isCorrect && (
                      <span className="text-sm font-bold text-accent-strong">✓</span>
                    )}
                    {submitted && isWrong && (
                      <span className="text-sm font-bold text-danger">✗</span>
                    )}
                  </label>
                )
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex items-center gap-4">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={!allAnswered || saving}
            className="rounded-full bg-accent px-5 py-2 font-bold text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Enviar respostas'}
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-lg font-semibold text-ink">
              Pontuação:{' '}
              <span className={pct >= 70 ? 'text-accent-strong' : 'text-amber-600'}>
                {pct}%
              </span>{' '}
              <span className="text-sm font-normal text-ink-muted">
                ({totalCorrect}/{questions.length})
              </span>
            </div>
            <button
              onClick={reset}
              className="rounded-full border border-line-strong px-3 py-1 text-sm text-ink-secondary transition-colors hover:bg-background-hover"
            >
              Tentar de novo
            </button>
          </div>
        )}
      </div>

      {!allAnswered && !submitted && (
        <p className="mt-3 text-sm text-ink-muted">
          Responda todas as perguntas para enviar.
        </p>
      )}

      {saveError && (
        <p className="mt-3 rounded-[12px] bg-amber-50 p-2 text-sm text-amber-800">
          Não salvou progresso: {saveError}
        </p>
      )}
    </div>
  )
}
