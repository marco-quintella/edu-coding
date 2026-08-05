"""Insere o BACKEND_COURSE no seed (runtime: node)."""
src = open('scripts/seed-ia-para-devs.ts').read()

backend_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const BACKEND_COURSE = {
  slug: 'backend-node',
  title: 'Backend com Node.js',
  description:
    'Servidores HTTP, rotas, JSON e APIs REST — crie backends de verdade com o http nativo do Node, direto no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Backend',
      lessons: [
        {
          slug: 'node-servidor',
          title: 'Seu primeiro servidor HTTP',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 40,
          quiz: [
            {
              question: 'O que http.createServer(callback) faz?',
              options: [
                { id: 'a', text: 'Cria um servidor HTTP — o callback responde cada requisição' },
                { id: 'b', text: 'Abre uma conexão com um servidor' },
                { id: 'c', text: 'Faz uma requisição HTTP' },
                { id: 'd', text: 'Instala o express' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que res.writeHead(200, headers) faz?',
              options: [
                { id: 'a', text: 'Define o status code e os headers da resposta' },
                { id: 'b', text: 'Envia o corpo da resposta' },
                { id: 'c', text: 'Fecha a conexão' },
                { id: 'd', text: 'Lê o corpo da requisição' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que res.end(dados) faz?',
              options: [
                { id: 'a', text: 'Envia o corpo e encerra a resposta' },
                { id: 'b', text: 'Inicia a resposta' },
                { id: 'c', text: 'Abre o servidor' },
                { id: 'd', text: 'Faz um log' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que server.listen(3001, callback) faz?',
              options: [
                { id: 'a', text: 'Faz o servidor escutar na porta 3001' },
                { id: 'b', text: 'Fecha o servidor' },
                { id: 'c', text: 'Faz uma requisição' },
                { id: 'd', text: 'Define o conteúdo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que req.url contém?',
              options: [
                { id: 'a', text: 'O caminho da requisição (ex: "/usuarios")' },
                { id: 'b', text: 'O corpo da requisição' },
                { id: 'c', text: 'O status da resposta' },
                { id: 'd', text: 'O método HTTP' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'node-api-rest',
          title: 'Construindo uma API REST',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 40,
          quiz: [
            {
              question: 'O que req.method contém?',
              options: [
                { id: 'a', text: 'O método HTTP (GET, POST...)' },
                { id: 'b', text: 'A URL completa' },
                { id: 'c', text: 'O corpo da requisição' },
                { id: 'd', text: 'O status code' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como extrair um id de "/usuarios/2"?',
              options: [
                { id: 'a', text: 'req.url.match(/^\\/usuarios\\/(\\d+)$/)' },
                { id: 'b', text: 'req.params.id' },
                { id: 'c', text: 'req.query.id' },
                { id: 'd', text: 'req.body.id' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que Number("2") faz?',
              options: [
                { id: 'a', text: 'Converte a string "2" no número 2' },
                { id: 'b', text: 'Retorna NaN' },
                { id: 'c', text: 'Converte em texto' },
                { id: 'd', text: 'Arredonda 2.5' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que JSON.stringify(lista) faz?',
              options: [
                { id: 'a', text: 'Converte a lista em string JSON para enviar' },
                { id: 'b', text: 'Converte JSON em objeto' },
                { id: 'c', text: 'Formata o console' },
                { id: 'd', text: 'Valida o JSON' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como achar um item num array?',
              options: [
                { id: 'a', text: 'usuarios.find((x) => x.id === id)' },
                { id: 'b', text: 'usuarios.get(id)' },
                { id: 'c', text: 'usuarios[id]' },
                { id: 'd', text: 'usuarios.where(id)' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'node-erros',
          title: 'Erros, corpo e query strings',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 40,
          quiz: [
            {
              question: 'O que o evento "data" do req faz?',
              options: [
                { id: 'a', text: 'Entrega pedaços do corpo da requisição' },
                { id: 'b', text: 'Envia a resposta' },
                { id: 'c', text: 'Fecha a conexão' },
                { id: 'd', text: 'Define o status' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que JSON.parse(corpo) faz?',
              options: [
                { id: 'a', text: 'Converte a string JSON do corpo em objeto' },
                { id: 'b', text: 'Converte objeto em string' },
                { id: 'c', text: 'Valida a URL' },
                { id: 'd', text: 'Cria o servidor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o status 500?',
              options: [
                { id: 'a', text: 'Erro interno do servidor' },
                { id: 'b', text: 'Não encontrado' },
                { id: 'c', text: 'OK' },
                { id: 'd', text: 'Redirecionamento' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é uma query string ("?a=10&b=5")?',
              options: [
                { id: 'a', text: 'Parâmetros extras na URL após o ?' },
                { id: 'b', text: 'O corpo do POST' },
                { id: 'c', text: 'Os headers' },
                { id: 'd', text: 'O método HTTP' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que padronizar o JSON de erro?',
              options: [
                { id: 'a', text: 'O cliente (frontend) consegue tratar erros de forma uniforme' },
                { id: 'b', text: 'É obrigatório' },
                { id: 'c', text: 'Deixa o servidor mais rápido' },
                { id: 'd', text: 'Evita o JSON' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, backend_course + marker.replace("TS_COURSE]", "TS_COURSE, BACKEND_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("BACKEND_COURSE inserido")
