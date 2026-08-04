/**
 * Cálculo de streak (dias consecutivos de atividade) — lógica pura,
 * testável sem banco.
 *
 * Regras:
 * - Dia ativo = qualquer atividade registrada (completar lição, quiz, exec)
 * - Streak continua se a atividade é hoje ou ontem (não quebra no mesmo dia)
 * - Streak QUEBRA se o último dia ativo for anterior a ontem
 * - Datas em fuso local (YYYY-MM-DD), sem timezone no cálculo
 */

export function todayLocal(): string {
  // Data local no formato YYYY-MM-DD (evita bugs de UTC↔local no cálculo)
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Converte 'YYYY-MM-DD' em Date (meia-noite local). */
function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Diferença em dias entre duas datas YYYY-MM-DD (b - a). */
export function daysBetween(a: string, b: string): number {
  const ms = parseDate(b).getTime() - parseDate(a).getTime()
  return Math.round(ms / 86_400_000)
}

export interface StreakState {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string | null
}

/**
 * Calcula o novo estado do streak dado o estado atual e a data de hoje.
 * Puro e determinístico — ideal para unit tests.
 */
export function nextStreak(
  state: StreakState,
  today: string
): StreakState {
  // Primeira atividade: streak = 1
  if (!state.lastActiveDate) {
    return { currentStreak: 1, longestStreak: 1, lastActiveDate: today }
  }

  const gap = daysBetween(state.lastActiveDate, today)

  // Atividade no mesmo dia: não muda o streak (idempotente)
  if (gap === 0) {
    return state
  }

  // Atividade ontem: streak continua
  if (gap === 1) {
    const currentStreak = state.currentStreak + 1
    return {
      currentStreak,
      longestStreak: Math.max(state.longestStreak, currentStreak),
      lastActiveDate: today,
    }
  }

  // Buraco de >=2 dias: streak quebra, recomeça em 1
  return { currentStreak: 1, longestStreak: state.longestStreak, lastActiveDate: today }
}
