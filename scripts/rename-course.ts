import { db } from '../lib/db'
import { courses } from '../lib/db/schema'
import { eq } from 'drizzle-orm'

// Renomeação pontual do curso (não destrutivo — não toca lições/progresso)
async function main() {
  const result = await db
    .update(courses)
    .set({
      title: 'IA para Devs',
      description:
        'Machine Learning, NLP, LLMs, GenAI e Cloud na prática. 5 fases, certificado por fase, tudo em português.',
    })
    .where(eq(courses.slug, 'ia-para-devs'))
    .returning({ title: courses.title })
  console.log('Curso renomeado:', JSON.stringify(result))
  process.exit(0)
}

main().catch((e) => {
  console.error('Falha ao renomear:', e)
  process.exit(1)
})
