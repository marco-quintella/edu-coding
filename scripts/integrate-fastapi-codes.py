"""Integra FASTAPI_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { DOCKER_CODES } from './docker-codes'", "import { DOCKER_CODES } from './docker-codes'\nimport { FASTAPI_CODES } from './fastapi-codes'")
src = src.replace("    DOCKER_CODES[lessonSlug] ??", "    DOCKER_CODES[lessonSlug] ??\n    FASTAPI_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { DOCKER_CODES } from '../docker-codes'", "import { DOCKER_CODES } from '../docker-codes'\nimport { FASTAPI_CODES } from '../fastapi-codes'")
t = t.replace("  'docker-d-projeto',\n]", "  'docker-d-projeto',\n  // Curso FastAPI\n  'fastapi-primeiros-passos',\n  'fastapi-ex1',\n  'fastapi-ex2',\n  'fastapi-projeto',\n  'fastapi-rotas',\n  'fastapi-r-ex1',\n  'fastapi-r-ex2',\n  'fastapi-r-projeto',\n  'fastapi-post',\n  'fastapi-p-ex1',\n  'fastapi-p-ex2',\n  'fastapi-p-projeto',\n]")
t = t.replace("""    // Códigos do curso Docker começam com import
    for (const [slug, code] of Object.entries(DOCKER_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso Docker começam com import
    for (const [slug, code] of Object.entries(DOCKER_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso FastAPI começam com import
    for (const [slug, code] of Object.entries(FASTAPI_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
