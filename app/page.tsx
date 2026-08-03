import { getCurrentUser } from '@/lib/auth/server'
import { getCourses, getCourseWithPhases, getCompletedLessonIds } from '@/lib/db/queries'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { Catalog } from '@/components/home/catalog'
import { FinalCta } from '@/components/home/final-cta'

export default async function Home() {
  const user = await getCurrentUser()
  const courses = await getCourses()
  const course = await getCourseWithPhases('ia-para-devs')

  let completedIds: Set<string> = new Set()
  if (user && course) {
    completedIds = await getCompletedLessonIds(user.id)
  }

  return (
    <>
      <Nav user={user} />
      <main>
        <Hero course={course} completedIds={completedIds} user={user} />
        <HowItWorks />
        <Catalog courses={courses} />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
