"""Insere o ARVORES_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

arvores_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const ARVORES_COURSE = {
  slug: 'arvores-binarias',
  title: 'Árvores Binárias',
  description:
    'BST, percursos (in, pre, pós-ordem), altura e espelhamento — a estrutura de dados que mais cai em entrevistas.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Árvores',
      lessons: [
        {
          slug: 'arvores-bst',
          title: 'BST: busca binária',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que é um BST?',
              options: [
                { id: 'a', text: 'Árvore onde esquerda < raiz < direita' },
                { id: 'b', text: 'Árvore sem regras' },
                { id: 'c', text: 'Lista ligada' },
                { id: 'd', text: 'Grafo com ciclos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a complexidade da busca no BST balanceado?',
              options: [
                { id: 'a', text: 'O(log n) — descarta metade a cada passo' },
                { id: 'b', text: 'O(n)' },
                { id: 'c', text: 'O(n²)' },
                { id: 'd', text: 'O(1)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Onde fica o MENOR valor do BST?',
              options: [
                { id: 'a', text: 'Sempre à esquerda, até o fim' },
                { id: 'b', text: 'Sempre à direita' },
                { id: 'c', text: 'Na raiz' },
                { id: 'd', text: 'Em qualquer lugar' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Onde fica o MAIOR valor?',
              options: [
                { id: 'a', text: 'Sempre à direita, até o fim' },
                { id: 'b', text: 'À esquerda' },
                { id: 'c', text: 'Na raiz' },
                { id: 'd', text: 'Aleatório' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se inserir em ordem crescente?',
              options: [
                { id: 'a', text: 'Vira uma lista ligada (desbalanceado) — busca vira O(n)' },
                { id: 'b', text: 'Fica balanceado' },
                { id: 'c', text: 'Quebra' },
                { id: 'd', text: 'Nada' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'arvores-percursos',
          title: 'Percursos: in, pre, pós',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que o percurso em-ordem (in-order) faz?',
              options: [
                { id: 'a', text: 'esq → raiz → dir — no BST sai ORDENADO' },
                { id: 'b', text: 'raiz → esq → dir' },
                { id: 'c', text: 'esq → dir → raiz' },
                { id: 'd', text: 'dir → raiz → esq' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o pré-ordem (pre-order) faz?',
              options: [
                { id: 'a', text: 'raiz → esq → dir' },
                { id: 'b', text: 'esq → raiz → dir' },
                { id: 'c', text: 'esq → dir → raiz' },
                { id: 'd', text: 'dir → esq → raiz' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o pós-ordem (post-order) faz?',
              options: [
                { id: 'a', text: 'esq → dir → raiz' },
                { id: 'b', text: 'raiz → esq → dir' },
                { id: 'c', text: 'esq → raiz → dir' },
                { id: 'd', text: 'raiz → dir → esq' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'In-order de [50, 30, 70, 20, 40] resulta em...',
              options: [
                { id: 'a', text: '[20, 30, 40, 50, 70] — ordenado!' },
                { id: 'b', text: '[50, 30, 20, 40, 70]' },
                { id: 'c', text: '[20, 40, 30, 70, 50]' },
                { id: 'd', text: '[70, 50, 40, 30, 20]' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Pre-order de [50, 30, 70, 20, 40] resulta em...',
              options: [
                { id: 'a', text: '[50, 30, 20, 40, 70]' },
                { id: 'b', text: '[20, 30, 40, 50, 70]' },
                { id: 'c', text: '[20, 40, 30, 70, 50]' },
                { id: 'd', text: '[70, 50, 30, 20, 40]' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'arvores-operacoes',
          title: 'Altura, contagem e espelho',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que é a altura de uma árvore?',
              options: [
                { id: 'a', text: 'O maior caminho da raiz até uma folha' },
                { id: 'b', text: 'O número de nós' },
                { id: 'c', text: 'O menor valor' },
                { id: 'd', text: 'A soma dos valores' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como calcular a altura recursivamente?',
              options: [
                { id: 'a', text: '1 + max(altura(esq), altura(dir))' },
                { id: 'b', text: '1 + altura(esq) + altura(dir)' },
                { id: 'c', text: 'max(altura(esq), altura(dir))' },
                { id: 'd', text: 'len(raiz)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como contar os nós?',
              options: [
                { id: 'a', text: '1 + contar(esq) + contar(dir)' },
                { id: 'b', text: '1 + max(esq, dir)' },
                { id: 'c', text: 'altura × 2' },
                { id: 'd', text: 'Não dá' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é espelhar a árvore?',
              options: [
                { id: 'a', text: 'Trocar esq e dir de cada nó' },
                { id: 'b', text: 'Duplicar os nós' },
                { id: 'c', text: 'Ordenar' },
                { id: 'd', text: 'Remover folhas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Validar BST: qual a regra para cada nó?',
              options: [
                { id: 'a', text: 'min < valor < max (intervalo herdado dos ancestrais)' },
                { id: 'b', text: 'valor > esq apenas' },
                { id: 'c', text: 'valor < dir apenas' },
                { id: 'd', text: 'qualquer valor' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE, SECURITY_COURSE, ALGORITMOS_COURSE, SQLAVANCADO_COURSE, JWT_COURSE, ESTATISTICA_COURSE, GITAVANCADO_COURSE, ML_COURSE, GRAFOS_COURSE, PATTERNS_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, arvores_course + marker.replace("PATTERNS_COURSE]", "PATTERNS_COURSE, ARVORES_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("ARVORES_COURSE inserido")
