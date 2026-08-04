/**
 * Chat de dúvidas contextual — tutor 24/7 por lição.
 *
 * Reusa o cliente OpenRouter compartilhado. O aluno pergunta sobre a
 * lição atual e recebe resposta contextualizada (título + conteúdo +
 * histórico curto).
 */

import { callOpenRouter, DEFAULT_MODEL } from './openrouter'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatInput {
  /** Título da lição */
  lessonTitle: string
  /** Conteúdo da lição (markdown bruto, limitado) */
  lessonContent: string
  /** Pergunta do aluno */
  question: string
  /** Histórico recente da conversa (máx. 6 mensagens) */
  history?: ChatMessage[]
}

export interface ChatResult {
  answer: string
  model: string
  usedModel: boolean
}

/**
 * Responde uma dúvida contextual sobre a lição.
 * Sem chave ou falha → fallback amigável (nunca quebra a experiência).
 */
export async function responderDuvida(input: ChatInput): Promise<ChatResult> {
  const prompt = buildChatPrompt(input)
  const result = await callOpenRouter(
    [{ role: 'user', content: prompt }],
    { temperature: 0.4, maxTokens: 500 }
  )

  if (!result.usedModel) {
    return {
      answer:
        '💡 O tutor de IA não está disponível neste momento. Releia a seção ' +
        'da lição relacionada à sua dúvida e rode o código do exemplo — muitas ' +
        'respostas aparecem ao ver o output. Se persistir, tente de novo em instantes.',
      model: DEFAULT_MODEL,
      usedModel: false,
    }
  }

  return { answer: result.content, model: result.model, usedModel: true }
}

function buildChatPrompt(input: ChatInput): string {
  const { lessonTitle, lessonContent, question, history } = input
  const content = lessonContent.slice(0, 6000)
  const hist = (history ?? []).slice(-6)

  const histBlock =
    hist.length > 0
      ? `\nHISTÓRICO DA CONVERSA:\n${hist
          .map((m) => `${m.role === 'user' ? 'Aluno' : 'Você'}: ${m.content.slice(0, 400)}`)
          .join('\n')}`
      : ''

  return `Você é um tutor de IA paciente e didático na plataforma Edu Coding (curso de Machine Learning em português brasileiro). O aluno está na lição "${lessonTitle}" e fez uma pergunta.

Responda de forma clara e prática:
- Explique o conceito com uma intuição simples primeiro (analogia se ajudar).
- Conecte com o código/exemplo da lição quando possível.
- Máximo 6 frases. Não escreva código completo a menos que a pergunta peça.
- Em português brasileiro, tom de professor.

CONTEÚDO DA LIÇÃO (trecho):
"""
${content}
"""
${histBlock}

PERGUNTA DO ALUNO: ${question}

Resposta:`
}
