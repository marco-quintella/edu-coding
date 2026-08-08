/**
 * Códigos iniciais do curso "Cibersegurança Essencial".
 * stdlib (hashlib/hmac/sqlite3/re) — roda no sandbox ml-base.
 * Chaves únicas por lição (prefixo: security / security-a / security-p).
 */

export const SECURITY_CODES: Record<string, string> = {
  // ── Lição 1: Hash e senhas (hands-on) ──────────────────────
  'security-hash': `import hashlib

# Hash de senha com SHA-256
senha = "minha-senha-secreta"
hash_senha = hashlib.sha256(senha.encode()).hexdigest()

print(f"hash: {hash_senha[:16]}...")
print(f"len: {len(hash_senha)}")`,

  'security-ex1': `import hashlib

# TODO: hasheie a senha e mostre o formato
senha = "minha-senha-secreta"
hash_senha = hashlib.sha256(senha.encode()).hexdigest()

print(f"hash: {hash_senha[:16]}...")
print(f"len: {len(hash_senha)}")`,

  'security-ex2': `import hashlib

# TODO: verifique senhas comparando hashes
def verificar(senha, hash_armazenado):
    return hashlib.sha256(senha.encode()).hexdigest() == hash_armazenado

senha = "segredo123"
armazenado = hashlib.sha256(senha.encode()).hexdigest()

print(f"correta: {verificar('segredo123', armazenado)}")
print(f"errada: {verificar('senha-errada', armazenado)}")`,

  'security-projeto': `import hashlib

# TODO: sistema de login com hash
usuarios = {}

def registrar(nome, senha):
    usuarios[nome] = hashlib.sha256(senha.encode()).hexdigest()

def login(nome, senha):
    if nome not in usuarios:
        return False
    return usuarios[nome] == hashlib.sha256(senha.encode()).hexdigest()

registrar("ana", "segredo123")
print(f"login certo: {login('ana', 'segredo123')}")
print(f"login errado: {login('ana', 'outra')}")`,

  // ── Lição 2: Ataques (hands-on) ────────────────────────────
  'security-ataques': `import sqlite3

# DEMO de SQL injection — nunca concatene SQL com input do usuário!
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE usuarios (id INTEGER, nome TEXT)")
cur.executemany("INSERT INTO usuarios VALUES (?, ?)", [(1, "ana"), (2, "bob")])
con.commit()

# Input malicioso do atacante
entrada = "bob' OR '1'='1"
query = f"SELECT * FROM usuarios WHERE nome = '{entrada}'"
cur.execute(query)
print(f"vazou: {len(cur.fetchall())} usuarios")

cur.execute("SELECT * FROM usuarios WHERE nome = ?", (entrada,))
print(f"segura: {len(cur.fetchall())} usuario")`,

  'security-a-ex1': `import sqlite3

# TODO: demonstre a injeção e a query segura
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE usuarios (id INTEGER, nome TEXT)")
cur.executemany("INSERT INTO usuarios VALUES (?, ?)", [(1, "ana"), (2, "bob")])
con.commit()

entrada = "bob' OR '1'='1"
query = f"SELECT * FROM usuarios WHERE nome = '{entrada}'"
cur.execute(query)
print(f"vazou: {len(cur.fetchall())} usuarios")

cur.execute("SELECT * FROM usuarios WHERE nome = ?", (entrada,))
print(f"segura: {len(cur.fetchall())} usuario")`,

  'security-a-ex2': `import html

# TODO: escape o script malicioso
comentario = "<script>alert('xss')</script>"
sanitizado = html.escape(comentario)

print(f"original: {comentario}")
print(f"sanitizado: {sanitizado}")`,

  'security-a-projeto': `import sqlite3

# TODO: função segura com parâmetros preparados
def buscar_usuario(con, nome):
    cur = con.cursor()
    cur.execute("SELECT * FROM usuarios WHERE nome = ?", (nome,))
    return cur.fetchall()

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE usuarios (id INTEGER, nome TEXT)")
cur.executemany("INSERT INTO usuarios VALUES (?, ?)", [(1, "ana"), (2, "bob")])
con.commit()

malicioso = "bob' OR '1'='1"
print(f"resultado: {len(buscar_usuario(con, malicioso))}")`,

  // ── Lição 3: Práticas (hands-on) ───────────────────────────
  'security-praticas': `import re

# Validação forte de senha
def validar_senha(senha):
    if len(senha) < 8:
        return False
    if not re.search(r"[A-Z]", senha):
        return False
    if not re.search(r"\\d", senha):
        return False
    return True

for s in ["fraco", "SenhaForte1", "semnumero"]:
    print(f"{s}: {validar_senha(s)}")`,

  'security-p-ex1': `import re

# TODO: valide senhas fortes (8+, maiúscula, número)
def validar_senha(senha):
    if len(senha) < 8:
        return False
    if not re.search(r"[A-Z]", senha):
        return False
    if not re.search(r"\\d", senha):
        return False
    return True

for s in ["fraco", "SenhaForte1", "semnumero"]:
    print(f"{s}: {validar_senha(s)}")`,

  'security-p-ex2': `import hmac, hashlib

# TODO: compare hashes com hmac.compare_digest
def comparar_seguro(a, b):
    return hmac.compare_digest(a, b)

hash1 = hashlib.sha256(b"segredo").hexdigest()
hash2 = hashlib.sha256(b"segredo").hexdigest()
hash3 = hashlib.sha256(b"outro").hexdigest()

print(f"iguais: {comparar_seguro(hash1, hash2)}")
print(f"diferentes: {comparar_seguro(hash1, hash3)}")`,

  'security-p-projeto': `import hashlib, os

# TODO: salt único por usuário
def hash_com_salt(senha):
    salt = os.urandom(16).hex()
    return salt, hashlib.sha256((salt + senha).encode()).hexdigest()

s1, h1 = hash_com_salt("mesma")
s2, h2 = hash_com_salt("mesma")
print(f"salts diferentes: {s1 != s2}")
print(f"hashes diferentes: {h1 != h2}")`,
}
