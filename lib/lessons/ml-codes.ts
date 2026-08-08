/**
 * Códigos iniciais do curso "Machine Learning com Python".
 * sklearn 1.9.0 (no checkpoint ml-base) + numpy.
 * Chaves únicas por lição (prefixo: ml / ml-c / ml-k).
 */

export const ML_CODES: Record<string, string> = {
  // ── Lição 1: Regressão (hands-on) ───────────────────────────
  'ml-regressao': `from sklearn.linear_model import LinearRegression
import numpy as np

# Regressão linear: área (m2) → preço (R$ mil)
X = np.array([[30], [40], [50], [60], [70]])
y = np.array([150, 200, 250, 300, 350])

modelo = LinearRegression()
modelo.fit(X, y)

print(f"coef: {modelo.coef_[0]:.1f}")
print(f"intercept: {modelo.intercept_:.1f}")
print(f"previsao 80m2: {modelo.predict([[80]])[0]:.1f}")`,

  'ml-ex1': `from sklearn.linear_model import LinearRegression
import numpy as np

# TODO: treine e preveja o preço de 80 m2
X = np.array([[30], [40], [50], [60], [70]])
y = np.array([150, 200, 250, 300, 350])

modelo = LinearRegression()
modelo.fit(X, y)

print(f"coef: {modelo.coef_[0]:.1f}")
print(f"intercept: {modelo.intercept_:.1f}")
print(f"previsao 80m2: {modelo.predict([[80]])[0]:.1f}")`,

  'ml-ex2': `from sklearn.linear_model import LinearRegression
import numpy as np

# TODO: preveja o salário com 10 anos de estudo
X = np.array([[0], [2], [4], [6], [8]])
y = np.array([2, 3, 4, 5, 6])

modelo = LinearRegression()
modelo.fit(X, y)

print(f"previsao 10 anos: {modelo.predict([[10]])[0]:.1f}")
print(f"previsao 0 anos: {modelo.predict([[0]])[0]:.1f}")`,

  'ml-projeto': `from sklearn.linear_model import LinearRegression
import numpy as np

# TODO: preveja o preço do carro pela km
X = np.array([[10], [20], [30], [40], [50]])
y = np.array([90, 80, 70, 60, 50])

modelo = LinearRegression()
modelo.fit(X, y)

print(f"previsao 25k km: {modelo.predict([[25]])[0]:.1f}")
print(f"previsao 100k km: {modelo.predict([[100]])[0]:.1f}")`,

  // ── Lição 2: Classificação (hands-on) ──────────────────────
  'ml-classificacao': `from sklearn.ensemble import RandomForestClassifier
import numpy as np

# Classificação: horas de estudo + sono → passou (1) ou não (0)
X = np.array([[5, 6], [8, 8], [2, 5], [9, 7], [3, 4], [7, 9]])
y = np.array([0, 1, 0, 1, 0, 1])

modelo = RandomForestClassifier(n_estimators=50, random_state=42)
modelo.fit(X, y)

print(f"acurcia: {modelo.score(X, y):.2f}")
print(f"previsao [8, 8]: {modelo.predict([[8, 8]])[0]}")`,

  'ml-c-ex1': `from sklearn.ensemble import RandomForestClassifier
import numpy as np

# TODO: classifique quem passa
X = np.array([[5, 6], [8, 8], [2, 5], [9, 7], [3, 4], [7, 9]])
y = np.array([0, 1, 0, 1, 0, 1])

modelo = RandomForestClassifier(n_estimators=50, random_state=42)
modelo.fit(X, y)

print(f"acurcia: {modelo.score(X, y):.2f}")
print(f"previsao [8, 8]: {modelo.predict([[8, 8]])[0]}")`,

  'ml-c-ex2': `from sklearn.tree import DecisionTreeClassifier
import numpy as np

# TODO: classifique por idade
X = np.array([[18], [25], [30], [40], [60], [70]])
y = np.array([0, 1, 1, 1, 0, 0])

modelo = DecisionTreeClassifier(random_state=42)
modelo.fit(X, y)

print(f"previsao 28: {modelo.predict([[28]])[0]}")
print(f"previsao 65: {modelo.predict([[65]])[0]}")`,

  'ml-c-projeto': `from sklearn.ensemble import RandomForestClassifier
import numpy as np

# TODO: aprove o empréstimo (renda, score)
X = np.array([[3000, 700], [5000, 800], [2000, 400], [8000, 900], [1500, 300], [6000, 750]])
y = np.array([1, 1, 0, 1, 0, 1])

modelo = RandomForestClassifier(n_estimators=50, random_state=42)
modelo.fit(X, y)

novo = modelo.predict([[4000, 650]])
print(f"previsao: {novo[0]}")`,

  // ── Lição 3: Clustering (hands-on) ──────────────────────────
  'ml-clustering': `from sklearn.cluster import KMeans
import numpy as np

# Clustering: clientes por gasto mensal
X = np.array([
    [100, 200], [120, 180], [110, 210],  # cluster 1
    [900, 800], [850, 950], [950, 850],  # cluster 2
])

kmeans = KMeans(n_clusters=2, n_init=10, random_state=42)
kmeans.fit(X)

print(f"centros: {len(kmeans.cluster_centers_)}")
print(f"rotulos: {sorted(kmeans.labels_.tolist())}")`,

  'ml-k-ex1': `from sklearn.cluster import KMeans
import numpy as np

# TODO: segmente os clientes em 2 grupos
X = np.array([
    [100, 200], [120, 180], [110, 210],  # cluster 1
    [900, 800], [850, 950], [950, 850],  # cluster 2
])

kmeans = KMeans(n_clusters=2, n_init=10, random_state=42)
kmeans.fit(X)

print(f"centros: {len(kmeans.cluster_centers_)}")
print(f"rotulos: {sorted(kmeans.labels_.tolist())}")`,

  'ml-k-ex2': `from sklearn.cluster import KMeans
import numpy as np

# TODO: inércia por k (método do cotovelo)
X = np.array([
    [1, 1], [2, 1], [1, 2],       # grupo A
    [10, 10], [11, 9], [9, 11],   # grupo B
    [50, 50], [51, 49], [49, 51], # grupo C
])

inercias = []
for k in range(1, 5):
    km = KMeans(n_clusters=k, n_init=10, random_state=42)
    km.fit(X)
    inercias.append(round(km.inertia_, 1))

print(f"k1: {inercias[0]}")
print(f"k3: {inercias[2]}")`,

  'ml-k-projeto': `from sklearn.cluster import KMeans
import numpy as np

# TODO: segmente em 3 grupos
X = np.array([
    [50, 5], [60, 6], [55, 4],       # baixo gasto
    [500, 50], [480, 45], [520, 55], # médio
    [5000, 500], [4800, 480], [5100, 520],  # alto
])

kmeans = KMeans(n_clusters=3, n_init=10, random_state=42)
kmeans.fit(X)

print(f"centros: {len(kmeans.cluster_centers_)}")
print(f"gasto medio do centro 0: {kmeans.cluster_centers_[0][0]:.0f}")`,
}
