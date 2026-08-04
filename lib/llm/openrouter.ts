/**
 * Cliente OpenRouter compartilhado (modelos free).
 *
 * Camada fina sobre a API de chat completions — usada pelo corretor
 * pedagógico, chat de dúvidas, e qualquer feature futura de LLM.
 *
 * Chave: OPENROUTER_API_KEY (server-side, nunca exposta ao cliente).
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
// Modelo free com bom custo/qualidade: rápido (~3s), conteúdo direto,
// sem reasoning noise (gpt-oss-20b:free retornava content: null)
export const DEFAULT_MODEL = 'google/gemma-4-26b-a4b-it:free'

export interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface OpenRouterOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  timeoutMs?: number
}

export interface OpenRouterResult {
  content: string
  model: string
  usedModel: boolean
}

/**
 * Chama o OpenRouter com mensagens e retorna o conteúdo da resposta.
 * Falhas (rede, timeout, rate limit, content vazio) retornam
 * `usedModel: false` + `content: ''` — o caller decide o fallback.
 */
export async function callOpenRouter(
  messages: OpenRouterMessage[],
  options: OpenRouterOptions = {}
): Promise<OpenRouterResult> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return { content: '', model: options.model ?? DEFAULT_MODEL, usedModel: false }
  }

  const {
    model = DEFAULT_MODEL,
    temperature = 0.3,
    maxTokens = 400,
    timeoutMs = 30000,
  } = options

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://edu-coding.app',
        'X-Title': 'Edu Coding',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      console.error('[openrouter] error:', res.status, errText.slice(0, 200))
      return { content: '', model, usedModel: false }
    }

    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content?.trim()
    if (!content) {
      return { content: '', model, usedModel: false }
    }

    return { content, model, usedModel: true }
  } catch (err) {
    console.error('[openrouter] erro:', err)
    return { content: '', model, usedModel: false }
  }
}
