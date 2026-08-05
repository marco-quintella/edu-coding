---
title: Fase 01 — Fundamentos de ML
---

# Fase 01 — Fundamentos de ML

## Regressão Linear

```python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)
model = LinearRegression().fit(X_train, y_train)
model.coef_[0]          # slope
model.intercept_        # intercept
model.score(X_test, y_test)  # R² no TESTE (métrica honesta)
```

- **R²**: quanto da variância o modelo explica (0-1)
- **Erro quadrático**: penaliza erros grandes; convexo (mínimo único)
- **Cuidado**: outlier puxa a reta inteira

## Árvore de Decisão

```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(max_depth=3, min_samples_leaf=5, random_state=42)
```

- **max_depth**: complexidade (pouco = underfit, muito = overfit)
- **Poda**: limita a árvore para generalizar
- **Impureza (Gini)**: a árvore escolhe a pergunta que mais a reduz

## KNN

```python
from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier(n_neighbors=5)
```

- **Lazy**: não aprende no treino, calcula na predição
- **K pequeno**: memoriza (treino 100%); K grande: generaliza demais
- **Normalize** antes (distância euclidiana!)

## SVM

```python
from sklearn.svm import SVC

model = SVC(kernel='rbf')  # rbf p/ fronteira curva; linear p/ separável
```

- **Support vectors**: só os pontos na fronteira importam
- **Kernel trick**: projeta em dimensão maior sem calcular explicitamente

## K-Means

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

X_scaled = StandardScaler().fit_transform(X)
model = KMeans(n_clusters=3, n_init=10, random_state=42).fit(X_scaled)
```

- **Inércia**: soma das distâncias² (menor = clusters mais apertados)
- **Cotovelo**: K ideal = joelho da curva de inércia
- **Sempre normalizar** (features de escala maior dominam)

## Pipeline padrão

```python
EDA (correlação!) → split treino/teste → treinar → R² no teste → comparar → prever
```

## Decisão rápida

| Problema | Algoritmo |
|---|---|
| Prever número, relação linear | Regressão Linear |
| Classes, regras interpretáveis | Árvore/Random Forest |
| Fronteira irregular, poucos dados | KNN |
| Alta dimensão, margem | SVM |
| Descobrir grupos (sem rótulos) | K-Means |
