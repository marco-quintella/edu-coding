/**
 * Códigos iniciais do curso "Git Avançado".
 * Git REAL via subprocess (repo local em /tmp/gitavN — isolado por exec).
 * Chaves únicas por lição (prefixo: gitav / gitav-c / gitav-d).
 */

export const GITAV_CODES: Record<string, string> = {
  // ── Lição 1: Stash (hands-on) ──────────────────────────────
  'gitav-stash': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav2", ignore_errors=True)
os.makedirs("/tmp/gitav2")
os.chdir("/tmp/gitav2")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

with open("a.txt", "w") as f:
    f.write("v1\\n")
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "v1", "-q"])

with open("a.txt", "w") as f:
    f.write("v2\\n")
r = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
print(f"modificado: {len([l for l in r.stdout.split('\\n') if l.strip()])}")

subprocess.run(["git", "stash", "-q"])
r2 = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
print(f"apos stash: {len([l for l in r2.stdout.split('\\n') if l.strip()])}")`,

  'gitav-ex1': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav1", ignore_errors=True)
os.makedirs("/tmp/gitav1")
os.chdir("/tmp/gitav1")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

with open("a.txt", "w") as f:
    f.write("conteudo\\n")
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "primeiro", "-q"])

# TODO: log --oneline
r = subprocess.run(["git", "log", "--oneline"], capture_output=True, text=True)
linhas = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"commits: {len(linhas)}")
print(f"msg: {linhas[0].split()[-1]}")`,

  'gitav-projeto': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav7", ignore_errors=True)
os.makedirs("/tmp/gitav7")
os.chdir("/tmp/gitav7")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

with open("a.txt", "w") as f:
    f.write("v1\\n")
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "v1", "-q"])

# TODO: WIP em a.txt → stash → commit de b.txt → pop
with open("a.txt", "w") as f:
    f.write("wip\\n")
subprocess.run(["git", "stash", "-q"])

with open("b.txt", "w") as f:
    f.write("novo arquivo\\n")
subprocess.run(["git", "add", "b.txt"])
subprocess.run(["git", "commit", "-m", "v2", "-q"])

r = subprocess.run(["git", "stash", "list"], capture_output=True, text=True)
print(f"stash: {len([l for l in r.stdout.split('\\n') if l.strip()])}")
subprocess.run(["git", "stash", "pop", "-q"])
r2 = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
print(f"wip de volta: {len([l for l in r2.stdout.split('\\n') if l.strip()])}")
print(f"a.txt: {open('a.txt').read().strip()}")`,

  // ── Lição 2: Cherry-pick e squash (hands-on) ───────────────
  'gitav-cherrypick': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav3", ignore_errors=True)
os.makedirs("/tmp/gitav3")
os.chdir("/tmp/gitav3")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

with open("a.txt", "w") as f:
    f.write("base\\n")
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "base", "-q"])

branch_principal = subprocess.run(["git", "branch", "--show-current"], capture_output=True, text=True).stdout.strip()

subprocess.run(["git", "checkout", "-q", "-b", "feature"])
with open("a.txt", "w") as f:
    f.write("feature1\\n")
subprocess.run(["git", "commit", "-am", "f1", "-q"])
with open("a.txt", "w") as f:
    f.write("feature2\\n")
subprocess.run(["git", "commit", "-am", "f2", "-q"])

subprocess.run(["git", "checkout", "-q", branch_principal])
r = subprocess.run(["git", "log", "--oneline", "feature"], capture_output=True, text=True)
linhas = [l for l in r.stdout.split("\\n") if l.strip()]
f1_hash = linhas[-2].split()[0]
subprocess.run(["git", "cherry-pick", f1_hash], capture_output=True, text=True)

r2 = subprocess.run(["git", "log", "--oneline"], capture_output=True, text=True)
print(f"commits no principal: {len([l for l in r2.stdout.split('\\n') if l.strip()])}")
print(f"arquivo: {open('a.txt').read().strip()}")`,

  'gitav-c-ex1': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav3", ignore_errors=True)
os.makedirs("/tmp/gitav3")
os.chdir("/tmp/gitav3")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

with open("a.txt", "w") as f:
    f.write("base\\n")
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "base", "-q"])

branch_principal = subprocess.run(["git", "branch", "--show-current"], capture_output=True, text=True).stdout.strip()

subprocess.run(["git", "checkout", "-q", "-b", "feature"])
with open("a.txt", "w") as f:
    f.write("feature1\\n")
subprocess.run(["git", "commit", "-am", "f1", "-q"])
with open("a.txt", "w") as f:
    f.write("feature2\\n")
subprocess.run(["git", "commit", "-am", "f2", "-q"])

# TODO: cherry-pick do f1 na principal
subprocess.run(["git", "checkout", "-q", branch_principal])
r = subprocess.run(["git", "log", "--oneline", "feature"], capture_output=True, text=True)
linhas = [l for l in r.stdout.split("\\n") if l.strip()]
f1_hash = linhas[-2].split()[0]
subprocess.run(["git", "cherry-pick", f1_hash], capture_output=True, text=True)

r2 = subprocess.run(["git", "log", "--oneline"], capture_output=True, text=True)
print(f"commits no principal: {len([l for l in r2.stdout.split('\\n') if l.strip()])}")
print(f"arquivo: {open('a.txt').read().strip()}")`,

  'gitav-c-ex2': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav4", ignore_errors=True)
os.makedirs("/tmp/gitav4")
os.chdir("/tmp/gitav4")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

for i in range(3):
    with open("a.txt", "w") as f:
        f.write(f"commit {i}\\n")
    subprocess.run(["git", "add", "."])
    subprocess.run(["git", "commit", "-m", f"c{i}", "-q"])

# TODO: squash dos 2 últimos
subprocess.run(["git", "reset", "--soft", "HEAD~2"])
subprocess.run(["git", "commit", "-m", "squashed", "-q"])

r2 = subprocess.run(["git", "log", "--oneline"], capture_output=True, text=True)
print(f"commits: {len([l for l in r2.stdout.split('\\n') if l.strip()])}")
print(f"ultima msg: {r2.stdout.strip().split('\\n')[0].split()[-1]}")`,

  'gitav-c-projeto': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav8", ignore_errors=True)
os.makedirs("/tmp/gitav8")
os.chdir("/tmp/gitav8")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

with open("a.txt", "w") as f:
    f.write("base\\n")
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "base", "-q"])

# TODO: 3 commits com add explícito
for i in range(1, 4):
    with open("a.txt", "w") as f:
        f.write(f"master {i}\\n")
    subprocess.run(["git", "add", "a.txt"])
    subprocess.run(["git", "commit", "-m", f"m{i}", "-q"])

r = subprocess.run(["git", "log", "--oneline"], capture_output=True, text=True)
print(f"commits: {len([l for l in r.stdout.split('\\n') if l.strip()])}")`,

  // ── Lição 3: Diagnóstico (hands-on) ────────────────────────
  'gitav-diagnostico': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav5", ignore_errors=True)
os.makedirs("/tmp/gitav5")
os.chdir("/tmp/gitav5")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

for i in range(5):
    with open(f"f{i}.txt", "w") as f:
        f.write(str(i))
    subprocess.run(["git", "add", "."])
    subprocess.run(["git", "commit", "-m", f"commit {i}", "-q"])

r = subprocess.run(["git", "log", "--oneline"], capture_output=True, text=True)
commits = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"commits: {len(commits)}")
print(f"mais antigo: {commits[-1].split()[-1]}")`,

  'gitav-d-ex1': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav5", ignore_errors=True)
os.makedirs("/tmp/gitav5")
os.chdir("/tmp/gitav5")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

# TODO: 5 commits + log
for i in range(5):
    with open(f"f{i}.txt", "w") as f:
        f.write(str(i))
    subprocess.run(["git", "add", "."])
    subprocess.run(["git", "commit", "-m", f"commit {i}", "-q"])

r = subprocess.run(["git", "log", "--oneline"], capture_output=True, text=True)
commits = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"commits: {len(commits)}")
print(f"mais antigo: {commits[-1].split()[-1]}")`,

  'gitav-d-ex2': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav6", ignore_errors=True)
os.makedirs("/tmp/gitav6")
os.chdir("/tmp/gitav6")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

with open("a.txt", "w") as f:
    f.write("linha1\\nlinha2\\nlinha3\\n")
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "base", "-q"])

# TODO: modifique 1 linha e rode diff --stat
with open("a.txt", "w") as f:
    f.write("linha1\\nlinha2 MODIFICADA\\nlinha3\\n")
r = subprocess.run(["git", "diff", "--stat"], capture_output=True, text=True)
print(f"diff: {r.stdout.strip()}")`,

  'gitav-d-projeto': `import subprocess, os, shutil

shutil.rmtree("/tmp/gitav9", ignore_errors=True)
os.makedirs("/tmp/gitav9")
os.chdir("/tmp/gitav9")
subprocess.run(["git", "init", "-q"])
subprocess.run(["git", "config", "user.email", "a@b.com"])
subprocess.run(["git", "config", "user.name", "Teste"])

# TODO: arquivo novo staged
with open("novo.txt", "w") as f:
    f.write("novo")
subprocess.run(["git", "add", "novo.txt"])
r = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
linhas = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"staged: {len(linhas)}")
print(f"tipo: {linhas[0][:2]}")`,
}
