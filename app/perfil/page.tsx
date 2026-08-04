import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/server'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ProfileSettings } from '@/components/profile-settings'

export const metadata = {
  title: 'Perfil — Edu Coding',
}

export default async function ProfilePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/perfil')

  return (
    <>
      <Nav user={user} />
      <main className="px-6 py-16">
        <div className="mx-auto max-w-lg">
          <ProfileSettings />
        </div>
      </main>
      <Footer />
    </>
  )
}
