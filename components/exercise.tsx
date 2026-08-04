'use client'

import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useSandboxExec } from './use-sandbox-exec'
import { PlotGallery } from './plot-gallery'
import { getSolution, type Solution } from '@/lib/lessons/solutions'

/**
 * Verifica se o output bate com o esperado.
 *
 * O expectedOutput é tratado como TEXTO LITERAL (não regex): caracteres
 * especiais de regex são escapados, então o autor escreve "procurar esta
 * string no output" — sem se preocupar com `(`, `.`, `+`, etc.
 * (Antes, "shape: (3, 6)" falhava porque `(...)` era grupo de captura.)
 * Exportado para testes unitários.
 */
export function outputMatches(output: string, expectedOutput: string): boolean {
  const combined = (output || '').trim()
  if (combined.length === 0) return false
  const escaped = expectedOutput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  try {
    return new RegExp(escaped, 'i').test(combined)
  } catch {
    return combined.includes(expectedOutput)
  }
}

interface Props {
  /** Legado: ID da lição (UUID). Prefira lessonSlug. */
  lessonId?: string
  /** Slug da lição — estável entre seeds (preferível ao lessonId). */
  lessonSlug?: string
  /** Chave no registro de códigos iniciais (lib/lessons/initial-codes.ts) */
  codeKey: string
  /** Enunciado do exercício */
  title?: string
  /** O que procurar no stdout para considerar correto (regex ou string) */
  expectedOutput: string
  /** Dica exibida quando o output não bate */
  hint?: string
  /** Mostrar o output esperado ao aluno */
  showExpected?: boolean
}

export function Exercise({
  lessonId,
  lessonSlug,
  codeKey,
  title = 'Exercício',
  expectedOutput,
  hint,
  showExpected = true,
}: Props) {
  const { output, error, exitCode, duration, plots, isPending, run } = useSandboxExec()
  const [code, setCode] = useState('')
  const [aiFeedback, setAiFeedback] = useState('')
  const [feedbackState, setFeedbackState] = useState<'idle' | 'loading' | 'done'>('idle')
  const [showSolution, setShowSolution] = useState(false)
  const [solution, setSolution] = useState<Solution | null>(null)

  // Carrega a solução do instrutor (se existir) — depois do mount
  useEffect(() => {
    let cancelled = false
    import('@/lib/lessons/solutions').then((m) => {
      if (cancelled) return
      setSolution(m.getSolution(codeKey))
    })
    return () => {
      cancelled = true
    }
  }, [codeKey])

  // Carrega o código inicial do registro (client-side, após mount)
  const [initialCode, setInitialCode] = useState('')
  useEffect(() => {
    let cancelled = false
    import('@/lib/lessons/initial-codes').then((m) => {
      if (cancelled) return
      const c = m.getInitialCode(codeKey)
      setInitialCode(c)
      setCode(c)
    })
    return () => {
      cancelled = true
    }
  }, [codeKey])

  function handleRun() {
    setAiFeedback('')
    setFeedbackState('idle')
    run(lessonId, code, undefined, lessonSlug)
  }

  // Verifica o resultado após execução (roda junto com o exec)
  const outputToCheck = output + '\n' + error
  const isCorrect = outputMatches(outputToCheck, expectedOutput)

  // Mostra o veredito automaticamente quando o output chega
  const showVerdict = (output || error) && !isPending
  const verdict = showVerdict ? isCorrect : null

  // Corretor pedagógico: quando falha, busca feedback contextualizado.
  // 'loading' é derivado (verdict false + ainda não buscou) — sem setState
  // síncrono no efeito (lint react-hooks/set-state-in-effect).
  const feedbackBusy = verdict === false && feedbackState === 'idle'

  useEffect(() => {
    if (!feedbackBusy) return
    let cancelled = false
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        code,
        output: outputToCheck,
        expected: expectedOutput,
        hint,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        setAiFeedback(data.feedback ?? '')
        setFeedbackState('done')
      })
      .catch(() => {
        if (cancelled) return
        setAiFeedback('')
        setFeedbackState('done')
      })
    return () => {
      cancelled = true
    }
  }, [feedbackBusy, title, code, outputToCheck, expectedOutput, hint])

  return (
    <div className="my-8 overflow-hidden rounded-[16px] border border-line bg-surface shadow-card">
      <div className="flex items-center justify-between gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="text-[13px] font-bold text-ink">{title}</span>
        <span className="font-mono text-[11px] text-ink-muted">exercício</span>
      </div>

      {initialCode && (
        <div className="px-4 pt-3 text-sm text-ink-secondary">
          <p>Edite o código e clique em <strong className="text-ink">Rodar</strong>. O sistema verifica se a saída está correta.</p>
        </div>
      )}

      <Editor
        height="200px"
        defaultLanguage="python"
        value={code}
        onChange={(v) => setCode(v ?? '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />

      <div className="flex items-center gap-2 border-t border-line bg-surface-2 px-4 py-2">
        <button
          onClick={handleRun}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[13px] font-bold text-white transition-all hover:bg-accent-strong active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? '⏳ rodando...' : '▶ Rodar'}
        </button>
        {showExpected && (
          <span className="ml-auto font-mono text-[11px] text-ink-muted">
            esperado: <code className="text-accent-strong">{expectedOutput}</code>
          </span>
        )}
      </div>

      {(output || error || duration !== null) && (
        <div className="min-h-[60px] bg-[#0e1116] p-4 font-mono text-xs text-gray-100">
          {output && <pre className="whitespace-pre-wrap">{output}</pre>}
          {error && <pre className="mt-2 whitespace-pre-wrap text-red-400">{error}</pre>}
          <PlotGallery plots={plots} />
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
            {exitCode !== null && (
              <span>
                exit:{' '}
                <span className={exitCode === 0 ? 'text-emerald-400' : 'text-red-400'}>
                  {exitCode}
                </span>
              </span>
            )}
            {duration !== null && <span>⏱ {duration}ms</span>}
          </div>
        </div>
      )}

      {verdict === true && (
        <div className="border-t border-accent/40 bg-accent-soft px-4 py-3 text-sm font-semibold text-accent-strong">
          ✓ Correto! A saída bate com o esperado.
        </div>
      )}
      {verdict === true && solution && (
        <div className="border-t border-line bg-surface-2 px-4 py-3">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-accent-strong hover:underline"
          >
            <span className={`transition-transform ${showSolution ? 'rotate-90' : ''}`}>▸</span>
            {showSolution ? 'Ocultar solução do instrutor' : 'Ver solução do instrutor'}
          </button>

          {showSolution && (
            <div className="mt-3 space-y-3">
              <p className="rounded-[8px] border border-accent/30 bg-accent-soft px-3 py-2 text-xs leading-relaxed text-ink-secondary">
                <span className="font-bold text-ink">Por que assim:</span>{' '}
                {solution.explanation}
              </p>
              <Editor
                height="220px"
                defaultLanguage="python"
                value={solution.code}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 13,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
                theme="vs-dark"
              />
            </div>
          )}
        </div>
      )}
      {verdict === false && (
        <div className="border-t border-danger/30 bg-danger/5 px-4 py-3 text-sm">
          <div className="font-semibold text-danger">
            Ainda não. A saída não corresponde ao esperado.
          </div>
          {hint && <div className="mt-1 text-xs text-ink-secondary">💡 {hint}</div>}
          {feedbackBusy && (
            <div className="mt-2 text-xs text-ink-muted">
              🔎 Corretor pensando...
            </div>
          )}
          {feedbackState === 'done' && aiFeedback && (
            <div className="mt-2 rounded-[8px] border border-line bg-surface px-3 py-2 text-xs leading-relaxed text-ink-secondary">
              <span className="font-bold text-ink">Corretor:</span> {aiFeedback}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
