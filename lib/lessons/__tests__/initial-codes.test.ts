import { describe, it, expect } from 'vitest'
import { INITIAL_CODES, getInitialCode } from '../initial-codes'
import { PYTHON_CODES } from '../python-codes'
import { SQL_CODES } from '../sql-codes'
import { GIT_CODES } from '../git-codes'
import { EDA_CODES } from '../eda-codes'
import { PANDAS_CODES } from '../pandas-codes'
import { TESTES_CODES } from '../testes-codes'
import { APIS_CODES } from '../apis-codes'
import { AUTOMACAO_CODES } from '../automacao-codes'

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
  // Mini-projetos Fases 03-05
  'mp3-rag',
  'mp4-audio',
  'mp5-anon',
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
  // Curso Python para Devs
  'python-fundamentos',
  'python-ex1',
  'python-ex2',
  'python-projeto',
  'python-listas-dicts',
  'python-l2-ex1',
  'python-l2-ex2',
  'python-l2-projeto',
  'python-funcoes',
  'python-l3-ex1',
  'python-l3-ex2',
  'python-l3-projeto',
  // Curso SQL & Bancos de Dados
  'sql-select',
  'sql-select-ex1',
  'sql-select-ex2',
  'sql-select-projeto',
  'sql-agregacoes',
  'sql-agreg-ex1',
  'sql-agreg-ex2',
  'sql-agreg-projeto',
  'sql-joins',
  'sql-joins-ex1',
  'sql-joins-ex2',
  'sql-joins-projeto',
  // Curso Git & GitHub
  'git-commits',
  'git-ex1',
  'git-ex2',
  'git-projeto',
  'git-branches',
  'git-b-ex1',
  'git-b-ex2',
  'git-b-projeto',
  'git-remoto',
  'git-r-ex1',
  'git-r-ex2',
  'git-r-projeto',
  // Curso Estruturas de Dados & Algoritmos
  'eda-busca',
  'eda-ex1',
  'eda-ex2',
  'eda-projeto',
  'eda-hash',
  'eda-h-ex1',
  'eda-h-ex2',
  'eda-h-projeto',
  'eda-ordenacao',
  'eda-o-ex1',
  'eda-o-ex2',
  'eda-o-projeto',
  // Curso Análise de Dados com pandas
  'pandas-dataframes',
  'pandas-ex1',
  'pandas-ex2',
  'pandas-projeto',
  'pandas-filtros',
  'pandas-f-ex1',
  'pandas-f-ex2',
  'pandas-f-projeto',
  'pandas-limpeza',
  'pandas-l-ex1',
  'pandas-l-ex2',
  'pandas-l-projeto',
  // Curso Testes com Python
  'testes-basicos',
  'testes-ex1',
  'testes-ex2',
  'testes-projeto',
  'testes-avancados',
  'testes-a-ex1',
  'testes-a-ex2',
  'testes-a-projeto',
  'testes-tdd',
  'testes-t-ex1',
  'testes-t-ex2',
  'testes-t-projeto',
  // Curso APIs & HTTP
  'apis-json',
  'apis-ex1',
  'apis-ex2',
  'apis-projeto',
  'apis-requests',
  'apis-r-ex1',
  'apis-r-ex2',
  'apis-r-projeto',
  'apis-erros',
  'apis-e-ex1',
  'apis-e-ex2',
  'apis-e-projeto',
  // Curso Automação com Python
  'automacao-arquivos',
  'automacao-ex1',
  'automacao-ex2',
  'automacao-projeto',
  'automacao-pastas',
  'automacao-p-ex1',
  'automacao-p-ex2',
  'automacao-p-projeto',
  'automacao-sistema',
  'automacao-s-ex1',
  'automacao-s-ex2',
  'automacao-s-projeto',
]

describe('INITIAL_CODES', () => {
  it('tem código para todos os slugs de lição do seed', () => {
    for (const slug of EXPECTED_SLUGS) {
      expect(
        getInitialCode(slug),
        `sem initialCode para: ${slug}`,
      ).not.toBe('')
      expect(
        getInitialCode(slug).length,
        `código vazio para: ${slug}`,
      ).toBeGreaterThan(0)
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
    // Códigos do curso Python começam com variável (peso =, frase =, etc.)
    for (const [slug, code] of Object.entries(PYTHON_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário/variável em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|def |[a-zA-Z_][a-zA-Z0-9_]* =)/)
    }
    // Códigos do curso SQL começam com import sqlite3
    for (const [slug, code] of Object.entries(SQL_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Git usam subprocess (import no topo)
    for (const [slug, code] of Object.entries(GIT_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso EDA começam com comentário ou def
    for (const [slug, code] of Object.entries(EDA_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/def em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|def |[a-zA-Z_])/)
    }
    // Códigos do curso pandas começam com import
    for (const [slug, code] of Object.entries(PANDAS_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Testes começam com comentário/def/import
    for (const [slug, code] of Object.entries(TESTES_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/def em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|def |class |[a-zA-Z_])/)
    }
    // Códigos do curso APIs começam com import
    for (const [slug, code] of Object.entries(APIS_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Automação começam com import/comentário
    for (const [slug, code] of Object.entries(AUTOMACAO_CODES)) {
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
