"""Integra SCRAPING_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { LINUX_CODES } from './linux-codes'", "import { LINUX_CODES } from './linux-codes'\nimport { SCRAPING_CODES } from './scraping-codes'")
src = src.replace("    LINUX_CODES[lessonSlug] ??", "    LINUX_CODES[lessonSlug] ??\n    SCRAPING_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { LINUX_CODES } from '../linux-codes'", "import { LINUX_CODES } from '../linux-codes'\nimport { SCRAPING_CODES } from '../scraping-codes'")
t = t.replace("  'linux-p-projeto',\n]", "  'linux-p-projeto',\n  // Curso Web Scraping\n  'scraping-html',\n  'scraping-ex1',\n  'scraping-ex2',\n  'scraping-projeto',\n  'scraping-api',\n  'scraping-a-ex1',\n  'scraping-a-ex2',\n  'scraping-a-projeto',\n  'scraping-pipeline',\n  'scraping-p-ex1',\n  'scraping-p-ex2',\n  'scraping-p-projeto',\n]")
t = t.replace("""    // Códigos do curso Linux começam com import
    for (const [slug, code] of Object.entries(LINUX_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso Linux começam com import
    for (const [slug, code] of Object.entries(LINUX_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Scraping começam com import
    for (const [slug, code] of Object.entries(SCRAPING_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
