/**
 * Códigos iniciais do curso "Autenticação & JWT".
 * stdlib (base64/json/hmac/hashlib/time) — roda no sandbox ml-base.
 * Chaves únicas por lição (prefixo: jwt / jwt-a / jwt-p).
 */

export const JWT_CODES: Record<string, string> = {
  // ── Lição 1: Base64 (hands-on) ──────────────────────────────
  'jwt-base64': `import base64, json

# Base64: como o JWT codifica (não criptografa!)
def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

payload = {"sub": "user-123", "nome": "Ana", "role": "dev"}
codificado = b64url(json.dumps(payload).encode())
print(f"payload: {codificado[:20]}...")

decodificado = json.loads(base64.urlsafe_b64decode(codificado + "=="))
print(f"nome: {decodificado['nome']}")`,

  'jwt-ex1': `import base64, json

# TODO: codifique e decodifique o payload
def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

payload = {"sub": "user-123", "nome": "Ana", "role": "dev"}
codificado = b64url(json.dumps(payload).encode())
print(f"payload: {codificado[:20]}...")

decodificado = json.loads(base64.urlsafe_b64decode(codificado + "=="))
print(f"nome: {decodificado['nome']}")`,

  'jwt-ex2': `import base64, json

# TODO: codifique o header do JWT
def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

header = {"alg": "HS256", "typ": "JWT"}
payload = {"sub": "user-123", "nome": "Ana"}

header_b64 = b64url(json.dumps(header).encode())
payload_b64 = b64url(json.dumps(payload).encode())
print(f"header: {header_b64}")
print(f"partes: 3 (header.payload.assinatura)")`,

  'jwt-projeto': `import base64, json

# TODO: codifique a sessão do usuário
def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

usuario = {"id": 1, "nome": "Ana", "role": "admin"}
codificado = b64url(json.dumps(usuario).encode())
print(f"tamanho: {len(codificado)}")
print(f"decodifica: {'admin' in base64.urlsafe_b64decode(codificado + '==').decode()}")`,

  // ── Lição 2: Assinatura (hands-on) ──────────────────────────
  'jwt-assinatura': `import base64, json, hmac, hashlib

SECRETO = b"meu-segredo-super-secreto"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload):
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

token = criar_token({"sub": "user-123", "nome": "Ana"})
print(f"partes: {len(token.split('.'))}")
print(f"assinatura: {token.split('.')[2][:10]}...")`,

  'jwt-a-ex1': `import base64, json, hmac, hashlib

SECRETO = b"meu-segredo-super-secreto"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

# TODO: crie o token com 3 partes
def criar_token(payload):
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

token = criar_token({"sub": "user-123", "nome": "Ana"})
print(f"partes: {len(token.split('.'))}")
print(f"assinatura: {token.split('.')[2][:10]}...")`,

  'jwt-a-ex2': `import base64, json, hmac, hashlib

SECRETO = b"meu-segredo-super-secreto"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload):
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

# TODO: verifique e detecte adulteração
def verificar_token(token):
    header, corpo, sig = token.split(".")
    esperado = b64url(assinar(f"{header}.{corpo}"))
    return hmac.compare_digest(sig, esperado)

token = criar_token({"sub": "user-123"})
print(f"valido: {verificar_token(token)}")
print(f"adulterado: {verificar_token(token[:-2] + 'xx')}")`,

  'jwt-a-projeto': `import base64, json, hmac, hashlib

SECRETO = b"segredo-do-servidor"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

# TODO: confirme que o mesmo payload gera o mesmo token
def criar_token(payload):
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

t1 = criar_token({"sub": "user-1"})
t2 = criar_token({"sub": "user-1"})
print(f"deterministico: {t1 == t2}")`,

  // ── Lição 3: Produção (hands-on) ───────────────────────────
  'jwt-producao': `import base64, json, hmac, hashlib, time

SECRETO = b"meu-segredo-super-secreto"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload, expira_em=3600):
    payload["exp"] = int(time.time()) + expira_em
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

def verificar_token(token):
    try:
        header, corpo, sig = token.split(".")
        esperado = b64url(assinar(f"{header}.{corpo}"))
        if not hmac.compare_digest(sig, esperado):
            return None
        payload = json.loads(base64.urlsafe_b64decode(corpo + "=="))
        if payload.get("exp", 0) < time.time():
            return None
        return payload
    except Exception:
        return None

token = criar_token({"sub": "user-123", "nome": "Ana"})
dados = verificar_token(token)
print(f"valido: {dados is not None}")
print(f"nome: {dados['nome']}")`,

  'jwt-p-ex1': `import base64, json, hmac, hashlib, time

SECRETO = b"meu-segredo-super-secreto"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

# TODO: token com expiração
def criar_token(payload, expira_em=3600):
    payload["exp"] = int(time.time()) + expira_em
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

def verificar_token(token):
    try:
        header, corpo, sig = token.split(".")
        esperado = b64url(assinar(f"{header}.{corpo}"))
        if not hmac.compare_digest(sig, esperado):
            return None
        payload = json.loads(base64.urlsafe_b64decode(corpo + "=="))
        if payload.get("exp", 0) < time.time():
            return None
        return payload
    except Exception:
        return None

token = criar_token({"sub": "user-123", "nome": "Ana"})
dados = verificar_token(token)
print(f"valido: {dados is not None}")
print(f"nome: {dados['nome']}")`,

  'jwt-p-ex2': `import base64, json, hmac, hashlib, time

SECRETO = b"meu-segredo-super-secreto"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload, expira_em=3600):
    payload["exp"] = int(time.time()) + expira_em
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

def verificar_token(token):
    try:
        header, corpo, sig = token.split(".")
        esperado = b64url(assinar(f"{header}.{corpo}"))
        if not hmac.compare_digest(sig, esperado):
            return None
        payload = json.loads(base64.urlsafe_b64decode(corpo + "=="))
        if payload.get("exp", 0) < time.time():
            return None
        return payload
    except Exception:
        return None

# TODO: token expirado deve ser rejeitado
token = criar_token({"sub": "user-123"}, expira_em=-10)
print(f"expirado: {verificar_token(token) is None}")`,

  'jwt-p-projeto': `import base64, json, hmac, hashlib, time

SECRETO = b"segredo-do-servidor"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload, expira_em=3600):
    payload["exp"] = int(time.time()) + expira_em
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

def verificar_token(token):
    try:
        header, corpo, sig = token.split(".")
        esperado = b64url(assinar(f"{header}.{corpo}"))
        if not hmac.compare_digest(sig, esperado):
            return None
        payload = json.loads(base64.urlsafe_b64decode(corpo + "=="))
        if payload.get("exp", 0) < time.time():
            return None
        return payload
    except Exception:
        return None

# TODO: login que emite e valida token
def login(email, senha):
    armazenado = hashlib.sha256(b"segredo123").hexdigest()
    if hashlib.sha256(senha.encode()).hexdigest() != armazenado:
        return None
    return criar_token({"sub": "user-1", "email": email})

token = login("ana@x.com", "segredo123")
dados = verificar_token(token)
print(f"login ok: {dados is not None}")
print(f"email: {dados['email']}")`,
}
