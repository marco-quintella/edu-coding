import Link from 'next/link'
import { getCourses } from '@/lib/db/queries'
import { AuthButtons } from './auth-buttons'

interface DashboardCourse {
  course: { id: string; slug: string; title: string }
  doneCount: number
  totalLessons: number
  pct: number
}

interface Props {
  user: { id: string; email: string; name?: string | null } | null
  dashboard?: DashboardCourse[] | null
}

export async function Nav({ user, dashboard }: Props) {
  const courses = await getCourses()

  // Detectar se há curso em andamento (para mostrar badge no link)
  const hasProgress = dashboard?.some((c) => c.doneCount > 0 && c.pct < 100)

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-line bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1280px] items-center gap-6 px-6">
        <Link href="/" className="flex items-center gap-2.5 font-black tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent font-mono text-[13px] font-black text-white">
            &gt;_
          </span>
          Edu Coding
        </Link>
        <div className="ml-2 hidden items-center gap-1 md:flex">
          {user && (
            <Link
              href="/dashboard"
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                hasProgress
                  ? 'bg-accent-soft font-bold text-accent-strong hover:bg-accent/20'
                  : 'text-ink-secondary hover:bg-background-hover hover:text-ink'
              }`}
            >
              Meu Progresso
              {hasProgress && (
                <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              )}
            </Link>
          )}
          {user && (
            <Link
              href="/perfil"
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-background-hover hover:text-ink"
            >
              Meu Perfil
            </Link>
          )}
          {user && (
            <Link
              href="/revisao"
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-background-hover hover:text-ink"
            >
              Revisão
            </Link>
          )}
          <Link
            href="/glossario"
            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-background-hover hover:text-ink"
          >
            Glossário
          </Link>
          <Link
            href="/courses"
            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-background-hover hover:text-ink"
          >
            Cursos
          </Link>
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/courses/${c.slug}`}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-background-hover hover:text-ink"
            >
              {c.title}
            </Link>
          ))}
        </div>
        <div className="ml-auto">
          <AuthButtons user={user} />
        </div>
      </div>
    </nav>
  )
}
