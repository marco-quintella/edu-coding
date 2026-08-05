/**
 * Códigos iniciais do curso "Expressões Regulares".
 * stdlib re — roda no sandbox ml-base.
 * Chaves únicas por lição (prefixo: regex / regex-g / regex-a).
 */

export const REGEX_CODES: Record<string, string> = {
  // ── Lição 1: Básico (hands-on) ─────────────────────────────
  'regex-basico': `import re

texto = "O email de contato é ana@empresa.com e o suporte é suporte@x.com"

# findall devolve todas as ocorrências
emails = re.findall(r"[a-z]+@[a-z.]+", texto)
print(f"emails: {emails}")`,

  'regex-ex1': `import re

texto = "O email de contato é ana@empresa.com e o suporte é suporte@x.com"

# TODO: extraia todos os emails
emails = re.findall(r"[a-z]+@[a-z.]+", texto)
print(f"emails: {emails}")`,

  'regex-ex2': `import re

# TODO: valide telefones (parênteses opcionais, 11 dígitos)
def validar_telefone(fone):
    return bool(re.fullmatch(r"\\(?\\d{2}\\)? ?\\d{4,5}-?\\d{4}", fone))

for fone in ["(11) 99999-1234", "11999991234", "abc"]:
    print(f"{fone}: {validar_telefone(fone)}")`,

  'regex-projeto': `import re

texto = "Evento em 05/08/2026 e outro em 20/12/2026, reserve já"

# TODO: extraia todas as datas dd/mm/aaaa
datas = re.findall(r"\\d{2}/\\d{2}/\\d{4}", texto)
print(f"datas: {datas}")`,

  // ── Lição 2: Grupos (hands-on) ─────────────────────────────
  'regex-grupos': `import re

# Grupos com parênteses
texto = "Pedido #1234 de 2026-08-05 no valor de R$ 450,00"
m = re.search(r"#(\\d+) de (\\d{4}-\\d{2}-\\d{2})", texto)
if m:
    print(f"pedido: {m.group(1)}")
    print(f"data: {m.group(2)}")`,

  'regex-g-ex1': `import re

texto = "Pedido #1234 de 2026-08-05 no valor de R$ 450,00"

# TODO: extraia número do pedido e data com grupos
m = re.search(r"#(\\d+) de (\\d{4}-\\d{2}-\\d{2})", texto)
if m:
    print(f"pedido: {m.group(1)}")
    print(f"data: {m.group(2)}")`,

  'regex-g-ex2': `import re

texto = "Olá, mundo! Como vai? #python @dev"

# TODO: remova os caracteres especiais (mantenha letras, números e espaços)
limpo = re.sub(r"[^a-zA-Z0-9\\s]", "", texto)
print(f"limpo: {limpo}")`,

  'regex-g-projeto': `import re

texto = "Contato: (11) 99999-1234"

# TODO: masque os dígitos do telefone
mascarado = re.sub(r"\\d", "*", texto)
print(f"mascarado: {mascarado}")`,

  // ── Lição 3: Aplicações (hands-on) ─────────────────────────
  'regex-aplicacoes': `import re

texto = "ana; bob,carol|dan"

# split por qualquer separador da classe
partes = re.split(r"[;,|]", texto)
print(f"partes: {partes}")`,

  'regex-a-ex1': `import re

texto = "ana; bob,carol|dan"

# TODO: divida por ; , ou |
partes = re.split(r"[;,|]", texto)
print(f"partes: {partes}")`,

  'regex-a-ex2': `import re

texto = "contato@empresa.com.br e dev@github.com"

# TODO: extraia os domínios (grupo depois do @)
dominios = re.findall(r"@([a-z0-9.]+)", texto)
print(f"dominios: {dominios}")`,

  'regex-a-projeto': `import re

cpf = "123.456.789-00"

# TODO: masque o CPF (só os 2 últimos visíveis)
mascarado = re.sub(r"\\d", "*", cpf[:-2]) + cpf[-2:]
print(f"cpf: {mascarado}")`,
}
