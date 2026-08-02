import Link from 'next/link'
import { AuthButtons } from './auth-buttons'

interface Props {
  user: { id: string; email: string; name?: string | null } | null
}

export function Nav({ user }: Props) {
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
          <Link
            href="/courses"
            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-background-hover hover:text-ink"
          >
            Cursos
          </Link>
          <Link
            href="/courses/ia-para-devs"
            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-background-hover hover:text-ink"
          >
            IA para Devs
          </Link>
        </div>
        <div className="ml-auto">
          <AuthButtons user={user} />
        </div>
      </div>
    </nav>
  )
}
