'use client'

import { useState, useTransition } from 'react'

export interface ExecResponse {
  stdout?: string
  stderr?: string
  exitCode?: number
  durationMs?: number
  error?: string
  message?: string
}

export function useSandboxExec() {
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [exitCode, setExitCode] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  function run(lessonId: string, code: string, apiKey?: string) {
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
            apiKey: apiKey?.trim() || undefined,
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
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
      }
    })
  }

  return { output, error, exitCode, duration, isPending, run }
}
