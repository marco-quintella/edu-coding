"""Integra TS_CODES no initial-codes + teste + soluções."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { OOP_CODES } from './oop-codes'", "import { OOP_CODES } from './oop-codes'\nimport { TS_CODES } from './ts-codes'")
src = src.replace("    OOP_CODES[lessonSlug] ??", "    OOP_CODES[lessonSlug] ??\n    TS_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { OOP_CODES } from '../oop-codes'", "import { OOP_CODES } from '../oop-codes'\nimport { TS_CODES } from '../ts-codes'")
t = t.replace("  'oop-e-projeto',\n]", "  'oop-e-projeto',\n  // Curso TypeScript\n  'ts-tipos',\n  'ts-ex1',\n  'ts-ex2',\n  'ts-projeto',\n  'ts-interfaces',\n  'ts-i-ex1',\n  'ts-i-ex2',\n  'ts-i-projeto',\n  'ts-avancado',\n  'ts-a-ex1',\n  'ts-a-ex2',\n  'ts-a-projeto',\n]")
t = t.replace("""    // Códigos do curso OOP começam com comentário ou class
    for (const [slug, code] of Object.entries(OOP_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/class em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|class |def )/)
    }""",
"""    // Códigos do curso OOP começam com comentário ou class
    for (const [slug, code] of Object.entries(OOP_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/class em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|class |def )/)
    }
    // Códigos do curso TS começam com comentário, type ou const
    for (const [slug, code] of Object.entries(TS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/type/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\\/\\/|type |interface |const |function )/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")

# 3. soluções
s = open('lib/lessons/solutions.ts').read()
ts_solutions = '''
  // ── Curso TypeScript ───────────────────────────────────────
  'ts-ex1': {
    explanation:
      'type alias nomeia a forma; a instância : Usuario valida os campos. Template literal com ${}.',
    code: `type Usuario = {
  nome: string;
  idade: number;
  ativo: boolean;
};

const ana: Usuario = { nome: "Ana", idade: 25, ativo: true };
console.log(\`\${ana.nome} tem \${ana.idade} anos\`);
console.log(\`ativo: \${ana.ativo}\`);`,
  },
  'ts-ex2': {
    explanation:
      'Parâmetros e retorno tipados: (a: number, b: number): number. Erro de tipo aparece em dev.',
    code: `function somar(a: number, b: number): number {
  return a + b;
}

function saudacao(nome: string): string {
  return \`Olá, \${nome}!\`;
}

console.log(somar(2, 3));
console.log(saudacao("Ana"));`,
  },
  'ts-projeto': {
    explanation:
      'Union literal: Status só aceita "ativo" ou "inativo". T[] tipa o array; reduce soma 1+2+3+4 = 10.',
    code: `type Status = "ativo" | "inativo";

const statuses: Status[] = ["ativo", "inativo", "ativo"];
const numeros: number[] = [1, 2, 3, 4];

console.log(\`statuses: \${statuses.length}\`);
console.log(\`primeiro: \${statuses[0]}\`);
console.log(\`soma: \${numeros.reduce((a, b) => a + b, 0)}\`);`,
  },
  'ts-i-ex1': {
    explanation:
      'interface define o contrato; Produto[] tipa a lista. reduce com comparador acha o mais caro (teclado, 120).',
    code: `interface Produto {
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
  },
  'ts-i-ex2': {
    explanation:
      'type Todo descreve a API; const dados: Todo tipa o JSON. TS conhece os campos (autocomplete + validação).',
    code: `type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const resposta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const dados: Todo = await resposta.json();
console.log(\`titulo: \${dados.title}\`);
console.log(\`concluido: \${dados.completed}\`);`,
  },
  'ts-i-projeto': {
    explanation:
      'Union number | string com narrowing: typeof discrimina. Número → toFixed(2), string → toUpperCase().',
    code: `function formatar(valor: number | string): string {
  if (typeof valor === "number") {
    return valor.toFixed(2);
  }
  return valor.toUpperCase();
}

console.log(formatar(3.14159));
console.log(formatar("olá"));`,
  },
  'ts-a-ex1': {
    explanation:
      'Narrowing com typeof: dentro do if o TS sabe que é number. 3.14 com toFixed(2).',
    code: `function formatar(valor: number | string): string {
  if (typeof valor === "number") {
    return valor.toFixed(2);
  }
  return valor.toUpperCase();
}

console.log(formatar(3.14159));
console.log(formatar("olá"));`,
  },
  'ts-a-ex2': {
    explanation:
      'Interface de API + fetch tipado: o compilador valida os campos do JSON devolvido.',
    code: `type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const resposta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const dados: Todo = await resposta.json();
console.log(\`titulo: \${dados.title}\`);
console.log(\`concluido: \${dados.completed}\`);`,
  },
  'ts-a-projeto': {
    explanation:
      'Genérico <T>: funciona com qualquer tipo preservando-o. [] devolve undefined (T | undefined).',
    code: `function primeiro<T>(lista: T[]): T | undefined {
  return lista[0];
}

console.log(primeiro([1, 2, 3]));
console.log(primeiro(["a", "b", "c"]));
console.log(primeiro([]));`,
  },
}
'''
idx = s.rindex('}\n\n/** Busca a solução')
s = s[:idx] + ts_solutions + s[idx:]
open('lib/lessons/solutions.ts', 'w').write(s)
print("soluções TS adicionadas")
