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
