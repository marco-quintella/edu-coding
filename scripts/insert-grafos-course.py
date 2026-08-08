"""Insere o GRAFOS_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

grafos_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const GRAFOS_COURSE = {
  slug: 'grafos',
  title: 'Grafos: BFS & DFS',
  description:
    'Busca em largura, profundidade, Dijkstra e ordenação topológica — o assunto que mais cai em entrevistas.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Grafos',
      lessons: [
        {
          slug: 'grafos-bfs',
          title: 'BFS: busca em largura',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Como o BFS percorre o grafo?',
              options: [
                { id: 'a', text: 'Por níveis — visita todos os vizinhos antes de descer' },
                { id: 'b', text: 'Vai fundo até o fim' },
                { id: 'c', text: 'Aleatoriamente' },
                { id: 'd', text: 'Ordenado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual estrutura o BFS usa?',
              options: [
                { id: 'a', text: 'Fila (deque — FIFO)' },
                { id: 'b', text: 'Pilha (LIFO)' },
                { id: 'c', text: 'Heap' },
                { id: 'd', text: 'Árvore' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o conjunto visitados?',
              options: [
                { id: 'a', text: 'Evitar visitar o mesmo nó duas vezes (loops)' },
                { id: 'b', text: 'Ordenar os nós' },
                { id: 'c', text: 'Contar as arestas' },
                { id: 'd', text: 'Nada' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o BFS encontra?',
              options: [
                { id: 'a', text: 'O caminho mais curto em número de arestas' },
                { id: 'b', text: 'O caminho mais barato' },
                { id: 'c', text: 'O maior caminho' },
                { id: 'd', text: 'Nada' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'BFS: fila.popleft() tira de onde?',
              options: [
                { id: 'a', text: 'Do início (FIFO — primeiro que entrou, primeiro que sai)' },
                { id: 'b', text: 'Do fim' },
                { id: 'c', text: 'Do meio' },
                { id: 'd', text: 'Aleatório' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'grafos-dfs',
          title: 'DFS: busca em profundidade',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Como o DFS percorre o grafo?',
              options: [
                { id: 'a', text: 'Vai fundo em um caminho antes de voltar' },
                { id: 'b', text: 'Por níveis' },
                { id: 'c', text: 'Em largura' },
                { id: 'd', text: 'Ordenado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual estrutura o DFS usa?',
              options: [
                { id: 'a', text: 'Pilha (ou recursão — que usa pilha)' },
                { id: 'b', text: 'Fila' },
                { id: 'c', text: 'Heap' },
                { id: 'd', text: 'Lista' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'DFS recursivo: quando para?',
              options: [
                { id: 'a', text: 'Quando todos os vizinhos já foram visitados' },
                { id: 'b', text: 'Nunca' },
                { id: 'c', text: 'No meio' },
                { id: 'd', text: 'Quando a fila esvazia' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'DFS serve para...',
              options: [
                { id: 'a', text: 'Detectar caminhos e componentes conexos' },
                { id: 'b', text: 'Caminho mais curto' },
                { id: 'c', text: 'Ordenar por peso' },
                { id: 'd', text: 'Calcular médias' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é um componente conexo?',
              options: [
                { id: 'a', text: 'Um grupo de nós todos alcançáveis entre si' },
                { id: 'b', text: 'Um nó isolado' },
                { id: 'c', text: 'Uma aresta' },
                { id: 'd', text: 'Um ciclo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'grafos-avancado',
          title: 'Dijkstra e topológica',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que o Dijkstra calcula?',
              options: [
                { id: 'a', text: 'O caminho mais BARATO (menor soma de pesos)' },
                { id: 'b', text: 'O caminho com menos arestas' },
                { id: 'c', text: 'O maior caminho' },
                { id: 'd', text: 'A ordem de visita' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual estrutura o Dijkstra usa?',
              options: [
                { id: 'a', text: 'Heap de prioridade (heapq)' },
                { id: 'b', text: 'Fila simples' },
                { id: 'c', text: 'Pilha' },
                { id: 'd', text: 'Conjunto' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a ordenação topológica faz?',
              options: [
                { id: 'a', text: 'Ordena tarefas: dependências sempre antes' },
                { id: 'b', text: 'Ordena por peso' },
                { id: 'c', text: 'Encontra ciclos' },
                { id: 'd', text: 'Conta nós' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Algoritmo de Kahn começa com...',
              options: [
                { id: 'a', text: 'Nós com grau de entrada 0 (sem dependências)' },
                { id: 'b', text: 'Nós com maior grau' },
                { id: 'c', text: 'O nó raiz' },
                { id: 'd', text: 'Qualquer nó' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Dijkstra: para que o heapq?',
              options: [
                { id: 'a', text: 'Sempre expandir o nó com menor distância conhecida' },
                { id: 'b', text: 'Ordenar os pesos' },
                { id: 'c', text: 'Guardar visitados' },
                { id: 'd', text: 'Nada' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE, SECURITY_COURSE, ALGORITMOS_COURSE, SQLAVANCADO_COURSE, JWT_COURSE, ESTATISTICA_COURSE, GITAVANCADO_COURSE, ML_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, grafos_course + marker.replace("ML_COURSE]", "ML_COURSE, GRAFOS_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("GRAFOS_COURSE inserido")
