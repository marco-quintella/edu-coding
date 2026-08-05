import { NextResponse } from 'next/server'
import { readCheatsheet, generateCheatsheetPdf, CHEATSHEETS } from '@/lib/cheatsheets/service'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params
  const meta = CHEATSHEETS.find((c) => c.slug === slug)
  if (!meta) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const markdown = await readCheatsheet(slug)
  if (!markdown) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const pdf = await generateCheatsheetPdf(markdown, meta.title)

  return new NextResponse(pdf as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="cheatsheet-${slug}.pdf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
