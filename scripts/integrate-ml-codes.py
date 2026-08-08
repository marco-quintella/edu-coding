"""Integra ML_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { GITAV_CODES } from './gitav-codes'", "import { GITAV_CODES } from './gitav-codes'\nimport { ML_CODES } from './ml-codes'")
src = src.replace("    GITAV_CODES[lessonSlug] ??", "    GITAV_CODES[lessonSlug] ??\n    ML_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { GITAV_CODES } from '../gitav-codes'", "import { GITAV_CODES } from '../gitav-codes'\nimport { ML_CODES } from '../ml-codes'")
t = t.replace("  'gitav-d-projeto',\n]", "  'gitav-d-projeto',\n  // Curso Machine Learning\n  'ml-regressao',\n  'ml-ex1',\n  'ml-ex2',\n  'ml-projeto',\n  'ml-classificacao',\n  'ml-c-ex1',\n  'ml-c-ex2',\n  'ml-c-projeto',\n  'ml-clustering',\n  'ml-k-ex1',\n  'ml-k-ex2',\n  'ml-k-projeto',\n]")
t = t.replace("""    // Códigos do curso Git Avançado começam com import
    for (const [slug, code] of Object.entries(GITAV_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso Git Avançado começam com import
    for (const [slug, code] of Object.entries(GITAV_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso ML começam com import
    for (const [slug, code] of Object.entries(ML_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
