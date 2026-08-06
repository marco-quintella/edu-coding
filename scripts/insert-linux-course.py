"""Insere o LINUX_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

linux_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const LINUX_COURSE = {
  slug: 'linux-shell',
  title: 'Linux & Terminal',
  description:
    'Arquivos, grep, pipes e permissões — o terminal que todo dev usa, com comandos reais no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Linux',
      lessons: [
        {
          slug: 'linux-arquivos',
          title: 'Navegando e criando arquivos',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o comando pwd mostra?',
              options: [
                { id: 'a', text: 'O diretório atual (print working directory)' },
                { id: 'b', text: 'A senha do usuário' },
                { id: 'c', text: 'A lista de arquivos' },
                { id: 'd', text: 'O conteúdo do arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando ls faz?',
              options: [
                { id: 'a', text: 'Lista os arquivos do diretório' },
                { id: 'b', text: 'Cria um diretório' },
                { id: 'c', text: 'Apaga arquivos' },
                { id: 'd', text: 'Move arquivos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que mkdir -p faz?',
              options: [
                { id: 'a', text: 'Cria diretório(s) — -p cria os intermediários sem erro' },
                { id: 'b', text: 'Lista diretórios' },
                { id: 'c', text: 'Remove diretórios' },
                { id: 'd', text: 'Renomeia diretórios' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando find procura?',
              options: [
                { id: 'a', text: 'Arquivos/pastas por nome, tipo e padrão' },
                { id: 'b', text: 'Erros em arquivos' },
                { id: 'c', text: 'Processos rodando' },
                { id: 'd', text: 'Usuários do sistema' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a diferença entre / e ~ no terminal?',
              options: [
                { id: 'a', text: '/ é a raiz do sistema; ~ é a home do usuário' },
                { id: 'b', text: 'São iguais' },
                { id: 'c', text: '~ é a raiz; / é a home' },
                { id: 'd', text: '/ é um arquivo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'linux-grep',
          title: 'grep, wc e filtros',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o comando grep faz?',
              options: [
                { id: 'a', text: 'Filtra linhas que contêm um padrão' },
                { id: 'b', text: 'Conta linhas' },
                { id: 'c', text: 'Ordena linhas' },
                { id: 'd', text: 'Substitui texto' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando wc -l faz?',
              options: [
                { id: 'a', text: 'Conta as linhas (word count)' },
                { id: 'b', text: 'Conta as palavras' },
                { id: 'c', text: 'Conta os bytes' },
                { id: 'd', text: 'Lista os arquivos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o grep em logs?',
              options: [
                { id: 'a', text: 'Achar erros específicos entre milhares de linhas' },
                { id: 'b', text: 'Apagar logs antigos' },
                { id: 'c', text: 'Criar logs' },
                { id: 'd', text: 'Compactar logs' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando find -name "*.py" faz?',
              options: [
                { id: 'a', text: 'Acha arquivos .py por nome (glob)' },
                { id: 'b', text: 'Filtra conteúdo de arquivos' },
                { id: 'c', text: 'Conta arquivos .py' },
                { id: 'd', text: 'Ordena arquivos .py' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como contar quantos erros há num log?',
              options: [
                { id: 'a', text: 'grep erro log.txt | wc -l' },
                { id: 'b', text: 'wc erro log.txt' },
                { id: 'c', text: 'grep -c não existe' },
                { id: 'd', text: 'ls erro log.txt' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'linux-pipes',
          title: 'Pipes, sort e permissões',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o pipe (|) faz?',
              options: [
                { id: 'a', text: 'Envia a saída de um comando como entrada do próximo' },
                { id: 'b', text: 'Executa comandos em paralelo' },
                { id: 'c', text: 'Compara dois arquivos' },
                { id: 'd', text: 'Cria um arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando sort faz?',
              options: [
                { id: 'a', text: 'Ordena as linhas' },
                { id: 'b', text: 'Remove duplicados' },
                { id: 'c', text: 'Conta as linhas' },
                { id: 'd', text: 'Filtra linhas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando uniq -c faz?',
              options: [
                { id: 'a', text: 'Conta ocorrências consecutivas iguais' },
                { id: 'b', text: 'Remove todas as linhas iguais' },
                { id: 'c', text: 'Ordena e remove' },
                { id: 'd', text: 'Conta linhas totais' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que chmod +x arquivo faz?',
              options: [
                { id: 'a', text: 'Torna o arquivo executável' },
                { id: 'b', text: 'Torna o arquivo legível' },
                { id: 'c', text: 'Deleta o arquivo' },
                { id: 'd', text: 'Move o arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que as permissões -rwxr-xr-x significam?',
              options: [
                { id: 'a', text: 'Dono lê/escreve/executa; grupo e outros só leem/executam' },
                { id: 'b', text: 'Todos podem tudo' },
                { id: 'c', text: 'Só o dono pode ler' },
                { id: 'd', text: 'O arquivo é oculto' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, linux_course + marker.replace("REACT_COURSE]", "REACT_COURSE, LINUX_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("LINUX_COURSE inserido")
