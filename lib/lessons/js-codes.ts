/**
 * Códigos iniciais do curso "JavaScript para Devs".
 * Runtime node (/opt/node/bin/node no checkpoint ml-base).
 * Chaves únicas por lição (prefixo: js / js-a / js-f).
 * ATENÇÃO: escapar \${ nos template literals JS (senão o TS interpola).
 */

export const JS_CODES: Record<string, string> = {
  // ── Lição 1: Básicos (hands-on) ────────────────────────────
  'js-basicos': `// Variáveis, tipos e template literals
const nome = "Ana";
let idade = 25;
const ativo = true;

console.log(\`\${nome} tem \${idade} anos\`);
console.log(\`tipo de idade: \${typeof idade}\`);
console.log(\`ativo: \${ativo}\`);`,

  'js-ex1': `// TODO: crie as variáveis e mostre o tipo
const nome = "Ana";
let idade = 25;
const ativo = true;

console.log(\`\${nome} tem \${idade} anos\`);
console.log(\`tipo de idade: \${typeof idade}\`);
console.log(\`ativo: \${ativo}\`);`,

  'js-ex2': `// TODO: manipule o array de frutas
const frutas = ["maça", "banana", "uva"];
frutas.push("kiwi");
console.log(\`frutas: \${frutas.length}\`);
console.log(\`primeira: \${frutas[0]}\`);
console.log(\`tem uva: \${frutas.includes("uva")}\`);`,

  'js-projeto': `// TODO: crie o objeto usuário e adicione o email
const usuario = {
  nome: "Ana",
  idade: 25,
  cidade: "São Paulo",
};
usuario.email = "ana@x.com";
console.log(\`nome: \${usuario.nome}\`);
console.log(\`chaves: \${Object.keys(usuario).length}\`);`,

  // ── Lição 2: Arrays e objetos (hands-on) ───────────────────
  'js-arrays-objetos': `// Arrays e objetos
const frutas = ["maça", "banana", "uva"];
frutas.push("kiwi");

const usuario = {
  nome: "Ana",
  idade: 25,
};
usuario.email = "ana@x.com";

console.log(\`frutas: \${frutas.length}\`);
console.log(\`chaves: \${Object.keys(usuario).length}\`);`,

  'js-a-ex1': `// TODO: array com push, includes e length
const frutas = ["maça", "banana", "uva"];
frutas.push("kiwi");
console.log(\`frutas: \${frutas.length}\`);
console.log(\`primeira: \${frutas[0]}\`);
console.log(\`tem uva: \${frutas.includes("uva")}\`);`,

  'js-a-ex2': `// TODO: objeto usuário com email adicionado
const usuario = {
  nome: "Ana",
  idade: 25,
  cidade: "São Paulo",
};
usuario.email = "ana@x.com";
console.log(\`nome: \${usuario.nome}\`);
console.log(\`chaves: \${Object.keys(usuario).length}\`);`,

  'js-a-projeto': `// TODO: catálogo de produtos (array de objetos)
const produtos = [
  { id: 1, nome: "teclado", preco: 120 },
  { id: 2, nome: "mouse", preco: 60 },
  { id: 3, nome: "monitor", preco: 800 },
];
console.log(\`produtos: \${produtos.length}\`);
console.log(\`primeiro: \${produtos[0].nome}\`);
console.log(\`mais caro: \${produtos.reduce((acc, p) => (p.preco > acc.preco ? p : acc)).nome}\`);`,

  // ── Lição 3: Funções e async (hands-on) ────────────────────
  'js-funcoes-async': `// map/filter/reduce + fetch
const precos = [100, 200, 50, 300];
const total = precos.reduce((acc, p) => acc + p, 0);
console.log(\`total: \${total}\`);

const resposta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const dados = await resposta.json();
console.log(\`titulo: \${dados.title}\`);`,

  'js-f-ex1': `// TODO: map, filter e reduce nos preços
const precos = [100, 200, 50, 300];
const comDesconto = precos.map((p) => p * 0.9);
const caros = precos.filter((p) => p >= 150);
const total = precos.reduce((acc, p) => acc + p, 0);
console.log(\`total: \${total}\`);
console.log(\`caros: \${caros.length}\`);`,

  'js-f-ex2': `// TODO: fetch + await na API de todos
const resposta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const dados = await resposta.json();
console.log(\`titulo: \${dados.title}\`);
console.log(\`concluido: \${dados.completed}\`);`,

  'js-f-projeto': `// TODO: divisão segura com throw e try/catch
function dividir(a, b) {
  if (b === 0) throw new Error("divisao por zero");
  return a / b;
}
try {
  console.log(dividir(10, 2));
  dividir(1, 0);
} catch (e) {
  console.log(\`erro: \${e.message}\`);
}`,
}
