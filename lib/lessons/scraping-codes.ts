/**
 * Códigos iniciais do curso "Web Scraping com Python".
 * stdlib (re/urllib/json) — roda no sandbox ml-base (tem internet).
 * Chaves únicas por lição (prefixo: scraping / scraping-a / scraping-p).
 */

export const SCRAPING_CODES: Record<string, string> = {
  // ── Lição 1: HTML (hands-on) ───────────────────────────────
  'scraping-html': `import re

# HTML de exemplo (página de produtos)
html = """<html><body>
<h1>Loja</h1>
<div class="produto">teclado - R$ 120</div>
<div class="produto">mouse - R$ 60</div>
<div class="produto">monitor - R$ 800</div>
</body></html>"""

# Extrair os produtos com regex
produtos = re.findall(r'class="produto">([^<]+)<', html)
print(f"produtos: {len(produtos)}")
print(f"primeiro: {produtos[0]}")`,

  'scraping-ex1': `import re

html = """<html><body>
<h1>Loja</h1>
<div class="produto">teclado - R$ 120</div>
<div class="produto">mouse - R$ 60</div>
<div class="produto">monitor - R$ 800</div>
</body></html>"""

# TODO: extraia os produtos com regex
produtos = re.findall(r'class="produto">([^<]+)<', html)
print(f"produtos: {len(produtos)}")
print(f"primeiro: {produtos[0]}")`,

  'scraping-ex2': `import re

html = """<html><body>
<a href="/produto/1">Teclado</a>
<a href="/produto/2">Mouse</a>
<a href="/contato">Contato</a>
</body></html>"""

# TODO: extraia os links e filtre os de produto
links = re.findall(r'href="([^"]+)"', html)
produtos = [l for l in links if l.startswith("/produto")]
print(f"links: {len(links)}")
print(f"produtos: {produtos}")`,

  'scraping-projeto': `import re

html = """<html><body>
<table>
<tr><td>teclado</td><td>120</td></tr>
<tr><td>mouse</td><td>60</td></tr>
<tr><td>monitor</td><td>800</td></tr>
</table>
</body></html>"""

# TODO: extraia as linhas da tabela e some os preços
linhas = re.findall(r"<tr><td>([^<]+)</td><td>(\\d+)</td></tr>", html)
total = sum(int(preco) for _, preco in linhas)
print(f"itens: {len(linhas)}")
print(f"total: R\${total}")`,

  // ── Lição 2: API (hands-on) ────────────────────────────────
  'scraping-api': `import urllib.request
import json

# Consumir API pública e extrair dados
url = "https://jsonplaceholder.typicode.com/users"
with urllib.request.urlopen(url, timeout=10) as resp:
    usuarios = json.loads(resp.read())

nomes = [u["name"] for u in usuarios]
print(f"usuarios: {len(nomes)}")
print(f"primeiro: {nomes[0]}")`,

  'scraping-a-ex1': `import urllib.request
import json

# TODO: colete os usuários e liste os nomes
url = "https://jsonplaceholder.typicode.com/users"
with urllib.request.urlopen(url, timeout=10) as resp:
    usuarios = json.loads(resp.read())

nomes = [u["name"] for u in usuarios]
print(f"usuarios: {len(nomes)}")
print(f"primeiro: {nomes[0]}")`,

  'scraping-a-ex2': `import urllib.request
import json

# TODO: extraia os emails dos usuários
url = "https://jsonplaceholder.typicode.com/users"
with urllib.request.urlopen(url, timeout=10) as resp:
    usuarios = json.loads(resp.read())

emails = [u["email"] for u in usuarios]
print(f"emails: {len(emails)}")
print(f"dominio comum: {'@' in emails[0]}")`,

  'scraping-a-projeto': `import urllib.request
import json

# TODO: filtre os usuários com email .biz
url = "https://jsonplaceholder.typicode.com/users"
with urllib.request.urlopen(url, timeout=10) as resp:
    usuarios = json.loads(resp.read())

biz = [u for u in usuarios if u["email"].endswith(".biz")]
print(f"biz: {len(biz)}")
print(f"primeiro: {biz[0]['name']}")`,

  // ── Lição 3: Pipeline (hands-on) ───────────────────────────
  'scraping-pipeline': `import urllib.request
import json

# Pipeline: coletar posts, contar por usuário
url = "https://jsonplaceholder.typicode.com/posts"
with urllib.request.urlopen(url, timeout=10) as resp:
    posts = json.loads(resp.read())

por_usuario = {}
for p in posts:
    por_usuario[p["userId"]] = por_usuario.get(p["userId"], 0) + 1

print(f"posts: {len(posts)}")
print(f"usuario 1: {por_usuario[1]}")`,

  'scraping-p-ex1': `import urllib.request
import json

# TODO: conte os posts por usuário
url = "https://jsonplaceholder.typicode.com/posts"
with urllib.request.urlopen(url, timeout=10) as resp:
    posts = json.loads(resp.read())

por_usuario = {}
for p in posts:
    por_usuario[p["userId"]] = por_usuario.get(p["userId"], 0) + 1

print(f"posts: {len(posts)}")
print(f"usuario 1: {por_usuario[1]}")`,

  'scraping-p-ex2': `import urllib.request
import json

# TODO: ache o post com o menor body
url = "https://jsonplaceholder.typicode.com/posts"
with urllib.request.urlopen(url, timeout=10) as resp:
    posts = json.loads(resp.read())

mais_curto = min(posts, key=lambda p: len(p["body"]))
print(f"posts: {len(posts)}")
print(f"mais curto: {len(mais_curto['body'])} chars")`,

  'scraping-p-projeto': `import urllib.request
import json

# TODO: conte os todos concluídos
url = "https://jsonplaceholder.typicode.com/todos"
with urllib.request.urlopen(url, timeout=10) as resp:
    todos = json.loads(resp.read())

concluidos = [t for t in todos if t["completed"]]
print(f"todos: {len(todos)}")
print(f"concluidos: {len(concluidos)}")`,
}
