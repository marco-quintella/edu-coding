"""Integra DOCKER_CODES no initial-codes + teste + soluções."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { BACKEND_CODES } from './backend-codes'", "import { BACKEND_CODES } from './backend-codes'\nimport { DOCKER_CODES } from './docker-codes'")
src = src.replace("    BACKEND_CODES[lessonSlug] ??", "    BACKEND_CODES[lessonSlug] ??\n    DOCKER_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { BACKEND_CODES } from '../backend-codes'", "import { BACKEND_CODES } from '../backend-codes'\nimport { DOCKER_CODES } from '../docker-codes'")
t = t.replace("  'node-e-projeto',\n]", "  'node-e-projeto',\n  // Curso Docker\n  'docker-imagens',\n  'docker-ex1',\n  'docker-ex2',\n  'docker-projeto',\n  'docker-run',\n  'docker-r-ex1',\n  'docker-r-ex2',\n  'docker-r-projeto',\n  'docker-dockerfile',\n  'docker-d-ex1',\n  'docker-d-ex2',\n  'docker-d-projeto',\n]")
t = t.replace("""    // Códigos do curso Backend começam com comentário ou const
    for (const [slug, code] of Object.entries(BACKEND_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\\/\\/|const |let )/)
    }""",
"""    // Códigos do curso Backend começam com comentário ou const
    for (const [slug, code] of Object.entries(BACKEND_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/const em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|\\/\\/|const |let )/)
    }
    // Códigos do curso Docker começam com import
    for (const [slug, code] of Object.entries(DOCKER_CODES)) {
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
docker_solutions = '''
  // ── Curso Docker ───────────────────────────────────────────
  'docker-ex1': {
    explanation:
      'docker version --format {{.Server.Version}} mostra o daemon. O formato Go extrai só a versão.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "version", "--format", "{{.Server.Version}}"], capture_output=True, text=True)
print(f"server: {r.stdout.strip()}")`,
  },
  'docker-ex2': {
    explanation:
      'docker images lista as imagens baixadas; --format simplifica; filtro remove linhas vazias.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "images", "--format", "{{.Repository}}:{{.Tag}}"], capture_output=True, text=True)
imagens = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"imagens: {len(imagens)}")`,
  },
  'docker-projeto': {
    explanation:
      'docker ps -aq lista TODOS os containers (incluindo parados). Ambiente limpo do sandbox = 0.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "ps", "-aq"], capture_output=True, text=True)
containers = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"containers: {len(containers)}")`,
  },
  'docker-r-ex1': {
    explanation:
      'docker run cria o container e roda o comando. --rm limpa ao terminar. A saída do echo é capturada.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "run", "--rm", "alpine", "echo", "container ok"], capture_output=True, text=True)
print(f"saida: {r.stdout.strip()}")`,
  },
  'docker-r-ex2': {
    explanation:
      'A imagem python:3.12-alpine tem Python embutido — o comando roda ISOLADO, com as libs da imagem.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "run", "--rm", "python:3.12-alpine", "python", "-c", "print('python no container')"], capture_output=True, text=True)
print(f"saida: {r.stdout.strip()}")`,
  },
  'docker-r-projeto': {
    explanation:
      'O exit code do container propaga para o subprocess: exit 3 → returncode 3. 0 = sucesso.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "run", "--rm", "alpine", "sh", "-c", "exit 3"], capture_output=True, text=True)
print(f"exit: {r.returncode}")`,
  },
  'docker-d-ex1': {
    explanation:
      'FROM define a base; CMD o comando ao rodar. build -q -t cria a imagem com a tag; run executa.',
    code: `import subprocess, os
DOCKER = "/usr/local/bin/docker"

os.makedirs("/tmp/app", exist_ok=True)
with open("/tmp/app/Dockerfile", "w") as f:
    f.write("FROM alpine\\nCMD [\\"echo\\", \\"app rodando\\"]\\n")

r = subprocess.run([DOCKER, "build", "-q", "-t", "meu-app", "/tmp/app"], capture_output=True, text=True)
r2 = subprocess.run([DOCKER, "run", "--rm", "meu-app"], capture_output=True, text=True)
print(f"saida: {r2.stdout.strip()}")`,
  },
  'docker-d-ex2': {
    explanation:
      'WORKDIR define o diretório; RUN executa DURANTE o build (cria o arquivo); CMD cat lê ao rodar.',
    code: `import subprocess, os
DOCKER = "/usr/local/bin/docker"

os.makedirs("/tmp/app2", exist_ok=True)
with open("/tmp/app2/Dockerfile", "w") as f:
    f.write("FROM alpine\\nWORKDIR /app\\nRUN echo 'construido' > /app/arquivo.txt\\nCMD cat /app/arquivo.txt\\n")

r = subprocess.run([DOCKER, "build", "-q", "-t", "app2", "/tmp/app2"], capture_output=True, text=True)
r2 = subprocess.run([DOCKER, "run", "--rm", "app2"], capture_output=True, text=True)
print(f"saida: {r2.stdout.strip()}")`,
  },
  'docker-d-projeto': {
    explanation:
      'ENV define a variável no container; $APP_NOME é expandida pelo shell do CMD.',
    code: `import subprocess, os
DOCKER = "/usr/local/bin/docker"

os.makedirs("/tmp/app3", exist_ok=True)
with open("/tmp/app3/Dockerfile", "w") as f:
    f.write("FROM alpine\\nENV APP_NOME=meu-app\\nCMD echo \\"App: $APP_NOME\\"\\n")

r = subprocess.run([DOCKER, "build", "-q", "-t", "app3", "/tmp/app3"], capture_output=True, text=True)
r2 = subprocess.run([DOCKER, "run", "--rm", "app3"], capture_output=True, text=True)
print(f"saida: {r2.stdout.strip()}")`,
  },
}
'''
idx = s.rindex('}\n\n/** Busca a solução')
s = s[:idx] + docker_solutions + s[idx:]
open('lib/lessons/solutions.ts', 'w').write(s)
print("soluções Docker adicionadas")
