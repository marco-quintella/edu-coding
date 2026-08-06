"""Integra REACT_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { FASTAPI_CODES } from './fastapi-codes'", "import { FASTAPI_CODES } from './fastapi-codes'\nimport { REACT_CODES } from './react-codes'")
src = src.replace("    FASTAPI_CODES[lessonSlug] ??", "    FASTAPI_CODES[lessonSlug] ??\n    REACT_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { FASTAPI_CODES } from '../fastapi-codes'", "import { FASTAPI_CODES } from '../fastapi-codes'\nimport { REACT_CODES } from '../react-codes'")
t = t.replace("  'fastapi-p-projeto',\n]", "  'fastapi-p-projeto',\n  // Curso React\n  'react-componentes',\n  'react-ex1',\n  'react-ex2',\n  'react-projeto',\n  'react-listas',\n  'react-l-ex1',\n  'react-l-ex2',\n  'react-l-projeto',\n  'react-composicao',\n  'react-c-ex1',\n  'react-c-ex2',\n  'react-c-projeto',\n]")
t = t.replace("""    // Códigos do curso FastAPI começam com import
    for (const [slug, code] of Object.entries(FASTAPI_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso FastAPI começam com import
    for (const [slug, code] of Object.entries(FASTAPI_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso React começam com const
    for (const [slug, code] of Object.entries(REACT_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é const em ${slug}: ${firstLine}`,
      ).toMatch(/^(const |\\/\\/|#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
