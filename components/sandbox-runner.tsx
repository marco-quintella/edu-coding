'use client'

import { useState, useTransition } from 'react'
import Editor from '@monaco-editor/react'
import { getInitialCode } from '@/lib/lessons/initial-codes'

interface ExecResponse {
  stdout?: string
  stderr?: string
  exitCode?: number
  durationMs?: number
  error?: string
  message?: string
}

interface Props {
  lessonId: string
  /** Slug da lição — usado para buscar o código inicial no registro central. */
  lessonSlug?: string
  /** Fallback legado: código inline (se não houver lessonSlug). */
  initialCode?: string
  language?: string
}

export function SandboxRunner({
  lessonId,
  lessonSlug,
  initialCode,
  language = 'python',
}: Props) {
  // Código inicial: registro central (por slug) > prop inline > vazio
  const codeFromRegistry = lessonSlug ? getInitialCode(lessonSlug) : ''
  const [code, setCode] = useState(codeFromRegistry || initialCode || '')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [exitCode, setExitCode] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [isPending, startTransition] = useTransition()

  function run() {
    setOutput('')
    setError('')
    setExitCode(null)
    setDuration(null)
    setAuthError(false)

    startTransition(async () => {
      try {
        const res = await fetch('/api/exec', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lessonId,
            code,
            apiKey: apiKey.trim() || undefined,
          }),
          credentials: 'include',
        })
        const data: ExecResponse = await res.json()
        if (res.status === 401) {
          setAuthError(true)
          return
        }
        if (data.error) {
          setError(data.message ?? data.error)
          return
        }
        setOutput(data.stdout ?? '')
        setError(data.stderr ?? '')
        setExitCode(data.exitCode ?? null)
        setDuration(data.durationMs ?? null)
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
      }
    })
  }

  return (
    <div className="my-8 overflow-hidden rounded-[16px] border border-line bg-surface shadow-card transition-all focus-within:border-accent focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_20%,transparent)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="ml-2 font-mono text-xs text-ink-secondary">
          main.py
        </span>
        <button
          onClick={run}
          disabled={isPending}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[13px] font-bold text-white transition-all hover:bg-accent-strong active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? '⏳ rodando...' : '▶ Run'}
        </button>
      </div>

      <Editor
        height="220px"
        defaultLanguage={language}
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

      {(output || error || duration !== null || authError) && (
        <div className="min-h-[80px] bg-[#0e1116] p-4 font-mono text-xs text-gray-100">
          {output && <pre className="whitespace-pre-wrap">{output}</pre>}
          {error && (
            <pre className="mt-2 whitespace-pre-wrap text-red-400">{error}</pre>
          )}
          {authError && (
            <div className="mt-1">
              <p className="text-amber-400">
                Você precisa estar logado para executar o código.
              </p>
              <div className="mt-2 flex gap-2">
                <a
                  href="/login"
                  className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white hover:bg-accent-strong"
                >
                  Fazer login
                </a>
                <a
                  href="/signup"
                  className="rounded-full border border-line-strong px-3 py-1 text-xs font-bold text-gray-300 hover:bg-white/10"
                >
                  Criar conta
                </a>
              </div>
            </div>
          )}
          <div className="mt-3 flex gap-4 text-xs text-gray-500">
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

      <details
        className="border-t border-line bg-surface-2 px-4 py-2 text-sm"
        open={showKey}
        onToggle={(e) => setShowKey((e.target as HTMLDetailsElement).open)}
      >
        <summary className="cursor-pointer select-none text-ink-secondary">
          ⚙ Configurar LLM API Key (BYOK, opcional)
        </summary>
        <p className="mb-2 mt-2 text-xs text-ink-muted">
          Sua chave é passada como env var ao sandbox via BYOK. Não armazenamos.
        </p>
        <input
          type="password"
          placeholder="sk-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full rounded-[12px] border border-line-strong bg-surface px-3 py-1.5 font-mono text-sm text-ink transition-colors focus:border-accent"
        />
      </details>
    </div>
  )
}
