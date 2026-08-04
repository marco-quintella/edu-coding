import { describe, it, expect } from 'vitest'
import { nextReviewState, initialReviewState, daysUntilNextReview } from '../review'
import { REVIEW_CARDS, getReviewCard } from '@/lib/lessons/review-cards'

describe('SM-2 simplificado (revisão espaçada)', () => {
  it('estado inicial: ease 2.5, intervalo 0, reps 0', () => {
    expect(initialReviewState()).toEqual({ ease: 2.5, interval: 0, repetitions: 0 })
  })

  it('primeira resposta good: intervalo 1, reps 1', () => {
    const next = nextReviewState(initialReviewState(), 'good')
    expect(next.interval).toBe(1)
    expect(next.repetitions).toBe(1)
    expect(next.ease).toBe(2.5)
  })

  it('segunda good: intervalo 6, reps 2', () => {
    const first = nextReviewState(initialReviewState(), 'good')
    const second = nextReviewState(first, 'good')
    expect(second.interval).toBe(6)
    expect(second.repetitions).toBe(2)
  })

  it('terceira good: intervalo = anterior * ease', () => {
    let state = initialReviewState()
    state = nextReviewState(state, 'good') // 1 dia
    state = nextReviewState(state, 'good') // 6 dias
    state = nextReviewState(state, 'good') // 6 * 2.5 = 15
    expect(state.interval).toBe(15)
    expect(state.repetitions).toBe(3)
  })

  it('easy aumenta ease e intervalo multiplica mais', () => {
    let state = initialReviewState()
    state = nextReviewState(state, 'easy') // reps 1, ease 2.65
    expect(state.ease).toBeCloseTo(2.65)
    state = nextReviewState(state, 'easy') // reps 2, ease 2.8
    state = nextReviewState(state, 'easy') // reps 3: ease 2.95, 6 * 2.95 = 18
    expect(state.interval).toBe(18)
    expect(state.ease).toBeCloseTo(2.95)
  })

  it('again: ease cai, intervalo volta a 1, reps zera', () => {
    let state = initialReviewState()
    state = nextReviewState(state, 'good')
    state = nextReviewState(state, 'good')
    const after = nextReviewState(state, 'again')
    expect(after.interval).toBe(1)
    expect(after.repetitions).toBe(0)
    expect(after.ease).toBeCloseTo(2.3) // 2.5 - 0.2
  })

  it('ease nunca cai abaixo de 1.3', () => {
    let state = initialReviewState()
    for (let i = 0; i < 10; i++) {
      state = nextReviewState(state, 'again')
    }
    expect(state.ease).toBeGreaterThanOrEqual(1.3)
  })

  it('daysUntilNextReview nunca é menor que 1', () => {
    expect(daysUntilNextReview(initialReviewState())).toBe(1)
    expect(daysUntilNextReview({ ease: 2.5, interval: 14, repetitions: 3 })).toBe(14)
  })
})

describe('REVIEW_CARDS (cards da revisão)', () => {
  it('cards têm ids únicos', () => {
    const ids = REVIEW_CARDS.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('todos os cards têm pergunta e resposta', () => {
    for (const c of REVIEW_CARDS) {
      expect(c.question.length, c.id).toBeGreaterThan(10)
      expect(c.answer.length, c.id).toBeGreaterThan(20)
    }
  })

  it('cobre as 5 fases', () => {
    const phases = new Set(REVIEW_CARDS.map((c) => c.phase))
    expect(phases).toEqual(new Set([1, 2, 3, 4, 5]))
  })

  it('getReviewCard retorna null para id inexistente', () => {
    expect(getReviewCard('nao-existe')).toBeNull()
  })
})
