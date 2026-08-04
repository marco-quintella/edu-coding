/**
 * Soluções comentadas dos exercícios — exibidas ao aluno APÓS acertar
 * (botão "Ver solução do instrutor"). Cada solução explica POR QUE é
 * melhor, não só o código.
 *
 * Key = codeKey do Exercise (mesmo do initial-codes).
 */

export interface Solution {
  /** Explicação do caminho do instrutor (1-3 frases) */
  explanation: string
  /** Código de referência (roda no sandbox) */
  code: string
}

export const SOLUTIONS: Record<string, Solution> = {
  // ── Fase 01 — Regressão Linear ─────────────────────────────
  'regressao-ex1': {
    explanation:
      'O modelo LinearRegression já resolve a reta de mínimos quadrados — você só precisa ajustar e ler os coeficientes. Atenção ao formato de X (2D).',
    code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Dados perfeitamente lineares: y = 3x + 5
X = np.array([[1], [2], [3], [4]])
y = np.array([8, 11, 14, 17])

model = LinearRegression().fit(X, y)
print(f"slope={model.coef_[0]:.2f}")
print(f"intercept={model.intercept_:.2f}")`,
  },
  'regressao-ex2': {
    explanation:
      'Com ruído, o slope fica próximo de 2 (não exato). O importante: o modelo ainda encontra a tendência central apesar do ruído — é isso que a regressão faz.',
    code: `from sklearn.linear_model import LinearRegression
import numpy as np

rng = np.random.RandomState(42)
X = np.array([[1], [2], [3], [4], [5]])
y = 2 * X[:, 0] + 1 + rng.normal(0, 0.3, 5)

model = LinearRegression().fit(X, y)
print(f"slope={model.coef_[0]:.2f}")
print(f"intercept={model.intercept_:.2f}")
print(f"r2={model.score(X, y):.3f}")`,
  },
  'regressao-ex3': {
    explanation:
      'Um único outlier DOBRA a reta: ele puxa o slope para perto de si porque o erro quadrático penaliza distâncias grandes demais. É a vulnerabilidade clássica da regressão.',
    code: `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3], [4], [5]])
y = np.array([3, 5, 7, 9, 60])  # 60 é o outlier

model = LinearRegression().fit(X, y)
print(f"slope={model.coef_[0]:.2f}")
print(f"intercept={model.intercept_:.2f}")`,
  },
  'regressao-projeto': {
    explanation:
      'Pipeline completo: dividir (treino/teste), treinar, avaliar com R² e prever. A previsão para 200m² é o valor do coef_ vezes 200 mais o intercept.',
    code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np

X = np.array([[50], [80], [100], [120], [150]])
y = np.array([250, 400, 510, 610, 760])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression().fit(X_train, y_train)
print(f"r2 treino={model.score(X_train, y_train):.3f}")
print(f"r2 teste={model.score(X_test, y_test):.3f}")
print(f"200m2 custa R\${model.predict([[200]])[0]:.0f} mil")`,
  },

  // ── Fase 01 — Árvores de Decisão ───────────────────────────
  'arvores-ex1': {
    explanation:
      'A profundidade controla o overfitting: max_depth=1 (poucas perguntas) generaliza melhor que uma árvore gigante que decora o treino.',
    code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=200, n_features=4, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

model = DecisionTreeClassifier(max_depth=1, random_state=42)
model.fit(X_train, y_train)
print(f"max_depth=1 treino={model.score(X_train, y_train):.2f} teste={model.score(X_test, y_test):.2f}")`,
  },
  'arvores-ex2': {
    explanation:
      'Podar (max_depth pequeno + min_samples_leaf) reduz o gap treino-teste: a árvore deixa de decorar e passa a generalizar.',
    code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=200, n_features=4, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

model = DecisionTreeClassifier(max_depth=3, min_samples_leaf=5, random_state=42)
model.fit(X_train, y_train)
print(f"podada treino={model.score(X_train, y_train):.2f} teste={model.score(X_test, y_test):.2f}")`,
  },
  'arvores-projeto': {
    explanation:
      'O sklearn já calcula a importância de cada feature. O atributo raiz (maior importância) é o que melhor separa os cultivares de vinho.',
    code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_wine
import numpy as np

wine = load_wine()
X_train, X_test, y_train, y_test = train_test_split(
    wine.data, wine.target, test_size=0.3, random_state=42
)

model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)

raiz = np.argmax(model.feature_importances_)
print(f"atributo raiz: {wine.feature_names[raiz]}")
print(f"treino={model.score(X_train, y_train):.2f} teste={model.score(X_test, y_test):.2f}")`,
  },

  // ── Fase 01 — KNN e SVM ────────────────────────────────────
  'knn-ex1': {
    explanation:
      'K=1 memoriza (treino 100%, generaliza mal); K grande demais generaliza demais. O meio-termo (K≈5-15) equilibra os dois.',
    code: `from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=200, n_features=2, n_informative=2, n_redundant=0, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

for k in [1, 5, 15, 51]:
    model = KNeighborsClassifier(n_neighbors=k)
    model.fit(X_train, y_train)
    print(f"K={k:2d} treino={model.score(X_train, y_train):.2%} teste={model.score(X_test, y_test):.2%}")`,
  },
  'knn-ex2': {
    explanation:
      'Dados em formato de lua não são linearmente separáveis: o kernel rbf projeta em dimensão maior e acha a fronteira curva — o "kernel trick".',
    code: `from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_moons

X, y = make_moons(n_samples=300, noise=0.15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

for kernel in ['linear', 'rbf']:
    model = SVC(kernel=kernel)
    model.fit(X_train, y_train)
    print(f"moons kernel={kernel:6s} treino={model.score(X_train, y_train):.2f} teste={model.score(X_test, y_test):.2f}")`,
  },
  'knn-ex3': {
    explanation:
      'O SVM guarda só os support vectors (os pontos na fronteira) — 24 de 105. É por isso que ele generaliza bem com poucos dados: o resto é redundante.',
    code: `from sklearn.svm import SVC
from sklearn.datasets import load_iris

iris = load_iris()
X, y = iris.data, iris.target

model = SVC(kernel='linear')
model.fit(X, y)
print(f"linear treino={model.score(X, y):.2f}")
print(f"support_vectors={len(model.support_vectors_)}/{len(X)}")`,
  },

  // ── Fase 01 — K-Means ──────────────────────────────────────
  'kmeans-ex1': {
    explanation:
      'A inércia cai muito de K=2 para K=3 (joelho) e depois suaviza. O joelho é onde adicionar clusters deixa de valer a pena.',
    code: `from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

X, _ = make_blobs(n_samples=300, centers=3, random_state=42)

for k in range(1, 7):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X)
    print(f"K={k} inercia={km.inertia_:.0f}")`,
  },
  'kmeans-ex2': {
    explanation:
      'Sem normalizar, a coluna em escala maior domina a distância euclidiana (inércia astronômica). Com StandardScaler, cada feature pesa igual.',
    code: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as np

rng = np.random.RandomState(42)
X = rng.normal(0, 1, (200, 2))
X[:, 1] *= 100  # coluna em escala 100x maior

km_bad = KMeans(n_clusters=3, random_state=42, n_init=10).fit(X)
print(f"sem normalizar inertia={km_bad.inertia_:.0f}")

X_scaled = StandardScaler().fit_transform(X)
km_good = KMeans(n_clusters=3, random_state=42, n_init=10).fit(X_scaled)
print(f"normalizado inertia={km_good.inertia_:.0f}")`,
  },
  'kmeans-projeto': {
    explanation:
      'Segmentação: cada cluster vira um perfil (jovens/renda baixa, 40s, 60s). É o caso de uso clássico — o K-Means acha os grupos sem rótulos.',
    code: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as np

rng = np.random.RandomState(42)
idade = rng.uniform(18, 70, 200)
renda = 1500 + rng.normal(0, 400, 200) + (idade - 18) * 40
X = np.column_stack([idade, renda])

X_scaled = StandardScaler().fit_transform(X)
model = KMeans(n_clusters=3, random_state=42, n_init=10)
labels = model.fit_predict(X_scaled)

for c in range(3):
    idx = labels == c
    print(f"cluster {c}: idade media={idade[idx].mean():.0f} renda media={renda[idx].mean():.0f}")`,
  },

  // ── Capstone Fase 01 ──────────────────────────────────────
  'capstone-ex1': {
    explanation:
      'EDA antes de modelar: np.corrcoef revela a relação quase perfeita (0.995) entre área e preço — sinal de que regressão linear vai funcionar.',
    code: `import numpy as np

rng = np.random.RandomState(42)
area = rng.uniform(40, 200, 100)
preco = 3 * area + 20 + rng.normal(0, 15, 100)

print(f"amostras={len(area)}")
print(f"area media={area.mean():.1f} m2")
print(f"preco medio={preco.mean():.1f} mil")
print(f"correlacao area-preco={np.corrcoef(area, preco)[0,1]:.3f}")`,
  },
  'capstone-ex2': {
    explanation:
      'O padrão da Fase 01: split (treino/teste) + treinar + medir R² no TESTE. O teste alto (0.994) = generaliza, não decora.',
    code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np

rng = np.random.RandomState(42)
area = rng.uniform(40, 200, 100)
preco = 3 * area + 20 + rng.normal(0, 15, 100)

X = area.reshape(-1, 1)
X_train, X_test, y_train, y_test = train_test_split(X, preco, test_size=0.25, random_state=42)

model = LinearRegression().fit(X_train, y_train)
print(f"slope={model.coef_[0]:.2f}")
print(f"intercept={model.intercept_:.2f}")
print(f"r2_treino={model.score(X_train, y_train):.3f}")
print(f"r2_teste={model.score(X_test, y_test):.3f}")`,
  },
  'capstone-ex3': {
    explanation:
      'Comparar é parte do trabalho: a relação é linear, então a regressão vence a árvore (que aproxima a reta por degraus). Saber POR QUE um modelo ganha é o diferencial.',
    code: `from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
import numpy as np

rng = np.random.RandomState(42)
area = rng.uniform(40, 200, 100)
preco = 3 * area + 20 + rng.normal(0, 15, 100)

X = area.reshape(-1, 1)
X_train, X_test, y_train, y_test = train_test_split(X, preco, test_size=0.25, random_state=42)

lin = LinearRegression().fit(X_train, y_train)
arv = DecisionTreeRegressor(max_depth=4, random_state=42).fit(X_train, y_train)

print(f"regressao r2_teste={lin.score(X_test, y_test):.3f}")
print(f"arvore   r2_teste={arv.score(X_test, y_test):.3f}")
print("linear venceu" if lin.score(X_test, y_test) > arv.score(X_test, y_test) else "arvore venceu")`,
  },
  'capstone-ex4': {
    explanation:
      'A entrega: model.predict([[120]]) e [[180]]. A diferença entre os dois (~R$177 mil ÷ 60 m² ≈ R$2.950/m²) é o slope — a reta da lição 1 gerando valor de negócio.',
    code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np

rng = np.random.RandomState(42)
area = rng.uniform(40, 200, 100)
preco = 3 * area + 20 + rng.normal(0, 15, 100)

X = area.reshape(-1, 1)
X_train, X_test, y_train, y_test = train_test_split(X, preco, test_size=0.25, random_state=42)

model = LinearRegression().fit(X_train, y_train)
pred_120 = model.predict([[120]])[0]
pred_180 = model.predict([[180]])[0]
print(f"previsao 120m2 = R\${pred_120:.0f} mil")
print(f"previsao 180m2 = R\${pred_180:.0f} mil")
print(f"diferenca = R\${pred_180 - pred_120:.0f} mil")`,
  },
}

/** Busca a solução de um exercício (retorna null se não houver). */
export function getSolution(codeKey: string): Solution | null {
  return SOLUTIONS[codeKey] ?? null
}
