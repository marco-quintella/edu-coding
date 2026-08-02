import { describe, it, expect } from 'vitest'
import { outputMatches } from '../exercise'

describe('outputMatches (verificação de exercícios)', () => {
  it('aceita output que contém o padrão esperado', () => {
    expect(outputMatches('slope=3.00\nintercept=5.00', 'slope=3.00')).toBe(true)
  })

  it('rejeita output que não contém o padrão', () => {
    expect(outputMatches('slope=4.50\nintercept=2.00', 'slope=3.00')).toBe(false)
  })

  it('é case-insensitive', () => {
    expect(outputMatches('SLOPE=3.00', 'slope=3.00')).toBe(true)
  })

  it('aceita regex (padrão parcial)', () => {
    expect(outputMatches('r2_teste=0.934', 'r2_teste=0.9')).toBe(true)
    expect(outputMatches('200m² custa R$ 950 mil', '200m²')).toBe(true)
  })

  it('rejeita output vazio', () => {
    expect(outputMatches('', 'slope=3.00')).toBe(false)
    expect(outputMatches('  \n  ', 'slope=3.00')).toBe(false)
  })

  it('lida com regex inválida usando fallback includes', () => {
    // '[' sozinho é regex inválida em JS; fallback faz includes do texto
    expect(outputMatches('slope=[3.00]', 'slope=[')).toBe(true)
    expect(outputMatches('valor normal', 'slope=[')).toBe(false)
  })
})
