/**
 * Códigos iniciais do curso "Grafos: BFS & DFS".
 * Python puro (collections/heapq) — roda no sandbox ml-base.
 * Chaves únicas por lição (prefixo: grafos / grafos-d / grafos-a).
 */

export const GRAFOS_CODES: Record<string, string> = {
  // ── Lição 1: BFS (hands-on) ────────────────────────────────
  'grafos-bfs': `from collections import deque

# BFS: percurso em largura (por níveis)
def bfs(grafo, inicio):
    visitados = set()
    fila = deque([inicio])
    ordem = []
    while fila:
        no = fila.popleft()
        if no in visitados:
            continue
        visitados.add(no)
        ordem.append(no)
        for vizinho in grafo.get(no, []):
            if vizinho not in visitados:
                fila.append(vizinho)
    return ordem

grafo = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C"],
}
print(bfs(grafo, "A"))`,

  'grafos-ex1': `from collections import deque

# TODO: percurso BFS a partir de A
def bfs(grafo, inicio):
    visitados = set()
    fila = deque([inicio])
    ordem = []
    while fila:
        no = fila.popleft()
        if no in visitados:
            continue
        visitados.add(no)
        ordem.append(no)
        for vizinho in grafo.get(no, []):
            if vizinho not in visitados:
                fila.append(vizinho)
    return ordem

grafo = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C"],
}
print(bfs(grafo, "A"))`,

  'grafos-ex2': `from collections import deque

# TODO: distância mínima de A até E
def distancia(grafo, inicio, alvo):
    fila = deque([(inicio, 0)])
    visitados = set()
    while fila:
        no, dist = fila.popleft()
        if no == alvo:
            return dist
        if no in visitados:
            continue
        visitados.add(no)
        for vizinho in grafo.get(no, []):
            if vizinho not in visitados:
                fila.append((vizinho, dist + 1))
    return -1

grafo = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C", "E"],
    "E": ["D"],
}
print(f"A ate E: {distancia(grafo, 'A', 'E')}")`,

  'grafos-projeto': `from collections import deque

# TODO: recomendação em nível 2 (grafo social)
def recomendacoes(grafo, inicio, nivel):
    fila = deque([(inicio, 0)])
    visitados = set()
    resultado = []
    while fila:
        no, dist = fila.popleft()
        if no in visitados:
            continue
        visitados.add(no)
        if dist == nivel:
            resultado.append(no)
        for vizinho in grafo.get(no, []):
            if vizinho not in visitados:
                fila.append((vizinho, dist + 1))
    return sorted(resultado)

grafo = {
    "ana": ["bob", "carol"],
    "bob": ["ana", "duda"],
    "carol": ["ana", "duda"],
    "duda": ["bob", "carol", "edu"],
    "edu": ["duda"],
}
print(f"nivel 2: {recomendacoes(grafo, 'ana', 2)}")`,

  // ── Lição 2: DFS (hands-on) ────────────────────────────────
  'grafos-dfs': `# DFS: percurso em profundidade (recursivo)
def dfs(grafo, no, visitados=None):
    if visitados is None:
        visitados = set()
    visitados.add(no)
    ordem = [no]
    for vizinho in grafo.get(no, []):
        if vizinho not in visitados:
            ordem.extend(dfs(grafo, vizinho, visitados))
    return ordem

grafo = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C"],
}
print(dfs(grafo, "A"))`,

  'grafos-d-ex1': `# TODO: DFS recursivo a partir de A
def dfs(grafo, no, visitados=None):
    if visitados is None:
        visitados = set()
    visitados.add(no)
    ordem = [no]
    for vizinho in grafo.get(no, []):
        if vizinho not in visitados:
            ordem.extend(dfs(grafo, vizinho, visitados))
    return ordem

grafo = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C"],
}
print(dfs(grafo, "A"))`,

  'grafos-d-ex2': `# TODO: existe caminho entre nós?
def existe_caminho(grafo, inicio, alvo, visitados=None):
    if visitados is None:
        visitados = set()
    if inicio == alvo:
        return True
    visitados.add(inicio)
    for vizinho in grafo.get(inicio, []):
        if vizinho not in visitados:
            if existe_caminho(grafo, vizinho, alvo, visitados):
                return True
    return False

grafo = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": [],
    "D": ["E"],
    "E": [],
    "F": [],
}
print(f"A->E: {existe_caminho(grafo, 'A', 'E')}")
print(f"F->A: {existe_caminho(grafo, 'F', 'A')}")`,

  'grafos-d-projeto': `# TODO: componentes conexos
def componentes(grafo):
    visitados = set()
    total = 0
    for no in grafo:
        if no not in visitados:
            total += 1
            pilha = [no]
            while pilha:
                atual = pilha.pop()
                if atual in visitados:
                    continue
                visitados.add(atual)
                for vizinho in grafo[atual]:
                    if vizinho not in visitados:
                        pilha.append(vizinho)
    return total

grafo = {
    "A": ["B"], "B": ["A", "C"], "C": ["B"],
    "D": ["E"], "E": ["D"],
    "F": [],
}
print(f"componentes: {componentes(grafo)}")`,

  // ── Lição 3: Dijkstra e topológica (hands-on) ──────────────
  'grafos-avancado': `from collections import deque

# Ordenação topológica (Kahn) — aresta u->v = "u antes de v"
def ordem_topologica(grafo):
    grau = {no: 0 for no in grafo}
    for no in grafo:
        for vizinho in grafo[no]:
            grau[vizinho] += 1
    fila = deque([no for no in grafo if grau[no] == 0])
    ordem = []
    while fila:
        no = fila.popleft()
        ordem.append(no)
        for vizinho in grafo[no]:
            grau[vizinho] -= 1
            if grau[vizinho] == 0:
                fila.append(vizinho)
    return ordem

grafo = {
    "python": ["pip"],
    "pip": ["pandas"],
    "pandas": ["app"],
    "app": [],
}
print(ordem_topologica(grafo))`,

  'grafos-a-ex1': `from collections import deque

# TODO: ordenação topológica
def ordem_topologica(grafo):
    grau = {no: 0 for no in grafo}
    for no in grafo:
        for vizinho in grafo[no]:
            grau[vizinho] += 1
    fila = deque([no for no in grafo if grau[no] == 0])
    ordem = []
    while fila:
        no = fila.popleft()
        ordem.append(no)
        for vizinho in grafo[no]:
            grau[vizinho] -= 1
            if grau[vizinho] == 0:
                fila.append(vizinho)
    return ordem

grafo = {
    "python": ["pip"],
    "pip": ["pandas"],
    "pandas": ["app"],
    "app": [],
}
print(ordem_topologica(grafo))`,

  'grafos-a-ex2': `import heapq

# TODO: Dijkstra de A até D
def dijkstra(grafo, inicio):
    dist = {no: float("inf") for no in grafo}
    dist[inicio] = 0
    fila = [(0, inicio)]
    while fila:
        d, no = heapq.heappop(fila)
        if d > dist[no]:
            continue
        for vizinho, peso in grafo[no]:
            novo = d + peso
            if novo < dist[vizinho]:
                dist[vizinho] = novo
                heapq.heappush(fila, (novo, vizinho))
    return dist

grafo = {
    "A": [("B", 1), ("C", 4)],
    "B": [("C", 2), ("D", 5)],
    "C": [("D", 1)],
    "D": [],
}
d = dijkstra(grafo, "A")
print(f"A->D: {d['D']}")`,

  'grafos-a-projeto': `import heapq

# TODO: menor distância SP até ES
def dijkstra(grafo, inicio, alvo):
    dist = {no: float("inf") for no in grafo}
    dist[inicio] = 0
    fila = [(0, inicio)]
    while fila:
        d, no = heapq.heappop(fila)
        if no == alvo:
            return d
        if d > dist[no]:
            continue
        for vizinho, peso in grafo[no]:
            novo = d + peso
            if novo < dist[vizinho]:
                dist[vizinho] = novo
                heapq.heappush(fila, (novo, vizinho))
    return -1

cidades = {
    "SP": [("RJ", 400), ("MG", 500)],
    "RJ": [("SP", 400), ("ES", 500)],
    "MG": [("SP", 500), ("ES", 300)],
    "ES": [("RJ", 500), ("MG", 300)],
}
print(f"SP->ES: {dijkstra(cidades, 'SP', 'ES')}")`,
}
