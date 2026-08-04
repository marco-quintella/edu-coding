/**
 * Cards de revisão espaçada — conceitos-chave de cada fase.
 *
 * Cada card: pergunta (frente) + resposta (verso) + fase.
 * A revisão usa SM-2 simplificado (lib/gamification/review.ts).
 */

export interface ReviewCard {
  id: string
  phase: number
  question: string
  answer: string
}

export const REVIEW_CARDS: ReviewCard[] = [
  // ── Fase 01 — Fundamentos ──────────────────────────────────
  {
    id: 'f1-overfitting',
    phase: 1,
    question: 'O que é overfitting e como detectá-lo?',
    answer:
      'Quando o modelo decora os dados de treino em vez de aprender o padrão. Detecta-se comparando treino vs teste: treino alto e teste baixo = overfitting.',
  },
  {
    id: 'f1-train-test',
    phase: 1,
    question: 'Por que separar os dados em treino e teste?',
    answer:
      'Para medir a generalização: o modelo nunca deve ver o teste durante o treino. Se só avaliamos no treino, medimos memória, não aprendizado.',
  },
  {
    id: 'f1-regressao',
    phase: 1,
    question: 'O que a regressão linear encontra e o que ela minimiza?',
    answer:
      'Encontra a reta y = mx + b que melhor representa os dados, minimizando a soma dos erros quadráticos (OLS). O quadrado penaliza erros grandes.',
  },
  {
    id: 'f1-r2',
    phase: 1,
    question: 'O que significa R² = 0.85?',
    answer:
      'O modelo explica 85% da variância dos dados. Quanto mais perto de 1, melhor o ajuste (mas cuidado: R² alto no treino pode ser overfitting).',
  },
  {
    id: 'f1-outlier',
    phase: 1,
    question: 'Por que um outlier é perigoso para a regressão linear?',
    answer:
      'O erro quadrático amplifica distâncias grandes — um ponto estranho puxa a reta inteira em direção a ele, distorcendo o slope e o intercept.',
  },
  {
    id: 'f1-arvore',
    phase: 1,
    question: 'O que max_depth controla em uma árvore de decisão?',
    answer:
      'O número máximo de níveis de perguntas. Pouco = generaliza (mas pode underfit); muito = decora o treino (overfitting). É o botão de complexidade.',
  },
  {
    id: 'f1-impureza',
    phase: 1,
    question: 'O que é impureza (Gini) e para que serve?',
    answer:
      'Mede o quão misturadas estão as classes em um nó. A árvore escolhe a pergunta que mais reduz a impureza — separar bem as classes.',
  },
  {
    id: 'f1-poda',
    phase: 1,
    question: 'O que é podar uma árvore e por que ajuda?',
    answer:
      'Limitar a complexidade (max_depth, min_samples_leaf) para reduzir o overfitting. Uma árvore podada generaliza melhor em dados novos.',
  },
  {
    id: 'f1-knn',
    phase: 1,
    question: 'Por que K=1 no KNN sempre acerta o treino?',
    answer:
      'Porque cada ponto de treino é seu próprio vizinho mais próximo — o modelo "memoriza" tudo. Mas generaliza mal em dados novos.',
  },
  {
    id: 'f1-kernel',
    phase: 1,
    question: 'O que o "kernel trick" do SVM faz?',
    answer:
      'Projeta os dados em uma dimensão maior sem calculá-la explicitamente, permitindo achar fronteiras curvas (rbf) em dados não linearmente separáveis.',
  },
  {
    id: 'f1-support-vectors',
    phase: 1,
    question: 'O que são support vectors?',
    answer:
      'Os pontos na fronteira de decisão — os únicos que importam para definir o hiperplano. O SVM descarta o resto como redundante.',
  },
  {
    id: 'f1-kmeans',
    phase: 1,
    question: 'O que o método do cotovelo faz?',
    answer:
      'Roda K-Means com K crescente e olha a inércia (soma das distâncias²). O K ideal é o "joelho" — onde a queda de inércia fica suave.',
  },
  {
    id: 'f1-normalizar',
    phase: 1,
    question: 'Por que normalizar antes do K-Means (e KNN/SVM)?',
    answer:
      'A distância euclidiana é dominada por features de escala maior. Sem normalizar, a feature em reais manda no cálculo e os clusters ficam vazios em 1 dimensão.',
  },
  {
    id: 'f1-nao-supervisionado',
    phase: 1,
    question: 'Diferença entre aprendizado supervisionado e não supervisionado?',
    answer:
      'Supervisionado tem rótulos (regressão, classificação). Não supervisionado descobre estrutura sozinho (K-Means: clusters naturais sem resposta certa).',
  },

  // ── Fase 02 — Evolução da IA ───────────────────────────────
  {
    id: 'f2-tokenizacao',
    phase: 2,
    question: 'O que é tokenização?',
    answer:
      'Quebrar texto em unidades menores (tokens — palavras ou subpalavras) para transformar em números. Modelos não entendem palavras, entendem tokens.',
  },
  {
    id: 'f2-stopwords',
    phase: 2,
    question: 'O que são stop words e qual a pegadinha em pt-BR?',
    answer:
      'Palavras comuns sem valor informativo (o, de, e). Pegadinha: o padrão do sklearn é inglês — "o" não é stop word do inglês e entra no vocabulário.',
  },
  {
    id: 'f2-tfidf',
    phase: 2,
    question: 'Por que TF-IDF é melhor que só contar palavras?',
    answer:
      'Porque pondera pela raridade: uma palavra rara (telhado) vale mais que uma comum (no). Contagem simples supervaloriza palavras que aparecem em tudo.',
  },
  {
    id: 'f2-embedding',
    phase: 2,
    question: 'O que é um embedding e por que "rei - homem + mulher ≈ rainha"?',
    answer:
      'Embedding é um vetor numérico que captura significado. Palavras similares ficam próximas no espaço vetorial — as relações semânticas viram aritmética vetorial.',
  },
  {
    id: 'f2-ga',
    phase: 2,
    question: 'Quais são as 3 operações de um algoritmo genético?',
    answer:
      'Seleção (escolher os melhores — torneio/roleta), crossover (combinar dois pais) e mutação (alterar genes aleatoriamente). Elitismo preserva o melhor.',
  },
  {
    id: 'f2-exploracao',
    phase: 2,
    question: 'O que é o dilema exploração × exploração em GA?',
    answer:
      'Exploração = manter diversidade (mutação) para não estagnar; exploração = focar nos melhores (seleção). O balanceamento decide se o GA acha o ótimo global.',
  },

  // ── Fase 03 — OpenAI/LangChain ─────────────────────────────
  {
    id: 'f3-cot',
    phase: 3,
    question: 'O que é Chain of Thought e por que funciona?',
    answer:
      'Pedir ao modelo que raciocine passo a passo antes da resposta. Divide o problema em etapas, reduzindo erros em problemas multi-passo — mas custa mais tokens.',
  },
  {
    id: 'f3-prompt',
    phase: 3,
    question: 'Quais os 4 pilares de um bom prompt?',
    answer:
      'Papel (quem o modelo é), contexto (dados relevantes), tarefa específica (o que fazer) e formato da saída (estrutura esperada).',
  },
  {
    id: 'f3-injection',
    phase: 3,
    question: 'O que é prompt injection?',
    answer:
      'Quando o input do usuário contém instruções que sequestram o prompt do sistema. Mitigar: tratar input como dado, nunca como instrução.',
  },
  {
    id: 'f3-chain',
    phase: 3,
    question: 'O que é uma chain no LangChain?',
    answer:
      'Encadear etapas com o operador |: prompt → modelo → parser → formatação. Cada etapa recebe a saída da anterior — composição de funções.',
  },
  {
    id: 'f3-rag',
    phase: 3,
    question: 'O que é RAG e quando usar?',
    answer:
      'Retrieval-Augmented Generation: buscar em dados próprios (vetores) e injetar no prompt. Usar quando a resposta depende de dados privados/atualizados.',
  },

  // ── Fase 04 — Multimídia ───────────────────────────────────
  {
    id: 'f4-transcricao',
    phase: 4,
    question: 'Qual o fluxo típico de análise de áudio com IA?',
    answer:
      'Áudio → transcrição (Whisper) → texto → análise (sentimento, entidades). O texto é a porta de entrada para o resto do pipeline.',
  },
  {
    id: 'f4-textract',
    phase: 4,
    question: 'O que diferencia o Textract do OCR tradicional?',
    answer:
      'O OCR devolve texto achatado; o Textract entende ESTRUTURA — tabelas com células, formulários com chave-valor. Isso permite automatizar notas fiscais.',
  },

  // ── Fase 05 — Privacidade ──────────────────────────────────
  {
    id: 'f5-minimizacao',
    phase: 5,
    question: 'O que é o princípio da minimização de dados (LGPD)?',
    answer:
      'Coletar o mínimo de dados necessário para a tarefa. Menos dados = menos superfície de ataque, menos obrigações e menos responsabilidade.',
  },
  {
    id: 'f5-pseudonimizacao',
    phase: 5,
    question: 'Pseudonimização é o mesmo que anonimização?',
    answer:
      'Não. Hash (pseudonimização) pode ser revertido por ataque de dicionário; anonimização real é irreversível. Para dados sensíveis: anonimizar ou não coletar.',
  },
  {
    id: 'f5-zscore',
    phase: 5,
    question: 'Por que o z-score falha com poucos dados?',
    answer:
      'A própria anomalia infla a média e o desvio, mascarando o próprio z-score dela. Com amostras pequenas, métodos estatísticos simples quebram.',
  },
  {
    id: 'f5-isolation-forest',
    phase: 5,
    question: 'Como o Isolation Forest detecta anomalias?',
    answer:
      'Isola pontos com cortes aleatórios — pontos fáceis de isolar (poucos cortes) são anomalias. Não precisa de labels e funciona em alta dimensão.',
  },
  {
    id: 'f5-api-vs-proprio',
    phase: 5,
    question: 'Quando usar API pronta vs treinar modelo próprio?',
    answer:
      'Tarefa genérica + volume baixo → API pronta. Domínio específico OU dados sensíveis que não podem sair → modelo próprio. Sensibilidade sobrepõe genericidade.',
  },
]

/** Busca um card pelo id. */
export function getReviewCard(id: string): ReviewCard | null {
  return REVIEW_CARDS.find((c) => c.id === id) ?? null
}
