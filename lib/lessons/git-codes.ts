/**
 * Códigos iniciais do curso "Git & GitHub na Prática".
 * Git real via subprocess (disponível no sandbox ml-base: git 2.47).
 * Chaves únicas por lição (prefixo: git / git-b / git-r).
 * ATENÇÃO: sempre limpar diretórios (/tmp) antes — o warm pool
 * reutiliza o sandbox entre execuções.
 */

export const GIT_CODES: Record<string, string> = {
  // ── Lição 1: Commits (hands-on) ────────────────────────────
  'git-commits': `import subprocess, os, shutil

shutil.rmtree("/tmp/repo", ignore_errors=True)
os.makedirs("/tmp/repo", exist_ok=True)
os.chdir("/tmp/repo")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "voce@email.com"], check=True)
subprocess.run(["git", "config", "user.name", "Seu Nome"], check=True)

with open("app.py", "w") as f:
    f.write("print('ola')\\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "primeiro commit"], check=True)

out = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
print(f"status: '{out.stdout.strip()}' (vazio = limpo)")`,

  'git-ex1': `import subprocess, os, shutil

shutil.rmtree("/tmp/repo1", ignore_errors=True)
os.makedirs("/tmp/repo1", exist_ok=True)
os.chdir("/tmp/repo1")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)

# TODO: crie app.py, adicione (git add .) e commite com a mensagem
# "primeiro commit". Depois mostre o subject do último commit.
with open("app.py", "w") as f:
    f.write("print('ola')\\n")

# Dica: git log -1 --format=%s mostra só o subject (determinístico)
out = subprocess.run(["git", "log", "-1", "--format=%s"], capture_output=True, text=True)
print(f"ultimo commit: {out.stdout.strip()}")`,

  'git-ex2': `import subprocess, os, shutil

shutil.rmtree("/tmp/repo2", ignore_errors=True)
os.makedirs("/tmp/repo2", exist_ok=True)
os.chdir("/tmp/repo2")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)

# TODO: crie a.txt com "v1", commite, depois reescreva com "v2"
# SEM commitar — o status deve mostrar a mudança.
out = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
print(f"status: {out.stdout.strip()}")`,

  'git-projeto': `import subprocess, os, shutil

shutil.rmtree("/tmp/repo5", ignore_errors=True)
os.makedirs("/tmp/repo5", exist_ok=True)
os.chdir("/tmp/repo5")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)

# TODO: faça 2 commits (a.txt e b.txt) e conte o histórico
# Dica: git rev-list --count HEAD conta os commits
out = subprocess.run(["git", "rev-list", "--count", "HEAD"], capture_output=True, text=True)
print(f"commits: {out.stdout.strip()}")`,

  // ── Lição 2: Branches (hands-on) ───────────────────────────
  'git-branches': `import subprocess, os, shutil

shutil.rmtree("/tmp/repo3", ignore_errors=True)
os.makedirs("/tmp/repo3", exist_ok=True)
os.chdir("/tmp/repo3")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)

with open("app.py", "w") as f:
    f.write("base\\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "base"], check=True)

# Tente: criar a branch feature e trabalhar nela
subprocess.run(["git", "branch"], check=True)`,

  'git-b-ex1': `import subprocess, os, shutil

shutil.rmtree("/tmp/repo3", ignore_errors=True)
os.makedirs("/tmp/repo3", exist_ok=True)
os.chdir("/tmp/repo3")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)

# TODO: commit base, crie a branch feature, faça um commit nela
# Dica: git checkout -b feature → altera → commit
with open("app.py", "w") as f:
    f.write("base\\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "base"], check=True)

out = subprocess.run(["git", "log", "-1", "--format=%s"], capture_output=True, text=True)
print(f"HEAD: {out.stdout.strip()}")`,

  'git-b-ex2': `import subprocess, os, shutil

shutil.rmtree("/tmp/repo4", ignore_errors=True)
os.makedirs("/tmp/repo4", exist_ok=True)
os.chdir("/tmp/repo4")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)

# TODO: base → branch feature (append 'feature') → commit →
# checkout master → merge feature → leia o arquivo
with open("app.py", "w") as f:
    f.write("base\\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "base"], check=True)

print(open("app.py").read().strip())`,

  'git-b-projeto': `import subprocess, os, shutil

shutil.rmtree("/tmp/repo6", ignore_errors=True)
os.makedirs("/tmp/repo6", exist_ok=True)
os.chdir("/tmp/repo6")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)

# TODO: base (1) + branch feature com 2 commits → merge na master
# Dica: total deve ser 3 commits
out = subprocess.run(["git", "rev-list", "--count", "HEAD"], capture_output=True, text=True)
print(f"total: {out.stdout.strip()}")`,

  // ── Lição 3: Remotos (hands-on) ────────────────────────────
  'git-remoto': `import subprocess, os, shutil

shutil.rmtree("/tmp/origem", ignore_errors=True)
os.makedirs("/tmp/origem", exist_ok=True)
os.chdir("/tmp/origem")
subprocess.run(["git", "init", "-q", "--bare"], check=True)

os.chdir("/tmp")
shutil.rmtree("meu_clone", ignore_errors=True)
subprocess.run(["git", "clone", "-q", "/tmp/origem", "meu_clone"], check=True)
os.chdir("/tmp/meu_clone")
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)

with open("README.md", "w") as f:
    f.write("# Projeto\\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "readme"], check=True)
subprocess.run(["git", "push", "-q", "-u", "origin", "HEAD"], check=True)

subprocess.run(["git", "remote", "-v"], check=True)`,

  'git-r-ex1': `import subprocess, os, shutil

shutil.rmtree("/tmp/origem2", ignore_errors=True)
os.makedirs("/tmp/origem2", exist_ok=True)
os.chdir("/tmp/origem2")
subprocess.run(["git", "init", "-q", "--bare"], check=True)

os.chdir("/tmp")
shutil.rmtree("meu_clone2", ignore_errors=True)
subprocess.run(["git", "clone", "-q", "/tmp/origem2", "meu_clone2"], check=True)
os.chdir("/tmp/meu_clone2")
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)

# TODO: crie README.md, commite e faça push -u origin HEAD
# Dica: git push -q -u origin HEAD (repo vazio não tem branch)
out = subprocess.run(["git", "log", "-1", "--format=%s"], capture_output=True, text=True)
print(f"enviado: {out.stdout.strip()}")`,

  'git-r-ex2': `import subprocess, os, shutil

shutil.rmtree("/tmp/origem3", ignore_errors=True)
os.makedirs("/tmp/origem3", exist_ok=True)
os.chdir("/tmp/origem3")
subprocess.run(["git", "init", "-q", "--bare"], check=True)

os.chdir("/tmp")
shutil.rmtree("clone_x", ignore_errors=True)
subprocess.run(["git", "clone", "-q", "/tmp/origem3", "clone_x"], check=True)
os.chdir("/tmp/clone_x")
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)

with open("README.md", "w") as f:
    f.write("# Projeto\\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "readme"], check=True)
subprocess.run(["git", "push", "-q", "-u", "origin", "HEAD"], check=True)

# TODO: mostre o NOME do remoto (primeira palavra de git remote -v)
out = subprocess.run(["git", "remote", "-v"], capture_output=True, text=True)
print(out.stdout.strip().split("\\n")[0].split()[0])`,

  'git-r-projeto': `import subprocess, os, shutil

shutil.rmtree("/tmp/origem4", ignore_errors=True)
os.makedirs("/tmp/origem4", exist_ok=True)
os.chdir("/tmp/origem4")
subprocess.run(["git", "init", "-q", "--bare"], check=True)

# TODO: simule o time — dev A faz push de shared.txt; dev B clona e lê
os.chdir("/tmp")
shutil.rmtree("dev_b", ignore_errors=True)
subprocess.run(["git", "clone", "-q", "/tmp/origem4", "dev_b"], check=True)
os.chdir("/tmp/dev_b")

print(f"arquivo: {'shared.txt' if os.path.exists('shared.txt') else 'faltando'}")`,
}
