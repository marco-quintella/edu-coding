"""Integra ALG_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { SECURITY_CODES } from './security-codes'", "import { SECURITY_CODES } from './security-codes'\nimport { ALG_CODES } from './alg-codes'")
src = src.replace("    SECURITY_CODES[lessonSlug] ??", "    SECURITY_CODES[lessonSlug] ??\n    ALG_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { SECURITY_CODES } from '../security-codes'", "import { SECURITY_CODES } from '../security-codes'\nimport { ALG_CODES } from '../alg-codes'")
t = t.replace("  'security-p-projeto',\n]", "  'security-p-projeto',\n  // Curso Algoritmos de Entrevista\n  'alg-two-pointers',\n  'alg-ex1',\n  'alg-ex2',\n  'alg-projeto',\n  'alg-sliding-window',\n  'alg-s-ex1',\n  'alg-s-ex2',\n  'alg-s-projeto',\n  'alg-recursao',\n  'alg-r-ex1',\n  'alg-r-ex2',\n  'alg-r-projeto',\n]")
t = t.replace("""    // Códigos do curso Segurança começam com import
    for (const [slug, code] of Object.entries(SECURITY_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso Segurança começam com import
    for (const [slug, code] of Object.entries(SECURITY_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Algoritmos começam com comentário ou def
    for (const [slug, code] of Object.entries(ALG_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/def em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|def |[a-zA-Z_])/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
