'use client'

import { useState, useTransition } from 'react'
import Editor from '@monaco-editor/react'

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
  initialCode: string
  language?: string
}

export function SandboxRunner({ lessonId, initialCode, language = 'python' }: Props) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [exitCode, setExitCode] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [isPending, startTransition] = useTransition()

  function run() {
    setOutput('')
    setError('')
    setExitCode(null)
    setDuration(null)

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
        })
        const data: ExecResponse = await res.json()
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
    <div className="border border-gray-300 rounded-lg overflow-hidden my-8 bg-white shadow-sm">
      <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b border-gray-300">
        <span className="font-mono text-sm font-semibold text-gray-700">
          sandbox · python
        </span>
        <button
          onClick={run}
          disabled={isPending}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {(output || error || duration !== null) && (
        <div className="bg-gray-900 text-gray-100 font-mono text-xs p-4 min-h-[80px]">
          {output && <pre className="whitespace-pre-wrap">{output}</pre>}
          {error && (
            <pre className="whitespace-pre-wrap text-red-400 mt-2">{error}</pre>
          )}
          <div className="text-gray-500 mt-3 flex gap-4 text-xs">
            {exitCode !== null && (
              <span>
                exit:{' '}
                <span className={exitCode === 0 ? 'text-green-400' : 'text-red-400'}>
                  {exitCode}
                </span>
              </span>
            )}
            {duration !== null && <span>⏱ {duration}ms</span>}
          </div>
        </div>
      )}

      <details
        className="px-4 py-2 bg-gray-50 text-sm border-t border-gray-200"
        open={showKey}
        onToggle={(e) => setShowKey((e.target as HTMLDetailsElement).open)}
      >
        <summary className="cursor-pointer text-gray-700 select-none">
          ⚙ Configurar LLM API Key (BYOK — opcional)
        </summary>
        <p className="text-xs text-gray-500 mt-2 mb-2">
          Sua chave é passada como env var ao sandbox via BYOK. Não armazenamos.
        </p>
        <input
          type="password"
          placeholder="sk-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full border border-gray-300 px-2 py-1 rounded text-sm font-mono"
        />
      </details>
    </div>
  )
}
