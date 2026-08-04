import { describe, it, expect } from 'vitest'
import { extractPlots, wrapWithPlotCapture, PLOT_MARKER } from '../plots'

describe('extractPlots', () => {
  it('extrai plots base64 e limpa o stdout', () => {
    const stdout = `inicio\n${PLOT_MARKER}AAAABBBB\nfim\n`
    const { plots, cleanStdout } = extractPlots(stdout)
    expect(plots).toEqual(['AAAABBBB'])
    expect(cleanStdout).toBe('inicio\nfim')
  })

  it('extrai múltiplos plots', () => {
    const stdout = `${PLOT_MARKER}AAA\n${PLOT_MARKER}BBB\nprint\n`
    const { plots, cleanStdout } = extractPlots(stdout)
    expect(plots).toEqual(['AAA', 'BBB'])
    expect(cleanStdout).toBe('print')
  })

  it('stdout sem plots fica intacto', () => {
    const stdout = 'slope=3.00\n'
    const { plots, cleanStdout } = extractPlots(stdout)
    expect(plots).toEqual([])
    expect(cleanStdout).toBe('slope=3.00')
  })

  it('linha que apenas começa com o marcador mas vazia é ignorada', () => {
    const { plots, cleanStdout } = extractPlots(`${PLOT_MARKER}\nok`)
    expect(plots).toEqual([])
    expect(cleanStdout).toBe('ok')
  })
})

describe('wrapWithPlotCapture', () => {
  it('envolve o código do aluno com preâmbulo e pós-código', () => {
    const code = 'print(2 + 2)'
    const wrapped = wrapWithPlotCapture(code)
    expect(wrapped).toContain("_mpl.use('Agg')")
    expect(wrapped).toContain('print(2 + 2)')
    expect(wrapped).toContain('get_fignums()')
    // Código do aluno vem depois do preâmbulo e antes do pós-código
    const preIdx = wrapped.indexOf('use')
    const codeIdx = wrapped.indexOf('print(2 + 2)')
    const postIdx = wrapped.indexOf('get_fignums()')
    expect(preIdx).toBeLessThan(codeIdx)
    expect(codeIdx).toBeLessThan(postIdx)
  })
})
