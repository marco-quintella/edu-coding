import { db } from '../lib/db'
import { courses, phases, lessons, quizQuestions, userProgress } from '../lib/db/schema'
import { reviews } from '../drizzle/review.schema'
import { userXp, userStreaks } from '../drizzle/gamification.schema'
import { certificates, profiles } from '../drizzle/profile.schema'

const COURSE = {
  slug: 'ia-para-devs',
  title: 'IA para Devs',
  description:
    'Machine Learning, NLP, LLMs, GenAI e Cloud na prática. 5 fases, certificado por fase, tudo em português.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos Básicos',
      lessons: [
        {
          slug: 'regressao-linear',
          title: 'Regressão Linear',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Por que o erro quadrático é preferido ao erro absoluto na regressão?',
              options: [
                { id: 'a', text: 'Porque é mais rápido de calcular' },
                { id: 'b', text: 'Porque penaliza erros grandes muito mais, e a função é convexa (mínimo único)' },
                { id: 'c', text: 'Porque ignora outliers completamente' },
                { id: 'd', text: 'Porque não precisa dos dados reais' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Se os dados seguem y = 3x + 5 sem ruído, o que o modelo deve encontrar?',
              options: [
                { id: 'a', text: 'slope=3, intercept=5' },
                { id: 'b', text: 'slope=5, intercept=3' },
                { id: 'c', text: 'slope=8, intercept=0' },
                { id: 'd', text: 'slope=1, intercept=1' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Um R² de 0.85 no conjunto de teste significa que:',
              options: [
                { id: 'a', text: 'O modelo erra em 85% das previsões' },
                { id: 'b', text: 'O modelo explica 85% da variância dos dados de teste' },
                { id: 'c', text: 'O modelo está superajustado (overfit)' },
                { id: 'd', text: 'O slope é 0.85' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Para que serve dividir os dados em treino e teste?',
              options: [
                { id: 'a', text: 'Para treinar o modelo duas vezes' },
                { id: 'b', text: 'Para avaliar se o modelo generaliza para dados que ele nunca viu' },
                { id: 'c', text: 'Para aumentar o tamanho do dataset' },
                { id: 'd', text: 'Para reduzir o tempo de treinamento' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'No método dos mínimos quadrados (OLS), o intercept b é calculado para que a reta:',
              options: [
                { id: 'a', text: 'Passe pelo centro de massa dos dados (x̄, ȳ)' },
                { id: 'b', text: 'Passe pela origem (0, 0)' },
                { id: 'c', text: 'Seja sempre crescente' },
                { id: 'd', text: 'Tenha o menor slope possível' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'arvores-decisao',
          title: 'Árvores de Decisão',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Em uma árvore de decisão, o que cada nó interno representa?',
              options: [
                { id: 'a', text: 'Um valor de saída' },
                { id: 'b', text: 'Um teste sobre um atributo' },
                { id: 'c', text: 'Um modelo estatístico' },
                { id: 'd', text: 'Uma instância de dados' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que o algoritmo usa para decidir qual teste fazer em cada nó?',
              options: [
                { id: 'a', text: 'A ordem em que os atributos aparecem nos dados' },
                { id: 'b', text: 'O teste que mais reduz a impureza (Gini/entropia) do grupo' },
                { id: 'c', text: 'O atributo com maior valor numérico' },
                { id: 'd', text: 'Um teste aleatório a cada nó' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Por que aumentar max_depth costuma piorar a acurácia de teste?',
              options: [
                { id: 'a', text: 'Porque a árvore fica mais lenta para prever' },
                { id: 'b', text: 'Porque a árvore memoriza o ruído do treino (overfitting)' },
                { id: 'c', text: 'Porque o Gini fica negativo' },
                { id: 'd', text: 'Porque as folhas ficam grandes demais' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual parâmetro REDUZ o overfitting (faz a árvore menor)?',
              options: [
                { id: 'a', text: 'Aumentar max_depth' },
                { id: 'b', text: 'Aumentar min_samples_leaf' },
                { id: 'c', text: 'Remover min_samples_split' },
                { id: 'd', text: 'Aumentar o número de classes' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Por que Random Forest costuma ser melhor que uma árvore única?',
              options: [
                { id: 'a', text: 'Porque treina mais rápido' },
                { id: 'b', text: 'Porque combina várias árvores, reduzindo instabilidade e overfitting' },
                { id: 'c', text: 'Porque usa apenas um atributo por árvore' },
                { id: 'd', text: 'Porque não precisa de treino/teste' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'knn-svm',
          title: 'KNN e SVM',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'No KNN, como classificamos um novo ponto?',
              options: [
                { id: 'a', text: 'Pela média de todos os pontos' },
                { id: 'b', text: 'Pela classe majoritária dos K vizinhos mais próximos' },
                { id: 'c', text: 'Por uma reta de regressão' },
                { id: 'd', text: 'Pela distância máxima' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Por que o KNN é chamado de "lazy learner"?',
              options: [
                { id: 'a', text: 'Porque demora muito para treinar' },
                { id: 'b', text: 'Porque não constrói um modelo no treino — guarda os dados e decide na hora de prever' },
                { id: 'c', text: 'Porque só funciona com dados pequenos' },
                { id: 'd', text: 'Porque ignora os rótulos' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Por que K=1 sempre tem 100% de acurácia no treino?',
              options: [
                { id: 'a', text: 'Porque o modelo é perfeito' },
                { id: 'b', text: 'Porque cada ponto de treino é o vizinho mais próximo dele mesmo (distância 0)' },
                { id: 'c', text: 'Porque K=1 usa todos os dados' },
                { id: 'd', text: 'Porque o KNN não tem overfitting' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que o kernel trick faz no SVM?',
              options: [
                { id: 'a', text: 'Acrescenta ruído aos dados para evitar overfitting' },
                { id: 'b', text: 'Mapeia os dados para um espaço de maior dimensão onde são linearmente separáveis, sem calcular o mapeamento' },
                { id: 'c', text: 'Remove os support vectors para acelerar' },
                { id: 'd', text: 'Converte classificação em regressão' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que são os support vectors?',
              options: [
                { id: 'a', text: 'Todos os pontos do dataset de treino' },
                { id: 'b', text: 'Apenas os pontos mais próximos do hiperplano, que definem a margem' },
                { id: 'c', text: 'Os pontos que o modelo classificou errado' },
                { id: 'd', text: 'Os K vizinhos mais próximos do ponto novo' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'kmeans-clustering',
          title: 'K-Means Clustering',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O K-Means é um algoritmo de qual tipo?',
              options: [
                { id: 'a', text: 'Supervisionado' },
                { id: 'b', text: 'Não supervisionado (clustering)' },
                { id: 'c', text: 'Semi-supervisionado' },
                { id: 'd', text: 'Por reforço' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que o parâmetro K representa no K-Means?',
              options: [
                { id: 'a', text: 'O número de dimensões' },
                { id: 'b', text: 'O número de clusters' },
                { id: 'c', text: 'O número de iterações' },
                { id: 'd', text: 'O tamanho do dataset' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que é a inércia no K-Means?',
              options: [
                { id: 'a', text: 'A soma das distâncias ao quadrado de cada ponto até seu centroide' },
                { id: 'b', text: 'O número de iterações até convergir' },
                { id: 'c', text: 'A velocidade de treinamento' },
                { id: 'd', text: 'O tamanho do maior cluster' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'No método do cotovelo, onde fica o K ideal?',
              options: [
                { id: 'a', text: 'No K com maior inércia' },
                { id: 'b', text: 'No joelho da curva — onde a queda de inércia fica suave' },
                { id: 'c', text: 'Sempre em K = N (um cluster por ponto)' },
                { id: 'd', text: 'No K igual ao número de features' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Por que normalizar os dados antes do K-Means?',
              options: [
                { id: 'a', text: 'Para acelerar o treinamento' },
                { id: 'b', text: 'Porque a distância euclidiana é dominada por features de escala maior' },
                { id: 'c', text: 'Para criar mais clusters' },
                { id: 'd', text: 'Porque o K-Means não aceita números negativos' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'capstone-fase01',
          title: 'Capstone: pipeline completo de ML',
          checkpoint: 'ml-base',
          minutes: 45,
          quiz: [
            {
              question: 'Por que fazer EDA antes de treinar o modelo?',
              options: [
                { id: 'a', text: 'Para saber se os dados têm relação antes de perder tempo modelando' },
                { id: 'b', text: 'Porque é obrigatório no sklearn' },
                { id: 'c', text: 'Para aumentar o dataset' },
                { id: 'd', text: 'Para escolher a cor do gráfico' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual é a métrica honesta de generalização?',
              options: [
                { id: 'a', text: 'R² no treino' },
                { id: 'b', text: 'R² no conjunto de TESTE (que o modelo nunca viu)' },
                { id: 'c', text: 'O número de features' },
                { id: 'd', text: 'A velocidade do treino' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Por que a regressão linear venceu a árvore no capstone?',
              options: [
                { id: 'a', text: 'Porque árvores são sempre ruins' },
                { id: 'b', text: 'Porque a relação é linear — a árvore aproxima a reta por degraus e perde precisão' },
                { id: 'c', text: 'Porque a árvore era pequena demais' },
                { id: 'd', text: 'Porque o dataset era pequeno' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que significa uma correlação de 0.995 entre área e preço?',
              options: [
                { id: 'a', text: 'Não há relação' },
                { id: 'b', text: 'Relação quase perfeita — área explica quase toda a variação do preço' },
                { id: 'c', text: 'O modelo vai errar 99.5%' },
                { id: 'd', text: 'Os dados estão vazios' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O pipeline completo de ML em produção é:',
              options: [
                { id: 'a', text: 'Treinar → prever → pronto' },
                { id: 'b', text: 'EDA → treinar → avaliar → comparar → prever' },
                { id: 'c', text: 'Coletar → apagar → repetir' },
                { id: 'd', text: 'Só usar o modelo mais famoso' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
      ],
    },
    {
      slug: '02-evolucao-ia',
      title: 'Fase 02 — Evolução da IA: GenAI, Cloud ML e LLMs',
      lessons: [
        {
          slug: 'nlp-tokenizacao',
          title: 'NLP — Tokenização e Texto',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que é tokenização em NLP?',
              options: [
                { id: 'a', text: 'Dividir texto em unidades menores (tokens)' },
                { id: 'b', text: 'Traduzir texto para outra língua' },
                { id: 'c', text: 'Gerar texto novo' },
                { id: 'd', text: 'Classificar sentimentos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual nível de tokenização os LLMs modernos (GPT, Claude) usam?',
              options: [
                { id: 'a', text: 'Palavras inteiras' },
                { id: 'b', text: 'Subpalavras (BPE)' },
                { id: 'c', text: 'Apenas caracteres' },
                { id: 'd', text: 'Frases completas' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que faz o stemming?',
              options: [
                { id: 'a', text: 'Remove stop words' },
                { id: 'b', text: 'Reduz palavras à sua raiz' },
                { id: 'c', text: 'Adiciona sufixos' },
                { id: 'd', text: 'Traduz palavras' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual é a pegadinha do stop_words="english" do sklearn?',
              options: [
                { id: 'a', text: 'Remove palavras demais do texto' },
                { id: 'b', text: 'Só remove palavras INGLESAS — "o", "de" e "para" continuam no vocabulário' },
                { id: 'c', text: 'Não funciona com CountVectorizer' },
                { id: 'd', text: 'Remove todas as palavras do documento' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Por que LLMs modernos NÃO removem stop words?',
              options: [
                { id: 'a', text: 'Porque o transformer usa o contexto completo — e o "de" pode ser essencial ("copo DE água")' },
                { id: 'b', text: 'Porque stop words não existem em inglês' },
                { id: 'c', text: 'Porque remove-las deixaria o modelo mais lento' },
                { id: 'd', text: 'Porque o vocabulário ficaria pequeno demais' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'tfidf-embeddings',
          title: 'TF-IDF e Word Embeddings',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que TF-IDF mede?',
              options: [
                { id: 'a', text: 'A importância de uma palavra em um documento' },
                { id: 'b', text: 'A frequência de visitas a um site' },
                { id: 'c', text: 'O tamanho de um texto' },
                { id: 'd', text: 'A velocidade de um algoritmo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Se uma palavra aparece em TODOS os documentos, seu TF-IDF tende a:',
              options: [
                { id: 'a', text: 'Ser muito alto (é muito frequente)' },
                { id: 'b', text: 'Ser ~0 (o IDF = log(N/N) = 0 — ela não distingue nada)' },
                { id: 'c', text: 'Ser sempre 1' },
                { id: 'd', text: 'Ser negativo' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que é um word embedding?',
              options: [
                { id: 'a', text: 'Uma lista de sinônimos da palavra' },
                { id: 'b', text: 'Um vetor denso que captura a semântica — palavras similares ficam próximas no espaço' },
                { id: 'c', text: 'Uma contagem de quantas vezes a palavra aparece' },
                { id: 'd', text: 'Um algoritmo de compressão de texto' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que significa a analogia "rei - homem + mulher ≈ rainha"?',
              options: [
                { id: 'a', text: 'Embeddings são inúteis para semântica' },
                { id: 'b', text: 'A diferença entre realeza masculina e feminina é a mesma entre homem e mulher — e isso vira geometria vetorial' },
                { id: 'c', text: 'O modelo só entende palavras em inglês' },
                { id: 'd', text: 'Palavras similares ficam longe no espaço vetorial' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual a diferença entre embeddings de LLMs e TF-IDF?',
              options: [
                { id: 'a', text: 'TF-IDF é contextual, embeddings são estáticos' },
                { id: 'b', text: 'Embeddings de LLMs são contextuais (o vetor muda conforme a frase); TF-IDF é estático (mesmo vetor sempre)' },
                { id: 'c', text: 'São a mesma coisa com nomes diferentes' },
                { id: 'd', text: 'TF-IDF é denso, embeddings são esparsos' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'introducao-geneticos',
          title: 'Introdução aos Algoritmos Genéticos',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Qual operador genético combina dois indivíduos?',
              options: [
                { id: 'a', text: 'Seleção' },
                { id: 'b', text: 'Cruzamento (crossover)' },
                { id: 'c', text: 'Mutação' },
                { id: 'd', text: 'Avaliação' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que é o fitness de um indivíduo no GA?',
              options: [
                { id: 'a', text: 'O tamanho do cromossomo' },
                { id: 'b', text: 'Quão boa é a solução, avaliada pela função objetivo' },
                { id: 'c', text: 'A probabilidade de mutação' },
                { id: 'd', text: 'O número de gerações' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Para que serve o elitismo?',
              options: [
                { id: 'a', text: 'Para preservar o melhor indivíduo — a evolução nunca regride' },
                { id: 'b', text: 'Para eliminar os piores indivíduos' },
                { id: 'c', text: 'Para aumentar a taxa de mutação' },
                { id: 'd', text: 'Para reduzir o tamanho da população' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece com mutação MUITO alta?',
              options: [
                { id: 'a', text: 'Converge mais rápido para o ótimo' },
                { id: 'b', text: 'Nunca converge — fica pulando entre soluções (exploração demais)' },
                { id: 'c', text: 'O fitness fica negativo' },
                { id: 'd', text: 'A população desaparece' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual a principal limitação dos GAs?',
              options: [
                { id: 'a', text: 'Só funcionam com dados numéricos' },
                { id: 'b', text: 'Sem garantia de ótimo global + custo computacional alto (muitas avaliações de fitness)' },
                { id: 'c', text: 'Não aceitam restrições' },
                { id: 'd', text: 'Precisam de labels' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
      ],
    },
    {
      slug: '03-openai-rag',
      title: 'Fase 03 — OpenAI, Fine-tuning e LangChain',
      lessons: [
        {
          slug: 'chain-of-thought',
          title: 'Chain of Thought com LLMs',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'O que é Chain of Thought (CoT)?',
              options: [
                { id: 'a', text: 'Técnica que faz o modelo raciocinar passo a passo' },
                { id: 'b', text: 'Uma rede neural convolucional' },
                { id: 'c', text: 'Um tipo de árvore de decisão' },
                { id: 'd', text: 'Um algoritmo de clustering' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que o CoT melhora a precisão em problemas de lógica/matemática?',
              options: [
                { id: 'a', text: 'Porque aumenta o tamanho do modelo' },
                { id: 'b', text: 'Porque o raciocínio intermediário ancora a resposta final em passos verificáveis' },
                { id: 'c', text: 'Porque remove tokens desnecessários' },
                { id: 'd', text: 'Porque usa mais dados de treino' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que é zero-shot CoT?',
              options: [
                { id: 'a', text: 'Basta adicionar "Vamos pensar passo a passo" ao prompt' },
                { id: 'b', text: 'Treinar o modelo do zero' },
                { id: 'c', text: 'Remover todos os exemplos do prompt' },
                { id: 'd', text: 'Usar um modelo sem parâmetros' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual o CUSTO do CoT?',
              options: [
                { id: 'a', text: 'Nenhum — é grátis' },
                { id: 'b', text: 'Mais tokens (custo) e mais latência' },
                { id: 'c', text: 'Menos tokens que resposta direta' },
                { id: 'd', text: 'Requer GPU dedicada' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Em qual tarefa CoT NÃO ajuda?',
              options: [
                { id: 'a', text: 'Aritmética multi-etapa' },
                { id: 'b', text: 'Análise de código' },
                { id: 'c', text: 'Tarefas de memória (fatos simples) — a resposta direta é melhor' },
                { id: 'd', text: 'Raciocínio lógico' },
              ],
              correctOptionId: 'c',
            },
          ],
        },
        {
          slug: 'guia-prompts',
          title: 'Guia de Prompts',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'O que é um "prompt" bem estruturado?',
              options: [
                { id: 'a', text: 'Instrução clara e específica para o modelo' },
                { id: 'b', text: 'Código Python otimizado' },
                { id: 'c', text: 'Um dataset balanceado' },
                { id: 'd', text: 'Uma consulta SQL' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quais são os 4 pilares de um bom prompt?',
              options: [
                { id: 'a', text: 'Instrução, contexto, exemplos, formato de saída' },
                { id: 'b', text: 'Título, autor, data, resumo' },
                { id: 'c', text: 'Palavras-chave, tags, links, imagens' },
                { id: 'd', text: 'Modelo, tokens, temperatura, top_p' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que definir o formato de saída (ex: JSON) é importante?',
              options: [
                { id: 'a', text: 'Para o modelo responder mais rápido' },
                { id: 'b', text: 'Para o pipeline ser previsível — o código consegue parsear a resposta' },
                { id: 'c', text: 'Para reduzir o custo de tokens' },
                { id: 'd', text: 'Não é importante' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que é few-shot prompting?',
              options: [
                { id: 'a', text: 'Mostrar 2-3 exemplos do formato desejado antes da pergunta real' },
                { id: 'b', text: 'Usar poucos tokens no prompt' },
                { id: 'c', text: 'Treinar o modelo com poucos dados' },
                { id: 'd', text: 'Pedir respostas curtas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a regra de ouro contra prompt injection?',
              options: [
                { id: 'a', text: 'Nunca usar input do usuário' },
                { id: 'b', text: 'Nunca concatenar input do usuário sem sanitizar/delimitar' },
                { id: 'c', text: 'Sempre usar letras maiúsculas no prompt' },
                { id: 'd', text: 'Usar modelo maior' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'langchain-agents',
          title: 'LangChain na Prática',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que é um Agent no LangChain?',
              options: [
                { id: 'a', text: 'Um componente que decide qual ferramenta usar' },
                { id: 'b', text: 'Um tipo de banco de dados' },
                { id: 'c', text: 'Um modelo de visão' },
                { id: 'd', text: 'Uma função de ativação' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o operador pipe (|) faz numa chain?',
              options: [
                { id: 'a', text: 'Cada etapa recebe a saída da anterior (prompt | model | parser)' },
                { id: 'b', text: 'Executa as etapas em paralelo' },
                { id: 'c', text: 'Concatena strings' },
                { id: 'd', text: 'Alterna entre dois modelos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a diferença entre chain e agent?',
              options: [
                { id: 'a', text: 'São a mesma coisa' },
                { id: 'b', text: 'Chain tem fluxo fixo (você escreve os passos); agent decide o fluxo em tempo real' },
                { id: 'c', text: 'Chain usa 2 modelos; agent usa 1' },
                { id: 'd', text: 'Chain é mais lenta' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que é RAG?',
              options: [
                { id: 'a', text: 'Um tipo de rede neural' },
                { id: 'b', text: 'Recuperação + geração — buscar dados relevantes e passar ao modelo' },
                { id: 'c', text: 'Um framework de testes' },
                { id: 'd', text: 'Um formato de prompt' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual o principal pitfall de chains longas?',
              options: [
                { id: 'a', text: 'Elas são mais precisas' },
                { id: 'b', text: 'Multiplicam custo/latência — cada etapa é uma chamada' },
                { id: 'c', text: 'Elas não funcionam com JSON' },
                { id: 'd', text: 'Elas exigem GPU' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
      ],
    },
    {
      slug: '04-analise-dados',
      title: 'Fase 04 — Análise de Vídeo, Áudio e Texto',
      lessons: [
        {
          slug: 'analise-video-audio',
          title: 'Análise de Vídeo, Áudio e Texto',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Para o que serve a transcrição automática de áudio?',
              options: [
                { id: 'a', text: 'Converter fala em texto' },
                { id: 'b', text: 'Gerar imagens' },
                { id: 'c', text: 'Treinar redes neurais' },
                { id: 'd', text: 'Detectar objetos em vídeo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual o fluxo típico de um pipeline multimodal (vídeo)?',
              options: [
                { id: 'a', text: 'Vídeo → extrair frames + áudio → visão + transcrição → resultado JSON combinado' },
                { id: 'b', text: 'Vídeo → texto → imagem' },
                { id: 'c', text: 'Áudio → vídeo → texto' },
                { id: 'd', text: 'Frames → áudio → vídeo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que o modelo de sentimentos acerta reviews sem nunca ter visto as palavras exatas?',
              options: [
                { id: 'a', text: 'Porque decorou todos os reviews' },
                { id: 'b', text: 'Porque a combinação de tokens (via TF-IDF) define a classe, não a palavra exata' },
                { id: 'c', text: 'Porque usa tradução automática' },
                { id: 'd', text: 'Porque ignora o vocabulário' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual modelo é referência para transcrição de áudio?',
              options: [
                { id: 'a', text: 'Whisper (OpenAI)' },
                { id: 'b', text: 'YOLO' },
                { id: 'c', text: 'K-Means' },
                { id: 'd', text: 'Random Forest' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é diarização de áudio?',
              options: [
                { id: 'a', text: 'Identificar quem falou e quando' },
                { id: 'b', text: 'Reduzir o tamanho do arquivo' },
                { id: 'c', text: 'Aumentar o volume' },
                { id: 'd', text: 'Converter para outro formato' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'aws-textract',
          title: 'AWS Textract — Extração de Texto',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'Para que serve o AWS Textract?',
              options: [
                { id: 'a', text: 'Extrair texto de documentos digitalizados' },
                { id: 'b', text: 'Treinar modelos de ML' },
                { id: 'c', text: 'Armazenar arquivos' },
                { id: 'd', text: 'Enviar emails' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que diferencia o Textract do OCR tradicional?',
              options: [
                { id: 'a', text: 'É mais rápido' },
                { id: 'b', text: 'Entende a ESTRUTURA — tabelas com células, formulários com chave-valor, hierarquia' },
                { id: 'c', text: 'Funciona offline' },
                { id: 'd', text: 'Não precisa de imagens' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Por que estrutura importa mais que texto bruto?',
              options: [
                { id: 'a', text: 'Porque ocupa menos espaço' },
                { id: 'b', text: 'Porque JSON estruturado é consultável e validável — o código acessa dados["nome"] direto' },
                { id: 'c', text: 'Porque é mais bonito' },
                { id: 'd', text: 'Porque não precisa de parser' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que o Textract + Comprehend juntos fazem?',
              options: [
                { id: 'a', text: 'Textract extrai estrutura; Comprehend extrai significado (entidades, sentimentos)' },
                { id: 'b', text: 'Textract entende; Comprehend extrai' },
                { id: 'c', text: 'São a mesma coisa' },
                { id: 'd', text: 'Comprehend gera imagens' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual o cuidado de segurança com documentos no Textract?',
              options: [
                { id: 'a', text: 'Nenhum — documentos não são sensíveis' },
                { id: 'b', text: 'Documentos têm dados pessoais (LGPD/GDPR): criptografar, minimizar e nunca logar o conteúdo' },
                { id: 'c', text: 'Só usar em texto em inglês' },
                { id: 'd', text: 'Apagar o Textract após o uso' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
      ],
    },
    {
      slug: '05-privacidade-seguranca',
      title: 'Fase 05 — Privacidade, Segurança e Aplicações Práticas',
      lessons: [
        {
          slug: 'lgpd-privacidade',
          title: 'Privacidade e LGPD em IA',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'O que a LGPD protege?',
              options: [
                { id: 'a', text: 'Dados pessoais de cidadãos brasileiros' },
                { id: 'b', text: 'Apenas dados empresariais' },
                { id: 'c', text: 'Código fonte' },
                { id: 'd', text: 'Dados públicos governamentais' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é o princípio da NECESSIDADE (minimização)?',
              options: [
                { id: 'a', text: 'Coletar o mínimo de dados necessário para a tarefa' },
                { id: 'b', text: 'Coletar o máximo de dados possível' },
                { id: 'c', text: 'Comprimir os dados para economizar espaço' },
                { id: 'd', text: 'Apagar o banco de dados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar IDs opacos (hash) em logs em vez do email?',
              options: [
                { id: 'a', text: 'Para ocupar menos espaço' },
                { id: 'b', text: 'Para o log não conter dados pessoais legíveis — se vazar, o email não vaza' },
                { id: 'c', text: 'Para acelerar as queries' },
                { id: 'd', text: 'Porque emails não podem ser armazenados' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Pseudonimização (hash) é o mesmo que anonimização?',
              options: [
                { id: 'a', text: 'Sim, são idênticas' },
                { id: 'b', text: 'Não — hash pode ser reversível por ataque de dicionário; anonimização real é irreversível' },
                { id: 'c', text: 'Não — anonimização é mais rápida' },
                { id: 'd', text: 'Sim, ambas usam criptografia' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Em quanto tempo um incidente de dados deve ser notificado à ANPD?',
              options: [
                { id: 'a', text: '72 horas' },
                { id: 'b', text: '7 dias' },
                { id: 'c', text: '30 dias' },
                { id: 'd', text: 'Não precisa notificar' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'deteccao-anomalias',
          title: 'Detecção de Anomalias',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'Para que serve a detecção de anomalias?',
              options: [
                { id: 'a', text: 'Identificar pontos que fogem do padrão' },
                { id: 'b', text: 'Criar clusters' },
                { id: 'c', text: 'Reduzir dimensionalidade' },
                { id: 'd', text: 'Traduzir textos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que o z-score falha com poucos dados?',
              options: [
                { id: 'a', text: 'Porque é muito lento' },
                { id: 'b', text: 'Porque a própria anomalia infla a média e o desvio, mascarando o z-score dela' },
                { id: 'c', text: 'Porque só funciona com texto' },
                { id: 'd', text: 'Porque precisa de labels' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que o Isolation Forest faz?',
              options: [
                { id: 'a', text: 'Cria clusters esféricos' },
                { id: 'b', text: 'Isola pontos com cortes aleatórios — pontos fáceis de isolar são anomalias' },
                { id: 'c', text: 'Treina uma rede neural' },
                { id: 'd', text: 'Classifica com K vizinhos' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que o parâmetro "contamination" controla?',
              options: [
                { id: 'a', text: 'A fração de dados esperada como anômala (trade-off de falsos positivos)' },
                { id: 'b', text: 'A velocidade do treino' },
                { id: 'c', text: 'O número de features' },
                { id: 'd', text: 'O tamanho do dataset' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é concept drift?',
              options: [
                { id: 'a', text: 'O modelo esquece o que aprendeu' },
                { id: 'b', text: 'O "normal" muda com o tempo — o padrão de hoje pode ser anomalia amanhã' },
                { id: 'c', text: 'Uma técnica de vizinhos' },
                { id: 'd', text: 'Um tipo de kernel' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'azure-cognitive',
          title: 'Azure Cognitive Services',
          checkpoint: 'ml-base',
          minutes: 30,
          quiz: [
            {
              question: 'O que são os Azure Cognitive Services?',
              options: [
                { id: 'a', text: 'APIs prontas de visão, fala e linguagem' },
                { id: 'b', text: 'Máquinas virtuais' },
                { id: 'c', text: 'Bancos de dados' },
                { id: 'd', text: 'Servidores web' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual serviço para transcrever áudio em texto?',
              options: [
                { id: 'a', text: 'Computer Vision' },
                { id: 'b', text: 'Speech-to-Text' },
                { id: 'c', text: 'Text Analytics' },
                { id: 'd', text: 'Anomaly Detector' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Quando usar API pronta vs treinar modelo próprio?',
              options: [
                { id: 'a', text: 'Sempre API pronta — é mais barato' },
                { id: 'b', text: 'Tarefa genérica → API; domínio específico ou dados sensíveis → modelo próprio' },
                { id: 'c', text: 'Sempre treinar modelo próprio — é mais preciso' },
                { id: 'd', text: 'Depende do clima' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Por que prontuários médicos NÃO devem ir para uma API cloud genérica?',
              options: [
                { id: 'a', text: 'Porque são dados sensíveis (LGPD) — a regra de sensibilidade sobrepõe a de genericidade' },
                { id: 'b', text: 'Porque a API não entende português' },
                { id: 'c', text: 'Porque são grandes demais' },
                { id: 'd', text: 'Porque a API é cara' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é Cognitive Search?',
              options: [
                { id: 'a', text: 'Busca semântica/híbrida sobre dados próprios — ideal para RAG corporativo' },
                { id: 'b', text: 'Um mecanismo de cache' },
                { id: 'c', text: 'Um antivírus' },
                { id: 'd', text: 'Um firewall' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
      ],
    },
  ],
}


/** Catálogo completo — adicione novos cursos aqui. */
const PYTHON_COURSE = {
  slug: 'python-para-devs',
  title: 'Python para Devs',
  description:
    'Do zero ao código de produção: fundamentos, listas, dicionários, funções e projetos reais. Base para dados, IA e automação.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Python',
      lessons: [
        {
          slug: 'python-fundamentos',
          title: 'Fundamentos: variáveis, condicionais e loops',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Qual o resultado de 10 / 3 em Python?',
              options: [
                { id: 'a', text: '3' },
                { id: 'b', text: '3.333... (float)' },
                { id: 'c', text: '3.0' },
                { id: 'd', text: 'Erro de sintaxe' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que range(5) gera?',
              options: [
                { id: 'a', text: '1, 2, 3, 4, 5' },
                { id: 'b', text: '0, 1, 2, 3, 4' },
                { id: 'c', text: '0, 1, 2, 3, 4, 5' },
                { id: 'd', text: '5' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que imprime: print(10 == "10")?',
              options: [
                { id: 'a', text: 'True' },
                { id: 'b', text: 'False' },
                { id: 'c', text: 'Erro' },
                { id: 'd', text: '10' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual a saída de 10 // 3?',
              options: [
                { id: 'a', text: '3.333' },
                { id: 'b', text: '3.0' },
                { id: 'c', text: '3' },
                { id: 'd', text: '1' },
              ],
              correctOptionId: 'c',
            },
            {
              question: 'O que acontece se esquecer o incremento num while?',
              options: [
                { id: 'a', text: 'Nada' },
                { id: 'b', text: 'Loop infinito' },
                { id: 'c', text: 'Erro de sintaxe' },
                { id: 'd', text: 'O while termina sozinho' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
      ],
    },
  ],
}

const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE]

async function seed() {
  console.log('Limpando tabelas...')
  // Ordem importa por causa das FKs
  await db.delete(userProgress)
  await db.delete(quizQuestions)
  await db.delete(reviews)
  await db.delete(userXp)
  await db.delete(userStreaks)
  await db.delete(certificates)
  await db.delete(profiles)
  await db.delete(lessons)
  await db.delete(phases)
  await db.delete(courses)

  for (const COURSE of COURSES) {
    console.log(`Inserindo curso: ${COURSE.slug}`)
  const [course] = await db
    .insert(courses)
    .values({
      slug: COURSE.slug,
      title: COURSE.title,
      description: COURSE.description,
    })
    .returning()

  for (const [pi, phase] of COURSE.phases.entries()) {
    console.log(`Inserindo fase ${pi + 1}: ${phase.title}`)
    const [p] = await db
      .insert(phases)
      .values({
        courseId: course.id,
        slug: phase.slug,
        title: phase.title,
        position: pi + 1,
      })
      .returning()

    for (const [li, lesson] of phase.lessons.entries()) {
      console.log(`  Inserindo lição ${li + 1}: ${lesson.title}`)
      const [l] = await db
        .insert(lessons)
        .values({
          phaseId: p.id,
          slug: lesson.slug,
          title: lesson.title,
          mdxPath: `content/lessons/${COURSE.slug}/${phase.slug}/${lesson.slug}.mdx`,
          checkpointId: lesson.checkpoint,
          estimatedMinutes: lesson.minutes,
          position: li + 1,
        })
        .returning()

      for (const [qi, q] of lesson.quiz.entries()) {
        await db.insert(quizQuestions).values({
          lessonId: l.id,
          question: q.question,
          options: q.options,
          correctOptionId: q.correctOptionId,
          position: qi + 1,
        })
      }
    }
  }

    console.log(`Curso: ${course.slug} (${course.id})`)
  }

  console.log('Seed completo.')
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
