import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { avaliarDesafio } from '@/lib/llm/grader'
import { getCurrentUser } from '@/lib/auth/server'
import { clientIp } from '@/lib/net/ip'
import { checkRateLimit, incrementRateLimit } from '@/lib/sandbox/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 60

const ChallengeRequest = z.object({
  question: z.string().min(5).max(500),
  answer: z.string().min(10).max(10_000),
  hint: z.string().max(1_000).optional(),
})

/**
 * Avaliação de desafio de entrevista (resposta aberta + rubrica).
 * Rate limit: 15 / 10min (LLM custa por chamada).
 */
export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = ChallengeRequest.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const user = await getCurrentUser()
  const rateKey = user ? `u:${user.id}` : `ip:${clientIp(req)}`

  const rl = await checkRateLimit(rateKey, 15)
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Muitas avaliações em pouco tempo. Tente de novo em ${rl.retryAfterSec}s.`,
      },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
    )
  }

  const { question, answer, hint } = parsed.data

  try {
    const result = await avaliarDesafio({ question, answer, hint })
    await incrementRateLimit(rateKey)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[challenge] erro:', err)
    return NextResponse.json(
      {
        rubric: {
          score: 0,
          feedback: '💡 Algo deu errado ao avaliar. Tente de novo em instantes.',
          strengths: [],
          gaps: [],
        },
        usedModel: false,
      },
      { status: 200 } // nunca falha a experiência
    )
  }
}
