"""Insere o ALGORITMOS_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

algoritmos_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const ALGORITMOS_COURSE = {
  slug: 'algoritmos-entrevista',
  title: 'Algoritmos de Entrevista',
  description:
    'Two Pointers, Sliding Window e Recursão — os padrões que caem em entrevistas de FAANG e startups.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Padrões de Entrevista',
      lessons: [
        {
          slug: 'alg-two-pointers',
          title: 'Two Pointers',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Qual a ideia do Two Pointers?',
              options: [
                { id: 'a', text: 'Dois índices (início e fim) andam em direção um ao outro' },
                { id: 'b', text: 'Dois arrays comparados' },
                { id: 'c', text: 'Dois loops aninhados' },
                { id: 'd', text: 'Duas funções recursivas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a complexidade do Two Pointers?',
              options: [
                { id: 'a', text: 'O(n) — cada elemento é visitado uma vez' },
                { id: 'b', text: 'O(n²) — loops aninhados' },
                { id: 'c', text: 'O(log n)' },
                { id: 'd', text: 'O(1)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve a inversão in-place?',
              options: [
                { id: 'a', text: 'Inverter sem criar array novo — economia de memória' },
                { id: 'b', text: 'Deixar mais rápido' },
                { id: 'c', text: 'Ordenar a string' },
                { id: 'd', text: 'Não serve' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que achar par com soma alvo usa lista ORDENADA?',
              options: [
                { id: 'a', text: 'Se a soma é pequena, anda o esq; se grande, anda o dir' },
                { id: 'b', text: 'Não precisa ordenar' },
                { id: 'c', text: 'Para usar binary search' },
                { id: 'd', text: 'Qualquer lista serve' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o swap chars[esq], chars[dir] = chars[dir], chars[esq] faz?',
              options: [
                { id: 'a', text: 'Troca os dois valores de uma vez' },
                { id: 'b', text: 'Copia o array' },
                { id: 'c', text: 'Inverte a lista' },
                { id: 'd', text: 'Erro de sintaxe' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'alg-sliding-window',
          title: 'Sliding Window',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Qual a ideia da Sliding Window?',
              options: [
                { id: 'a', text: 'Uma janela que desliza — remove da esquerda, adiciona à direita' },
                { id: 'b', text: 'Uma janela fixa que não muda' },
                { id: 'c', text: 'Dois ponteiros opostos' },
                { id: 'd', text: 'Recursão na janela' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a vantagem sobre recomputar a soma toda vez?',
              options: [
                { id: 'a', text: 'O(n) — cada elemento entra/sai da janela uma vez' },
                { id: 'b', text: 'O(n²) ainda' },
                { id: 'c', text: 'O(log n)' },
                { id: 'd', text: 'Não muda' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como atualizar a soma ao deslizar?',
              options: [
                { id: 'a', text: 'soma += nums[i] - nums[i-k] (adiciona novo, remove antigo)' },
                { id: 'b', text: 'soma = sum(nums[i-k:i])' },
                { id: 'c', text: 'soma *= 2' },
                { id: 'd', text: 'soma = 0' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quando o while soma > k encolhe a janela?',
              options: [
                { id: 'a', text: 'Quando a soma estoura o limite — remove da esquerda' },
                { id: 'b', text: 'Quando a soma é pequena' },
                { id: 'c', text: 'Sempre' },
                { id: 'd', text: 'Nunca' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que dir - esq + 1 representa?',
              options: [
                { id: 'a', text: 'O tamanho atual da janela' },
                { id: 'b', text: 'A soma da janela' },
                { id: 'c', text: 'O índice do meio' },
                { id: 'd', text: 'O alvo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'alg-recursao',
          title: 'Recursão',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que uma função recursiva precisa ter?',
              options: [
                { id: 'a', text: 'Caso base (para) + chamada a si mesma (menor)' },
                { id: 'b', text: 'Apenas chamadas a si mesma' },
                { id: 'c', text: 'Um loop for' },
                { id: 'd', text: 'Duas funções' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece sem caso base?',
              options: [
                { id: 'a', text: 'Recursão infinita → estouro de pilha (RecursionError)' },
                { id: 'b', text: 'Roda para sempre certo' },
                { id: 'c', text: 'Retorna 0' },
                { id: 'd', text: 'Compila com erro' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que fib(5) calcula?',
              options: [
                { id: 'a', text: 'O 5º número de Fibonacci (0,1,1,2,3,5 → 5)' },
                { id: 'b', text: '5! (fatorial)' },
                { id: 'c', text: 'A soma 1+2+3+4+5' },
                { id: 'd', text: 'O dobro de 5' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a desvantagem da recursão ingênua de Fibonacci?',
              options: [
                { id: 'a', text: 'Recomputa os mesmos valores — O(2^n) exponencial' },
                { id: 'b', text: 'Não funciona' },
                { id: 'c', text: 'É sempre melhor que loop' },
                { id: 'd', text: 'Usa muita memória de array' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que fatorial(5) retorna?',
              options: [
                { id: 'a', text: '120 (5*4*3*2*1)' },
                { id: 'b', text: '15' },
                { id: 'c', text: '25' },
                { id: 'd', text: '5' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE, SECURITY_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, algoritmos_course + marker.replace("SECURITY_COURSE]", "SECURITY_COURSE, ALGORITMOS_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("ALGORITMOS_COURSE inserido")
