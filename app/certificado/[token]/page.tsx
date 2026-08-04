import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCertificateByToken } from '@/lib/certificates/service'
import { db } from '@/lib/db'
import { phases, courses } from '@/lib/db/schema'
import { user } from '@/lib/auth/schema'
import { getCurrentUser } from '@/lib/auth/server'
import { eq } from 'drizzle-orm'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { CertificateCard } from '@/components/certificate-card'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ token: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params
  const certificate = await getCertificateByToken(token)
  if (!certificate) return { title: 'Certificado não encontrado' }
  return {
    title: `Certificado de ${certificate.displayName}`,
    description: 'Certificado emitido pela Edu Coding',
  }
}

export default async function CertificatePage({ params }: PageProps) {
  const { token } = await params
  const certificate = await getCertificateByToken(token)
  if (!certificate) notFound()

  const [phase] = certificate.phaseId
    ? await db.select().from(phases).where(eq(phases.id, certificate.phaseId)).limit(1)
    : [null]

  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, certificate.courseId))
    .limit(1)

  const [certUser] = await db
    .select({ name: user.name })
    .from(user)
    .where(eq(user.id, certificate.userId))
    .limit(1)

  const currentUser = await getCurrentUser()

  return (
    <>
      <Nav user={currentUser} />
      <main className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/courses"
            className="mb-6 inline-block text-sm font-medium text-accent-strong hover:underline"
          >
            ← Catálogo
          </Link>

          <CertificateCard
            displayName={certificate.displayName}
            courseTitle={course?.title ?? 'IA para Devs'}
            phaseTitle={phase?.title ?? null}
            issuedAt={certificate.issuedAt}
            token={token}
          />

          <p className="mt-6 text-center text-xs text-ink-muted">
            Certificado verificado na Edu Coding ·{' '}
            {certUser?.name ?? certificate.displayName}
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
