"""Integra LINUX_CODES no initial-codes + teste."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { REACT_CODES } from './react-codes'", "import { REACT_CODES } from './react-codes'\nimport { LINUX_CODES } from './linux-codes'")
src = src.replace("    REACT_CODES[lessonSlug] ??", "    REACT_CODES[lessonSlug] ??\n    LINUX_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { REACT_CODES } from '../react-codes'", "import { REACT_CODES } from '../react-codes'\nimport { LINUX_CODES } from '../linux-codes'")
t = t.replace("  'react-c-projeto',\n]", "  'react-c-projeto',\n  // Curso Linux & Terminal\n  'linux-arquivos',\n  'linux-ex1',\n  'linux-ex2',\n  'linux-projeto',\n  'linux-grep',\n  'linux-g-ex1',\n  'linux-g-ex2',\n  'linux-g-projeto',\n  'linux-pipes',\n  'linux-p-ex1',\n  'linux-p-ex2',\n  'linux-p-projeto',\n]")
t = t.replace("""    // Códigos do curso React começam com const
    for (const [slug, code] of Object.entries(REACT_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é const em ${slug}: ${firstLine}`,
      ).toMatch(/^(const |\\/\\/|#)/)
    }""",
"""    // Códigos do curso React começam com const
    for (const [slug, code] of Object.entries(REACT_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é const em ${slug}: ${firstLine}`,
      ).toMatch(/^(const |\\/\\/|#)/)
    }
    // Códigos do curso Linux começam com import
    for (const [slug, code] of Object.entries(LINUX_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")
