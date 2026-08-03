import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { gerarFeedback } from '@/lib/llm/corretor'
import { getCurrentUser } from '@/lib/auth/server'
import { clientIp } from '@/lib/net/ip'
import { checkRateLimit, incrementRateLimit } from '@/lib/sandbox/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 60

const FeedbackRequest = z.object({
  title: z.string().max(200).optional(),
  code: z.string().min(1).max(10_000),
  output: z.string().max(5_000),
  expected: z.string().max(500),
  hint: z.string().max(500).optional(),
})

/**
 * Corretor pedagógico: quando o exercício falha, gera feedback
 * contextualizado via OpenRouter (modelo free).
 *
 * Rate limit mais rigoroso que o exec (LLM tem custo por chamada):
 * 10 feedbacks / 10min por chave.
 */
export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = FeedbackRequest.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const user = await getCurrentUser()
  const rateKey = user ? `u:${user.id}` : `ip:${clientIp(req)}`

  // Rate limit anti-abuso (LLM custa por chamada): 10 / 10min
  const rl = await checkRateLimit(rateKey, 10)
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Muitos feedbacks em pouco tempo. Tente de novo em ${rl.retryAfterSec}s.`,
      },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
    )
  }

  const { title, code, output, expected, hint } = parsed.data

  try {
    const result = await gerarFeedback({ title, code, output, expected, hint })
    await incrementRateLimit(rateKey)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[feedback] erro:', err)
    return NextResponse.json(
      {
        feedback:
          '💡 Algo deu errado ao gerar o feedback. Compare sua saída com a esperada e tente de novo.',
        usedModel: false,
      },
      { status: 200 } // nunca falha a experiência do aluno
    )
  }
}
