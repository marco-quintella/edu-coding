import { getCourses } from '@/lib/db/queries'
import { getCurrentUser } from '@/lib/auth/server'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export default async function CoursesPage() {
  const [courses, user] = await Promise.all([getCourses(), getCurrentUser()])

  return (
    <>
      <Nav user={user} />
      <main className="px-6 py-14">
        <div className="mx-auto max-w-[1280px]">
          <h1 className="text-[2.2rem] font-black tracking-tight">Catálogo</h1>
          <p className="mt-2 text-ink-secondary">Cursos interativos, tudo em português.</p>

          {courses.length === 0 ? (
            <p className="mt-10 text-ink-muted">Nenhum curso disponível ainda.</p>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {courses.map((c) => (
                <a
                  key={c.id}
                  href={`/courses/${c.slug}`}
                  className="group rounded-[16px] border border-line bg-surface p-7 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-pop"
                >
                  <span className="inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-strong">
                    {c.slug === 'ia-para-devs' ? 'Disponível' : 'Em breve'}
                  </span>
                  <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink transition-colors group-hover:text-accent-strong">
                    {c.title}
                  </h2>
                  {c.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                      {c.description}
                    </p>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
