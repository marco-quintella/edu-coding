import { getCurrentUser } from '@/lib/auth/server'
import { getLessonIdsBySlugs } from '@/lib/db/queries'
import { GLOSSARY_TERMS } from '@/lib/glossary/terms'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Glossary } from '@/components/glossary'

export const metadata = {
  title: 'Glossário — Edu Coding',
}

export default async function GlossaryPage() {
  const user = await getCurrentUser()

  // Resolve slugs → ids no servidor (estável entre seeds — UUIDs mudam)
  const slugs = [...new Set(GLOSSARY_TERMS.map((t) => t.lessonSlug))]
  const idMap = await getLessonIdsBySlugs(slugs)
  const lessonLinks = Object.fromEntries(idMap)

  return (
    <>
      <Nav user={user} />
      <main className="px-6 py-16">
        <Glossary lessonLinks={lessonLinks} />
      </main>
      <Footer />
    </>
  )
}
