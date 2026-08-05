/**
 * Códigos iniciais do curso "Docker na Prática".
 * Docker real via subprocess (CLI em /usr/local/bin/docker no sandbox).
 * Chaves únicas por lição (prefixo: docker / docker-r / docker-d).
 */

export const DOCKER_CODES: Record<string, string> = {
  // ── Lição 1: Imagens (hands-on) ────────────────────────────
  'docker-imagens': `import subprocess
DOCKER = "/usr/local/bin/docker"

# Versão do servidor Docker
r = subprocess.run([DOCKER, "version", "--format", "{{.Server.Version}}"], capture_output=True, text=True)
print(f"server: {r.stdout.strip()}")`,

  'docker-ex1': `import subprocess
DOCKER = "/usr/local/bin/docker"

# TODO: mostre a versão do servidor Docker
r = subprocess.run([DOCKER, "version", "--format", "{{.Server.Version}}"], capture_output=True, text=True)
print(f"server: {r.stdout.strip()}")`,

  'docker-ex2': `import subprocess
DOCKER = "/usr/local/bin/docker"

# TODO: conte os containers rodando agora
r = subprocess.run([DOCKER, "ps", "--format", "{{.ID}}"], capture_output=True, text=True)
rodando = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"rodando: {len(rodando)}")`,

  'docker-projeto': `import subprocess
DOCKER = "/usr/local/bin/docker"

# TODO: conte os containers (parados + rodando)
r = subprocess.run([DOCKER, "ps", "-aq"], capture_output=True, text=True)
containers = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"containers: {len(containers)}")`,

  // ── Lição 2: Run (hands-on) ────────────────────────────────
  'docker-run': `import subprocess
DOCKER = "/usr/local/bin/docker"

# Rodar container e capturar a saída
r = subprocess.run([DOCKER, "run", "--rm", "alpine", "echo", "container ok"], capture_output=True, text=True)
print(f"saida: {r.stdout.strip()}")`,

  'docker-r-ex1': `import subprocess
DOCKER = "/usr/local/bin/docker"

# TODO: rode um container alpine com echo
r = subprocess.run([DOCKER, "run", "--rm", "alpine", "echo", "container ok"], capture_output=True, text=True)
print(f"saida: {r.stdout.strip()}")`,

  'docker-r-ex2': `import subprocess
DOCKER = "/usr/local/bin/docker"

# TODO: rode Python dentro de um container
r = subprocess.run([DOCKER, "run", "--rm", "python:3.12-alpine", "python", "-c", "print('python no container')"], capture_output=True, text=True)
print(f"saida: {r.stdout.strip()}")`,

  'docker-r-projeto': `import subprocess
DOCKER = "/usr/local/bin/docker"

# TODO: capture o exit code de um container que falha
r = subprocess.run([DOCKER, "run", "--rm", "alpine", "sh", "-c", "exit 3"], capture_output=True, text=True)
print(f"exit: {r.returncode}")`,

  // ── Lição 3: Dockerfile (hands-on) ─────────────────────────
  'docker-dockerfile': `import subprocess, os
DOCKER = "/usr/local/bin/docker"

# Dockerfile simples
os.makedirs("/tmp/app", exist_ok=True)
with open("/tmp/app/Dockerfile", "w") as f:
    f.write("FROM alpine\\nCMD [\\"echo\\", \\"app rodando\\"]\\n")

r = subprocess.run([DOCKER, "build", "-q", "-t", "meu-app", "/tmp/app"], capture_output=True, text=True)
r2 = subprocess.run([DOCKER, "run", "--rm", "meu-app"], capture_output=True, text=True)
print(f"saida: {r2.stdout.strip()}")`,

  'docker-d-ex1': `import subprocess, os
DOCKER = "/usr/local/bin/docker"

# TODO: Dockerfile com FROM alpine e CMD echo
os.makedirs("/tmp/app", exist_ok=True)
with open("/tmp/app/Dockerfile", "w") as f:
    f.write("FROM alpine\\nCMD [\\"echo\\", \\"app rodando\\"]\\n")

r = subprocess.run([DOCKER, "build", "-q", "-t", "meu-app", "/tmp/app"], capture_output=True, text=True)
r2 = subprocess.run([DOCKER, "run", "--rm", "meu-app"], capture_output=True, text=True)
print(f"saida: {r2.stdout.strip()}")`,

  'docker-d-ex2': `import subprocess, os
DOCKER = "/usr/local/bin/docker"

# TODO: Dockerfile com WORKDIR e RUN criando arquivo
os.makedirs("/tmp/app2", exist_ok=True)
with open("/tmp/app2/Dockerfile", "w") as f:
    f.write("FROM alpine\\nWORKDIR /app\\nRUN echo 'construido' > /app/arquivo.txt\\nCMD cat /app/arquivo.txt\\n")

r = subprocess.run([DOCKER, "build", "-q", "-t", "app2", "/tmp/app2"], capture_output=True, text=True)
r2 = subprocess.run([DOCKER, "run", "--rm", "app2"], capture_output=True, text=True)
print(f"saida: {r2.stdout.strip()}")`,

  'docker-d-projeto': `import subprocess, os
DOCKER = "/usr/local/bin/docker"

# TODO: Dockerfile com ENV APP_NOME
os.makedirs("/tmp/app3", exist_ok=True)
with open("/tmp/app3/Dockerfile", "w") as f:
    f.write("FROM alpine\\nENV APP_NOME=meu-app\\nCMD echo \\"App: $APP_NOME\\"\\n")

r = subprocess.run([DOCKER, "build", "-q", "-t", "app3", "/tmp/app3"], capture_output=True, text=True)
r2 = subprocess.run([DOCKER, "run", "--rm", "app3"], capture_output=True, text=True)
print(f"saida: {r2.stdout.strip()}")`,
}
