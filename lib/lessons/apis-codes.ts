/**
 * Códigos iniciais do curso "APIs & HTTP na Prática".
 * stdlib (json/urllib) — roda no sandbox ml-base, que TEM internet.
 * Chaves únicas por lição (prefixo: apis / apis-r / apis-e).
 */

export const APIS_CODES: Record<string, string> = {
  // ── Lição 1: JSON (hands-on) ───────────────────────────────
  'apis-json': `import json

# JSON é a linguagem das APIs
usuario = {
    "id": 1,
    "nome": "Ana Silva",
    "email": "ana@empresa.com",
    "ativo": True,
}

texto = json.dumps(usuario, ensure_ascii=False)
print(f"JSON: {texto}")

de_volta = json.loads(texto)
print(f"nome: {de_volta['nome']}")`,

  'apis-ex1': `import json

usuario = {
    "id": 1,
    "nome": "Ana Silva",
    "email": "ana@empresa.com",
    "ativo": True,
}

# TODO: serialize com json.dumps e desserialize com json.loads
texto = json.dumps(usuario, ensure_ascii=False)
print(f"JSON: {texto}")

de_volta = json.loads(texto)
print(f"nome: {de_volta['nome']}")
print(f"ativo: {de_volta['ativo']}")`,

  'apis-ex2': `import json

resposta = '[{"id": 1, "nome": "Ana"}, {"id": 2, "nome": "Bob"}, {"id": 3, "nome": "Carol"}]'

# TODO: parseie e itere
dados = json.loads(resposta)
print(f"usuarios: {len(dados)}")
for u in dados:
    print(f"  {u['id']}: {u['nome']}")`,

  'apis-projeto': `import json

resposta = '[{"id": 1, "produto": "teclado", "preco": 120}, {"id": 2, "produto": "mouse", "preco": 60}, {"id": 3, "produto": "monitor", "preco": 800}]'

# TODO: total, soma dos preços e produto mais caro
produtos = json.loads(resposta)
total = sum(p["preco"] for p in produtos)
print(f"produtos: {len(produtos)}")
print(f"total: R\${total:.0f}")
print(f"mais caro: {max(produtos, key=lambda p: p['preco'])['produto']}")`,

  // ── Lição 2: Requisições (hands-on) ────────────────────────
  'apis-requests': `import json
from urllib.request import urlopen

# Consumindo uma API real (jsonplaceholder — fake REST API)
url = "https://jsonplaceholder.typicode.com/todos/1"
with urlopen(url) as resp:
    dados = json.loads(resp.read())

print(f"titulo: {dados['title']}")
print(f"concluido: {dados['completed']}")`,

  'apis-r-ex1': `import json
from urllib.request import urlopen

def buscar_json(url):
    with urlopen(url) as resp:
        return json.loads(resp.read())

# TODO: busque o todo 1 da API e mostre título e status
url = "https://jsonplaceholder.typicode.com/todos/1"
dados = buscar_json(url)
print(f"titulo: {dados['title']}")
print(f"concluido: {dados['completed']}")`,

  'apis-r-ex2': `import json
from urllib.request import urlopen

# TODO: busque os usuários e mostre total + 3 primeiros
url = "https://jsonplaceholder.typicode.com/users"
with urlopen(url) as resp:
    usuarios = json.loads(resp.read())

print(f"total: {len(usuarios)}")
for u in usuarios[:3]:
    print(f"  {u['name']} — {u['email']}")`,

  'apis-r-projeto': `import json
from urllib.request import urlopen

# TODO: conte os posts do usuário 1
url = "https://jsonplaceholder.typicode.com/posts"
with urlopen(url) as resp:
    posts = json.loads(resp.read())

do_usuario_1 = [p for p in posts if p["userId"] == 1]
print(f"posts totais: {len(posts)}")
print(f"do usuario 1: {len(do_usuario_1)}")`,

  // ── Lição 3: Erros (hands-on) ──────────────────────────────
  'apis-erros': `import json
from urllib.request import urlopen
from urllib.error import HTTPError, URLError

def get_json(url):
    try:
        with urlopen(url, timeout=10) as resp:
            return resp.status, json.loads(resp.read())
    except HTTPError as e:
        return e.code, {"erro": f"HTTP {e.code}"}
    except URLError:
        return 0, {"erro": "rede indisponivel"}

status, dados = get_json("https://jsonplaceholder.typicode.com/todos/1")
print(f"status: {status}")
print(f"titulo: {dados['title']}")`,

  'apis-e-ex1': `import json
from urllib.request import urlopen
from urllib.error import HTTPError, URLError

# TODO: cliente resiliente — trate HTTPError e URLError
def get_json(url):
    return 0, {"erro": "implemente"}

status, dados = get_json("https://jsonplaceholder.typicode.com/todos/1")
print(f"status: {status}")
print(f"titulo: {dados['title']}")`,

  'apis-e-ex2': `import json
from urllib.request import urlopen
from urllib.error import HTTPError

def get_json(url):
    try:
        with urlopen(url, timeout=10) as resp:
            return resp.status, json.loads(resp.read())
    except HTTPError as e:
        return e.code, {"erro": f"HTTP {e.code}"}

# TODO: busque um recurso inexistente e trate o 404
status, dados = get_json("https://jsonplaceholder.typicode.com/todos/999999")
print(f"status: {status}")
print(f"erro: {dados['erro']}")`,

  'apis-e-projeto': `import json
from urllib.request import urlopen

# TODO: cliente com retry (3 tentativas)
def get_json_com_retry(url, tentativas=3):
    for tentativa in range(tentativas):
        try:
            with urlopen(url, timeout=10) as resp:
                return resp.status, json.loads(resp.read())
        except Exception:
            if tentativa == tentativas - 1:
                return 0, {"erro": "falhou"}
    return 0, {"erro": "falhou"}

status, dados = get_json_com_retry("https://jsonplaceholder.typicode.com/todos/1")
print(f"status: {status}")
print(f"titulo: {dados['title']}")`,
}
