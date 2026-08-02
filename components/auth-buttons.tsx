'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { useTheme } from './theme-provider'

// Retorna true apenas no client após o mount (evita hydration mismatch no label)
const emptySubscribe = () => () => {}
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}

interface Props {
  user: { id: string; email: string; name?: string | null } | null
}

export function AuthButtons({ user }: Props) {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  const themeLabel =
    theme === 'dark' ? '☀ Light' : theme === 'light' ? '◐ Auto' : '☾ Dark'

  const cycleTheme = () => {
    const next =
      theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system'
    setTheme(next)
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={cycleTheme}
          title="Alternar tema (escuro / claro / sistema)"
          className="px-3 py-1.5 text-ink-secondary border border-line-strong rounded-full hover:bg-background-hover transition-colors"
        >
          {mounted ? themeLabel : '☾'}
        </button>
        <span className="text-ink-secondary">
          Olá,{' '}
          <span className="font-semibold text-ink">{user.name || user.email}</span>
        </span>
        <button
          onClick={async () => {
            await fetch('/api/auth/sign-out', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: '{}',
              credentials: 'include',
            })
            window.location.href = '/'
          }}
          className="px-3 py-1.5 text-ink-secondary border border-line-strong rounded-full hover:bg-background-hover transition-colors"
        >
          Sair
        </button>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={cycleTheme}
        title="Alternar tema (escuro / claro / sistema)"
        className="px-3 py-1.5 text-ink-secondary border border-line-strong rounded-full hover:bg-background-hover transition-colors"
      >
        {mounted ? themeLabel : '☾'}
      </button>
      <Link
        href="/login"
        className="px-3 py-1.5 text-ink-secondary border border-line-strong rounded-full hover:bg-background-hover transition-colors"
      >
        Entrar
      </Link>
      <Link
        href="/signup"
        className="px-4 py-1.5 bg-accent text-white rounded-full font-semibold hover:bg-accent-strong transition-colors"
      >
        Criar conta
      </Link>
    </div>
  )
}
