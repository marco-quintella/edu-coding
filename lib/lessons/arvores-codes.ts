/**
 * Códigos iniciais do curso "Árvores Binárias".
 * Python puro — roda no sandbox ml-base.
 * Chaves únicas por lição (prefixo: arvores / arvores-p / arvores-o).
 */

export const ARVORES_CODES: Record<string, string> = {
  // ── Lição 1: BST (hands-on) ────────────────────────────────
  'arvores-bst': `# BST: inserção e busca
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

class BST:
    def __init__(self):
        self.raiz = None

    def inserir(self, valor):
        if self.raiz is None:
            self.raiz = No(valor)
            return
        atual = self.raiz
        while True:
            if valor < atual.valor:
                if atual.esq is None:
                    atual.esq = No(valor)
                    return
                atual = atual.esq
            else:
                if atual.dir is None:
                    atual.dir = No(valor)
                    return
                atual = atual.dir

    def buscar(self, valor):
        atual = self.raiz
        while atual:
            if valor == atual.valor:
                return True
            atual = atual.esq if valor < atual.valor else atual.dir
        return False

bst = BST()
for v in [50, 30, 70, 20, 40]:
    bst.inserir(v)

print(f"busca 40: {bst.buscar(40)}")
print(f"busca 99: {bst.buscar(99)}")`,

  'arvores-ex1': `# TODO: busque no BST
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

class BST:
    def __init__(self):
        self.raiz = None

    def inserir(self, valor):
        if self.raiz is None:
            self.raiz = No(valor)
            return
        atual = self.raiz
        while True:
            if valor < atual.valor:
                if atual.esq is None:
                    atual.esq = No(valor)
                    return
                atual = atual.esq
            else:
                if atual.dir is None:
                    atual.dir = No(valor)
                    return
                atual = atual.dir

    def buscar(self, valor):
        atual = self.raiz
        while atual:
            if valor == atual.valor:
                return True
            atual = atual.esq if valor < atual.valor else atual.dir
        return False

bst = BST()
for v in [50, 30, 70, 20, 40]:
    bst.inserir(v)

print(f"busca 40: {bst.buscar(40)}")
print(f"busca 99: {bst.buscar(99)}")`,

  'arvores-ex2': `# TODO: mínimo e máximo
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

def inserir(raiz, valor):
    if raiz is None:
        return No(valor)
    if valor < raiz.valor:
        raiz.esq = inserir(raiz.esq, valor)
    else:
        raiz.dir = inserir(raiz.dir, valor)
    return raiz

def minimo(raiz):
    atual = raiz
    while atual.esq:
        atual = atual.esq
    return atual.valor

def maximo(raiz):
    atual = raiz
    while atual.dir:
        atual = atual.dir
    return atual.valor

raiz = None
for v in [50, 30, 70, 20, 40, 60, 80]:
    raiz = inserir(raiz, v)

print(f"min: {minimo(raiz)}")
print(f"max: {maximo(raiz)}")`,

  'arvores-projeto': `# TODO: valide o BST
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

def inserir(raiz, valor):
    if raiz is None:
        return No(valor)
    if valor < raiz.valor:
        raiz.esq = inserir(raiz.esq, valor)
    else:
        raiz.dir = inserir(raiz.dir, valor)
    return raiz

def validar(raiz, minimo=float("-inf"), maximo=float("inf")):
    if raiz is None:
        return True
    if not (minimo < raiz.valor < maximo):
        return False
    return validar(raiz.esq, minimo, raiz.valor) and validar(raiz.dir, raiz.valor, maximo)

raiz = None
for v in [50, 30, 70, 20, 40]:
    raiz = inserir(raiz, v)

print(f"valida: {validar(raiz)}")`,

  // ── Lição 2: Percursos (hands-on) ──────────────────────────
  'arvores-percursos': `# Percurso em ordem (in-order): esq, raiz, dir
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

def inserir(raiz, valor):
    if raiz is None:
        return No(valor)
    if valor < raiz.valor:
        raiz.esq = inserir(raiz.esq, valor)
    else:
        raiz.dir = inserir(raiz.dir, valor)
    return raiz

def em_ordem(raiz):
    if raiz is None:
        return []
    return em_ordem(raiz.esq) + [raiz.valor] + em_ordem(raiz.dir)

raiz = None
for v in [50, 30, 70, 20, 40, 60, 80]:
    raiz = inserir(raiz, v)

print(em_ordem(raiz))`,

  'arvores-p-ex1': `# TODO: em-ordem
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

def inserir(raiz, valor):
    if raiz is None:
        return No(valor)
    if valor < raiz.valor:
        raiz.esq = inserir(raiz.esq, valor)
    else:
        raiz.dir = inserir(raiz.dir, valor)
    return raiz

def em_ordem(raiz):
    if raiz is None:
        return []
    return em_ordem(raiz.esq) + [raiz.valor] + em_ordem(raiz.dir)

raiz = None
for v in [50, 30, 70, 20, 40, 60, 80]:
    raiz = inserir(raiz, v)

print(em_ordem(raiz))`,

  'arvores-p-ex2': `# TODO: pré-ordem
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

def inserir(raiz, valor):
    if raiz is None:
        return No(valor)
    if valor < raiz.valor:
        raiz.esq = inserir(raiz.esq, valor)
    else:
        raiz.dir = inserir(raiz.dir, valor)
    return raiz

def pre_ordem(raiz):
    if raiz is None:
        return []
    return [raiz.valor] + pre_ordem(raiz.esq) + pre_ordem(raiz.dir)

raiz = None
for v in [50, 30, 70, 20, 40]:
    raiz = inserir(raiz, v)

print(pre_ordem(raiz))`,

  'arvores-p-projeto': `# TODO: pós-ordem
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

def inserir(raiz, valor):
    if raiz is None:
        return No(valor)
    if valor < raiz.valor:
        raiz.esq = inserir(raiz.esq, valor)
    else:
        raiz.dir = inserir(raiz.dir, valor)
    return raiz

def pos_ordem(raiz):
    if raiz is None:
        return []
    return pos_ordem(raiz.esq) + pos_ordem(raiz.dir) + [raiz.valor]

raiz = None
for v in [50, 30, 70, 20, 40]:
    raiz = inserir(raiz, v)

print(pos_ordem(raiz))`,

  // ── Lição 3: Operações (hands-on) ──────────────────────────
  'arvores-operacoes': `# Altura da árvore
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

def inserir(raiz, valor):
    if raiz is None:
        return No(valor)
    if valor < raiz.valor:
        raiz.esq = inserir(raiz.esq, valor)
    else:
        raiz.dir = inserir(raiz.dir, valor)
    return raiz

def altura(raiz):
    if raiz is None:
        return 0
    return 1 + max(altura(raiz.esq), altura(raiz.dir))

raiz = None
for v in [50, 30, 70, 20, 40, 60, 80]:
    raiz = inserir(raiz, v)

print(f"altura: {altura(raiz)}")`,

  'arvores-o-ex1': `# TODO: altura
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

def inserir(raiz, valor):
    if raiz is None:
        return No(valor)
    if valor < raiz.valor:
        raiz.esq = inserir(raiz.esq, valor)
    else:
        raiz.dir = inserir(raiz.dir, valor)
    return raiz

def altura(raiz):
    if raiz is None:
        return 0
    return 1 + max(altura(raiz.esq), altura(raiz.dir))

raiz = None
for v in [50, 30, 70, 20, 40, 60, 80]:
    raiz = inserir(raiz, v)

print(f"altura: {altura(raiz)}")`,

  'arvores-o-ex2': `# TODO: contagem de nós
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

def inserir(raiz, valor):
    if raiz is None:
        return No(valor)
    if valor < raiz.valor:
        raiz.esq = inserir(raiz.esq, valor)
    else:
        raiz.dir = inserir(raiz.dir, valor)
    return raiz

def contar(raiz):
    if raiz is None:
        return 0
    return 1 + contar(raiz.esq) + contar(raiz.dir)

raiz = None
for v in [50, 30, 70, 20, 40, 60, 80]:
    raiz = inserir(raiz, v)

print(f"nos: {contar(raiz)}")`,

  'arvores-o-projeto': `# TODO: espelhar a árvore
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esq = None
        self.dir = None

def inserir(raiz, valor):
    if raiz is None:
        return No(valor)
    if valor < raiz.valor:
        raiz.esq = inserir(raiz.esq, valor)
    else:
        raiz.dir = inserir(raiz.dir, valor)
    return raiz

def espelhar(raiz):
    if raiz is None:
        return None
    raiz.esq, raiz.dir = raiz.dir, raiz.esq
    espelhar(raiz.esq)
    espelhar(raiz.dir)
    return raiz

def em_ordem(raiz):
    if raiz is None:
        return []
    return em_ordem(raiz.esq) + [raiz.valor] + em_ordem(raiz.dir)

raiz = None
for v in [50, 30, 70, 20, 40]:
    raiz = inserir(raiz, v)

espelhar(raiz)
print(em_ordem(raiz))`,
}
