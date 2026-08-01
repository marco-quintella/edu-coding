import { db } from '../lib/db'
import { courses, phases, lessons, quizQuestions } from '../lib/db/schema'

const COURSE = {
  slug: 'ia-para-devs',
  title: 'Pós Tech — IA para Devs',
  description: 'Pós-graduação FIAP/Alura — 360h, 10 meses, hands-on.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos Básicos',
      lessons: [
        {
          slug: 'regressao-linear',
          title: 'Regressão Linear',
          checkpoint: 'ml-base',
          minutes: 15,
          quiz: [
            {
              question: 'Qual a fórmula de uma regressão linear simples?',
              options: [
                { id: 'a', text: 'y = mx + b' },
                { id: 'b', text: 'y = x²' },
                { id: 'c', text: 'y = log(x)' },
                { id: 'd', text: 'y = sin(x)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'No sklearn, qual classe usamos para regressão linear?',
              options: [
                { id: 'a', text: 'LinearModel' },
                { id: 'b', text: 'LinearRegression' },
                { id: 'c', text: 'LinearFit' },
                { id: 'd', text: 'LinReg' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'arvores-decisao',
          title: 'Árvores de Decisão',
          checkpoint: 'ml-base',
          minutes: 20,
          quiz: [
            {
              question: 'Em uma árvore de decisão, o que cada nó interno representa?',
              options: [
                { id: 'a', text: 'Um valor de saída' },
                { id: 'b', text: 'Um teste sobre um atributo' },
                { id: 'c', text: 'Um modelo estatístico' },
                { id: 'd', text: 'Uma instância de dados' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'knn-svm',
          title: 'KNN e SVM',
          checkpoint: 'ml-base',
          minutes: 25,
          quiz: [
            {
              question: 'No KNN, como classificamos um novo ponto?',
              options: [
                { id: 'a', text: 'Pela média de todos os pontos' },
                { id: 'b', text: 'Pela classe majoritária dos K vizinhos mais próximos' },
                { id: 'c', text: 'Por uma reta de regressão' },
                { id: 'd', text: 'Pela distância máxima' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
      ],
    },
  ],
}

async function seed() {
  console.log('Limpando tabelas...')
  await db.delete(quizQuestions)
  await db.delete(lessons)
  await db.delete(phases)
  await db.delete(courses)

  console.log('Inserindo curso...')
  const [course] = await db
    .insert(courses)
    .values({
      slug: COURSE.slug,
      title: COURSE.title,
      description: COURSE.description,
    })
    .returning()

  for (const [pi, phase] of COURSE.phases.entries()) {
    console.log(`Inserindo fase ${pi + 1}: ${phase.title}`)
    const [p] = await db
      .insert(phases)
      .values({
        courseId: course.id,
        slug: phase.slug,
        title: phase.title,
        position: pi + 1,
      })
      .returning()

    for (const [li, lesson] of phase.lessons.entries()) {
      console.log(`  Inserindo lição ${li + 1}: ${lesson.title}`)
      const [l] = await db
        .insert(lessons)
        .values({
          phaseId: p.id,
          slug: lesson.slug,
          title: lesson.title,
          mdxPath: `content/lessons/${COURSE.slug}/${phase.slug}/${lesson.slug}.mdx`,
          checkpointId: lesson.checkpoint,
          estimatedMinutes: lesson.minutes,
          position: li + 1,
        })
        .returning()

      for (const [qi, q] of lesson.quiz.entries()) {
        await db.insert(quizQuestions).values({
          lessonId: l.id,
          question: q.question,
          options: q.options,
          correctOptionId: q.correctOptionId,
          position: qi + 1,
        })
      }
    }
  }

  console.log('Seed completo.')
  console.log(`Curso: ${course.slug} (${course.id})`)
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
