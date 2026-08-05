/**
 * Códigos iniciais do curso "Backend com Node.js".
 * Runtime node (http nativo). Servidor testa com fetch local + close.
 * Chaves únicas por lição (prefixo: node / node-a / node-e).
 */

export const BACKEND_CODES: Record<string, string> = {
  // ── Lição 1: Servidor (hands-on) ───────────────────────────
  'node-servidor': `const http = require("http");

// Servidor com rota raiz devolvendo JSON
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

  'node-ex1': `const http = require("http");

// TODO: servidor que devolve { mensagem: "olá mundo" }
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

  'node-ex2': `const http = require("http");

// TODO: 200 na raiz, 404 nas outras rotas
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

  'node-projeto': `const http = require("http");

// TODO: rotas /, /saude e fallback
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

  // ── Lição 2: API REST (hands-on) ───────────────────────────
  'node-api-rest': `const http = require("http");

// API com rota /usuarios (GET)
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

  'node-a-ex1': `const http = require("http");

// TODO: API /usuarios (GET) devolvendo a lista
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

  'node-a-ex2': `const http = require("http");

// TODO: /usuarios/:id com regex + find
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

  'node-a-projeto': `const http = require("http");

// TODO: /produtos e /produtos/3
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

  // ── Lição 3: Erros e query (hands-on) ──────────────────────
  'node-erros': `const http = require("http");

// JSON de erro padronizado
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

  'node-e-ex1': `const http = require("http");

// TODO: 500 com JSON de erro padronizado
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

  'node-e-ex2': `const http = require("http");

// TODO: leia o corpo do POST e ecoe o nome
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

  'node-e-projeto': `const http = require("http");

// TODO: calculadora via query string /soma?a=10&b=5
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
}
