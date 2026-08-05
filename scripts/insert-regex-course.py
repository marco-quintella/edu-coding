"""Insere o REGEX_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

regex_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const REGEX_COURSE = {
  slug: 'regex',
  title: 'Expressões Regulares',
  description:
    'Busca, extração e sanitização de texto com regex — a skill transversal mais subestimada do mercado.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Regex',
      lessons: [
        {
          slug: 'regex-basico',
          title: 'findall, fullmatch e padrões',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que re.findall(padrao, texto) retorna?',
              options: [
                { id: 'a', text: 'Uma lista com todas as ocorrências' },
                { id: 'b', text: 'A primeira ocorrência' },
                { id: 'c', text: 'True/False' },
                { id: 'd', text: 'O texto modificado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que \\d representa numa regex?',
              options: [
                { id: 'a', text: 'Qualquer dígito (0-9)' },
                { id: 'b', text: 'O caractere d' },
                { id: 'c', text: 'Um espaço' },
                { id: 'd', text: 'O fim da string' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que + significa numa regex?',
              options: [
                { id: 'a', text: 'Uma ou mais repetições do anterior' },
                { id: 'b', text: 'Zero ou uma' },
                { id: 'c', text: 'Exatamente uma' },
                { id: 'd', text: 'Nenhuma' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que re.fullmatch(padrao, texto) exige?',
              options: [
                { id: 'a', text: 'Que o texto INTEIRO case com o padrão' },
                { id: 'b', text: 'Que uma parte case' },
                { id: 'c', text: 'Que nada case' },
                { id: 'd', text: 'Que o texto seja vazio' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que [a-z] representa?',
              options: [
                { id: 'a', text: 'Qualquer letra minúscula de a a z' },
                { id: 'b', text: 'A string "a-z"' },
                { id: 'c', text: 'Um hífen' },
                { id: 'd', text: 'Um dígito' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'regex-grupos',
          title: 'Grupos e extração',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Para que servem os parênteses numa regex?',
              options: [
                { id: 'a', text: 'Criam grupos capturáveis (m.group(1))' },
                { id: 'b', text: 'São só decoração' },
                { id: 'c', text: 'Indicam o fim' },
                { id: 'd', text: 'Repetem o padrão' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que re.search(padrao, texto) retorna?',
              options: [
                { id: 'a', text: 'A primeira ocorrência (objeto Match ou None)' },
                { id: 'b', text: 'Todas as ocorrências' },
                { id: 'c', text: 'Uma lista' },
                { id: 'd', text: 'O texto limpo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que re.sub(padrao, novo, texto) faz?',
              options: [
                { id: 'a', text: 'Substitui as ocorrências por novo' },
                { id: 'b', text: 'Remove o texto' },
                { id: 'c', text: 'Procura o novo' },
                { id: 'd', text: 'Divide o texto' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o padrão [^a-z] significa?',
              options: [
                { id: 'a', text: 'Tudo que NÃO é letra minúscula' },
                { id: 'b', text: 'Letras de a a z' },
                { id: 'c', text: 'O acento circunflexo' },
                { id: 'd', text: 'O início da string' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve mascarar dados (re.sub com *)?',
              options: [
                { id: 'a', text: 'Ocultar dados sensíveis (CPF, telefone) em logs' },
                { id: 'b', text: 'Deixar o texto bonito' },
                { id: 'c', text: 'Acelerar o programa' },
                { id: 'd', text: 'Criptografar' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'regex-aplicacoes',
          title: 'Aplicações: split e sanitização',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que re.split(padrao, texto) faz?',
              options: [
                { id: 'a', text: 'Divide o texto nos pontos que casam' },
                { id: 'b', text: 'Junta o texto' },
                { id: 'c', text: 'Substitui o texto' },
                { id: 'd', text: 'Ordena o texto' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que significa sanitizar texto?',
              options: [
                { id: 'a', text: 'Remover caracteres indesejados (símbolos, tags)' },
                { id: 'b', text: 'Deixar tudo maiúsculo' },
                { id: 'c', text: 'Criptografar' },
                { id: 'd', text: 'Comprimir' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que \\s representa?',
              options: [
                { id: 'a', text: 'Qualquer espaço (espaço, tab, quebra)' },
                { id: 'b', text: 'A letra s' },
                { id: 'c', text: 'Um símbolo' },
                { id: 'd', text: 'Um dígito' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que {4} significa numa regex?',
              options: [
                { id: 'a', text: 'Exatamente 4 repetições do anterior' },
                { id: 'b', text: 'De 4 a 9 repetições' },
                { id: 'c', text: 'O número 4' },
                { id: 'd', text: '4 espaços' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como extrair domínios de emails com regex?',
              options: [
                { id: 'a', text: 're.findall(r"@([a-z0-9.]+)", texto)' },
                { id: 'b', text: 're.split("@")' },
                { id: 'c', text: 'texto.domain()' },
                { id: 'd', text: 're.replace("@")' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, regex_course + marker.replace("JS_COURSE]", "JS_COURSE, REGEX_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("REGEX_COURSE inserido")
