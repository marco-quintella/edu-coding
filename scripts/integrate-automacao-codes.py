"""Integra AUTOMACAO_CODES no initial-codes + teste + soluções."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { APIS_CODES } from './apis-codes'", "import { APIS_CODES } from './apis-codes'\nimport { AUTOMACAO_CODES } from './automacao-codes'")
src = src.replace("    APIS_CODES[lessonSlug] ??", "    APIS_CODES[lessonSlug] ??\n    AUTOMACAO_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { APIS_CODES } from '../apis-codes'", "import { APIS_CODES } from '../apis-codes'\nimport { AUTOMACAO_CODES } from '../automacao-codes'")
t = t.replace("  'apis-e-projeto',\n]", "  'apis-e-projeto',\n  // Curso Automação com Python\n  'automacao-arquivos',\n  'automacao-ex1',\n  'automacao-ex2',\n  'automacao-projeto',\n  'automacao-pastas',\n  'automacao-p-ex1',\n  'automacao-p-ex2',\n  'automacao-p-projeto',\n  'automacao-sistema',\n  'automacao-s-ex1',\n  'automacao-s-ex2',\n  'automacao-s-projeto',\n]")
t = t.replace("""    // Códigos do curso APIs começam com import
    for (const [slug, code] of Object.entries(APIS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso APIs começam com import
    for (const [slug, code] of Object.entries(APIS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Automação começam com import/comentário
    for (const [slug, code] of Object.entries(AUTOMACAO_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")

# 3. soluções
s = open('lib/lessons/solutions.ts').read()
automacao_solutions = '''
  // ── Curso Automação com Python ─────────────────────────────
  'automacao-ex1': {
    explanation:
      'with open(path, "w") escreve (sobrescreve); with open(path) lê. readlines() devolve a lista de linhas.',
    code: `with open("/tmp/notas.txt", "w") as f:
    f.write("ana 7.5\\nbob 5.0\\ncarol 8.0\\n")

with open("/tmp/notas.txt") as f:
    linhas = f.readlines()

print(f"linhas: {len(linhas)}")
print(f"primeira: {linhas[0].strip()}")`,
  },
  'automacao-ex2': {
    explanation:
      'for linha in f itera o arquivo; split() divide "ana 1000" em partes; int() converte para somar.',
    code: `with open("/tmp/vendas.txt", "w") as f:
    f.write("ana 1000\\nbob 2000\\nana 1500\\ncarol 800\\n")

total = 0
with open("/tmp/vendas.txt") as f:
    for linha in f:
        vendedor, valor = linha.split()
        total += int(valor)

print(f"total: R\${total}")`,
  },
  'automacao-projeto': {
    explanation:
      'Cada linha tem produto, qtd e preço. Faturamento = soma de qtd * preco: 600+600+1600+1000 = 3800.',
    code: `with open("/tmp/relatorio_vendas.txt", "w") as f:
    f.write("teclado 5 120\\nmouse 10 60\\nmonitor 2 800\\nwebcam 4 250\\n")

total = 0
itens = 0
with open("/tmp/relatorio_vendas.txt") as f:
    for linha in f:
        produto, qtd, preco = linha.split()
        total += int(qtd) * int(preco)
        itens += 1

print(f"itens: {itens}")
print(f"faturamento: R\${total}")`,
  },
  'automacao-p-ex1': {
    explanation:
      'os.makedirs cria pastas (exist_ok evita erro); shutil.copy copia; os.path.exists confirma o backup.',
    code: `import os, shutil

os.makedirs("/tmp/projeto/dados", exist_ok=True)
os.makedirs("/tmp/projeto/backup", exist_ok=True)

with open("/tmp/projeto/dados/relatorio.csv", "w") as f:
    f.write("id,valor\\n1,100\\n2,200\\n")
shutil.copy("/tmp/projeto/dados/relatorio.csv", "/tmp/projeto/backup/")

print(f"existe: {os.path.exists('/tmp/projeto/backup/relatorio.csv')}")
print(f"tamanho: {os.path.getsize('/tmp/projeto/backup/relatorio.csv')} bytes")`,
  },
  'automacao-p-ex2': {
    explanation:
      'os.listdir lista os nomes; a comprehension com endswith(".txt") filtra por extensão.',
    code: `import os

os.makedirs("/tmp/docs", exist_ok=True)
for nome in ["a.txt", "b.csv", "c.txt", "d.pdf"]:
    open(f"/tmp/docs/{nome}", "w").close()

txts = [n for n in os.listdir("/tmp/docs") if n.endswith(".txt")]
print(f"arquivos: {len(os.listdir('/tmp/docs'))}")
print(f"txt: {sorted(txts)}")`,
  },
  'automacao-p-projeto': {
    explanation:
      'Agrupador por extensão: split(".")[-1] pega a extensão; setdefault cria a lista se faltar.',
    code: `import os

os.makedirs("/tmp/dl", exist_ok=True)
for nome in ["foto.jpg", "doc.pdf", "musica.mp3", "video.mp4", "outro.pdf"]:
    open(f"/tmp/dl/{nome}", "w").close()

por_ext = {}
for nome in os.listdir("/tmp/dl"):
    ext = nome.split(".")[-1]
    por_ext.setdefault(ext, []).append(nome)

print(f"extensoes: {sorted(por_ext.keys())}")
print(f"pdfs: {por_ext.get('pdf', [])}")`,
  },
  'automacao-s-ex1': {
    explanation:
      'subprocess.run executa o comando e espera; capture_output=True captura; returncode 0 = sucesso.',
    code: `import subprocess

resultado = subprocess.run(["echo", "olá mundo"], capture_output=True, text=True)
print(f"saida: {resultado.stdout.strip()}")
print(f"exit code: {resultado.returncode}")`,
  },
  'automacao-s-ex2': {
    explanation:
      'datetime.now() é agora; timedelta(days=1) soma 1 dia; strftime formata. A data vem do relógio do sandbox.',
    code: `from datetime import datetime, timedelta

agora = datetime.now()
amanha = agora + timedelta(days=1)

print(f"hoje: {agora.strftime('%d/%m/%Y')}")
print(f"amanha: {amanha.strftime('%d/%m/%Y')}")`,
  },
  'automacao-s-projeto': {
    explanation:
      'O comando printf gera 4 linhas; a comprehension filtra vazias e conta. Exemplo real de pipeline.',
    code: `import subprocess

resultado = subprocess.run(["printf", "a\\nb\\nc\\nd\\n"], capture_output=True, text=True)
linhas = [l for l in resultado.stdout.split("\\n") if l.strip()]

print(f"linhas de saida: {len(linhas)}")
print(f"primeira: {linhas[0]}")`,
  },
}
'''
idx = s.rindex('}\n\n/** Busca a solução')
s = s[:idx] + automacao_solutions + s[idx:]
open('lib/lessons/solutions.ts', 'w').write(s)
print("soluções Automação adicionadas")
