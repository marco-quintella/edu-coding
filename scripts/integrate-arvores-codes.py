"""Integra ARVORES_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { PATTERNS_CODES } from './patterns-codes'", "import { PATTERNS_CODES } from './patterns-codes'\nimport { ARVORES_CODES } from './arvores-codes'")
src = src.replace("    PATTERNS_CODES[lessonSlug] ??", "    PATTERNS_CODES[lessonSlug] ??\n    ARVORES_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { PATTERNS_CODES } from '../patterns-codes'", "import { PATTERNS_CODES } from '../patterns-codes'\nimport { ARVORES_CODES } from '../arvores-codes'")
t = t.replace("  'patterns-e-projeto',\n]", "  'patterns-e-projeto',\n  // Curso Árvores Binárias\n  'arvores-bst',\n  'arvores-ex1',\n  'arvores-ex2',\n  'arvores-projeto',\n  'arvores-percursos',\n  'arvores-p-ex1',\n  'arvores-p-ex2',\n  'arvores-p-projeto',\n  'arvores-operacoes',\n  'arvores-o-ex1',\n  'arvores-o-ex2',\n  'arvores-o-projeto',\n]")
t = t.replace("""    // Códigos do curso Patterns começam com comentário
    for (const [slug, code] of Object.entries(PATTERNS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|[a-zA-Z_])/)
    }""",
"""    // Códigos do curso Patterns começam com comentário
    for (const [slug, code] of Object.entries(PATTERNS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|[a-zA-Z_])/)
    }
    // Códigos do curso Árvores começam com comentário
    for (const [slug, code] of Object.entries(ARVORES_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|[a-zA-Z_])/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
