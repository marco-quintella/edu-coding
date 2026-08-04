import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { responderDuvida } from '@/lib/llm/chat'
import { getCurrentUser } from '@/lib/auth/server'
import { clientIp } from '@/lib/net/ip'
import { checkRateLimit, incrementRateLimit } from '@/lib/sandbox/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 60

const ChatRequest = z.object({
  lessonTitle: z.string().max(200),
  lessonContent: z.string().max(20_000),
  question: z.string().min(2).max(2_000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(2_000),
      })
    )
    .max(12)
    .optional(),
})

/**
 * Chat de dúvidas contextual (tutor 24/7).
 * Rate limit: 20 msgs / 10min por chave (LLM custa por chamada).
 */
export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = ChatRequest.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const user = await getCurrentUser()
  const rateKey = user ? `u:${user.id}` : `ip:${clientIp(req)}`

  const rl = await checkRateLimit(rateKey, 20)
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `Muitas mensagens em pouco tempo. Tente de novo em ${rl.retryAfterSec}s.`,
      },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
    )
  }

  const { lessonTitle, lessonContent, question, history } = parsed.data

  try {
    const result = await responderDuvida({
      lessonTitle,
      lessonContent,
      question,
      history,
    })
    await incrementRateLimit(rateKey)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[chat] erro:', err)
    return NextResponse.json(
      {
        answer:
          '💡 Algo deu errado ao gerar a resposta. Tente reformular a pergunta ou tente de novo em instantes.',
        usedModel: false,
      },
      { status: 200 } // nunca falha a experiência do aluno
    )
  }
}
