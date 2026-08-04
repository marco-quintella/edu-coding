'use client'

import { useState, useTransition } from 'react'

export interface ExecResponse {
  stdout?: string
  stderr?: string
  exitCode?: number
  durationMs?: number
  plots?: string[]
  error?: string
  message?: string
}

export function useSandboxExec() {
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [exitCode, setExitCode] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [plots, setPlots] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  function run(lessonId: string | undefined, code: string, apiKey?: string, lessonSlug?: string) {
    setOutput('')
    setError('')
    setExitCode(null)
    setDuration(null)
    setPlots([])

    startTransition(async () => {
      try {
        const res = await fetch('/api/exec', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lessonId,
            lessonSlug,
            code,
            apiKey: apiKey ? apiKey.trim() : undefined,
          }),
          credentials: 'include',
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
        setPlots(data.plots ?? [])
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
      }
    })
  }

  return { output, error, exitCode, duration, plots, isPending, run }
}
