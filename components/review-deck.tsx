'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowClockwise } from '@phosphor-icons/react/dist/ssr'

interface DueCard {
  card: { id: string; phase: number; question: string; answer: string }
  state: { ease: number; interval: number; repetitions: number }
}

interface ReviewStats {
  total: number
  due: number
  byPhase: { phase: number; total: number; done: number }[]
}

type Quality = 'again' | 'good' | 'easy'

const PHASE_NAMES: Record<number, string> = {
  1: 'Fundamentos',
  2: 'Evolução da IA',
  3: 'OpenAI/LangChain',
  4: 'Multimídia',
  5: 'Privacidade',
}

/**
 * Revisão espaçada — flashcards SM-2. Mostra os cards vencidos,
 * vira a resposta, e agenda a próxima revisão (1d, 6d, ease×).
 */
export function ReviewDeck() {
  const [due, setDue] = useState<DueCard[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [phaseFilter, setPhaseFilter] = useState<number | undefined>(undefined)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    const qs = phaseFilter ? `?phase=${phaseFilter}` : ''
    const res = await fetch(`/api/review${qs}`)
    const data = await res.json()
    setDue(data.due ?? [])
    setStats(data.stats ?? null)
    setIndex(0)
    setFlipped(false)
  }, [phaseFilter])

  useEffect(() => {
    let cancelled = false
    const qs = phaseFilter ? `?phase=${phaseFilter}` : ''
    fetch(`/api/review${qs}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        setDue(data.due ?? [])
        setStats(data.stats ?? null)
        setIndex(0)
        setFlipped(false)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [phaseFilter])

  async function answer(quality: Quality) {
    if (saving) return
    const card = due[index]
    if (!card) return
    setSaving(true)
    try {
      await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: card.card.id, quality }),
      })
      setFlipped(false)
      setIndex((i) => i + 1)
      load() // atualiza estatísticas em background
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-ink-muted">Carregando cards…</p>
  }

  const card = due[index]
  const done = index

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Revisão espaçada</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Repita os conceitos-chave em intervalos crescentes — 1 dia, 6 dias, depois o
          fator do seu desempenho. Memória de longo prazo.
        </p>
      </div>

      {/* Filtro por fase */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setPhaseFilter(undefined)}
          className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
            phaseFilter === undefined
              ? 'bg-accent text-white'
              : 'border border-line-strong text-ink-secondary hover:bg-background-hover'
          }`}
        >
          Todas ({stats?.due ?? 0} pendentes)
        </button>
        {stats?.byPhase.map((p) => (
          <button
            key={p.phase}
            onClick={() => setPhaseFilter(p.phase)}
            className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
              phaseFilter === p.phase
                ? 'bg-accent text-white'
                : 'border border-line-strong text-ink-secondary hover:bg-background-hover'
            }`}
          >
            {PHASE_NAMES[p.phase]} ({p.done}/{p.total})
          </button>
        ))}
      </div>

      {!card ? (
        <div className="rounded-[16px] border border-line bg-surface p-10 text-center shadow-card">
          <ArrowClockwise size={28} className="mx-auto text-accent" />
          <p className="mt-3 font-bold text-ink">Tudo revisado! 🎉</p>
          <p className="mt-1 text-sm text-ink-muted">
            {done} cards respondidos nesta sessão. Volte em alguns dias para fixar.
          </p>
          <button
            onClick={load}
            className="mt-5 rounded-full border border-line-strong px-5 py-2 text-sm font-bold text-ink transition-colors hover:bg-background-hover"
          >
            Recarregar
          </button>
        </div>
      ) : (
        <>
          {/* Progresso */}
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span>
              Card {index + 1} de {due.length}
            </span>
            <span className="font-mono">
              fase {card.card.phase} · {PHASE_NAMES[card.card.phase]}
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-background-hover">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${due.length ? (index / due.length) * 100 : 0}%` }}
            />
          </div>

          {/* Card */}
          <button
            onClick={() => setFlipped(!flipped)}
            className="min-h-[220px] w-full cursor-pointer rounded-[16px] border border-line bg-surface p-8 text-left shadow-card transition-all hover:border-accent/40"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent-strong">
              {flipped ? 'Resposta' : 'Pergunta'} · clique para virar
            </span>
            <p className="mt-4 text-lg font-bold leading-relaxed text-ink">
              {flipped ? card.card.answer : card.card.question}
            </p>
          </button>

          {/* Botões de resposta (só após virar) */}
          {flipped && (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => answer('again')}
                disabled={saving}
                className="rounded-full border border-danger/40 bg-danger/5 py-2.5 text-sm font-bold text-danger transition-all hover:bg-danger/10 active:scale-[0.97] disabled:opacity-50"
              >
                Errei
              </button>
              <button
                onClick={() => answer('good')}
                disabled={saving}
                className="rounded-full bg-accent py-2.5 text-sm font-bold text-white transition-all hover:bg-accent-strong active:scale-[0.97] disabled:opacity-50 dark:bg-accent dark:text-zinc-950"
              >
                Acertei
              </button>
              <button
                onClick={() => answer('easy')}
                disabled={saving}
                className="rounded-full border border-accent/40 bg-accent-soft py-2.5 text-sm font-bold text-accent-strong transition-all hover:bg-accent/15 active:scale-[0.97] disabled:opacity-50"
              >
                Fácil
              </button>
            </div>
          )}
          {!flipped && (
            <p className="text-center text-xs text-ink-muted">
              Vire o card para responder — {PHASE_NAMES[card.card.phase]}
            </p>
          )}
        </>
      )}
    </div>
  )
}
