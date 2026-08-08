/**
 * Códigos iniciais do curso "Algoritmos de Entrevista".
 * Python puro — roda no sandbox ml-base.
 * Chaves únicas por lição (prefixo: alg / alg-s / alg-r).
 */

export const ALG_CODES: Record<string, string> = {
  // ── Lição 1: Two Pointers (hands-on) ───────────────────────
  'alg-two-pointers': `# Two Pointers: inverter string IN PLACE
def inverter(s):
    chars = list(s)
    esq, dir_ = 0, len(chars) - 1
    while esq < dir_:
        chars[esq], chars[dir_] = chars[dir_], chars[esq]
        esq += 1
        dir_ -= 1
    return "".join(chars)

print(inverter("abcde"))`,

  'alg-ex1': `# TODO: inverta a string com two pointers
def inverter(s):
    chars = list(s)
    esq, dir_ = 0, len(chars) - 1
    while esq < dir_:
        chars[esq], chars[dir_] = chars[dir_], chars[esq]
        esq += 1
        dir_ -= 1
    return "".join(chars)

print(inverter("abcde"))`,

  'alg-ex2': `# TODO: ache o par que soma o alvo (lista ordenada)
def achar_par(nums, alvo):
    esq, dir_ = 0, len(nums) - 1
    while esq < dir_:
        soma = nums[esq] + nums[dir_]
        if soma == alvo:
            return (nums[esq], nums[dir_])
        elif soma < alvo:
            esq += 1
        else:
            dir_ -= 1
    return None

print(achar_par([1, 2, 3, 4, 5], 7))`,

  'alg-projeto': `# TODO: verifique palíndromos com two pointers
def e_palindromo(s):
    esq, dir_ = 0, len(s) - 1
    while esq < dir_:
        if s[esq] != s[dir_]:
            return False
        esq += 1
        dir_ -= 1
    return True

for s in ["arara", "python", "reconhecer"]:
    print(f"{s}: {e_palindromo(s)}")`,

  // ── Lição 2: Sliding Window (hands-on) ─────────────────────
  'alg-sliding-window': `# Sliding Window: maior soma de subarray de tamanho k
def maior_soma(nums, k):
    soma_atual = sum(nums[:k])
    maior = soma_atual
    for i in range(k, len(nums)):
        soma_atual += nums[i] - nums[i - k]
        maior = max(maior, soma_atual)
    return maior

print(maior_soma([2, 1, 5, 1, 3, 2], 3))`,

  'alg-s-ex1': `# TODO: maior soma de janela de tamanho k
def maior_soma(nums, k):
    soma_atual = sum(nums[:k])
    maior = soma_atual
    for i in range(k, len(nums)):
        soma_atual += nums[i] - nums[i - k]
        maior = max(maior, soma_atual)
    return maior

print(maior_soma([2, 1, 5, 1, 3, 2], 3))`,

  'alg-s-ex2': `# TODO: subarray mais longo com soma <= k
def mais_longo(nums, k):
    esq = 0
    soma = 0
    melhor = 0
    for dir_ in range(len(nums)):
        soma += nums[dir_]
        while soma > k:
            soma -= nums[esq]
            esq += 1
        melhor = max(melhor, dir_ - esq + 1)
    return melhor

print(mais_longo([3, 1, 2, 1, 1], 5))`,

  'alg-s-projeto': `# TODO: menor subarray com soma >= alvo
def menor_subarray(nums, alvo):
    esq = 0
    soma = 0
    melhor = float("inf")
    for dir_ in range(len(nums)):
        soma += nums[dir_]
        while soma >= alvo:
            melhor = min(melhor, dir_ - esq + 1)
            soma -= nums[esq]
            esq += 1
    return 0 if melhor == float("inf") else melhor

print(menor_subarray([2, 3, 1, 2, 4, 3], 7))`,

  // ── Lição 3: Recursão (hands-on) ───────────────────────────
  'alg-recursao': `# Recursão: fibonacci e fatorial
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

def fatorial(n):
    if n <= 1:
        return 1
    return n * fatorial(n - 1)

print(fib(10))
print(fatorial(5))`,

  'alg-r-ex1': `# TODO: fibonacci recursivo
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(10))`,

  'alg-r-ex2': `# TODO: fatorial recursivo
def fatorial(n):
    if n <= 1:
        return 1
    return n * fatorial(n - 1)

print(fatorial(5))`,

  'alg-r-projeto': `# TODO: contagem regressiva + soma recursiva
def contar(n):
    if n == 0:
        return []
    return [n] + contar(n - 1)

def soma_ate(n):
    if n <= 1:
        return n
    return n + soma_ate(n - 1)

print(contar(5))
print(soma_ate(5))`,
}
