/**
 * Códigos iniciais do curso "Análise de Dados com pandas".
 * pandas 3.0.5 instalado no checkpoint ml-base.
 * Chaves únicas por lição (prefixo: pandas / pandas-f / pandas-l).
 */

export const PANDAS_CODES: Record<string, string> = {
  // ── Lição 1: DataFrames (hands-on) ─────────────────────────
  'pandas-dataframes': `import pandas as pd

vendas = pd.DataFrame({
    "produto": ["notebook", "mouse", "teclado", "monitor", "webcam"],
    "quantidade": [10, 50, 30, 8, 20],
    "preco": [3500, 60, 120, 800, 250],
})

print(vendas.head())`,

  'pandas-ex1': `import pandas as pd

vendas = pd.DataFrame({
    "produto": ["notebook", "mouse", "teclado", "monitor", "webcam"],
    "quantidade": [10, 50, 30, 8, 20],
    "preco": [3500, 60, 120, 800, 250],
})

# TODO: crie a coluna "total" (quantidade * preco) e some
print(f"linhas: {len(vendas)}")
print(f"produtos: {len(vendas['produto'].unique())}")
print(f"faturamento total: R\${vendas['total'].sum():.0f}")`,

  'pandas-ex2': `import pandas as pd

notas = pd.DataFrame({
    "aluno": ["ana", "bob", "carol", "dan", "eva"],
    "nota": [7.5, 5.0, 8.0, 6.5, 9.0],
})

# TODO: conte aprovados (nota >= 7), média geral e melhor nota
aprovados = notas[notas["nota"] >= 7]

print(f"aprovados: {len(aprovados)}")
print(f"media geral: {notas['nota'].mean():.1f}")
print(f"melhor nota: {notas['nota'].max():.1f}")`,

  'pandas-projeto': `import pandas as pd

vendas = pd.DataFrame({
    "mes": ["jan", "fev", "mar", "abr", "mai", "jun"],
    "receita": [10000, 12000, 11000, 15000, 14000, 18000],
})

# TODO: total, média mensal e melhor mês (idxmax)
print(f"total semestre: R\${vendas['receita'].sum():.0f}")
print(f"media mensal: R\${vendas['receita'].mean():.0f}")
print(f"melhor mes: {vendas.loc[vendas['receita'].idxmax(), 'mes']}")`,

  // ── Lição 2: Filtros e groupby (hands-on) ──────────────────
  'pandas-filtros': `import pandas as pd

vendas = pd.DataFrame({
    "vendedor": ["ana", "bob", "ana", "carol", "bob", "ana"],
    "mes": ["jan", "jan", "fev", "jan", "fev", "mar"],
    "valor": [3000, 1500, 2500, 2000, 1000, 3500],
})

print(vendas[vendas["valor"] >= 2000])`,

  'pandas-f-ex1': `import pandas as pd

vendas = pd.DataFrame({
    "vendedor": ["ana", "bob", "ana", "carol", "bob", "ana"],
    "mes": ["jan", "jan", "fev", "jan", "fev", "mar"],
    "valor": [3000, 1500, 2500, 2000, 1000, 3500],
})

# TODO: ranking por vendedor (groupby + sum + sort_values)
por_vendedor = vendas.groupby("vendedor")["valor"].sum().sort_values(ascending=False)

print("ranking:")
for vendedor, total in por_vendedor.items():
    print(f"  {vendedor}: R\${total:.0f}")`,

  'pandas-f-ex2': `import pandas as pd

clientes = pd.DataFrame({
    "cidade": ["SP", "RJ", "SP", "BH", "RJ", "SP"],
    "gasto": [500, 1200, 800, 300, 600, 2000],
})

# TODO: agregações por cidade (sum, mean, count)
por_cidade = clientes.groupby("cidade")["gasto"].agg(["sum", "mean", "count"]).round(0)

print("por cidade:")
for cidade, row in por_cidade.iterrows():
    print(f"  {cidade}: total R\${row['sum']:.0f}, media R\${row['mean']:.0f}, {int(row['count'])} clientes")`,

  'pandas-f-projeto': `import pandas as pd

produtos = pd.DataFrame({
    "categoria": ["eletronico", "escritorio", "eletronico", "escritorio", "eletronico"],
    "produto": ["notebook", "caneta", "monitor", "papel", "mouse"],
    "vendas": [50, 200, 30, 300, 80],
})

# TODO: categoria que mais vende (groupby + sum + idxmax)
por_cat = produtos.groupby("categoria")["vendas"].sum()

print(f"categorias: {len(por_cat)}")
print(f"top categoria: {por_cat.idxmax()} ({por_cat.max()} vendas)")`,

  // ── Lição 3: Limpeza (hands-on) ────────────────────────────
  'pandas-limpeza': `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "nome": ["ana", "bob", "carol", "dan"],
    "idade": [25, np.nan, 30, np.nan],
})

print(df)`,

  'pandas-l-ex1': `import pandas as pd

precos = pd.DataFrame({
    "produto": ["teclado", "mouse", "monitor"],
    "preco": [120, 60, 800],
})

# TODO: crie a coluna promocao (-10%) e ache o produto mais caro
precos["promocao"] = (precos["preco"] * 0.9).round(0)

print(f"mais caro: {precos.loc[precos['preco'].idxmax(), 'produto']}")
print(f"promocao do teclado: R\${precos.loc[precos['produto']=='teclado', 'promocao'].iloc[0]:.0f}")`,

  'pandas-l-ex2': `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "nome": ["ana", "bob", "carol", "dan"],
    "idade": [25, np.nan, 30, np.nan],
})

# TODO: conte nulos, calcule a média e preencha com a média
print(f"valores nulos: {df['idade'].isna().sum()}")
print(f"media: {df['idade'].mean():.1f}")

df_preenchido = df.fillna({"idade": df["idade"].mean()})
print(f"preenchidos: {df_preenchido['idade'].isna().sum()}")`,

  'pandas-l-projeto': `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "produto": ["a", "b", "c", "d"],
    "preco": [100, np.nan, 150, np.nan],
})

# TODO: preencha os preços faltantes com a média e mostre
df["preco"] = df["preco"].fillna(df["preco"].mean())

print(f"precos: {list(df['preco'])}")`,
}
