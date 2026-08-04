import { Flame } from '@phosphor-icons/react/dist/ssr'

interface GamificationCardProps {
  streakCurrent: number
  streakLongest: number
  xpTotal: number
}

/**
 * Cartão de gamificação: streak de dias ativos + XP total.
 * Light-first com dark via class (design system C).
 */
export function GamificationCard({ streakCurrent, streakLongest, xpTotal }: GamificationCardProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="rounded-[12px] border border-line bg-surface-2 px-4 py-3">
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-ink">
          <Flame size={15} weight="fill" className="text-accent" />
          {streakCurrent} {streakCurrent === 1 ? 'dia' : 'dias'}
        </div>
        <p className="mt-0.5 text-[11px] text-ink-muted">
          recorde: {streakLongest} {streakLongest === 1 ? 'dia' : 'dias'}
        </p>
      </div>
      <div className="rounded-[12px] border border-line bg-surface-2 px-4 py-3">
        <div className="text-[13px] font-bold text-ink">
          <span className="font-mono">{xpTotal}</span> XP
        </div>
        <p className="mt-0.5 text-[11px] text-ink-muted">conclua lições e quizzes para acumular</p>
      </div>
    </div>
  )
}
