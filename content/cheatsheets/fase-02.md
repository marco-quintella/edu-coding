---
title: Fase 02 — Evolução da IA (NLP, Embeddings, GA)
---

# Fase 02 — NLP, Embeddings e Algoritmos Genéticos

## Tokenização

```python
from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(docs)
vectorizer.get_feature_names_out()  # vocabulário
```

- **Token**: palavra/subpalavra → número
- **Pegadinha pt-BR**: `stop_words="english"` não remove "o", "de" (pt)

## TF-IDF

```python
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(docs)
```

- **TF**: frequência no documento × **IDF**: raridade no corpus
- Palavra rara (telhado) vale mais que comum (no)

## Embeddings

```python
# Vetor que captura significado — similaridade = cosseno
from numpy.linalg import norm

cos = np.dot(a, b) / (norm(a) * norm(b))
```

- **rei - homem + mulher ≈ rainha** (relações viram aritmética)
- Palavras similares ficam próximas no espaço vetorial

## Algoritmo Genético

```python
# Operações: seleção (torneio) → crossover → mutação → elitismo
pop = [...]          # população de soluções
while geracao < N:
    pais = selecao(pop)          # escolhe os melhores
    filhos = crossover(pais)     # combina genes
    filhos = mutacao(filhos)     # diversidade
    pop = elitismo(pop, filhos)  # preserva o melhor
```

- **Fitness**: função objetivo
- **Exploração × exploração**: mutação (variedade) vs seleção (foco)
