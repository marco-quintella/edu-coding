"""Insere o AUTOMACAO_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

automacao_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const AUTOMACAO_COURSE = {
  slug: 'automacao-python',
  title: 'Automação com Python',
  description:
    'Arquivos, pastas e comandos do sistema — automatize o trabalho repetitivo com os módulos padrão do Python.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Automação',
      lessons: [
        {
          slug: 'automacao-arquivos',
          title: 'Lendo e escrevendo arquivos',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que "with open(...) as f" faz?',
              options: [
                { id: 'a', text: 'Abre o arquivo e FECHA sozinho ao sair do bloco' },
                { id: 'b', text: 'Abre e mantém aberto para sempre' },
                { id: 'c', text: 'Cria um arquivo novo sempre' },
                { id: 'd', text: 'Apaga o arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual modo abre um arquivo para LEITURA?',
              options: [
                { id: 'a', text: '"r" (default)' },
                { id: 'b', text: '"w"' },
                { id: 'c', text: '"a"' },
                { id: 'd', text: '"x"' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que "w" faz com um arquivo existente?',
              options: [
                { id: 'a', text: 'Sobrescreve o conteúdo' },
                { id: 'b', text: 'Adiciona no fim' },
                { id: 'c', text: 'Lê e escreve' },
                { id: 'd', text: 'Falha' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como iterar as linhas de um arquivo?',
              options: [
                { id: 'a', text: 'for linha in f:' },
                { id: 'b', text: 'f.each()' },
                { id: 'c', text: 'while f.next()' },
                { id: 'd', text: 'f.map()' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que linha.split() faz?',
              options: [
                { id: 'a', text: 'Divide a linha em partes pelos espaços' },
                { id: 'b', text: 'Junta as linhas' },
                { id: 'c', text: 'Remove os espaços' },
                { id: 'd', text: 'Conta as palavras' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'automacao-pastas',
          title: 'Pastas com os e shutil',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que os.makedirs(path, exist_ok=True) faz?',
              options: [
                { id: 'a', text: 'Cria a pasta (e as intermediárias) sem erro se já existe' },
                { id: 'b', text: 'Lista as pastas' },
                { id: 'c', text: 'Deleta a pasta' },
                { id: 'd', text: 'Cria um arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que os.listdir(pasta) retorna?',
              options: [
                { id: 'a', text: 'A lista de nomes de arquivos/pastas' },
                { id: 'b', text: 'O conteúdo dos arquivos' },
                { id: 'c', text: 'O tamanho da pasta' },
                { id: 'd', text: 'A data de criação' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que shutil.copy(origem, destino) faz?',
              options: [
                { id: 'a', text: 'Copia o arquivo para o destino' },
                { id: 'b', text: 'Move o arquivo' },
                { id: 'c', text: 'Deleta o arquivo' },
                { id: 'd', text: 'Renomeia o arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como filtrar arquivos por extensão?',
              options: [
                { id: 'a', text: '[n for n in os.listdir(p) if n.endswith(".txt")]' },
                { id: 'b', text: 'os.filter(".txt")' },
                { id: 'c', text: 'os.listdir(p, ext=".txt")' },
                { id: 'd', text: 'glob não existe' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que os.path.exists(caminho) retorna?',
              options: [
                { id: 'a', text: 'True se o caminho existe' },
                { id: 'b', text: 'O tamanho do arquivo' },
                { id: 'c', text: 'A data de modificação' },
                { id: 'd', text: 'O conteúdo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'automacao-sistema',
          title: 'Sistema: subprocess e datetime',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que subprocess.run(cmd) faz?',
              options: [
                { id: 'a', text: 'Executa um comando do sistema e espera o resultado' },
                { id: 'b', text: 'Abre o terminal interativo' },
                { id: 'c', text: 'Instala um pacote' },
                { id: 'd', text: 'Lê um arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que capture_output=True faz?',
              options: [
                { id: 'a', text: 'Captura stdout/stderr do comando em vez de imprimir' },
                { id: 'b', text: 'Grava um vídeo' },
                { id: 'c', text: 'Esconde os erros' },
                { id: 'd', text: 'Acelera o comando' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que returncode do subprocess indica?',
              options: [
                { id: 'a', text: '0 = sucesso; diferente de 0 = erro' },
                { id: 'b', text: 'O tamanho da saída' },
                { id: 'c', text: 'O tempo de execução' },
                { id: 'd', text: 'A quantidade de linhas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que datetime.now() retorna?',
              options: [
                { id: 'a', text: 'A data/hora atual' },
                { id: 'b', text: 'O timestamp em segundos' },
                { id: 'c', text: 'A data de ontem' },
                { id: 'd', text: 'Uma string formatada' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que timedelta(days=1) representa?',
              options: [
                { id: 'a', text: 'Uma diferença de 1 dia — útil para somar/subtrair datas' },
                { id: 'b', text: 'O dia 1 do mês' },
                { id: 'c', text: 'Um timer de 1 dia' },
                { id: 'd', text: 'A data de amanhã direto' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, automacao_course + marker.replace("APIS_COURSE]", "APIS_COURSE, AUTOMACAO_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("AUTOMACAO_COURSE inserido")
