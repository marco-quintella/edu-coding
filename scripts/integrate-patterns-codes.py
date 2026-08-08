"""Integra PATTERNS_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { GRAFOS_CODES } from './grafos-codes'", "import { GRAFOS_CODES } from './grafos-codes'\nimport { PATTERNS_CODES } from './patterns-codes'")
src = src.replace("    GRAFOS_CODES[lessonSlug] ??", "    GRAFOS_CODES[lessonSlug] ??\n    PATTERNS_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { GRAFOS_CODES } from '../grafos-codes'", "import { GRAFOS_CODES } from '../grafos-codes'\nimport { PATTERNS_CODES } from '../patterns-codes'")
t = t.replace("  'grafos-a-projeto',\n]", "  'grafos-a-projeto',\n  // Curso Design Patterns\n  'patterns-criacionais',\n  'patterns-ex1',\n  'patterns-ex2',\n  'patterns-projeto',\n  'patterns-comportamentais',\n  'patterns-c-ex1',\n  'patterns-c-ex2',\n  'patterns-c-projeto',\n  'patterns-estruturais',\n  'patterns-e-ex1',\n  'patterns-e-ex2',\n  'patterns-e-projeto',\n]")
t = t.replace("""    // Códigos do curso Grafos começam com import ou comentário
    for (const [slug, code] of Object.entries(GRAFOS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|[a-zA-Z_])/)
    }""",
"""    // Códigos do curso Grafos começam com import ou comentário
    for (const [slug, code] of Object.entries(GRAFOS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|[a-zA-Z_])/)
    }
    // Códigos do curso Patterns começam com comentário
    for (const [slug, code] of Object.entries(PATTERNS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|[a-zA-Z_])/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
