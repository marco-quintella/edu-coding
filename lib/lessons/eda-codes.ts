/**
 * Códigos iniciais do curso "Estruturas de Dados & Algoritmos".
 * Python puro — roda no sandbox ml-base sem dependências extras.
 * Chaves únicas por lição (prefixo: eda / eda-h / eda-o).
 */

export const EDA_CODES: Record<string, string> = {
  // ── Lição 1: Busca (hands-on) ──────────────────────────────
  'eda-busca': `# Busca linear — percorre tudo (O(n))
def busca_linear(lista, alvo):
    for i, v in enumerate(lista):
        if v == alvo:
            return i
    return -1

numeros = list(range(1, 101))
print(f"linear: indice {busca_linear(numeros, 73)}")`,

  'eda-ex1': `# TODO: implemente a busca binária (lista ordenada, O(log n))
# Dica: while esq <= dir_ com meio = (esq + dir_) // 2
def busca_binaria(lista, alvo):
    esq, dir_ = 0, len(lista) - 1
    passos = 0
    while esq <= dir_:
        passos += 1
        meio = (esq + dir_) // 2
        if lista[meio] == alvo:
            return meio, passos
        elif lista[meio] < alvo:
            esq = meio + 1
        else:
            dir_ = meio - 1
    return -1, passos

numeros = list(range(1, 101))  # 1..100
indice, passos = busca_binaria(numeros, 73)
print(f"encontrado no indice {indice}")
print(f"passos: {passos}")`,

  'eda-ex2': `# TODO: compare busca linear vs binária no pior caso (último item)
# Dica: linear percorre tudo; binária ~10 passos em 1000 itens
def busca_binaria(lista, alvo):
    esq, dir_ = 0, len(lista) - 1
    passos = 0
    while esq <= dir_:
        passos += 1
        meio = (esq + dir_) // 2
        if lista[meio] == alvo:
            return meio, passos
        elif lista[meio] < alvo:
            esq = meio + 1
        else:
            dir_ = meio - 1
    return -1, passos

N = 1000
numeros = list(range(N))
alvo = N - 1

passos_linear = 0
for i, v in enumerate(numeros):
    passos_linear += 1
    if v == alvo:
        break

_, passos_binaria = busca_binaria(numeros, alvo)
print(f"linear: {passos_linear} passos")
print(f"binaria: {passos_binaria} passos")
print(f"binaria muito mais rapida: {passos_binaria < passos_linear}")`,

  'eda-projeto': `# TODO: verifique se a palavra é palíndromo (ignora maiúsculas/espaços)
# Dica: s.lower().replace(" ", "") comparado com s[::-1]
def eh_palindromo(s):
    return False

print(f"'arara': {eh_palindromo('arara')}")
print(f"'Ana': {eh_palindromo('Ana')}")
print(f"'python': {eh_palindromo('python')}")`,

  // ── Lição 2: Hash tables (hands-on) ────────────────────────
  'eda-hash': `# Hash table: busca O(1) médio
vistos = {}
nums = [2, 7, 11, 15]
alvo = 9

for i, n in enumerate(nums):
    falta = alvo - n
    if falta in vistos:
        print(f"indices: [{vistos[falta]}, {i}]")
    vistos[n] = i`,

  'eda-h-ex1': `# TODO: Two-Sum com dict — O(n) em vez de O(n²)
# Dica: vistos[n] = i; cheque "alvo - n in vistos"
def dois_soma(nums, alvo):
    return []

nums = [2, 7, 11, 15]
print(f"indices: {dois_soma(nums, 9)}")
nums2 = [3, 2, 4]
print(f"indices: {dois_soma(nums2, 6)}")`,

  'eda-h-ex2': `# TODO: ache a palavra mais frequente do texto
# Dica: freq.get(palavra, 0) + 1 e max(freq, key=freq.get)
def mais_frequente(texto):
    return ""

texto = "ia python dados ia python ia"
palavra, count = mais_frequente(texto)
print(f"mais frequente: '{palavra}' ({count}x)")`,

  'eda-h-projeto': `# TODO: verifique se duas palavras são anagramas (mesmas letras)
# Dica: compare a contagem de letras (Counter ou dict manual)
from collections import Counter

def sao_anagramas(a, b):
    return False

print(f"listen/silent: {sao_anagramas('listen', 'silent')}")
print(f"python/typhon: {sao_anagramas('python', 'typhon')}")
print(f"abc/cba: {sao_anagramas('abc', 'cba')}")`,

  // ── Lição 3: Ordenação (hands-on) ──────────────────────────
  'eda-ordenacao': `# sorted() é O(n log n) e não modifica a original
dados = [64, 34, 25, 12, 22, 11, 90]

print(f"sorted: {sorted(dados)}")
print(f"original: {dados}")`,

  'eda-o-ex1': `# TODO: implemente o bubble sort (O(n²)) com a otimização "trocou"
def bubble_sort(lista):
    return lista

dados = [64, 34, 25, 12, 22, 11, 90]
print(f"bubble: {bubble_sort(dados)}")`,

  'eda-o-ex2': `# TODO: use sorted() de três formas: normal, reversa e por tamanho
dados = [64, 34, 25, 12, 22, 11, 90]
palavras = ["bb", "a", "ccc"]

print(f"sorted: {sorted(dados)}")
print(f"reverso: {sorted(dados, reverse=True)}")
print(f"por tamanho: {sorted(palavras, key=len)}")`,

  'eda-o-projeto': `# TODO: merge de duas listas JÁ ordenadas em O(n) — sem sorted()
def merge(a, b):
    return []

a = [1, 3, 5, 7]
b = [2, 4, 6, 8]
print(f"merge: {merge(a, b)}")`,
}
