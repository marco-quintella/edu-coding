/**
 * Emissão de certificados (por fase e do curso completo).
 *
 * Quando o aluno completa TODAS as lições de uma fase, um certificado é
 * emitido com um token público compartilhável (não adivinha-se o link).
 *
 * O certificado do curso completo é emitido quando TODAS as fases do
 * curso estão concluídas.
 */
import { randomBytes } from 'node:crypto'
import { db } from '@/lib/db'
import { certificates } from '@/drizzle/profile.schema'
import { eq, and, isNull } from 'drizzle-orm'

/** Gera um token público aleatório (32 bytes hex). */
export function generateToken(): string {
  return randomBytes(32).toString('hex')
}

/**
 * Emite o certificado da fase se todas as lições estiverem concluídas.
 * Idempotente: se já existe, devolve o existente.
 */
export async function ensurePhaseCertificate(params: {
  userId: string
  phaseId: string
  courseId: string
  displayName: string
  completedLessonIds: Set<string>
  phaseLessonIds: string[]
}): Promise<{ certificate: typeof certificates.$inferSelect; newlyIssued: boolean }> {
  const { userId, phaseId, courseId, displayName, completedLessonIds, phaseLessonIds } = params

  // Fase só completa se TODAS as lições estão concluídas
  const allDone = phaseLessonIds.every((id) => completedLessonIds.has(id))
  if (!allDone) {
    throw new Error('phase_not_completed')
  }

  const [existing] = await db
    .select()
    .from(certificates)
    .where(
      and(
        eq(certificates.userId, userId),
        eq(certificates.phaseId, phaseId)
      )
    )
    .limit(1)

  if (existing) {
    return { certificate: existing, newlyIssued: false }
  }

  const [certificate] = await db
    .insert(certificates)
    .values({
      userId,
      phaseId,
      courseId,
      displayName,
      token: generateToken(),
    })
    .returning()

  return { certificate, newlyIssued: true }
}

/**
 * Emite o certificado do curso completo se TODAS as fases estiverem
 * concluídas. Idempotente.
 */
export async function ensureCourseCertificate(params: {
  userId: string
  courseId: string
  displayName: string
  completedLessonIds: Set<string>
  coursePhases: { id: string; lessonIds: string[] }[]
}): Promise<{ certificate: typeof certificates.$inferSelect | null; newlyIssued: boolean }> {
  const { userId, courseId, displayName, completedLessonIds, coursePhases } = params

  // Curso completo = todas as lições de todas as fases
  const allLessonIds = coursePhases.flatMap((p) => p.lessonIds)
  const allDone =
    allLessonIds.length > 0 && allLessonIds.every((id) => completedLessonIds.has(id))
  if (!allDone) return { certificate: null, newlyIssued: false }

  const [existing] = await db
    .select()
    .from(certificates)
    .where(and(eq(certificates.userId, userId), isNull(certificates.phaseId)))
    .limit(1)

  if (existing) return { certificate: existing, newlyIssued: false }

  const [certificate] = await db
    .insert(certificates)
    .values({
      userId,
      phaseId: null,
      courseId,
      displayName,
      token: generateToken(),
    })
    .returning()

  return { certificate, newlyIssued: true }
}

/** Busca um certificado pelo token público (para a página compartilhável). */
export async function getCertificateByToken(token: string) {
  const [certificate] = await db
    .select()
    .from(certificates)
    .where(eq(certificates.token, token))
    .limit(1)
  return certificate ?? null
}
