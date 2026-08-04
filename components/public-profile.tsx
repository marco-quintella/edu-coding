import Link from 'next/link'
import { Flame, SealCheck } from '@phosphor-icons/react/dist/ssr'

interface CertificateInfo {
  token: string
  issuedAt: Date
  courseTitle: string
  phaseTitle: string | null
  isCourse: boolean
}

interface CourseStat {
  courseTitle: string
  done: number
  total: number
  pct: number
  completedPhases: { title: string }[]
}

interface PublicProfileProps {
  username: string
  displayName: string
  bio: string | null
  streak: number
  xpTotal: number
  courseStats: CourseStat[]
  certificates: CertificateInfo[]
}

/**
 * Perfil público de um aluno (opt-in). Mostra progresso, streak, XP e
 * certificados — nada de email ou dados sensíveis.
 */
export function PublicProfile({
  username,
  displayName,
  bio,
  streak,
  xpTotal,
  courseStats,
  certificates,
}: PublicProfileProps) {
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-accent-soft text-3xl font-black text-accent-strong">
          {initial}
        </div>
        <div className="min-w-0">
          <h1 className="flex items-center gap-1.5 text-2xl font-black tracking-tight">
            {displayName}
            <SealCheck size={20} weight="fill" className="shrink-0 text-accent" />
          </h1>
          <p className="font-mono text-sm text-ink-muted">/u/{username}</p>
          {bio && <p className="mt-1 text-sm text-ink-secondary">{bio}</p>}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        <div className="rounded-[12px] border border-line bg-surface-2 px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-black text-ink">
            <Flame size={18} weight="fill" className="text-accent" />
            {streak}
          </div>
          <p className="mt-0.5 text-[11px] text-ink-muted">
            {streak === 1 ? 'dia de streak' : 'dias de streak'}
          </p>
        </div>
        <div className="rounded-[12px] border border-line bg-surface-2 px-4 py-3 text-center">
          <div className="text-lg font-black text-ink">
            <span className="font-mono">{xpTotal}</span>
          </div>
          <p className="mt-0.5 text-[11px] text-ink-muted">XP total</p>
        </div>
        <div className="rounded-[12px] border border-line bg-surface-2 px-4 py-3 text-center">
          <div className="text-lg font-black text-ink">{certificates.length}</div>
          <p className="mt-0.5 text-[11px] text-ink-muted">
            {certificates.length === 1 ? 'certificado' : 'certificados'}
          </p>
        </div>
      </div>

      {/* Cursos */}
      <section className="mt-10">
        <h2 className="text-lg font-bold tracking-tight">Cursos</h2>
        <div className="mt-3 space-y-3">
          {courseStats.map((c) => (
            <div key={c.courseTitle} className="rounded-[12px] border border-line bg-surface px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-ink">{c.courseTitle}</span>
                <span className="font-mono text-xs text-ink-muted">
                  {c.done}/{c.total} lições · {c.pct}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background-hover">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${c.pct}%` }}
                />
              </div>
              {c.completedPhases.length > 0 && (
                <p className="mt-2 text-[11px] text-ink-muted">
                  Fases concluídas: {c.completedPhases.map((p) => p.title).join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certificados */}
      {certificates.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold tracking-tight">Certificados</h2>
          <div className="mt-3 space-y-2">
            {certificates.map((cert) => (
              <Link
                key={cert.token}
                href={`/certificado/${cert.token}`}
                className="flex items-center justify-between rounded-[12px] border border-line bg-surface px-4 py-3 transition-colors hover:bg-background-hover"
              >
                <span className="text-sm font-semibold text-ink">
                  {cert.isCourse ? 'Curso completo' : cert.phaseTitle}
                  <span className="ml-2 text-xs font-normal text-ink-muted">
                    {cert.courseTitle}
                  </span>
                </span>
                <span className="text-xs text-accent-strong">Ver →</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
