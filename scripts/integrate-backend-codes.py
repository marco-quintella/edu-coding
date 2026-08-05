"""Integra BACKEND_CODES no initial-codes + teste + soluções."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { TS_CODES } from './ts-codes'", "import { TS_CODES } from './ts-codes'\nimport { BACKEND_CODES } from './backend-codes'")
src = src.replace("    TS_CODES[lessonSlug] ??", "    TS_CODES[lessonSlug] ??\n    BACKEND_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { TS_CODES } from '../ts-codes'", "import { TS_CODES } from '../ts-codes'\nimport { BACKEND_CODES } from '../backend-codes'")
t = t.replace("  'ts-a-projeto',\n]", "  'ts-a-projeto',\n  // Curso Backend Node\n  'node-servidor',\n  'node-ex1',\n  'node-ex2',\n  'node-projeto',\n  'node-api-rest',\n  'node-a-ex1',\n  'node-a-ex2',\n  'node-a-projeto',\n  'node-erros',\n  'node-e-ex1',\n  'node-e-ex2',\n  'node-e-projeto',\n]")
t = t.replace("""    // Códigos do curso TS começam com comentário, type ou const
    for (const [slug, code] of Object.entries(TS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/type/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\\/\\/|type |interface |const |function )/)
    }""",
"""    // Códigos do curso TS começam com comentário, type ou const
    for (const [slug, code] of Object.entries(TS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/type/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\\/\\/|type |interface |const |function )/)
    }
    // Códigos do curso Backend começam com comentário ou const
    for (const [slug, code] of Object.entries(BACKEND_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\\/\\/|const |let )/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")

# 3. soluções
s = open('lib/lessons/solutions.ts').read()
backend_solutions = '''
  // ── Curso Backend Node ─────────────────────────────────────
  'node-ex1': {
    explanation:
      'createServer registra o callback; writeHead define status+headers; end envia o corpo. Fetch local valida.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ mensagem: "olá mundo" }));
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/");
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`mensagem: \${d.mensagem}\`);
  server.close();
});`,
  },
  'node-ex2': {
    explanation:
      'if (req.url === "/") responde 200; senão 404 com JSON. O fetch local testa as duas rotas.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ rota: "raiz" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ erro: "nao encontrado" }));
  }
});

server.listen(3001, async () => {
  const ok = await fetch("http://localhost:3001/");
  const falta = await fetch("http://localhost:3001/x");
  console.log(\`raiz: \${ok.status}\`);
  console.log(\`404: \${falta.status}\`);
  server.close();
});`,
  },
  'node-projeto': {
    explanation:
      'Cadeia if/else por req.url — o roteador manual. /saude devolve { status: "ok" }.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  if (req.url === "/") res.end(JSON.stringify({ rota: "raiz" }));
  else if (req.url === "/saude") res.end(JSON.stringify({ status: "ok" }));
  else res.end(JSON.stringify({ rota: req.url }));
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/saude");
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`saude: \${d.status}\`);
  server.close();
});`,
  },
  'node-a-ex1': {
    explanation:
      'GET /usuarios devolve o array com JSON.stringify. O cliente itera e lê dados.length e dados[0].',
    code: `const http = require("http");

const usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Bob" },
];

const server = http.createServer((req, res) => {
  if (req.url === "/usuarios" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuarios));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/usuarios");
  const dados = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`usuarios: \${dados.length}\`);
  console.log(\`primeiro: \${dados[0].nome}\`);
  server.close();
});`,
  },
  'node-a-ex2': {
    explanation:
      'Regex extrai o id da URL; Number converte; find procura. 404 se não existe — o padrão REST.',
    code: `const http = require("http");

const usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Bob" },
];

const server = http.createServer((req, res) => {
  const m = req.url.match(/^\\/usuarios\\/(\\d+)$/);
  if (m) {
    const id = Number(m[1]);
    const u = usuarios.find((x) => x.id === id);
    if (u) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(u));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ erro: "usuario nao existe" }));
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/usuarios/2");
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`nome: \${d.nome}\`);
  server.close();
});`,
  },
  'node-a-projeto': {
    explanation:
      'Rotas /produtos (lista) e /produtos/3 (item). O cliente busca as duas e compara.',
    code: `const http = require("http");

const produtos = [
  { id: 1, nome: "teclado", preco: 120 },
  { id: 2, nome: "mouse", preco: 60 },
  { id: 3, nome: "monitor", preco: 800 },
];

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  if (req.url === "/produtos") {
    res.end(JSON.stringify(produtos));
  } else if (req.url === "/produtos/3") {
    res.end(JSON.stringify(produtos[2]));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/produtos");
  const todos = await r.json();
  const p = await (await fetch("http://localhost:3001/produtos/3")).json();
  console.log(\`produtos: \${todos.length}\`);
  console.log(\`mais caro: \${p.nome}\`);
  server.close();
});`,
  },
  'node-e-ex1': {
    explanation:
      'Erro padronizado: 500 + { erro: "..." }. O cliente lê o JSON de erro sem quebrar.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/ok") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
  } else {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ erro: "erro interno" }));
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/erro");
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`erro: \${d.erro}\`);
  server.close();
});`,
  },
  'node-e-ex2': {
    explanation:
      'O corpo chega em pedaços (data); no end juntamos e parseamos. POST com fetch + body JSON.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/echo" && req.method === "POST") {
    let corpo = "";
    req.on("data", (chunk) => (corpo += chunk));
    req.on("end", () => {
      const dados = JSON.parse(corpo);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ recebido: dados.nome }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/echo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: "Ana" }),
  });
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`recebido: \${d.recebido}\`);
  server.close();
});`,
  },
  'node-e-projeto': {
    explanation:
      'Query string extraída por regex; Number converte; soma. 400 para uso errado.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  const m = req.url.match(/^\\/soma\\?a=(\\d+)&b=(\\d+)$/);
  if (m) {
    const resultado = Number(m[1]) + Number(m[2]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ resultado }));
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ erro: "use /soma?a=1&b=2" }));
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/soma?a=10&b=5");
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`resultado: \${d.resultado}\`);
  server.close();
});`,
  },
}
'''
idx = s.rindex('}\n\n/** Busca a solução')
s = s[:idx] + backend_solutions + s[idx:]
open('lib/lessons/solutions.ts', 'w').write(s)
print("soluções Backend adicionadas")
