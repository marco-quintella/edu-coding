import { getCurrentUser } from '@/lib/auth/server'
import { CHEATSHEETS, readCheatsheet } from '@/lib/cheatsheets/service'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { CheatsheetList } from '@/components/cheatsheet-list'

export const metadata = {
  title: 'Cheat sheets — Edu Coding',
}

export default async function CheatsheetsPage() {
  const user = await getCurrentUser()
  const sheets = await Promise.all(
    CHEATSHEETS.map(async (meta) => {
      const markdown = await readCheatsheet(meta.slug)
      return { ...meta, markdown }
    })
  )

  return (
    <>
      <Nav user={user} />
      <main className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Cheat sheets</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Referência rápida por fase — código pronto, decisões e pegadinhas.
              Baixe em PDF para consultar offline.
            </p>
          </div>

          <CheatsheetList sheets={sheets} />
        </div>
      </main>
      <Footer />
    </>
  )
}
