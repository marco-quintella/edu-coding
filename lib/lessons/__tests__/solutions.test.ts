import { describe, it, expect } from 'vitest'
import { SOLUTIONS, getSolution } from '../solutions'
import { getInitialCode } from '../initial-codes'

describe('SOLUTIONS (comparação de soluções)', () => {
  it('toda solução tem codeKey correspondente no registro de códigos iniciais', () => {
    for (const key of Object.keys(SOLUTIONS)) {
      expect(
        getInitialCode(key),
        `initial-codes deve ter '${key}'`,
      ).not.toBe('')
    }
  })

  it('toda solução tem explicação e código', () => {
    for (const [key, s] of Object.entries(SOLUTIONS)) {
      expect(s.explanation.length, `${key}: explicação`).toBeGreaterThan(10)
      expect(s.code.length, `${key}: código`).toBeGreaterThan(20)
    }
  })

  it('getSolution retorna null para chave inexistente', () => {
    expect(getSolution('nao-existe')).toBeNull()
  })

  it('getSolution retorna a solução correta', () => {
    const s = getSolution('regressao-ex1')
    expect(s?.code).toContain('LinearRegression')
  })

  it('soluções da Fase 01 cobrem todos os exercícios verificados', () => {
    // Exercícios principais da Fase 01 com Exercise (expectedOutput)
    const exercicios = [
      'regressao-ex1',
      'regressao-ex2',
      'regressao-ex3',
      'regressao-projeto',
      'arvores-ex1',
      'arvores-ex2',
      'arvores-projeto',
      'knn-ex1',
      'knn-ex2',
      'knn-ex3',
      'kmeans-ex1',
      'kmeans-ex2',
      'kmeans-projeto',
    ]
    for (const key of exercicios) {
      expect(SOLUTIONS[key], `solução para '${key}'`).toBeDefined()
    }
  })
})
