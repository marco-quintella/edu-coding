/**
 * Códigos iniciais do curso "TypeScript na Prática".
 * Runtime ts: node 24 --experimental-strip-types no checkpoint ml-base.
 * Chaves únicas por lição (prefixo: ts / ts-i / ts-a).
 * ATENÇÃO: escapar \${ nos template literals (senão o TS interpola).
 */

export const TS_CODES: Record<string, string> = {
  // ── Lição 1: Tipos (hands-on) ──────────────────────────────
  'ts-tipos': `// Tipos básicos e type aliases
type Usuario = {
  nome: string;
  idade: number;
  ativo: boolean;
};

const ana: Usuario = { nome: "Ana", idade: 25, ativo: true };
console.log(\`\${ana.nome} tem \${ana.idade} anos\`);
console.log(\`ativo: \${ana.ativo}\`);`,

  'ts-ex1': `// TODO: type Usuario com nome/idade/ativo + instância
type Usuario = {
  nome: string;
  idade: number;
  ativo: boolean;
};

const ana: Usuario = { nome: "Ana", idade: 25, ativo: true };
console.log(\`\${ana.nome} tem \${ana.idade} anos\`);
console.log(\`ativo: \${ana.ativo}\`);`,

  'ts-ex2': `// TODO: tipar parâmetros e retorno
function somar(a: number, b: number): number {
  return a + b;
}

function saudacao(nome: string): string {
  return \`Olá, \${nome}!\`;
}

console.log(somar(2, 3));
console.log(saudacao("Ana"));`,

  'ts-projeto': `// TODO: union type Status e arrays tipados
type Status = "ativo" | "inativo";

const statuses: Status[] = ["ativo", "inativo", "ativo"];
const numeros: number[] = [1, 2, 3, 4];

console.log(\`statuses: \${statuses.length}\`);
console.log(\`primeiro: \${statuses[0]}\`);
console.log(\`soma: \${numeros.reduce((a, b) => a + b, 0)}\`);`,

  // ── Lição 2: Interfaces (hands-on) ─────────────────────────
  'ts-interfaces': `// Interfaces e objetos tipados
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

const produtos: Produto[] = [
  { id: 1, nome: "teclado", preco: 120 },
  { id: 2, nome: "mouse", preco: 60 },
];

console.log(\`produtos: \${produtos.length}\`);
console.log(\`primeiro: \${produtos[0].nome}\`);`,

  'ts-i-ex1': `// TODO: interface Produto + array com 2 produtos
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

const produtos: Produto[] = [
  { id: 1, nome: "teclado", preco: 120 },
  { id: 2, nome: "mouse", preco: 60 },
];

console.log(\`produtos: \${produtos.length}\`);
console.log(\`mais caro: \${produtos.reduce((a, b) => (b.preco > a.preco ? b : a)).nome}\`);`,

  'ts-i-ex2': `// TODO: type Todo + fetch tipado
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const resposta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const dados: Todo = await resposta.json();
console.log(\`titulo: \${dados.title}\`);
console.log(\`concluido: \${dados.completed}\`);`,

  'ts-i-projeto': `// TODO: formatador com union type e narrowing
function formatar(valor: number | string): string {
  if (typeof valor === "number") {
    return valor.toFixed(2);
  }
  return valor.toUpperCase();
}

console.log(formatar(3.14159));
console.log(formatar("olá"));`,

  // ── Lição 3: Avançado (hands-on) ───────────────────────────
  'ts-avancado': `// Union types e narrowing
function formatar(valor: number | string): string {
  if (typeof valor === "number") {
    return valor.toFixed(2);
  }
  return valor.toUpperCase();
}

console.log(formatar(3.14159));
console.log(formatar("olá"));`,

  'ts-a-ex1': `// TODO: formatador com narrowing completo
function formatar(valor: number | string): string {
  if (typeof valor === "number") {
    return valor.toFixed(2);
  }
  return valor.toUpperCase();
}

console.log(formatar(3.14159));
console.log(formatar("olá"));`,

  'ts-a-ex2': `// TODO: type Todo + fetch tipado
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const resposta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const dados: Todo = await resposta.json();
console.log(\`titulo: \${dados.title}\`);
console.log(\`concluido: \${dados.completed}\`);`,

  'ts-a-projeto': `// TODO: função genérica primeiro<T>
function primeiro<T>(lista: T[]): T | undefined {
  return lista[0];
}

console.log(primeiro([1, 2, 3]));
console.log(primeiro(["a", "b", "c"]));
console.log(primeiro([]));`,
}
