import { describe, it, expect } from 'vitest'
import { parseJsonFromMixedOutput, shellQuote } from '../client'

describe('parseJsonFromMixedOutput', () => {
  it('parseia JSON puro', () => {
    const out = JSON.stringify({ id: 'abc', status: 'RUNNING' })
    expect(parseJsonFromMixedOutput(out)?.id).toBe('abc')
  })

  it('parseia JSON misturado com warning da CLI (bug histórico do sandbox perdido)', () => {
    const out = [
      '⚠ Railway sandboxes are experimental...',
      'Some warning text on the next line',
      JSON.stringify({
        id: 'ce16120e-1234-5678-9abc-def012345678',
        status: 'RUNNING',
        region: 'us-west2',
      }),
      '',
    ].join('\n')
    const parsed = parseJsonFromMixedOutput(out)
    expect(parsed?.id).toBe('ce16120e-1234-5678-9abc-def012345678')
    expect(parsed?.status).toBe('RUNNING')
  })

  it('pega o último bloco JSON quando há múltiplos (progress bars etc)', () => {
    const out = [
      '{ "partial": true }',
      '[⣷] creating...',
      JSON.stringify({ id: 'last-one', status: 'RUNNING' }),
    ].join('\n')
    expect(parseJsonFromMixedOutput(out)?.id).toBe('last-one')
  })

  it('retorna null quando não há JSON', () => {
    expect(parseJsonFromMixedOutput('just a warning line')).toBeNull()
    expect(parseJsonFromMixedOutput('')).toBeNull()
  })

  it('retorna null quando o JSON final está corrompido', () => {
    expect(parseJsonFromMixedOutput('prefix { broken json')).toBeNull()
  })

  it('lida com JSON aninhado (objetos internos)', () => {
    const out = JSON.stringify({
      id: 'nested',
      status: 'RUNNING',
      meta: { nested: { deep: [1, 2, { x: 3 }] } },
    })
    const parsed = parseJsonFromMixedOutput(out)
    expect(parsed?.id).toBe('nested')
    expect(parsed?.status).toBe('RUNNING')
  })
})

describe('shellQuote', () => {
  it('envolve em aspas simples', () => {
    expect(shellQuote('print(1)')).toBe("'print(1)'")
  })

  it('escapa aspas simples internas (código Python com strings)', () => {
    const quoted = shellQuote(`print('ola')`)
    // Deve produzir algo que o shell interpreta como a string original
    expect(quoted).toContain(`'\\''`)
  })

  it('preserva newlines e aspas duplas', () => {
    const code = 'print("a\\nb")'
    const quoted = shellQuote(code)
    expect(quoted).toContain('"a')
    expect(quoted).toContain('\\n')
  })
})
