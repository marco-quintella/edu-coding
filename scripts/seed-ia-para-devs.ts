import { db } from '../lib/db'
import { courses, phases, lessons, quizQuestions, userProgress } from '../lib/db/schema'

const COURSE = {
  slug: 'ia-para-devs',
  title: 'IA para Devs',
  description:
    'Machine Learning, NLP, LLMs, GenAI e Cloud na prática. 5 fases, certificado por fase, tudo em português.',
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
        {
          slug: 'kmeans-clustering',
          title: 'K-Means Clustering',
          checkpoint: 'ml-base',
          minutes: 20,
          quiz: [
            {
              question: 'O K-Means é um algoritmo de qual tipo?',
              options: [
                { id: 'a', text: 'Supervisionado' },
                { id: 'b', text: 'Não supervisionado (clustering)' },
                { id: 'c', text: 'Semi-supervisionado' },
                { id: 'd', text: 'Por reforço' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que o parâmetro K representa no K-Means?',
              options: [
                { id: 'a', text: 'O número de dimensões' },
                { id: 'b', text: 'O número de clusters' },
                { id: 'c', text: 'O número de iterações' },
                { id: 'd', text: 'O tamanho do dataset' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
      ],
    },
    {
      slug: '02-evolucao-ia',
      title: 'Fase 02 — Evolução da IA: GenAI, Cloud ML e LLMs',
      lessons: [
        {
          slug: 'nlp-tokenizacao',
          title: 'NLP — Tokenização e Texto',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'O que é tokenização em NLP?',
              options: [
                { id: 'a', text: 'Dividir texto em unidades menores (tokens)' },
                { id: 'b', text: 'Traduzir texto para outra língua' },
                { id: 'c', text: 'Gerar texto novo' },
                { id: 'd', text: 'Classificar sentimentos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que faz o stemming?',
              options: [
                { id: 'a', text: 'Remove stop words' },
                { id: 'b', text: 'Reduz palavras à sua raiz' },
                { id: 'c', text: 'Adiciona sufixos' },
                { id: 'd', text: 'Traduz palavras' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'tfidf-embeddings',
          title: 'TF-IDF e Word Embeddings',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que TF-IDF mede?',
              options: [
                { id: 'a', text: 'A importância de uma palavra em um documento' },
                { id: 'b', text: 'A frequência de visitas a um site' },
                { id: 'c', text: 'O tamanho de um texto' },
                { id: 'd', text: 'A velocidade de um algoritmo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'introducao-geneticos',
          title: 'Introdução aos Algoritmos Genéticos',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'Qual operador genético combina dois indivíduos?',
              options: [
                { id: 'a', text: 'Seleção' },
                { id: 'b', text: 'Cruzamento (crossover)' },
                { id: 'c', text: 'Mutação' },
                { id: 'd', text: 'Avaliação' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
      ],
    },
    {
      slug: '03-openai-rag',
      title: 'Fase 03 — OpenAI, Fine-tuning e LangChain',
      lessons: [
        {
          slug: 'chain-of-thought',
          title: 'Chain of Thought com LLMs',
          checkpoint: 'ml-base',
          minutes: 25,
          quiz: [
            {
              question: 'O que é Chain of Thought (CoT)?',
              options: [
                { id: 'a', text: 'Técnica que faz o modelo raciocinar passo a passo' },
                { id: 'b', text: 'Uma rede neural convolucional' },
                { id: 'c', text: 'Um tipo de árvore de decisão' },
                { id: 'd', text: 'Um algoritmo de clustering' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'guia-prompts',
          title: 'Guia de Prompts',
          checkpoint: 'ml-base',
          minutes: 20,
          quiz: [
            {
              question: 'O que é um "prompt" bem estruturado?',
              options: [
                { id: 'a', text: 'Instrução clara e específica para o modelo' },
                { id: 'b', text: 'Código Python otimizado' },
                { id: 'c', text: 'Um dataset balanceado' },
                { id: 'd', text: 'Uma consulta SQL' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'langchain-agents',
          title: 'LangChain na Prática',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que é um Agent no LangChain?',
              options: [
                { id: 'a', text: 'Um componente que decide qual ferramenta usar' },
                { id: 'b', text: 'Um tipo de banco de dados' },
                { id: 'c', text: 'Um modelo de visão' },
                { id: 'd', text: 'Uma função de ativação' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
      ],
    },
    {
      slug: '04-analise-dados',
      title: 'Fase 04 — Análise de Vídeo, Áudio e Texto',
      lessons: [
        {
          slug: 'analise-video-audio',
          title: 'Análise de Vídeo, Áudio e Texto',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Para o que serve a transcrição automática de áudio?',
              options: [
                { id: 'a', text: 'Converter fala em texto' },
                { id: 'b', text: 'Gerar imagens' },
                { id: 'c', text: 'Treinar redes neurais' },
                { id: 'd', text: 'Detectar objetos em vídeo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'aws-textract',
          title: 'AWS Textract — Extração de Texto',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'Para que serve o AWS Textract?',
              options: [
                { id: 'a', text: 'Extrair texto de documentos digitalizados' },
                { id: 'b', text: 'Treinar modelos de ML' },
                { id: 'c', text: 'Armazenar arquivos' },
                { id: 'd', text: 'Enviar emails' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
      ],
    },
    {
      slug: '05-privacidade-seguranca',
      title: 'Fase 05 — Privacidade, Segurança e Aplicações Práticas',
      lessons: [
        {
          slug: 'lgpd-privacidade',
          title: 'Privacidade e LGPD em IA',
          checkpoint: 'ml-base',
          minutes: 25,
          quiz: [
            {
              question: 'O que a LGPD protege?',
              options: [
                { id: 'a', text: 'Dados pessoais de cidadãos brasileiros' },
                { id: 'b', text: 'Apenas dados empresariais' },
                { id: 'c', text: 'Código fonte' },
                { id: 'd', text: 'Dados públicos governamentais' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'deteccao-anomalias',
          title: 'Detecção de Anomalias',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'Para que serve a detecção de anomalias?',
              options: [
                { id: 'a', text: 'Identificar pontos que fogem do padrão' },
                { id: 'b', text: 'Criar clusters' },
                { id: 'c', text: 'Reduzir dimensionalidade' },
                { id: 'd', text: 'Traduzir textos' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'azure-cognitive',
          title: 'Azure Cognitive Services',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'O que são os Azure Cognitive Services?',
              options: [
                { id: 'a', text: 'APIs prontas de visão, fala e linguagem' },
                { id: 'b', text: 'Máquinas virtuais' },
                { id: 'c', text: 'Bancos de dados' },
                { id: 'd', text: 'Servidores web' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
      ],
    },
  ],
}

async function seed() {
  console.log('Limpando tabelas...')
  // Ordem importa por causa das FKs
  await db.delete(userProgress)
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
