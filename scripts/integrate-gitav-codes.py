"""Integra GITAV_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { ESTAT_CODES } from './estat-codes'", "import { ESTAT_CODES } from './estat-codes'\nimport { GITAV_CODES } from './gitav-codes'")
src = src.replace("    ESTAT_CODES[lessonSlug] ??", "    ESTAT_CODES[lessonSlug] ??\n    GITAV_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { ESTAT_CODES } from '../estat-codes'", "import { ESTAT_CODES } from '../estat-codes'\nimport { GITAV_CODES } from '../gitav-codes'")
t = t.replace("  'estat-a-projeto',\n]", "  'estat-a-projeto',\n  // Curso Git Avançado\n  'gitav-stash',\n  'gitav-ex1',\n  'gitav-projeto',\n  'gitav-cherrypick',\n  'gitav-c-ex1',\n  'gitav-c-ex2',\n  'gitav-c-projeto',\n  'gitav-diagnostico',\n  'gitav-d-ex1',\n  'gitav-d-ex2',\n  'gitav-d-projeto',\n]")
t = t.replace("""    // Códigos do curso Estatística começam com import
    for (const [slug, code] of Object.entries(ESTAT_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso Estatística começam com import
    for (const [slug, code] of Object.entries(ESTAT_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Git Avançado começam com import
    for (const [slug, code] of Object.entries(GITAV_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
