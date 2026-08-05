/**
 * Códigos iniciais do curso "Testes com Python (pytest)".
 * Conceitos de teste com assert/edge cases — roda no sandbox.
 * Chaves únicas por lição (prefixo: testes / testes-a / testes-t).
 */

export const TESTES_CODES: Record<string, string> = {
  // ── Lição 1: Testes básicos (hands-on) ─────────────────────
  'testes-basicos': `# Testes com assert — a base do pytest
def somar(a, b):
    return a + b

# Testes manuais (o pytest roda os mesmos asserts)
assert somar(2, 3) == 5
assert somar(-1, -1) == -2

print(f"2+3 = {somar(2, 3)}")
print(f"-1+-1 = {somar(-1, -1)}")`,

  'testes-ex1': `def somar(a, b):
    return a + b

# TODO: complete os asserts (positivos, negativos, zero)
assert somar(2, 3) == 5
assert somar(-1, -1) == -2
assert somar(0, 0) == 0

print(f"2+3 = {somar(2, 3)}")
print(f"-1+-1 = {somar(-1, -1)}")`,

  'testes-ex2': `def dividir(a, b):
    # TODO: lance ValueError se b == 0
    return a / b

print(f"10/2 = {dividir(10, 2)}")
print(f"7/2 = {dividir(7, 2)}")

try:
    dividir(1, 0)
    print("nao levantou erro")
except ValueError:
    print("levantou ValueError")`,

  'testes-projeto': `# TODO: classe Calculadora com somar/subtrair/multiplicar
class Calculadora:
    def somar(self, a, b):
        return a + b
    def subtrair(self, a, b):
        return a - b
    def multiplicar(self, a, b):
        return a * b

calc = Calculadora()
print(f"somar: {calc.somar(3, 4)}")
print(f"subtrair: {calc.subtrair(10, 4)}")
print(f"multiplicar: {calc.multiplicar(6, 7)}")`,

  // ── Lição 2: Casos e parametrize (hands-on) ────────────────
  'testes-avancados': `# Tabela de casos — o padrão profissional
def validar_email(email):
    return "@" in email and "." in email.split("@")[-1]

casos = [
    ("ana@empresa.com", True),
    ("sem-arroba.com", False),
]
for email, esperado in casos:
    print(f"{email}: {validar_email(email)} (esperado {esperado})")`,

  'testes-a-ex1': `import json, tempfile, os

def carregar_config(caminho):
    with open(caminho) as f:
        return json.load(f)

# TODO: crie um config temporário com timeout=30 e retries=3
with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as f:
    json.dump({"timeout": 30, "retries": 3}, f)
    caminho = f.name

config = carregar_config(caminho)
print(f"timeout: {config['timeout']}")
print(f"retries: {config['retries']}")
os.unlink(caminho)`,

  'testes-a-ex2': `# TODO: valide emails com a tabela de casos completa
def validar_email(email):
    return "@" in email and "." in email.split("@")[-1]

casos = [
    ("ana@empresa.com", True),
    ("bob@empresa.com.br", True),
    ("sem-arroba.com", False),
    ("ana@", False),
]
for email, esperado in casos:
    resultado = validar_email(email)
    print(f"{email}: {resultado} (esperado {esperado})")`,

  'testes-a-projeto': `# TODO: valide senhas — 'curta' (<8) e 'sem_numero'
def validar_senha(senha):
    erros = []
    if len(senha) < 8:
        erros.append("curta")
    if not any(c.isdigit() for c in senha):
        erros.append("sem_numero")
    return erros

for senha in ["abc", "abcdefgh", "abcdefg1", "Abcdefgh1"]:
    erros = validar_senha(senha)
    print(f"'{senha}': {erros if erros else 'OK'}")`,

  // ── Lição 3: TDD (hands-on) ────────────────────────────────
  'testes-tdd': `# TDD: RED (teste falha) → GREEN (código passa) → REFACTOR
def calcular_desconto(preco, percentual):
    if percentual < 0 or percentual > 100:
        raise ValueError("percentual invalido")
    return preco * (1 - percentual / 100)

print(f"100 com 10%: {calcular_desconto(100, 10):.2f}")
print(f"200 com 25%: {calcular_desconto(200, 25):.2f}")`,

  'testes-t-ex1': `# TODO: desconto validado (percentual 0-100)
def calcular_desconto(preco, percentual):
    # if percentual < 0 or percentual > 100: raise ValueError
    return preco

print(f"100 com 10%: {calcular_desconto(100, 10):.2f}")
print(f"200 com 25%: {calcular_desconto(200, 25):.2f}")
print(f"50 com 0%: {calcular_desconto(50, 0):.2f}")`,

  'testes-t-ex2': `# TODO: média com edge case (lista vazia → ValueError)
def media(notas):
    return 0

print(f"media [7,8,9]: {media([7, 8, 9]):.1f}")
print(f"media [10]: {media([10]):.1f}")
try:
    media([])
    print("nao levantou")
except ValueError:
    print("lista vazia: ValueError")`,

  'testes-t-projeto': `# TODO: conversor Fahrenheit → Celsius (TDD)
def fahrenheit_para_celsius(f):
    return 0

for f in [32, 212, 98.6]:
    print(f"{f}F = {fahrenheit_para_celsius(f):.1f}C")`,
}
