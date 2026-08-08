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
import { JS_CODES } from '../js-codes'
import { REGEX_CODES } from '../regex-codes'
import { OOP_CODES } from '../oop-codes'
import { TS_CODES } from '../ts-codes'
import { BACKEND_CODES } from '../backend-codes'
import { DOCKER_CODES } from '../docker-codes'
import { FASTAPI_CODES } from '../fastapi-codes'
import { REACT_CODES } from '../react-codes'
import { LINUX_CODES } from '../linux-codes'
import { SCRAPING_CODES } from '../scraping-codes'
import { SECURITY_CODES } from '../security-codes'
import { ALG_CODES } from '../alg-codes'
import { SQLAV_CODES } from '../sqlav-codes'
import { JWT_CODES } from '../jwt-codes'
import { ESTAT_CODES } from '../estat-codes'
import { GITAV_CODES } from '../gitav-codes'
import { ML_CODES } from '../ml-codes'
import { GRAFOS_CODES } from '../grafos-codes'
import { PATTERNS_CODES } from '../patterns-codes'
import { ARVORES_CODES } from '../arvores-codes'

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
  // Curso JavaScript para Devs
  'js-basicos',
  'js-ex1',
  'js-ex2',
  'js-projeto',
  'js-arrays-objetos',
  'js-a-ex1',
  'js-a-ex2',
  'js-a-projeto',
  'js-funcoes-async',
  'js-f-ex1',
  'js-f-ex2',
  'js-f-projeto',
  // Curso Expressões Regulares
  'regex-basico',
  'regex-ex1',
  'regex-ex2',
  'regex-projeto',
  'regex-grupos',
  'regex-g-ex1',
  'regex-g-ex2',
  'regex-g-projeto',
  'regex-aplicacoes',
  'regex-a-ex1',
  'regex-a-ex2',
  'regex-a-projeto',
  // Curso OOP Python
  'oop-classes',
  'oop-ex1',
  'oop-ex2',
  'oop-projeto',
  'oop-heranca',
  'oop-h-ex1',
  'oop-h-ex2',
  'oop-h-projeto',
  'oop-encapsulamento',
  'oop-e-ex1',
  'oop-e-ex2',
  'oop-e-projeto',
  // Curso TypeScript
  'ts-tipos',
  'ts-ex1',
  'ts-ex2',
  'ts-projeto',
  'ts-interfaces',
  'ts-i-ex1',
  'ts-i-ex2',
  'ts-i-projeto',
  'ts-avancado',
  'ts-a-ex1',
  'ts-a-ex2',
  'ts-a-projeto',
  // Curso Backend Node
  'node-servidor',
  'node-ex1',
  'node-ex2',
  'node-projeto',
  'node-api-rest',
  'node-a-ex1',
  'node-a-ex2',
  'node-a-projeto',
  'node-erros',
  'node-e-ex1',
  'node-e-ex2',
  'node-e-projeto',
  // Curso Docker
  'docker-imagens',
  'docker-ex1',
  'docker-ex2',
  'docker-projeto',
  'docker-run',
  'docker-r-ex1',
  'docker-r-ex2',
  'docker-r-projeto',
  'docker-dockerfile',
  'docker-d-ex1',
  'docker-d-ex2',
  'docker-d-projeto',
  // Curso FastAPI
  'fastapi-primeiros-passos',
  'fastapi-ex1',
  'fastapi-ex2',
  'fastapi-projeto',
  'fastapi-rotas',
  'fastapi-r-ex1',
  'fastapi-r-ex2',
  'fastapi-r-projeto',
  'fastapi-post',
  'fastapi-p-ex1',
  'fastapi-p-ex2',
  'fastapi-p-projeto',
  // Curso React
  'react-componentes',
  'react-ex1',
  'react-ex2',
  'react-projeto',
  'react-listas',
  'react-l-ex1',
  'react-l-ex2',
  'react-l-projeto',
  'react-composicao',
  'react-c-ex1',
  'react-c-ex2',
  'react-c-projeto',
  // Curso Linux & Terminal
  'linux-arquivos',
  'linux-ex1',
  'linux-ex2',
  'linux-projeto',
  'linux-grep',
  'linux-g-ex1',
  'linux-g-ex2',
  'linux-g-projeto',
  'linux-pipes',
  'linux-p-ex1',
  'linux-p-ex2',
  'linux-p-projeto',
  // Curso Web Scraping
  'scraping-html',
  'scraping-ex1',
  'scraping-ex2',
  'scraping-projeto',
  'scraping-api',
  'scraping-a-ex1',
  'scraping-a-ex2',
  'scraping-a-projeto',
  'scraping-pipeline',
  'scraping-p-ex1',
  'scraping-p-ex2',
  'scraping-p-projeto',
  // Curso Cibersegurança
  'security-hash',
  'security-ex1',
  'security-ex2',
  'security-projeto',
  'security-ataques',
  'security-a-ex1',
  'security-a-ex2',
  'security-a-projeto',
  'security-praticas',
  'security-p-ex1',
  'security-p-ex2',
  'security-p-projeto',
  // Curso Algoritmos de Entrevista
  'alg-two-pointers',
  'alg-ex1',
  'alg-ex2',
  'alg-projeto',
  'alg-sliding-window',
  'alg-s-ex1',
  'alg-s-ex2',
  'alg-s-projeto',
  'alg-recursao',
  'alg-r-ex1',
  'alg-r-ex2',
  'alg-r-projeto',
  // Curso SQL Avançado
  'sqlav-subqueries',
  'sqlav-ex1',
  'sqlav-ex2',
  'sqlav-projeto',
  'sqlav-cte',
  'sqlav-c-ex1',
  'sqlav-c-ex2',
  'sqlav-c-projeto',
  'sqlav-window',
  'sqlav-w-ex1',
  'sqlav-w-ex2',
  'sqlav-w-projeto',
  // Curso Autenticação & JWT
  'jwt-base64',
  'jwt-ex1',
  'jwt-ex2',
  'jwt-projeto',
  'jwt-assinatura',
  'jwt-a-ex1',
  'jwt-a-ex2',
  'jwt-a-projeto',
  'jwt-producao',
  'jwt-p-ex1',
  'jwt-p-ex2',
  'jwt-p-projeto',
  // Curso Estatística com Python
  'estat-central',
  'estat-ex1',
  'estat-ex2',
  'estat-projeto',
  'estat-dispersao',
  'estat-d-ex1',
  'estat-d-ex2',
  'estat-d-projeto',
  'estat-avancado',
  'estat-a-ex1',
  'estat-a-ex2',
  'estat-a-projeto',
  // Curso Git Avançado
  'gitav-stash',
  'gitav-ex1',
  'gitav-projeto',
  'gitav-cherrypick',
  'gitav-c-ex1',
  'gitav-c-ex2',
  'gitav-c-projeto',
  'gitav-diagnostico',
  'gitav-d-ex1',
  'gitav-d-ex2',
  'gitav-d-projeto',
  // Curso Machine Learning
  'ml-regressao',
  'ml-ex1',
  'ml-ex2',
  'ml-projeto',
  'ml-classificacao',
  'ml-c-ex1',
  'ml-c-ex2',
  'ml-c-projeto',
  'ml-clustering',
  'ml-k-ex1',
  'ml-k-ex2',
  'ml-k-projeto',
  // Curso Grafos
  'grafos-bfs',
  'grafos-ex1',
  'grafos-ex2',
  'grafos-projeto',
  'grafos-dfs',
  'grafos-d-ex1',
  'grafos-d-ex2',
  'grafos-d-projeto',
  'grafos-avancado',
  'grafos-a-ex1',
  'grafos-a-ex2',
  'grafos-a-projeto',
  // Curso Design Patterns
  'patterns-criacionais',
  'patterns-ex1',
  'patterns-ex2',
  'patterns-projeto',
  'patterns-comportamentais',
  'patterns-c-ex1',
  'patterns-c-ex2',
  'patterns-c-projeto',
  'patterns-estruturais',
  'patterns-e-ex1',
  'patterns-e-ex2',
  'patterns-e-projeto',
  // Curso Árvores Binárias
  'arvores-bst',
  'arvores-ex1',
  'arvores-ex2',
  'arvores-projeto',
  'arvores-percursos',
  'arvores-p-ex1',
  'arvores-p-ex2',
  'arvores-p-projeto',
  'arvores-operacoes',
  'arvores-o-ex1',
  'arvores-o-ex2',
  'arvores-o-projeto',
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
    // Códigos do curso JS começam com comentário ou const
    for (const [slug, code] of Object.entries(JS_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\/\/|const |let )/)
    }
    // Códigos do curso Regex começam com import
    for (const [slug, code] of Object.entries(REGEX_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso OOP começam com comentário ou class
    for (const [slug, code] of Object.entries(OOP_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/class em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|class |def )/)
    }
    // Códigos do curso TS começam com comentário, type ou const
    for (const [slug, code] of Object.entries(TS_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/type/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\/\/|type |interface |const |function )/)
    }
    // Códigos do curso Backend começam com comentário ou const
    for (const [slug, code] of Object.entries(BACKEND_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\/\/|const |let )/)
    }
    // Códigos do curso Docker começam com import
    for (const [slug, code] of Object.entries(DOCKER_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso FastAPI começam com import
    for (const [slug, code] of Object.entries(FASTAPI_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso React começam com const
    for (const [slug, code] of Object.entries(REACT_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é const em ${slug}: ${firstLine}`,
      ).toMatch(/^(const |\/\/|#)/)
    }
    // Códigos do curso Linux começam com import
    for (const [slug, code] of Object.entries(LINUX_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Scraping começam com import
    for (const [slug, code] of Object.entries(SCRAPING_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Segurança começam com import
    for (const [slug, code] of Object.entries(SECURITY_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Algoritmos começam com comentário ou def
    for (const [slug, code] of Object.entries(ALG_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/def em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|def |[a-zA-Z_])/)
    }
    // Códigos do curso SQL Avançado começam com import
    for (const [slug, code] of Object.entries(SQLAV_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso JWT começam com import
    for (const [slug, code] of Object.entries(JWT_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Estatística começam com import
    for (const [slug, code] of Object.entries(ESTAT_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Git Avançado começam com import
    for (const [slug, code] of Object.entries(GITAV_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso ML começam com import
    for (const [slug, code] of Object.entries(ML_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Grafos começam com import ou comentário
    for (const [slug, code] of Object.entries(GRAFOS_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|[a-zA-Z_])/)
    }
    // Códigos do curso Patterns começam com comentário
    for (const [slug, code] of Object.entries(PATTERNS_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|[a-zA-Z_])/)
    }
    // Códigos do curso Árvores começam com comentário
    for (const [slug, code] of Object.entries(ARVORES_CODES)) {
      const firstLine = code.split('\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|[a-zA-Z_])/)
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
