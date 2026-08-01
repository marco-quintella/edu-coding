import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { promises as fs } from 'node:fs'

export interface CertificateData {
  userName: string
  phaseTitle: string
  courseTitle: string
  completedAt: Date
}

export async function generateCertificatePdf(
  data: CertificateData
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([842, 595]) // A4 landscape (pt units: 1pt = 1/72 inch)

  const helv = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const w = page.getWidth()
  const h = page.getHeight()

  // Background warm cream
  page.drawRectangle({
    x: 0,
    y: 0,
    width: w,
    height: h,
    color: rgb(0.99, 0.96, 0.89),
  })
  // Outer border gold
  page.drawRectangle({
    x: 20,
    y: 20,
    width: w - 40,
    height: h - 40,
    borderColor: rgb(0.71, 0.54, 0),
    borderWidth: 4,
  })
  // Inner border gold (thin)
  page.drawRectangle({
    x: 30,
    y: 30,
    width: w - 60,
    height: h - 60,
    borderColor: rgb(0.71, 0.54, 0),
    borderWidth: 1,
  })

  const centerX = w / 2
  const slate = rgb(0.03, 0.21, 0.26)
  const slateLight = rgb(0.34, 0.43, 0.45)
  const blue = rgb(0.15, 0.55, 0.82)

  // Helper: drawText centered at (x, y)
  const drawCentered = (
    text: string,
    y: number,
    font: typeof helv,
    size: number,
    color = slateLight
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size)
    page.drawText(text, {
      x: centerX - textWidth / 2,
      y,
      size,
      font,
      color,
    })
  }

  // Header brand
  drawCentered('EDU CODING', h - 60, helvBold, 14, slateLight)
  // Title
  drawCentered('Certificado de Conclusão', h - 130, helvBold, 36, slate)
  // Body line 1
  drawCentered('Certificamos que', h - 200, helv, 14, slateLight)
  // Name
  drawCentered(data.userName, h - 245, helvBold, 28, slate)
  // Body line 2
  drawCentered('concluiu com sucesso a fase', h - 295, helv, 14, slateLight)
  // Phase title
  drawCentered(`"${data.phaseTitle}"`, h - 340, helvBold, 22, blue)
  // Course
  drawCentered(`do curso ${data.courseTitle}`, h - 380, helv, 12, slateLight)
  // Date
  const dateStr = `Emitido em ${data.completedAt.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })}`
  drawCentered(dateStr, h - 470, helv, 12, slateLight)

  // Signature line at bottom-left
  page.drawLine({
    start: { x: 120, y: 80 },
    end: { x: 280, y: 80 },
    color: slateLight,
    thickness: 1,
  })
  drawCentered('Coordenação Edu Coding', 60, helv, 10, slateLight)

  const bytes = await pdfDoc.save()
  // Touch fs import to avoid "unused" warnings; ensures SSR-only path works
  void fs
  return Buffer.from(bytes)
}
