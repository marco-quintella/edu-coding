import { describe, it, expect } from 'vitest'
import { parseRubric } from '../grader'
import { CHALLENGES, getChallenge } from '@/lib/challenges/definitions'

describe('parseRubric (avaliador de desafios)', () => {
  it('parseia JSON válido', () => {
    const r = parseRubric(
      '{"score": 75, "feedback": "Boa definição", "strengths": ["conceito certo"], "gaps": ["faltou exemplo"]}'
    )
    expect(r.score).toBe(75)
    expect(r.feedback).toBe('Boa definição')
    expect(r.strengths).toEqual(['conceito certo'])
    expect(r.gaps).toEqual(['faltou exemplo'])
  })

  it('aceita JSON embrulhado em markdown ```json', () => {
    const r = parseRubric('```json\n{"score": 60, "feedback": "ok"}\n```')
    expect(r.score).toBe(60)
    expect(r.feedback).toBe('ok')
  })

  it('clampa score fora do intervalo 0-100', () => {
    expect(parseRubric('{"score": 150}').score).toBe(100)
    expect(parseRubric('{"score": -5}').score).toBe(0)
  })

  it('falha graciosa em JSON inválido (devolve texto cru)', () => {
    const r = parseRubric('não é json')
    expect(r.score).toBe(0)
    expect(r.feedback).toContain('não é json')
  })

  it('limita arrays a 3 itens', () => {
    const r = parseRubric(
      '{"score": 80, "strengths": ["a","b","c","d","e"], "gaps": ["x","y","z","w"]}'
    )
    expect(r.strengths).toHaveLength(3)
    expect(r.gaps).toHaveLength(3)
  })
})

describe('CHALLENGES (desafios de entrevista)', () => {
  it('5 desafios com ids únicos (um por fase)', () => {
    expect(CHALLENGES).toHaveLength(5)
    const ids = CHALLENGES.map((c) => c.id)
    expect(new Set(ids).size).toBe(5)
    expect(new Set(CHALLENGES.map((c) => c.phase))).toEqual(new Set([1, 2, 3, 4, 5]))
  })

  it('todos têm pergunta e hint', () => {
    for (const c of CHALLENGES) {
      expect(c.question.length, c.id).toBeGreaterThan(30)
      expect(c.hint.length, c.id).toBeGreaterThan(20)
    }
  })

  it('getChallenge retorna null para id inexistente', () => {
    expect(getChallenge('nao-existe')).toBeNull()
  })
})
