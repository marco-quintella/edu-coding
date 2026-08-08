"""Integra SQLAV_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { ALG_CODES } from './alg-codes'", "import { ALG_CODES } from './alg-codes'\nimport { SQLAV_CODES } from './sqlav-codes'")
src = src.replace("    ALG_CODES[lessonSlug] ??", "    ALG_CODES[lessonSlug] ??\n    SQLAV_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { ALG_CODES } from '../alg-codes'", "import { ALG_CODES } from '../alg-codes'\nimport { SQLAV_CODES } from '../sqlav-codes'")
t = t.replace("  'alg-r-projeto',\n]", "  'alg-r-projeto',\n  // Curso SQL Avançado\n  'sqlav-subqueries',\n  'sqlav-ex1',\n  'sqlav-ex2',\n  'sqlav-projeto',\n  'sqlav-cte',\n  'sqlav-c-ex1',\n  'sqlav-c-ex2',\n  'sqlav-c-projeto',\n  'sqlav-window',\n  'sqlav-w-ex1',\n  'sqlav-w-ex2',\n  'sqlav-w-projeto',\n]")
t = t.replace("""    // Códigos do curso Algoritmos começam com comentário ou def
    for (const [slug, code] of Object.entries(ALG_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/def em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|def |[a-zA-Z_])/)
    }""",
"""    // Códigos do curso Algoritmos começam com comentário ou def
    for (const [slug, code] of Object.entries(ALG_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/def em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|def |[a-zA-Z_])/)
    }
    // Códigos do curso SQL Avançado começam com import
    for (const [slug, code] of Object.entries(SQLAV_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
