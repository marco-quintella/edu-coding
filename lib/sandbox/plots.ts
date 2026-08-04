/**
 * Captura de gráficos matplotlib no sandbox.
 *
 * O sandbox executa `python -c <code>`. Para capturar plots do aluno sem
 * exigir nada dele, o código é EMBRULHADO:
 *
 *   1. Preâmbulo: força matplotlib com backend 'Agg' (sem display) e
 *      registra um hook que captura figuras abertas ao final.
 *   2. Código do aluno (inalterado).
 *   3. Pós-código: para cada figura aberta, salva PNG → base64 e imprime
 *      `EDU_PLOT_BASE64:<b64>` no stdout.
 *
 * O parser extrai essas linhas do stdout e devolve como `plots: string[]`.
 * O restante do stdout (prints do aluno) permanece intacto para a
 * verificação de exercícios.
 */

export const PLOT_MARKER = 'EDU_PLOT_BASE64:'

/** Preâmbulo + pós-código que envolvem o código do aluno. */
export function wrapWithPlotCapture(code: string): string {
  return `import matplotlib as _mpl
_mpl.use('Agg')
import matplotlib.pyplot as _plt
import base64 as _b64
import io as _io

${code}

for _f in _plt.get_fignums():
    try:
        _buf = _io.BytesIO()
        _plt.figure(_f).savefig(_buf, format='png', bbox_inches='tight')
        print(f"${PLOT_MARKER}{_b64.b64encode(_buf.getvalue()).decode()}")
    except Exception:
        pass
`
}

/** Extrai plots base64 do stdout (linhas com o marcador) e remove-as. */
export function extractPlots(stdout: string): { plots: string[]; cleanStdout: string } {
  const plots: string[] = []
  const lines = stdout.split('\n')
  const kept: string[] = []

  for (const line of lines) {
    if (line.startsWith(PLOT_MARKER)) {
      const b64 = line.slice(PLOT_MARKER.length).trim()
      if (b64.length > 0) plots.push(b64)
    } else {
      kept.push(line)
    }
  }

  // Remove a última linha vazia residual (o split de '\n' final)
  while (kept.length > 0 && kept[kept.length - 1] === '') kept.pop()

  return { plots, cleanStdout: kept.join('\n') }
}
