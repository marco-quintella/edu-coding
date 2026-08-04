import { describe, it, expect } from 'vitest'
import { GLOSSARY_TERMS, getGlossaryTerm } from '../terms'
import { INITIAL_CODES } from '@/lib/lessons/initial-codes'

describe('GLOSSARY_TERMS (glossário interativo)', () => {
  it('termos têm ids únicos', () => {
    const ids = GLOSSARY_TERMS.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('todo termo tem definição e nome', () => {
    for (const t of GLOSSARY_TERMS) {
      expect(t.term.length, t.id).toBeGreaterThan(2)
      expect(t.definition.length, t.id).toBeGreaterThan(20)
    }
  })

  it('todo lessonSlug aponta para uma lição real do curso', () => {
    for (const t of GLOSSARY_TERMS) {
      expect(INITIAL_CODES[t.lessonSlug], `lição '${t.lessonSlug}' do termo '${t.id}'`).toBeDefined()
    }
  })

  it('cobre as 5 fases', () => {
    const phases = new Set(GLOSSARY_TERMS.map((t) => t.phase))
    expect(phases).toEqual(new Set([1, 2, 3, 4, 5]))
  })

  it('getGlossaryTerm retorna null para id inexistente', () => {
    expect(getGlossaryTerm('nao-existe')).toBeNull()
  })

  it('getGlossaryTerm retorna o termo correto', () => {
    expect(getGlossaryTerm('overfitting')?.term).toContain('Overfitting')
  })
})
