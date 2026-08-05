/**
 * Avaliador de desafios de entrevista — respostas abertas avaliadas
 * com rubrica pedagógica via OpenRouter (modelos free).
 *
 * Diferente do corretor de exercícios (que compara output), este avalia
 * TEXTO: o aluno responde uma pergunta de entrevista de ML ("explique
 * overfitting em 3 frases") e recebe feedback estruturado por rubrica.
 */
import { callOpenRouter, DEFAULT_MODEL } from './openrouter'

export interface ChallengeInput {
  /** A pergunta da entrevista */
  question: string
  /** Resposta do aluno em texto livre */
  answer: string
  /** Dica/contexto opcional (ex: o que a resposta deveria cobrir) */
  hint?: string
}

export interface RubricScore {
  /** 0-100 */
  score: number
  /** Feedback qualitativo curto (2-4 frases) */
  feedback: string
  /** O que faltou / pontos fortes */
  strengths: string[]
  gaps: string[]
}

export interface ChallengeResult {
  rubric: RubricScore
  model: string
  usedModel: boolean
}

/**
 * Avalia a resposta com rubrica. Sem chave ou falha → fallback
 * amigável (nunca bloqueia o aluno).
 */
export async function avaliarDesafio(input: ChallengeInput): Promise<ChallengeResult> {
  const prompt = buildChallengePrompt(input)
  const result = await callOpenRouter(
    [{ role: 'user', content: prompt }],
    { temperature: 0.2, maxTokens: 500 }
  )

  if (!result.usedModel) {
    return {
      rubric: fallbackRubric(input),
      model: DEFAULT_MODEL,
      usedModel: false,
    }
  }

  const rubric = parseRubric(result.content)
  return { rubric, model: result.model, usedModel: true }
}

function buildChallengePrompt(input: ChallengeInput): string {
  const { question, answer, hint } = input
  return `Você é um entrevistador técnico de Machine Learning avaliando a resposta de um candidato. Responda APENAS com JSON válido, sem markdown, no formato:
{"score": 0-100, "feedback": "2-4 frases em português", "strengths": ["ponto forte 1", ...], "gaps": ["o que faltou 1", ...]}

Rubrica de avaliação:
- 70+ pontos: conceito correto E um exemplo concreto
- 50-69: conceito correto, mas sem exemplo ou superficial
- abaixo de 50: conceito errado, vago ou incompleto

PERGUNTA DA ENTREVISTA: ${question}
${hint ? `O QUE UMA BOA RESPOSTA DEVERIA COBRIR: ${hint}` : ''}

RESPOSTA DO CANDIDATO:
"""
${answer.slice(0, 3000)}
"""

JSON:`
}

/** Faz parse do JSON da resposta (tolerante a markdown ao redor). */
export function parseRubric(raw: string): RubricScore {
  try {
    // Remove ```json ... ``` se o modelo embrulhar em markdown
    const cleaned = raw
      .replace(/```json\s*/gi, '')
      .replace(/```/g, '')
      .trim()
    const data = JSON.parse(cleaned)
    return {
      score: clampScore(data.score),
      feedback: typeof data.feedback === 'string' ? data.feedback : 'Sem feedback.',
      strengths: Array.isArray(data.strengths) ? data.strengths.slice(0, 3) : [],
      gaps: Array.isArray(data.gaps) ? data.gaps.slice(0, 3) : [],
    }
  } catch {
    // Se o JSON falhar, devolve a resposta crua como feedback
    return {
      score: 0,
      feedback: raw.slice(0, 400),
      strengths: [],
      gaps: [],
    }
  }
}

function clampScore(n: unknown): number {
  const v = typeof n === 'number' ? n : Number(n)
  if (Number.isNaN(v)) return 0
  return Math.max(0, Math.min(100, Math.round(v)))
}

function fallbackRubric(input: ChallengeInput): RubricScore {
  const len = input.answer.trim().length
  return {
    score: len < 40 ? 0 : len < 120 ? 50 : 70,
    feedback:
      '💡 Avaliação automática indisponível no momento. Dica: uma boa resposta de entrevista tem (1) definição correta do conceito, (2) um exemplo concreto, (3) conexão com a prática. Releia sua resposta e veja se cobre os três.',
    strengths: [],
    gaps: ['Verifique se incluiu um exemplo concreto'],
  }
}
