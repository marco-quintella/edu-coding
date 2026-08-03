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

  it('trata o esperado como texto literal (parênteses não são grupo)', () => {
    // Antes, "(3, 6)" virava grupo de captura e o match falhava
    expect(outputMatches("shape: (3, 6)\n", 'shape: (3, 6)')).toBe(true)
    expect(outputMatches('telhado (doc0)=0.563', 'telhado (doc0)=0.563')).toBe(true)
  })

  it('escapa ponto, sinal de mais e colchetes', () => {
    expect(outputMatches('acuracia=0.95', 'acuracia=0.95')).toBe(true)
    expect(outputMatches('a+b=3', 'a+b=3')).toBe(true)
    expect(outputMatches('x[0]=1', 'x[0]=1')).toBe(true)
  })

  it('rejeita output vazio', () => {
    expect(outputMatches('', 'slope=3.00')).toBe(false)
    expect(outputMatches('  \n  ', 'slope=3.00')).toBe(false)
  })

  it('lida com fallback quando o escape produz regex inválida', () => {
    // Escape de "[": "[.*" vira "\[\.\*" que é válido... testa o caminho do catch
    expect(outputMatches('slope=[3.00]', 'slope=[')).toBe(true)
    expect(outputMatches('valor normal', 'slope=[')).toBe(false)
  })
})
