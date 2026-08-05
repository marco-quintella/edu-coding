/**
 * Códigos iniciais do curso "SQL & Bancos de Dados".
 * Todos usam sqlite3 (stdlib do Python — roda no sandbox ml-base).
 * Chaves únicas por lição (prefixo: sql-select / sql-agreg / sql-joins).
 */

export const SQL_CODES: Record<string, string> = {
  // ── Lição 1: SELECT (hands-on) ─────────────────────────────
  'sql-select': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER, nome TEXT, cidade TEXT)")
cur.executemany("INSERT INTO clientes VALUES (?, ?, ?)", [
    (1, "Ana", "SP"), (2, "Bob", "RJ"), (3, "Carol", "SP"), (4, "Dan", "BH"),
])

# Tente: listar clientes de SP em ordem alfabética
cur.execute("SELECT nome, cidade FROM clientes")
for nome, cidade in cur.fetchall():
    print(f"{nome}: {cidade}")`,

  'sql-select-ex1': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER, nome TEXT, cidade TEXT)")
cur.executemany("INSERT INTO clientes VALUES (?, ?, ?)", [
    (1, "Ana", "SP"), (2, "Bob", "RJ"), (3, "Carol", "SP"), (4, "Dan", "BH"),
])

# TODO: liste nome e cidade dos clientes de SP, em ordem alfabética
# Dica: WHERE cidade = 'SP' e ORDER BY nome
cur.execute("SELECT nome, cidade FROM clientes")
for nome, cidade in cur.fetchall():
    print(f"{nome}: {cidade}")`,

  'sql-select-ex2': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE produtos (id INTEGER, nome TEXT, preco REAL)")
cur.executemany("INSERT INTO produtos VALUES (?, ?, ?)", [
    (1, "teclado", 120), (2, "mouse", 60), (3, "monitor", 800), (4, "webcam", 250),
])

# TODO: liste nome e preço dos produtos com preco >= 100, do mais caro ao mais barato
cur.execute("SELECT nome, preco FROM produtos")
for nome, preco in cur.fetchall():
    print(f"{nome}: R\${preco:.0f}")`,

  'sql-select-projeto': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER, nome TEXT, cidade TEXT)")
cur.executemany("INSERT INTO clientes VALUES (?, ?, ?)", [
    (1, "Ana", "SP"), (2, "Bob", "RJ"), (3, "Carol", "SP"), (4, "Dan", "BH"),
])

# TODO: função que retorna os ids dos clientes de uma cidade, ordenados
# Dica: WHERE cidade = ? (parâmetro evita injection) + ORDER BY id
def buscar_por_cidade(cidade):
    return []

print(f"SP: {buscar_por_cidade('SP')}")
print(f"RJ: {buscar_por_cidade('RJ')}")`,

  // ── Lição 2: Agregações (hands-on) ─────────────────────────
  'sql-agregacoes': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, produto TEXT, valor REAL, vendedor TEXT)")
cur.executemany("INSERT INTO vendas VALUES (?, ?, ?, ?)", [
    (1, "notebook", 3500, "ana"), (2, "mouse", 60, "bob"),
    (3, "teclado", 120, "ana"), (4, "monitor", 800, "carol"),
    (5, "webcam", 250, "bob"),
])

# Tente: total por vendedor
cur.execute("SELECT COUNT(*), SUM(valor) FROM vendas")
print(cur.fetchone())`,

  'sql-agreg-ex1': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, produto TEXT, valor REAL, vendedor TEXT)")
cur.executemany("INSERT INTO vendas VALUES (?, ?, ?, ?)", [
    (1, "notebook", 3500, "ana"), (2, "mouse", 60, "bob"),
    (3, "teclado", 120, "ana"), (4, "monitor", 800, "carol"),
    (5, "webcam", 250, "bob"),
])

# TODO: vendedor, nº de vendas e total — ordenado do maior total
# Dica: GROUP BY vendedor + COUNT(*) + SUM(valor) + ORDER BY total DESC
cur.execute("SELECT vendedor, COUNT(*) as vendas, SUM(valor) as total FROM vendas GROUP BY vendedor")
for vendedor, vendas, total in cur.fetchall():
    print(f"{vendedor}: {vendas} vendas, R\${total:.0f}")`,

  'sql-agreg-ex2': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE pedidos (id INTEGER, cliente TEXT, valor REAL)")
cur.executemany("INSERT INTO pedidos VALUES (?, ?, ?)", [
    (1, "ana", 3500), (2, "bob", 60), (3, "ana", 120), (4, "carol", 800), (5, "bob", 250),
])

# TODO: clientes com total acima de R$500, do maior para o menor
# Dica: GROUP BY cliente + HAVING SUM(valor) > 500
cur.execute("SELECT cliente, SUM(valor) as total FROM pedidos GROUP BY cliente")
for cliente, total in cur.fetchall():
    print(f"{cliente}: R\${total:.0f}")`,

  'sql-agreg-projeto': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?, ?, ?)", [
    (1, "ana", 3500), (2, "bob", 60), (3, "ana", 120), (4, "carol", 800), (5, "bob", 250),
])

# TODO: ticket médio por vendedor — quem está acima da média geral?
# Dica: AVG(valor) com GROUP BY; média geral = SELECT AVG(valor) FROM vendas
cur.execute("SELECT vendedor, AVG(valor) FROM vendas GROUP BY vendedor")
por_vendedor = cur.fetchall()
cur.execute("SELECT AVG(valor) FROM vendas")
media_geral = cur.fetchone()[0]

for vendedor, media in por_vendedor:
    status = "acima da media" if media > media_geral else "abaixo da media"
    print(f"{vendedor} {status}")`,

  // ── Lição 3: JOINs (hands-on) ──────────────────────────────
  'sql-joins': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT)")
cur.execute("CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, valor REAL)")
cur.executemany("INSERT INTO clientes VALUES (?, ?)", [(1, "ana"), (2, "bob"), (3, "carol")])
cur.executemany("INSERT INTO pedidos VALUES (?, ?, ?)", [
    (1, 1, 3500), (2, 2, 60), (3, 1, 120), (4, 3, 800),
])

# Tente: total por cliente (INNER JOIN)
cur.execute("""
    SELECT c.nome, SUM(p.valor)
    FROM clientes c
    INNER JOIN pedidos p ON c.id = p.cliente_id
    GROUP BY c.nome
""")
for nome, total in cur.fetchall():
    print(f"{nome}: R\${total:.0f}")`,

  'sql-joins-ex1': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT)")
cur.execute("CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, valor REAL)")
cur.executemany("INSERT INTO clientes VALUES (?, ?)", [(1, "ana"), (2, "bob"), (3, "carol")])
cur.executemany("INSERT INTO pedidos VALUES (?, ?, ?)", [
    (1, 1, 3500), (2, 2, 60), (3, 1, 120), (4, 3, 800),
])

# TODO: nome, nº de pedidos e total — LEFT JOIN para não perder ninguém
# Dica: COUNT(p.id) + SUM(p.valor) + GROUP BY c.nome
cur.execute("""
    SELECT c.nome, COUNT(p.id) as pedidos, SUM(p.valor) as total
    FROM clientes c
    LEFT JOIN pedidos p ON c.id = p.cliente_id
    GROUP BY c.nome
    ORDER BY total DESC
""")
for nome, pedidos, total in cur.fetchall():
    print(f"{nome}: {pedidos} pedidos, R\${total:.0f}")`,

  'sql-joins-ex2': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT)")
cur.execute("CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, valor REAL)")
cur.executemany("INSERT INTO clientes VALUES (?, ?)", [(1, "ana"), (2, "bob"), (3, "carol")])
cur.executemany("INSERT INTO pedidos VALUES (?, ?, ?)", [(1, 1, 3500), (2, 2, 60), (3, 1, 120)])

# TODO: clientes que NUNCA fizeram pedido
# Dica: LEFT JOIN + WHERE p.id IS NULL
cur.execute("SELECT c.nome FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id")
for (nome,) in cur.fetchall():
    print(f"sem pedidos: {nome}")`,

  'sql-joins-projeto': `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT)")
cur.execute("CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, valor REAL)")
cur.executemany("INSERT INTO clientes VALUES (?, ?)", [(1, "ana"), (2, "bob"), (3, "carol")])
cur.executemany("INSERT INTO pedidos VALUES (?, ?, ?)", [(1, 1, 3500), (2, 2, 60), (3, 1, 120)])

# TODO: relatório completo — nome, nº de pedidos, total (0 para sem pedidos)
# Dica: LEFT JOIN + COUNT(p.id) + COALESCE(SUM(p.valor), 0) + ORDER BY total DESC
cur.execute("""
    SELECT c.nome, COUNT(p.id) as pedidos, COALESCE(SUM(p.valor), 0) as total
    FROM clientes c
    LEFT JOIN pedidos p ON c.id = p.cliente_id
    GROUP BY c.nome
    ORDER BY total DESC
""")
for nome, pedidos, total in cur.fetchall():
    print(f"{nome}: {pedidos} pedidos, R\${total:.0f}")`,
}
