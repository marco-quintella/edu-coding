"""Insere o REACT_COURSE no seed (runtime: react)."""
src = open('scripts/seed-ia-para-devs.ts').read()

react_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const REACT_COURSE = {
  slug: 'react',
  title: 'React do Zero',
  description:
    'Componentes, props e composição — o framework frontend #1 do mercado, rodando de verdade (SSR) no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de React',
      lessons: [
        {
          slug: 'react-componentes',
          title: 'Componentes e o primeiro render',
          checkpoint: 'ml-base',
          runtime: 'react',
          minutes: 40,
          quiz: [
            {
              question: 'O que é um componente React?',
              options: [
                { id: 'a', text: 'Uma função que retorna o que será renderizado' },
                { id: 'b', text: 'Um arquivo HTML' },
                { id: 'c', text: 'Uma classe CSS' },
                { id: 'd', text: 'Um servidor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que React.createElement("h1", null, "Olá") faz?',
              options: [
                { id: 'a', text: 'Cria um elemento h1 com o texto "Olá"' },
                { id: 'b', text: 'Renderiza direto no DOM' },
                { id: 'c', text: 'Cria um componente de classe' },
                { id: 'd', text: 'Importa o React' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que renderToString faz?',
              options: [
                { id: 'a', text: 'Converte o elemento React em HTML (server-side)' },
                { id: 'b', text: 'Monta no browser' },
                { id: 'c', text: 'Deleta o componente' },
                { id: 'd', text: 'Cria o servidor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que são as props de um componente?',
              options: [
                { id: 'a', text: 'Os dados de entrada — passados como atributos' },
                { id: 'b', text: 'As variáveis internas' },
                { id: 'c', text: 'Os arquivos de estilo' },
                { id: 'd', text: 'Os eventos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como o React renderiza no servidor?',
              options: [
                { id: 'a', text: 'SSR: renderToString gera o HTML final' },
                { id: 'b', text: 'Com um browser virtual' },
                { id: 'c', text: 'Não é possível' },
                { id: 'd', text: 'Com CSS' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'react-listas',
          title: 'Listas, keys e condicionais',
          checkpoint: 'ml-base',
          runtime: 'react',
          minutes: 40,
          quiz: [
            {
              question: 'Por que usar key em listas?',
              options: [
                { id: 'a', text: 'O React identifica cada item de forma única' },
                { id: 'b', text: 'É obrigatório para renderizar' },
                { id: 'c', text: 'Deixa a lista mais bonita' },
                { id: 'd', text: 'Ordena os itens' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como renderizar uma lista em React?',
              options: [
                { id: 'a', text: 'itens.map((item) => createElement("li", { key: item }, item))' },
                { id: 'b', text: 'for (item of itens) render(item)' },
                { id: 'c', text: 'itens.forEach(render)' },
                { id: 'd', text: 'render(itens)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que um if dentro do componente faz?',
              options: [
                { id: 'a', text: 'Escolhe o que renderizar com base na condição' },
                { id: 'b', text: 'Para o render' },
                { id: 'c', text: 'Cria um novo componente' },
                { id: 'd', text: 'Ignora as props' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o className faz no createElement?',
              options: [
                { id: 'a', text: 'Define a classe CSS (className, não class)' },
                { id: 'b', text: 'Define o id' },
                { id: 'c', text: 'Cria uma classe JS' },
                { id: 'd', text: 'Importa o CSS' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que React roda no servidor (SSR)?',
              options: [
                { id: 'a', text: 'Primeira renderização rápida e SEO — o HTML vem pronto' },
                { id: 'b', text: 'É a única forma' },
                { id: 'c', text: 'Para economizar memória' },
                { id: 'd', text: 'Não roda' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'react-composicao',
          title: 'Composição e children',
          checkpoint: 'ml-base',
          runtime: 'react',
          minutes: 40,
          quiz: [
            {
              question: 'O que é children num componente?',
              options: [
                { id: 'a', text: 'O conteúdo aninhado entre as tags do componente' },
                { id: 'b', text: 'Os filhos no banco' },
                { id: 'c', text: 'As props obrigatórias' },
                { id: 'd', text: 'O HTML gerado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é composição em React?',
              options: [
                { id: 'a', text: 'Montar componentes maiores a partir de menores' },
                { id: 'b', text: 'Juntar arquivos CSS' },
                { id: 'c', text: 'Combinar servidores' },
                { id: 'd', text: 'Mesclar props' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como passar dados para um componente filho?',
              options: [
                { id: 'a', text: 'Via props: createElement(Componente, { dados })' },
                { id: 'b', text: 'Com variáveis globais' },
                { id: 'c', text: 'Escrevendo no banco' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que um layout (Header + Main + Footer) exemplifica?',
              options: [
                { id: 'a', text: 'Composição: componentes aninhados formam a página' },
                { id: 'b', text: 'Herança de classes' },
                { id: 'c', text: 'Um servidor HTTP' },
                { id: 'd', text: 'Um banco de dados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que componentes pequenos são bons?',
              options: [
                { id: 'a', text: 'Reuso, testabilidade e clareza' },
                { id: 'b', text: 'Menos arquivos' },
                { id: 'c', text: 'Mais rápido sempre' },
                { id: 'd', text: 'Não importa' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
      ],
    },
  ],
}

'''
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, react_course + marker.replace("FASTAPI_COURSE]", "FASTAPI_COURSE, REACT_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("REACT_COURSE inserido")
