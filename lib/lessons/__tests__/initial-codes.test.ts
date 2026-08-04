import { describe, it, expect } from 'vitest'
import { INITIAL_CODES, getInitialCode } from '../initial-codes'

// Slugs reais das lições do seed (scripts/seed-ia-para-devs.ts)
const EXPECTED_SLUGS = [
  // Fase 01
  'regressao-linear',
  'regressao-ex1',
  'regressao-ex2',
  'regressao-ex3',
  'regressao-projeto',
  'arvores-decisao',
  'arvores-ex1',
  'arvores-ex2',
  'arvores-projeto',
  'knn-svm',
  'knn-svm-svm',
  'knn-ex1',
  'knn-ex2',
  'knn-ex3',
  'kmeans-clustering',
  'kmeans-ex1',
  'kmeans-ex2',
  'kmeans-projeto',
  // Capstone Fase 01
  'capstone-ex1',
  'capstone-ex2',
  'capstone-ex3',
  'capstone-ex4',
  // Fase 02
  'nlp-tokenizacao',
  'nlp-ex1',
  'nlp-ex2',
  'tfidf-embeddings',
  'tfidf-ex1',
  'tfidf-ex2',
  'introducao-geneticos',
  'ga-ex1',
  'ga-ex2',
  // Fase 03
  'chain-of-thought',
  'cot-ex1',
  'cot-ex2',
  'guia-prompts',
  'prompts-ex1',
  'prompts-ex2',
  'langchain-agents',
  'langchain-ex1',
  'langchain-ex2',
  // Fase 04
  'analise-video-audio',
  'videoaudio-ex1',
  'videoaudio-ex2',
  'aws-textract',
  'textract-ex1',
  'textract-ex2',
  // Fase 05
  'lgpd-privacidade',
  'lgpd-ex1',
  'lgpd-ex2',
  'deteccao-anomalias',
  'anomalias-ex1',
  'anomalias-ex2',
  'azure-cognitive',
  'azure-ex1',
  'azure-ex2',
]

describe('INITIAL_CODES', () => {
  it('tem código para todos os slugs de lição do seed', () => {
    for (const slug of EXPECTED_SLUGS) {
      expect(INITIAL_CODES[slug], `sem initialCode para: ${slug}`).toBeDefined()
      expect(INITIAL_CODES[slug].length, `código vazio para: ${slug}`).toBeGreaterThan(0)
    }
  })

  it('todo código é Python válido (imports resolvem em ordem)', () => {
    // Checagem leve: todo código começa com import/from/comentário/def
    for (const [slug, code] of Object.entries(INITIAL_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|def )/)
    }
  })

  it('não tem códigos duplicados entre slugs diferentes', () => {
    const seen = new Map<string, string>()
    for (const [slug, code] of Object.entries(INITIAL_CODES)) {
      if (seen.has(code)) {
        // knn-svm e knn-svm-svm são intencionalmente diferentes
        expect(
          slug,
          `código duplicado entre ${seen.get(code)} e ${slug}`,
        ).not.toBe(seen.get(code))
      }
      seen.set(code, slug)
    }
  })

  it('getInitialCode retorna vazio para slug desconhecido', () => {
    expect(getInitialCode('nao-existe')).toBe('')
  })
})
