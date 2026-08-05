import { Download } from '@phosphor-icons/react/dist/ssr'
import { renderMdx } from '@/lib/mdx/render'

interface CheatsheetItem {
  slug: string
  phase: number
  title: string
  markdown: string | null
}

interface CheatsheetListProps {
  sheets: CheatsheetItem[]
}

/**
 * Lista as cheat sheets por fase: markdown renderizado (com highlight
 * via Shiki) + botão de download em PDF.
 */
export async function CheatsheetList({ sheets }: CheatsheetListProps) {
  const rendered = await Promise.all(
    sheets.map(async (s) => ({
      ...s,
      html: s.markdown ? await renderMdx(s.markdown) : null,
    }))
  )

  return (
    <div className="space-y-10">
      {rendered.map((s) => (
        <section key={s.slug} className="overflow-hidden rounded-[16px] border border-line bg-surface shadow-card">
          <div className="flex items-center justify-between border-b border-line bg-surface-2 px-5 py-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                Fase {s.phase}
              </p>
              <h2 className="text-lg font-bold tracking-tight">{s.title}</h2>
            </div>
            <a
              href={`/api/cheatsheets/${s.slug}/pdf`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-[13px] font-bold text-ink transition-colors hover:bg-background-hover"
            >
              <Download size={15} />
              PDF
            </a>
          </div>

          <div className="px-5 py-4">
            {s.html ? (
              <div className="prose prose-zinc max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-ink-secondary prose-code:text-accent-strong dark:prose-invert [&_pre]:!bg-[#0e1116]">
                {s.html}
              </div>
            ) : (
              <p className="text-sm text-ink-muted">Conteúdo em breve.</p>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
