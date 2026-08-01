'use client'

import Link from 'next/link'

interface Props {
  user: { id: string; email: string; name?: string | null } | null
}

export function AuthButtons({ user }: Props) {
  if (user) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="text-gray-700">
          Olá,{' '}
          <span className="font-medium">{user.name || user.email}</span>
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
          className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
        >
          Sair
        </button>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href="/login"
        className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
      >
        Entrar
      </Link>
      <Link
        href="/signup"
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Criar conta
      </Link>
    </div>
  )
}
