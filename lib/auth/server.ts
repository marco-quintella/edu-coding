import { headers } from 'next/headers'
import { auth } from './index'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'

/**
 * Server-only helper que retorna o user autenticado ou null.
 * Também garante que a snapshot na tabela `users` existe.
 */
export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user
  if (!user) return null

  // Sincroniza snapshot local (id + email) se ainda não existir.
  await db
    .insert(users)
    .values({ id: user.id, email: user.email })
    .onConflictDoNothing()

  return user
}

/**
 * Helper estrito — joga se não autenticado.
 */
export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) throw new Error('UNAUTHENTICATED')
  return user
}
