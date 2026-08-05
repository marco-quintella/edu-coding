/**
 * Desafios de entrevista — 1 pergunta por fase.
 * Perguntas abertas de ML avaliadas por rubrica (lib/llm/grader.ts).
 */

export interface InterviewChallenge {
  id: string
  phase: number
  question: string
  /** O que uma boa resposta deveria cobrir (para a rubrica) */
  hint: string
}

export const CHALLENGES: InterviewChallenge[] = [
  {
    id: 'challenge-f1',
    phase: 1,
    question:
      'Explique overfitting em 3 frases, como detectá-lo e cite UMA técnica para evitá-lo.',
    hint:
      'definição (decorar o treino), detecção (gap treino alto × teste baixo), técnica (regularização, mais dados, poda, validação cruzada, simplificar modelo)',
  },
  {
    id: 'challenge-f2',
    phase: 2,
    question:
      'O que é TF-IDF e por que ele costuma ser melhor que a simples contagem de palavras para representar texto?',
    hint:
      'TF (frequência no documento) × IDF (raridade no corpus); palavras comuns (o, de) perdem peso; raras ganham destaque',
  },
  {
    id: 'challenge-f3',
    phase: 3,
    question:
      'O que é RAG (Retrieval-Augmented Generation) e em que cenário você usaria em vez de só chamar um LLM?',
    hint:
      'buscar em dados próprios → injetar no prompt; quando a resposta depende de dados privados, atualizados ou fora do conhecimento do modelo',
  },
  {
    id: 'challenge-f4',
    phase: 4,
    question:
      'Qual a diferença entre OCR tradicional e o Amazon Textract? Dê um caso de uso onde a diferença importa.',
    hint:
      'OCR = texto achatado; Textract = estrutura (tabelas, chave-valor); caso: automatizar nota fiscal/KYC exigindo dados estruturados',
  },
  {
    id: 'challenge-f5',
    phase: 5,
    question:
      'Sua empresa quer treinar um modelo com dados de clientes brasileiros. Cite 2 obrigações da LGPD e como elas mudam o pipeline de ML.',
    hint:
      'minimização (coletar só o necessário), anonimização/pseudonimização antes de treinar, base legal, direito de exclusão, retenção definida, RIPD',
  },
]

/** Busca um desafio pelo id. */
export function getChallenge(id: string): InterviewChallenge | null {
  return CHALLENGES.find((c) => c.id === id) ?? null
}
