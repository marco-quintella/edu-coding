"""Insere o DOCKER_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

docker_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const DOCKER_COURSE = {
  slug: 'docker',
  title: 'Docker na Prática',
  description:
    'Imagens, containers e Dockerfiles — rode Docker DE VERDADE no sandbox e entenda o que todo deploy usa.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Docker',
      lessons: [
        {
          slug: 'docker-imagens',
          title: 'Imagens e containers',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Qual a diferença entre imagem e container?',
              options: [
                { id: 'a', text: 'Imagem é o molde (estático); container é a execução (instância)' },
                { id: 'b', text: 'São a mesma coisa' },
                { id: 'c', text: 'Container é o molde; imagem a execução' },
                { id: 'd', text: 'Imagem é uma máquina virtual' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que docker images lista?',
              options: [
                { id: 'a', text: 'As imagens baixadas localmente' },
                { id: 'b', text: 'Os containers rodando' },
                { id: 'c', text: 'Os volumes' },
                { id: 'd', text: 'As redes' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a flag --rm faz no docker run?',
              options: [
                { id: 'a', text: 'Remove o container automaticamente quando termina' },
                { id: 'b', text: 'Remove a imagem' },
                { id: 'c', text: 'Reinicia o container' },
                { id: 'd', text: 'Roda em modo de remoção' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que alpine significa (ex: alpine, python:3.12-alpine)?',
              options: [
                { id: 'a', text: 'Uma distro Linux minúscula — imagens pequenas' },
                { id: 'b', text: 'Um tipo de container' },
                { id: 'c', text: 'Um banco de dados' },
                { id: 'd', text: 'Um framework' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que containers são leves comparados a VMs?',
              options: [
                { id: 'a', text: 'Compartilham o kernel do host — só o app e libs no container' },
                { id: 'b', text: 'Não usam Linux' },
                { id: 'c', text: 'São menores por design' },
                { id: 'd', text: 'Não rodam processos' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'docker-run',
          title: 'Rodando containers',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que "docker run alpine echo oi" faz?',
              options: [
                { id: 'a', text: 'Baixa alpine (se preciso), cria o container e roda o comando' },
                { id: 'b', text: 'Só baixa a imagem' },
                { id: 'c', text: 'Cria sem rodar' },
                { id: 'd', text: 'Para um container' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que docker run --rm python:3.12-alpine python -c "..." faz?',
              options: [
                { id: 'a', text: 'Roda Python DENTRO do container (isolado do host)' },
                { id: 'b', text: 'Roda Python no host' },
                { id: 'c', text: 'Instala Python no host' },
                { id: 'd', text: 'Erro — não pode' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o exit code de um container?',
              options: [
                { id: 'a', text: '0 = sucesso; diferente de 0 = erro (igual a processos)' },
                { id: 'b', text: 'Sempre 0' },
                { id: 'c', text: 'É aleatório' },
                { id: 'd', text: 'Indica o número de containers' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece com containers parados?',
              options: [
                { id: 'a', text: 'Continuam existindo (docker ps -a mostra) até serem removidos' },
                { id: 'b', text: 'São apagados sozinhos' },
                { id: 'c', text: 'Viram imagens' },
                { id: 'd', text: 'Reiniciam sozinhos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar --rm em testes?',
              options: [
                { id: 'a', text: 'Evita acumular containers parados no disco' },
                { id: 'b', text: 'Deixa mais rápido' },
                { id: 'c', text: 'É obrigatório' },
                { id: 'd', text: 'Preserva os logs' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'docker-dockerfile',
          title: 'Criando imagens com Dockerfile',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que a instrução FROM faz no Dockerfile?',
              options: [
                { id: 'a', text: 'Define a imagem base (ex: FROM alpine)' },
                { id: 'b', text: 'Roda um comando' },
                { id: 'c', text: 'Copia arquivos' },
                { id: 'd', text: 'Define variáveis' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a instrução CMD faz?',
              options: [
                { id: 'a', text: 'Define o comando padrão ao rodar o container' },
                { id: 'b', text: 'Compila o código' },
                { id: 'c', text: 'Copia o código' },
                { id: 'd', text: 'Baixa dependências' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que docker build -t meu-app . faz?',
              options: [
                { id: 'a', text: 'Constrói a imagem a partir do Dockerfile, com a tag meu-app' },
                { id: 'b', text: 'Roda a imagem' },
                { id: 'c', text: 'Envia para o registro' },
                { id: 'd', text: 'Deleta a imagem' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a instrução ENV faz?',
              options: [
                { id: 'a', text: 'Define variáveis de ambiente dentro do container' },
                { id: 'b', text: 'Define o ambiente de produção' },
                { id: 'c', text: 'Instala pacotes' },
                { id: 'd', text: 'Expõe portas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que WORKDIR /app faz?',
              options: [
                { id: 'a', text: 'Define o diretório de trabalho dentro do container' },
                { id: 'b', text: 'Cria um volume' },
                { id: 'c', text: 'Abre o editor' },
                { id: 'd', text: 'Executa um app' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, docker_course + marker.replace("BACKEND_COURSE]", "BACKEND_COURSE, DOCKER_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("DOCKER_COURSE inserido")
