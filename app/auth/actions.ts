'use server'

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function signUpAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const name = String(formData.get('name') ?? '').trim()

  if (!email || !password || password.length < 8) {
    redirect('/signup?error=invalid')
  }

  try {
    await auth.api.signUpEmail({
      body: { email, password, name: name || email.split('@')[0] },
      headers: await headers(),
    })
  } catch {
    redirect('/signup?error=exists')
  }

  redirect('/courses')
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    redirect('/login?error=invalid')
  }

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    })
  } catch {
    redirect('/login?error=credentials')
  }

  redirect('/courses')
}
