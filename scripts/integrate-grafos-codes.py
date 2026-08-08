"""Integra GRAFOS_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { ML_CODES } from './ml-codes'", "import { ML_CODES } from './ml-codes'\nimport { GRAFOS_CODES } from './grafos-codes'")
src = src.replace("    ML_CODES[lessonSlug] ??", "    ML_CODES[lessonSlug] ??\n    GRAFOS_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { ML_CODES } from '../ml-codes'", "import { ML_CODES } from '../ml-codes'\nimport { GRAFOS_CODES } from '../grafos-codes'")
t = t.replace("  'ml-k-projeto',\n]", "  'ml-k-projeto',\n  // Curso Grafos\n  'grafos-bfs',\n  'grafos-ex1',\n  'grafos-ex2',\n  'grafos-projeto',\n  'grafos-dfs',\n  'grafos-d-ex1',\n  'grafos-d-ex2',\n  'grafos-d-projeto',\n  'grafos-avancado',\n  'grafos-a-ex1',\n  'grafos-a-ex2',\n  'grafos-a-projeto',\n]")
t = t.replace("""    // Códigos do curso ML começam com import
    for (const [slug, code] of Object.entries(ML_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso ML começam com import
    for (const [slug, code] of Object.entries(ML_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso Grafos começam com import ou comentário
    for (const [slug, code] of Object.entries(GRAFOS_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import/comentário em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|[a-zA-Z_])/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
