import { describe, it, expect } from 'vitest'
import { nextStreak, daysBetween, type StreakState } from '../streak'

const empty: StreakState = { currentStreak: 0, longestStreak: 0, lastActiveDate: null }

describe('daysBetween', () => {
  it('mesmo dia = 0', () => {
    expect(daysBetween('2026-08-03', '2026-08-03')).toBe(0)
  })
  it('dia seguinte = 1', () => {
    expect(daysBetween('2026-08-03', '2026-08-04')).toBe(1)
  })
  it('buraco de 3 dias = 3', () => {
    expect(daysBetween('2026-08-01', '2026-08-04')).toBe(3)
  })
})

describe('nextStreak', () => {
  it('primeira atividade: streak = 1', () => {
    const next = nextStreak(empty, '2026-08-03')
    expect(next.currentStreak).toBe(1)
    expect(next.longestStreak).toBe(1)
    expect(next.lastActiveDate).toBe('2026-08-03')
  })

  it('atividade no mesmo dia é idempotente', () => {
    const state: StreakState = { currentStreak: 3, longestStreak: 5, lastActiveDate: '2026-08-03' }
    const next = nextStreak(state, '2026-08-03')
    expect(next).toEqual(state)
  })

  it('atividade ontem: streak continua (+1)', () => {
    const state: StreakState = { currentStreak: 4, longestStreak: 4, lastActiveDate: '2026-08-02' }
    const next = nextStreak(state, '2026-08-03')
    expect(next.currentStreak).toBe(5)
    expect(next.longestStreak).toBe(5)
    expect(next.lastActiveDate).toBe('2026-08-03')
  })

  it('atividade ontem com recorde anterior maior: longest não regride', () => {
    const state: StreakState = { currentStreak: 2, longestStreak: 9, lastActiveDate: '2026-08-02' }
    const next = nextStreak(state, '2026-08-03')
    expect(next.currentStreak).toBe(3)
    expect(next.longestStreak).toBe(9)
  })

  it('buraco de 2+ dias: streak quebra e recomeça em 1', () => {
    const state: StreakState = { currentStreak: 7, longestStreak: 7, lastActiveDate: '2026-07-30' }
    const next = nextStreak(state, '2026-08-03')
    expect(next.currentStreak).toBe(1)
    expect(next.longestStreak).toBe(7) // recorde preservado
    expect(next.lastActiveDate).toBe('2026-08-03')
  })

  it('sequência longa: 1 → 2 → 3 → quebra → 1', () => {
    let state = nextStreak(empty, '2026-08-01')
    state = nextStreak(state, '2026-08-02')
    state = nextStreak(state, '2026-08-03')
    expect(state.currentStreak).toBe(3)
    expect(state.longestStreak).toBe(3)

    state = nextStreak(state, '2026-08-06') // 3 dias sem atividade
    expect(state.currentStreak).toBe(1)
    expect(state.longestStreak).toBe(3)
  })
})
