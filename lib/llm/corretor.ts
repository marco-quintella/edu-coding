/**
 * Corretor pedagógico via OpenRouter (modelos free).
 *
 * Quando o exercício falha, o aluno recebe um feedback contextualizado
 * em pt-BR — não só "tente de novo". O corretor analisa o código, o
 * output real e o esperado, e explica ONDE está o erro e COMO pensar.
 *
 * Chave: OPENROUTER_API_KEY (server-side, nunca exposta ao cliente).
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
// Modelo free com bom custo/qualidade para feedback
// gemma-4-26b: rápido (3s), conteúdo direto, sem reasoning noise
const MODEL = 'google/gemma-4-26b-a4b-it:free'
const MAX_OUTPUT_CHARS = 800

export interface FeedbackInput {
  /** Título do exercício (ex: "Exercício 2 — Ajuste com ruído") */
  title?: string
  /** Código que o aluno rodou */
  code: string
  /** Output real do sandbox (stdout + stderr) */
  output: string
  /** Output esperado (do expectedOutput do MDX) */
  expected: string
  /** Dica que o autor já deixou no MDX */
  hint?: string
}

export interface FeedbackResult {
  feedback: string
  model: string
  usedModel: boolean
}

/**
 * Gera feedback pedagógico. Se não houver chave configurada, retorna
 * fallback amigável (sem quebrar a experiência).
 */
export async function gerarFeedback(
  input: FeedbackInput
): Promise<FeedbackResult> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return {
      feedback:
        '💡 Sem corretor configurado ainda. Compare sua saída com a esperada linha a linha — ' +
        'onde ela difere é onde está o erro. Use a dica: ' +
        (input.hint ?? 'revise os valores que você passou.'),
      model: MODEL,
      usedModel: false,
    }
  }

  const prompt = buildPrompt(input)

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://edu-coding.app', // uso legítimo OpenRouter
        'X-Title': 'Edu Coding - Corretor Pedagógico',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 400,
      }),
      // Timeout generoso — modelos free do OpenRouter têm fila (upstream lento)
      signal: AbortSignal.timeout(30000),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      console.error('[corretor] OpenRouter error:', res.status, errText.slice(0, 200))
      return {
        feedback: fallbackFeedback(input),
        model: MODEL,
        usedModel: false,
      }
    }

    const data = await res.json()
    const feedback = data?.choices?.[0]?.message?.content?.trim()
    if (!feedback) {
      return { feedback: fallbackFeedback(input), model: MODEL, usedModel: false }
    }

    return { feedback, model: MODEL, usedModel: true }
  } catch (err) {
    console.error('[corretor] erro ao chamar OpenRouter:', err)
    return { feedback: fallbackFeedback(input), model: MODEL, usedModel: false }
  }
}

function buildPrompt(input: FeedbackInput): string {
  const { title, code, output, expected, hint } = input
  return `Você é um professor de machine learning em uma plataforma de curso (Edu Coding, em português brasileiro). Um aluno fez um exercício e a saída NÃO bateu com o esperado. Sua tarefa: dar um feedback curto (máx. 4 frases), encorajador e específico, explicando onde provavelmente está o erro e como o aluno pode pensar para corrigir.

IMPORTANTE:
- Responda em português brasileiro, tom de professor (não robótico).
- NÃO dê a solução pronta (não escreva o código corrigido completo).
- Aponte a discrepância entre a saída do aluno e a esperada.
- Se houver dica do exercício, use-a para guiar (não repetir palavra por palavra).

EXERCÍCIO: ${title ?? 'Exercício'}

CÓDIGO DO ALUNO:
\`\`\`python
${code.slice(0, 2000)}
\`\`\`

SAÍDA REAL DO ALUNO:
\`\`\`
${output.slice(0, MAX_OUTPUT_CHARS)}
\`\`\`

SAÍDA ESPERADA (contém):
\`\`\`
${expected}
\`\`\`

${hint ? `DICA DO EXERCÍCIO: ${hint}` : ''}

Feedback:`
}

function fallbackFeedback(input: FeedbackInput): string {
  return `💡 Compare sua saída com a esperada: você precisa produzir algo que contenha "${input.expected}". Verifique os valores, os tipos e a ordem dos prints.${
    input.hint ? ` Dica: ${input.hint}` : ''
  }`
}
