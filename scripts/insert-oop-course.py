"""Insere o OOP_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

oop_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const OOP_COURSE = {
  slug: 'oop-python',
  title: 'Orientação a Objetos com Python',
  description:
    'Classes, herança e encapsulamento — o paradigma que organiza sistemas grandes, com exercícios verificados.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de OOP',
      lessons: [
        {
          slug: 'oop-classes',
          title: 'Classes, __init__ e métodos',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que __init__ faz numa classe?',
              options: [
                { id: 'a', text: 'Inicializa o objeto — roda ao criar a instância' },
                { id: 'b', text: 'Deleta o objeto' },
                { id: 'c', text: 'É o nome da classe' },
                { id: 'd', text: 'Só existe em Java' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que self representa?',
              options: [
                { id: 'a', text: 'A própria instância (cada objeto tem o seu)' },
                { id: 'b', text: 'A classe' },
                { id: 'c', text: 'O módulo' },
                { id: 'd', text: 'O parâmetro do método' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como criar uma instância de Conta?',
              options: [
                { id: 'a', text: 'c = Conta("Ana", 100)' },
                { id: 'b', text: 'c = new Conta("Ana")' },
                { id: 'c', text: 'c = Conta.new()' },
                { id: 'd', text: 'c = conta()' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é um método?',
              options: [
                { id: 'a', text: 'Uma função definida dentro da classe' },
                { id: 'b', text: 'Uma variável da classe' },
                { id: 'c', text: 'Um atributo do objeto' },
                { id: 'd', text: 'Um módulo importado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que self.saldo = 0 faz?',
              options: [
                { id: 'a', text: 'Cria o atributo saldo da instância' },
                { id: 'b', text: 'Cria uma variável global' },
                { id: 'c', text: 'Zera o objeto' },
                { id: 'd', text: 'Erro de sintaxe' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'oop-heranca',
          title: 'Herança e polimorfismo',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que "class Cachorro(Animal)" significa?',
              options: [
                { id: 'a', text: 'Cachorro HERDA tudo de Animal (e pode sobrescrever)' },
                { id: 'b', text: 'Cachorro é uma função' },
                { id: 'c', text: 'Animal herda de Cachorro' },
                { id: 'd', text: 'Cachorro é uma instância' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é sobrescrever (override) um método?',
              options: [
                { id: 'a', text: 'Definir o MESMO método na subclasse com comportamento próprio' },
                { id: 'b', text: 'Apagar o método da classe pai' },
                { id: 'c', text: 'Chamar o método duas vezes' },
                { id: 'd', text: 'Renomear o método' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é polimorfismo?',
              options: [
                { id: 'a', text: 'Objetos diferentes respondem ao MESMO método de formas diferentes' },
                { id: 'b', text: 'Vários métodos com o mesmo nome' },
                { id: 'c', text: 'Uma classe com muitos atributos' },
                { id: 'd', text: 'Um método com muitos parâmetros' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a vantagem da herança?',
              options: [
                { id: 'a', text: 'Reuso: a subclasse herda atributos e métodos da base' },
                { id: 'b', text: 'Deixa o código mais curto sempre' },
                { id: 'c', text: 'Elimina a necessidade de classes' },
                { id: 'd', text: 'É obrigatória em Python' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se NÃO sobrescrever o método da base?',
              options: [
                { id: 'a', text: 'A subclasse usa a implementação da classe pai' },
                { id: 'b', text: 'Erro de execução' },
                { id: 'c', text: 'O método some' },
                { id: 'd', text: 'O programa não roda' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'oop-encapsulamento',
          title: 'Encapsulamento e @property',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que __saldo (duplo underscore) significa?',
              options: [
                { id: 'a', text: 'Atributo "privado" — acesso direto desencorajado' },
                { id: 'b', text: 'Atributo público' },
                { id: 'c', text: 'Uma variável global' },
                { id: 'd', text: 'Erro de sintaxe' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o @property?',
              options: [
                { id: 'a', text: 'Expor um atributo privado como leitura controlada' },
                { id: 'b', text: 'Criar um método estático' },
                { id: 'c', text: 'Apagar um atributo' },
                { id: 'd', text: 'Importar um módulo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que encapsular o saldo?',
              options: [
                { id: 'a', text: 'Controlar como o dado muda (ex: só via depositar/sacar)' },
                { id: 'b', text: 'Porque é obrigatório' },
                { id: 'c', text: 'Para ficar mais lento' },
                { id: 'd', text: 'Para ocupar menos memória' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é "name mangling" (__saldo)?',
              options: [
                { id: 'a', text: 'Python renomeia internamente para _Classe__saldo' },
                { id: 'b', text: 'Python apaga o atributo' },
                { id: 'c', text: 'Python torna público' },
                { id: 'd', text: 'Python cria uma cópia' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que um método getter (property) permite?',
              options: [
                { id: 'a', text: 'Ler o valor com sintaxe de atributo: c.saldo' },
                { id: 'b', text: 'Escrever direto no atributo' },
                { id: 'c', text: 'Deletar o atributo' },
                { id: 'd', text: 'Contar os atributos' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, oop_course + marker.replace("REGEX_COURSE]", "REGEX_COURSE, OOP_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("OOP_COURSE inserido")
