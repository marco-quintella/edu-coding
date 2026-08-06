/**
 * Códigos iniciais do curso "Linux & Terminal".
 * Comandos reais via subprocess — roda no sandbox ml-base.
 * Chaves únicas por lição (prefixo: linux / linux-g / linux-p).
 */

export const LINUX_CODES: Record<string, string> = {
  // ── Lição 1: Arquivos (hands-on) ───────────────────────────
  'linux-arquivos': `import subprocess

# Comandos básicos do terminal
r = subprocess.run(["pwd"], capture_output=True, text=True)
print(f"pwd: {r.stdout.strip()}")`,

  'linux-ex1': `import subprocess

# TODO: mostre o diretório atual
r = subprocess.run(["pwd"], capture_output=True, text=True)
print(f"pwd: {r.stdout.strip()}")`,

  'linux-ex2': `import subprocess, os

# TODO: crie 2 arquivos e liste
os.makedirs("/tmp/linux-lab", exist_ok=True)
os.chdir("/tmp/linux-lab")
open("a.txt", "w").close()
open("b.txt", "w").close()

r = subprocess.run(["ls"], capture_output=True, text=True)
arquivos = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"arquivos: {sorted(arquivos)}")`,

  'linux-projeto': `import subprocess, os

# TODO: crie a estrutura src/docs e conte as pastas
os.makedirs("/tmp/proj/src", exist_ok=True)
os.makedirs("/tmp/proj/docs", exist_ok=True)

r = subprocess.run(["find", "/tmp/proj", "-type", "d"], capture_output=True, text=True)
pastas = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"pastas: {len(pastas)}")`,

  // ── Lição 2: grep e filtros (hands-on) ─────────────────────
  'linux-grep': `import subprocess

# grep: filtrar linhas de um log
with open("/tmp/log.txt", "w") as f:
    f.write("info: inicio\\nerro: falhou\\ninfo: ok\\nerro: timeout\\n")

r2 = subprocess.run(["grep", "erro", "/tmp/log.txt"], capture_output=True, text=True)
linhas = [l for l in r2.stdout.split("\\n") if l.strip()]
print(f"erros: {len(linhas)}")
print(f"primeiro: {linhas[0]}")`,

  'linux-g-ex1': `import subprocess

# TODO: conte as linhas com "erro" no log
with open("/tmp/log.txt", "w") as f:
    f.write("info: inicio\\nerro: falhou\\ninfo: ok\\nerro: timeout\\n")

r2 = subprocess.run(["grep", "erro", "/tmp/log.txt"], capture_output=True, text=True)
linhas = [l for l in r2.stdout.split("\\n") if l.strip()]
print(f"erros: {len(linhas)}")
print(f"primeiro: {linhas[0]}")`,

  'linux-g-ex2': `import subprocess

# TODO: conte as linhas do arquivo
with open("/tmp/dados.txt", "w") as f:
    f.write("a\\nb\\nc\\nd\\ne\\n")

r = subprocess.run(["wc", "-l", "/tmp/dados.txt"], capture_output=True, text=True)
print(f"linhas: {r.stdout.strip().split()[0]}")`,

  'linux-g-projeto': `import subprocess, os

# TODO: conte os arquivos .py da pasta
os.makedirs("/tmp/mix", exist_ok=True)
for n in ["a.py", "b.js", "c.py", "d.txt"]:
    open(f"/tmp/mix/{n}", "w").close()

r = subprocess.run(["find", "/tmp/mix", "-name", "*.py"], capture_output=True, text=True)
pys = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"pythons: {len(pys)}")`,

  // ── Lição 3: Pipes e permissões (hands-on) ─────────────────
  'linux-pipes': `import subprocess

# Encadeamento com pipe: sort | uniq -c
with open("/tmp/lista.txt", "w") as f:
    f.write("banana\\nmaça\\nbanana\\nuva\\nbanana\\n")

r = subprocess.run(["sort", "/tmp/lista.txt"], capture_output=True, text=True)
r2 = subprocess.run(["uniq", "-c"], input=r.stdout, capture_output=True, text=True)
print(r2.stdout.strip())`,

  'linux-p-ex1': `import subprocess

# TODO: sort + uniq -c para contar duplicados
with open("/tmp/lista.txt", "w") as f:
    f.write("banana\\nmaça\\nbanana\\nuva\\nbanana\\n")

r = subprocess.run(["sort", "/tmp/lista.txt"], capture_output=True, text=True)
r2 = subprocess.run(["uniq", "-c"], input=r.stdout, capture_output=True, text=True)
print(r2.stdout.strip())`,

  'linux-p-ex2': `import subprocess

# TODO: torne o script executável e mostre as permissões
with open("/tmp/script.sh", "w") as f:
    f.write("#!/bin/bash\\necho olá\\n")

r = subprocess.run(["chmod", "+x", "/tmp/script.sh"], capture_output=True, text=True)
r2 = subprocess.run(["ls", "-l", "/tmp/script.sh"], capture_output=True, text=True)
print(r2.stdout.strip().split()[0])`,

  'linux-p-projeto': `import subprocess

# TODO: descubra onde o bash está
r = subprocess.run(["which", "bash"], capture_output=True, text=True)
print(f"bash: {r.stdout.strip()}")`,
}
