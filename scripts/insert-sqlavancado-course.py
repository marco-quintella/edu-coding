"""Insere o SQLAVANCADO_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

sqlavancado_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const SQLAVANCADO_COURSE = {
  slug: 'sql-avancado',
  title: 'SQL Avançado',
  description:
    'Subqueries, CTEs e window functions — as consultas que diferenciam quem só sabe SELECT de quem extrai insight de verdade.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — SQL Avançado',
      lessons: [
        {
          slug: 'sqlav-subqueries',
          title: 'Subqueries',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que é uma subquery?',
              options: [
                { id: 'a', text: 'Uma consulta dentro de outra (ex: dentro de WHERE)' },
                { id: 'b', text: 'Uma tabela temporária' },
                { id: 'c', text: 'Um JOIN' },
                { id: 'd', text: 'Uma view' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que SELECT AVG(valor) FROM vendas retorna?',
              options: [
                { id: 'a', text: 'A média de TODOS os valores (valor único)' },
                { id: 'b', text: 'A média por vendedor' },
                { id: 'c', text: 'A soma' },
                { id: 'd', text: 'A maior venda' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como achar quem está ACIMA da média?',
              options: [
                { id: 'a', text: 'WHERE valor > (SELECT AVG(valor) FROM vendas)' },
                { id: 'b', text: 'WHERE valor = MAX(valor)' },
                { id: 'c', text: 'HAVING valor > média' },
                { id: 'd', text: 'ORDER BY valor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que GROUP BY vendedor faz numa subquery?',
              options: [
                { id: 'a', text: 'Agrupa para calcular por vendedor (ex: MAX por grupo)' },
                { id: 'b', text: 'Ordena por vendedor' },
                { id: 'c', text: 'Filtra vendedores' },
                { id: 'd', text: 'Conta vendedores' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar subquery em vez de resolver na aplicação?',
              options: [
                { id: 'a', text: 'O banco calcula com índices — sem mover dados' },
                { id: 'b', text: 'É mais bonito' },
                { id: 'c', text: 'Não tem diferença' },
                { id: 'd', text: 'Subquery é proibida' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'sqlav-cte',
          title: 'CTEs (WITH)',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que é uma CTE (WITH)?',
              options: [
                { id: 'a', text: 'Uma consulta nomeada que pode ser reutilizada na mesma query' },
                { id: 'b', text: 'Uma tabela permanente' },
                { id: 'c', text: 'Um índice' },
                { id: 'd', text: 'Uma função' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como se escreve uma CTE?',
              options: [
                { id: 'a', text: 'WITH nome AS (SELECT ...) SELECT ... FROM nome' },
                { id: 'b', text: 'CREATE TEMP TABLE nome' },
                { id: 'c', text: 'SELECT ... INTO nome' },
                { id: 'd', text: 'INSERT INTO nome SELECT' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a vantagem da CTE sobre subquery aninhada?',
              options: [
                { id: 'a', text: 'Legibilidade — a consulta vira blocos nomeados' },
                { id: 'b', text: 'É mais rápida sempre' },
                { id: 'c', text: 'Não tem vantagem' },
                { id: 'd', text: 'CTE não existe no sqlite' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que WITH totais AS (SELECT ... GROUP BY) faz?',
              options: [
                { id: 'a', text: 'Cria um bloco nomeado com totais por grupo' },
                { id: 'b', text: 'Ordena os totais' },
                { id: 'c', text: 'Deleta os totais' },
                { id: 'd', text: 'Soma tudo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'CTE é uma tabela física?',
              options: [
                { id: 'a', text: 'Não — existe só durante a query (tabela virtual)' },
                { id: 'b', text: 'Sim, fica no banco' },
                { id: 'c', text: 'Depende do tamanho' },
                { id: 'd', text: 'Sim, com índice' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'sqlav-window',
          title: 'Window Functions',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que é uma window function?',
              options: [
                { id: 'a', text: 'Calcula sobre uma janela de linhas SEM agrupar (mantém as linhas)' },
                { id: 'b', text: 'Um JOIN especial' },
                { id: 'c', text: 'Uma CTE' },
                { id: 'd', text: 'Um índice' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a diferença entre GROUP BY e window function?',
              options: [
                { id: 'a', text: 'GROUP BY reduz linhas; window mantém cada linha com o cálculo' },
                { id: 'b', text: 'São iguais' },
                { id: 'c', text: 'Window reduz linhas' },
                { id: 'd', text: 'GROUP BY mantém linhas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que RANK() OVER (ORDER BY valor DESC) faz?',
              options: [
                { id: 'a', text: 'Numera as linhas por posição no ranking' },
                { id: 'b', text: 'Ordena a tabela' },
                { id: 'c', text: 'Agrupa por valor' },
                { id: 'd', text: 'Soma os valores' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que PARTITION BY vendedor faz na janela?',
              options: [
                { id: 'a', text: 'Reinicia o cálculo para cada vendedor' },
                { id: 'b', text: 'Junta com a tabela de vendedores' },
                { id: 'c', text: 'Ordena por vendedor' },
                { id: 'd', text: 'Filtra vendedores' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que SUM(valor) OVER (PARTITION BY vendedor ORDER BY id) calcula?',
              options: [
                { id: 'a', text: 'O acumulado (running total) por vendedor' },
                { id: 'b', text: 'A soma total geral' },
                { id: 'c', text: 'A média por vendedor' },
                { id: 'd', text: 'O maior valor' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE, SECURITY_COURSE, ALGORITMOS_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, sqlavancado_course + marker.replace("ALGORITMOS_COURSE]", "ALGORITMOS_COURSE, SQLAVANCADO_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("SQLAVANCADO_COURSE inserido")
