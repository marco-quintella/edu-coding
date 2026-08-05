/**
 * Códigos iniciais do curso "Automação com Python".
 * stdlib (open/os/shutil/subprocess/datetime) — roda no sandbox.
 * Chaves únicas por lição (prefixo: automacao / automacao-p / automacao-s).
 */

export const AUTOMACAO_CODES: Record<string, string> = {
  // ── Lição 1: Arquivos (hands-on) ───────────────────────────
  'automacao-arquivos': `# Ler e escrever arquivos
with open("/tmp/notas.txt", "w") as f:
    f.write("ana 7.5\\nbob 5.0\\ncarol 8.0\\n")

with open("/tmp/notas.txt") as f:
    linhas = f.readlines()

print(f"linhas: {len(linhas)}")
print(f"primeira: {linhas[0].strip()}")`,

  'automacao-ex1': `# TODO: crie um arquivo com 3 notas e leia de volta
with open("/tmp/notas.txt", "w") as f:
    f.write("ana 7.5\\nbob 5.0\\ncarol 8.0\\n")

# Dica: with open(path) lê; readlines() devolve as linhas
with open("/tmp/notas.txt") as f:
    linhas = f.readlines()

print(f"linhas: {len(linhas)}")
print(f"primeira: {linhas[0].strip()}")`,

  'automacao-ex2': `# TODO: leia as vendas do arquivo e some os valores
with open("/tmp/vendas.txt", "w") as f:
    f.write("ana 1000\\nbob 2000\\nana 1500\\ncarol 800\\n")

total = 0
# Dica: for linha in f: vendedor, valor = linha.split()
with open("/tmp/vendas.txt") as f:
    for linha in f:
        vendedor, valor = linha.split()
        total += int(valor)

print(f"total: R\${total}")`,

  'automacao-projeto': `# TODO: relatório — produto, qtd, preco → faturamento
with open("/tmp/relatorio_vendas.txt", "w") as f:
    f.write("teclado 5 120\\nmouse 10 60\\nmonitor 2 800\\nwebcam 4 250\\n")

total = 0
itens = 0
# Dica: produto, qtd, preco = linha.split(); total += int(qtd) * int(preco)
with open("/tmp/relatorio_vendas.txt") as f:
    for linha in f:
        produto, qtd, preco = linha.split()
        total += int(qtd) * int(preco)
        itens += 1

print(f"itens: {itens}")
print(f"faturamento: R\${total}")`,

  // ── Lição 2: Pastas (hands-on) ─────────────────────────────
  'automacao-pastas': `import os, shutil

os.makedirs("/tmp/projeto/dados", exist_ok=True)
os.makedirs("/tmp/projeto/backup", exist_ok=True)

with open("/tmp/projeto/dados/relatorio.csv", "w") as f:
    f.write("id,valor\\n1,100\\n2,200\\n")
shutil.copy("/tmp/projeto/dados/relatorio.csv", "/tmp/projeto/backup/")

print(f"existe: {os.path.exists('/tmp/projeto/backup/relatorio.csv')}")
print(f"tamanho: {os.path.getsize('/tmp/projeto/backup/relatorio.csv')} bytes")`,

  'automacao-p-ex1': `import os, shutil

# TODO: crie pastas, copie um arquivo e confirme com os.path.exists
os.makedirs("/tmp/projeto/dados", exist_ok=True)
os.makedirs("/tmp/projeto/backup", exist_ok=True)

with open("/tmp/projeto/dados/relatorio.csv", "w") as f:
    f.write("id,valor\\n1,100\\n2,200\\n")
shutil.copy("/tmp/projeto/dados/relatorio.csv", "/tmp/projeto/backup/")

print(f"existe: {os.path.exists('/tmp/projeto/backup/relatorio.csv')}")
print(f"tamanho: {os.path.getsize('/tmp/projeto/backup/relatorio.csv')} bytes")`,

  'automacao-p-ex2': `import os

# TODO: liste os arquivos .txt da pasta
os.makedirs("/tmp/docs", exist_ok=True)
for nome in ["a.txt", "b.csv", "c.txt", "d.pdf"]:
    open(f"/tmp/docs/{nome}", "w").close()

txts = [n for n in os.listdir("/tmp/docs") if n.endswith(".txt")]
print(f"arquivos: {len(os.listdir('/tmp/docs'))}")
print(f"txt: {sorted(txts)}")`,

  'automacao-p-projeto': `import os

# TODO: agrupe os arquivos por extensão
os.makedirs("/tmp/dl", exist_ok=True)
for nome in ["foto.jpg", "doc.pdf", "musica.mp3", "video.mp4", "outro.pdf"]:
    open(f"/tmp/dl/{nome}", "w").close()

por_ext = {}
# Dica: ext = nome.split(".")[-1]; por_ext.setdefault(ext, []).append(nome)
for nome in os.listdir("/tmp/dl"):
    ext = nome.split(".")[-1]
    por_ext.setdefault(ext, []).append(nome)

print(f"extensoes: {sorted(por_ext.keys())}")
print(f"pdfs: {por_ext.get('pdf', [])}")`,

  // ── Lição 3: Sistema (hands-on) ────────────────────────────
  'automacao-sistema': `import subprocess

resultado = subprocess.run(["echo", "olá mundo"], capture_output=True, text=True)
print(f"saida: {resultado.stdout.strip()}")
print(f"exit code: {resultado.returncode}")`,

  'automacao-s-ex1': `import subprocess

# TODO: rode o comando e mostre saída + exit code
resultado = subprocess.run(["echo", "olá mundo"], capture_output=True, text=True)
print(f"saida: {resultado.stdout.strip()}")
print(f"exit code: {resultado.returncode}")`,

  'automacao-s-ex2': `from datetime import datetime, timedelta

# TODO: mostre hoje e amanhã formatados
agora = datetime.now()
amanha = agora + timedelta(days=1)

print(f"hoje: {agora.strftime('%d/%m/%Y')}")
print(f"amanha: {amanha.strftime('%d/%m/%Y')}")`,

  'automacao-s-projeto': `import subprocess

# TODO: rode printf com 4 linhas e conte as não-vazias
resultado = subprocess.run(["printf", "a\\nb\\nc\\nd\\n"], capture_output=True, text=True)
linhas = [l for l in resultado.stdout.split("\\n") if l.strip()]

print(f"linhas de saida: {len(linhas)}")
print(f"primeira: {linhas[0]}")`,
}
