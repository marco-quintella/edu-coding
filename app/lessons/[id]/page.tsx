import { promises as fs } from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLessonById, getCompletedLessonIds } from '@/lib/db/queries'
import { getCurrentUser } from '@/lib/auth/server'
import { renderMdx } from '@/lib/mdx/render'
import { Quiz } from '@/components/quiz'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { ChatDoubt } from '@/components/chat-doubt'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'lessons')

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getLessonById(id)
  if (!data) notFound()

  const { lesson, phase, questions, phaseLessons } = data
  const user = await getCurrentUser()
  const completedIds = user
    ? await getCompletedLessonIds(user.id)
    : new Set<string>()

  let source = ''
  try {
    const relative = lesson.mdxPath.replace(/^content\/lessons\//, '')
    const filePath = path.join(CONTENT_DIR, relative)
    source = await fs.readFile(filePath, 'utf-8')
  } catch {
    return (
      <>
        <Nav user={user} />
        <main className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/courses"
              className="mb-6 inline-block text-sm font-medium text-accent-strong hover:underline"
            >
              ← Catálogo
            </Link>
            <h1 className="mb-2 text-3xl font-bold text-ink">{lesson.title}</h1>
            <p className="rounded-[16px] border border-line bg-accent-soft p-4 text-sm text-ink-secondary">
              Conteúdo ainda não escrito. MDX esperado em:{' '}
              <code className="font-mono text-accent-strong">{lesson.mdxPath}</code>
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav user={user} />
      <main className="px-6 pb-20 pt-8">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sidebar: trilha da fase */}
          {phase && (
            <aside className="hidden self-start lg:sticky lg:top-[88px] lg:block">
              <p className="text-[13px] font-bold text-ink">{phase.title}</p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {phaseLessons.filter((l) => completedIds.has(l.id)).length} de{' '}
                {phaseLessons.length} concluídas
              </p>
              <div className="mt-3 h-[5px] overflow-hidden rounded-full bg-background-hover">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{
                    width: `${phaseLessons.length > 0 ? (phaseLessons.filter((l) => completedIds.has(l.id)).length / phaseLessons.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <nav className="mt-4 flex flex-col gap-0.5">
                {phaseLessons.map((l, idx) => {
                  const done = completedIds.has(l.id)
                  const active = l.id === lesson.id
                  return (
                    <Link
                      key={l.id}
                      href={`/lessons/${l.id}`}
                      className={`flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13.5px] transition-colors ${
                        active
                          ? 'bg-accent-soft font-bold text-accent-strong'
                          : done
                            ? 'text-ink-secondary hover:bg-background-hover hover:text-ink'
                            : 'text-ink-secondary hover:bg-background-hover hover:text-ink'
                      }`}
                    >
                      <span
                        className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full font-mono text-[11px] font-bold ${
                          done
                            ? 'bg-accent text-white'
                            : active
                              ? 'bg-accent text-white'
                              : 'border-2 border-line-strong text-ink-muted'
                        }`}
                      >
                        {done ? '✓' : idx + 1}
                      </span>
                      <span className="flex-1">{l.title}</span>
                      <span className="font-mono text-[11px] text-ink-muted">
                        {l.estimatedMinutes ?? '?'}m
                      </span>
                    </Link>
                  )
                })}
              </nav>
            </aside>
          )}

          {/* Conteúdo */}
          <div className="min-w-0">
            <div className="text-[13px] text-ink-muted">
              <Link href="/courses" className="hover:text-accent-strong">
                Catálogo
              </Link>{' '}
              / <span className="text-ink-secondary">{phase?.title ?? 'Fase'}</span>
            </div>

            <header className="mt-2 border-b border-line pb-6">
              <h1 className="text-[2.2rem] font-black tracking-tight">
                {lesson.title}
              </h1>
              <p className="mt-1 font-mono text-sm text-ink-muted">
                {lesson.estimatedMinutes ?? '?'} min
              </p>
            </header>

            <article className="prose prose-zinc mt-8 max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-ink-secondary prose-a:text-accent-strong dark:prose-invert">
              {await renderMdx(source)}
            </article>

            {questions.length > 0 && (
              <section className="mt-12 border-t border-line pt-8">
                <Quiz lessonId={lesson.id} questions={questions} />
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ChatDoubt lessonTitle={lesson.title} lessonContent={source} />
    </>
  )
}
