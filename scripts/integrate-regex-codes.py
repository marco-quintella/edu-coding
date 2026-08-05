"""Integra REGEX_CODES no initial-codes + teste + soluções."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { JS_CODES } from './js-codes'", "import { JS_CODES } from './js-codes'\nimport { REGEX_CODES } from './regex-codes'")
src = src.replace("    JS_CODES[lessonSlug] ??", "    JS_CODES[lessonSlug] ??\n    REGEX_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { JS_CODES } from '../js-codes'", "import { JS_CODES } from '../js-codes'\nimport { REGEX_CODES } from '../regex-codes'")
t = t.replace("  'js-f-projeto',\n]", "  'js-f-projeto',\n  // Curso Expressões Regulares\n  'regex-basico',\n  'regex-ex1',\n  'regex-ex2',\n  'regex-projeto',\n  'regex-grupos',\n  'regex-g-ex1',\n  'regex-g-ex2',\n  'regex-g-projeto',\n  'regex-aplicacoes',\n  'regex-a-ex1',\n  'regex-a-ex2',\n  'regex-a-projeto',\n]")
t = t.replace("""    // Códigos do curso JS começam com comentário ou const
    for (const [slug, code] of Object.entries(JS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\\/\\/|const |let )/)
    }""",
"""    // Códigos do curso JS começam com comentário ou const
    for (const [slug, code] of Object.entries(JS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\\/\\/|const |let )/)
    }
    // Códigos do curso Regex começam com import
    for (const [slug, code] of Object.entries(REGEX_CODES)) {
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
regex_solutions = '''
  // ── Curso Expressões Regulares ─────────────────────────────
  'regex-ex1': {
    explanation:
      'findall devolve todas as ocorrências. [a-z]+ casa as letras, @ literal, [a-z.]+ o domínio.',
    code: `import re

texto = "O email de contato é ana@empresa.com e o suporte é suporte@x.com"
emails = re.findall(r"[a-z]+@[a-z.]+", texto)
print(f"emails: {emails}")`,
  },
  'regex-ex2': {
    explanation:
      'fullmatch exige o texto inteiro. \\\\(? e \\\\)? tornam os parênteses opcionais; \\\\d{2} DDD; \\\\d{4,5}-?\\\\d{4} o número.',
    code: `import re

def validar_telefone(fone):
    return bool(re.fullmatch(r"\\\\(?\\\\d{2}\\\\)? ?\\\\d{4,5}-?\\\\d{4}", fone))

for fone in ["(11) 99999-1234", "11999991234", "abc"]:
    print(f"{fone}: {validar_telefone(fone)}")`,
  },
  'regex-projeto': {
    explanation:
      '\\\\d{2}/\\\\d{2}/\\\\d{4} casa dd/mm/aaaa. findall pega as duas datas.',
    code: `import re

texto = "Evento em 05/08/2026 e outro em 20/12/2026, reserve já"
datas = re.findall(r"\\\\d{2}/\\\\d{2}/\\\\d{4}", texto)
print(f"datas: {datas}")`,
  },
  'regex-g-ex1': {
    explanation:
      'Os parênteses criam grupos: group(1) é o pedido, group(2) a data. search acha a primeira ocorrência.',
    code: `import re

texto = "Pedido #1234 de 2026-08-05 no valor de R$ 450,00"
m = re.search(r"#(\\\\d+) de (\\\\d{4}-\\\\d{2}-\\\\d{2})", texto)
if m:
    print(f"pedido: {m.group(1)}")
    print(f"data: {m.group(2)}")`,
  },
  'regex-g-ex2': {
    explanation:
      'A classe negada [^a-zA-Z0-9\\s] casa tudo que não é letra/número/espaço — re.sub remove. Acentos são removidos.',
    code: `import re

texto = "Olá, mundo! Como vai? #python @dev"
limpo = re.sub(r"[^a-zA-Z0-9\\s]", "", texto)
print(f"limpo: {limpo}")`,
  },
  'regex-g-projeto': {
    explanation:
      're.sub troca cada dígito por *. A máscara protege dados sensíveis em logs.',
    code: `import re

texto = "Contato: (11) 99999-1234"
mascarado = re.sub(r"\\\\d", "*", texto)
print(f"mascarado: {mascarado}")`,
  },
  'regex-a-ex1': {
    explanation:
      'A classe [;,|] casa qualquer separador — re.split divide em todas as ocorrências de uma vez.',
    code: `import re

texto = "ana; bob,carol|dan"
partes = re.split(r"[;,|]", texto)
print(f"partes: {partes}")`,
  },
  'regex-a-ex2': {
    explanation:
      'O grupo após o @ captura só o domínio. findall devolve a lista com os dois.',
    code: `import re

texto = "contato@empresa.com.br e dev@github.com"
dominios = re.findall(r"@([a-z0-9.]+)", texto)
print(f"dominios: {dominios}")`,
  },
  'regex-a-projeto': {
    explanation:
      'cpf[:-2] mascara tudo menos os 2 últimos; concatena cpf[-2:]. LGPD: nunca logar CPF completo!',
    code: `import re

cpf = "123.456.789-00"
mascarado = re.sub(r"\\\\d", "*", cpf[:-2]) + cpf[-2:]
print(f"cpf: {mascarado}")`,
  },
}
'''
idx = s.rindex('}\n\n/** Busca a solução')
s = s[:idx] + regex_solutions + s[idx:]
open('lib/lessons/solutions.ts', 'w').write(s)
print("soluções Regex adicionadas")
