/**
 * Códigos iniciais do curso "Estatística com Python".
 * stdlib (statistics/collections) — roda no sandbox ml-base.
 * Chaves únicas por lição (prefixo: estat / estat-d / estat-a).
 */

export const ESTAT_CODES: Record<string, string> = {
  // ── Lição 1: Central (hands-on) ────────────────────────────
  'estat-central': `import statistics

# Medidas de tendência central
notas = [7.5, 8.0, 6.5, 9.0, 7.0]

media = statistics.mean(notas)
mediana = statistics.median(notas)

print(f"media: {media:.2f}")
print(f"mediana: {mediana:.2f}")`,

  'estat-ex1': `import statistics

# TODO: média e mediana das notas
notas = [7.5, 8.0, 6.5, 9.0, 7.0]

media = statistics.mean(notas)
mediana = statistics.median(notas)

print(f"media: {media:.2f}")
print(f"mediana: {mediana:.2f}")`,

  'estat-ex2': `import statistics

# TODO: compare média e mediana com outlier
salarios = [3000, 3200, 3100, 2900, 50000]

media = statistics.mean(salarios)
mediana = statistics.median(salarios)

print(f"media: {media:.0f}")
print(f"mediana: {mediana:.0f}")
print(f"outlier distorce: {media > mediana}")`,

  'estat-projeto': `import statistics

# TODO: análise das vendas da semana
vendas = [150, 200, 175, 190, 210, 180, 165]

media = statistics.mean(vendas)
mediana = statistics.median(vendas)
print(f"media: {media:.0f}")
print(f"mediana: {mediana:.0f}")`,

  // ── Lição 2: Dispersão (hands-on) ──────────────────────────
  'estat-dispersao': `import statistics

# Dispersão: desvio padrão
gastos = [100, 120, 110, 105, 115]

desvio = statistics.stdev(gastos)
print(f"desvio: {desvio:.2f}")
print(f"baixa dispersao: {desvio < 10}")`,

  'estat-d-ex1': `import statistics

# TODO: desvio padrão dos gastos
gastos = [100, 120, 110, 105, 115]

desvio = statistics.stdev(gastos)
print(f"desvio: {desvio:.2f}")
print(f"baixa dispersao: {desvio < 10}")`,

  'estat-d-ex2': `import statistics

# TODO: variância e amplitude
precos = [10, 50, 100, 500, 1000]

variancia = statistics.variance(precos)
amplitude = max(precos) - min(precos)

print(f"variancia: {variancia:.0f}")
print(f"amplitude: {amplitude}")`,

  'estat-d-projeto': `import statistics

# TODO: compare a consistência dos vendedores
ana = [5000, 5100, 4900, 5050, 4950]
bob = [4000, 6500, 3000, 7000, 3500]

desvio_ana = statistics.stdev(ana)
desvio_bob = statistics.stdev(bob)
print(f"ana desvio: {desvio_ana:.0f}")
print(f"bob desvio: {desvio_bob:.0f}")
print(f"mais consistente: {'ana' if desvio_ana < desvio_bob else 'bob'}")`,

  // ── Lição 3: Avançado (hands-on) ───────────────────────────
  'estat-avancado': `import statistics

# Moda e frequência
idades = [25, 30, 25, 35, 25, 40, 30]

moda = statistics.mode(idades)
print(f"moda: {moda}")

from collections import Counter
freq = Counter(idades)
print(f"25 aparece: {freq[25]}x")`,

  'estat-a-ex1': `import statistics
from collections import Counter

# TODO: moda e frequência
idades = [25, 30, 25, 35, 25, 40, 30]

moda = statistics.mode(idades)
print(f"moda: {moda}")

freq = Counter(idades)
print(f"25 aparece: {freq[25]}x")`,

  'estat-a-ex2': `import statistics

# TODO: percentil 90
notas = [5, 6, 7, 8, 9, 10, 4, 3, 8, 7]

p90 = statistics.quantiles(notas, n=10)[8]
print(f"p90: {p90:.0f}")`,

  'estat-a-projeto': `import statistics

# TODO: relatório descritivo completo
dados = [12, 15, 15, 18, 20, 22, 25, 30, 45]

print(f"media: {statistics.mean(dados):.1f}")
print(f"mediana: {statistics.median(dados)}")
print(f"moda: {statistics.mode(dados)}")
print(f"desvio: {statistics.stdev(dados):.1f}")`,
}
