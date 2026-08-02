'use client'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-[16px] border border-line bg-surface p-8 shadow-card">
          <Link href="/" className="mb-6 flex items-center gap-2.5 font-black tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent font-mono text-[13px] font-black text-white">
              &gt;_
            </span>
            Edu Coding
          </Link>
          <h1 className="text-3xl font-black tracking-tight">Entrar</h1>
          <p className="mb-6 mt-1 text-sm text-ink-secondary">
            Bem-vindo de volta ao Edu Coding.
          </p>

          <div
            id="login-error"
            className="mb-4 hidden rounded-[12px] border border-danger/30 bg-danger/5 p-3 text-sm text-danger"
          />

          <form
            id="login-form"
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const email = String(formData.get('email') ?? '')
                .trim()
                .toLowerCase()
              const password = String(formData.get('password') ?? '')
              const errEl = document.getElementById('login-error') as HTMLDivElement

              try {
                const res = await fetch('/api/auth/sign-in/email', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password }),
                  credentials: 'include',
                })
                if (!res.ok) {
                  const data = await res.json().catch(() => ({}))
                  errEl.textContent = data.message || 'Credenciais inválidas'
                  errEl.classList.remove('hidden')
                  return
                }
                window.location.href = '/courses'
              } catch (err) {
                errEl.textContent = String(err)
                errEl.classList.remove('hidden')
              }
            }}
          >
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-[12px] border border-line-strong bg-surface px-3 py-2 text-ink transition-colors placeholder:text-ink-muted focus:border-accent focus:outline-none"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">
                Senha
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-[12px] border border-line-strong bg-surface px-3 py-2 text-ink transition-colors placeholder:text-ink-muted focus:border-accent focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-accent px-4 py-2.5 font-bold text-white transition-all hover:bg-accent-strong active:scale-[0.98]"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-secondary">
            Não tem conta?{' '}
            <Link href="/signup" className="font-semibold text-accent-strong hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
