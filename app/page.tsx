import { getCurrentUser } from '@/lib/auth/server'
import { getCourses, getCourseWithPhases, getCompletedLessonIds, getUserDashboard, getUserGamification } from '@/lib/db/queries'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { Catalog } from '@/components/home/catalog'
import { FinalCta } from '@/components/home/final-cta'

export default async function Home() {
  const user = await getCurrentUser()
  const courses = await getCourses()

  // Para o hero: pega curso "ia-para-devs" e progresso do usuário
  let course = await getCourseWithPhases('ia-para-devs')
  let completedIds: Set<string> = new Set()
  let dashboard: Awaited<ReturnType<typeof getUserDashboard>> | null = null
  let gamification: Awaited<ReturnType<typeof getUserGamification>> | null = null

  if (user) {
    completedIds = course ? await getCompletedLessonIds(user.id) : new Set()
    dashboard = await getUserDashboard(user.id)
    gamification = await getUserGamification(user.id)
  }

  return (
    <>
      <Nav user={user} dashboard={dashboard} />
      <main>
        <Hero course={course} completedIds={completedIds} user={user} gamification={gamification} />
        <HowItWorks />
        <Catalog courses={courses} />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
