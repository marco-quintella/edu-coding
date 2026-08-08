"""Integra SECURITY_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { SCRAPING_CODES } from './scraping-codes'", "import { SCRAPING_CODES } from './scraping-codes'\nimport { SECURITY_CODES } from './security-codes'")
src = src.replace("    SCRAPING_CODES[lessonSlug] ??", "    SCRAPING_CODES[lessonSlug] ??\n    SECURITY_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { SCRAPING_CODES } from '../scraping-codes'", "import { SCRAPING_CODES } from '../scraping-codes'\nimport { SECURITY_CODES } from '../security-codes'")
t = t.replace("  'scraping-p-projeto',\n]", "  'scraping-p-projeto',\n  // Curso Cibersegurança\n  'security-hash',\n  'security-ex1',\n  'security-ex2',\n  'security-projeto',\n  'security-ataques',\n  'security-a-ex1',\n  'security-a-ex2',\n  'security-a-projeto',\n  'security-praticas',\n  'security-p-ex1',\n  'security-p-ex2',\n  'security-p-projeto',\n]")
t = t.replace("""    // Códigos do curso Scraping começam com import
    for (const [slug, code] of Object.entries(SCRAPING_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso Scraping começam com import
    for (const [slug, code] of Object.entries(SCRAPING_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Segurança começam com import
    for (const [slug, code] of Object.entries(SECURITY_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
