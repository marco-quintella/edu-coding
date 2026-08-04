'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { GLOSSARY_TERMS } from '@/lib/glossary/terms'

const PHASE_NAMES: Record<number, string> = {
  1: 'Fundamentos',
  2: 'Evolução da IA',
  3: 'OpenAI/LangChain',
  4: 'Multimídia',
  5: 'Privacidade',
}

interface GlossaryProps {
  /** Map lessonSlug → lessonId (resolvido no servidor — estável entre seeds) */
  lessonLinks: Record<string, string>
}

/**
 * Glossário interativo — busca por termo/definição, agrupado por fase,
 * com link para a lição de origem de cada conceito.
 */
export function Glossary({ lessonLinks }: GlossaryProps) {
  const [query, setQuery] = useState('')
  const [phaseFilter, setPhaseFilter] = useState<number | undefined>(undefined)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GLOSSARY_TERMS.filter((t) => {
      if (phaseFilter !== undefined && t.phase !== phaseFilter) return false
      if (!q) return true
      return (
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      )
    })
  }, [query, phaseFilter])

  const byPhase = useMemo(() => {
    const map = new Map<number, typeof filtered>()
    for (const t of filtered) {
      const list = map.get(t.phase) ?? []
      list.push(t)
      map.set(t.phase, list)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0])
  }, [filtered])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Glossário</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {GLOSSARY_TERMS.length} conceitos do curso — busque e pule para a lição
          onde cada um é apresentado.
        </p>
      </div>

      {/* Busca */}
      <div className="flex items-center gap-2 rounded-[12px] border border-line-strong bg-surface px-3 focus-within:border-accent">
        <MagnifyingGlass size={18} className="shrink-0 text-ink-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar: overfitting, kernel, inércia…"
          className="w-full bg-transparent py-2.5 text-sm text-ink outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-xs font-bold text-ink-muted hover:text-ink"
          >
            limpar
          </button>
        )}
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
          Todas ({GLOSSARY_TERMS.length})
        </button>
        {[1, 2, 3, 4, 5].map((p) => {
          const count = GLOSSARY_TERMS.filter((t) => t.phase === p).length
          return (
            <button
              key={p}
              onClick={() => setPhaseFilter(p)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                phaseFilter === p
                  ? 'bg-accent text-white'
                  : 'border border-line-strong text-ink-secondary hover:bg-background-hover'
              }`}
            >
              {PHASE_NAMES[p]} ({count})
            </button>
          )
        })}
      </div>

      {/* Resultados */}
      {byPhase.length === 0 && (
        <p className="rounded-[12px] border border-line bg-surface p-6 text-center text-sm text-ink-muted">
          Nenhum termo encontrado para &ldquo;{query}&rdquo;.
        </p>
      )}

      {byPhase.map(([phase, terms]) => (
        <section key={phase}>
          <h2 className="text-lg font-bold tracking-tight">
            Fase {phase} — {PHASE_NAMES[phase]}
          </h2>
          <div className="mt-3 space-y-2">
            {terms.map((t) => (
              <div
                key={t.id}
                className="rounded-[12px] border border-line bg-surface px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-ink">{t.term}</p>
                  {lessonLinks[t.lessonSlug] ? (
                    <Link
                      href={`/lessons/${lessonLinks[t.lessonSlug]}`}
                      className="shrink-0 text-xs font-semibold text-accent-strong hover:underline"
                    >
                      Ver na lição →
                    </Link>
                  ) : (
                    <span className="shrink-0 text-xs text-ink-muted">—</span>
                  )}
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-secondary">
                  {t.definition}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
