import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-4 text-sm text-ink-muted">
        <span className="font-bold text-ink">Edu Coding</span>
        <span>Plataforma de cursos interativos de IA para devs.</span>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/courses" className="hover:text-ink transition-colors">
            Catálogo
          </Link>
          <a
            href="https://github.com/marcoquintella/edu-coding"
            className="hover:text-ink transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
