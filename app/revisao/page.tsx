import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/server'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ReviewDeck } from '@/components/review-deck'

export const metadata = {
  title: 'Revisão — Edu Coding',
}

export default async function ReviewPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/revisao')

  return (
    <>
      <Nav user={user} />
      <main className="px-6 py-16">
        <ReviewDeck />
      </main>
      <Footer />
    </>
  )
}
