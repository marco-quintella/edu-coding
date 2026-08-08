/**
 * Códigos iniciais do curso "SQL Avançado".
 * sqlite3 (stdlib) — suporta subqueries, CTEs e window functions.
 * Chaves únicas por lição (prefixo: sqlav / sqlav-c / sqlav-w).
 */

export const SQLAV_CODES: Record<string, string> = {
  // ── Lição 1: Subqueries (hands-on) ──────────────────────────
  'sqlav-subqueries': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

# Subquery: vendedores acima da média
cur.execute("""
    SELECT DISTINCT vendedor FROM vendas
    WHERE valor > (SELECT AVG(valor) FROM vendas)
""")
acima = [r[0] for r in cur.fetchall()]
print(f"acima da media: {sorted(acima)}")`,

  'sqlav-ex1': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

# TODO: vendedores acima da média (subquery)
cur.execute("""
    SELECT DISTINCT vendedor FROM vendas
    WHERE valor > (SELECT AVG(valor) FROM vendas)
""")
acima = [r[0] for r in cur.fetchall()]
print(f"acima da media: {sorted(acima)}")`,

  'sqlav-ex2': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

# TODO: maior venda de cada vendedor
cur.execute("""
    SELECT vendedor, MAX(valor) FROM vendas
    GROUP BY vendedor
""")
top = sorted(cur.fetchall())
print(f"top: {top}")`,

  'sqlav-projeto': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

# TODO: vendedores com venda acima de 2500
cur.execute("""
    SELECT DISTINCT vendedor FROM vendas
    WHERE valor > 2500
""")
print(f"top: {sorted(r[0] for r in cur.fetchall())}")`,

  // ── Lição 2: CTEs (hands-on) ───────────────────────────────
  'sqlav-cte': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE pedidos (id INTEGER, cliente TEXT, total REAL)")
cur.executemany("INSERT INTO pedidos VALUES (?,?,?)", [
    (1, "ana", 100), (2, "bob", 200), (3, "ana", 150), (4, "carol", 400),
])
con.commit()

# CTE: clientes com total acima de 300
cur.execute("""
    WITH totais AS (
        SELECT cliente, SUM(total) AS soma FROM pedidos GROUP BY cliente
    )
    SELECT cliente FROM totais WHERE soma > 300
""")
print(f"clientes: {sorted(r[0] for r in cur.fetchall())}")`,

  'sqlav-c-ex1': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE pedidos (id INTEGER, cliente TEXT, total REAL)")
cur.executemany("INSERT INTO pedidos VALUES (?,?,?)", [
    (1, "ana", 100), (2, "bob", 200), (3, "ana", 150), (4, "carol", 400),
])
con.commit()

# TODO: clientes com total acima de 300 (CTE)
cur.execute("""
    WITH totais AS (
        SELECT cliente, SUM(total) AS soma FROM pedidos GROUP BY cliente
    )
    SELECT cliente FROM totais WHERE soma > 300
""")
print(f"clientes: {sorted(r[0] for r in cur.fetchall())}")`,

  'sqlav-c-ex2': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE pedidos (id INTEGER, cliente TEXT, total REAL)")
cur.executemany("INSERT INTO pedidos VALUES (?,?,?)", [
    (1, "ana", 100), (2, "bob", 200), (3, "ana", 150), (4, "carol", 300),
])
con.commit()

# TODO: pedidos por cliente (CTE com COUNT)
cur.execute("""
    WITH contagem AS (
        SELECT cliente, COUNT(*) AS qtd FROM pedidos GROUP BY cliente
    )
    SELECT cliente, qtd FROM contagem ORDER BY qtd DESC
""")
print(cur.fetchall())`,

  'sqlav-c-projeto': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE pedidos (id INTEGER, cliente TEXT, total REAL)")
cur.executemany("INSERT INTO pedidos VALUES (?,?,?)", [
    (1, "ana", 100), (2, "bob", 200), (3, "ana", 150), (4, "carol", 300),
])
con.commit()

# TODO: ranking de clientes por total (CTE)
cur.execute("""
    WITH totais AS (
        SELECT cliente, SUM(total) AS soma FROM pedidos GROUP BY cliente
    )
    SELECT cliente, soma FROM totais ORDER BY soma DESC
""")
print(cur.fetchall())`,

  // ── Lição 3: Window functions (hands-on) ───────────────────
  'sqlav-window': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

# Window: RANK por valor
cur.execute("""
    SELECT vendedor, valor, RANK() OVER (ORDER BY valor DESC) AS pos
    FROM vendas
""")
linhas = cur.fetchall()
print(f"linhas: {len(linhas)}")
print(f"primeira: {linhas[0]}")`,

  'sqlav-w-ex1': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

# TODO: RANK das vendas
cur.execute("""
    SELECT vendedor, valor, RANK() OVER (ORDER BY valor DESC) AS pos
    FROM vendas
""")
linhas = cur.fetchall()
print(f"linhas: {len(linhas)}")
print(f"primeira: {linhas[0]}")`,

  'sqlav-w-ex2': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

# TODO: running total da ana
cur.execute("""
    SELECT vendedor, SUM(valor) OVER (PARTITION BY vendedor ORDER BY id) AS acumulado
    FROM vendas WHERE vendedor = 'ana'
""")
linhas = cur.fetchall()
print(f"ana total: {linhas[-1][1]}")`,

  'sqlav-w-projeto': `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

# TODO: top 2 vendas com RANK
cur.execute("""
    SELECT vendedor, valor FROM (
        SELECT vendedor, valor, RANK() OVER (ORDER BY valor DESC) AS pos FROM vendas
    ) WHERE pos <= 2
""")
print(sorted(cur.fetchall()))`,
}
