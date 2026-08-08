"""Integra ESTAT_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { JWT_CODES } from './jwt-codes'", "import { JWT_CODES } from './jwt-codes'\nimport { ESTAT_CODES } from './estat-codes'")
src = src.replace("    JWT_CODES[lessonSlug] ??", "    JWT_CODES[lessonSlug] ??\n    ESTAT_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { JWT_CODES } from '../jwt-codes'", "import { JWT_CODES } from '../jwt-codes'\nimport { ESTAT_CODES } from '../estat-codes'")
t = t.replace("  'jwt-p-projeto',\n]", "  'jwt-p-projeto',\n  // Curso Estatística com Python\n  'estat-central',\n  'estat-ex1',\n  'estat-ex2',\n  'estat-projeto',\n  'estat-dispersao',\n  'estat-d-ex1',\n  'estat-d-ex2',\n  'estat-d-projeto',\n  'estat-avancado',\n  'estat-a-ex1',\n  'estat-a-ex2',\n  'estat-a-projeto',\n]")
t = t.replace("""    // Códigos do curso JWT começam com import
    for (const [slug, code] of Object.entries(JWT_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso JWT começam com import
    for (const [slug, code] of Object.entries(JWT_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Estatística começam com import
    for (const [slug, code] of Object.entries(ESTAT_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
