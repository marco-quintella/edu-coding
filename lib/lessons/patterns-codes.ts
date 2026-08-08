/**
 * Códigos iniciais do curso "Design Patterns em Python".
 * Python puro — roda no sandbox ml-base.
 * Chaves únicas por lição (prefixo: patterns / patterns-c / patterns-e).
 */

export const PATTERNS_CODES: Record<string, string> = {
  // ── Lição 1: Criacionais (hands-on) ─────────────────────────
  'patterns-criacionais': `# Singleton: uma única instância da classe
class Config:
    _instancia = None

    def __new__(cls):
        if cls._instancia is None:
            cls._instancia = super().__new__(cls)
            cls._instancia.host = "localhost"
        return cls._instancia

c1 = Config()
c2 = Config()
print(f"mesma instancia: {c1 is c2}")
print(f"host: {c1.host}")`,

  'patterns-ex1': `# TODO: confirme o singleton
class Config:
    _instancia = None

    def __new__(cls):
        if cls._instancia is None:
            cls._instancia = super().__new__(cls)
            cls._instancia.host = "localhost"
        return cls._instancia

c1 = Config()
c2 = Config()
print(f"mesma instancia: {c1 is c2}")
print(f"host: {c1.host}")`,

  'patterns-ex2': `# TODO: factory de pagamentos
class Pagamento:
    def __init__(self, tipo):
        self.tipo = tipo

def criar_pagamento(tipo):
    if tipo == "pix":
        return Pagamento("pix")
    elif tipo == "cartao":
        return Pagamento("cartao")
    return Pagamento("desconhecido")

p1 = criar_pagamento("pix")
p2 = criar_pagamento("cartao")
print(f"p1: {p1.tipo}")
print(f"p2: {p2.tipo}")`,

  'patterns-projeto': `# TODO: factory de conexões
class Conexao:
    def __init__(self, banco):
        self.banco = banco

def conectar(banco):
    if banco == "postgres":
        return Conexao("postgres")
    elif banco == "mysql":
        return Conexao("mysql")
    elif banco == "sqlite":
        return Conexao("sqlite")
    return None

print(f"pg: {conectar('postgres').banco}")
print(f"sqlite: {conectar('sqlite').banco}")`,

  // ── Lição 2: Comportamentais (hands-on) ─────────────────────
  'patterns-comportamentais': `# Strategy: trocar o algoritmo em runtime
class FreteNormal:
    def calcular(self, peso):
        return peso * 5

class FreteExpresso:
    def calcular(self, peso):
        return peso * 15

class Pedido:
    def __init__(self, frete):
        self.frete = frete
    def custo_frete(self, peso):
        return self.frete.calcular(peso)

pedido = Pedido(FreteNormal())
print(f"normal: {pedido.custo_frete(10)}")
pedido.frete = FreteExpresso()
print(f"expresso: {pedido.custo_frete(10)}")`,

  'patterns-c-ex1': `# TODO: strategy de frete
class FreteNormal:
    def calcular(self, peso):
        return peso * 5

class FreteExpresso:
    def calcular(self, peso):
        return peso * 15

class Pedido:
    def __init__(self, frete):
        self.frete = frete
    def custo_frete(self, peso):
        return self.frete.calcular(peso)

pedido = Pedido(FreteNormal())
print(f"normal: {pedido.custo_frete(10)}")
pedido.frete = FreteExpresso()
print(f"expresso: {pedido.custo_frete(10)}")`,

  'patterns-c-ex2': `# TODO: observer com inscritos
class Canal:
    def __init__(self):
        self.inscritos = []
    def inscrever(self, nome):
        self.inscritos.append(nome)
    def notificar(self, msg):
        return [f"{nome} recebeu: {msg}" for nome in self.inscritos]

canal = Canal()
canal.inscrever("ana")
canal.inscrever("bob")
print(f"inscritos: {len(canal.inscritos)}")
print(canal.notificar("novo video!")[0])`,

  'patterns-c-projeto': `# TODO: sistema de alertas (observer)
class Sistema:
    def __init__(self):
        self.listeners = []
    def registrar(self, nome):
        self.listeners.append(nome)
    def alerta(self, msg):
        return [f"{l}: {msg}" for l in self.listeners]

sys = Sistema()
sys.registrar("email")
sys.registrar("sms")
sys.registrar("push")
print(f"canais: {len(sys.listeners)}")
print(sys.alerta("servidor caiu!")[2])`,

  // ── Lição 3: Estruturais (hands-on) ─────────────────────────
  'patterns-estruturais': `# Decorator: adicionar comportamento sem mudar a classe
def com_log(func):
    def wrapper(*args, **kwargs):
        resultado = func(*args, **kwargs)
        return f"log[{resultado}]"
    return wrapper

@com_log
def soma(a, b):
    return a + b

print(soma(2, 3))
print(soma(10, 5))`,

  'patterns-e-ex1': `# TODO: decorator com log
def com_log(func):
    def wrapper(*args, **kwargs):
        resultado = func(*args, **kwargs)
        return f"log[{resultado}]"
    return wrapper

@com_log
def soma(a, b):
    return a + b

print(soma(2, 3))
print(soma(10, 5))`,

  'patterns-e-ex2': `# TODO: iterator pulando de 2 em 2
class Contagem:
    def __init__(self, maximo):
        self.maximo = maximo
    def __iter__(self):
        self.atual = 0
        return self
    def __next__(self):
        if self.atual >= self.maximo:
            raise StopIteration
        valor = self.atual
        self.atual += 2
        return valor

for n in Contagem(8):
    print(n, end=" ")
print()`,

  'patterns-e-projeto': `# TODO: decorator uppercase
def uppercase(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

@uppercase
def saudacao(nome):
    return f"ola {nome}"

print(saudacao("ana"))
print(saudacao("bob"))`,
}
