"""Insere o APIS_COURSE no seed (evita problemas de & no shell)."""
src = open('scripts/seed-ia-para-devs.ts').read()

apis_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const APIS_COURSE = {
  slug: 'apis-http',
  title: 'APIs & HTTP na Prática',
  description:
    'JSON, requisições e tratamento de erros HTTP — consuma APIs reais direto do sandbox. O fundamento de todo backend.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de APIs',
      lessons: [
        {
          slug: 'apis-json',
          title: 'JSON: a linguagem das APIs',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que é JSON?',
              options: [
                { id: 'a', text: 'Um formato de dados baseado em texto, universal entre sistemas' },
                { id: 'b', text: 'Um banco de dados' },
                { id: 'c', text: 'Uma linguagem de programação' },
                { id: 'd', text: 'Um protocolo de rede' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que json.loads(texto) faz?',
              options: [
                { id: 'a', text: 'Converte string JSON em objeto Python' },
                { id: 'b', text: 'Converte objeto em string JSON' },
                { id: 'c', text: 'Lê um arquivo' },
                { id: 'd', text: 'Envia para a rede' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que json.dumps(obj) faz?',
              options: [
                { id: 'a', text: 'Converte objeto Python em string JSON' },
                { id: 'b', text: 'Converte string em objeto' },
                { id: 'c', text: 'Valida o JSON' },
                { id: 'd', text: 'Formata o Python' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como Python representa o JSON {"ativo": true}?',
              options: [
                { id: 'a', text: '{"ativo": True} (True com T maiúsculo)' },
                { id: 'b', text: '{"ativo": true} (igual)' },
                { id: 'c', text: '{"ativo": 1}' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que uma "lista de dicionários" representa?',
              options: [
                { id: 'a', text: 'Uma lista de registros — a resposta típica de API' },
                { id: 'b', text: 'Um JSON inválido' },
                { id: 'c', text: 'Um dicionário aninhado' },
                { id: 'd', text: 'Um erro' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'apis-requests',
          title: 'Consumindo APIs com urllib',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que urlopen(url) faz?',
              options: [
                { id: 'a', text: 'Abre uma conexão HTTP e devolve a resposta' },
                { id: 'b', text: 'Abre um arquivo local' },
                { id: 'c', text: 'Cria um servidor' },
                { id: 'd', text: 'Valida a URL' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é uma API REST?',
              options: [
                { id: 'a', text: 'Um conjunto de URLs que devolvem dados (geralmente JSON)' },
                { id: 'b', text: 'Um tipo de banco' },
                { id: 'c', text: 'Uma linguagem' },
                { id: 'd', text: 'Um framework web' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o status 200 significa?',
              options: [
                { id: 'a', text: 'OK — requisição bem-sucedida' },
                { id: 'b', text: 'Erro do servidor' },
                { id: 'c', text: 'Não encontrado' },
                { id: 'd', text: 'Redirecionamento' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o status 404 significa?',
              options: [
                { id: 'a', text: 'Não encontrado — o recurso não existe' },
                { id: 'b', text: 'OK' },
                { id: 'c', text: 'Erro interno' },
                { id: 'd', text: 'Acesso negado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como ler o JSON da resposta?',
              options: [
                { id: 'a', text: 'json.loads(resp.read())' },
                { id: 'b', text: 'resp.json()' },
                { id: 'c', text: 'resp.read().parse()' },
                { id: 'd', text: 'json.dumps(resp)' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'apis-erros',
          title: 'Tratando erros HTTP',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que HTTPError captura?',
              options: [
                { id: 'a', text: 'Erros HTTP (404, 500...) com o código' },
                { id: 'b', text: 'Erros de sintaxe' },
                { id: 'c', text: 'Erros de banco' },
                { id: 'd', text: 'Erros de digitação' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o timeout no urlopen?',
              options: [
                { id: 'a', text: 'Limitar a espera — evita travar para sempre' },
                { id: 'b', text: 'Acelerar a requisição' },
                { id: 'c', text: 'Limitar o tamanho da resposta' },
                { id: 'd', text: 'Criptografar a conexão' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que um cliente resiliente faz com erro 500?',
              options: [
                { id: 'a', text: 'Trata e/ou tenta de novo — nunca quebra o programa' },
                { id: 'b', text: 'Desliga a máquina' },
                { id: 'c', text: 'Ignora silenciosamente' },
                { id: 'd', text: 'Apaga os dados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que URLError captura?',
              options: [
                { id: 'a', text: 'Falhas de rede (DNS, conexão recusada)' },
                { id: 'b', text: 'Erros de JSON' },
                { id: 'c', text: 'Erros de tipo' },
                { id: 'd', text: 'Erros de auth' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que tratar erros de API é essencial?',
              options: [
                { id: 'a', text: 'APIs externas falham — rede cai, servidor 500, rate limit' },
                { id: 'b', text: 'Porque o Python exige' },
                { id: 'c', text: 'Para o código ficar mais longo' },
                { id: 'd', text: 'Não é essencial' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, apis_course + marker.replace("TESTES_COURSE]", "TESTES_COURSE, APIS_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("APIS_COURSE inserido")
