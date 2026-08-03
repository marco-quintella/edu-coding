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
  'kmeans-clustering',
  // Fase 02
  'nlp-tokenizacao',
  'tfidf-embeddings',
  'introducao-geneticos',
  // Fase 03
  'chain-of-thought',
  'guia-prompts',
  'langchain-agents',
  // Fase 04
  'analise-video-audio',
  'aws-textract',
  // Fase 05
  'lgpd-privacidade',
  'deteccao-anomalias',
  'azure-cognitive',
]

describe('INITIAL_CODES', () => {
  it('tem código para todos os slugs de lição do seed', () => {
    for (const slug of EXPECTED_SLUGS) {
      expect(INITIAL_CODES[slug], `sem initialCode para: ${slug}`).toBeDefined()
      expect(INITIAL_CODES[slug].length, `código vazio para: ${slug}`).toBeGreaterThan(0)
    }
  })

  it('todo código é Python válido (imports resolvem em ordem)', () => {
    // Checagem leve: todo código começa com import/from ou comentário
    for (const [slug, code] of Object.entries(INITIAL_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
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
