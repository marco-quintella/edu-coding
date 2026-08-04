import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { profiles } from '@/drizzle/profile.schema'
import { getCurrentUser } from '@/lib/auth/server'
import { eq } from 'drizzle-orm'

export const runtime = 'nodejs'

const ProfileUpdate = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_-]+$/, 'Apenas letras minúsculas, números, _ e -')
    .optional(),
  bio: z.string().max(200).optional(),
  public: z.boolean().optional(),
})

/** GET: perfil do usuário logado (configuração). */
export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, user.id))
    .limit(1)

  return NextResponse.json(
    profile ?? { userId: user.id, username: '', bio: '', public: false }
  )
}

/** PUT: cria/atualiza o perfil. */
export async function PUT(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = ProfileUpdate.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'bad_request', message: parsed.error.issues[0]?.message ?? 'Dados inválidos' },
      { status: 400 }
    )
  }

  // Username default: parte do email (se nunca definido)
  const data = parsed.data

  try {
    const [profile] = await db
      .insert(profiles)
      .values({
        userId: user.id,
        username: data.username ?? defaultUsername(user),
        bio: data.bio ?? '',
        public: data.public ?? false,
      })
      .onConflictDoUpdate({
        target: profiles.userId,
        set: {
          username: data.username,
          bio: data.bio,
          public: data.public,
          updatedAt: new Date(),
        },
      })
      .returning()

    return NextResponse.json(profile)
  } catch (err) {
    // Unique violation no username
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('unique') || msg.includes('duplicate')) {
      return NextResponse.json(
        { error: 'username_taken', message: 'Este nome de usuário já está em uso.' },
        { status: 409 }
      )
    }
    throw err
  }
}

function defaultUsername(user: { email: string }): string {
  const base = user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-')
  return base.slice(0, 30) || 'dev'
}
