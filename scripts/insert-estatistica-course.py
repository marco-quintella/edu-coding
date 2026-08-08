"""Insere o ESTATISTICA_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

estatistica_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const ESTATISTICA_COURSE = {
  slug: 'estatistica-python',
  title: 'Estatística com Python',
  description:
    'Média, mediana, moda, desvio padrão e percentis — a base de quem analisa dados, com o módulo statistics real.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Estatística Descritiva',
      lessons: [
        {
          slug: 'estat-central',
          title: 'Média e mediana',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que a média (mean) calcula?',
              options: [
                { id: 'a', text: 'A soma dividida pela quantidade — sensível a outliers' },
                { id: 'b', text: 'O valor do meio' },
                { id: 'c', text: 'O valor mais comum' },
                { id: 'd', text: 'O maior valor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a mediana (median) calcula?',
              options: [
                { id: 'a', text: 'O valor do meio quando ordenado — imune a outliers' },
                { id: 'b', text: 'A média dos valores' },
                { id: 'c', text: 'O valor mais frequente' },
                { id: 'd', text: 'O menor valor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que a mediana é melhor com outliers?',
              options: [
                { id: 'a', text: 'Um valor extremo não muda o valor do meio' },
                { id: 'b', text: 'É mais rápida' },
                { id: 'c', text: 'É mais precisa sempre' },
                { id: 'd', text: 'Não é melhor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que statistics.mean(notas) retorna?',
              options: [
                { id: 'a', text: 'A média aritmética da lista' },
                { id: 'b', text: 'A mediana' },
                { id: 'c', text: 'A moda' },
                { id: 'd', text: 'O desvio' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quando média e mediana divergem muito?',
              options: [
                { id: 'a', text: 'Quando existem outliers (valores extremos)' },
                { id: 'b', text: 'Nunca divergem' },
                { id: 'c', text: 'Quando a lista é par' },
                { id: 'd', text: 'Quando a lista é pequena' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'estat-dispersao',
          title: 'Desvio padrão e variância',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o desvio padrão (stdev) mede?',
              options: [
                { id: 'a', text: 'O quanto os dados se afastam da média (dispersão)' },
                { id: 'b', text: 'O valor do meio' },
                { id: 'c', text: 'A soma dos dados' },
                { id: 'd', text: 'A moda' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Desvio padrão baixo significa...',
              options: [
                { id: 'a', text: 'Dados consistentes, próximos da média' },
                { id: 'b', text: 'Dados muito espalhados' },
                { id: 'c', text: 'Muitos outliers' },
                { id: 'd', text: 'Lista vazia' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a variância (variance) é?',
              options: [
                { id: 'a', text: 'O desvio padrão ao quadrado' },
                { id: 'b', text: 'A raiz do desvio' },
                { id: 'c', text: 'A amplitude' },
                { id: 'd', text: 'A média' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a amplitude (max - min) mostra?',
              options: [
                { id: 'a', text: 'A faixa total dos dados — simples mas sensível a outlier' },
                { id: 'b', text: 'A dispersão média' },
                { id: 'c', text: 'O valor do meio' },
                { id: 'd', text: 'A frequência' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como comparar consistência de dois conjuntos?',
              options: [
                { id: 'a', text: 'Quem tem MENOR desvio padrão é mais consistente' },
                { id: 'b', text: 'Quem tem maior média' },
                { id: 'c', text: 'Quem tem maior mediana' },
                { id: 'd', text: 'Não dá para comparar' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'estat-avancado',
          title: 'Moda, percentis e relatório',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que a moda (mode) é?',
              options: [
                { id: 'a', text: 'O valor que mais aparece' },
                { id: 'b', text: 'O valor do meio' },
                { id: 'c', text: 'A média' },
                { id: 'd', text: 'O maior valor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o percentil 90 (p90) significa?',
              options: [
                { id: 'a', text: '90% dos dados estão abaixo dele' },
                { id: 'b', text: '90% dos dados estão acima' },
                { id: 'c', text: 'O valor médio' },
                { id: 'd', text: 'O valor mais comum' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que statistics.quantiles(notas, n=10) faz?',
              options: [
                { id: 'a', text: 'Divide em 10 partes — o 9º é o percentil 90' },
                { id: 'b', text: 'Ordena a lista' },
                { id: 'c', text: 'Soma os valores' },
                { id: 'd', text: 'Remove duplicados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como contar frequência de valores?',
              options: [
                { id: 'a', text: 'from collections import Counter; Counter(lista)' },
                { id: 'b', text: 'lista.count_all()' },
                { id: 'c', text: 'statistics.freq()' },
                { id: 'd', text: 'lista.unique()' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Um relatório descritivo completo inclui...',
              options: [
                { id: 'a', text: 'Média, mediana, moda e desvio padrão' },
                { id: 'b', text: 'Só a média' },
                { id: 'c', text: 'Só o máximo' },
                { id: 'd', text: 'Nada disso' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE, SECURITY_COURSE, ALGORITMOS_COURSE, SQLAVANCADO_COURSE, JWT_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, estatistica_course + marker.replace("JWT_COURSE]", "JWT_COURSE, ESTATISTICA_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("ESTATISTICA_COURSE inserido")
