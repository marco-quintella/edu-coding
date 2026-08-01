import { promises as fs } from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getLessonById } from '@/lib/db/queries'
import { mdxComponents } from '@/components/mdx-components'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'lessons')

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getLessonById(id)
  if (!data) notFound()

  const { lesson, phase, questions } = data

  let source = ''
  try {
    const relative = lesson.mdxPath.replace(/^content\/lessons\//, '')
    const filePath = path.join(CONTENT_DIR, relative)
    source = await fs.readFile(filePath, 'utf-8')
  } catch {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link
            href="/courses"
            className="text-blue-600 text-sm hover:underline mb-6 inline-block"
          >
            ← Catálogo
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded p-4">
            Conteúdo ainda não escrito. MDX esperado em:{' '}
            <code className="text-sm">{lesson.mdxPath}</code>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/courses"
          className="text-blue-600 text-sm hover:underline mb-6 inline-block"
        >
          ← Catálogo
        </Link>

        <header className="mb-8 pb-6 border-b border-gray-200">
          <p className="text-sm text-gray-500 mb-1">
            {phase?.title ?? 'Fase'}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {lesson.title}
          </h1>
          <p className="text-sm text-gray-500">
            ⏱ {lesson.estimatedMinutes ?? '?'} min
          </p>
        </header>

        <article className="prose prose-gray max-w-none">
          <MDXRemote source={source} components={mdxComponents} />
        </article>

        {questions.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Quiz</h2>
            <p className="text-gray-600 text-sm mb-6">
              {questions.length} pergunta(s) • Componente interativo virá na
              Phase 4.
            </p>
            <ol className="space-y-4">
              {questions.map((q) => (
                <li key={q.id} className="bg-gray-50 p-4 rounded">
                  <p className="font-medium mb-2">{q.question}</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {(
                      q.options as { id: string; text: string }[]
                    ).map((opt) => (
                      <li key={opt.id}>• {opt.text}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </main>
  )
}
