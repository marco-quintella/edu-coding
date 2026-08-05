"""Insere o TS_COURSE no seed (runtime: ts)."""
src = open('scripts/seed-ia-para-devs.ts').read()

ts_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const TS_COURSE = {
  slug: 'typescript',
  title: 'TypeScript na Prática',
  description:
    'Tipos, interfaces e generics — o JavaScript com segurança de tipos que o mercado inteiro usa. Roda em TS real no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de TypeScript',
      lessons: [
        {
          slug: 'ts-tipos',
          title: 'Tipos básicos e anotações',
          checkpoint: 'ml-base',
          runtime: 'ts',
          minutes: 35,
          quiz: [
            {
              question: 'Para que serve a anotação : number?',
              options: [
                { id: 'a', text: 'Declarar que a variável só aceita números' },
                { id: 'b', text: 'Converter a variável em número' },
                { id: 'c', text: 'Criar um número aleatório' },
                { id: 'd', text: 'É só decoração' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é um type alias (type Usuario = ...)?',
              options: [
                { id: 'a', text: 'Um nome para uma forma de dado — reutilizável' },
                { id: 'b', text: 'Um novo tipo de variável' },
                { id: 'c', text: 'Uma classe' },
                { id: 'd', text: 'Uma função' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a diferença de TS para JS?',
              options: [
                { id: 'a', text: 'TS adiciona tipos em tempo de desenvolvimento (que são removidos ao rodar)' },
                { id: 'b', text: 'TS é mais lento em produção' },
                { id: 'c', text: 'TS roda no navegador direto' },
                { id: 'd', text: 'TS não tem funções' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se passar uma string para uma função : number?',
              options: [
                { id: 'a', text: 'Erro de tipo em tempo de desenvolvimento' },
                { id: 'b', text: 'Erro em produção' },
                { id: 'c', text: 'O programa trava' },
                { id: 'd', text: 'Nada — converte sozinho' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'TypeScript é compilado ou interpretado?',
              options: [
                { id: 'a', text: 'Compilado para JavaScript (o navegador/node roda JS)' },
                { id: 'b', text: 'Interpretado direto' },
                { id: 'c', text: 'Compilado para binário' },
                { id: 'd', text: 'É uma linguagem de marcação' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'ts-interfaces',
          title: 'Interfaces e objetos',
          checkpoint: 'ml-base',
          runtime: 'ts',
          minutes: 35,
          quiz: [
            {
              question: 'O que é uma interface?',
              options: [
                { id: 'a', text: 'Um contrato de forma — o objeto DEVE ter essas propriedades' },
                { id: 'b', text: 'Uma classe abstrata' },
                { id: 'c', text: 'Um tipo primitivo' },
                { id: 'd', text: 'Uma função' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que significa "T[]" (ex: Produto[])?',
              options: [
                { id: 'a', text: 'Um array de elementos do tipo T' },
                { id: 'b', text: 'Um array vazio' },
                { id: 'c', text: 'Um tipo genérico' },
                { id: 'd', text: 'O último elemento' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que tipar objetos de API?',
              options: [
                { id: 'a', text: 'O compilador valida os campos antes de você usar' },
                { id: 'b', text: 'Para o JSON ficar menor' },
                { id: 'c', text: 'Não dá para tipar' },
                { id: 'd', text: 'Para acelerar o fetch' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se faltar um campo da interface?',
              options: [
                { id: 'a', text: 'Erro de tipo em desenvolvimento' },
                { id: 'b', text: 'O objeto vira undefined' },
                { id: 'c', text: 'O campo é criado vazio' },
                { id: 'd', text: 'Nada' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Interface vs type: qual usar para objetos?',
              options: [
                { id: 'a', text: 'Ambos funcionam — interface é tradicional para objetos' },
                { id: 'b', text: 'Só type funciona' },
                { id: 'c', text: 'Só interface funciona' },
                { id: 'd', text: 'Nenhum' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'ts-avancado',
          title: 'Union types e generics',
          checkpoint: 'ml-base',
          runtime: 'ts',
          minutes: 40,
          quiz: [
            {
              question: 'O que é union type (number | string)?',
              options: [
                { id: 'a', text: 'Aceita um OU outro tipo — e o typeof discrimina' },
                { id: 'b', text: 'Aceita os dois ao mesmo tempo' },
                { id: 'c', text: 'Um array misto' },
                { id: 'd', text: 'Um tipo opcional' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o typeof num union type?',
              options: [
                { id: 'a', text: 'Narrowing: saber qual tipo é antes de operar' },
                { id: 'b', text: 'Converter o tipo' },
                { id: 'c', text: 'Apagar o tipo' },
                { id: 'd', text: 'Criar o tipo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é um genérico (<T>)?',
              options: [
                { id: 'a', text: 'Uma função que funciona com QUALQUER tipo, preservando-o' },
                { id: 'b', text: 'Uma função sem tipo' },
                { id: 'c', text: 'Um tipo secreto' },
                { id: 'd', text: 'Um array de tipos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que T | undefined significa num retorno?',
              options: [
                { id: 'a', text: 'Pode devolver o valor OU undefined (ex: lista vazia)' },
                { id: 'b', text: 'O valor é opcional para quem chama' },
                { id: 'c', text: 'Erro garantido' },
                { id: 'd', text: 'O valor nunca existe' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que o mercado adotou TypeScript?',
              options: [
                { id: 'a', text: 'Erros de tipo aparecem em desenvolvimento, não em produção' },
                { id: 'b', text: 'É mais rápido que JS' },
                { id: 'c', text: 'É obrigatório' },
                { id: 'd', text: 'Substitui o CSS' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, ts_course + marker.replace("OOP_COURSE]", "OOP_COURSE, TS_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("TS_COURSE inserido")
