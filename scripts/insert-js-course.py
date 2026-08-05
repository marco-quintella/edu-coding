"""Insere o JS_COURSE no seed (runtime: node)."""
src = open('scripts/seed-ia-para-devs.ts').read()

js_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const JS_COURSE = {
  slug: 'javascript-devs',
  title: 'JavaScript para Devs',
  description:
    'Variáveis, arrays, objetos, funções e async — a linguagem da web, rodando em Node real no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de JavaScript',
      lessons: [
        {
          slug: 'js-basicos',
          title: 'Variáveis, tipos e template literals',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 35,
          quiz: [
            {
              question: 'Qual a diferença entre const e let?',
              options: [
                { id: 'a', text: 'const não pode ser reatribuída; let pode' },
                { id: 'b', text: 'let não pode ser reatribuída; const pode' },
                { id: 'c', text: 'São idênticas' },
                { id: 'd', text: 'const é para números' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que typeof idade retorna para idade = 25?',
              options: [
                { id: 'a', text: '"number"' },
                { id: 'b', text: '"int"' },
                { id: 'c', text: '"float"' },
                { id: 'd', text: '"integer"' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que template literals usam?',
              options: [
                { id: 'a', text: 'Crase ` e ${expressão}' },
                { id: 'b', text: 'Aspas duplas e +' },
                { id: 'c', text: 'Parênteses e %' },
                { id: 'd', text: 'Colchetes e #' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como imprimir no console?',
              options: [
                { id: 'a', text: 'console.log(valor)' },
                { id: 'b', text: 'print(valor)' },
                { id: 'c', text: 'echo valor' },
                { id: 'd', text: 'System.out.println' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que typeof "Ana" retorna?',
              options: [
                { id: 'a', text: '"string"' },
                { id: 'b', text: '"text"' },
                { id: 'c', text: '"char"' },
                { id: 'd', text: '"word"' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'js-arrays-objetos',
          title: 'Arrays e Objetos',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 35,
          quiz: [
            {
              question: 'Como adicionar um item no fim de um array?',
              options: [
                { id: 'a', text: 'array.push(item)' },
                { id: 'b', text: 'array.add(item)' },
                { id: 'c', text: 'array.append(item)' },
                { id: 'd', text: 'array.insert(item)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que array.includes(x) retorna?',
              options: [
                { id: 'a', text: 'true se x está no array' },
                { id: 'b', text: 'O índice de x' },
                { id: 'c', text: 'O tamanho do array' },
                { id: 'd', text: 'x duplicado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como acessar a propriedade nome de um objeto?',
              options: [
                { id: 'a', text: 'usuario.nome ou usuario["nome"]' },
                { id: 'b', text: 'usuario->nome' },
                { id: 'c', text: 'usuario.nome()' },
                { id: 'd', text: 'get(usuario, nome)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que Object.keys(obj) retorna?',
              options: [
                { id: 'a', text: 'Um array com as chaves do objeto' },
                { id: 'b', text: 'Os valores do objeto' },
                { id: 'c', text: 'O objeto ordenado' },
                { id: 'd', text: 'O tamanho do objeto' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como adicionar uma propriedade nova a um objeto?',
              options: [
                { id: 'a', text: 'obj.chave = valor' },
                { id: 'b', text: 'obj.add("chave")' },
                { id: 'c', text: 'obj.push(chave)' },
                { id: 'd', text: 'set(obj, chave)' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'js-funcoes-async',
          title: 'Funções, map/filter e async',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 40,
          quiz: [
            {
              question: 'O que array.map(fn) faz?',
              options: [
                { id: 'a', text: 'Cria um novo array aplicando fn a cada item' },
                { id: 'b', text: 'Modifica o array original no lugar' },
                { id: 'c', text: 'Remove itens do array' },
                { id: 'd', text: 'Ordena o array' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que array.filter(fn) faz?',
              options: [
                { id: 'a', text: 'Cria um novo array só com os itens que passam em fn' },
                { id: 'b', text: 'Deleta os itens que passam' },
                { id: 'c', text: 'Junta os itens' },
                { id: 'd', text: 'Multiplica os itens' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que array.reduce(fn, inicial) faz?',
              options: [
                { id: 'a', text: 'Acumula os itens num único valor' },
                { id: 'b', text: 'Reduz o tamanho do array' },
                { id: 'c', text: 'Remove duplicados' },
                { id: 'd', text: 'Cria vários arrays' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve await numa chamada fetch?',
              options: [
                { id: 'a', text: 'Esperar a resposta da API antes de continuar' },
                { id: 'b', text: 'Cancelar a requisição' },
                { id: 'c', text: 'Repetir a requisição' },
                { id: 'd', text: 'Acelerar a requisição' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que throw new Error("msg") faz?',
              options: [
                { id: 'a', text: 'Lança uma exceção — capturável com try/catch' },
                { id: 'b', text: 'Imprime um aviso' },
                { id: 'c', text: 'Retorna undefined' },
                { id: 'd', text: 'Para o servidor' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, js_course + marker.replace("AUTOMACAO_COURSE]", "AUTOMACAO_COURSE, JS_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("JS_COURSE inserido")
