/**
 * Glossário interativo — termo → definição + link para a lição/fase
 * onde o conceito aparece.
 */

export interface GlossaryTerm {
  /** Slug do termo (para âncora/busca) */
  id: string
  term: string
  /** Definição curta e direta (1-2 frases) */
  definition: string
  /** Slug da lição onde o termo é apresentado */
  lessonSlug: string
  /** Número da fase */
  phase: number
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ── Fase 01 ────────────────────────────────────────────────
  {
    id: 'regressao-linear',
    term: 'Regressão Linear',
    definition:
      'Modelo que encontra a reta y = mx + b que melhor representa os dados, minimizando a soma dos erros quadráticos (OLS).',
    lessonSlug: 'regressao-linear',
    phase: 1,
  },
  {
    id: 'slope',
    term: 'Slope (coeficiente angular)',
    definition:
      'O "m" da reta: quanto y muda quando x cresce 1 unidade. O sklearn expõe como model.coef_.',
    lessonSlug: 'regressao-linear',
    phase: 1,
  },
  {
    id: 'intercept',
    term: 'Intercept',
    definition:
      'O "b" da reta: o valor de y quando x = 0. Força a reta a passar pelo centro dos dados. model.intercept_.',
    lessonSlug: 'regressao-linear',
    phase: 1,
  },
  {
    id: 'r2',
    term: 'R² (coeficiente de determinação)',
    definition:
      'Mede quanto da variância dos dados o modelo explica (0 a 1). R² alto no treino pode ser overfitting.',
    lessonSlug: 'regressao-linear',
    phase: 1,
  },
  {
    id: 'erro-quadratico',
    term: 'Erro quadrático',
    definition:
      'Soma dos (y_i - ŷ_i)². Penaliza erros grandes mais que o erro absoluto, e tem mínimo único (função convexa).',
    lessonSlug: 'regressao-linear',
    phase: 1,
  },
  {
    id: 'overfitting',
    term: 'Overfitting',
    definition:
      'Quando o modelo decora os dados de treino em vez de aprender o padrão. Detecta-se pelo gap treino alto × teste baixo.',
    lessonSlug: 'regressao-linear',
    phase: 1,
  },
  {
    id: 'underfitting',
    term: 'Underfitting',
    definition:
      'Quando o modelo é simples demais para capturar o padrão — erra tanto no treino quanto no teste.',
    lessonSlug: 'regressao-linear',
    phase: 1,
  },
  {
    id: 'train-test',
    term: 'Train/test split',
    definition:
      'Dividir os dados: treinar num pedaço e avaliar em outro que o modelo nunca viu — mede generalização, não memória.',
    lessonSlug: 'regressao-linear',
    phase: 1,
  },
  {
    id: 'outlier',
    term: 'Outlier',
    definition:
      'Ponto que foge do padrão. Na regressão, puxa a reta inteira (erro quadrático amplifica); em anomalias, é o que se quer achar.',
    lessonSlug: 'regressao-linear',
    phase: 1,
  },
  {
    id: 'arvore-decisao',
    term: 'Árvore de Decisão',
    definition:
      'Modelo que faz perguntas binárias em sequência para separar as classes. O caminho da raiz às folhas é a regra de decisão.',
    lessonSlug: 'arvores-decisao',
    phase: 1,
  },
  {
    id: 'gini',
    term: 'Impureza (Gini)',
    definition:
      'Mede o quão misturadas estão as classes num nó. A árvore escolhe a pergunta que mais reduz a impureza.',
    lessonSlug: 'arvores-decisao',
    phase: 1,
  },
  {
    id: 'max-depth',
    term: 'max_depth',
    definition:
      'Número máximo de níveis da árvore. O botão de complexidade: pouco = underfit, muito = overfit.',
    lessonSlug: 'arvores-decisao',
    phase: 1,
  },
  {
    id: 'poda',
    term: 'Poda',
    definition:
      'Limitar a complexidade da árvore (max_depth, min_samples_leaf) para reduzir overfitting e generalizar melhor.',
    lessonSlug: 'arvores-decisao',
    phase: 1,
  },
  {
    id: 'ensemble',
    term: 'Ensemble',
    definition:
      'Combinar vários modelos (Random Forest = muitas árvores) para reduzir variância e melhorar a generalização.',
    lessonSlug: 'arvores-decisao',
    phase: 1,
  },
  {
    id: 'knn',
    term: 'KNN (K-Nearest Neighbors)',
    definition:
      'Classificador lazy: memoriza tudo e classifica pelo voto dos K vizinhos mais próximos. K pequeno memoriza; K grande generaliza demais.',
    lessonSlug: 'knn-svm',
    phase: 1,
  },
  {
    id: 'lazy-learner',
    term: 'Lazy learner',
    definition:
      'Modelo que não aprende no treino — guarda os dados e calcula na predição (KNN). Treino instantâneo, predição lenta.',
    lessonSlug: 'knn-svm',
    phase: 1,
  },
  {
    id: 'svm',
    term: 'SVM (Support Vector Machine)',
    definition:
      'Modelo que acha o hiperplano de margem máxima entre as classes, usando apenas os support vectors.',
    lessonSlug: 'knn-svm',
    phase: 1,
  },
  {
    id: 'kernel',
    term: 'Kernel (trick)',
    definition:
      'Projetar os dados em dimensão maior sem calcular explicitamente, permitindo fronteiras curvas (rbf) em dados não linearmente separáveis.',
    lessonSlug: 'knn-svm',
    phase: 1,
  },
  {
    id: 'support-vectors',
    term: 'Support vectors',
    definition:
      'Os pontos na fronteira de decisão — os únicos que definem o hiperplano do SVM. O resto dos dados é redundante.',
    lessonSlug: 'knn-svm',
    phase: 1,
  },
  {
    id: 'kmeans',
    term: 'K-Means',
    definition:
      'Algoritmo de clustering: agrupa dados em K clusters pela proximidade aos centroides, sem rótulos. Aprendizado não supervisionado.',
    lessonSlug: 'kmeans-clustering',
    phase: 1,
  },
  {
    id: 'inercia',
    term: 'Inércia',
    definition:
      'Soma das distâncias² de cada ponto ao seu centroide. Menor = clusters mais apertados. O K-Means a minimiza.',
    lessonSlug: 'kmeans-clustering',
    phase: 1,
  },
  {
    id: 'cotovelo',
    term: 'Método do cotovelo',
    definition:
      'Rodar K-Means com K crescente e achar o "joelho" da curva de inércia — onde adicionar clusters deixa de valer a pena.',
    lessonSlug: 'kmeans-clustering',
    phase: 1,
  },
  {
    id: 'normalizacao',
    term: 'Normalização / StandardScaler',
    definition:
      'Reescalar features para média 0 e desvio 1. Essencial antes de modelos baseados em distância (K-Means, KNN, SVM).',
    lessonSlug: 'kmeans-clustering',
    phase: 1,
  },
  {
    id: 'nao-supervisionado',
    term: 'Aprendizado não supervisionado',
    definition:
      'Descobre estrutura nos dados sem rótulos (clusters, anomalias). O "y" não existe — o padrão emerge dos dados.',
    lessonSlug: 'kmeans-clustering',
    phase: 1,
  },

  // ── Fase 02 ────────────────────────────────────────────────
  {
    id: 'tokenizacao',
    term: 'Tokenização',
    definition:
      'Quebrar texto em tokens (palavras/subpalavras) para transformar em números. Modelos não entendem palavras, entendem tokens.',
    lessonSlug: 'nlp-tokenizacao',
    phase: 2,
  },
  {
    id: 'stop-words',
    term: 'Stop words',
    definition:
      'Palavras comuns sem valor informativo (o, de, e). Pegadinha: o padrão do sklearn é inglês — palavras pt-BR não são removidas.',
    lessonSlug: 'nlp-tokenizacao',
    phase: 2,
  },
  {
    id: 'tfidf',
    term: 'TF-IDF',
    definition:
      'Pondera a contagem de palavras pela raridade: palavra rara (telhado) vale mais que comum (no). Contagem simples supervaloriza comuns.',
    lessonSlug: 'tfidf-embeddings',
    phase: 2,
  },
  {
    id: 'embedding',
    term: 'Embedding',
    definition:
      'Vetor numérico que captura significado. Palavras similares ficam próximas — relações semânticas viram aritmética vetorial (rei - homem + mulher ≈ rainha).',
    lessonSlug: 'tfidf-embeddings',
    phase: 2,
  },
  {
    id: 'similaridade-cosseno',
    term: 'Similaridade de cosseno',
    definition:
      'Mede o ângulo entre dois vetores (0 a 1). Usada para comparar embeddings — ignora magnitude, foca na direção.',
    lessonSlug: 'tfidf-embeddings',
    phase: 2,
  },
  {
    id: 'algoritmo-genetico',
    term: 'Algoritmo Genético (GA)',
    definition:
      'Otimização inspirada na evolução: populações, seleção (torneio/roleta), crossover e mutação. Acha soluções sem derivada.',
    lessonSlug: 'introducao-geneticos',
    phase: 2,
  },
  {
    id: 'fitness',
    term: 'Fitness',
    definition:
      'A função objetivo do GA — mede o quão boa é uma solução. O algoritmo evolui para maximizá-la.',
    lessonSlug: 'introducao-geneticos',
    phase: 2,
  },
  {
    id: 'elitismo',
    term: 'Elitismo',
    definition:
      'Preservar o(s) melhor(es) indivíduo(s) intacto(s) entre gerações — garante que a melhor solução nunca se perde.',
    lessonSlug: 'introducao-geneticos',
    phase: 2,
  },

  // ── Fase 03 ────────────────────────────────────────────────
  {
    id: 'chain-of-thought',
    term: 'Chain of Thought (CoT)',
    definition:
      'Pedir ao modelo que raciocine passo a passo antes da resposta final. Reduz erros em problemas multi-passo, mas custa mais tokens.',
    lessonSlug: 'chain-of-thought',
    phase: 3,
  },
  {
    id: 'prompt',
    term: 'Prompt',
    definition:
      'A instrução dada ao modelo. Os 4 pilares: papel, contexto, tarefa específica e formato da saída.',
    lessonSlug: 'guia-prompts',
    phase: 3,
  },
  {
    id: 'prompt-injection',
    term: 'Prompt injection',
    definition:
      'Input do usuário com instruções que sequestram o prompt do sistema. Mitigar: tratar input como dado, nunca como instrução.',
    lessonSlug: 'guia-prompts',
    phase: 3,
  },
  {
    id: 'langchain',
    term: 'LangChain',
    definition:
      'Framework para compor aplicações LLM: chains com |, agents com ferramentas, memória e RAG. O "React" do mundo LLM.',
    lessonSlug: 'langchain-agents',
    phase: 3,
  },
  {
    id: 'chain',
    term: 'Chain',
    definition:
      'Encadeamento de etapas (prompt → modelo → parser). Cada etapa recebe a saída da anterior — composição de funções.',
    lessonSlug: 'langchain-agents',
    phase: 3,
  },
  {
    id: 'rag',
    term: 'RAG',
    definition:
      'Retrieval-Augmented Generation: buscar em dados próprios (vetores) e injetar no prompt. Usar quando a resposta depende de dados privados/atualizados.',
    lessonSlug: 'langchain-agents',
    phase: 3,
  },

  // ── Fase 04 ────────────────────────────────────────────────
  {
    id: 'whisper',
    term: 'Whisper',
    definition:
      'Modelo de transcrição de áudio da OpenAI — referência em speech-to-text, multilíngue.',
    lessonSlug: 'analise-video-audio',
    phase: 4,
  },
  {
    id: 'textract',
    term: 'Amazon Textract',
    definition:
      'Serviço AWS que extrai texto, tabelas e formulários de documentos. Diferente do OCR: entende ESTRUTURA (chave-valor, células).',
    lessonSlug: 'aws-textract',
    phase: 4,
  },
  {
    id: 'ocr',
    term: 'OCR',
    definition:
      'Optical Character Recognition — transforma imagem de texto em texto digital. O Textract vai além: preserva a estrutura.',
    lessonSlug: 'aws-textract',
    phase: 4,
  },

  // ── Fase 05 ────────────────────────────────────────────────
  {
    id: 'lgpd',
    term: 'LGPD',
    definition:
      'Lei Geral de Proteção de Dados (Brasil). Regula coleta e uso de dados pessoais; multas de até 2% do faturamento.',
    lessonSlug: 'lgpd-privacidade',
    phase: 5,
  },
  {
    id: 'minimizacao',
    term: 'Minimização de dados',
    definition:
      'Princípio LGPD: coletar o mínimo necessário. Menos dados = menos ataque, menos obrigações, menos responsabilidade.',
    lessonSlug: 'lgpd-privacidade',
    phase: 5,
  },
  {
    id: 'pseudonimizacao',
    term: 'Pseudonimização',
    definition:
      'Trocar dado pessoal por hash/ID opaco. NÃO é anonimização (pode ser revertida por ataque de dicionário).',
    lessonSlug: 'lgpd-privacidade',
    phase: 5,
  },
  {
    id: 'anomalia',
    term: 'Detecção de anomalias',
    definition:
      'Achar pontos que fogem do padrão (fraude, defeito, intrusão). Não supervisionado: o "normal" é aprendido dos dados.',
    lessonSlug: 'deteccao-anomalias',
    phase: 5,
  },
  {
    id: 'z-score',
    term: 'Z-score',
    definition:
      '(valor - média) / desvio. Mede o quão atípico é um ponto. Falha com poucos dados: a anomalia infla a própria média/desvio.',
    lessonSlug: 'deteccao-anomalias',
    phase: 5,
  },
  {
    id: 'isolation-forest',
    term: 'Isolation Forest',
    definition:
      'Detecta anomalias isolando pontos com cortes aleatórios — fáceis de isolar = anômalos. Não precisa de labels, funciona em alta dimensão.',
    lessonSlug: 'deteccao-anomalias',
    phase: 5,
  },
  {
    id: 'cognitive-services',
    term: 'Azure Cognitive Services',
    definition:
      'APIs prontas de IA da Microsoft (visão, fala, linguagem). Use para tarefas genéricas; treine modelo próprio para domínio específico ou dados sensíveis.',
    lessonSlug: 'azure-cognitive',
    phase: 5,
  },
  {
    id: 'api-vs-modelo',
    term: 'API pronta vs modelo próprio',
    definition:
      'Genérica + volume baixo → API. Domínio específico OU dados sensíveis → modelo próprio. Sensibilidade sobrepõe genericidade.',
    lessonSlug: 'azure-cognitive',
    phase: 5,
  },
]

/** Busca um termo pelo id. */
export function getGlossaryTerm(id: string): GlossaryTerm | null {
  return GLOSSARY_TERMS.find((t) => t.id === id) ?? null
}
