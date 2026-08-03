/**
 * Código inicial dos SandboxRunners, indexado por lessonId.
 *
 * Os MDX referenciam apenas `lessonId` — o código vive aqui em TypeScript
 * puro, sem escapes de MDX. Evita o bug do next-mdx-remote/rsc que quebra
 * template literals e strings multi-linha como props de client components.
 */

export const INITIAL_CODES: Record<string, string> = {
  // Fase 01 — Fundamentos
  'regressao-linear': `from sklearn.linear_model import LinearRegression
import numpy as np

# Dados: y = 2x (sem ruído)
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

model = LinearRegression().fit(X, y)
print(f"slope={model.coef_[0]:.2f}")
print(f"intercept={model.intercept_:.2f}")`,

  // --- Exercícios da lição de Regressão Linear ---
  'regressao-ex1': `from sklearn.linear_model import LinearRegression
import numpy as np

# Exercício 1: descubra slope e intercept para y = 3x + 5
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([8, 11, 14, 17, 20])

model = LinearRegression().fit(X, y)
print(f"slope={model.coef_[0]:.2f}")
print(f"intercept={model.intercept_:.2f}")`,

  'regressao-ex2': `from sklearn.linear_model import LinearRegression
import numpy as np

# Exercício 2: dados com ruído — y ≈ 2x + 1
rng = np.random.RandomState(42)
X = np.linspace(0, 10, 50).reshape(-1, 1)
y = 2 * X.ravel() + 1 + rng.normal(0, 1.5, 50)

model = LinearRegression().fit(X, y)
print(f"slope={model.coef_[0]:.2f}")
print(f"intercept={model.intercept_:.2f}")
print(f"r2={model.score(X, y):.3f}")`,

  'regressao-ex3': `from sklearn.linear_model import LinearRegression
import numpy as np

# Exercício 3: seu desafio — complete os dados abaixo
# Complete o array y para que y = 4x - 3 (x = 1..6)
X = np.array([[1], [2], [3], [4], [5], [6]])
y = np.array([1, 5, 9, 13, 17, 21])  # <- complete

model = LinearRegression().fit(X, y)
print(f"slope={model.coef_[0]:.2f}")
print(f"intercept={model.intercept_:.2f}")`,

  'regressao-projeto': `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np

# Projeto: prever preço de imóvel (área m² -> preço R$)
# Área em m²
X = np.array([[50], [60], [75], [90], [110], [130], [150], [170]])
# Preço em milhares de R$
y = np.array([250, 300, 380, 460, 560, 660, 780, 880])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

model = LinearRegression().fit(X_train, y_train)
print(f"slope={model.coef_[0]:.2f} (R$/m²)")
print(f"intercept={model.intercept_:.2f}")
print(f"r2_teste={model.score(X_test, y_test):.3f}")

# Previsão: quanto custa um imóvel de 200 m²?
preco = model.predict([[200]])[0]
print(f"200m² custa R$ {preco:.0f} mil")`,

  'arvores-decisao': `from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

model = DecisionTreeClassifier(max_depth=2).fit(X_train, y_train)
print(f"acurácia treino: {model.score(X_train, y_train):.2%}")
print(f"acurácia teste:  {model.score(X_test, y_test):.2%}")`,

  // --- Exercícios da lição de Árvores de Decisão ---
  'arvores-ex1': `from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Observe: o que acontece com treino e teste conforme a profundidade cresce?
for depth in [1, 2, 5, 10]:
    model = DecisionTreeClassifier(max_depth=depth, random_state=42).fit(X_train, y_train)
    print(f"max_depth={depth} treino={model.score(X_train, y_train):.2f} teste={model.score(X_test, y_test):.2f}")`,

  'arvores-ex2': `from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Seu desafio: ajuste os parâmetros para reduzir o gap treino-teste
# mantendo a acurácia de teste acima de 90%.
# Dica: comece com max_depth=3 e min_samples_leaf=5
model = DecisionTreeClassifier(
    max_depth=10,        # <- ajuste
    min_samples_leaf=1,  # <- ajuste
    random_state=42,
).fit(X_train, y_train)

print(f"treino={model.score(X_train, y_train):.2f} teste={model.score(X_test, y_test):.2f}")`,

  'arvores-projeto': `from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split

# Dataset de vinhos italianos: 3 cultivares, 13 atributos químicos
wine = load_wine()
X_train, X_test, y_train, y_test = train_test_split(
    wine.data, wine.target, test_size=0.3, random_state=42
)

# Ajuste para generalizar bem (evite overfitting!)
model = DecisionTreeClassifier(max_depth=3, random_state=42).fit(X_train, y_train)

print(f"treino={model.score(X_train, y_train):.2f} teste={model.score(X_test, y_test):.2f}")

# Qual atributo a raiz da árvore escolheu?
raiz = model.tree_.feature[0]
print(f"atributo raiz: {wine.feature_names[raiz]}")`,

  'knn-svm': `from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

for k in [1, 3, 5, 7, 11]:
    model = KNeighborsClassifier(n_neighbors=k).fit(X_train, y_train)
    print(f"K={k:2d} treino={model.score(X_train, y_train):.2%} teste={model.score(X_test, y_test):.2%}")`,

  'knn-svm-svm': `from sklearn.svm import SVC
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

for kernel in ['linear', 'rbf', 'poly']:
    model = SVC(kernel=kernel).fit(X_train, y_train)
    print(f"kernel={kernel:6s} treino={model.score(X_train, y_train):.2%} teste={model.score(X_test, y_test):.2%}")`,

  // --- Exercícios da lição de KNN/SVM ---
  'knn-ex1': `from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Observe o dilema do K: memorização vs generalização
for k in [1, 3, 5, 11, 51]:
    model = KNeighborsClassifier(n_neighbors=k).fit(X_train, y_train)
    print(f"K={k:2d} treino={model.score(X_train, y_train):.2f} teste={model.score(X_test, y_test):.2f}")`,

  'knn-ex2': `from sklearn.svm import SVC
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

# Duas classes em formato de lua — fronteira curva, não linear!
X, y = make_moons(n_samples=200, noise=0.3, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Qual kernel acompanha a curva?
for kernel in ['linear', 'rbf', 'poly']:
    model = SVC(kernel=kernel).fit(X_train, y_train)
    print(f"moons kernel={kernel:6s} treino={model.score(X_train, y_train):.2f} teste={model.score(X_test, y_test):.2f}")`,

  'knn-ex3': `from sklearn.svm import SVC
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# O SVM guarda só os support vectors — quantos?
model = SVC(kernel='linear').fit(X_train, y_train)
print(f"support_vectors={len(model.support_)}/{len(X_train)}")
print(f"acuracia teste={model.score(X_test, y_test):.2f}")`,

  'kmeans-clustering': `from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
import numpy as np

# Dados sintéticos com 3 grupos
X, _ = make_blobs(n_samples=300, centers=3, random_state=42)

model = KMeans(n_clusters=3, n_init=10, random_state=42)
labels = model.fit_predict(X)

print('centroides:', model.cluster_centers_)
print('inercia (soma distancias^2):', model.inertia_)`,

  // --- Exercícios da lição de K-Means ---
  'kmeans-ex1': `from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

# Dataset com 3 clusters reais — onde está o cotovelo?
X, _ = make_blobs(n_samples=300, centers=3, random_state=42)

for k in range(1, 7):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    print(f"K={k} inercia={km.inertia_:.0f}")`,

  'kmeans-ex2': `from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler

# Uma coluna em escala 100x maior — o que acontece sem normalizar?
X, _ = make_blobs(n_samples=300, centers=3, random_state=42, cluster_std=2.0)
X[:, 1] *= 100

km_bad = KMeans(n_clusters=3, n_init=10, random_state=42).fit(X)
print(f"sem normalizar inertia={km_bad.inertia_:.0f}")

X_norm = StandardScaler().fit_transform(X)
km_good = KMeans(n_clusters=3, n_init=10, random_state=42).fit(X_norm)
print(f"normalizado inertia={km_good.inertia_:.0f}")`,

  'kmeans-projeto': `from sklearn.cluster import KMeans
from collections import Counter
import numpy as np

# 200 clientes: idade e renda mensal (R$ mil)
rng = np.random.RandomState(42)
N = 200
idade = rng.uniform(18, 70, N)
renda = np.where(idade < 35, rng.uniform(1, 4, N), rng.uniform(3, 12, N))
clientes = np.column_stack([idade, renda])

# Descubra os perfis — quantos segmentos existem?
model = KMeans(n_clusters=3, n_init=10, random_state=42).fit(clientes)

print(f"tamanhos={sorted(Counter(model.labels_).values())}")
print("perfis:")
for c in sorted(set(model.labels_)):
    idx = model.labels_ == c
    print(f"  cluster {c}: idade media={clientes[idx, 0].mean():.0f} renda media={clientes[idx, 1].mean():.1f} (n={idx.sum()})")`,

  // Fase 02 — Evolução da IA
  'nlp-tokenizacao': `from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

docs = [
    "eu amo machine learning",
    "eu amo deep learning",
    "ia generativa muda o mundo",
]

# Tokeniza e cria a matriz de contagem
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(docs)

print("vocabulário:", vectorizer.get_feature_names_out())
print()
print("matriz (docs x palavras):")
print(X.toarray())`,

  // --- Exercícios da lição de NLP Tokenização ---
  'nlp-ex1': `from sklearn.feature_extraction.text import CountVectorizer

docs = [
    "I love machine learning",
    "I love deep learning",
    "AI changes everything",
]

# Tokeniza removendo stop words inglesas
vectorizer = CountVectorizer(stop_words="english")
X = vectorizer.fit_transform(docs)

print("vocab:", vectorizer.get_feature_names_out())
print("shape:", X.shape)`,

  'nlp-ex2': `from sklearn.feature_extraction.text import TfidfVectorizer
from numpy.linalg import norm
import numpy as np

docs = [
    "o gato dorme no telhado",
    "o gato come o peixe",
    "o peixe nada no rio",
]

tfidf = TfidfVectorizer()
X = tfidf.fit_transform(docs)
feats = list(tfidf.get_feature_names_out())

# Palavra rara (1 doc) vs comum (2 docs)
telhado = X[0, feats.index("telhado")]
no_w = X[:, feats.index("no")].toarray()
print(f"telhado (doc0)={telhado:.3f}  (palavra rara, so no doc 0)")
print(f"no (doc0)={no_w[0, 0]:.3f}  (palavra comum, em varios docs)")

# Similaridade de cosseno entre documentos
A = X[0].toarray().ravel()
B = X[1].toarray().ravel()
C = X[2].toarray().ravel()
cos_ab = np.dot(A, B) / (norm(A) * norm(B))
cos_ac = np.dot(A, C) / (norm(A) * norm(C))
print(f"sim(doc0,doc1)={cos_ab:.3f}  (gato+o em comum)")
print(f"sim(doc0,doc2)={cos_ac:.3f}  (so o em comum)")`,

  'tfidf-embeddings': `from sklearn.feature_extraction.text import TfidfVectorizer

docs = [
    "o gato subiu no telhado",
    "o cachorro correu no quintal",
    "o gato e o cachorro sao amigos",
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(docs)

print("vocabulário:", vectorizer.get_feature_names_out())
print()
print("TF-IDF (docs x palavras):")
print(X.toarray().round(3))`,

  // --- Exercícios da lição de TF-IDF e Embeddings ---
  'tfidf-ex1': `from sklearn.feature_extraction.text import TfidfVectorizer

docs = [
    "o gato dorme no telhado",
    "o gato come o peixe",
    "o peixe nada no rio",
]

tfidf = TfidfVectorizer()
X = tfidf.fit_transform(docs)
feats = list(tfidf.get_feature_names_out())

# Compare: palavra rara (1 doc) vs comum (2 docs)
telhado = X[0, feats.index("telhado")]
no_w = X[:, feats.index("no")].toarray()
print(f"telhado (doc0)={telhado:.3f}  (palavra rara, so no doc 0)")
print(f"no (doc0)={no_w[0, 0]:.3f}  (palavra comum, em varios docs)")`,

  'tfidf-ex2': `import numpy as np
from numpy.linalg import norm

# Embeddings manuais (4 dims) simulando vetores aprendidos
rei = np.array([0.9, 0.8, 0.1, 0.0])
homem = np.array([0.8, 0.7, 0.1, 0.0])
mulher = np.array([0.8, 0.1, 0.9, 0.0])
rainha = np.array([0.9, 0.2, 0.8, 0.0])
carro = np.array([0.1, 0.0, 0.2, 0.9])

def cos(a, b):
    return float(np.dot(a, b) / (norm(a) * norm(b)))

# A famosa analogia: rei - homem + mulher ~= rainha
analogia = rei - homem + mulher
print(f"analogia ~= rainha: {cos(analogia, rainha):.3f}")
print(f"analogia ~= carro:  {cos(analogia, carro):.3f}")`,

  'introducao-geneticos': `import random

# Problema: maximizar f(x) = x²  para x inteiro em [0, 31]
# Representação: binário com 5 bits (gene = 1 bit)

def fitness(x):
    return x * x

def decode(bits):
    return int(''.join(map(str, bits)), 2)

POP = 10
GENES = 5
GENERATIONS = 20
MUT_RATE = 0.05

def init_pop():
    return [[random.randint(0, 1) for _ in range(GENES)] for _ in range(POP)]

def select(pop):
    a, b = random.sample(pop, 2)
    return a if fitness(decode(a)) >= fitness(decode(b)) else b

def crossover(p1, p2):
    cut = random.randint(1, GENES - 1)
    return p1[:cut] + p2[cut:]

def mutate(child):
    for i in range(GENES):
        if random.random() < MUT_RATE:
            child[i] = 1 - child[i]
    return child

pop = init_pop()
for gen in range(GENERATIONS):
    new_pop = []
    for _ in range(POP):
        p1, p2 = select(pop), select(pop)
        child = mutate(crossover(p1, p2))
        new_pop.append(child)
    pop = new_pop

best = max(pop, key=lambda i: fitness(decode(i)))
print(f"melhor solucao: x={decode(best)}, f(x)={fitness(decode(best))}")`,

  // --- Exercícios da lição de Algoritmos Genéticos ---
  'ga-ex1': `import random

# GA: maximizar f(x) = x^2 em [0, 31] (binario de 5 bits)
def fitness(x):
    return x * x

def decodifica(bits):
    return sum(b << i for i, b in enumerate(bits))

random.seed(42)
pop = [[random.randint(0, 1) for _ in range(5)] for _ in range(10)]

for geracao in range(30):
    avaliados = [(bits, fitness(decodifica(bits))) for bits in pop]
    melhor_bits, melhor_fit = max(avaliados, key=lambda ind: ind[1])
    if geracao in [0, 5, 15, 29]:
        print(f"geracao {geracao}: x={decodifica(melhor_bits)} fitness={melhor_fit}")

    nova = [melhor_bits[:]]  # elitismo
    while len(nova) < 10:
        p1 = max(random.sample(avaliados, 3), key=lambda ind: ind[1])[0]
        p2 = max(random.sample(avaliados, 3), key=lambda ind: ind[1])[0]
        ponto = random.randint(1, 4)
        f1 = p1[:ponto] + p2[ponto:]
        f2 = p2[:ponto] + p1[ponto:]
        for filho in (f1, f2):
            for i in range(5):
                if random.random() < 0.1:
                    filho[i] = 1 - filho[i]
            nova.append(filho)
    pop = nova[:10]`,

  'ga-ex2': `import random

# Seu desafio: mude a funcao fitness e veja o GA se adaptar!
# Exemplos para testar:
#   f(x) = -abs(x - 20) + 30   -> pico em x=20, maximo 30
#   f(x) = 10*sin(x) + x       -> multiplos picos (qual o global?)
def fitness(x):
    return x * x  # <- mude aqui

def decodifica(bits):
    return sum(b << i for i, b in enumerate(bits))

random.seed(42)
pop = [[random.randint(0, 1) for _ in range(5)] for _ in range(10)]

for geracao in range(30):
    avaliados = [(bits, fitness(decodifica(bits))) for bits in pop]
    melhor_bits, melhor_fit = max(avaliados, key=lambda ind: ind[1])
    nova = [melhor_bits[:]]
    while len(nova) < 10:
        p1 = max(random.sample(avaliados, 3), key=lambda ind: ind[1])[0]
        p2 = max(random.sample(avaliados, 3), key=lambda ind: ind[1])[0]
        ponto = random.randint(1, 4)
        f1 = p1[:ponto] + p2[ponto:]
        f2 = p2[:ponto] + p1[ponto:]
        for filho in (f1, f2):
            for i in range(5):
                if random.random() < 0.1:
                    filho[i] = 1 - filho[i]
            nova.append(filho)
    pop = nova[:10]

melhor = max(avaliados, key=lambda ind: ind[1])
print(f"melhor fitness={melhor[1]} em x={decodifica(melhor[0])}")`,

  // Fase 03 — OpenAI, LangChain
  'chain-of-thought': `# Simulando Chain of Thought com um LLM (BYOK)
# Configure sua OPENAI_API_KEY no painel abaixo e rode.

import os

api_key = os.environ.get("OPENAI_API_KEY", "")
if not api_key:
    print("Sem API key configurada. Abra o painel 'Configurar LLM API Key' e cole sua key.")
    print("Depois rode de novo.")
else:
    print("CoT prompt: 'Vamos pensar passo a passo...'")
    print("R: modelo raciocina intermediario antes da resposta final")`,

  // --- Exercícios da lição de Chain of Thought ---
  'cot-ex1': `def raciocina_mesas(mesas_iniciais, novas):
    """Simula o raciocinio passo a passo de um LLM com CoT."""
    passos = []
    passos.append(f"O restaurante comecou com {mesas_iniciais} mesas.")
    passos.append(f"Depois recebeu {novas} novas mesas.")
    total = mesas_iniciais + novas
    passos.append(f"{mesas_iniciais} + {novas} = {total}.")
    passos.append(f"O restaurante agora tem {total} mesas.")
    return passos

passos = raciocina_mesas(23, 5)
for i, passo in enumerate(passos, 1):
    print(f"{i}. {passo}")
print(f"RESPOSTA: {passos[-1]}")`,

  'cot-ex2': `def raciocina_mesas(mesas_iniciais, recebe, doa):
    """Problema multi-etapa: mesas + recebe - doa, passo a passo."""
    passos = []
    passos.append(f"O restaurante comecou com {mesas_iniciais} mesas.")
    passos.append(f"Recebeu {recebe} novas mesas: {mesas_iniciais} + {recebe} = {mesas_iniciais + recebe}.")
    parcial = mesas_iniciais + recebe
    passos.append(f"Depois doou {doa} mesas: {parcial} - {doa} = {parcial - doa}.")
    total = parcial - doa
    passos.append(f"O restaurante agora tem {total} mesas.")
    return passos

passos = raciocina_mesas(23, 5, 10)
for i, passo in enumerate(passos, 1):
    print(f"{i}. {passo}")
print(f"RESPOSTA: {passos[-1]}")`,

  'guia-prompts': `# Analise de prompts — exemplos bom vs ruim (conceitual)
# Configure sua API key no painel e rode.

import os

api_key = os.environ.get("OPENAI_API_KEY", "")

PROMPT_RUIM = "resume isso"
PROMPT_BOM = """Resuma o texto abaixo em exatamente 3 bullets.
Cada bullet: maximo 15 palavras, em portugues.

Texto: {texto}
"""

if not api_key:
    print("Sem API key — veja o exemplo de prompt estruturado:")
    print()
    print(PROMPT_BOM)
else:
    print("Prompt estruturado pronto para envio.")`,

  // --- Exercícios da lição de Guia de Prompts ---
  'prompts-ex1': `def prompt_role(linguagem, tarefa):
    """Template de prompt reutilizavel com formato de saida definido."""
    return f\"\"\"Voce e um engenheiro senior de {linguagem}.
{tarefa}
Responda em JSON com a chave 'resposta'.\"\"\"

p = prompt_role("Python", "Revise este codigo e aponte 2 riscos.")
print("PROMPT:")
print(p)
print()

# O formato de saida definido permite parsear a resposta
import json
saida_modelo = '{"resposta": "risco 1: injection; risco 2: sem validacao"}'
dados = json.loads(saida_modelo)
print(f"chaves: {list(dados.keys())}")
print(f"resposta: {dados['resposta']}")`,

  'prompts-ex2': `import json

# O modelo retornou a saida estruturada — seu trabalho e parsear
saida_modelo = '{"resposta": "risco 1: injection; risco 2: sem validacao"}'

dados = json.loads(saida_modelo)
print(f"chaves: {list(dados.keys())}")
print(f"resposta: {dados['resposta']}")

# Em producao: sempre trate JSON invalido (o modelo pode falhar o formato)
try:
    quebrado = '{"resposta": "sem fechar'
    json.loads(quebrado)
    print("parse ok")
except json.JSONDecodeError as e:
    print(f"JSON invalido detectado: {e}")`,

  'langchain-agents': `# LangChain com LLM (BYOK) — exemplo conceitual
# Configure sua OPENAI_API_KEY no painel.

import os

api_key = os.environ.get("OPENAI_API_KEY", "")

if not api_key:
    print("Sem API key — estrutura de uma chain:")
    print()
    print("""
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

prompt = ChatPromptTemplate.from_messages([
    ("system", "Você é um assistente útil."),
    ("human", "{pergunta}"),
])
model = ChatOpenAI(model="gpt-4o-mini")

chain = prompt | model
resposta = chain.invoke({"pergunta": "O que é RAG?"})
print(resposta.content)
""")
else:
    print("API key presente — instale langchain e rode o exemplo real.")`,

  // --- Exercícios da lição de LangChain ---
  'langchain-ex1': `import json

# Sua primeira chain: prompt -> modelo (simulado) -> parser
# (No LangChain real: chain = prompt | model | parser)

def prompt(texto):
    return f"Classifique o sentimento de: {texto}"

def modelo(prompt_texto):
    # Simula um LLM que retorna JSON
    return '{"sentimento": "positivo", "confianca": 0.95}'

def parser(saida):
    dados = json.loads(saida)
    return dados["sentimento"].upper()

# A chain encadeia as funcoes: a saida de uma entra na proxima
chain = lambda x: parser(modelo(prompt(x)))

resultado = chain("Adorei o curso de IA!")
print(f"resultado: {resultado}")`,

  'langchain-ex2': `import json

# Chain com formatacao: prompt -> modelo -> parser -> formatador
# (No LangChain real: prompt | model | parser | formatador)

def prompt(texto):
    return f"Classifique o sentimento de: {texto}"

def modelo(prompt_texto):
    return '{"sentimento": "positivo", "confianca": 0.95}'

def parser(saida):
    dados = json.loads(saida)
    return dados["sentimento"].upper()

def formatar(sentimento):
    return f"SENTIMENTO DETECTADO: {sentimento}"

# 4 etapas encadeadas — cada uma recebe a saida da anterior
chain = lambda x: formatar(parser(modelo(prompt(x))))

print(chain("Adorei o curso de IA!"))`,

  // Fase 04 — Análise de dados
  'analise-video-audio': `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

docs = [
    "otimo produto, recomendo muito",
    "pessimo atendimento, nao comprem",
    "entrega rapida e qualidade excelente",
    "produto veio quebrado, decepcionado",
]
labels = [1, 0, 1, 0]  # 1 = positivo, 0 = negativo

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(docs)

model = MultinomialNB().fit(X, labels)

novo = vectorizer.transform(["servico excelente, chegou rapido"])
print("sentimento:", "positivo" if model.predict(novo)[0] == 1 else "negativo")`,

  // --- Exercícios da lição de Análise de Vídeo/Áudio/Texto ---
  'videoaudio-ex1': `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Reviews de produtos: 1 = positivo, 0 = negativo
docs = [
    "otimo produto, recomendo muito",
    "pessimo atendimento, nao comprem",
    "entrega rapida e qualidade excelente",
    "produto veio quebrado, decepcionado",
]
labels = [1, 0, 1, 0]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(docs)
model = MultinomialNB().fit(X, labels)

# Classifica reviews novos (que o modelo nunca viu)
novos = [
    "servico excelente, chegou rapido",
    "pessimo, nao funciona",
]
for texto in novos:
    pred = model.predict(vectorizer.transform([texto]))[0]
    print(f"{texto!r} -> {'positivo' if pred == 1 else 'negativo'}")`,

  'videoaudio-ex2': `# Simula o pipeline de transcrição de reunião:
# áudio -> texto (transcrição) -> análise de sentimento por fala

transcricao = [
    "estamos muito felizes com os resultados do trimestre",
    "mas o servidor caiu de novo e os clientes reclamaram",
]

# Análise simples por palavras-chave (sem modelo)
positivas = {"felizes", "otimo", "excelente", "bom", "cresceu", "sucesso"}
negativas = {"caiu", "reclamaram", "ruim", "pessimo", "erro", "perdeu"}

for fala in transcricao:
    palavras = set(fala.lower().split())
    pos = len(palavras & positivas)
    neg = len(palavras & negativas)
    sentimento = "positivo" if pos > neg else ("negativo" if neg > pos else "neutro")
    print(f"{fala[:35]}... -> {sentimento} (pos={pos}, neg={neg})")`,

  'aws-textract': `# AWS Textract — fluxo (requer credenciais AWS, aqui simulamos a estrutura)
# No sandbox real com credenciais, usaria boto3.

import os

aws_key = os.environ.get("AWS_ACCESS_KEY_ID", "")

if not aws_key:
    print("""
Fluxo com boto3:

import boto3

client = boto3.client("textract", region_name="us-east-1")

with open("documento.pdf", "rb") as f:
    resp = client.detect_document_text(Document={"Bytes": f.read()})

# Texto extraído: blocos com tipo LINE
for item in resp["Blocks"]:
    if item["BlockType"] == "LINE":
        print(item["Text"])
""")
else:
    print("Credenciais AWS presentes — use boto3 para chamar Textract.")`,

  // --- Exercícios da lição de AWS Textract ---
  'textract-ex1': `# Simula o Textract extraindo pares chave-valor de um formulário
# (no Textract real, os blocos TYPE=KEY_VALUE_SET fazem isso)

documento = """nome: Maria Silva
cpf: 123.456.789-00
email: maria@example.com
valor_compra: R$ 450,00"""

def extrai_chave_valor(texto):
    resultado = {}
    for linha in texto.strip().split("\\n"):
        if ":" in linha:
            chave, valor = linha.split(":", 1)
            resultado[chave.strip()] = valor.strip()
    return resultado

dados = extrai_chave_valor(documento)
print(f"campos extraidos: {list(dados.keys())}")
print(f"nome: {dados['nome']}")
print(f"email: {dados['email']}")`,

  'textract-ex2': `# Simula o Textract extraindo uma tabela de uma nota fiscal
# (no Textract real, cada célula vira um bloco TABLE/CELL)

nota = """item        qtd  preco
teclado     2    150.00
mouse       3    45.50
monitor     1    899.90"""

def extrai_tabela(texto):
    linhas = [l.split() for l in texto.strip().split("\\n")]
    cabecalho = linhas[0]
    itens = []
    for l in linhas[1:]:
        itens.append(dict(zip(cabecalho, l)))
    return itens

itens = extrai_tabela(nota)
for item in itens:
    item["total"] = float(item["qtd"]) * float(item["preco"])
    print(f"{item['item']}: {item['qtd']}x R\${item['preco']} = R\${item['total']:.2f}")
total_geral = sum(float(i["preco"]) * float(i["qtd"]) for i in itens)
print(f"TOTAL: R\${total_geral:.2f}")`,

  // Fase 05 — Privacidade, segurança
  'lgpd-privacidade': `# Minimizacao de dados — exemplo pratico

texto_bruto = "Cliente: Maria Silva, CPF 123.456.789-00, email maria@email.com, comprou 2 itens."

# Com LGPD: extrair so o necessario para a tarefa
import re

def extrair_minimo(texto, campos):
    resultado = {}
    if "email" in campos:
        m = re.search(r"[\\w.+-]+@[\\w.-]+", texto)
        resultado["email"] = m.group(0) if m else None
    if "nome" in campos:
        m = re.search(r"Cliente: (\\w+ \\w+)", texto)
        resultado["nome"] = m.group(1) if m else None
    return resultado

print("autorizado (email):", extrair_minimo(texto_bruto, ["email"]))
print("autorizado (nome):", extrair_minimo(texto_bruto, ["nome"]))
print("sem autorizacao (cpf):", extrair_minimo(texto_bruto, []))`,

  'deteccao-anomalias': `from sklearn.ensemble import IsolationForest
import numpy as np

# Dados normais + 3 anomalias
rng = np.random.RandomState(42)
normal = rng.normal(loc=0, scale=1, size=(200, 2))
anomalias = np.array([[8, 8], [-7, 9], [9, -8]])

X = np.vstack([normal, anomalias])

model = IsolationForest(contamination=0.05, random_state=42)
labels = model.fit_predict(X)  # 1 = normal, -1 = anomalia

print("ultimas 3 (deveriam ser -1):", labels[-3:])
print(f"anomalias detectadas: {(labels == -1).sum()}")`,

  'azure-cognitive': `# Azure Cognitive Services — fluxo (requer chave Azure, aqui simulamos)
# Com credenciais reais usaria o SDK azure-ai-textanalytics

import os

azure_key = os.environ.get("AZURE_API_KEY", "")

if not azure_key:
    print("""
Fluxo com SDK:

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

client = TextAnalyticsClient(endpoint=URL, credential=AzureKeyCredential(KEY))

docs = ["O produto e excelente!", "Atendimento pessimo."]
resp = client.analyze_sentiment(docs)
for r in resp:
    print(r.sentiment, r.confidence_scores)
""")
else:
    print("Chave Azure presente — use o SDK real.")`,
}

/**
 * Busca o código inicial de uma lição pelo slug.
 * Fallback: string vazia (editor abre em branco).
 */
export function getInitialCode(lessonSlug: string): string {
  return INITIAL_CODES[lessonSlug] ?? ''
}
