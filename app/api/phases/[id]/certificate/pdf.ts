import PDFDocument from 'pdfkit'

export interface CertificateData {
  userName: string
  phaseTitle: string
  courseTitle: string
  completedAt: Date
}

export async function generateCertificatePdf(
  data: CertificateData
): Promise<Buffer> {
  return new Promise<Buffer>((resolve) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 })
    const chunks: Buffer[] = []
    doc.on('data', (c) => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))

    const w = doc.page.width
    const h = doc.page.height
    const innerW = w - 100

    // Background
    doc.rect(0, 0, w, h).fill('#fdf6e3')

    // Border
    doc
      .lineWidth(4)
      .strokeColor('#b58900')
      .rect(20, 20, w - 40, h - 40)
      .stroke()
    doc
      .lineWidth(1)
      .strokeColor('#b58900')
      .rect(30, 30, w - 60, h - 60)
      .stroke()

    // Title
    doc
      .fillColor('#586e75')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('EDU CODING', 50, 70, { width: innerW, align: 'center', characterSpacing: 4 })

    doc
      .moveDown(2)
      .fontSize(36)
      .fillColor('#073642')
      .text('Certificado de Conclusão', { width: innerW, align: 'center' })

    // Body
    doc
      .moveDown(1.5)
      .fontSize(14)
      .fillColor('#586e75')
      .font('Helvetica')
      .text('Certificamos que', { width: innerW, align: 'center' })

    doc
      .moveDown(0.5)
      .fontSize(28)
      .fillColor('#073642')
      .font('Helvetica-Bold')
      .text(data.userName, { width: innerW, align: 'center' })

    doc
      .moveDown(0.5)
      .fontSize(14)
      .fillColor('#586e75')
      .font('Helvetica')
      .text('concluiu com sucesso a fase', { width: innerW, align: 'center' })

    doc
      .moveDown(0.5)
      .fontSize(22)
      .fillColor('#268bd2')
      .font('Helvetica-Bold')
      .text(`"${data.phaseTitle}"`, { width: innerW, align: 'center' })

    doc
      .moveDown(0.4)
      .fontSize(12)
      .fillColor('#586e75')
      .font('Helvetica')
      .text(`do curso ${data.courseTitle}`, { width: innerW, align: 'center' })

    // Date
    doc
      .moveDown(3)
      .fontSize(12)
      .fillColor('#586e75')
      .text(
        `Emitido em ${data.completedAt.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}`,
        { width: innerW, align: 'center' }
      )

    // Signature line
    const sigY = h - 100
    doc
      .moveTo(120, sigY)
      .lineTo(280, sigY)
      .strokeColor('#586e75')
      .lineWidth(1)
      .stroke()
    doc
      .fontSize(10)
      .fillColor('#586e75')
      .text('Coordenação Edu Coding', 120, sigY + 8, { width: 160, align: 'center' })

    doc.end()
  })
}
