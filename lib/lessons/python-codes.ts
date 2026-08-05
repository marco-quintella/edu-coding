/**
 * Códigos iniciais do curso "Python para Devs".
 * Formato igual ao initial-codes.ts do IA para Devs.
 */
import { INITIAL_CODES as IA_CODES } from './initial-codes'

export const PYTHON_CODES: Record<string, string> = {
  // ── Lição 1: Fundamentos (hands-on) ────────────────────────
  'python-fundamentos': `# Fundamentos: variáveis, tipos, condicionais e loops
nome = "Ana"
idade = 25
altura = 1.68

print(f"Olá, {nome}! Você tem {idade} anos e {altura:.2f}m.")

# Condicional
if idade >= 18:
    print("maior de idade")

# Loop
for i in range(1, 6):
    print(f"passo {i}")`,

  // ── Lição 1: Exercícios ────────────────────────────────────
  'python-ex1': `peso = 70.0
altura = 1.75

# TODO: calcule o IMC = peso / altura² e classifique
# <18.5 magro | <25 normal | <30 sobrepeso | >=30 obeso
imc = 0
classificacao = ""

print(f"IMC = {imc:.2f} ({classificacao})")`,

  'python-ex2': `soma = 0

# TODO: some apenas os números PARES de 1 a 10
# Dica: use range(1, 11) e o operador % 2

print(f"soma dos pares = {soma}")`,

  'python-projeto': `def validar(senha):
    faltas = []
    # TODO: exige mínimo 8 chars, 1 maiúscula, 1 número
    # use len(), any(c.isupper() for c in senha), any(c.isdigit() ...)
    return faltas

senha = "abcdefgh"  # 8 chars, mas sem maiúscula nem número
print(f"faltam: {validar(senha)}")`,

  // ── Lição 2: Listas e dicionários ──────────────────────────
  // ── Lição 2: Listas e dicionários (hands-on) ───────────────
  'python-listas-dicts': `# Listas e dicionários
frutas = ["maça", "banana", "uva"]
frutas.append("kiwi")

usuario = {
    "nome": "Ana",
    "idade": 25,
    "cidade": "São Paulo",
}

print(f"frutas: {frutas}")
print(f"primeira: {frutas[0]}")
print(f"nome: {usuario['nome']}")
print(f"total frutas: {len(frutas)}")`,

  'python-l2-ex1': `frase = "python é ótimo e python é simples"
freq = {}

# TODO: conte a frequência de cada palavra no dicionário freq
# Dica: freq[palavra] = freq.get(palavra, 0) + 1

print(f"total de palavras: {len(frase.split())}")
print(f"palavras unicas: {len(freq)}")`,

  'python-l2-ex2': `notas = [7.5, 8.0, 6.5, 9.0, 5.5]

# TODO: calcule a média e conte quantas notas são >= 7
media = 0
acima = 0

print(f"media: {media:.1f}")
print(f"acima da media: {acima}")`,

  'python-l2-projeto': `agenda = {
    "ana": {"tel": "11-9999", "cidade": "SP"},
    "bob": {"tel": "21-8888", "cidade": "RJ"},
}

# TODO: adicione "carol" (31-7777, BH) e liste todos os contatos
# Dica: agenda["carol"] = {...}

print(f"contatos: {len(agenda)}")
for nome, info in agenda.items():
    print(f"{nome}: {info['cidade']}")`,

  // ── Lição 3: Funções ───────────────────────────────────────
  // ── Lição 3: Funções (hands-on) ────────────────────────────
  'python-funcoes': `# Funções
def saudacao(nome, idioma="pt"):
    if idioma == "pt":
        return f"Olá, {nome}!"
    return f"Hello, {nome}!"

print(saudacao("Ana"))
print(saudacao("Bob", "en"))

# Função pura
def calcular_media(notas):
    return sum(notas) / len(notas)

print(f"media: {calcular_media([7, 8, 9]):.1f}")`,

  'python-l3-ex1': `def desconto(preco, percentual=10):
    # TODO: retorne o preço com o desconto aplicado
    return preco

print(f"com 10%: R\${desconto(100):.2f}")
print(f"com 25%: R\${desconto(100, 25):.2f}")`,

  'python-l3-ex2': `def calcular_media(notas):
    # TODO: retorne a média das notas
    return 0

def aprovado(media, corte=6.0):
    # TODO: retorne True se media >= corte
    return False

notas = [7.0, 8.5, 5.5]
media = calcular_media(notas)
print(f"media: {media:.1f}")
print(f"aprovado: {aprovado(media)}")`,

  'python-l3-projeto': `def total_bruto(vendas):
    # TODO: some o valor de todas as vendas
    return 0

def comissao(vendas, taxa=0.05):
    # TODO: retorne total_bruto * taxa
    return 0

vendas = [
    {"vendedor": "ana", "valor": 1000},
    {"vendedor": "bob", "valor": 2000},
    {"vendedor": "ana", "valor": 1500},
]
print(f"total: R\${total_bruto(vendas):.0f}")
print(f"comissao: R\${comissao(vendas):.0f}")`,
}

/** Código inicial combinado (IA + Python). */
export function getCourseInitialCode(lessonSlug: string): string {
  return PYTHON_CODES[lessonSlug] ?? IA_CODES[lessonSlug] ?? ''
}
