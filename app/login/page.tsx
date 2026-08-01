'use client'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-md w-full mx-auto px-6 py-16">
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Entrar</h1>
          <p className="text-gray-600 mb-6 text-sm">
            Bem-vindo de volta ao Edu Coding.
          </p>

          <div id="login-error" className="hidden mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800" />

          <form
            id="login-form"
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const email = String(formData.get('email') ?? '').trim().toLowerCase()
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
            >
              Entrar
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Não tem conta?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
