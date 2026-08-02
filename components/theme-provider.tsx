'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

const ThemeContext = createContext<{
  theme: Theme
  resolved: 'light' | 'dark'
  setTheme: (t: Theme) => void
}>({
  theme: 'system',
  resolved: 'light',
  setTheme: () => {},
})

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  try {
    const stored = localStorage.getItem('edu-theme')
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {}
  return 'system'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  // O script inline no <head> já aplicou .dark antes da hidratação.
  // Inicializa 'resolved' a partir da classe real para evitar conflito.
  const [resolved, setResolved] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
  })

  // Aplica a classe .dark no <html> sempre que o tema resolvido muda
  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [resolved])

  // Recalcula o tema resolvido quando o tema escolhido ou o sistema muda
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      setResolved(theme === 'system' ? (mq.matches ? 'dark' : 'light') : theme)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    try {
      localStorage.setItem('edu-theme', t)
    } catch {}
  }

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
