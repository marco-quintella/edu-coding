import { describe, it, expect } from 'vitest'
import { CHEATSHEETS, readCheatsheet } from '../service'

describe('cheat sheets (referência rápida por fase)', () => {
  it('5 cheat sheets (uma por fase)', () => {
    expect(CHEATSHEETS).toHaveLength(5)
    expect(new Set(CHEATSHEETS.map((c) => c.phase))).toEqual(new Set([1, 2, 3, 4, 5]))
    expect(new Set(CHEATSHEETS.map((c) => c.slug))).toHaveLength(5)
  })

  it('todos os arquivos markdown existem e têm conteúdo', async () => {
    for (const c of CHEATSHEETS) {
      const md = await readCheatsheet(c.slug)
      expect(md, `${c.file} deve existir`).not.toBeNull()
      expect(md!.length, `${c.file} deve ter conteúdo`).toBeGreaterThan(500)
    }
  })

  it('cada cheat sheet tem blocos de código (```)', async () => {
    for (const c of CHEATSHEETS) {
      const md = await readCheatsheet(c.slug)
      const codeBlocks = (md!.match(/```/g) ?? []).length
      expect(codeBlocks, `${c.file} deve ter blocos de código`).toBeGreaterThanOrEqual(2)
    }
  })

  it('readCheatsheet retorna null para slug inexistente', async () => {
    expect(await readCheatsheet('nao-existe')).toBeNull()
  })
})
