/**
 * Cheat sheets do curso — markdown por fase + geração de PDF.
 * A página /cheatsheets renderiza o markdown (com highlight) e oferece
 * download em PDF (pdf-lib, sem dependências externas).
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export interface CheatSheetMeta {
  slug: string
  phase: number
  title: string
  file: string
}

export const CHEATSHEETS_DIR = path.join(process.cwd(), 'content', 'cheatsheets')

export const CHEATSHEETS: CheatSheetMeta[] = [
  { slug: 'fase-01', phase: 1, title: 'Fundamentos de ML', file: 'fase-01.md' },
  { slug: 'fase-02', phase: 2, title: 'NLP, Embeddings e GA', file: 'fase-02.md' },
  { slug: 'fase-03', phase: 3, title: 'LLMs e LangChain', file: 'fase-03.md' },
  { slug: 'fase-04', phase: 4, title: 'Multimídia', file: 'fase-04.md' },
  { slug: 'fase-05', phase: 5, title: 'LGPD, Anomalias e Cloud', file: 'fase-05.md' },
]

/** Lê o markdown bruto de uma cheat sheet (sem frontmatter). */
export async function readCheatsheet(slug: string): Promise<string | null> {
  const meta = CHEATSHEETS.find((c) => c.slug === slug)
  if (!meta) return null
  try {
    const raw = await fs.readFile(path.join(CHEATSHEETS_DIR, meta.file), 'utf-8')
    // Remove frontmatter YAML (--- ... ---) do início
    return raw.replace(/^---[\s\S]*?---\s*/, '')
  } catch {
    return null
  }
}

/**
 * Remove caracteres fora do WinAnsi (pdf-lib StandardFonts não suporta
 * Unicode além de latin-1). Substitui setas/emoji/símbolos por ASCII.
 */
function sanitizeForPdf(text: string): string {
  return text
    .replace(/→/g, '->')
    .replace(/←/g, '<-')
    .replace(/×/g, 'x')
    .replace(/·/g, '-')
    .replace(/—/g, '-')
    .replace(/✅/g, '[ok]')
    .replace(/📌/g, '[!]')
    .replace(/⚠️/g, '[!]')
    .replace(/🎓/g, '')
    .replace(/[^\x00-\x7F]/g, (ch) => {
      // Mantém acentos comuns do português (latin-1)
      if (/[à-ÿÀ-Ý]/.test(ch)) return ch
      return ''
    })
}

/**
 * Gera PDF da cheat sheet: extrai as linhas de código (```python) e
 * monta um PDF simples de referência rápida (mono para código).
 */
export async function generateCheatsheetPdf(markdown: string, title: string): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842]) // A4 portrait

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const mono = await pdfDoc.embedFont(StandardFonts.Courier)

  const w = page.getWidth()
  const margin = 50
  const maxWidth = w - margin * 2
  let y = 800

  page.drawText('Edu Coding - Cheat Sheet', {
    x: margin, y: y, size: 18, font: bold, color: rgb(0.02, 0.6, 0.41),
  })
  y -= 26
  page.drawText(title, {
    x: margin, y: y, size: 13, font: font, color: rgb(0.3, 0.3, 0.35),
  })
  y -= 30

  const lines = markdown.split('\n')
  let inCode = false

  for (const line of lines) {
    // Pula frontmatter
    if (line === '---') continue
    if (line.startsWith('title:')) continue

    // Toggle de bloco de código
    if (line.trim().startsWith('```')) {
      inCode = !inCode
      y -= 8
      continue
    }

    // Quebra de página se necessário
    if (y < 60) {
      pdfDoc.addPage([595, 842])
      y = 800
      continue
    }

    const isCode = inCode
    const isHeading = line.startsWith('#')
    const content = line.replace(/^#+\s*/, '')

    if (isHeading) {
      page.drawText(sanitizeForPdf(content), { x: margin, y: y, size: 13, font: bold, color: rgb(0.1, 0.1, 0.15) })
      y -= 22
    } else if (isCode) {
      if (content.trim().length > 0) {
        page.drawText(sanitizeForPdf(content), { x: margin + 8, y: y, size: 8, font: mono, color: rgb(0.1, 0.4, 0.6) })
        y -= 12
      } else {
        y -= 6
      }
    } else if (content.trim().length > 0) {
      // Texto normal — corta em linhas para caber
      const words = content.split(' ')
      let current = ''
      for (const word of words) {
        const test = current ? `${current} ${word}` : word
        if (font.widthOfTextAtSize(test, 9) > maxWidth && current) {
          page.drawText(sanitizeForPdf(current), { x: margin, y: y, size: 9, font, color: rgb(0.2, 0.2, 0.25) })
          y -= 13
          current = word
        } else {
          current = test
        }
      }
      if (current) {
        page.drawText(sanitizeForPdf(current), { x: margin, y: y, size: 9, font, color: rgb(0.2, 0.2, 0.25) })
        y -= 13
      }
    } else {
      y -= 6
    }
  }

  return Buffer.from(await pdfDoc.save())
}
