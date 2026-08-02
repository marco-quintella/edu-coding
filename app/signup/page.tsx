'use client'

import Link from 'next/link'

export default function SignupPage() {
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
          <h1 className="text-3xl font-black tracking-tight">Criar conta</h1>
          <p className="mb-6 mt-1 text-sm text-ink-secondary">
            Comece a aprender IA para devs hoje.
          </p>

          <div
            id="signup-error"
            className="mb-4 hidden rounded-[12px] border border-danger/30 bg-danger/5 p-3 text-sm text-danger"
          />

          <form
            id="signup-form"
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const email = String(formData.get('email') ?? '')
                .trim()
                .toLowerCase()
              const password = String(formData.get('password') ?? '')
              const name = String(formData.get('name') ?? '').trim()
              const errEl = document.getElementById(
                'signup-error',
              ) as HTMLDivElement

              if (password.length < 8) {
                errEl.textContent = 'Senha precisa ter 8+ caracteres.'
                errEl.classList.remove('hidden')
                return
              }

              try {
                const res = await fetch('/api/auth/sign-up/email', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email,
                    password,
                    name: name || email.split('@')[0],
                  }),
                  credentials: 'include',
                })
                if (!res.ok) {
                  const data = await res.json().catch(() => ({}))
                  errEl.textContent = data.message || 'Falha ao criar conta'
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
                Nome
              </label>
              <input
                type="text"
                name="name"
                className="w-full rounded-[12px] border border-line-strong bg-surface px-3 py-2 text-ink transition-colors placeholder:text-ink-muted focus:border-accent focus:outline-none"
                placeholder="Seu nome"
              />
            </div>

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
                Senha <span className="font-normal text-ink-muted">(8+ caracteres)</span>
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                className="w-full rounded-[12px] border border-line-strong bg-surface px-3 py-2 text-ink transition-colors placeholder:text-ink-muted focus:border-accent focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-accent px-4 py-2.5 font-bold text-white transition-all hover:bg-accent-strong active:scale-[0.98]"
            >
              Criar conta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-secondary">
            Já tem conta?{' '}
            <Link href="/login" className="font-semibold text-accent-strong hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
