import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getCurrentUser } from '@/lib/auth/server'
import { getDueReviews, answerReview, getReviewStats } from '@/lib/gamification/review-service'

export const runtime = 'nodejs'

const AnswerRequest = z.object({
  cardId: z.string().min(1).max(100),
  quality: z.enum(['again', 'good', 'easy']),
})

/** GET: cards vencidos + estatísticas. Query opcional: ?phase=1 */
export async function GET(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })

  const phaseParam = req.nextUrl.searchParams.get('phase')
  const phase = phaseParam ? Number(phaseParam) : undefined

  const [due, stats] = await Promise.all([
    getDueReviews(user.id, phase),
    getReviewStats(user.id),
  ])

  return NextResponse.json({ due, stats })
}

/** POST: registra a resposta de um card (SM-2). */
export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = AnswerRequest.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  try {
    const result = await answerReview({
      userId: user.id,
      cardId: parsed.data.cardId,
      quality: parsed.data.quality,
    })
    return NextResponse.json(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg === 'card_not_found') {
      return NextResponse.json({ error: 'card_not_found' }, { status: 404 })
    }
    throw err
  }
}
