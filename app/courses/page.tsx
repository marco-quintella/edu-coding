import { getCourses } from '@/lib/db/queries'
import { getCurrentUser } from '@/lib/auth/server'
import { AuthButtons } from '@/components/auth-buttons'

export default async function CoursesPage() {
  const [courses, user] = await Promise.all([
    getCourses(),
    getCurrentUser(),
  ])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Catálogo</h1>
            <p className="text-gray-600">Cursos textuais e interativos.</p>
          </div>
          <AuthButtons user={user} />
        </header>

        {courses.length === 0 ? (
          <p className="text-gray-500">Nenhum curso disponível.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((c) => (
              <li
                key={c.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-blue-400 hover:shadow-sm transition-all bg-white"
              >
                <a href={`/courses/${c.slug}`} className="block">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
                    {c.title}
                  </h2>
                  {c.description && (
                    <p className="text-gray-600 text-sm">{c.description}</p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
