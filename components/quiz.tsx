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
    (q) => answers[q.id] === q.correctOptionId
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
    <div className="my-8 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Quiz</h2>

      <ol className="space-y-6">
        {questions.map((q, i) => (
          <li key={q.id}>
            <p className="font-medium text-gray-900 mb-3">
              {i + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt: QuizOption) => {
                const isAnswered = answers[q.id] === opt.id
                const isCorrect = submitted && opt.id === q.correctOptionId
                const isWrong = submitted && isAnswered && opt.id !== q.correctOptionId

                return (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-2 p-3 rounded border cursor-pointer transition-colors ${
                      isCorrect
                        ? 'border-green-500 bg-green-50'
                        : isWrong
                          ? 'border-red-500 bg-red-50'
                          : isAnswered
                            ? 'border-blue-400 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt.id}
                      checked={isAnswered}
                      disabled={submitted}
                      onChange={() => setAnswers({ ...answers, [q.id]: opt.id })}
                      className="mt-1"
                    />
                    <span className="flex-1 text-gray-800">{opt.text}</span>
                    {submitted && isCorrect && (
                      <span className="text-green-600 text-sm">✓</span>
                    )}
                    {submitted && isWrong && (
                      <span className="text-red-600 text-sm">✗</span>
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
            className="px-5 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Salvando...' : 'Enviar respostas'}
          </button>
        ) : (
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-lg font-semibold">
              Pontuação:{' '}
              <span className={pct >= 70 ? 'text-green-600' : 'text-amber-600'}>
                {pct}%
              </span>{' '}
              <span className="text-gray-500 text-sm font-normal">
                ({totalCorrect}/{questions.length})
              </span>
            </div>
            <button
              onClick={reset}
              className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            >
              Tentar de novo
            </button>
          </div>
        )}
      </div>

      {!allAnswered && !submitted && (
        <p className="text-sm text-gray-500 mt-3">
          Responda todas as perguntas para enviar.
        </p>
      )}

      {saveError && (
        <p className="text-sm text-amber-700 bg-amber-50 p-2 rounded mt-3">
          Não salvou progresso: {saveError}
        </p>
      )}
    </div>
  )
}
