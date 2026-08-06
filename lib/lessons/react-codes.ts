/**
 * Códigos iniciais do curso "React do Zero".
 * Runtime react: node com NODE_PATH=/opt/react/node_modules (checkpoint ml-base).
 * Chaves únicas por lição (prefixo: react / react-l / react-c).
 * ATENÇÃO: escapar \${ nos template literals.
 */

export const REACT_CODES: Record<string, string> = {
  // ── Lição 1: Componentes (hands-on) ────────────────────────
  'react-componentes': `const React = require("react");
const { renderToString } = require("react-dom/server");

// Componente: função que retorna elemento
function Saudacao({ nome }) {
  return React.createElement("h1", null, \`Olá, \${nome}!\`);
}

const html = renderToString(React.createElement(Saudacao, { nome: "Ana" }));
console.log(html);`,

  'react-ex1': `const React = require("react");
const { renderToString } = require("react-dom/server");

// TODO: componente Saudacao que recebe { nome }
function Saudacao({ nome }) {
  return React.createElement("h1", null, \`Olá, \${nome}!\`);
}

const html = renderToString(React.createElement(Saudacao, { nome: "Ana" }));
console.log(html);`,

  'react-ex2': `const React = require("react");
const { renderToString } = require("react-dom/server");

// TODO: compor Titulo + Paragrafo num div
function Titulo() {
  return React.createElement("h1", null, "Catálogo");
}

function Paragrafo({ texto }) {
  return React.createElement("p", null, texto);
}

const app = React.createElement(
  "div",
  null,
  React.createElement(Titulo),
  React.createElement(Paragrafo, { texto: "bem-vindo" })
);
const html = renderToString(app);
console.log(html);`,

  'react-projeto': `const React = require("react");
const { renderToString } = require("react-dom/server");

// TODO: Avatar (iniciais) + Perfil (nome, cargo)
function Avatar({ nome }) {
  return React.createElement(
    "div",
    { className: "avatar" },
    nome.slice(0, 2).toUpperCase()
  );
}

function Perfil({ nome, cargo }) {
  return React.createElement(
    "div",
    { className: "perfil" },
    React.createElement(Avatar, { nome }),
    React.createElement("h2", null, nome),
    React.createElement("p", null, cargo)
  );
}

const html = renderToString(React.createElement(Perfil, { nome: "Ana Silva", cargo: "Dev" }));
console.log(html);`,

  // ── Lição 2: Listas e condicionais (hands-on) ──────────────
  'react-listas': `const React = require("react");
const { renderToString } = require("react-dom/server");

// Lista com map e key
function Lista({ itens }) {
  return React.createElement(
    "ul",
    null,
    itens.map((item) => React.createElement("li", { key: item }, item))
  );
}

const html = renderToString(React.createElement(Lista, { itens: ["a", "b", "c"] }));
console.log(html);`,

  'react-l-ex1': `const React = require("react");
const { renderToString } = require("react-dom/server");

// TODO: renderizar a lista com map e key
function Lista({ itens }) {
  return React.createElement(
    "ul",
    null,
    itens.map((item) => React.createElement("li", { key: item }, item))
  );
}

const html = renderToString(React.createElement(Lista, { itens: ["a", "b", "c"] }));
console.log(html);`,

  'react-l-ex2': `const React = require("react");
const { renderToString } = require("react-dom/server");

// TODO: componente Status com condicional
function Status({ ativo }) {
  if (ativo) {
    return React.createElement("span", { className: "ok" }, "ativo");
  }
  return React.createElement("span", { className: "off" }, "inativo");
}

const html = renderToString(React.createElement(Status, { ativo: true }));
console.log(html);`,

  'react-l-projeto': `const React = require("react");
const { renderToString } = require("react-dom/server");

// TODO: lista de produtos com preço formatado
function Produto({ nome, preco }) {
  return React.createElement(
    "li",
    null,
    \`\${nome} - R\$ \${preco.toFixed(2)}\`
  );
}

function ListaProdutos({ produtos }) {
  return React.createElement(
    "ul",
    null,
    produtos.map((p) => React.createElement(Produto, { key: p.nome, nome: p.nome, preco: p.preco }))
  );
}

const produtos = [
  { nome: "teclado", preco: 120 },
  { nome: "mouse", preco: 60 },
  { nome: "monitor", preco: 800 },
];

const html = renderToString(React.createElement(ListaProdutos, { produtos }));
console.log(html);`,

  // ── Lição 3: Composição e children (hands-on) ──────────────
  'react-composicao': `const React = require("react");
const { renderToString } = require("react-dom/server");

// Composição: Card com título e children
function Card({ titulo, children }) {
  return React.createElement(
    "div",
    { className: "card" },
    React.createElement("h3", null, titulo),
    children
  );
}

const app = React.createElement(
  Card,
  { titulo: "Meu card" },
  React.createElement("p", null, "conteúdo do card")
);
const html = renderToString(app);
console.log(html);`,

  'react-c-ex1': `const React = require("react");
const { renderToString } = require("react-dom/server");

// TODO: Card com titulo e children
function Card({ titulo, children }) {
  return React.createElement(
    "div",
    { className: "card" },
    React.createElement("h3", null, titulo),
    children
  );
}

const app = React.createElement(
  Card,
  { titulo: "Meu card" },
  React.createElement("p", null, "conteúdo do card")
);
const html = renderToString(app);
console.log(html);`,

  'react-c-ex2': `const React = require("react");
const { renderToString } = require("react-dom/server");

// TODO: botão com cor default (azul)
function Botao({ label, cor }) {
  const estilo = { backgroundColor: cor || "blue" };
  return React.createElement("button", { style: estilo }, label);
}

const html = renderToString(React.createElement(Botao, { label: "Salvar" }));
console.log(html);`,

  'react-c-projeto': `const React = require("react");
const { renderToString } = require("react-dom/server");

// TODO: layout Pagina com Header, Main e Footer
function Header({ titulo }) {
  return React.createElement("header", null, React.createElement("h1", null, titulo));
}

function Footer({ ano }) {
  return React.createElement("footer", null, \`© \${ano}\`);
}

function Pagina({ titulo, children, ano }) {
  return React.createElement(
    "div",
    { className: "pagina" },
    React.createElement(Header, { titulo }),
    React.createElement("main", null, children),
    React.createElement(Footer, { ano })
  );
}

const app = React.createElement(
  Pagina,
  { titulo: "Edu Coding", ano: 2026 },
  React.createElement("p", null, "aprenda a programar")
);
const html = renderToString(app);
console.log(html);`,
}
