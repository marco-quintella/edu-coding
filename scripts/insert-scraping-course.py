"""Insere o SCRAPING_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

scraping_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const SCRAPING_COURSE = {
  slug: 'web-scraping',
  title: 'Web Scraping com Python',
  description:
    'Extraia dados de páginas e APIs — regex em HTML, urllib e pipelines de coleta, com APIs reais no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Scraping',
      lessons: [
        {
          slug: 'scraping-html',
          title: 'Extraindo dados do HTML',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que é web scraping?',
              options: [
                { id: 'a', text: 'Extrair dados de páginas web de forma automatizada' },
                { id: 'b', text: 'Criar páginas web' },
                { id: 'c', text: 'Deletar sites' },
                { id: 'd', text: 'Hospedar sites' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar regex para extrair do HTML?',
              options: [
                { id: 'a', text: 'Acha padrões repetidos (class="produto">...) em uma linha' },
                { id: 'b', text: 'É a única forma' },
                { id: 'c', text: 'Regex entende HTML' },
                { id: 'd', text: 'Não funciona' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que re.findall(r\'class="produto">([^<]+)<\', html) faz?',
              options: [
                { id: 'a', text: 'Acha TODOS os produtos e captura o texto entre as tags' },
                { id: 'b', text: 'Acha o primeiro produto' },
                { id: 'c', text: 'Remove os produtos' },
                { id: 'd', text: 'Conta as tags' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que [^<]+ significa na regex?',
              options: [
                { id: 'a', text: 'Um ou mais caracteres que NÃO são <' },
                { id: 'b', text: 'Uma tag HTML' },
                { id: 'c', text: 'Um atributo' },
                { id: 'd', text: 'O fim da string' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que sites mudam e quebram scrapers?',
              options: [
                { id: 'a', text: 'HTML é código — qualquer mudança de layout quebra o padrão' },
                { id: 'b', text: 'Nunca mudam' },
                { id: 'c', text: 'Só APIs quebram' },
                { id: 'd', text: 'Não quebram' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'scraping-api',
          title: 'Coletando de APIs',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Por que APIs são melhores que HTML para dados?',
              options: [
                { id: 'a', text: 'Dados estruturados (JSON) — sem regex, sem quebrar' },
                { id: 'b', text: 'São mais lentas' },
                { id: 'c', text: 'Não existem' },
                { id: 'd', text: 'Só devolvem HTML' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que urlopen(url) + json.loads() faz?',
              options: [
                { id: 'a', text: 'Busca a API e converte o JSON em objetos Python' },
                { id: 'b', text: 'Busca e converte em HTML' },
                { id: 'c', text: 'Só valida a URL' },
                { id: 'd', text: 'Envia dados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que fazer quando a API está lenta?',
              options: [
                { id: 'a', text: 'Usar timeout no urlopen para não travar' },
                { id: 'b', text: 'Esperar para sempre' },
                { id: 'c', text: 'Desligar o programa' },
                { id: 'd', text: 'Ignorar' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que uma list comprehension [u["name"] for u in usuarios] faz?',
              options: [
                { id: 'a', text: 'Extrai só os nomes de todos os usuários' },
                { id: 'b', text: 'Cria usuários' },
                { id: 'c', text: 'Deleta os nomes' },
                { id: 'd', text: 'Ordena os nomes' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como filtrar usuários por domínio de email?',
              options: [
                { id: 'a', text: '[u for u in usuarios if u["email"].endswith(".biz")]' },
                { id: 'b', text: 'usuarios.filter(".biz")' },
                { id: 'c', text: 'usuarios["email"]' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'scraping-pipeline',
          title: 'Pipelines de coleta',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que é um pipeline de coleta?',
              options: [
                { id: 'a', text: 'Coletar → transformar → analisar — o fluxo completo' },
                { id: 'b', text: 'Um comando do terminal' },
                { id: 'c', text: 'Um banco de dados' },
                { id: 'd', text: 'Uma página web' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como contar itens por categoria (ex: posts por usuário)?',
              options: [
                { id: 'a', text: 'Dict acumulador: por_usuario[p["userId"]] += 1' },
                { id: 'b', text: 'len(posts)' },
                { id: 'c', text: 'posts.count()' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que min(posts, key=lambda p: len(p["body"])) faz?',
              options: [
                { id: 'a', text: 'Acha o post com o menor body' },
                { id: 'b', text: 'Acha o menor post por id' },
                { id: 'c', text: 'Ordena os posts' },
                { id: 'd', text: 'Conta os posts' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como filtrar os concluídos de uma lista?',
              options: [
                { id: 'a', text: '[t for t in todos if t["completed"]]' },
                { id: 'b', text: 'todos.filter(True)' },
                { id: 'c', text: 'todos.completed()' },
                { id: 'd', text: 'len(todos)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que validar o scraping com dados reais?',
              options: [
                { id: 'a', text: 'O padrão só é confiável se rodou de verdade' },
                { id: 'b', text: 'É obrigatório' },
                { id: 'c', text: 'Não precisa' },
                { id: 'd', text: 'Para ficar bonito' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, scraping_course + marker.replace("LINUX_COURSE]", "LINUX_COURSE, SCRAPING_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("SCRAPING_COURSE inserido")
