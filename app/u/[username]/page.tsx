import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { profiles, certificates } from '@/drizzle/profile.schema'
import { userStreaks, userXp } from '@/drizzle/gamification.schema'
import { user } from '@/lib/auth/schema'
import { courses, phases, lessons, userProgress } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/server'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PublicProfile } from '@/components/public-profile'

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.username, username))
    .limit(1)

  if (!profile) notFound()

  // Perfil privado: 404 (não revela existência)
  if (!profile.public) notFound()

  const currentUser = await getCurrentUser()

  const [profileUser] = await db
    .select({ name: user.name })
    .from(user)
    .where(eq(user.id, profile.userId))
    .limit(1)

  const [streak] = await db
    .select()
    .from(userStreaks)
    .where(eq(userStreaks.userId, profile.userId))
    .limit(1)

  const xpRows = await db
    .select()
    .from(userXp)
    .where(eq(userXp.userId, profile.userId))

  const certs = await db
    .select()
    .from(certificates)
    .where(eq(certificates.userId, profile.userId))

  // Progresso: fases concluídas por curso
  const completedRows = await db
    .select({ lessonId: userProgress.lessonId })
    .from(userProgress)
    .where(eq(userProgress.userId, profile.userId))
  const completedIds = new Set(completedRows.map((r) => r.lessonId))

  const allCourses = await db.select().from(courses)
  const courseStats = await Promise.all(
    allCourses.map(async (course) => {
      const coursePhases = await db
        .select()
        .from(phases)
        .where(eq(phases.courseId, course.id))
      const phasesWithLessons = await Promise.all(
        coursePhases.map(async (p) => {
          const ls = await db
            .select()
            .from(lessons)
            .where(eq(lessons.phaseId, p.id))
          return { ...p, lessons: ls }
        })
      )
      const allIds = phasesWithLessons.flatMap((p) => p.lessons.map((l) => l.id))
      const done = allIds.filter((id) => completedIds.has(id)).length
      const completedPhases = phasesWithLessons
        .filter((p) => p.lessons.length > 0 && p.lessons.every((l) => completedIds.has(l.id)))
        .map((p) => ({ title: p.title }))
      return {
        courseTitle: course.title,
        done,
        total: allIds.length,
        pct: allIds.length ? Math.round((done / allIds.length) * 100) : 0,
        completedPhases,
      }
    })
  )

  // Certificados com nomes de fase/curso
  const certDetails = await Promise.all(
    certs.map(async (c) => {
      const [course] = await db.select().from(courses).where(eq(courses.id, c.courseId)).limit(1)
      const [phase] = c.phaseId
        ? await db.select().from(phases).where(eq(phases.id, c.phaseId)).limit(1)
        : [null]
      return {
        token: c.token,
        issuedAt: c.issuedAt,
        courseTitle: course?.title ?? '',
        phaseTitle: phase?.title ?? null,
        isCourse: !c.phaseId,
      }
    })
  )

  return (
    <>
      <Nav user={currentUser} />
      <main className="px-6 py-16">
        <PublicProfile
          username={profile.username}
          displayName={profileUser?.name ?? profile.username}
          bio={profile.bio}
          streak={streak?.currentStreak ?? 0}
          xpTotal={xpRows.reduce((acc, r) => acc + r.totalXp, 0)}
          courseStats={courseStats}
          certificates={certDetails}
        />
      </main>
      <Footer />
    </>
  )
}
