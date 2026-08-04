/**
 * Algoritmo de revisão espaçada (SM-2 simplificado) — lógica pura,
 * testável sem banco.
 *
 * Resposta do aluno (quality):
 * - 'again'  → errou: ease -0.20, intervalo volta a 1 dia, reps = 0
 * - 'good'   → acertou: intervalo multiplica (fator do ease), reps +1
 * - 'easy'   → acertou fácil: ease +0.15, intervalo multiplica mais
 *
 * Regras SM-2:
 * - 1ª repetição: intervalo = 1 dia
 * - 2ª: 6 dias
 * - n≥3: intervalo *= ease
 * - ease mínimo: 1.3 (nunca cai abaixo — evita loop de "fácil demais")
 */

export type ReviewQuality = 'again' | 'good' | 'easy'

export interface ReviewState {
  ease: number
  interval: number
  repetitions: number
}

const MIN_EASE = 1.3

export function initialReviewState(): ReviewState {
  return { ease: 2.5, interval: 0, repetitions: 0 }
}

/**
 * Calcula o próximo estado da revisão dado o estado atual e a resposta.
 * Retorna também o próximo intervalo em dias.
 */
export function nextReviewState(
  state: ReviewState,
  quality: ReviewQuality
): ReviewState {
  const { ease, repetitions } = state

  if (quality === 'again') {
    return {
      ease: Math.max(MIN_EASE, ease - 0.2),
      interval: 1,
      repetitions: 0,
    }
  }

  // good / easy
  let nextEase = ease
  if (quality === 'easy') nextEase = Math.min(3.5, ease + 0.15)

  const reps = repetitions + 1
  let interval: number

  if (reps === 1) {
    interval = 1
  } else if (reps === 2) {
    interval = 6
  } else {
    interval = Math.round(state.interval * nextEase)
  }

  return { ease: nextEase, interval, repetitions: reps }
}

/** Dias até a próxima revisão (>=1 sempre). */
export function daysUntilNextReview(state: ReviewState): number {
  return Math.max(1, state.interval)
}
