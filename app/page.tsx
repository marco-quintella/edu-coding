import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Edu Coding</h1>
        <p className="text-lg text-gray-600 mb-8">
          Aprenda programação e IA com lições interativas, executáveis no browser.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/courses"
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Ver catálogo
          </Link>
          <a
            href="https://github.com/marcoquintella/edu-coding"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
