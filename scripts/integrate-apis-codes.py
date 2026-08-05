"""Integra APIS_CODES no initial-codes + teste + soluções (evita & no shell)."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { TESTES_CODES } from './testes-codes'", "import { TESTES_CODES } from './testes-codes'\nimport { APIS_CODES } from './apis-codes'")
src = src.replace("    TESTES_CODES[lessonSlug] ??", "    TESTES_CODES[lessonSlug] ??\n    APIS_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { TESTES_CODES } from '../testes-codes'", "import { TESTES_CODES } from '../testes-codes'\nimport { APIS_CODES } from '../apis-codes'")
t = t.replace("  'testes-t-projeto',\n]", "  'testes-t-projeto',\n  // Curso APIs & HTTP\n  'apis-json',\n  'apis-ex1',\n  'apis-ex2',\n  'apis-projeto',\n  'apis-requests',\n  'apis-r-ex1',\n  'apis-r-ex2',\n  'apis-r-projeto',\n  'apis-erros',\n  'apis-e-ex1',\n  'apis-e-ex2',\n  'apis-e-projeto',\n]")
t = t.replace("""    // Códigos do curso Testes começam com comentário/def/import
    for (const [slug, code] of Object.entries(TESTES_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/def em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|def |class |[a-zA-Z_])/)
    }""",
"""    // Códigos do curso Testes começam com comentário/def/import
    for (const [slug, code] of Object.entries(TESTES_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/def em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|def |class |[a-zA-Z_])/)
    }
    // Códigos do curso APIs começam com import
    for (const [slug, code] of Object.entries(APIS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")

# 3. soluções
s = open('lib/lessons/solutions.ts').read()
apis_solutions = '''
  // ── Curso APIs & HTTP ──────────────────────────────────────
  'apis-ex1': {
    explanation:
      'json.dumps serializa (Python → JSON string); json.loads desserializa (JSON → Python). true vira True.',
    code: `import json

usuario = {
    "id": 1,
    "nome": "Ana Silva",
    "email": "ana@empresa.com",
    "ativo": True,
}
texto = json.dumps(usuario, ensure_ascii=False)
print(f"JSON: {texto}")

de_volta = json.loads(texto)
print(f"nome: {de_volta['nome']}")
print(f"ativo: {de_volta['ativo']}")`,
  },
  'apis-ex2': {
    explanation:
      'json.loads numa lista JSON devolve uma lista Python de dicts — a forma típica de resposta de API.',
    code: `import json

resposta = '[{"id": 1, "nome": "Ana"}, {"id": 2, "nome": "Bob"}, {"id": 3, "nome": "Carol"}]'

dados = json.loads(resposta)
print(f"usuarios: {len(dados)}")
for u in dados:
    print(f"  {u['id']}: {u['nome']}")`,
  },
  'apis-projeto': {
    explanation:
      'Lista de dicts = tabela. sum com generator soma; max com key=lambda pega o dict de maior preço.',
    code: `import json

resposta = '[{"id": 1, "produto": "teclado", "preco": 120}, {"id": 2, "produto": "mouse", "preco": 60}, {"id": 3, "produto": "monitor", "preco": 800}]'

produtos = json.loads(resposta)
total = sum(p["preco"] for p in produtos)
print(f"produtos: {len(produtos)}")
print(f"total: R\${total:.0f}")
print(f"mais caro: {max(produtos, key=lambda p: p['preco'])['produto']}")`,
  },
  'apis-r-ex1': {
    explanation:
      'urlopen abre a conexão; resp.read() lê o corpo; json.loads converte. A API real responde com título e completed=False.',
    code: `import json
from urllib.request import urlopen

def buscar_json(url):
    with urlopen(url) as resp:
        return json.loads(resp.read())

url = "https://jsonplaceholder.typicode.com/todos/1"
dados = buscar_json(url)
print(f"titulo: {dados['title']}")
print(f"concluido: {dados['completed']}")`,
  },
  'apis-r-ex2': {
    explanation:
      'A API /users devolve 10 usuários reais (jsonplaceholder). O slice [:3] limita o print.',
    code: `import json
from urllib.request import urlopen

url = "https://jsonplaceholder.typicode.com/users"
with urlopen(url) as resp:
    usuarios = json.loads(resp.read())

print(f"total: {len(usuarios)}")
for u in usuarios[:3]:
    print(f"  {u['name']} — {u['email']}")`,
  },
  'apis-r-projeto': {
    explanation:
      'List comprehension filtra por userId == 1. 100 posts no total, 10 do usuário 1.',
    code: `import json
from urllib.request import urlopen

url = "https://jsonplaceholder.typicode.com/posts"
with urlopen(url) as resp:
    posts = json.loads(resp.read())

do_usuario_1 = [p for p in posts if p["userId"] == 1]
print(f"posts totais: {len(posts)}")
print(f"do usuario 1: {len(do_usuario_1)}")`,
  },
  'apis-e-ex1': {
    explanation:
      'Cliente resiliente: timeout evita travar; HTTPError captura 404/500; URLError captura falha de rede.',
    code: `import json
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
  },
  'apis-e-ex2': {
    explanation:
      'Recurso inexistente → HTTPError 404. O e.code captura o número — o programa não quebra.',
    code: `import json
from urllib.request import urlopen
from urllib.error import HTTPError

def get_json(url):
    try:
        with urlopen(url, timeout=10) as resp:
            return resp.status, json.loads(resp.read())
    except HTTPError as e:
        return e.code, {"erro": f"HTTP {e.code}"}

status, dados = get_json("https://jsonplaceholder.typicode.com/todos/999999")
print(f"status: {status}")
print(f"erro: {dados['erro']}")`,
  },
  'apis-e-projeto': {
    explanation:
      'Retry: tenta 3x; erros transitórios somem na segunda tentativa. Na última, retorna erro controlado.',
    code: `import json
from urllib.request import urlopen

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
  },
}
'''
idx = s.rindex('}\n\n/** Busca a solução')
s = s[:idx] + apis_solutions + s[idx:]
open('lib/lessons/solutions.ts', 'w').write(s)
print("soluções APIs adicionadas")
