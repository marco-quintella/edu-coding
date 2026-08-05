"""Integra JS_CODES no initial-codes + teste + soluções."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { AUTOMACAO_CODES } from './automacao-codes'", "import { AUTOMACAO_CODES } from './automacao-codes'\nimport { JS_CODES } from './js-codes'")
src = src.replace("    AUTOMACAO_CODES[lessonSlug] ??", "    AUTOMACAO_CODES[lessonSlug] ??\n    JS_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { AUTOMACAO_CODES } from '../automacao-codes'", "import { AUTOMACAO_CODES } from '../automacao-codes'\nimport { JS_CODES } from '../js-codes'")
t = t.replace("  'automacao-s-projeto',\n]", "  'automacao-s-projeto',\n  // Curso JavaScript para Devs\n  'js-basicos',\n  'js-ex1',\n  'js-ex2',\n  'js-projeto',\n  'js-arrays-objetos',\n  'js-a-ex1',\n  'js-a-ex2',\n  'js-a-projeto',\n  'js-funcoes-async',\n  'js-f-ex1',\n  'js-f-ex2',\n  'js-f-projeto',\n]")
t = t.replace("""    // Códigos do curso Automação começam com import/comentário
    for (const [slug, code] of Object.entries(AUTOMACAO_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso Automação começam com import/comentário
    for (const [slug, code] of Object.entries(AUTOMACAO_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso JS começam com comentário ou const
    for (const [slug, code] of Object.entries(JS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\/\/|const |let )/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")

# 3. soluções
s = open('lib/lessons/solutions.ts').read()
js_solutions = '''
  // ── Curso JavaScript para Devs ─────────────────────────────
  'js-ex1': {
    explanation:
      'const não reatribui; let reatribui; typeof revela o tipo. Template literals com crase + ${}.',
    code: `const nome = "Ana";
let idade = 25;
const ativo = true;

console.log(\`\${nome} tem \${idade} anos\`);
console.log(\`tipo de idade: \${typeof idade}\`);
console.log(\`ativo: \${ativo}\`);`,
  },
  'js-ex2': {
    explanation:
      'push adiciona no fim; length conta; includes verifica. O array original muda com push.',
    code: `const frutas = ["maça", "banana", "uva"];
frutas.push("kiwi");
console.log(\`frutas: \${frutas.length}\`);
console.log(\`primeira: \${frutas[0]}\`);
console.log(\`tem uva: \${frutas.includes("uva")}\`);`,
  },
  'js-projeto': {
    explanation:
      'obj.chave = valor adiciona propriedade; Object.keys devolve as chaves — 4 com o email.',
    code: `const usuario = {
  nome: "Ana",
  idade: 25,
  cidade: "São Paulo",
};
usuario.email = "ana@x.com";
console.log(\`nome: \${usuario.nome}\`);
console.log(\`chaves: \${Object.keys(usuario).length}\`);`,
  },
  'js-a-ex1': {
    explanation:
      'Array com push/length/includes — a manipulação básica do JS moderno.',
    code: `const frutas = ["maça", "banana", "uva"];
frutas.push("kiwi");
console.log(\`frutas: \${frutas.length}\`);
console.log(\`primeira: \${frutas[0]}\`);
console.log(\`tem uva: \${frutas.includes("uva")}\`);`,
  },
  'js-a-ex2': {
    explanation:
      'Object.keys(obj).length conta as propriedades — 4 após adicionar o email.',
    code: `const usuario = {
  nome: "Ana",
  idade: 25,
  cidade: "São Paulo",
};
usuario.email = "ana@x.com";
console.log(\`nome: \${usuario.nome}\`);
console.log(\`chaves: \${Object.keys(usuario).length}\`);`,
  },
  'js-a-projeto': {
    explanation:
      'Array de objetos = dados de API. length conta; reduce com comparador acha o mais caro.',
    code: `const produtos = [
  { id: 1, nome: "teclado", preco: 120 },
  { id: 2, nome: "mouse", preco: 60 },
  { id: 3, nome: "monitor", preco: 800 },
];
console.log(\`produtos: \${produtos.length}\`);
console.log(\`primeiro: \${produtos[0].nome}\`);
console.log(\`mais caro: \${produtos.reduce((acc, p) => (p.preco > acc.preco ? p : acc)).nome}\`);`,
  },
  'js-f-ex1': {
    explanation:
      'map transforma cada item; filter seleciona; reduce acumula. 650 total, 2 caros (200 e 300).',
    code: `const precos = [100, 200, 50, 300];
const comDesconto = precos.map((p) => p * 0.9);
const caros = precos.filter((p) => p >= 150);
const total = precos.reduce((acc, p) => acc + p, 0);
console.log(\`total: \${total}\`);
console.log(\`caros: \${caros.length}\`);`,
  },
  'js-f-ex2': {
    explanation:
      'fetch retorna uma Promise; await espera; .json() converte. Node 24 tem fetch nativo.',
    code: `const resposta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const dados = await resposta.json();
console.log(\`titulo: \${dados.title}\`);
console.log(\`concluido: \${dados.completed}\`);`,
  },
  'js-f-projeto': {
    explanation:
      'throw lança o erro; try/catch captura e acessa e.message. Divisão por zero controlada.',
    code: `function dividir(a, b) {
  if (b === 0) throw new Error("divisao por zero");
  return a / b;
}
try {
  console.log(dividir(10, 2));
  dividir(1, 0);
} catch (e) {
  console.log(\`erro: \${e.message}\`);
}`,
  },
}
'''
idx = s.rindex('}\n\n/** Busca a solução')
s = s[:idx] + js_solutions + s[idx:]
open('lib/lessons/solutions.ts', 'w').write(s)
print("soluções JS adicionadas")
