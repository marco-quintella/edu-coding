/**
 * Corretor pedagógico via OpenRouter (modelos free).
 *
 * Quando o exercício falha, o aluno recebe um feedback contextualizado
 * em pt-BR — não só "tente de novo". O corretor analisa o código, o
 * output real e o esperado, e explica ONDE está o erro e COMO pensar.
 */

import { callOpenRouter, DEFAULT_MODEL } from './openrouter'

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
  const prompt = buildPrompt(input)
  const result = await callOpenRouter(
    [{ role: 'user', content: prompt }],
    { temperature: 0.3, maxTokens: 400 }
  )

  if (!result.usedModel) {
    return {
      feedback: fallbackFeedback(input),
      model: DEFAULT_MODEL,
      usedModel: false,
    }
  }

  return { feedback: result.content, model: result.model, usedModel: true }
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
