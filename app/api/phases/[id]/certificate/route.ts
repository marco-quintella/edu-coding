import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { courses, phases, lessons, userProgress } from '@/lib/db/schema'
import { eq, and, inArray } from 'drizzle-orm'
import { generateCertificatePdf } from './pdf'

const MOCK_USER_ID = '00000000-0000-0000-0000-000000000001'

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id: phaseId } = await ctx.params

  // 1. Phase existe?
  const [phase] = await db
    .select()
    .from(phases)
    .where(eq(phases.id, phaseId))
  if (!phase) {
    return NextResponse.json({ error: 'phase_not_found' }, { status: 404 })
  }

  // 2. Course existe?
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, phase.courseId))
  if (!course) {
    return NextResponse.json({ error: 'course_not_found' }, { status: 404 })
  }

  // 3. Todas as lições da fase estão concluídas pelo user?
  const phaseLessons = await db
    .select({ id: lessons.id })
    .from(lessons)
    .where(eq(lessons.phaseId, phaseId))

  if (phaseLessons.length === 0) {
    return NextResponse.json({ error: 'phase_empty' }, { status: 400 })
  }

  const completed = await db
    .select({ lessonId: userProgress.lessonId })
    .from(userProgress)
    .where(
      and(
        eq(userProgress.userId, MOCK_USER_ID),
        inArray(
          userProgress.lessonId,
          phaseLessons.map((l) => l.id)
        )
      )
    )
  const completedSet = new Set(completed.map((c) => c.lessonId))
  const allDone = phaseLessons.every((l) => completedSet.has(l.id))

  if (!allDone) {
    return NextResponse.json(
      {
        error: 'phase_not_completed',
        message: `Conclua todas as ${phaseLessons.length} licoes da fase primeiro.`,
        completed: completedSet.size,
        total: phaseLessons.length,
      },
      { status: 400 }
    )
  }

  // 4. Gerar PDF
  const pdf = await generateCertificatePdf({
    userName: 'Aluno Edu Coding',
    phaseTitle: phase.title,
    courseTitle: course.title,
    completedAt: new Date(),
  })

  return new NextResponse(pdf as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="certificado-${phase.slug}.pdf"`,
      'Cache-Control': 'no-store',
    },
  })
}
