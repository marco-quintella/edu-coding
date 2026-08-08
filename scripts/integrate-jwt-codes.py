"""Integra JWT_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { SQLAV_CODES } from './sqlav-codes'", "import { SQLAV_CODES } from './sqlav-codes'\nimport { JWT_CODES } from './jwt-codes'")
src = src.replace("    SQLAV_CODES[lessonSlug] ??", "    SQLAV_CODES[lessonSlug] ??\n    JWT_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { SQLAV_CODES } from '../sqlav-codes'", "import { SQLAV_CODES } from '../sqlav-codes'\nimport { JWT_CODES } from '../jwt-codes'")
t = t.replace("  'sqlav-w-projeto',\n]", "  'sqlav-w-projeto',\n  // Curso Autenticação & JWT\n  'jwt-base64',\n  'jwt-ex1',\n  'jwt-ex2',\n  'jwt-projeto',\n  'jwt-assinatura',\n  'jwt-a-ex1',\n  'jwt-a-ex2',\n  'jwt-a-projeto',\n  'jwt-producao',\n  'jwt-p-ex1',\n  'jwt-p-ex2',\n  'jwt-p-projeto',\n]")
t = t.replace("""    // Códigos do curso SQL Avançado começam com import
    for (const [slug, code] of Object.entries(SQLAV_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso SQL Avançado começam com import
    for (const [slug, code] of Object.entries(SQLAV_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso JWT começam com import
    for (const [slug, code] of Object.entries(JWT_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
