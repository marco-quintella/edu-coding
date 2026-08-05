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
}

/** Busca a solução de um exercício (retorna null se não houver). */
export function getSolution(codeKey: string): Solution | null {
  return SOLUTIONS[codeKey] ?? null
}
