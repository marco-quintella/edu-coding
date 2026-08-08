"""Insere o PATTERNS_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

patterns_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const PATTERNS_COURSE = {
  slug: 'design-patterns',
  title: 'Design Patterns em Python',
  description:
    'Singleton, Factory, Strategy, Observer e Decorator — as soluções clássicas que separam junior de senior.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Padrões de Projeto',
      lessons: [
        {
          slug: 'patterns-criacionais',
          title: 'Singleton e Factory',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que o Singleton garante?',
              options: [
                { id: 'a', text: 'Uma ÚNICA instância da classe em todo o programa' },
                { id: 'b', text: 'Muitas instâncias' },
                { id: 'c', text: 'Instância por thread' },
                { id: 'd', text: 'Instância vazia' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como o Singleton é implementado em Python?',
              options: [
                { id: 'a', text: '__new__ retorna a instância guardada na classe' },
                { id: 'b', text: '__init__ cria sempre nova' },
                { id: 'c', text: 'Com uma lista' },
                { id: 'd', text: 'Com um módulo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o Factory?',
              options: [
                { id: 'a', text: 'Criar objetos sem expor a lógica de qual tipo criar' },
                { id: 'b', text: 'Deletar objetos' },
                { id: 'c', text: 'Ordenar objetos' },
                { id: 'd', text: 'Contar objetos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quando usar Factory?',
              options: [
                { id: 'a', text: 'Quando o tipo do objeto depende de uma condição (pix/cartao)' },
                { id: 'b', text: 'Sempre' },
                { id: 'c', text: 'Nunca' },
                { id: 'd', text: 'Só com bancos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a vantagem do Singleton para config?',
              options: [
                { id: 'a', text: 'Uma única fonte de verdade — todos leem a mesma config' },
                { id: 'b', text: 'Configs diferentes por módulo' },
                { id: 'c', text: 'Não tem vantagem' },
                { id: 'd', text: 'Deixa mais rápido' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'patterns-comportamentais',
          title: 'Strategy e Observer',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que o Strategy permite?',
              options: [
                { id: 'a', text: 'Trocar o algoritmo em runtime (frete normal vs expresso)' },
                { id: 'b', text: 'Criar uma classe' },
                { id: 'c', text: 'Notificar ouvintes' },
                { id: 'd', text: 'Garantir instância única' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como o Strategy é implementado?',
              options: [
                { id: 'a', text: 'Classes separadas com o mesmo método, injetadas no objeto' },
                { id: 'b', text: 'Uma classe com ifs' },
                { id: 'c', text: 'Herança profunda' },
                { id: 'd', text: 'Variáveis globais' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o Observer faz?',
              options: [
                { id: 'a', text: 'Notifica todos os inscritos quando algo muda' },
                { id: 'b', text: 'Observa o banco' },
                { id: 'c', text: 'Cria objetos' },
                { id: 'd', text: 'Guarda config' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Onde o Observer é usado no dia a dia?',
              options: [
                { id: 'a', text: 'Push notifications, eventos, listeners de UI' },
                { id: 'b', text: 'Conexão com banco' },
                { id: 'c', text: 'Hash de senha' },
                { id: 'd', text: 'Parse de JSON' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Strategy vs ifs — qual a vantagem?',
              options: [
                { id: 'a', text: 'Novo algoritmo = nova classe, sem tocar no código existente' },
                { id: 'b', text: 'Ifs são melhores' },
                { id: 'c', text: 'Não tem diferença' },
                { id: 'd', text: 'Strategy é mais lento' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'patterns-estruturais',
          title: 'Decorator e Iterator',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que o Decorator faz?',
              options: [
                { id: 'a', text: 'Adiciona comportamento a uma função sem mudar a função' },
                { id: 'b', text: 'Deleta funções' },
                { id: 'c', text: 'Cria classes' },
                { id: 'd', text: 'Gerencia memória' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como o Decorator é escrito em Python?',
              options: [
                { id: 'a', text: '@decorator acima da função, com wrapper dentro' },
                { id: 'b', text: 'Com herança' },
                { id: 'c', text: 'Com um módulo' },
                { id: 'd', text: 'Com lambda' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o Iterator permite?',
              options: [
                { id: 'a', text: 'Percorrer uma coleção com for, mesmo com regra custom' },
                { id: 'b', text: 'Ordenar listas' },
                { id: 'c', text: 'Notificar ouvintes' },
                { id: 'd', text: 'Criar instâncias' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quais métodos o Iterator implementa?',
              options: [
                { id: 'a', text: '__iter__ (retorna self) e __next__ (próximo valor)' },
                { id: 'b', text: '__init__ e __del__' },
                { id: 'c', text: '__add__ e __sub__' },
                { id: 'd', text: 'só __next__' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que StopIteration faz?',
              options: [
                { id: 'a', text: 'Sinaliza o fim da iteração (o for para)' },
                { id: 'b', text: 'Para o programa' },
                { id: 'c', text: 'Reinicia a iteração' },
                { id: 'd', text: 'É um erro' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE, SECURITY_COURSE, ALGORITMOS_COURSE, SQLAVANCADO_COURSE, JWT_COURSE, ESTATISTICA_COURSE, GITAVANCADO_COURSE, ML_COURSE, GRAFOS_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, patterns_course + marker.replace("GRAFOS_COURSE]", "GRAFOS_COURSE, PATTERNS_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("PATTERNS_COURSE inserido")
