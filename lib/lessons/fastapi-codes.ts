/**
 * Códigos iniciais do curso "APIs com FastAPI".
 * fastapi + TestClient (instalado no checkpoint ml-base).
 * Chaves únicas por lição (prefixo: fastapi / fastapi-r / fastapi-p).
 */

export const FASTAPI_CODES: Record<string, string> = {
  // ── Lição 1: Primeiros passos (hands-on) ───────────────────
  'fastapi-primeiros-passos': `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/")
def raiz():
    return {"mensagem": "olá fastapi"}

client = TestClient(app)
r = client.get("/")
print(f"status: {r.status_code}")
print(f"mensagem: {r.json()['mensagem']}")`,

  'fastapi-ex1': `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# TODO: rota / devolvendo {"mensagem": "olá fastapi"}
@app.get("/")
def raiz():
    return {"mensagem": "olá fastapi"}

client = TestClient(app)
r = client.get("/")
print(f"status: {r.status_code}")
print(f"mensagem: {r.json()['mensagem']}")`,

  'fastapi-ex2': `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/")
def raiz():
    return {"ok": True}

client = TestClient(app)
r1 = client.get("/")
r2 = client.get("/qualquer-coisa")
print(f"raiz: {r1.status_code}")
print(f"desconhecida: {r2.status_code}")`,

  'fastapi-projeto': `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# TODO: rotas / e /saude
@app.get("/")
def raiz():
    return {"servico": "api", "versao": "1.0"}

@app.get("/saude")
def saude():
    return {"status": "ok"}

client = TestClient(app)
r = client.get("/saude")
print(f"status: {r.status_code}")
print(f"saude: {r.json()['status']}")`,

  // ── Lição 2: Rotas e path params (hands-on) ────────────────
  'fastapi-rotas': `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/usuarios/{usuario_id}")
def buscar(usuario_id: int):
    usuarios = {1: "Ana", 2: "Bob"}
    if usuario_id not in usuarios:
        return {"erro": "usuario nao existe"}
    return {"id": usuario_id, "nome": usuarios[usuario_id]}

client = TestClient(app)
r = client.get("/usuarios/2")
print(f"status: {r.status_code}")
print(f"nome: {r.json()['nome']}")`,

  'fastapi-r-ex1': `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# TODO: GET /usuarios devolvendo a lista
@app.get("/usuarios")
def listar():
    return [
        {"id": 1, "nome": "Ana"},
        {"id": 2, "nome": "Bob"},
    ]

client = TestClient(app)
r = client.get("/usuarios")
dados = r.json()
print(f"status: {r.status_code}")
print(f"usuarios: {len(dados)}")
print(f"primeiro: {dados[0]['nome']}")`,

  'fastapi-r-ex2': `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# TODO: GET /usuarios/{usuario_id} buscando pelo id
@app.get("/usuarios/{usuario_id}")
def buscar(usuario_id: int):
    usuarios = {1: "Ana", 2: "Bob"}
    if usuario_id not in usuarios:
        return {"erro": "usuario nao existe"}
    return {"id": usuario_id, "nome": usuarios[usuario_id]}

client = TestClient(app)
r = client.get("/usuarios/2")
print(f"status: {r.status_code}")
print(f"nome: {r.json()['nome']}")`,

  'fastapi-r-projeto': `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# TODO: /produtos (lista) e /produtos/{produto_id} (busca)
produtos = [
    {"id": 1, "nome": "teclado", "preco": 120},
    {"id": 2, "nome": "mouse", "preco": 60},
    {"id": 3, "nome": "monitor", "preco": 800},
]

@app.get("/produtos")
def listar():
    return produtos

@app.get("/produtos/{produto_id}")
def buscar(produto_id: int):
    for p in produtos:
        if p["id"] == produto_id:
            return p
    return {"erro": "produto nao existe"}

client = TestClient(app)
todos = client.get("/produtos").json()
p = client.get("/produtos/3").json()
print(f"produtos: {len(todos)}")
print(f"mais caro: {p['nome']}")`,

  // ── Lição 3: POST e Pydantic (hands-on) ────────────────────
  'fastapi-post': `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()

class EchoRequest(BaseModel):
    nome: str

@app.post("/echo")
def echo(req: EchoRequest):
    return {"recebido": req.nome}

client = TestClient(app)
r = client.post("/echo", json={"nome": "Ana"})
print(f"status: {r.status_code}")
print(f"recebido: {r.json()['recebido']}")`,

  'fastapi-p-ex1': `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()

# TODO: POST /echo com modelo Pydantic
class EchoRequest(BaseModel):
    nome: str

@app.post("/echo")
def echo(req: EchoRequest):
    return {"recebido": req.nome}

client = TestClient(app)
r = client.post("/echo", json={"nome": "Ana"})
print(f"status: {r.status_code}")
print(f"recebido: {r.json()['recebido']}")`,

  'fastapi-p-ex2': `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

# TODO: GET /soma com query params
@app.get("/soma")
def soma(a: int, b: int):
    return {"resultado": a + b}

client = TestClient(app)
r = client.get("/soma", params={"a": 10, "b": 5})
print(f"status: {r.status_code}")
print(f"resultado: {r.json()['resultado']}")`,

  'fastapi-p-projeto': `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()

# TODO: POST /cadastro com regra de maioridade
class CadastroRequest(BaseModel):
    nome: str
    idade: int

@app.post("/cadastro")
def cadastro(req: CadastroRequest):
    if req.idade < 18:
        return {"erro": "menor de idade"}
    return {"ok": True, "nome": req.nome}

client = TestClient(app)
r1 = client.post("/cadastro", json={"nome": "Ana", "idade": 25})
r2 = client.post("/cadastro", json={"nome": "Bob", "idade": 15})
print(f"ana: {r1.json()['ok']}")
print(f"bob: {r2.json()['erro']}")`,
}
