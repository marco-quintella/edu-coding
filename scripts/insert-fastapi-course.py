"""Insere o FASTAPI_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

fastapi_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const FASTAPI_COURSE = {
  slug: 'fastapi',
  title: 'APIs com FastAPI',
  description:
    'O framework Python #1 do mercado: rotas, path params, query e POST com Pydantic — testado com TestClient real no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de FastAPI',
      lessons: [
        {
          slug: 'fastapi-primeiros-passos',
          title: 'Primeira API com FastAPI',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que o decorador @app.get("/") faz?',
              options: [
                { id: 'a', text: 'Registra a função para responder GET na rota /' },
                { id: 'b', text: 'Cria o servidor' },
                { id: 'c', text: 'Instala o FastAPI' },
                { id: 'd', text: 'Define o banco' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que uma função de rota retorna?',
              options: [
                { id: 'a', text: 'Um dict — que o FastAPI converte em JSON automaticamente' },
                { id: 'b', text: 'Uma string HTML sempre' },
                { id: 'c', text: 'Nada' },
                { id: 'd', text: 'Um objeto de resposta manual' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o TestClient faz?',
              options: [
                { id: 'a', text: 'Testa a API sem subir servidor — requests in-process' },
                { id: 'b', text: 'Sobe o servidor de produção' },
                { id: 'c', text: 'Faz deploy' },
                { id: 'd', text: 'Compila o código' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que client.get("/") retorna?',
              options: [
                { id: 'a', text: 'Uma resposta com status_code e .json()' },
                { id: 'b', text: 'O dict direto' },
                { id: 'c', text: 'O HTML renderizado' },
                { id: 'd', text: 'Um erro' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que FastAPI domina o mercado Python?',
              options: [
                { id: 'a', text: 'Type hints, validação automática e docs automáticas' },
                { id: 'b', text: 'É o mais antigo' },
                { id: 'c', text: 'Não precisa de Python' },
                { id: 'd', text: 'É um banco de dados' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'fastapi-rotas',
          title: 'Rotas, parâmetros e 404',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que {usuario_id} em "/usuarios/{usuario_id}" faz?',
              options: [
                { id: 'a', text: 'Captura o valor da URL e passa como parâmetro tipado' },
                { id: 'b', text: 'É só decoração' },
                { id: 'c', text: 'Cria um banco' },
                { id: 'd', text: 'Define o método' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se o parâmetro é int e vem "abc"?',
              options: [
                { id: 'a', text: 'FastAPI valida e devolve 422 (não aceita)' },
                { id: 'b', text: 'Converte para 0' },
                { id: 'c', text: 'Quebra o servidor' },
                { id: 'd', text: 'Aceita como string' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual status para recurso não encontrado?',
              options: [
                { id: 'a', text: '404' },
                { id: 'b', text: '200' },
                { id: 'c', text: '500' },
                { id: 'd', text: '201' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é o status 422?',
              options: [
                { id: 'a', text: 'Validação falhou — a requisição não bate com o esperado' },
                { id: 'b', text: 'Não encontrado' },
                { id: 'c', text: 'OK' },
                { id: 'd', text: 'Erro interno' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como devolver erro 404 no FastAPI?',
              options: [
                { id: 'a', text: 'return {"erro": "..."} e o cliente vê; ou raise HTTPException' },
                { id: 'b', text: 'return 404' },
                { id: 'c', text: 'Não é possível' },
                { id: 'd', text: 'client.get("/404")' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'fastapi-post',
          title: 'POST, query e Pydantic',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Para que serve um modelo Pydantic (class X(BaseModel))?',
              options: [
                { id: 'a', text: 'Valida e tipa o corpo da requisição automaticamente' },
                { id: 'b', text: 'Cria a tabela no banco' },
                { id: 'c', text: 'Define a rota' },
                { id: 'd', text: 'É uma função de teste' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como ler o corpo de um POST no FastAPI?',
              options: [
                { id: 'a', text: 'Declarar um parâmetro do tipo do modelo Pydantic' },
                { id: 'b', text: 'req.body manual' },
                { id: 'c', text: 'request.json()' },
                { id: 'd', text: 'Não dá para ler' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que são query params ("/soma?a=10&b=5")?',
              options: [
                { id: 'a', text: 'Parâmetros extras na URL — declarados como args da função' },
                { id: 'b', text: 'O corpo do POST' },
                { id: 'c', text: 'Os headers' },
                { id: 'd', text: 'O método HTTP' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se faltar um campo obrigatório do modelo?',
              options: [
                { id: 'a', text: 'FastAPI devolve 422 com a lista de erros' },
                { id: 'b', text: 'Cria o campo vazio' },
                { id: 'c', text: 'Quebra o servidor' },
                { id: 'd', text: 'Ignora' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar type hints nos parâmetros?',
              options: [
                { id: 'a', text: 'FastAPI valida e documenta automaticamente' },
                { id: 'b', text: 'Só por estilo' },
                { id: 'c', text: 'Para o Python rodar mais rápido' },
                { id: 'd', text: 'Não tem função' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, fastapi_course + marker.replace("DOCKER_COURSE]", "DOCKER_COURSE, FASTAPI_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("FASTAPI_COURSE inserido")
