"""Insere o GITAVANCADO_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

gitavancado_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const GITAVANCADO_COURSE = {
  slug: 'git-avancado',
  title: 'Git Avançado',
  description:
    'Stash, cherry-pick, squash e diagnóstico — os comandos que separam quem usa git de quem domina git.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Git Avançado',
      lessons: [
        {
          slug: 'gitav-stash',
          title: 'Stash: trabalho em progresso',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Para que serve o git stash?',
              options: [
                { id: 'a', text: 'Guardar mudanças não commitadas temporariamente' },
                { id: 'b', text: 'Apagar mudanças para sempre' },
                { id: 'c', text: 'Criar um commit' },
                { id: 'd', text: 'Trocar de usuário' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quando usar stash?',
              options: [
                { id: 'a', text: 'Precisa trocar de branch mas não quer commitar WIP' },
                { id: 'b', text: 'Sempre que commitar' },
                { id: 'c', text: 'Nunca' },
                { id: 'd', text: 'Para deletar branches' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que git stash pop faz?',
              options: [
                { id: 'a', text: 'Restaura as mudanças guardadas e remove do stash' },
                { id: 'b', text: 'Deleta o stash' },
                { id: 'c', text: 'Cria um stash novo' },
                { id: 'd', text: 'Faz merge' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que git stash list mostra?',
              options: [
                { id: 'a', text: 'Todos os stashes guardados' },
                { id: 'b', text: 'Os commits da branch' },
                { id: 'c', text: 'As branches remotas' },
                { id: 'd', text: 'Os arquivos modificados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que o pop pode dar conflito?',
              options: [
                { id: 'a', text: 'Se o arquivo do stash também mudou no branch atual' },
                { id: 'b', text: 'Nunca dá conflito' },
                { id: 'c', text: 'Sempre dá' },
                { id: 'd', text: 'Só com remotos' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'gitav-cherrypick',
          title: 'Cherry-pick e squash',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que git cherry-pick faz?',
              options: [
                { id: 'a', text: 'Copia UM commit específico para a branch atual' },
                { id: 'b', text: 'Faz merge de duas branches' },
                { id: 'c', text: 'Deleta um commit' },
                { id: 'd', text: 'Recria a branch' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quando usar cherry-pick?',
              options: [
                { id: 'a', text: 'Precisa de um fix específico sem trazer a branch inteira' },
                { id: 'b', text: 'Sempre que commitar' },
                { id: 'c', text: 'Para criar branches' },
                { id: 'd', text: 'Para reverter tudo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é squash?',
              options: [
                { id: 'a', text: 'Juntar vários commits em um só' },
                { id: 'b', text: 'Separar um commit em vários' },
                { id: 'c', text: 'Deletar commits' },
                { id: 'd', text: 'Ordenar commits' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como fazer squash de forma simples?',
              options: [
                { id: 'a', text: 'git reset --soft HEAD~N + git commit novo' },
                { id: 'b', text: 'git delete HEAD~N' },
                { id: 'c', text: 'git merge --squash' },
                { id: 'd', text: 'git revert HEAD~N' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que squash antes do merge em PRs?',
              options: [
                { id: 'a', text: 'Histórico limpo: 1 feature = 1 commit' },
                { id: 'b', text: 'Deixa o código menor' },
                { id: 'c', text: 'É obrigatório' },
                { id: 'd', text: 'Não faz sentido' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'gitav-diagnostico',
          title: 'Diagnóstico e log avançado',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que git log --oneline mostra?',
              options: [
                { id: 'a', text: 'Um commit por linha: hash abreviado + mensagem' },
                { id: 'b', text: 'O diff completo' },
                { id: 'c', text: 'Os arquivos de cada commit' },
                { id: 'd', text: 'As branches' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que git diff --stat mostra?',
              options: [
                { id: 'a', text: 'Resumo das mudanças: arquivo + linhas adicionadas/removidas' },
                { id: 'b', text: 'O conteúdo completo das mudanças' },
                { id: 'c', text: 'Só os arquivos novos' },
                { id: 'd', text: 'O autor de cada linha' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o git status --short mostra?',
              options: [
                { id: 'a', text: 'Resumo compacto: A (staged), M (modificado), ?? (novo)' },
                { id: 'b', text: 'O log completo' },
                { id: 'c', text: 'As branches remotas' },
                { id: 'd', text: 'Os commits futuros' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que significa "M" no status --short?',
              options: [
                { id: 'a', text: 'Arquivo modificado (tracked) com mudanças' },
                { id: 'b', text: 'Arquivo novo' },
                { id: 'c', text: 'Arquivo deletado' },
                { id: 'd', text: 'Merge em andamento' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que "A" no status --short significa?',
              options: [
                { id: 'a', text: 'Arquivo adicionado ao staging (staged)' },
                { id: 'b', text: 'Arquivo apagado' },
                { id: 'c', text: 'Arquivo renomeado' },
                { id: 'd', text: 'Arquivo ignorado' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE, SECURITY_COURSE, ALGORITMOS_COURSE, SQLAVANCADO_COURSE, JWT_COURSE, ESTATISTICA_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, gitavancado_course + marker.replace("ESTATISTICA_COURSE]", "ESTATISTICA_COURSE, GITAVANCADO_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("GITAVANCADO_COURSE inserido")
