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

  // ── Mini-projetos Fases 03-05 ──────────────────────────────
  'mp3-rag': {
    explanation:
      'O núcleo do RAG: rank de documentos por similaridade. O TF-IDF acha 2/3 — a falha do "cancelo/cancelar" prova que retrieval lexical perde para embeddings (semânticos).',
    code: `from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

docs = [
    "A licenca do produto custa R$ 99 por mes e inclui suporte.",
    "A API aceita 1000 requisicoes por dia no plano basico.",
    "Para cancelar, envie email para cancelamento@empresa.com.",
    "O reembolso e feito em ate 7 dias uteis apos a solicitacao.",
    "O plano enterprise inclui SLA de 99.9% e suporte 24h.",
]

perguntas = [
    ("Quanto custa a licenca?", 0),
    ("Como cancelo minha assinatura?", 2),
    ("Qual o SLA do plano enterprise?", 4),
]

vec = TfidfVectorizer().fit(docs + [p for p, _ in perguntas])
X = vec.transform(docs)
acertos = 0
for pergunta, doc_esperado in perguntas:
    q = vec.transform([pergunta])
    scores = (X @ q.T).toarray().ravel()
    melhor = int(np.argmax(scores))
    ok = melhor == doc_esperado
    acertos += ok
    print(f"[{'ok' if ok else 'ERRO'}] {pergunta}")
    print(f"  achou doc {melhor} (esperado {doc_esperado}) | score {scores[melhor]:.3f}")

print(f"acertos: {acertos}/{len(perguntas)}")`,
  },

  'mp4-audio': {
    explanation:
      'Triagem de call center: transcrição → termos-chave → tema dominante. O Counter mostra o gargalo (cartão 3x) com zero ML — só contagem de texto.',
    code: `from collections import Counter
import re

transcricoes = [
    "o cliente ligou reclamando do cartao bloqueado na loja",
    "segunda ligacao: cartao desbloqueado e cobranca duplicada",
    "terceira chamada sobre o aplicativo que nao abre",
    "o cartao foi usado em outra cidade sem autorizacao",
]

def extrair_termos(texto):
    stops = {"cliente", "ligou", "ligacao", "chamada", "sobre", "que", "nao", "foi", "sem", "com"}
    return [t for t in re.findall(r"[a-z]{4,}", texto.lower()) if t not in stops]

temas = Counter()
for t in transcricoes:
    temas.update(extrair_termos(t))

print("temas mais citados:")
for palavra, n in temas.most_common(5):
    print(f"  {palavra}: {n}x")`,
  },

  'mp5-anon': {
    explanation:
      'Dois passos obrigatórios de pipeline com dados brasileiros: hash antes de usar (pseudonimização) + IsolationForest para achar o ponto fora do padrão (fraude).',
    code: `from sklearn.ensemble import IsolationForest
import hashlib
import numpy as np

emails = ["maria@empresa.com", "joao@empresa.com", "ana@empresa.com",
          "pedro@empresa.com", "lucas@empresa.com", "bia@empresa.com"]
gastos = np.array([120, 95, 1500, 110, 130, 105]).reshape(-1, 1)

def hash_email(email):
    return hashlib.sha256(email.encode()).hexdigest()[:12]

print("emails pseudonimizados:")
for e in emails[:3]:
    print(f"  {e} -> {hash_email(e)}")

model = IsolationForest(contamination=0.1, random_state=42)
labels = model.fit_predict(gastos)
for i, (g, l) in enumerate(zip(gastos.ravel(), labels)):
    status = "ANOMALO" if l == -1 else "normal"
    print(f"  gasto {g:>5}: {status}")`,
  },

  // ── Curso Python para Devs ─────────────────────────────────
  'python-ex1': {
    explanation:
      'O IMC usa ** (potência). A cadeia if/elif classifica — a primeira condição verdadeira vence. O :.2f limita a 2 casas.',
    code: `peso = 70.0
altura = 1.75
imc = peso / (altura ** 2)
if imc < 18.5:
    classificacao = "magro"
elif imc < 25:
    classificacao = "normal"
elif imc < 30:
    classificacao = "sobrepeso"
else:
    classificacao = "obeso"
print(f"IMC = {imc:.2f} ({classificacao})")`,
  },
  'python-ex2': {
    explanation:
      'range(1, 11) vai de 1 a 10 (fim exclusivo). O % 2 == 0 filtra os pares — 2+4+6+8+10 = 30.',
    code: `soma = 0
for i in range(1, 11):
    if i % 2 == 0:
        soma += i
print(f"soma dos pares = {soma}")`,
  },
  'python-projeto': {
    explanation:
      'any(condição for c in senha) retorna True se QUALQUER char satisfaz. A lista de faltas só acumula o que não passou.',
    code: `def validar(senha):
    faltas = []
    if len(senha) < 8:
        faltas.append("tamanho")
    if not any(c.isupper() for c in senha):
        faltas.append("maiuscula")
    if not any(c.isdigit() for c in senha):
        faltas.append("numero")
    return faltas

senha = "abcdefgh"
print(f"faltam: {validar(senha)}")`,
  },
  'python-l2-ex1': {
    explanation:
      'O padrão freq.get(palavra, 0) + 1 é o contador universal: devolve o valor atual (ou 0) e soma 1. len(freq) conta as chaves únicas.',
    code: `frase = "python é ótimo e python é simples"
freq = {}
for palavra in frase.split():
    freq[palavra] = freq.get(palavra, 0) + 1
print(f"total de palavras: {len(frase.split())}")
print(f"palavras unicas: {len(freq)}")
print(f"'python' aparece: {freq['python']}x")`,
  },
  'python-l2-ex2': {
    explanation:
      'sum(notas)/len(notas) para a média. A comprehension sum(1 for n in notas if n >= 7) conta os aprovados sem loop explícito.',
    code: `notas = [7.5, 8.0, 6.5, 9.0, 5.5]
media = sum(notas) / len(notas)
acima = sum(1 for n in notas if n >= 7)
print(f"media: {media:.1f}")
print(f"acima da media: {acima}")`,
  },
  'python-l2-projeto': {
    explanation:
      'Dicionário de dicionários: agenda[nome] guarda um dict com tel/cidade. items() itera chave+valor juntos.',
    code: `agenda = {
    "ana": {"tel": "11-9999", "cidade": "SP"},
    "bob": {"tel": "21-8888", "cidade": "RJ"},
}
agenda["carol"] = {"tel": "31-7777", "cidade": "BH"}

print(f"contatos: {len(agenda)}")
for nome, info in agenda.items():
    print(f"{nome}: {info['cidade']}")`,
  },
  'python-l3-ex1': {
    explanation:
      'O default (percentual=10) permite chamar com 1 argumento. A fórmula: preco * (1 - percentual/100) subtrai a fração.',
    code: `def desconto(preco, percentual=10):
    return preco * (1 - percentual / 100)

print(f"com 10%: R\${desconto(100):.2f}")
print(f"com 25%: R\${desconto(100, 25):.2f}")`,
  },
  'python-l3-ex2': {
    explanation:
      'Duas funções puras: calcular_media só depende do parâmetro; aprovado compara com o corte. Composição: aprovado(calcular_media(notas)).',
    code: `def calcular_media(notas):
    return sum(notas) / len(notas)

def aprovado(media, corte=6.0):
    return media >= corte

notas = [7.0, 8.5, 5.5]
media = calcular_media(notas)
print(f"media: {media:.1f}")
print(f"aprovado: {aprovado(media)}")`,
  },
  'python-l3-projeto': {
    explanation:
      'Composição real: comissao() chama total_bruto(). Total 4500 (1000+2000+1500), comissão 5% = 225. Funções pequenas e puras.',
    code: `def total_bruto(vendas):
    return sum(venda["valor"] for venda in vendas)

def comissao(vendas, taxa=0.05):
    return total_bruto(vendas) * taxa

vendas = [
    {"vendedor": "ana", "valor": 1000},
    {"vendedor": "bob", "valor": 2000},
    {"vendedor": "ana", "valor": 1500},
]
print(f"total: R\${total_bruto(vendas):.0f}")
print(f"comissao: R\${comissao(vendas):.0f}")`,
  },

  // ── Curso SQL & Bancos de Dados ────────────────────────────
  'sql-select-ex1': {
    explanation:
      'WHERE filtra as linhas (cidade = SP) e ORDER BY ordena. Ana e Carol são de SP — Carol é a última em ordem alfabética.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER, nome TEXT, cidade TEXT)")
cur.executemany("INSERT INTO clientes VALUES (?, ?, ?)", [
    (1, "Ana", "SP"), (2, "Bob", "RJ"), (3, "Carol", "SP"), (4, "Dan", "BH"),
])
cur.execute("SELECT nome, cidade FROM clientes WHERE cidade = 'SP' ORDER BY nome")
for nome, cidade in cur.fetchall():
    print(f"{nome}: {cidade}")`,
  },
  'sql-select-ex2': {
    explanation:
      'WHERE preco >= 100 filtra; ORDER BY preco DESC ordena do maior para o menor. O monitor (800) lidera.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE produtos (id INTEGER, nome TEXT, preco REAL)")
cur.executemany("INSERT INTO produtos VALUES (?, ?, ?)", [
    (1, "teclado", 120), (2, "mouse", 60), (3, "monitor", 800), (4, "webcam", 250),
])
cur.execute("SELECT nome, preco FROM produtos WHERE preco >= 100 ORDER BY preco DESC")
for nome, preco in cur.fetchall():
    print(f"{nome}: R\${preco:.0f}")`,
  },
  'sql-select-projeto': {
    explanation:
      'O parâmetro ? na query evita SQL injection. A função retorna [r[0] for r in cur.fetchall()] — os ids. SP = [1, 3].',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER, nome TEXT, cidade TEXT)")
cur.executemany("INSERT INTO clientes VALUES (?, ?, ?)", [
    (1, "Ana", "SP"), (2, "Bob", "RJ"), (3, "Carol", "SP"), (4, "Dan", "BH"),
])
def buscar_por_cidade(cidade):
    cur.execute("SELECT id FROM clientes WHERE cidade = ? ORDER BY id", (cidade,))
    return [r[0] for r in cur.fetchall()]
print(f"SP: {buscar_por_cidade('SP')}")
print(f"RJ: {buscar_por_cidade('RJ')}")`,
  },
  'sql-agreg-ex1': {
    explanation:
      'GROUP BY vendedor agrupa as linhas; COUNT(*) conta cada grupo; SUM(valor) soma. Ana lidera com 3620.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, produto TEXT, valor REAL, vendedor TEXT)")
cur.executemany("INSERT INTO vendas VALUES (?, ?, ?, ?)", [
    (1, "notebook", 3500, "ana"), (2, "mouse", 60, "bob"),
    (3, "teclado", 120, "ana"), (4, "monitor", 800, "carol"),
    (5, "webcam", 250, "bob"),
])
cur.execute("SELECT vendedor, COUNT(*) as vendas, SUM(valor) as total FROM vendas GROUP BY vendedor ORDER BY total DESC")
for vendedor, vendas, total in cur.fetchall():
    print(f"{vendedor}: {vendas} vendas, R\${total:.0f}")`,
  },
  'sql-agreg-ex2': {
    explanation:
      'HAVING filtra GRUPOS (depois do GROUP BY) — WHERE não conhece SUM. Ana (3620) e Carol (800) passam do corte 500.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE pedidos (id INTEGER, cliente TEXT, valor REAL)")
cur.executemany("INSERT INTO pedidos VALUES (?, ?, ?)", [
    (1, "ana", 3500), (2, "bob", 60), (3, "ana", 120), (4, "carol", 800), (5, "bob", 250),
])
cur.execute("SELECT cliente, SUM(valor) as total FROM pedidos GROUP BY cliente HAVING SUM(valor) > 500 ORDER BY total DESC")
for cliente, total in cur.fetchall():
    print(f"{cliente}: R\${total:.0f}")`,
  },
  'sql-agreg-projeto': {
    explanation:
      'Ticket médio por vendedor (AVG + GROUP BY) comparado com a média geral (AVG da tabela toda). Ana é a única acima.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?, ?, ?)", [
    (1, "ana", 3500), (2, "bob", 60), (3, "ana", 120), (4, "carol", 800), (5, "bob", 250),
])
cur.execute("SELECT vendedor, AVG(valor) FROM vendas GROUP BY vendedor")
por_vendedor = cur.fetchall()
cur.execute("SELECT AVG(valor) FROM vendas")
media_geral = cur.fetchone()[0]
for vendedor, media in por_vendedor:
    status = "acima da media" if media > media_geral else "abaixo da media"
    print(f"{vendedor} {status}")`,
  },
  'sql-joins-ex1': {
    explanation:
      'LEFT JOIN mantém todos os clientes; COUNT(p.id) conta pedidos; SUM(p.valor) soma. Ana: 2 pedidos, 3620.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT)")
cur.execute("CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, valor REAL)")
cur.executemany("INSERT INTO clientes VALUES (?, ?)", [(1, "ana"), (2, "bob"), (3, "carol")])
cur.executemany("INSERT INTO pedidos VALUES (?, ?, ?)", [
    (1, 1, 3500), (2, 2, 60), (3, 1, 120), (4, 3, 800),
])
cur.execute("""
    SELECT c.nome, COUNT(p.id) as pedidos, SUM(p.valor) as total
    FROM clientes c
    LEFT JOIN pedidos p ON c.id = p.cliente_id
    GROUP BY c.nome
    ORDER BY total DESC
""")
for nome, pedidos, total in cur.fetchall():
    print(f"{nome}: {pedidos} pedidos, R\${total:.0f}")`,
  },
  'sql-joins-ex2': {
    explanation:
      'LEFT JOIN + WHERE p.id IS NULL = o padrão "registros sem correspondência". Carol não tem pedidos.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT)")
cur.execute("CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, valor REAL)")
cur.executemany("INSERT INTO clientes VALUES (?, ?)", [(1, "ana"), (2, "bob"), (3, "carol")])
cur.executemany("INSERT INTO pedidos VALUES (?, ?, ?)", [(1, 1, 3500), (2, 2, 60), (3, 1, 120)])
cur.execute("""
    SELECT c.nome FROM clientes c
    LEFT JOIN pedidos p ON c.id = p.cliente_id
    WHERE p.id IS NULL
""")
for (nome,) in cur.fetchall():
    print(f"sem pedidos: {nome}")`,
  },
  'sql-joins-projeto': {
    explanation:
      'COALESCE(SUM(p.valor), 0) troca NULL por 0 (cliente sem pedido). Carol aparece com 0 pedidos e R$0.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT)")
cur.execute("CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, valor REAL)")
cur.executemany("INSERT INTO clientes VALUES (?, ?)", [(1, "ana"), (2, "bob"), (3, "carol")])
cur.executemany("INSERT INTO pedidos VALUES (?, ?, ?)", [(1, 1, 3500), (2, 2, 60), (3, 1, 120)])
cur.execute("""
    SELECT c.nome, COUNT(p.id) as pedidos, COALESCE(SUM(p.valor), 0) as total
    FROM clientes c
    LEFT JOIN pedidos p ON c.id = p.cliente_id
    GROUP BY c.nome
    ORDER BY total DESC
""")
for nome, pedidos, total in cur.fetchall():
    print(f"{nome}: {pedidos} pedidos, R\${total:.0f}")`,
  },

  // ── Curso Git & GitHub ─────────────────────────────────────
  'git-ex1': {
    explanation:
      'git init cria o repo; add leva ao staging; commit salva no histórico. git log -1 --format=%s mostra só o subject — determinístico (o hash muda por timestamp).',
    code: `import subprocess, os, shutil
shutil.rmtree("/tmp/repo1", ignore_errors=True)
os.makedirs("/tmp/repo1", exist_ok=True)
os.chdir("/tmp/repo1")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)
with open("app.py", "w") as f:
    f.write("print('ola')\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "primeiro commit"], check=True)
out = subprocess.run(["git", "log", "-1", "--format=%s"], capture_output=True, text=True)
print(f"ultimo commit: {out.stdout.strip()}")`,
  },
  'git-ex2': {
    explanation:
      'Depois do commit, reescrever o arquivo deixa o working tree sujo — git status --short mostra " M a.txt" (M = modified).',
    code: `import subprocess, os, shutil
shutil.rmtree("/tmp/repo2", ignore_errors=True)
os.makedirs("/tmp/repo2", exist_ok=True)
os.chdir("/tmp/repo2")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)
with open("a.txt", "w") as f:
    f.write("v1\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "commit 1"], check=True)
with open("a.txt", "w") as f:
    f.write("v2\n")
out = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
print(f"status: {out.stdout.strip()}")`,
  },
  'git-projeto': {
    explanation:
      'git rev-list --count HEAD conta os commits da branch atual — 2 commits = "2". Sempre limpe o diretório antes (warm pool reutiliza o sandbox).',
    code: `import subprocess, os, shutil
shutil.rmtree("/tmp/repo5", ignore_errors=True)
os.makedirs("/tmp/repo5", exist_ok=True)
os.chdir("/tmp/repo5")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)
with open("a.txt", "w") as f:
    f.write("1\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "commit 1"], check=True)
with open("b.txt", "w") as f:
    f.write("2\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "commit 2"], check=True)
out = subprocess.run(["git", "rev-list", "--count", "HEAD"], capture_output=True, text=True)
print(f"commits: {out.stdout.strip()}")`,
  },
  'git-b-ex1': {
    explanation:
      'git checkout -b feature cria a branch e muda para ela. O branch padrão deste git é "master" (não "main") — importante para os testes.',
    code: `import subprocess, os, shutil
shutil.rmtree("/tmp/repo3", ignore_errors=True)
os.makedirs("/tmp/repo3", exist_ok=True)
os.chdir("/tmp/repo3")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)
with open("app.py", "w") as f:
    f.write("base\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "base"], check=True)
subprocess.run(["git", "checkout", "-q", "-b", "feature"], check=True)
with open("app.py", "a") as f:
    f.write("feature\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "feature work"], check=True)
out = subprocess.run(["git", "log", "-1", "--format=%s"], capture_output=True, text=True)
print(f"HEAD: {out.stdout.strip()}")`,
  },
  'git-b-ex2': {
    explanation:
      'Merge integra a branch na atual: checkout master + merge feature. O arquivo final tem "base" + "feature". --no-edit evita abrir editor.',
    code: `import subprocess, os, shutil
shutil.rmtree("/tmp/repo4", ignore_errors=True)
os.makedirs("/tmp/repo4", exist_ok=True)
os.chdir("/tmp/repo4")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)
with open("app.py", "w") as f:
    f.write("base\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "base"], check=True)
subprocess.run(["git", "checkout", "-q", "-b", "feature"], check=True)
with open("app.py", "a") as f:
    f.write("feature\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "feature work"], check=True)
subprocess.run(["git", "checkout", "-q", "master"], check=True)
subprocess.run(["git", "merge", "-q", "--no-edit", "feature"], check=True)
print(open("app.py").read().strip())`,
  },
  'git-b-projeto': {
    explanation:
      'Workflow completo: base (1 commit) + feature (2 commits) = 3 commits após o merge (fast-forward). rev-list --count confirma.',
    code: `import subprocess, os, shutil
shutil.rmtree("/tmp/repo6", ignore_errors=True)
os.makedirs("/tmp/repo6", exist_ok=True)
os.chdir("/tmp/repo6")
subprocess.run(["git", "init", "-q"], check=True)
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)
with open("app.py", "w") as f:
    f.write("base\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "base"], check=True)
subprocess.run(["git", "checkout", "-q", "-b", "feature"], check=True)
with open("f1.txt", "w") as f:
    f.write("1\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "feat 1"], check=True)
with open("f2.txt", "w") as f:
    f.write("2\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "feat 2"], check=True)
subprocess.run(["git", "checkout", "-q", "master"], check=True)
subprocess.run(["git", "merge", "-q", "--no-edit", "feature"], check=True)
out = subprocess.run(["git", "rev-list", "--count", "HEAD"], capture_output=True, text=True)
print(f"total: {out.stdout.strip()}")`,
  },
  'git-r-ex1': {
    explanation:
      'Repo bare (--bare) é o "servidor" sem working tree. Clone → commit → push -u origin HEAD. O HEAD no push evita o problema do branch vazio.',
    code: `import subprocess, os, shutil
shutil.rmtree("/tmp/origem2", ignore_errors=True)
os.makedirs("/tmp/origem2", exist_ok=True)
os.chdir("/tmp/origem2")
subprocess.run(["git", "init", "-q", "--bare"], check=True)
os.chdir("/tmp")
shutil.rmtree("meu_clone2", ignore_errors=True)
subprocess.run(["git", "clone", "-q", "/tmp/origem2", "meu_clone2"], check=True)
os.chdir("/tmp/meu_clone2")
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)
with open("README.md", "w") as f:
    f.write("# Projeto\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "readme"], check=True)
subprocess.run(["git", "push", "-q", "-u", "origin", "HEAD"], check=True)
out = subprocess.run(["git", "log", "-1", "--format=%s"], capture_output=True, text=True)
print(f"enviado: {out.stdout.strip()}")`,
  },
  'git-r-ex2': {
    explanation:
      'git remote -v lista os remotos: "origin  <caminho>  (fetch)". A primeira palavra da primeira linha é o nome — origin.',
    code: `import subprocess, os, shutil
shutil.rmtree("/tmp/origem3", ignore_errors=True)
os.makedirs("/tmp/origem3", exist_ok=True)
os.chdir("/tmp/origem3")
subprocess.run(["git", "init", "-q", "--bare"], check=True)
os.chdir("/tmp")
shutil.rmtree("clone_x", ignore_errors=True)
subprocess.run(["git", "clone", "-q", "/tmp/origem3", "clone_x"], check=True)
os.chdir("/tmp/clone_x")
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "Aluno"], check=True)
with open("README.md", "w") as f:
    f.write("# Projeto\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "readme"], check=True)
subprocess.run(["git", "push", "-q", "-u", "origin", "HEAD"], check=True)
out = subprocess.run(["git", "remote", "-v"], capture_output=True, text=True)
print(out.stdout.strip().split("\n")[0].split()[0])`,
  },
  'git-r-projeto': {
    explanation:
      'Trabalho em equipe: dev A push no bare; dev B clona e o arquivo já vem. O pull implícito do clone traz o trabalho do time.',
    code: `import subprocess, os, shutil
shutil.rmtree("/tmp/origem4", ignore_errors=True)
os.makedirs("/tmp/origem4", exist_ok=True)
os.chdir("/tmp/origem4")
subprocess.run(["git", "init", "-q", "--bare"], check=True)
os.chdir("/tmp")
shutil.rmtree("dev_a", ignore_errors=True)
subprocess.run(["git", "clone", "-q", "/tmp/origem4", "dev_a"], check=True)
os.chdir("/tmp/dev_a")
subprocess.run(["git", "config", "user.email", "a@b.c"], check=True)
subprocess.run(["git", "config", "user.name", "DevA"], check=True)
with open("shared.txt", "w") as f:
    f.write("codigo do time\n")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-q", "-m", "shared"], check=True)
subprocess.run(["git", "push", "-q", "-u", "origin", "HEAD"], check=True)
os.chdir("/tmp")
shutil.rmtree("dev_b", ignore_errors=True)
subprocess.run(["git", "clone", "-q", "/tmp/origem4", "dev_b"], check=True)
os.chdir("/tmp/dev_b")
print(f"arquivo: {'shared.txt' if os.path.exists('shared.txt') else 'faltando'}")`,
  },

  // ── Curso Estruturas de Dados & Algoritmos ─────────────────
  'eda-ex1': {
    explanation:
      'A busca binária corta o espaço pela metade a cada passo. Em 1..100, o 73 (índice 72) é achado em 6 passos — log₂(100) ≈ 7.',
    code: `def busca_binaria(lista, alvo):
    esq, dir_ = 0, len(lista) - 1
    passos = 0
    while esq <= dir_:
        passos += 1
        meio = (esq + dir_) // 2
        if lista[meio] == alvo:
            return meio, passos
        elif lista[meio] < alvo:
            esq = meio + 1
        else:
            dir_ = meio - 1
    return -1, passos

numeros = list(range(1, 101))
indice, passos = busca_binaria(numeros, 73)
print(f"encontrado no indice {indice}")
print(f"passos: {passos}")`,
  },
  'eda-ex2': {
    explanation:
      'Pior caso: o alvo é o último. Linear percorre os 1000; binária faz ~10 (log₂(1000) ≈ 10). A diferença cresce com N.',
    code: `def busca_binaria(lista, alvo):
    esq, dir_ = 0, len(lista) - 1
    passos = 0
    while esq <= dir_:
        passos += 1
        meio = (esq + dir_) // 2
        if lista[meio] == alvo:
            return meio, passos
        elif lista[meio] < alvo:
            esq = meio + 1
        else:
            dir_ = meio - 1
    return -1, passos

N = 1000
numeros = list(range(N))
alvo = N - 1

passos_linear = 0
for i, v in enumerate(numeros):
    passos_linear += 1
    if v == alvo:
        break

_, passos_binaria = busca_binaria(numeros, alvo)
print(f"linear: {passos_linear} passos")
print(f"binaria: {passos_binaria} passos")
print(f"binaria muito mais rapida: {passos_binaria < passos_linear}")`,
  },
  'eda-projeto': {
    explanation:
      's[::-1] inverte a string (fatiamento). Normalizar com lower() e sem espaços antes de comparar — Ana vira "ana".',
    code: `def eh_palindromo(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

print(f"'arara': {eh_palindromo('arara')}")
print(f"'Ana': {eh_palindromo('Ana')}")
print(f"'python': {eh_palindromo('python')}")`,
  },
  'eda-h-ex1': {
    explanation:
      'O dict guarda número → índice. Para cada n, o complemento (alvo - n) é checado em O(1) — no total, O(n).',
    code: `def dois_soma(nums, alvo):
    vistos = {}
    for i, n in enumerate(nums):
        falta = alvo - n
        if falta in vistos:
            return [vistos[falta], i]
        vistos[n] = i
    return []

nums = [2, 7, 11, 15]
print(f"indices: {dois_soma(nums, 9)}")
nums2 = [3, 2, 4]
print(f"indices: {dois_soma(nums2, 6)}")`,
  },
  'eda-h-ex2': {
    explanation:
      'Contagem com freq.get(x, 0) + 1; max(freq, key=freq.get) devolve a CHAVE com maior valor — "ia" aparece 3x.',
    code: `def mais_frequente(texto):
    freq = {}
    for palavra in texto.split():
        freq[palavra] = freq.get(palavra, 0) + 1
    melhor = max(freq, key=freq.get)
    return melhor, freq[melhor]

texto = "ia python dados ia python ia"
palavra, count = mais_frequente(texto)
print(f"mais frequente: '{palavra}' ({count}x)")`,
  },
  'eda-h-projeto': {
    explanation:
      'Counter compara contagens de letras sem se importar com a ordem. listen/silent, python/typhon e abc/cba são anagramas.',
    code: `from collections import Counter

def sao_anagramas(a, b):
    return Counter(a.lower()) == Counter(b.lower())

print(f"listen/silent: {sao_anagramas('listen', 'silent')}")
print(f"python/typhon: {sao_anagramas('python', 'typhon')}")
print(f"abc/cba: {sao_anagramas('abc', 'cba')}")`,
  },
  'eda-o-ex1': {
    explanation:
      'Bubble sort: a cada passada o maior "flutua" para o fim. A otimização "trocou" para cedo quando já está ordenado. O(n²).',
    code: `def bubble_sort(lista):
    n = len(lista)
    for i in range(n):
        trocou = False
        for j in range(n - 1 - i):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j + 1] = lista[j + 1], lista[j]
                trocou = True
        if not trocou:
            break
    return lista

dados = [64, 34, 25, 12, 22, 11, 90]
print(f"bubble: {bubble_sort(dados)}")`,
  },
  'eda-o-ex2': {
    explanation:
      'sorted() é Timsort, O(n log n). reverse=True inverte; key=len ordena pelo critério — sem escrever comparador.',
    code: `dados = [64, 34, 25, 12, 22, 11, 90]
palavras = ["bb", "a", "ccc"]

print(f"sorted: {sorted(dados)}")
print(f"reverso: {sorted(dados, reverse=True)}")
print(f"por tamanho: {sorted(palavras, key=len)}")`,
  },
  'eda-o-projeto': {
    explanation:
      'Merge de listas ordenadas: dois ponteiros comparam o menor de cada lista — O(n). É o passo central do merge sort.',
    code: `def merge(a, b):
    resultado = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] < b[j]:
            resultado.append(a[i]); i += 1
        else:
            resultado.append(b[j]); j += 1
    resultado.extend(a[i:])
    resultado.extend(b[j:])
    return resultado

a = [1, 3, 5, 7]
b = [2, 4, 6, 8]
print(f"merge: {merge(a, b)}")`,
  },

  // ── Curso Análise de Dados com pandas ─────────────────────
  'pandas-ex1': {
    explanation:
      'Coluna nova derivada: df["total"] = qtd * preco. A soma: 35000 + 3000 + 3600 + 6400 + 5000 = 53000.',
    code: `import pandas as pd

vendas = pd.DataFrame({
    "produto": ["notebook", "mouse", "teclado", "monitor", "webcam"],
    "quantidade": [10, 50, 30, 8, 20],
    "preco": [3500, 60, 120, 800, 250],
})
vendas["total"] = vendas["quantidade"] * vendas["preco"]

print(f"linhas: {len(vendas)}")
print(f"produtos: {len(vendas['produto'].unique())}")
print(f"faturamento total: R\${vendas['total'].sum():.0f}")`,
  },
  'pandas-ex2': {
    explanation:
      'Filtro booleano df[df["nota"] >= 7] devolve os aprovados; mean() e max() agregam a coluna inteira.',
    code: `import pandas as pd

notas = pd.DataFrame({
    "aluno": ["ana", "bob", "carol", "dan", "eva"],
    "nota": [7.5, 5.0, 8.0, 6.5, 9.0],
})
aprovados = notas[notas["nota"] >= 7]

print(f"aprovados: {len(aprovados)}")
print(f"media geral: {notas['nota'].mean():.1f}")
print(f"melhor nota: {notas['nota'].max():.1f}")`,
  },
  'pandas-projeto': {
    explanation:
      'idxmax() devolve o índice da maior receita — usado com loc para pegar o mês: jun (18000).',
    code: `import pandas as pd

vendas = pd.DataFrame({
    "mes": ["jan", "fev", "mar", "abr", "mai", "jun"],
    "receita": [10000, 12000, 11000, 15000, 14000, 18000],
})
vendas["crescimento"] = vendas["receita"].pct_change() * 100

print(f"total semestre: R\${vendas['receita'].sum():.0f}")
print(f"media mensal: R\${vendas['receita'].mean():.0f}")
print(f"melhor mes: {vendas.loc[vendas['receita'].idxmax(), 'mes']}")`,
  },
  'pandas-f-ex1': {
    explanation:
      'groupby("vendedor") junta as linhas; ["valor"].sum() soma cada grupo; sort_values(descending) faz o ranking. Ana: 9000.',
    code: `import pandas as pd

vendas = pd.DataFrame({
    "vendedor": ["ana", "bob", "ana", "carol", "bob", "ana"],
    "mes": ["jan", "jan", "fev", "jan", "fev", "mar"],
    "valor": [3000, 1500, 2500, 2000, 1000, 3500],
})
por_vendedor = vendas.groupby("vendedor")["valor"].sum().sort_values(ascending=False)

print("ranking:")
for vendedor, total in por_vendedor.items():
    print(f"  {vendedor}: R\${total:.0f}")`,
  },
  'pandas-f-ex2': {
    explanation:
      'agg(["sum","mean","count"]) aplica 3 agregações por cidade. SP: 3 clientes, R$3300, média 1100.',
    code: `import pandas as pd

clientes = pd.DataFrame({
    "cidade": ["SP", "RJ", "SP", "BH", "RJ", "SP"],
    "gasto": [500, 1200, 800, 300, 600, 2000],
})
por_cidade = clientes.groupby("cidade")["gasto"].agg(["sum", "mean", "count"]).round(0)

print("por cidade:")
for cidade, row in por_cidade.iterrows():
    print(f"  {cidade}: total R\${row['sum']:.0f}, media R\${row['mean']:.0f}, {int(row['count'])} clientes")`,
  },
  'pandas-f-projeto': {
    explanation:
      'groupby + sum por categoria; idxmax() devolve a categoria top (escritorio, 500 vendas) e max() o valor.',
    code: `import pandas as pd

produtos = pd.DataFrame({
    "categoria": ["eletronico", "escritorio", "eletronico", "escritorio", "eletronico"],
    "produto": ["notebook", "caneta", "monitor", "papel", "mouse"],
    "vendas": [50, 200, 30, 300, 80],
})
por_cat = produtos.groupby("categoria")["vendas"].sum()

print(f"categorias: {len(por_cat)}")
print(f"top categoria: {por_cat.idxmax()} ({por_cat.max()} vendas)")`,
  },
  'pandas-l-ex1': {
    explanation:
      'Coluna calculada com round(0) evita float sujo. idxmax() + loc pega o produto mais caro: monitor.',
    code: `import pandas as pd

precos = pd.DataFrame({
    "produto": ["teclado", "mouse", "monitor"],
    "preco": [120, 60, 800],
})
precos["promocao"] = (precos["preco"] * 0.9).round(0)

print(f"mais caro: {precos.loc[precos['preco'].idxmax(), 'produto']}")
print(f"promocao do teclado: R\${precos.loc[precos['produto']=='teclado', 'promocao'].iloc[0]:.0f}")`,
  },
  'pandas-l-ex2': {
    explanation:
      'isna().sum() conta nulos; mean() ignora NaN (25+30)/2 = 27.5; fillna com a média zera os nulos.',
    code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "nome": ["ana", "bob", "carol", "dan"],
    "idade": [25, np.nan, 30, np.nan],
})
print(f"valores nulos: {df['idade'].isna().sum()}")
print(f"media: {df['idade'].mean():.1f}")

df_preenchido = df.fillna({"idade": df["idade"].mean()})
print(f"preenchidos: {df_preenchido['idade'].isna().sum()}")`,
  },
  'pandas-l-projeto': {
    explanation:
      'A média dos preços presentes é (100+150)/2 = 125. fillna com a média preenche os dois nulos.',
    code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "produto": ["a", "b", "c", "d"],
    "preco": [100, np.nan, 150, np.nan],
})
df["preco"] = df["preco"].fillna(df["preco"].mean())

print(f"precos: {list(df['preco'])}")`,
  },

  // ── Curso Testes com Python ───────────────────────────────
  'testes-ex1': {
    explanation:
      'assert verifica a condição — falha com AssertionError. Os 3 casos cobrem positivos, negativos e zero.',
    code: `def somar(a, b):
    return a + b

assert somar(2, 3) == 5
assert somar(-1, -1) == -2
assert somar(0, 0) == 0

print(f"2+3 = {somar(2, 3)}")
print(f"-1+-1 = {somar(-1, -1)}")`,
  },
  'testes-ex2': {
    explanation:
      'Divisão por zero DEVE falhar de forma controlada: raise ValueError. O try/except do teste captura e confirma.',
    code: `def dividir(a, b):
    if b == 0:
        raise ValueError("divisao por zero")
    return a / b

print(f"10/2 = {dividir(10, 2)}")
print(f"7/2 = {dividir(7, 2)}")

try:
    dividir(1, 0)
    print("nao levantou erro")
except ValueError:
    print("levantou ValueError")`,
  },
  'testes-projeto': {
    explanation:
      'Classe com 3 métodos puros. Validação: 3+4=7, 10-4=6, 6*7=42 — os asserts equivalentes rodariam no pytest.',
    code: `class Calculadora:
    def somar(self, a, b):
        return a + b
    def subtrair(self, a, b):
        return a - b
    def multiplicar(self, a, b):
        return a * b

calc = Calculadora()
print(f"somar: {calc.somar(3, 4)}")
print(f"subtrair: {calc.subtrair(10, 4)}")
print(f"multiplicar: {calc.multiplicar(6, 7)}")`,
  },
  'testes-a-ex1': {
    explanation:
      'tempfile cria arquivo temporário (setup); a função lê o JSON; os.unlink limpa (teardown) — teste isolado.',
    code: `import json, tempfile, os

def carregar_config(caminho):
    with open(caminho) as f:
        return json.load(f)

with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as f:
    json.dump({"timeout": 30, "retries": 3}, f)
    caminho = f.name

config = carregar_config(caminho)
print(f"timeout: {config['timeout']}")
print(f"retries: {config['retries']}")
os.unlink(caminho)`,
  },
  'testes-a-ex2': {
    explanation:
      'Tabela de casos (input, esperado) — o padrão parametrize do pytest. 4 casos: 2 válidos, 2 inválidos.',
    code: `def validar_email(email):
    return "@" in email and "." in email.split("@")[-1]

casos = [
    ("ana@empresa.com", True),
    ("bob@empresa.com.br", True),
    ("sem-arroba.com", False),
    ("ana@", False),
]
for email, esperado in casos:
    resultado = validar_email(email)
    print(f"{email}: {resultado} (esperado {esperado})")`,
  },
  'testes-a-projeto': {
    explanation:
      'Validador com 2 regras e 4 casos: curta, sem número, válida (8 chars + dígito) e forte.',
    code: `def validar_senha(senha):
    erros = []
    if len(senha) < 8:
        erros.append("curta")
    if not any(c.isdigit() for c in senha):
        erros.append("sem_numero")
    return erros

for senha in ["abc", "abcdefgh", "abcdefg1", "Abcdefgh1"]:
    erros = validar_senha(senha)
    print(f"'{senha}': {erros if erros else 'OK'}")`,
  },
  'testes-t-ex1': {
    explanation:
      'Validação de input antes do cálculo: percentual fora de 0-100 → ValueError. Desconto = preco * (1 - p/100).',
    code: `def calcular_desconto(preco, percentual):
    if percentual < 0 or percentual > 100:
        raise ValueError("percentual invalido")
    return preco * (1 - percentual / 100)

print(f"100 com 10%: {calcular_desconto(100, 10):.2f}")
print(f"200 com 25%: {calcular_desconto(200, 25):.2f}")
print(f"50 com 0%: {calcular_desconto(50, 0):.2f}")`,
  },
  'testes-t-ex2': {
    explanation:
      'Lista vazia é edge case: média indefinida → ValueError. sum/len com lista não vazia.',
    code: `def media(notas):
    if not notas:
        raise ValueError("lista vazia")
    return sum(notas) / len(notas)

print(f"media [7,8,9]: {media([7, 8, 9]):.1f}")
print(f"media [10]: {media([10]):.1f}")
try:
    media([])
    print("nao levantou")
except ValueError:
    print("lista vazia: ValueError")`,
  },
  'testes-t-projeto': {
    explanation:
      'Conversor simples: (f - 32) * 5/9. Os 3 casos clássicos validam: 32F=0C, 212F=100C, 98.6F=37C (febre!).',
    code: `def fahrenheit_para_celsius(f):
    return (f - 32) * 5 / 9

for f in [32, 212, 98.6]:
    print(f"{f}F = {fahrenheit_para_celsius(f):.1f}C")`,
  },

  // ── Curso APIs & HTTP ──────────────────────────────────────
  'apis-ex1': {
    explanation:
      'json.dumps serializa (Python → JSON string); json.loads desserializa (JSON → Python). true vira True.',
    code: `import json

usuario = {
    "id": 1,
    "nome": "Ana Silva",
    "email": "ana@empresa.com",
    "ativo": True,
}
texto = json.dumps(usuario, ensure_ascii=False)
print(f"JSON: {texto}")

de_volta = json.loads(texto)
print(f"nome: {de_volta['nome']}")
print(f"ativo: {de_volta['ativo']}")`,
  },
  'apis-ex2': {
    explanation:
      'json.loads numa lista JSON devolve uma lista Python de dicts — a forma típica de resposta de API.',
    code: `import json

resposta = '[{"id": 1, "nome": "Ana"}, {"id": 2, "nome": "Bob"}, {"id": 3, "nome": "Carol"}]'

dados = json.loads(resposta)
print(f"usuarios: {len(dados)}")
for u in dados:
    print(f"  {u['id']}: {u['nome']}")`,
  },
  'apis-projeto': {
    explanation:
      'Lista de dicts = tabela. sum com generator soma; max com key=lambda pega o dict de maior preço.',
    code: `import json

resposta = '[{"id": 1, "produto": "teclado", "preco": 120}, {"id": 2, "produto": "mouse", "preco": 60}, {"id": 3, "produto": "monitor", "preco": 800}]'

produtos = json.loads(resposta)
total = sum(p["preco"] for p in produtos)
print(f"produtos: {len(produtos)}")
print(f"total: R\${total:.0f}")
print(f"mais caro: {max(produtos, key=lambda p: p['preco'])['produto']}")`,
  },
  'apis-r-ex1': {
    explanation:
      'urlopen abre a conexão; resp.read() lê o corpo; json.loads converte. A API real responde com título e completed=False.',
    code: `import json
from urllib.request import urlopen

def buscar_json(url):
    with urlopen(url) as resp:
        return json.loads(resp.read())

url = "https://jsonplaceholder.typicode.com/todos/1"
dados = buscar_json(url)
print(f"titulo: {dados['title']}")
print(f"concluido: {dados['completed']}")`,
  },
  'apis-r-ex2': {
    explanation:
      'A API /users devolve 10 usuários reais (jsonplaceholder). O slice [:3] limita o print.',
    code: `import json
from urllib.request import urlopen

url = "https://jsonplaceholder.typicode.com/users"
with urlopen(url) as resp:
    usuarios = json.loads(resp.read())

print(f"total: {len(usuarios)}")
for u in usuarios[:3]:
    print(f"  {u['name']} — {u['email']}")`,
  },
  'apis-r-projeto': {
    explanation:
      'List comprehension filtra por userId == 1. 100 posts no total, 10 do usuário 1.',
    code: `import json
from urllib.request import urlopen

url = "https://jsonplaceholder.typicode.com/posts"
with urlopen(url) as resp:
    posts = json.loads(resp.read())

do_usuario_1 = [p for p in posts if p["userId"] == 1]
print(f"posts totais: {len(posts)}")
print(f"do usuario 1: {len(do_usuario_1)}")`,
  },
  'apis-e-ex1': {
    explanation:
      'Cliente resiliente: timeout evita travar; HTTPError captura 404/500; URLError captura falha de rede.',
    code: `import json
from urllib.request import urlopen
from urllib.error import HTTPError, URLError

def get_json(url):
    try:
        with urlopen(url, timeout=10) as resp:
            return resp.status, json.loads(resp.read())
    except HTTPError as e:
        return e.code, {"erro": f"HTTP {e.code}"}
    except URLError:
        return 0, {"erro": "rede indisponivel"}

status, dados = get_json("https://jsonplaceholder.typicode.com/todos/1")
print(f"status: {status}")
print(f"titulo: {dados['title']}")`,
  },
  'apis-e-ex2': {
    explanation:
      'Recurso inexistente → HTTPError 404. O e.code captura o número — o programa não quebra.',
    code: `import json
from urllib.request import urlopen
from urllib.error import HTTPError

def get_json(url):
    try:
        with urlopen(url, timeout=10) as resp:
            return resp.status, json.loads(resp.read())
    except HTTPError as e:
        return e.code, {"erro": f"HTTP {e.code}"}

status, dados = get_json("https://jsonplaceholder.typicode.com/todos/999999")
print(f"status: {status}")
print(f"erro: {dados['erro']}")`,
  },
  'apis-e-projeto': {
    explanation:
      'Retry: tenta 3x; erros transitórios somem na segunda tentativa. Na última, retorna erro controlado.',
    code: `import json
from urllib.request import urlopen

def get_json_com_retry(url, tentativas=3):
    for tentativa in range(tentativas):
        try:
            with urlopen(url, timeout=10) as resp:
                return resp.status, json.loads(resp.read())
        except Exception:
            if tentativa == tentativas - 1:
                return 0, {"erro": "falhou"}
    return 0, {"erro": "falhou"}

status, dados = get_json_com_retry("https://jsonplaceholder.typicode.com/todos/1")
print(f"status: {status}")
print(f"titulo: {dados['title']}")`,
  },

  // ── Curso Automação com Python ─────────────────────────────
  'automacao-ex1': {
    explanation:
      'with open(path, "w") escreve (sobrescreve); with open(path) lê. readlines() devolve a lista de linhas.',
    code: `with open("/tmp/notas.txt", "w") as f:
    f.write("ana 7.5\nbob 5.0\ncarol 8.0\n")

with open("/tmp/notas.txt") as f:
    linhas = f.readlines()

print(f"linhas: {len(linhas)}")
print(f"primeira: {linhas[0].strip()}")`,
  },
  'automacao-ex2': {
    explanation:
      'for linha in f itera o arquivo; split() divide "ana 1000" em partes; int() converte para somar.',
    code: `with open("/tmp/vendas.txt", "w") as f:
    f.write("ana 1000\nbob 2000\nana 1500\ncarol 800\n")

total = 0
with open("/tmp/vendas.txt") as f:
    for linha in f:
        vendedor, valor = linha.split()
        total += int(valor)

print(f"total: R\${total}")`,
  },
  'automacao-projeto': {
    explanation:
      'Cada linha tem produto, qtd e preço. Faturamento = soma de qtd * preco: 600+600+1600+1000 = 3800.',
    code: `with open("/tmp/relatorio_vendas.txt", "w") as f:
    f.write("teclado 5 120\nmouse 10 60\nmonitor 2 800\nwebcam 4 250\n")

total = 0
itens = 0
with open("/tmp/relatorio_vendas.txt") as f:
    for linha in f:
        produto, qtd, preco = linha.split()
        total += int(qtd) * int(preco)
        itens += 1

print(f"itens: {itens}")
print(f"faturamento: R\${total}")`,
  },
  'automacao-p-ex1': {
    explanation:
      'os.makedirs cria pastas (exist_ok evita erro); shutil.copy copia; os.path.exists confirma o backup.',
    code: `import os, shutil

os.makedirs("/tmp/projeto/dados", exist_ok=True)
os.makedirs("/tmp/projeto/backup", exist_ok=True)

with open("/tmp/projeto/dados/relatorio.csv", "w") as f:
    f.write("id,valor\n1,100\n2,200\n")
shutil.copy("/tmp/projeto/dados/relatorio.csv", "/tmp/projeto/backup/")

print(f"existe: {os.path.exists('/tmp/projeto/backup/relatorio.csv')}")
print(f"tamanho: {os.path.getsize('/tmp/projeto/backup/relatorio.csv')} bytes")`,
  },
  'automacao-p-ex2': {
    explanation:
      'os.listdir lista os nomes; a comprehension com endswith(".txt") filtra por extensão.',
    code: `import os

os.makedirs("/tmp/docs", exist_ok=True)
for nome in ["a.txt", "b.csv", "c.txt", "d.pdf"]:
    open(f"/tmp/docs/{nome}", "w").close()

txts = [n for n in os.listdir("/tmp/docs") if n.endswith(".txt")]
print(f"arquivos: {len(os.listdir('/tmp/docs'))}")
print(f"txt: {sorted(txts)}")`,
  },
  'automacao-p-projeto': {
    explanation:
      'Agrupador por extensão: split(".")[-1] pega a extensão; setdefault cria a lista se faltar.',
    code: `import os

os.makedirs("/tmp/dl", exist_ok=True)
for nome in ["foto.jpg", "doc.pdf", "musica.mp3", "video.mp4", "outro.pdf"]:
    open(f"/tmp/dl/{nome}", "w").close()

por_ext = {}
for nome in os.listdir("/tmp/dl"):
    ext = nome.split(".")[-1]
    por_ext.setdefault(ext, []).append(nome)

print(f"extensoes: {sorted(por_ext.keys())}")
print(f"pdfs: {por_ext.get('pdf', [])}")`,
  },
  'automacao-s-ex1': {
    explanation:
      'subprocess.run executa o comando e espera; capture_output=True captura; returncode 0 = sucesso.',
    code: `import subprocess

resultado = subprocess.run(["echo", "olá mundo"], capture_output=True, text=True)
print(f"saida: {resultado.stdout.strip()}")
print(f"exit code: {resultado.returncode}")`,
  },
  'automacao-s-ex2': {
    explanation:
      'datetime.now() é agora; timedelta(days=1) soma 1 dia; strftime formata. A data vem do relógio do sandbox.',
    code: `from datetime import datetime, timedelta

agora = datetime.now()
amanha = agora + timedelta(days=1)

print(f"hoje: {agora.strftime('%d/%m/%Y')}")
print(f"amanha: {amanha.strftime('%d/%m/%Y')}")`,
  },
  'automacao-s-projeto': {
    explanation:
      'O comando printf gera 4 linhas; a comprehension filtra vazias e conta. Exemplo real de pipeline.',
    code: `import subprocess

resultado = subprocess.run(["printf", "a\nb\nc\nd\n"], capture_output=True, text=True)
linhas = [l for l in resultado.stdout.split("\n") if l.strip()]

print(f"linhas de saida: {len(linhas)}")
print(f"primeira: {linhas[0]}")`,
  },

  // ── Curso JavaScript para Devs ─────────────────────────────
  'js-ex1': {
    explanation:
      'const não reatribui; let reatribui; typeof revela o tipo. Template literals com crase + ${}.',
    code: `const nome = "Ana";
let idade = 25;
const ativo = true;

console.log(\`\${nome} tem \${idade} anos\`);
console.log(\`tipo de idade: \${typeof idade}\`);
console.log(\`ativo: \${ativo}\`);`,
  },
  'js-ex2': {
    explanation:
      'push adiciona no fim; length conta; includes verifica. O array original muda com push.',
    code: `const frutas = ["maça", "banana", "uva"];
frutas.push("kiwi");
console.log(\`frutas: \${frutas.length}\`);
console.log(\`primeira: \${frutas[0]}\`);
console.log(\`tem uva: \${frutas.includes("uva")}\`);`,
  },
  'js-projeto': {
    explanation:
      'obj.chave = valor adiciona propriedade; Object.keys devolve as chaves — 4 com o email.',
    code: `const usuario = {
  nome: "Ana",
  idade: 25,
  cidade: "São Paulo",
};
usuario.email = "ana@x.com";
console.log(\`nome: \${usuario.nome}\`);
console.log(\`chaves: \${Object.keys(usuario).length}\`);`,
  },
  'js-a-ex1': {
    explanation:
      'Array com push/length/includes — a manipulação básica do JS moderno.',
    code: `const frutas = ["maça", "banana", "uva"];
frutas.push("kiwi");
console.log(\`frutas: \${frutas.length}\`);
console.log(\`primeira: \${frutas[0]}\`);
console.log(\`tem uva: \${frutas.includes("uva")}\`);`,
  },
  'js-a-ex2': {
    explanation:
      'Object.keys(obj).length conta as propriedades — 4 após adicionar o email.',
    code: `const usuario = {
  nome: "Ana",
  idade: 25,
  cidade: "São Paulo",
};
usuario.email = "ana@x.com";
console.log(\`nome: \${usuario.nome}\`);
console.log(\`chaves: \${Object.keys(usuario).length}\`);`,
  },
  'js-a-projeto': {
    explanation:
      'Array de objetos = dados de API. length conta; reduce com comparador acha o mais caro.',
    code: `const produtos = [
  { id: 1, nome: "teclado", preco: 120 },
  { id: 2, nome: "mouse", preco: 60 },
  { id: 3, nome: "monitor", preco: 800 },
];
console.log(\`produtos: \${produtos.length}\`);
console.log(\`primeiro: \${produtos[0].nome}\`);
console.log(\`mais caro: \${produtos.reduce((acc, p) => (p.preco > acc.preco ? p : acc)).nome}\`);`,
  },
  'js-f-ex1': {
    explanation:
      'map transforma cada item; filter seleciona; reduce acumula. 650 total, 2 caros (200 e 300).',
    code: `const precos = [100, 200, 50, 300];
const comDesconto = precos.map((p) => p * 0.9);
const caros = precos.filter((p) => p >= 150);
const total = precos.reduce((acc, p) => acc + p, 0);
console.log(\`total: \${total}\`);
console.log(\`caros: \${caros.length}\`);`,
  },
  'js-f-ex2': {
    explanation:
      'fetch retorna uma Promise; await espera; .json() converte. Node 24 tem fetch nativo.',
    code: `const resposta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const dados = await resposta.json();
console.log(\`titulo: \${dados.title}\`);
console.log(\`concluido: \${dados.completed}\`);`,
  },
  'js-f-projeto': {
    explanation:
      'throw lança o erro; try/catch captura e acessa e.message. Divisão por zero controlada.',
    code: `function dividir(a, b) {
  if (b === 0) throw new Error("divisao por zero");
  return a / b;
}
try {
  console.log(dividir(10, 2));
  dividir(1, 0);
} catch (e) {
  console.log(\`erro: \${e.message}\`);
}`,
  },

  // ── Curso Expressões Regulares ─────────────────────────────
  'regex-ex1': {
    explanation:
      'findall devolve todas as ocorrências. [a-z]+ casa as letras, @ literal, [a-z.]+ o domínio.',
    code: `import re

texto = "O email de contato é ana@empresa.com e o suporte é suporte@x.com"
emails = re.findall(r"[a-z]+@[a-z.]+", texto)
print(f"emails: {emails}")`,
  },
  'regex-ex2': {
    explanation:
      'fullmatch exige o texto inteiro. \\(? e \\)? tornam os parênteses opcionais; \\d{2} DDD; \\d{4,5}-?\\d{4} o número.',
    code: `import re

def validar_telefone(fone):
    return bool(re.fullmatch(r"\\(?\\d{2}\\)? ?\\d{4,5}-?\\d{4}", fone))

for fone in ["(11) 99999-1234", "11999991234", "abc"]:
    print(f"{fone}: {validar_telefone(fone)}")`,
  },
  'regex-projeto': {
    explanation:
      '\\d{2}/\\d{2}/\\d{4} casa dd/mm/aaaa. findall pega as duas datas.',
    code: `import re

texto = "Evento em 05/08/2026 e outro em 20/12/2026, reserve já"
datas = re.findall(r"\\d{2}/\\d{2}/\\d{4}", texto)
print(f"datas: {datas}")`,
  },
  'regex-g-ex1': {
    explanation:
      'Os parênteses criam grupos: group(1) é o pedido, group(2) a data. search acha a primeira ocorrência.',
    code: `import re

texto = "Pedido #1234 de 2026-08-05 no valor de R$ 450,00"
m = re.search(r"#(\\d+) de (\\d{4}-\\d{2}-\\d{2})", texto)
if m:
    print(f"pedido: {m.group(1)}")
    print(f"data: {m.group(2)}")`,
  },
  'regex-g-ex2': {
    explanation:
      'A classe negada [^a-zA-Z0-9\s] casa tudo que não é letra/número/espaço — re.sub remove. Acentos são removidos.',
    code: `import re

texto = "Olá, mundo! Como vai? #python @dev"
limpo = re.sub(r"[^a-zA-Z0-9\s]", "", texto)
print(f"limpo: {limpo}")`,
  },
  'regex-g-projeto': {
    explanation:
      're.sub troca cada dígito por *. A máscara protege dados sensíveis em logs.',
    code: `import re

texto = "Contato: (11) 99999-1234"
mascarado = re.sub(r"\\d", "*", texto)
print(f"mascarado: {mascarado}")`,
  },
  'regex-a-ex1': {
    explanation:
      'A classe [;,|] casa qualquer separador — re.split divide em todas as ocorrências de uma vez.',
    code: `import re

texto = "ana; bob,carol|dan"
partes = re.split(r"[;,|]", texto)
print(f"partes: {partes}")`,
  },
  'regex-a-ex2': {
    explanation:
      'O grupo após o @ captura só o domínio. findall devolve a lista com os dois.',
    code: `import re

texto = "contato@empresa.com.br e dev@github.com"
dominios = re.findall(r"@([a-z0-9.]+)", texto)
print(f"dominios: {dominios}")`,
  },
  'regex-a-projeto': {
    explanation:
      'cpf[:-2] mascara tudo menos os 2 últimos; concatena cpf[-2:]. LGPD: nunca logar CPF completo!',
    code: `import re

cpf = "123.456.789-00"
mascarado = re.sub(r"\\d", "*", cpf[:-2]) + cpf[-2:]
print(f"cpf: {mascarado}")`,
  },

  // ── Curso OOP Python ───────────────────────────────────────
  'oop-ex1': {
    explanation:
      'sacar devolve False se valor > saldo; senão subtrai e devolve True. 100+50-30 = 120.',
    code: `class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def depositar(self, valor):
        self.saldo += valor

    def sacar(self, valor):
        if valor > self.saldo:
            return False
        self.saldo -= valor
        return True

c = Conta("Ana", 100)
c.depositar(50)
ok = c.sacar(30)
print(f"saldo: {c.saldo}")
print(f"sacar 30: {ok}")`,
  },
  'oop-ex2': {
    explanation:
      'com_desconto aplica a fórmula preco * (1 - p/100). 120 com 10% = 108, com 25% = 90.',
    code: `class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

    def com_desconto(self, percentual):
        return self.preco * (1 - percentual / 100)

p = Produto("teclado", 120)
print(f"10%: {p.com_desconto(10):.2f}")
print(f"25%: {p.com_desconto(25):.2f}")`,
  },
  'oop-projeto': {
    explanation:
      'self.itens é lista; adicionar faz append de dict; total soma com generator. 120+60 = 180.',
    code: `class Carrinho:
    def __init__(self):
        self.itens = []

    def adicionar(self, nome, preco):
        self.itens.append({"nome": nome, "preco": preco})

    def total(self):
        return sum(i["preco"] for i in self.itens)

car = Carrinho()
car.adicionar("teclado", 120)
car.adicionar("mouse", 60)
print(f"itens: {len(car.itens)}")
print(f"total: R\${car.total():.0f}")`,
  },
  'oop-h-ex1': {
    explanation:
      'Herança: Cachorro(Animal) herda __init__ e nome; override de falar() dá o som próprio. Polimorfismo no loop.',
    code: `class Animal:
    def __init__(self, nome):
        self.nome = nome

    def falar(self):
        return "..."

class Cachorro(Animal):
    def falar(self):
        return "au au!"

class Gato(Animal):
    def falar(self):
        return "miau!"

animais = [Cachorro("Rex"), Gato("Mimi")]
for a in animais:
    print(f"{a.nome}: {a.falar()}")`,
  },
  'oop-h-ex2': {
    explanation:
      'Override: Gerente redefine bonus() para 20%. 5000 * 0.2 = 1000 (vs 10% do funcionário).',
    code: `class Funcionario:
    def __init__(self, nome, salario):
        self.nome = nome
        self.salario = salario

    def bonus(self):
        return self.salario * 0.10

class Gerente(Funcionario):
    def bonus(self):
        return self.salario * 0.20

f = Funcionario("Ana", 3000)
g = Gerente("Bob", 5000)
print(f"funcionario: R\${f.bonus():.0f}")
print(f"gerente: R\${g.bonus():.0f}")`,
  },
  'oop-h-projeto': {
    explanation:
      'Cada subclasse sobrescreve descricao() — o mesmo método se comporta diferente por tipo (polimorfismo).',
    code: `class Veiculo:
    def __init__(self, marca):
        self.marca = marca

    def descricao(self):
        return f"veiculo {self.marca}"

class Carro(Veiculo):
    def descricao(self):
        return f"carro {self.marca}"

class Moto(Veiculo):
    def descricao(self):
        return f"moto {self.marca}"

for v in [Carro("Toyota"), Moto("Honda")]:
    print(v.descricao())`,
  },
  'oop-e-ex1': {
    explanation:
      'self.__idade é privado (name mangling: _Cliente__idade). Só os métodos da classe acessam.',
    code: `class Cliente:
    def __init__(self, nome, idade):
        self.nome = nome
        self.__idade = idade

    def e_maior(self):
        return self.__idade >= 18

c = Cliente("Ana", 25)
print(f"nome: {c.nome}")
print(f"maior: {c.e_maior()}")`,
  },
  'oop-e-ex2': {
    explanation:
      'Getter @property calcula F de C; setter converte de volta. (100-32)*5/9 = 37.8.',
    code: `class Temperatura:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, valor):
        self.celsius = (valor - 32) * 5 / 9

t = Temperatura(25)
print(f"25C = {t.fahrenheit:.1f}F")
t.fahrenheit = 100
print(f"100F = {t.celsius:.1f}C")`,
  },
  'oop-e-projeto': {
    explanation:
      'Saldo protegido: __saldo só muda por depositar(); @property expõe leitura. 1000+500 = 1500.',
    code: `class ContaBancaria:
    def __init__(self, titular):
        self.titular = titular
        self.__saldo = 0

    def depositar(self, valor):
        self.__saldo += valor

    @property
    def saldo(self):
        return self.__saldo

c = ContaBancaria("Ana")
c.depositar(1000)
c.depositar(500)
print(f"titular: {c.titular}")
print(f"saldo: R\${c.saldo:.0f}")`,
  },

  // ── Curso TypeScript ───────────────────────────────────────
  'ts-ex1': {
    explanation:
      'type alias nomeia a forma; a instância : Usuario valida os campos. Template literal com ${}.',
    code: `type Usuario = {
  nome: string;
  idade: number;
  ativo: boolean;
};

const ana: Usuario = { nome: "Ana", idade: 25, ativo: true };
console.log(\`\${ana.nome} tem \${ana.idade} anos\`);
console.log(\`ativo: \${ana.ativo}\`);`,
  },
  'ts-ex2': {
    explanation:
      'Parâmetros e retorno tipados: (a: number, b: number): number. Erro de tipo aparece em dev.',
    code: `function somar(a: number, b: number): number {
  return a + b;
}

function saudacao(nome: string): string {
  return \`Olá, \${nome}!\`;
}

console.log(somar(2, 3));
console.log(saudacao("Ana"));`,
  },
  'ts-projeto': {
    explanation:
      'Union literal: Status só aceita "ativo" ou "inativo". T[] tipa o array; reduce soma 1+2+3+4 = 10.',
    code: `type Status = "ativo" | "inativo";

const statuses: Status[] = ["ativo", "inativo", "ativo"];
const numeros: number[] = [1, 2, 3, 4];

console.log(\`statuses: \${statuses.length}\`);
console.log(\`primeiro: \${statuses[0]}\`);
console.log(\`soma: \${numeros.reduce((a, b) => a + b, 0)}\`);`,
  },
  'ts-i-ex1': {
    explanation:
      'interface define o contrato; Produto[] tipa a lista. reduce com comparador acha o mais caro (teclado, 120).',
    code: `interface Produto {
  id: number;
  nome: string;
  preco: number;
}

const produtos: Produto[] = [
  { id: 1, nome: "teclado", preco: 120 },
  { id: 2, nome: "mouse", preco: 60 },
];

console.log(\`produtos: \${produtos.length}\`);
console.log(\`mais caro: \${produtos.reduce((a, b) => (b.preco > a.preco ? b : a)).nome}\`);`,
  },
  'ts-i-ex2': {
    explanation:
      'type Todo descreve a API; const dados: Todo tipa o JSON. TS conhece os campos (autocomplete + validação).',
    code: `type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const resposta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const dados: Todo = await resposta.json();
console.log(\`titulo: \${dados.title}\`);
console.log(\`concluido: \${dados.completed}\`);`,
  },
  'ts-i-projeto': {
    explanation:
      'Union number | string com narrowing: typeof discrimina. Número → toFixed(2), string → toUpperCase().',
    code: `function formatar(valor: number | string): string {
  if (typeof valor === "number") {
    return valor.toFixed(2);
  }
  return valor.toUpperCase();
}

console.log(formatar(3.14159));
console.log(formatar("olá"));`,
  },
  'ts-a-ex1': {
    explanation:
      'Narrowing com typeof: dentro do if o TS sabe que é number. 3.14 com toFixed(2).',
    code: `function formatar(valor: number | string): string {
  if (typeof valor === "number") {
    return valor.toFixed(2);
  }
  return valor.toUpperCase();
}

console.log(formatar(3.14159));
console.log(formatar("olá"));`,
  },
  'ts-a-ex2': {
    explanation:
      'Interface de API + fetch tipado: o compilador valida os campos do JSON devolvido.',
    code: `type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const resposta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const dados: Todo = await resposta.json();
console.log(\`titulo: \${dados.title}\`);
console.log(\`concluido: \${dados.completed}\`);`,
  },
  'ts-a-projeto': {
    explanation:
      'Genérico <T>: funciona com qualquer tipo preservando-o. [] devolve undefined (T | undefined).',
    code: `function primeiro<T>(lista: T[]): T | undefined {
  return lista[0];
}

console.log(primeiro([1, 2, 3]));
console.log(primeiro(["a", "b", "c"]));
console.log(primeiro([]));`,
  },

  // ── Curso Backend Node ─────────────────────────────────────
  'node-ex1': {
    explanation:
      'createServer registra o callback; writeHead define status+headers; end envia o corpo. Fetch local valida.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ mensagem: "olá mundo" }));
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/");
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`mensagem: \${d.mensagem}\`);
  server.close();
});`,
  },
  'node-ex2': {
    explanation:
      'if (req.url === "/") responde 200; senão 404 com JSON. O fetch local testa as duas rotas.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ rota: "raiz" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ erro: "nao encontrado" }));
  }
});

server.listen(3001, async () => {
  const ok = await fetch("http://localhost:3001/");
  const falta = await fetch("http://localhost:3001/x");
  console.log(\`raiz: \${ok.status}\`);
  console.log(\`404: \${falta.status}\`);
  server.close();
});`,
  },
  'node-projeto': {
    explanation:
      'Cadeia if/else por req.url — o roteador manual. /saude devolve { status: "ok" }.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  if (req.url === "/") res.end(JSON.stringify({ rota: "raiz" }));
  else if (req.url === "/saude") res.end(JSON.stringify({ status: "ok" }));
  else res.end(JSON.stringify({ rota: req.url }));
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/saude");
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`saude: \${d.status}\`);
  server.close();
});`,
  },
  'node-a-ex1': {
    explanation:
      'GET /usuarios devolve o array com JSON.stringify. O cliente itera e lê dados.length e dados[0].',
    code: `const http = require("http");

const usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Bob" },
];

const server = http.createServer((req, res) => {
  if (req.url === "/usuarios" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuarios));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/usuarios");
  const dados = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`usuarios: \${dados.length}\`);
  console.log(\`primeiro: \${dados[0].nome}\`);
  server.close();
});`,
  },
  'node-a-ex2': {
    explanation:
      'Regex extrai o id da URL; Number converte; find procura. 404 se não existe — o padrão REST.',
    code: `const http = require("http");

const usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Bob" },
];

const server = http.createServer((req, res) => {
  const m = req.url.match(/^\/usuarios\/(\d+)$/);
  if (m) {
    const id = Number(m[1]);
    const u = usuarios.find((x) => x.id === id);
    if (u) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(u));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ erro: "usuario nao existe" }));
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/usuarios/2");
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`nome: \${d.nome}\`);
  server.close();
});`,
  },
  'node-a-projeto': {
    explanation:
      'Rotas /produtos (lista) e /produtos/3 (item). O cliente busca as duas e compara.',
    code: `const http = require("http");

const produtos = [
  { id: 1, nome: "teclado", preco: 120 },
  { id: 2, nome: "mouse", preco: 60 },
  { id: 3, nome: "monitor", preco: 800 },
];

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  if (req.url === "/produtos") {
    res.end(JSON.stringify(produtos));
  } else if (req.url === "/produtos/3") {
    res.end(JSON.stringify(produtos[2]));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/produtos");
  const todos = await r.json();
  const p = await (await fetch("http://localhost:3001/produtos/3")).json();
  console.log(\`produtos: \${todos.length}\`);
  console.log(\`mais caro: \${p.nome}\`);
  server.close();
});`,
  },
  'node-e-ex1': {
    explanation:
      'Erro padronizado: 500 + { erro: "..." }. O cliente lê o JSON de erro sem quebrar.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/ok") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
  } else {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ erro: "erro interno" }));
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/erro");
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`erro: \${d.erro}\`);
  server.close();
});`,
  },
  'node-e-ex2': {
    explanation:
      'O corpo chega em pedaços (data); no end juntamos e parseamos. POST com fetch + body JSON.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/echo" && req.method === "POST") {
    let corpo = "";
    req.on("data", (chunk) => (corpo += chunk));
    req.on("end", () => {
      const dados = JSON.parse(corpo);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ recebido: dados.nome }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/echo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: "Ana" }),
  });
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`recebido: \${d.recebido}\`);
  server.close();
});`,
  },
  'node-e-projeto': {
    explanation:
      'Query string extraída por regex; Number converte; soma. 400 para uso errado.',
    code: `const http = require("http");

const server = http.createServer((req, res) => {
  const m = req.url.match(/^\/soma\?a=(\d+)&b=(\d+)$/);
  if (m) {
    const resultado = Number(m[1]) + Number(m[2]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ resultado }));
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ erro: "use /soma?a=1&b=2" }));
  }
});

server.listen(3001, async () => {
  const r = await fetch("http://localhost:3001/soma?a=10&b=5");
  const d = await r.json();
  console.log(\`status: \${r.status}\`);
  console.log(\`resultado: \${d.resultado}\`);
  server.close();
});`,
  },

  // ── Curso Docker ───────────────────────────────────────────
  'docker-ex1': {
    explanation:
      'docker version --format {{.Server.Version}} mostra o daemon. O formato Go extrai só a versão.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "version", "--format", "{{.Server.Version}}"], capture_output=True, text=True)
print(f"server: {r.stdout.strip()}")`,
  },
  'docker-ex2': {
    explanation:
      'docker ps lista só os containers ATIVOS. Com --rm, nenhum fica rodando depois do teste → 0. Determinístico.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "ps", "--format", "{{.ID}}"], capture_output=True, text=True)
rodando = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"rodando: {len(rodando)}")`,
  },
  'docker-projeto': {
    explanation:
      'docker ps -aq lista TODOS os containers (incluindo parados). Ambiente limpo do sandbox = 0.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "ps", "-aq"], capture_output=True, text=True)
containers = [l for l in r.stdout.split("\n") if l.strip()]
print(f"containers: {len(containers)}")`,
  },
  'docker-r-ex1': {
    explanation:
      'docker run cria o container e roda o comando. --rm limpa ao terminar. A saída do echo é capturada.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "run", "--rm", "alpine", "echo", "container ok"], capture_output=True, text=True)
print(f"saida: {r.stdout.strip()}")`,
  },
  'docker-r-ex2': {
    explanation:
      'A imagem python:3.12-alpine tem Python embutido — o comando roda ISOLADO, com as libs da imagem.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "run", "--rm", "python:3.12-alpine", "python", "-c", "print('python no container')"], capture_output=True, text=True)
print(f"saida: {r.stdout.strip()}")`,
  },
  'docker-r-projeto': {
    explanation:
      'O exit code do container propaga para o subprocess: exit 3 → returncode 3. 0 = sucesso.',
    code: `import subprocess
DOCKER = "/usr/local/bin/docker"

r = subprocess.run([DOCKER, "run", "--rm", "alpine", "sh", "-c", "exit 3"], capture_output=True, text=True)
print(f"exit: {r.returncode}")`,
  },
  'docker-d-ex1': {
    explanation:
      'FROM define a base; CMD o comando ao rodar. build -q -t cria a imagem com a tag; run executa.',
    code: `import subprocess, os
DOCKER = "/usr/local/bin/docker"

os.makedirs("/tmp/app", exist_ok=True)
with open("/tmp/app/Dockerfile", "w") as f:
    f.write("FROM alpine\nCMD [\"echo\", \"app rodando\"]\n")

r = subprocess.run([DOCKER, "build", "-q", "-t", "meu-app", "/tmp/app"], capture_output=True, text=True)
r2 = subprocess.run([DOCKER, "run", "--rm", "meu-app"], capture_output=True, text=True)
print(f"saida: {r2.stdout.strip()}")`,
  },
  'docker-d-ex2': {
    explanation:
      'WORKDIR define o diretório; RUN executa DURANTE o build (cria o arquivo); CMD cat lê ao rodar.',
    code: `import subprocess, os
DOCKER = "/usr/local/bin/docker"

os.makedirs("/tmp/app2", exist_ok=True)
with open("/tmp/app2/Dockerfile", "w") as f:
    f.write("FROM alpine\nWORKDIR /app\nRUN echo 'construido' > /app/arquivo.txt\nCMD cat /app/arquivo.txt\n")

r = subprocess.run([DOCKER, "build", "-q", "-t", "app2", "/tmp/app2"], capture_output=True, text=True)
r2 = subprocess.run([DOCKER, "run", "--rm", "app2"], capture_output=True, text=True)
print(f"saida: {r2.stdout.strip()}")`,
  },
  'docker-d-projeto': {
    explanation:
      'ENV define a variável no container; $APP_NOME é expandida pelo shell do CMD.',
    code: `import subprocess, os
DOCKER = "/usr/local/bin/docker"

os.makedirs("/tmp/app3", exist_ok=True)
with open("/tmp/app3/Dockerfile", "w") as f:
    f.write("FROM alpine\nENV APP_NOME=meu-app\nCMD echo \"App: $APP_NOME\"\n")

r = subprocess.run([DOCKER, "build", "-q", "-t", "app3", "/tmp/app3"], capture_output=True, text=True)
r2 = subprocess.run([DOCKER, "run", "--rm", "app3"], capture_output=True, text=True)
print(f"saida: {r2.stdout.strip()}")`,
  },
}

/** Busca a solução de um exercício (retorna null se não houver). */
export function getSolution(codeKey: string): Solution | null {
  return (
    SOLUTIONS[codeKey] ??
    FASTAPI_SOLUTIONS[codeKey] ??
    REACT_SOLUTIONS[codeKey] ??
    LINUX_SOLUTIONS[codeKey] ??
    SCRAPING_SOLUTIONS[codeKey] ??
    SECURITY_SOLUTIONS[codeKey] ??
    ALG_SOLUTIONS[codeKey] ??
    SQLAV_SOLUTIONS[codeKey] ??
    JWT_SOLUTIONS[codeKey] ??
    null
  )
}

// ── Curso Autenticação & JWT ──────────────────────────────────
export const JWT_SOLUTIONS: Record<string, Solution> = {
  'jwt-ex1': {
    explanation:
      'b64url codifica o JSON; urlsafe_b64decode + json.loads decodifica. Base64 é reversível — payload visível.',
    code: `import base64, json

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

payload = {"sub": "user-123", "nome": "Ana", "role": "dev"}
codificado = b64url(json.dumps(payload).encode())
print(f"payload: {codificado[:20]}...")

decodificado = json.loads(base64.urlsafe_b64decode(codificado + "=="))
print(f"nome: {decodificado['nome']}")`,
  },
  'jwt-ex2': {
    explanation:
      'Header (alg+typ) e payload codificados em base64. O JWT tem 3 partes: header.payload.assinatura.',
    code: `import base64, json

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

header = {"alg": "HS256", "typ": "JWT"}
payload = {"sub": "user-123", "nome": "Ana"}

header_b64 = b64url(json.dumps(header).encode())
payload_b64 = b64url(json.dumps(payload).encode())
print(f"header: {header_b64}")
print(f"partes: 3 (header.payload.assinatura)")`,
  },
  'jwt-projeto': {
    explanation:
      'Sessão codificada em base64 — qualquer um decodifica (admin está visível!). Por isso vem a assinatura.',
    code: `import base64, json

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

usuario = {"id": 1, "nome": "Ana", "role": "admin"}
codificado = b64url(json.dumps(usuario).encode())
print(f"tamanho: {len(codificado)}")
print(f"decodifica: {'admin' in base64.urlsafe_b64decode(codificado + '==').decode()}")`,
  },
  'jwt-a-ex1': {
    explanation:
      'Assinatura = b64url(HMAC-SHA256(segredo, header.corpo)). Token = header.corpo.assinatura → split dá 3.',
    code: `import base64, json, hmac, hashlib

SECRETO = b"meu-segredo-super-secreto"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload):
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

token = criar_token({"sub": "user-123", "nome": "Ana"})
print(f"partes: {len(token.split('.'))}")
print(f"assinatura: {token.split('.')[2][:10]}...")`,
  },
  'jwt-a-ex2': {
    explanation:
      'Verificação = reassinar header.corpo e comparar com compare_digest. Token adulterado → assinatura difere → False.',
    code: `import base64, json, hmac, hashlib

SECRETO = b"meu-segredo-super-secreto"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload):
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

def verificar_token(token):
    header, corpo, sig = token.split(".")
    esperado = b64url(assinar(f"{header}.{corpo}"))
    return hmac.compare_digest(sig, esperado)

token = criar_token({"sub": "user-123"})
print(f"valido: {verificar_token(token)}")
print(f"adulterado: {verificar_token(token[:-2] + 'xx')}")`,
  },
  'jwt-a-projeto': {
    explanation:
      'HMAC é determinístico: mesmo segredo + mesmo payload → mesma assinatura. t1 == t2 → True.',
    code: `import base64, json, hmac, hashlib

SECRETO = b"segredo-do-servidor"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload):
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

t1 = criar_token({"sub": "user-1"})
t2 = criar_token({"sub": "user-1"})
print(f"deterministico: {t1 == t2}")`,
  },
  'jwt-p-ex1': {
    explanation:
      'exp = time.time() + 3600 (timestamp futuro). Verificação: assinatura OK + exp futuro → payload válido.',
    code: `import base64, json, hmac, hashlib, time

SECRETO = b"meu-segredo-super-secreto"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload, expira_em=3600):
    payload["exp"] = int(time.time()) + expira_em
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

def verificar_token(token):
    try:
        header, corpo, sig = token.split(".")
        esperado = b64url(assinar(f"{header}.{corpo}"))
        if not hmac.compare_digest(sig, esperado):
            return None
        payload = json.loads(base64.urlsafe_b64decode(corpo + "=="))
        if payload.get("exp", 0) < time.time():
            return None
        return payload
    except Exception:
        return None

token = criar_token({"sub": "user-123", "nome": "Ana"})
dados = verificar_token(token)
print(f"valido: {dados is not None}")
print(f"nome: {dados['nome']}")`,
  },
  'jwt-p-ex2': {
    explanation:
      'expira_em=-10 → exp no passado. A verificação checa exp < now → devolve None → expirado True.',
    code: `import base64, json, hmac, hashlib, time

SECRETO = b"meu-segredo-super-secreto"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload, expira_em=3600):
    payload["exp"] = int(time.time()) + expira_em
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

def verificar_token(token):
    try:
        header, corpo, sig = token.split(".")
        esperado = b64url(assinar(f"{header}.{corpo}"))
        if not hmac.compare_digest(sig, esperado):
            return None
        payload = json.loads(base64.urlsafe_b64decode(corpo + "=="))
        if payload.get("exp", 0) < time.time():
            return None
        return payload
    except Exception:
        return None

token = criar_token({"sub": "user-123"}, expira_em=-10)
print(f"expirado: {verificar_token(token) is None}")`,
  },
  'jwt-p-projeto': {
    explanation:
      'Login completo: hash da senha (segurança) → token com sub+email → verificação devolve o payload.',
    code: `import base64, json, hmac, hashlib, time

SECRETO = b"segredo-do-servidor"

def b64url(dados):
    return base64.urlsafe_b64encode(dados).rstrip(b"=").decode()

def assinar(dados):
    return hmac.new(SECRETO, dados.encode(), hashlib.sha256).digest()

def criar_token(payload, expira_em=3600):
    payload["exp"] = int(time.time()) + expira_em
    header = b64url(json.dumps({"alg": "HS256"}).encode())
    corpo = b64url(json.dumps(payload).encode())
    assinatura = b64url(assinar(f"{header}.{corpo}"))
    return f"{header}.{corpo}.{assinatura}"

def verificar_token(token):
    try:
        header, corpo, sig = token.split(".")
        esperado = b64url(assinar(f"{header}.{corpo}"))
        if not hmac.compare_digest(sig, esperado):
            return None
        payload = json.loads(base64.urlsafe_b64decode(corpo + "=="))
        if payload.get("exp", 0) < time.time():
            return None
        return payload
    except Exception:
        return None

def login(email, senha):
    armazenado = hashlib.sha256(b"segredo123").hexdigest()
    if hashlib.sha256(senha.encode()).hexdigest() != armazenado:
        return None
    return criar_token({"sub": "user-1", "email": email})

token = login("ana@x.com", "segredo123")
dados = verificar_token(token)
print(f"login ok: {dados is not None}")
print(f"email: {dados['email']}")`,
  },
}

// ── Curso SQL Avançado ────────────────────────────────────────
export const SQLAV_SOLUTIONS: Record<string, Solution> = {
  'sqlav-ex1': {
    explanation:
      'A subquery (SELECT AVG(valor)) roda primeiro → 2000. WHERE valor > 2000 → só ana (3000, 2500).',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

cur.execute("""
    SELECT DISTINCT vendedor FROM vendas
    WHERE valor > (SELECT AVG(valor) FROM vendas)
""")
acima = [r[0] for r in cur.fetchall()]
print(f"acima da media: {sorted(acima)}")`,
  },
  'sqlav-ex2': {
    explanation:
      'GROUP BY vendedor + MAX(valor): ana 3000, bob 1500, carol 2000. Cada grupo → 1 linha.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

cur.execute("""
    SELECT vendedor, MAX(valor) FROM vendas
    GROUP BY vendedor
""")
top = sorted(cur.fetchall())
print(f"top: {top}")`,
  },
  'sqlav-projeto': {
    explanation:
      'Filtro simples: WHERE valor > 2500 → ana (3000). bob 1500 e carol 2000 ficam de fora.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

cur.execute("""
    SELECT DISTINCT vendedor FROM vendas
    WHERE valor > 2500
""")
print(f"top: {sorted(r[0] for r in cur.fetchall())}")`,
  },
  'sqlav-c-ex1': {
    explanation:
      'CTE totais soma por cliente: ana 250, bob 200, carol 400. WHERE soma > 300 → carol.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE pedidos (id INTEGER, cliente TEXT, total REAL)")
cur.executemany("INSERT INTO pedidos VALUES (?,?,?)", [
    (1, "ana", 100), (2, "bob", 200), (3, "ana", 150), (4, "carol", 400),
])
con.commit()

cur.execute("""
    WITH totais AS (
        SELECT cliente, SUM(total) AS soma FROM pedidos GROUP BY cliente
    )
    SELECT cliente FROM totais WHERE soma > 300
""")
print(f"clientes: {sorted(r[0] for r in cur.fetchall())}")`,
  },
  'sqlav-c-ex2': {
    explanation:
      'CTE com COUNT(*) por cliente: ana 2, bob 1, carol 1. ORDER BY qtd DESC.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE pedidos (id INTEGER, cliente TEXT, total REAL)")
cur.executemany("INSERT INTO pedidos VALUES (?,?,?)", [
    (1, "ana", 100), (2, "bob", 200), (3, "ana", 150), (4, "carol", 300),
])
con.commit()

cur.execute("""
    WITH contagem AS (
        SELECT cliente, COUNT(*) AS qtd FROM pedidos GROUP BY cliente
    )
    SELECT cliente, qtd FROM contagem ORDER BY qtd DESC
""")
print(cur.fetchall())`,
  },
  'sqlav-c-projeto': {
    explanation:
      'CTE com SUM(total) por cliente; ORDER BY soma DESC: carol 300 > ana 250 > bob 200.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE pedidos (id INTEGER, cliente TEXT, total REAL)")
cur.executemany("INSERT INTO pedidos VALUES (?,?,?)", [
    (1, "ana", 100), (2, "bob", 200), (3, "ana", 150), (4, "carol", 300),
])
con.commit()

cur.execute("""
    WITH totais AS (
        SELECT cliente, SUM(total) AS soma FROM pedidos GROUP BY cliente
    )
    SELECT cliente, soma FROM totais ORDER BY soma DESC
""")
print(cur.fetchall())`,
  },
  'sqlav-w-ex1': {
    explanation:
      'RANK() OVER (ORDER BY valor DESC): ana 3000 → posição 1. Mantém as 5 linhas (não agrupa).',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

cur.execute("""
    SELECT vendedor, valor, RANK() OVER (ORDER BY valor DESC) AS pos
    FROM vendas
""")
linhas = cur.fetchall()
print(f"linhas: {len(linhas)}")
print(f"primeira: {linhas[0]}")`,
  },
  'sqlav-w-ex2': {
    explanation:
      'PARTITION BY vendedor reinicia a soma; ORDER BY id acumula. Ana: 3000 + 2500 = 5500.',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

cur.execute("""
    SELECT vendedor, SUM(valor) OVER (PARTITION BY vendedor ORDER BY id) AS acumulado
    FROM vendas WHERE vendedor = 'ana'
""")
linhas = cur.fetchall()
print(f"ana total: {linhas[-1][1]}")`,
  },
  'sqlav-w-projeto': {
    explanation:
      'Window + subquery: RANK interno, WHERE pos <= 2 fora. Ana tem as 2 maiores (3000, 2500).',
    code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE vendas (id INTEGER, vendedor TEXT, valor REAL)")
cur.executemany("INSERT INTO vendas VALUES (?,?,?)", [
    (1, "ana", 3000), (2, "bob", 1500), (3, "ana", 2500),
    (4, "carol", 2000), (5, "bob", 1000),
])
con.commit()

cur.execute("""
    SELECT vendedor, valor FROM (
        SELECT vendedor, valor, RANK() OVER (ORDER BY valor DESC) AS pos FROM vendas
    ) WHERE pos <= 2
""")
print(sorted(cur.fetchall()))`,
  },
}

// ── Curso Algoritmos de Entrevista ────────────────────────────
export const ALG_SOLUTIONS: Record<string, Solution> = {
  'alg-ex1': {
    explanation:
      'Two pointers nos extremos, swap e avanço. Sem array novo — O(n) e O(1) memória.',
    code: `def inverter(s):
    chars = list(s)
    esq, dir_ = 0, len(chars) - 1
    while esq < dir_:
        chars[esq], chars[dir_] = chars[dir_], chars[esq]
        esq += 1
        dir_ -= 1
    return "".join(chars)

print(inverter("abcde"))`,
  },
  'alg-ex2': {
    explanation:
      'Lista ordenada: soma pequena → esq avança; grande → dir recua. 2+5 = 7.',
    code: `def achar_par(nums, alvo):
    esq, dir_ = 0, len(nums) - 1
    while esq < dir_:
        soma = nums[esq] + nums[dir_]
        if soma == alvo:
            return (nums[esq], nums[dir_])
        elif soma < alvo:
            esq += 1
        else:
            dir_ -= 1
    return None

print(achar_par([1, 2, 3, 4, 5], 7))`,
  },
  'alg-projeto': {
    explanation:
      'Compara os extremos; qualquer diferença → False. arara é palíndromo; python e reconhecer não.',
    code: `def e_palindromo(s):
    esq, dir_ = 0, len(s) - 1
    while esq < dir_:
        if s[esq] != s[dir_]:
            return False
        esq += 1
        dir_ -= 1
    return True

for s in ["arara", "python", "reconhecer"]:
    print(f"{s}: {e_palindromo(s)}")`,
  },
  'alg-s-ex1': {
    explanation:
      'Janela fixa: soma += nums[i] - nums[i-k]. Janelas 8, 7, 9, 6 → maior 9.',
    code: `def maior_soma(nums, k):
    soma_atual = sum(nums[:k])
    maior = soma_atual
    for i in range(k, len(nums)):
        soma_atual += nums[i] - nums[i - k]
        maior = max(maior, soma_atual)
    return maior

print(maior_soma([2, 1, 5, 1, 3, 2], 3))`,
  },
  'alg-s-ex2': {
    explanation:
      'Janela dinâmica: expande com dir_, encolhe com while soma > k. [1,2,1,1] soma 5 → tamanho 4.',
    code: `def mais_longo(nums, k):
    esq = 0
    soma = 0
    melhor = 0
    for dir_ in range(len(nums)):
        soma += nums[dir_]
        while soma > k:
            soma -= nums[esq]
            esq += 1
        melhor = max(melhor, dir_ - esq + 1)
    return melhor

print(mais_longo([3, 1, 2, 1, 1], 5))`,
  },
  'alg-s-projeto': {
    explanation:
      'Encolha enquanto soma >= alvo e registre o menor tamanho. [4,3] soma 7 → tamanho 2.',
    code: `def menor_subarray(nums, alvo):
    esq = 0
    soma = 0
    melhor = float("inf")
    for dir_ in range(len(nums)):
        soma += nums[dir_]
        while soma >= alvo:
            melhor = min(melhor, dir_ - esq + 1)
            soma -= nums[esq]
            esq += 1
    return 0 if melhor == float("inf") else melhor

print(menor_subarray([2, 3, 1, 2, 4, 3], 7))`,
  },
  'alg-r-ex1': {
    explanation:
      'Caso base n <= 1; chamada menor fib(n-1) + fib(n-2). fib(10) = 55.',
    code: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(10))`,
  },
  'alg-r-ex2': {
    explanation:
      'Caso base n <= 1 → 1; chamada menor n * fatorial(n-1). 5*4*3*2*1 = 120.',
    code: `def fatorial(n):
    if n <= 1:
        return 1
    return n * fatorial(n - 1)

print(fatorial(5))`,
  },
  'alg-r-projeto': {
    explanation:
      'contar(n) = [n] + contar(n-1) constrói a lista; soma_ate(n) = n + soma_ate(n-1) soma. 1+2+3+4+5 = 15.',
    code: `def contar(n):
    if n == 0:
        return []
    return [n] + contar(n - 1)

def soma_ate(n):
    if n <= 1:
        return n
    return n + soma_ate(n - 1)

print(contar(5))
print(soma_ate(5))`,
  },
}

// ── Curso Cibersegurança ──────────────────────────────────────
export const SECURITY_SOLUTIONS: Record<string, Solution> = {
  'security-ex1': {
    explanation:
      'sha256(senha.encode()).hexdigest() gera 64 caracteres hex — a impressão digital da senha.',
    code: `import hashlib

senha = "minha-senha-secreta"
hash_senha = hashlib.sha256(senha.encode()).hexdigest()

print(f"hash: {hash_senha[:16]}...")
print(f"len: {len(hash_senha)}")`,
  },
  'security-ex2': {
    explanation:
      'Verificação = hashear a digitada e comparar com o armazenado. Senha errada → hash diferente → False.',
    code: `import hashlib

def verificar(senha, hash_armazenado):
    return hashlib.sha256(senha.encode()).hexdigest() == hash_armazenado

senha = "segredo123"
armazenado = hashlib.sha256(senha.encode()).hexdigest()

print(f"correta: {verificar('segredo123', armazenado)}")
print(f"errada: {verificar('senha-errada', armazenado)}")`,
  },
  'security-projeto': {
    explanation:
      'O banco guarda só o hash. Login compara sha256(senha) com o hash — a senha pura nunca é armazenada.',
    code: `import hashlib

usuarios = {}

def registrar(nome, senha):
    usuarios[nome] = hashlib.sha256(senha.encode()).hexdigest()

def login(nome, senha):
    if nome not in usuarios:
        return False
    return usuarios[nome] == hashlib.sha256(senha.encode()).hexdigest()

registrar("ana", "segredo123")
print(f"login certo: {login('ana', 'segredo123')}")
print(f"login errado: {login('ana', 'outra')}")`,
  },
  'security-a-ex1': {
    explanation:
      "A concatenação vira 'bob' OR '1'='1 → sempre verdadeiro → vaza 2. O parâmetro ? trata o input como dado → 0.",
    code: `import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE usuarios (id INTEGER, nome TEXT)")
cur.executemany("INSERT INTO usuarios VALUES (?, ?)", [(1, "ana"), (2, "bob")])
con.commit()

entrada = "bob' OR '1'='1"
query = f"SELECT * FROM usuarios WHERE nome = '{entrada}'"
cur.execute(query)
print(f"vazou: {len(cur.fetchall())} usuarios")

cur.execute("SELECT * FROM usuarios WHERE nome = ?", (entrada,))
print(f"segura: {len(cur.fetchall())} usuario")`,
  },
  'security-a-ex2': {
    explanation:
      'html.escape transforma < > e aspas em entidades — o script vira texto inofensivo no navegador.',
    code: `import html

comentario = "<script>alert('xss')</script>"
sanitizado = html.escape(comentario)

print(f"original: {comentario}")
print(f"sanitizado: {sanitizado}")`,
  },
  'security-a-projeto': {
    explanation:
      'Parâmetro ? no execute — o input malicioso vira DADO, não SQL. Resultado 0 (não vaza).',
    code: `import sqlite3

def buscar_usuario(con, nome):
    cur = con.cursor()
    cur.execute("SELECT * FROM usuarios WHERE nome = ?", (nome,))
    return cur.fetchall()

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE usuarios (id INTEGER, nome TEXT)")
cur.executemany("INSERT INTO usuarios VALUES (?, ?)", [(1, "ana"), (2, "bob")])
con.commit()

malicioso = "bob' OR '1'='1"
print(f"resultado: {len(buscar_usuario(con, malicioso))}")`,
  },
  'security-p-ex1': {
    explanation:
      '3 regras: 8+ chars, maiúscula (re.search [A-Z]), número (\\d). Só "SenhaForte1" passa.',
    code: `import re

def validar_senha(senha):
    if len(senha) < 8:
        return False
    if not re.search(r"[A-Z]", senha):
        return False
    if not re.search(r"\\d", senha):
        return False
    return True

for s in ["fraco", "SenhaForte1", "semnumero"]:
    print(f"{s}: {validar_senha(s)}")`,
  },
  'security-p-ex2': {
    explanation:
      'hmac.compare_digest compara em tempo constante — o timing attack não consegue medir diferenças.',
    code: `import hmac, hashlib

def comparar_seguro(a, b):
    return hmac.compare_digest(a, b)

hash1 = hashlib.sha256(b"segredo").hexdigest()
hash2 = hashlib.sha256(b"segredo").hexdigest()
hash3 = hashlib.sha256(b"outro").hexdigest()

print(f"iguais: {comparar_seguro(hash1, hash2)}")
print(f"diferentes: {comparar_seguro(hash1, hash3)}")`,
  },
  'security-p-projeto': {
    explanation:
      'os.urandom(16) gera 16 bytes criptograficamente aleatórios — salt único por chamada, hash diferente mesmo com senha igual.',
    code: `import hashlib, os

def hash_com_salt(senha):
    salt = os.urandom(16).hex()
    return salt, hashlib.sha256((salt + senha).encode()).hexdigest()

s1, h1 = hash_com_salt("mesma")
s2, h2 = hash_com_salt("mesma")
print(f"salts diferentes: {s1 != s2}")
print(f"hashes diferentes: {h1 != h2}")`,
  },
}

// ── Curso Web Scraping ────────────────────────────────────────
export const SCRAPING_SOLUTIONS: Record<string, Solution> = {
  'scraping-ex1': {
    explanation:
      'findall + grupo ([^<]+) captura o texto de cada div.produto. 3 produtos no HTML.',
    code: `import re

html = """<html><body>
<h1>Loja</h1>
<div class="produto">teclado - R$ 120</div>
<div class="produto">mouse - R$ 60</div>
<div class="produto">monitor - R$ 800</div>
</body></html>"""

produtos = re.findall(r'class="produto">([^<]+)<', html)
print(f"produtos: {len(produtos)}")
print(f"primeiro: {produtos[0]}")`,
  },
  'scraping-ex2': {
    explanation:
      'findall de href pega os 3 links; startswith("/produto") filtra os 2 de produto.',
    code: `import re

html = """<html><body>
<a href="/produto/1">Teclado</a>
<a href="/produto/2">Mouse</a>
<a href="/contato">Contato</a>
</body></html>"""

links = re.findall(r'href="([^"]+)"', html)
produtos = [l for l in links if l.startswith("/produto")]
print(f"links: {len(links)}")
print(f"produtos: {produtos}")`,
  },
  'scraping-projeto': {
    explanation:
      'Regex com 2 grupos captura (nome, preco); sum dos ints. 120+60+800 = 980.',
    code: `import re

html = """<html><body>
<table>
<tr><td>teclado</td><td>120</td></tr>
<tr><td>mouse</td><td>60</td></tr>
<tr><td>monitor</td><td>800</td></tr>
</table>
</body></html>"""

linhas = re.findall(r"<tr><td>([^<]+)</td><td>(\\d+)</td></tr>", html)
total = sum(int(preco) for _, preco in linhas)
print(f"itens: {len(linhas)}")
print(f"total: R\${total}")`,
  },
  'scraping-a-ex1': {
    explanation:
      'urlopen + json.loads transforma a API em lista de dicts; comprehension extrai os nomes. 10 usuários.',
    code: `import urllib.request
import json

url = "https://jsonplaceholder.typicode.com/users"
with urllib.request.urlopen(url, timeout=10) as resp:
    usuarios = json.loads(resp.read())

nomes = [u["name"] for u in usuarios]
print(f"usuarios: {len(nomes)}")
print(f"primeiro: {nomes[0]}")`,
  },
  'scraping-a-ex2': {
    explanation:
      'Mesma coleta; [u["email"] for u in usuarios] extrai os emails. O domínio tem @ (True).',
    code: `import urllib.request
import json

url = "https://jsonplaceholder.typicode.com/users"
with urllib.request.urlopen(url, timeout=10) as resp:
    usuarios = json.loads(resp.read())

emails = [u["email"] for u in usuarios]
print(f"emails: {len(emails)}")
print(f"dominio comum: {'@' in emails[0]}")`,
  },
  'scraping-a-projeto': {
    explanation:
      'Filtro por endswith(".biz") — 3 usuários com email .biz no dataset. API estruturada = filtro simples.',
    code: `import urllib.request
import json

url = "https://jsonplaceholder.typicode.com/users"
with urllib.request.urlopen(url, timeout=10) as resp:
    usuarios = json.loads(resp.read())

biz = [u for u in usuarios if u["email"].endswith(".biz")]
print(f"biz: {len(biz)}")
print(f"primeiro: {biz[0]['name']}")`,
  },
  'scraping-p-ex1': {
    explanation:
      'Dict acumulador com .get(userId, 0) + 1. 100 posts, 10 por usuário (100/10).',
    code: `import urllib.request
import json

url = "https://jsonplaceholder.typicode.com/posts"
with urllib.request.urlopen(url, timeout=10) as resp:
    posts = json.loads(resp.read())

por_usuario = {}
for p in posts:
    por_usuario[p["userId"]] = por_usuario.get(p["userId"], 0) + 1

print(f"posts: {len(posts)}")
print(f"usuario 1: {por_usuario[1]}")`,
  },
  'scraping-p-ex2': {
    explanation:
      'min com key=lambda p: len(p["body"]) acha o post de body mais curto (102 chars).',
    code: `import urllib.request
import json

url = "https://jsonplaceholder.typicode.com/posts"
with urllib.request.urlopen(url, timeout=10) as resp:
    posts = json.loads(resp.read())

mais_curto = min(posts, key=lambda p: len(p["body"]))
print(f"posts: {len(posts)}")
print(f"mais curto: {len(mais_curto['body'])} chars")`,
  },
  'scraping-p-projeto': {
    explanation:
      'Comprehension com if filtra os concluídos — 90 de 200 todos. O pipeline completo: coleta + filtro + contagem.',
    code: `import urllib.request
import json

url = "https://jsonplaceholder.typicode.com/todos"
with urllib.request.urlopen(url, timeout=10) as resp:
    todos = json.loads(resp.read())

concluidos = [t for t in todos if t["completed"]]
print(f"todos: {len(todos)}")
print(f"concluidos: {len(concluidos)}")`,
  },
}

// ── Curso Linux & Terminal ────────────────────────────────────
export const LINUX_SOLUTIONS: Record<string, Solution> = {
  'linux-ex1': {
    explanation:
      'pwd mostra o diretório atual. No sandbox o cwd é a raiz /. Determinístico.',
    code: `import subprocess

r = subprocess.run(["pwd"], capture_output=True, text=True)
print(f"pwd: {r.stdout.strip()}")`,
  },
  'linux-ex2': {
    explanation:
      'ls lista o diretório; o filtro remove linhas vazias. a.txt e b.txt — determinístico.',
    code: `import subprocess, os

os.makedirs("/tmp/linux-lab", exist_ok=True)
os.chdir("/tmp/linux-lab")
open("a.txt", "w").close()
open("b.txt", "w").close()

r = subprocess.run(["ls"], capture_output=True, text=True)
arquivos = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"arquivos: {sorted(arquivos)}")`,
  },
  'linux-projeto': {
    explanation:
      'find -type d acha as pastas: /tmp/proj, /tmp/proj/src, /tmp/proj/docs = 3.',
    code: `import subprocess, os

os.makedirs("/tmp/proj/src", exist_ok=True)
os.makedirs("/tmp/proj/docs", exist_ok=True)

r = subprocess.run(["find", "/tmp/proj", "-type", "d"], capture_output=True, text=True)
pastas = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"pastas: {len(pastas)}")`,
  },
  'linux-g-ex1': {
    explanation:
      'grep filtra as linhas com "erro" — 2 no log de exemplo. Troubleshooting real.',
    code: `import subprocess

with open("/tmp/log.txt", "w") as f:
    f.write("info: inicio\\nerro: falhou\\ninfo: ok\\nerro: timeout\\n")

r2 = subprocess.run(["grep", "erro", "/tmp/log.txt"], capture_output=True, text=True)
linhas = [l for l in r2.stdout.split("\\n") if l.strip()]
print(f"erros: {len(linhas)}")
print(f"primeiro: {linhas[0]}")`,
  },
  'linux-g-ex2': {
    explanation:
      'wc -l conta as linhas: "5 /tmp/dados.txt" — split()[0] pega o número.',
    code: `import subprocess

with open("/tmp/dados.txt", "w") as f:
    f.write("a\\nb\\nc\\nd\\ne\\n")

r = subprocess.run(["wc", "-l", "/tmp/dados.txt"], capture_output=True, text=True)
print(f"linhas: {r.stdout.strip().split()[0]}")`,
  },
  'linux-g-projeto': {
    explanation:
      'find -name "*.py" acha só os Python: a.py e c.py = 2 (b.js e d.txt ficam de fora).',
    code: `import subprocess, os

os.makedirs("/tmp/mix", exist_ok=True)
for n in ["a.py", "b.js", "c.py", "d.txt"]:
    open(f"/tmp/mix/{n}", "w").close()

r = subprocess.run(["find", "/tmp/mix", "-name", "*.py"], capture_output=True, text=True)
pys = [l for l in r.stdout.split("\\n") if l.strip()]
print(f"pythons: {len(pys)}")`,
  },
  'linux-p-ex1': {
    explanation:
      'sort ordena (banana, banana, banana, maça, uva); uniq -c conta as consecutivas: 3 banana.',
    code: `import subprocess

with open("/tmp/lista.txt", "w") as f:
    f.write("banana\\nmaça\\nbanana\\nuva\\nbanana\\n")

r = subprocess.run(["sort", "/tmp/lista.txt"], capture_output=True, text=True)
r2 = subprocess.run(["uniq", "-c"], input=r.stdout, capture_output=True, text=True)
print(r2.stdout.strip())`,
  },
  'linux-p-ex2': {
    explanation:
      'chmod +x adiciona execução ao dono; ls -l mostra -rwxr-xr-x (dono rwx). No Linux não há o @ do macOS.',
    code: `import subprocess

with open("/tmp/script.sh", "w") as f:
    f.write("#!/bin/bash\\necho olá\\n")

r = subprocess.run(["chmod", "+x", "/tmp/script.sh"], capture_output=True, text=True)
r2 = subprocess.run(["ls", "-l", "/tmp/script.sh"], capture_output=True, text=True)
print(r2.stdout.strip().split()[0])`,
  },
  'linux-p-projeto': {
    explanation:
      'which bash devolve o caminho do executável — /usr/bin/bash no sandbox (distro Debian).',
    code: `import subprocess

r = subprocess.run(["which", "bash"], capture_output=True, text=True)
print(f"bash: {r.stdout.strip()}")`,
  },
}

// ── Curso React ───────────────────────────────────────────────
export const REACT_SOLUTIONS: Record<string, Solution> = {
  'react-ex1': {
    explanation:
      'Componente = função com props; createElement monta o elemento; renderToString vira HTML.',
    code: `const React = require("react");
const { renderToString } = require("react-dom/server");

function Saudacao({ nome }) {
  return React.createElement("h1", null, \`Olá, \${nome}!\`);
}

const html = renderToString(React.createElement(Saudacao, { nome: "Ana" }));
console.log(html);`,
  },
  'react-ex2': {
    explanation:
      'Composição: createElement("div", null, filho1, filho2) — componentes aninhados.',
    code: `const React = require("react");
const { renderToString } = require("react-dom/server");

function Titulo() {
  return React.createElement("h1", null, "Catálogo");
}

function Paragrafo({ texto }) {
  return React.createElement("p", null, texto);
}

const app = React.createElement(
  "div",
  null,
  React.createElement(Titulo),
  React.createElement(Paragrafo, { texto: "bem-vindo" })
);
const html = renderToString(app);
console.log(html);`,
  },
  'react-projeto': {
    explanation:
      'Perfil compõe Avatar (iniciais) + h2 + p. Props fluem do pai para o filho.',
    code: `const React = require("react");
const { renderToString } = require("react-dom/server");

function Avatar({ nome }) {
  return React.createElement(
    "div",
    { className: "avatar" },
    nome.slice(0, 2).toUpperCase()
  );
}

function Perfil({ nome, cargo }) {
  return React.createElement(
    "div",
    { className: "perfil" },
    React.createElement(Avatar, { nome }),
    React.createElement("h2", null, nome),
    React.createElement("p", null, cargo)
  );
}

const html = renderToString(React.createElement(Perfil, { nome: "Ana Silva", cargo: "Dev" }));
console.log(html);`,
  },
  'react-l-ex1': {
    explanation:
      'map transforma cada item em elemento; key identifica o item para a reconciliação do React.',
    code: `const React = require("react");
const { renderToString } = require("react-dom/server");

function Lista({ itens }) {
  return React.createElement(
    "ul",
    null,
    itens.map((item) => React.createElement("li", { key: item }, item))
  );
}

const html = renderToString(React.createElement(Lista, { itens: ["a", "b", "c"] }));
console.log(html);`,
  },
  'react-l-ex2': {
    explanation:
      'if/else escolhe o caminho de render. className (não class!) define a classe CSS.',
    code: `const React = require("react");
const { renderToString } = require("react-dom/server");

function Status({ ativo }) {
  if (ativo) {
    return React.createElement("span", { className: "ok" }, "ativo");
  }
  return React.createElement("span", { className: "off" }, "inativo");
}

const html = renderToString(React.createElement(Status, { ativo: true }));
console.log(html);`,
  },
  'react-l-projeto': {
    explanation:
      'Produto (componente) recebe {nome, preco} por props; map + key renderiza a lista.',
    code: `const React = require("react");
const { renderToString } = require("react-dom/server");

function Produto({ nome, preco }) {
  return React.createElement(
    "li",
    null,
    \`\${nome} - R\$ \${preco.toFixed(2)}\`
  );
}

function ListaProdutos({ produtos }) {
  return React.createElement(
    "ul",
    null,
    produtos.map((p) => React.createElement(Produto, { key: p.nome, nome: p.nome, preco: p.preco }))
  );
}

const produtos = [
  { nome: "teclado", preco: 120 },
  { nome: "mouse", preco: 60 },
  { nome: "monitor", preco: 800 },
];

const html = renderToString(React.createElement(ListaProdutos, { produtos }));
console.log(html);`,
  },
  'react-c-ex1': {
    explanation:
      'children é a prop mágica: o conteúdo aninhado chega pronto para renderizar dentro do Card.',
    code: `const React = require("react");
const { renderToString } = require("react-dom/server");

function Card({ titulo, children }) {
  return React.createElement(
    "div",
    { className: "card" },
    React.createElement("h3", null, titulo),
    children
  );
}

const app = React.createElement(
  Card,
  { titulo: "Meu card" },
  React.createElement("p", null, "conteúdo do card")
);
const html = renderToString(app);
console.log(html);`,
  },
  'react-c-ex2': {
    explanation:
      'cor || "blue" dá o default. O style do elemento é um objeto com backgroundColor.',
    code: `const React = require("react");
const { renderToString } = require("react-dom/server");

function Botao({ label, cor }) {
  const estilo = { backgroundColor: cor || "blue" };
  return React.createElement("button", { style: estilo }, label);
}

const html = renderToString(React.createElement(Botao, { label: "Salvar" }));
console.log(html);`,
  },
  'react-c-projeto': {
    explanation:
      'Layout composto: Pagina usa Header/Main/Footer — o padrão de todo app React/Next.',
    code: `const React = require("react");
const { renderToString } = require("react-dom/server");

function Header({ titulo }) {
  return React.createElement("header", null, React.createElement("h1", null, titulo));
}

function Footer({ ano }) {
  return React.createElement("footer", null, \`© \${ano}\`);
}

function Pagina({ titulo, children, ano }) {
  return React.createElement(
    "div",
    { className: "pagina" },
    React.createElement(Header, { titulo }),
    React.createElement("main", null, children),
    React.createElement(Footer, { ano })
  );
}

const app = React.createElement(
  Pagina,
  { titulo: "Edu Coding", ano: 2026 },
  React.createElement("p", null, "aprenda a programar")
);
const html = renderToString(app);
console.log(html);`,
  },
}

// ── Curso FastAPI ─────────────────────────────────────────────
export const FASTAPI_SOLUTIONS: Record<string, Solution> = {
  'fastapi-ex1': {
    explanation:
      '@app.get("/") registra a rota; o dict retornado vira JSON. TestClient testa sem servidor.',
    code: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/")
def raiz():
    return {"mensagem": "olá fastapi"}

client = TestClient(app)
r = client.get("/")
print(f"status: {r.status_code}")
print(f"mensagem: {r.json()['mensagem']}")`,
  },
  'fastapi-ex2': {
    explanation:
      'Rotas não registradas recebem 404 automático do FastAPI — sem código extra.',
    code: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/")
def raiz():
    return {"ok": True}

client = TestClient(app)
r1 = client.get("/")
r2 = client.get("/qualquer-coisa")
print(f"raiz: {r1.status_code}")
print(f"desconhecida: {r2.status_code}")`,
  },
  'fastapi-projeto': {
    explanation:
      'Cada @app.get registra uma rota; o TestClient testa a /saude e lê o JSON.',
    code: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/")
def raiz():
    return {"servico": "api", "versao": "1.0"}

@app.get("/saude")
def saude():
    return {"status": "ok"}

client = TestClient(app)
r = client.get("/saude")
print(f"status: {r.status_code}")
print(f"saude: {r.json()['status']}")`,
  },
  'fastapi-r-ex1': {
    explanation:
      'GET /usuarios devolve a lista de dicts — FastAPI serializa em JSON. O cliente lê .json() e itera.',
    code: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/usuarios")
def listar():
    return [
        {"id": 1, "nome": "Ana"},
        {"id": 2, "nome": "Bob"},
    ]

client = TestClient(app)
r = client.get("/usuarios")
dados = r.json()
print(f"status: {r.status_code}")
print(f"usuarios: {len(dados)}")
print(f"primeiro: {dados[0]['nome']}")`,
  },
  'fastapi-r-ex2': {
    explanation:
      '{usuario_id} captura o valor da URL; : int valida o tipo; o dict busca o nome. 404 para inexistente.',
    code: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/usuarios/{usuario_id}")
def buscar(usuario_id: int):
    usuarios = {1: "Ana", 2: "Bob"}
    if usuario_id not in usuarios:
        return {"erro": "usuario nao existe"}
    return {"id": usuario_id, "nome": usuarios[usuario_id]}

client = TestClient(app)
r = client.get("/usuarios/2")
print(f"status: {r.status_code}")
print(f"nome: {r.json()['nome']}")`,
  },
  'fastapi-r-projeto': {
    explanation:
      'Lista de dicts + rota dinâmica com for+if. /produtos/3 devolve o monitor (mais caro).',
    code: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

produtos = [
    {"id": 1, "nome": "teclado", "preco": 120},
    {"id": 2, "nome": "mouse", "preco": 60},
    {"id": 3, "nome": "monitor", "preco": 800},
]

@app.get("/produtos")
def listar():
    return produtos

@app.get("/produtos/{produto_id}")
def buscar(produto_id: int):
    for p in produtos:
        if p["id"] == produto_id:
            return p
    return {"erro": "produto nao existe"}

client = TestClient(app)
todos = client.get("/produtos").json()
p = client.get("/produtos/3").json()
print(f"produtos: {len(todos)}")
print(f"mais caro: {p['nome']}")`,
  },
  'fastapi-p-ex1': {
    explanation:
      'Pydantic valida o corpo do POST automaticamente. req.nome acessa o campo tipado.',
    code: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()

class EchoRequest(BaseModel):
    nome: str

@app.post("/echo")
def echo(req: EchoRequest):
    return {"recebido": req.nome}

client = TestClient(app)
r = client.post("/echo", json={"nome": "Ana"})
print(f"status: {r.status_code}")
print(f"recebido: {r.json()['recebido']}")`,
  },
  'fastapi-p-ex2': {
    explanation:
      'Args da função = query params. client.get com params={"a":10,"b":5}. Type hints validam.',
    code: `from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/soma")
def soma(a: int, b: int):
    return {"resultado": a + b}

client = TestClient(app)
r = client.get("/soma", params={"a": 10, "b": 5})
print(f"status: {r.status_code}")
print(f"resultado: {r.json()['resultado']}")`,
  },
  'fastapi-p-projeto': {
    explanation:
      'Pydantic valida TIPO (idade int); a função valida REGRA (>= 18). 25 → ok, 15 → erro.',
    code: `from fastapi import FastAPI
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()

class CadastroRequest(BaseModel):
    nome: str
    idade: int

@app.post("/cadastro")
def cadastro(req: CadastroRequest):
    if req.idade < 18:
        return {"erro": "menor de idade"}
    return {"ok": True, "nome": req.nome}

client = TestClient(app)
r1 = client.post("/cadastro", json={"nome": "Ana", "idade": 25})
r2 = client.post("/cadastro", json={"nome": "Bob", "idade": 15})
print(f"ana: {r1.json()['ok']}")
print(f"bob: {r2.json()['erro']}")`,
  },
}
