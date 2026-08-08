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
        {
          slug: 'python-listas-dicts',
          title: 'Listas e Dicionários',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que frutas[1:3] retorna em ["maça","banana","uva","kiwi"]?',
              options: [
                { id: 'a', text: '["maça","banana"]' },
                { id: 'b', text: '["banana","uva"]' },
                { id: 'c', text: '["banana","uva","kiwi"]' },
                { id: 'd', text: '["uva","kiwi"]' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que acontece com usuario["inexistente"] num dicionário?',
              options: [
                { id: 'a', text: 'Retorna None' },
                { id: 'b', text: 'Lança KeyError' },
                { id: 'c', text: 'Cria a chave vazia' },
                { id: 'd', text: 'Retorna 0' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Para que serve freq.get(palavra, 0)?',
              options: [
                { id: 'a', text: 'Deleta a palavra' },
                { id: 'b', text: 'Retorna o valor, ou 0 se a chave não existe' },
                { id: 'c', text: 'Ordena o dicionário' },
                { id: 'd', text: 'Conta os caracteres' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual a forma de adicionar uma chave num dicionário?',
              options: [
                { id: 'a', text: 'dicionario.add("chave")' },
                { id: 'b', text: 'dicionario["chave"] = valor' },
                { id: 'c', text: 'dicionario.push("chave")' },
                { id: 'd', text: 'insert(dicionario, "chave")' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que faz a soma sum(v["valor"] for v in vendas)?',
              options: [
                { id: 'a', text: 'Conta as vendas' },
                { id: 'b', text: 'Soma o campo valor de cada venda' },
                { id: 'c', text: 'Ordena as vendas' },
                { id: 'd', text: 'Filtra vendas altas' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'python-funcoes',
          title: 'Funções e Composição',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que uma função retorna se não tem return?',
              options: [
                { id: 'a', text: '0' },
                { id: 'b', text: 'None' },
                { id: 'c', text: 'Erro' },
                { id: 'd', text: 'A função inteira' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que é uma função pura?',
              options: [
                { id: 'a', text: 'Função sem parâmetros' },
                { id: 'b', text: 'Mesma entrada → mesma saída, sem efeitos colaterais' },
                { id: 'c', text: 'Função que usa variáveis globais' },
                { id: 'd', text: 'Função que imprime' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Para que serve um parâmetro default (def f(x, y=10))?',
              options: [
                { id: 'a', text: 'Torna y obrigatório' },
                { id: 'b', text: 'Torna y opcional — usa 10 se não passar' },
                { id: 'c', text: 'Impede passar y' },
                { id: 'd', text: 'Deixa a função mais rápida' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que significa "compor funções"?',
              options: [
                { id: 'a', text: 'Copiar funções' },
                { id: 'b', text: 'Uma função chamar outra para construir resultado maior' },
                { id: 'c', text: 'Juntar funções em um arquivo' },
                { id: 'd', text: 'Renomear funções' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual a principal vantagem de funções puras?',
              options: [
                { id: 'a', text: 'São mais rápidas' },
                { id: 'b', text: 'São testáveis e previsíveis — mesma entrada, mesma saída' },
                { id: 'c', text: 'Não precisam de parâmetros' },
                { id: 'd', text: 'Usam menos memória' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
      ],
    },
  ],
}

/** Catálogo completo — adicione novos cursos aqui. */
const SQL_COURSE = {
  slug: 'sql-bancos-dados',
  title: 'SQL & Bancos de Dados',
  description:
    'Consultas, agregações e modelagem com SQLite na prática. A habilidade mais pedida em vagas de backend e dados.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Consultas Essenciais',
      lessons: [
        {
          slug: 'sql-select',
          title: 'SELECT, WHERE e ORDER BY',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Qual cláusula filtra linhas no SQL?',
              options: [
                { id: 'a', text: 'SELECT' },
                { id: 'b', text: 'WHERE' },
                { id: 'c', text: 'ORDER BY' },
                { id: 'd', text: 'GROUP BY' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que ORDER BY preco DESC faz?',
              options: [
                { id: 'a', text: 'Ordena do menor para o maior' },
                { id: 'b', text: 'Ordena do maior para o menor' },
                { id: 'c', text: 'Filtra preços altos' },
                { id: 'd', text: 'Remove duplicados' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Como filtrar preços >= 100 no SQL?',
              options: [
                { id: 'a', text: 'WHERE preco >= 100' },
                { id: 'b', text: 'FILTER preco 100' },
                { id: 'c', text: 'SELECT preco > 100' },
                { id: 'd', text: 'WHERE preco MIN 100' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual é a ordem correta das cláusulas?',
              options: [
                { id: 'a', text: 'SELECT → WHERE → ORDER BY' },
                { id: 'b', text: 'WHERE → SELECT → ORDER BY' },
                { id: 'c', text: 'ORDER BY → SELECT → WHERE' },
                { id: 'd', text: 'SELECT → ORDER BY → WHERE' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que SELECT nome FROM clientes retorna?',
              options: [
                { id: 'a', text: 'A tabela inteira' },
                { id: 'b', text: 'Só a coluna nome' },
                { id: 'c', text: 'O nome do banco' },
                { id: 'd', text: 'Nada' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'sql-agregacoes',
          title: 'Agregações: GROUP BY e HAVING',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que COUNT(*) faz?',
              options: [
                { id: 'a', text: 'Conta as linhas do grupo' },
                { id: 'b', text: 'Soma os valores' },
                { id: 'c', text: 'Acha a média' },
                { id: 'd', text: 'Ordena os dados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a diferença entre WHERE e HAVING?',
              options: [
                { id: 'a', text: 'WHERE filtra antes de agrupar; HAVING filtra grupos' },
                { id: 'b', text: 'São idênticos' },
                { id: 'c', text: 'HAVING filtra linhas; WHERE filtra grupos' },
                { id: 'd', text: 'WHERE só funciona com JOIN' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que SUM(valor) retorna?',
              options: [
                { id: 'a', text: 'A média dos valores' },
                { id: 'b', text: 'A soma dos valores' },
                { id: 'c', text: 'O maior valor' },
                { id: 'd', text: 'A contagem de valores' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'GROUP BY vendedor agrupa por quê?',
              options: [
                { id: 'a', text: 'Por cada valor único da coluna vendedor' },
                { id: 'b', text: 'Por ordem alfabética' },
                { id: 'c', text: 'Pelo total de vendas' },
                { id: 'd', text: 'Não agrupa nada' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como achar vendedores com total > 500?',
              options: [
                { id: 'a', text: 'WHERE SUM(valor) > 500' },
                { id: 'b', text: 'HAVING SUM(valor) > 500' },
                { id: 'c', text: 'GROUP BY SUM(valor) > 500' },
                { id: 'd', text: 'ORDER BY total > 500' },
              ],
              correctOptionId: 'b',
            },
          ],
        },
        {
          slug: 'sql-joins',
          title: 'JOINs e Modelagem',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que um INNER JOIN retorna?',
              options: [
                { id: 'a', text: 'Todas as linhas das duas tabelas' },
                { id: 'b', text: 'Só as linhas que têm correspondência nas duas' },
                { id: 'c', text: 'Só as linhas sem correspondência' },
                { id: 'd', text: 'Uma tabela combinada aleatória' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'LEFT JOIN retorna todas as linhas da tabela...',
              options: [
                { id: 'a', text: 'Da direita, mesmo sem match' },
                { id: 'b', text: 'Da esquerda, mesmo sem match (NULL na direita)' },
                { id: 'c', text: 'Das duas, sempre' },
                { id: 'd', text: 'De nenhuma' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Para que serve a chave primária (PRIMARY KEY)?',
              options: [
                { id: 'a', text: 'Identifica cada linha unicamente' },
                { id: 'b', text: 'Acelera o SELECT' },
                { id: 'c', text: 'Ordena a tabela' },
                { id: 'd', text: 'Cria índices automáticos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como achar clientes SEM pedidos?',
              options: [
                { id: 'a', text: 'LEFT JOIN + WHERE p.id IS NULL' },
                { id: 'b', text: 'INNER JOIN + WHERE p.id > 0' },
                { id: 'c', text: 'SELECT sem JOIN' },
                { id: 'd', text: 'DELETE FROM pedidos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'ON c.id = p.cliente_id faz o quê?',
              options: [
                { id: 'a', text: 'Define como as tabelas se relacionam' },
                { id: 'b', text: 'Cria uma coluna nova' },
                { id: 'c', text: 'Ordena os resultados' },
                { id: 'd', text: 'Conta as linhas' },
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
const GIT_COURSE = {
  slug: 'git-github',
  title: 'Git & GitHub na Prática',
  description:
    'Versionamento do jeito que as empresas usam: commits, branches, merges e remotos. O sandbox roda git de verdade.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos do Git',
      lessons: [
        {
          slug: 'git-commits',
          title: 'Commits: o coração do versionamento',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o comando git init faz?',
              options: [
                { id: 'a', text: 'Inicia um repositório git na pasta' },
                { id: 'b', text: 'Cria o GitHub' },
                { id: 'c', text: 'Faz o primeiro commit' },
                { id: 'd', text: 'Deleta o projeto' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a sequência para salvar mudanças?',
              options: [
                { id: 'a', text: 'add → commit' },
                { id: 'b', text: 'commit → add' },
                { id: 'c', text: 'push → add' },
                { id: 'd', text: 'init → push' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que git status mostra?',
              options: [
                { id: 'a', text: 'O estado do working tree (modificados/não rastreados)' },
                { id: 'b', text: 'O histórico de commits' },
                { id: 'c', text: 'Os arquivos deletados' },
                { id: 'd', text: 'A velocidade do disco' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Um arquivo aparece como "M" no status. O que significa?',
              options: [
                { id: 'a', text: 'Modificado (mudou desde o último commit)' },
                { id: 'b', text: 'Movido para outra pasta' },
                { id: 'c', text: 'Mesclado com outro branch' },
                { id: 'd', text: 'Muito grande' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que um commit precisa de uma mensagem?',
              options: [
                { id: 'a', text: 'Para documentar O QUE mudou e POR QUÊ' },
                { id: 'b', text: 'Para o GitHub aceitar' },
                { id: 'c', text: 'É opcional, não precisa' },
                { id: 'd', text: 'Para gerar o hash' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'git-branches',
          title: 'Branches e Merges',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Para que serve um branch?',
              options: [
                { id: 'a', text: 'Trabalhar numa feature sem quebrar a main' },
                { id: 'b', text: 'Apagar arquivos' },
                { id: 'c', text: 'Acelerar o commit' },
                { id: 'd', text: 'Criar usuários' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que git checkout -b feature faz?',
              options: [
                { id: 'a', text: 'Cria a branch feature e muda para ela' },
                { id: 'b', text: 'Deleta a branch feature' },
                { id: 'c', text: 'Faz merge da feature' },
                { id: 'd', text: 'Renomeia para feature' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o merge faz?',
              options: [
                { id: 'a', text: 'Junta as mudanças de uma branch na atual' },
                { id: 'b', text: 'Separa as mudanças' },
                { id: 'c', text: 'Apaga a branch' },
                { id: 'd', text: 'Cria um novo repositório' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como ver em qual branch você está?',
              options: [
                { id: 'a', text: 'git branch (o * marca a atual)' },
                { id: 'b', text: 'git commit' },
                { id: 'c', text: 'git merge' },
                { id: 'd', text: 'git status --branch' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é um conflito de merge?',
              options: [
                { id: 'a', text: 'Duas branches mudaram o mesmo trecho de forma incompatível' },
                { id: 'b', text: 'O disco está cheio' },
                { id: 'c', text: 'O git não sabe qual mensagem usar' },
                { id: 'd', text: 'Erro de rede no GitHub' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'git-remoto',
          title: 'Remotos: GitHub e Push/Pull',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que git clone faz?',
              options: [
                { id: 'a', text: 'Copia um repositório remoto para a máquina' },
                { id: 'b', text: 'Cria um repositório vazio' },
                { id: 'c', text: 'Apaga o repositório' },
                { id: 'd', text: 'Faz backup do disco' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que git push faz?',
              options: [
                { id: 'a', text: 'Envia seus commits para o remoto' },
                { id: 'b', text: 'Baixa os commits do remoto' },
                { id: 'c', text: 'Cria um commit' },
                { id: 'd', text: 'Inicia o repositório' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que git pull faz?',
              options: [
                { id: 'a', text: 'Baixa os commits do remoto e mescla' },
                { id: 'b', text: 'Envia para o remoto' },
                { id: 'c', text: 'Deleta o remoto' },
                { id: 'd', text: 'Lista os remotos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é um repositório bare?',
              options: [
                { id: 'a', text: 'Um repo sem working tree — só o histórico (serve de "servidor")' },
                { id: 'b', text: 'Um repo sem commits' },
                { id: 'c', text: 'Um repo sem branches' },
                { id: 'd', text: 'Um repo corrompido' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'git remote -v mostra...',
              options: [
                { id: 'a', text: 'Os repositórios remotos configurados' },
                { id: 'b', text: 'As versões do git' },
                { id: 'c', text: 'Os arquivos remotos' },
                { id: 'd', text: 'Os usuários online' },
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
const EDA_COURSE = {
  slug: 'estruturas-dados',
  title: 'Estruturas de Dados & Algoritmos',
  description:
    'O que cai em entrevista: busca binária, hash tables, ordenação e complexidade — com exercícios verificados em Python.',
  phases: [
    {
      slug: '01-busca',
      title: 'Fase 01 — Busca e Complexidade',
      lessons: [
        {
          slug: 'eda-busca',
          title: 'Busca linear vs binária (O(log n))',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Qual a complexidade da busca binária?',
              options: [
                { id: 'a', text: 'O(n)' },
                { id: 'b', text: 'O(log n)' },
                { id: 'c', text: 'O(n²)' },
                { id: 'd', text: 'O(1)' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual requisito da busca binária?',
              options: [
                { id: 'a', text: 'Lista ordenada' },
                { id: 'b', text: 'Lista sem duplicados' },
                { id: 'c', text: 'Lista pequena' },
                { id: 'd', text: 'Lista de inteiros' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quantos passos a busca binária usa para achar um item em 1.000.000 itens?',
              options: [
                { id: 'a', text: '1.000.000' },
                { id: 'b', text: '~20' },
                { id: 'c', text: '~100' },
                { id: 'd', text: '~500.000' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'A busca linear em N itens faz quantas operações no pior caso?',
              options: [
                { id: 'a', text: 'N' },
                { id: 'b', text: 'log N' },
                { id: 'c', text: 'N²' },
                { id: 'd', text: '1' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o meio = (esq + dir) // 2 faz?',
              options: [
                { id: 'a', text: 'Acha o índice do meio (divisão inteira)' },
                { id: 'b', text: 'Soma os extremos' },
                { id: 'c', text: 'Retorna o menor' },
                { id: 'd', text: 'Faz busca recursiva' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'eda-hash',
          title: 'Hash tables: o dict como superpoder',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Qual a complexidade de busca num dict (hash table)?',
              options: [
                { id: 'a', text: 'O(n)' },
                { id: 'b', text: 'O(1) médio' },
                { id: 'c', text: 'O(n²)' },
                { id: 'd', text: 'O(log n)' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'O que o padrão freq.get(palavra, 0) + 1 faz?',
              options: [
                { id: 'a', text: 'Conta ocorrências: valor atual (ou 0) + 1' },
                { id: 'b', text: 'Deleta a palavra' },
                { id: 'c', text: 'Ordena o dict' },
                { id: 'd', text: 'Duplica a chave' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que o Two-Sum com dict é O(n) em vez de O(n²)?',
              options: [
                { id: 'a', text: 'Cada número é processado 1x e a busca do complemento é O(1)' },
                { id: 'b', text: 'O dict é mais rápido que a lista' },
                { id: 'c', text: 'Não precisa percorrer a lista' },
                { id: 'd', text: 'A lista é ordenada' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que max(freq, key=freq.get) retorna?',
              options: [
                { id: 'a', text: 'A chave com maior valor' },
                { id: 'b', text: 'O maior valor' },
                { id: 'c', text: 'A maior chave' },
                { id: 'd', text: 'O tamanho do dict' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual estrutura usar para checar "já vi este elemento" em O(1)?',
              options: [
                { id: 'a', text: 'dict/set (hash)' },
                { id: 'b', text: 'lista' },
                { id: 'c', text: 'string' },
                { id: 'd', text: 'tuple' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'eda-ordenacao',
          title: 'Ordenação e o poder do sorted()',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Qual a complexidade do sorted() do Python?',
              options: [
                { id: 'a', text: 'O(n²)' },
                { id: 'b', text: 'O(n log n)' },
                { id: 'c', text: 'O(n)' },
                { id: 'd', text: 'O(1)' },
              ],
              correctOptionId: 'b',
            },
            {
              question: 'Qual a complexidade do bubble sort no pior caso?',
              options: [
                { id: 'a', text: 'O(n)' },
                { id: 'b', text: 'O(n log n)' },
                { id: 'c', text: 'O(n²)' },
                { id: 'd', text: 'O(log n)' },
              ],
              correctOptionId: 'c',
            },
            {
              question: 'Como ordenar do maior para o menor com sorted()?',
              options: [
                { id: 'a', text: 'sorted(dados, reverse=True)' },
                { id: 'b', text: 'sorted(dados, desc=True)' },
                { id: 'c', text: 'sorted(dados, invert=True)' },
                { id: 'd', text: 'sorted(-dados)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como ordenar strings por tamanho?',
              options: [
                { id: 'a', text: 'sorted(lista, key=len)' },
                { id: 'b', text: 'sorted(lista, key=sorted)' },
                { id: 'c', text: 'sorted(lista, size=True)' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que o bubble sort tem a otimização "trocou"?',
              options: [
                { id: 'a', text: 'Para parar cedo se a lista já está ordenada' },
                { id: 'b', text: 'Para ordenar em paralelo' },
                { id: 'c', text: 'Para contar as trocas' },
                { id: 'd', text: 'É obrigatório no Python' },
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
const PANDAS_COURSE = {
  slug: 'analise-dados-pandas',
  title: 'Análise de Dados com pandas',
  description:
    'DataFrames, filtros, groupby e limpeza — a ferramenta #1 de quem trabalha com dados. pandas roda no sandbox de verdade.',
  phases: [
    {
      slug: '01-dataframes',
      title: 'Fase 01 — DataFrames e Agrupamentos',
      lessons: [
        {
          slug: 'pandas-dataframes',
          title: 'DataFrames: sua primeira tabela',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que é um DataFrame do pandas?',
              options: [
                { id: 'a', text: 'Uma tabela 2D com linhas e colunas nomeadas' },
                { id: 'b', text: 'Um dicionário Python' },
                { id: 'c', text: 'Uma lista de listas' },
                { id: 'd', text: 'Um arquivo CSV' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como acessar a coluna "preco" de um DataFrame df?',
              options: [
                { id: 'a', text: 'df["preco"]' },
                { id: 'b', text: 'df.get(0)' },
                { id: 'c', text: 'df.rows[0]' },
                { id: 'd', text: 'df[0]' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que df["total"].sum() faz?',
              options: [
                { id: 'a', text: 'Soma todos os valores da coluna total' },
                { id: 'b', text: 'Conta as linhas' },
                { id: 'c', text: 'Acha a média' },
                { id: 'd', text: 'Ordena a coluna' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como criar uma coluna nova a partir de outras?',
              options: [
                { id: 'a', text: 'df["total"] = df["qtd"] * df["preco"]' },
                { id: 'b', text: 'df.add("total")' },
                { id: 'c', text: 'df["total"].create()' },
                { id: 'd', text: 'insert(df, "total")' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que df["nota"].mean() retorna?',
              options: [
                { id: 'a', text: 'A média das notas' },
                { id: 'b', text: 'A soma das notas' },
                { id: 'c', text: 'A maior nota' },
                { id: 'd', text: 'A contagem' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'pandas-filtros',
          title: 'Filtros e groupby',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Como filtrar linhas com nota >= 7?',
              options: [
                { id: 'a', text: 'df[df["nota"] >= 7]' },
                { id: 'b', text: 'df.filter("nota")' },
                { id: 'c', text: 'df.where >= 7' },
                { id: 'd', text: 'df["nota"].filter(7)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que df.groupby("cidade") faz?',
              options: [
                { id: 'a', text: 'Agrupa as linhas por cidade para agregar' },
                { id: 'b', text: 'Ordena por cidade' },
                { id: 'c', text: 'Remove cidades duplicadas' },
                { id: 'd', text: 'Filtra cidades' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a sintaxe para somar por grupo?',
              options: [
                { id: 'a', text: 'df.groupby("x")["valor"].sum()' },
                { id: 'b', text: 'df.sum("x")' },
                { id: 'c', text: 'df.groupby.sum()' },
                { id: 'd', text: 'sum(df, "x")' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que sort_values(ascending=False) faz?',
              options: [
                { id: 'a', text: 'Ordena do maior para o menor' },
                { id: 'b', text: 'Ordena do menor para o maior' },
                { id: 'c', text: 'Remove duplicados' },
                { id: 'd', text: 'Agrupa os valores' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que df["x"].agg(["sum", "mean"]) faz?',
              options: [
                { id: 'a', text: 'Aplica várias agregações de uma vez' },
                { id: 'b', text: 'Soma e depois multiplica' },
                { id: 'c', text: 'Cria duas colunas novas' },
                { id: 'd', text: 'Ordena duas vezes' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'pandas-limpeza',
          title: 'Transformações e dados faltantes',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Como detectar valores nulos numa coluna?',
              options: [
                { id: 'a', text: 'df["col"].isna()' },
                { id: 'b', text: 'df["col"].empty()' },
                { id: 'c', text: 'df["col"].zero()' },
                { id: 'd', text: 'df["col"].none()' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que df.fillna({"idade": 30}) faz?',
              options: [
                { id: 'a', text: 'Substitui os nulos de idade por 30' },
                { id: 'b', text: 'Deleta as linhas nulas' },
                { id: 'c', text: 'Cria uma coluna nova' },
                { id: 'd', text: 'Soma 30 à coluna' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como criar uma coluna com 10% de desconto?',
              options: [
                { id: 'a', text: 'df["promo"] = (df["preco"] * 0.9).round(0)' },
                { id: 'b', text: 'df["promo"] = df["preco"] - 10' },
                { id: 'c', text: 'df.add(0.9)' },
                { id: 'd', text: 'df["preco"].discount(10)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que idxmax() retorna?',
              options: [
                { id: 'a', text: 'O índice da linha com o maior valor' },
                { id: 'b', text: 'O maior valor' },
                { id: 'c', text: 'A média dos valores' },
                { id: 'd', text: 'O índice da primeira linha' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que pct_change() calcula?',
              options: [
                { id: 'a', text: 'Variação percentual entre linhas consecutivas' },
                { id: 'b', text: 'A mudança de tipo da coluna' },
                { id: 'c', text: 'O percentual de nulos' },
                { id: 'd', text: 'A contagem de mudanças' },
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
const TESTES_COURSE = {
  slug: 'testes-python',
  title: 'Testes com Python (pytest)',
  description:
    'assert, fixtures, parametrize e TDD — escreva código que não quebra. pytest roda no sandbox de verdade.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Testes',
      lessons: [
        {
          slug: 'testes-basicos',
          title: 'assert e funções testáveis',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o assert faz num teste?',
              options: [
                { id: 'a', text: 'Verifica se uma condição é verdadeira — falha se não for' },
                { id: 'b', text: 'Repete o teste' },
                { id: 'c', text: 'Ignora o teste' },
                { id: 'd', text: 'Ordena os testes' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que funções puras são fáceis de testar?',
              options: [
                { id: 'a', text: 'Mesma entrada → mesma saída, sem efeitos colaterais' },
                { id: 'b', text: 'Não precisam de assert' },
                { id: 'c', text: 'São mais rápidas' },
                { id: 'd', text: 'Não têm parâmetros' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que raise ValueError("msg") faz?',
              options: [
                { id: 'a', text: 'Lança uma exceção com mensagem' },
                { id: 'b', text: 'Imprime um erro e continua' },
                { id: 'c', text: 'Deleta o programa' },
                { id: 'd', text: 'Retorna False' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como testar que uma função lança erro?',
              options: [
                { id: 'a', text: 'try/except capturando a exceção esperada' },
                { id: 'b', text: 'Não é possível testar' },
                { id: 'c', text: 'assert True' },
                { id: 'd', text: 'com print' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que significa "edge case"?',
              options: [
                { id: 'a', text: 'Caso limite — ex: divisão por zero, lista vazia' },
                { id: 'b', text: 'Caso normal de uso' },
                { id: 'c', text: 'Um bug no código' },
                { id: 'd', text: 'Um teste quebrado' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'testes-avancados',
          title: 'Casos de teste e parametrize',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o @pytest.mark.parametrize faz?',
              options: [
                { id: 'a', text: 'Roda o mesmo teste com vários conjuntos de dados' },
                { id: 'b', text: 'Cria fixtures' },
                { id: 'c', text: 'Pula testes lentos' },
                { id: 'd', text: 'Ordena os testes' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve uma fixture?',
              options: [
                { id: 'a', text: 'Preparar dados/estado antes do teste (setup)' },
                { id: 'b', text: 'Substituir o assert' },
                { id: 'c', text: 'Rodar testes em paralelo' },
                { id: 'd', text: 'Medir performance' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que testar com dados temporários (tempfile)?',
              options: [
                { id: 'a', text: 'Isola o teste — não suja o sistema real' },
                { id: 'b', text: 'É mais rápido' },
                { id: 'c', text: 'É obrigatório' },
                { id: 'd', text: 'Evita escrever código' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a vantagem de parametrize sobre repetir o teste?',
              options: [
                { id: 'a', text: 'Um código, N casos — cada falha é identificada' },
                { id: 'b', text: 'Roda mais rápido' },
                { id: 'c', text: 'Não precisa de assert' },
                { id: 'd', text: 'Esconde erros' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que significa um teste "isolar"?',
              options: [
                { id: 'a', text: 'O teste não depende de estado externo (arquivos, rede, DB)' },
                { id: 'b', text: 'O teste roda sozinho na máquina' },
                { id: 'c', text: 'O teste não tem assert' },
                { id: 'd', text: 'O teste é secreto' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'testes-tdd',
          title: 'TDD: teste primeiro, código depois',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Qual o ciclo do TDD?',
              options: [
                { id: 'a', text: 'RED (teste falha) → GREEN (código passa) → REFACTOR' },
                { id: 'b', text: 'GREEN → RED → GREEN' },
                { id: 'c', text: 'Código → teste → deploy' },
                { id: 'd', text: 'REFACTOR → RED → GREEN' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que escrever o teste ANTES do código?',
              options: [
                { id: 'a', text: 'Define o comportamento esperado antes de implementar' },
                { id: 'b', text: 'É mais rápido' },
                { id: 'c', text: 'Evita o git' },
                { id: 'd', text: 'Não precisa de assert' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que significa "RED" no TDD?',
              options: [
                { id: 'a', text: 'O teste falha porque a função ainda não existe' },
                { id: 'b', text: 'O código tem erro de sintaxe' },
                { id: 'c', text: 'O teste está vermelho no relatório' },
                { id: 'd', text: 'O CI quebrou' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quando uma função deve lançar ValueError?',
              options: [
                { id: 'a', text: 'Quando recebe input inválido (ex: percentual > 100, lista vazia)' },
                { id: 'b', text: 'Nunca' },
                { id: 'c', text: 'Sempre que retorna 0' },
                { id: 'd', text: 'Quando o teste passa' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a maior vantagem de testes automatizados?',
              options: [
                { id: 'a', text: 'Refatorar sem medo — o teste avisa se quebrou algo' },
                { id: 'b', text: 'Deixar o código mais curto' },
                { id: 'c', text: 'Substituir a documentação' },
                { id: 'd', text: 'Rodar o app' },
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
const APIS_COURSE = {
  slug: 'apis-http',
  title: 'APIs & HTTP na Prática',
  description:
    'JSON, requisições e tratamento de erros HTTP — consuma APIs reais direto do sandbox. O fundamento de todo backend.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de APIs',
      lessons: [
        {
          slug: 'apis-json',
          title: 'JSON: a linguagem das APIs',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que é JSON?',
              options: [
                { id: 'a', text: 'Um formato de dados baseado em texto, universal entre sistemas' },
                { id: 'b', text: 'Um banco de dados' },
                { id: 'c', text: 'Uma linguagem de programação' },
                { id: 'd', text: 'Um protocolo de rede' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que json.loads(texto) faz?',
              options: [
                { id: 'a', text: 'Converte string JSON em objeto Python' },
                { id: 'b', text: 'Converte objeto em string JSON' },
                { id: 'c', text: 'Lê um arquivo' },
                { id: 'd', text: 'Envia para a rede' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que json.dumps(obj) faz?',
              options: [
                { id: 'a', text: 'Converte objeto Python em string JSON' },
                { id: 'b', text: 'Converte string em objeto' },
                { id: 'c', text: 'Valida o JSON' },
                { id: 'd', text: 'Formata o Python' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como Python representa o JSON {"ativo": true}?',
              options: [
                { id: 'a', text: '{"ativo": True} (True com T maiúsculo)' },
                { id: 'b', text: '{"ativo": true} (igual)' },
                { id: 'c', text: '{"ativo": 1}' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que uma "lista de dicionários" representa?',
              options: [
                { id: 'a', text: 'Uma lista de registros — a resposta típica de API' },
                { id: 'b', text: 'Um JSON inválido' },
                { id: 'c', text: 'Um dicionário aninhado' },
                { id: 'd', text: 'Um erro' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'apis-requests',
          title: 'Consumindo APIs com urllib',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que urlopen(url) faz?',
              options: [
                { id: 'a', text: 'Abre uma conexão HTTP e devolve a resposta' },
                { id: 'b', text: 'Abre um arquivo local' },
                { id: 'c', text: 'Cria um servidor' },
                { id: 'd', text: 'Valida a URL' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é uma API REST?',
              options: [
                { id: 'a', text: 'Um conjunto de URLs que devolvem dados (geralmente JSON)' },
                { id: 'b', text: 'Um tipo de banco' },
                { id: 'c', text: 'Uma linguagem' },
                { id: 'd', text: 'Um framework web' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o status 200 significa?',
              options: [
                { id: 'a', text: 'OK — requisição bem-sucedida' },
                { id: 'b', text: 'Erro do servidor' },
                { id: 'c', text: 'Não encontrado' },
                { id: 'd', text: 'Redirecionamento' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o status 404 significa?',
              options: [
                { id: 'a', text: 'Não encontrado — o recurso não existe' },
                { id: 'b', text: 'OK' },
                { id: 'c', text: 'Erro interno' },
                { id: 'd', text: 'Acesso negado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como ler o JSON da resposta?',
              options: [
                { id: 'a', text: 'json.loads(resp.read())' },
                { id: 'b', text: 'resp.json()' },
                { id: 'c', text: 'resp.read().parse()' },
                { id: 'd', text: 'json.dumps(resp)' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'apis-erros',
          title: 'Tratando erros HTTP',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que HTTPError captura?',
              options: [
                { id: 'a', text: 'Erros HTTP (404, 500...) com o código' },
                { id: 'b', text: 'Erros de sintaxe' },
                { id: 'c', text: 'Erros de banco' },
                { id: 'd', text: 'Erros de digitação' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o timeout no urlopen?',
              options: [
                { id: 'a', text: 'Limitar a espera — evita travar para sempre' },
                { id: 'b', text: 'Acelerar a requisição' },
                { id: 'c', text: 'Limitar o tamanho da resposta' },
                { id: 'd', text: 'Criptografar a conexão' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que um cliente resiliente faz com erro 500?',
              options: [
                { id: 'a', text: 'Trata e/ou tenta de novo — nunca quebra o programa' },
                { id: 'b', text: 'Desliga a máquina' },
                { id: 'c', text: 'Ignora silenciosamente' },
                { id: 'd', text: 'Apaga os dados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que URLError captura?',
              options: [
                { id: 'a', text: 'Falhas de rede (DNS, conexão recusada)' },
                { id: 'b', text: 'Erros de JSON' },
                { id: 'c', text: 'Erros de tipo' },
                { id: 'd', text: 'Erros de auth' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que tratar erros de API é essencial?',
              options: [
                { id: 'a', text: 'APIs externas falham — rede cai, servidor 500, rate limit' },
                { id: 'b', text: 'Porque o Python exige' },
                { id: 'c', text: 'Para o código ficar mais longo' },
                { id: 'd', text: 'Não é essencial' },
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
const AUTOMACAO_COURSE = {
  slug: 'automacao-python',
  title: 'Automação com Python',
  description:
    'Arquivos, pastas e comandos do sistema — automatize o trabalho repetitivo com os módulos padrão do Python.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Automação',
      lessons: [
        {
          slug: 'automacao-arquivos',
          title: 'Lendo e escrevendo arquivos',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que "with open(...) as f" faz?',
              options: [
                { id: 'a', text: 'Abre o arquivo e FECHA sozinho ao sair do bloco' },
                { id: 'b', text: 'Abre e mantém aberto para sempre' },
                { id: 'c', text: 'Cria um arquivo novo sempre' },
                { id: 'd', text: 'Apaga o arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual modo abre um arquivo para LEITURA?',
              options: [
                { id: 'a', text: '"r" (default)' },
                { id: 'b', text: '"w"' },
                { id: 'c', text: '"a"' },
                { id: 'd', text: '"x"' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que "w" faz com um arquivo existente?',
              options: [
                { id: 'a', text: 'Sobrescreve o conteúdo' },
                { id: 'b', text: 'Adiciona no fim' },
                { id: 'c', text: 'Lê e escreve' },
                { id: 'd', text: 'Falha' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como iterar as linhas de um arquivo?',
              options: [
                { id: 'a', text: 'for linha in f:' },
                { id: 'b', text: 'f.each()' },
                { id: 'c', text: 'while f.next()' },
                { id: 'd', text: 'f.map()' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que linha.split() faz?',
              options: [
                { id: 'a', text: 'Divide a linha em partes pelos espaços' },
                { id: 'b', text: 'Junta as linhas' },
                { id: 'c', text: 'Remove os espaços' },
                { id: 'd', text: 'Conta as palavras' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'automacao-pastas',
          title: 'Pastas com os e shutil',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que os.makedirs(path, exist_ok=True) faz?',
              options: [
                { id: 'a', text: 'Cria a pasta (e as intermediárias) sem erro se já existe' },
                { id: 'b', text: 'Lista as pastas' },
                { id: 'c', text: 'Deleta a pasta' },
                { id: 'd', text: 'Cria um arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que os.listdir(pasta) retorna?',
              options: [
                { id: 'a', text: 'A lista de nomes de arquivos/pastas' },
                { id: 'b', text: 'O conteúdo dos arquivos' },
                { id: 'c', text: 'O tamanho da pasta' },
                { id: 'd', text: 'A data de criação' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que shutil.copy(origem, destino) faz?',
              options: [
                { id: 'a', text: 'Copia o arquivo para o destino' },
                { id: 'b', text: 'Move o arquivo' },
                { id: 'c', text: 'Deleta o arquivo' },
                { id: 'd', text: 'Renomeia o arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como filtrar arquivos por extensão?',
              options: [
                { id: 'a', text: '[n for n in os.listdir(p) if n.endswith(".txt")]' },
                { id: 'b', text: 'os.filter(".txt")' },
                { id: 'c', text: 'os.listdir(p, ext=".txt")' },
                { id: 'd', text: 'glob não existe' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que os.path.exists(caminho) retorna?',
              options: [
                { id: 'a', text: 'True se o caminho existe' },
                { id: 'b', text: 'O tamanho do arquivo' },
                { id: 'c', text: 'A data de modificação' },
                { id: 'd', text: 'O conteúdo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'automacao-sistema',
          title: 'Sistema: subprocess e datetime',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que subprocess.run(cmd) faz?',
              options: [
                { id: 'a', text: 'Executa um comando do sistema e espera o resultado' },
                { id: 'b', text: 'Abre o terminal interativo' },
                { id: 'c', text: 'Instala um pacote' },
                { id: 'd', text: 'Lê um arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que capture_output=True faz?',
              options: [
                { id: 'a', text: 'Captura stdout/stderr do comando em vez de imprimir' },
                { id: 'b', text: 'Grava um vídeo' },
                { id: 'c', text: 'Esconde os erros' },
                { id: 'd', text: 'Acelera o comando' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que returncode do subprocess indica?',
              options: [
                { id: 'a', text: '0 = sucesso; diferente de 0 = erro' },
                { id: 'b', text: 'O tamanho da saída' },
                { id: 'c', text: 'O tempo de execução' },
                { id: 'd', text: 'A quantidade de linhas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que datetime.now() retorna?',
              options: [
                { id: 'a', text: 'A data/hora atual' },
                { id: 'b', text: 'O timestamp em segundos' },
                { id: 'c', text: 'A data de ontem' },
                { id: 'd', text: 'Uma string formatada' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que timedelta(days=1) representa?',
              options: [
                { id: 'a', text: 'Uma diferença de 1 dia — útil para somar/subtrair datas' },
                { id: 'b', text: 'O dia 1 do mês' },
                { id: 'c', text: 'Um timer de 1 dia' },
                { id: 'd', text: 'A data de amanhã direto' },
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
const JS_COURSE = {
  slug: 'javascript-devs',
  title: 'JavaScript para Devs',
  description:
    'Variáveis, arrays, objetos, funções e async — a linguagem da web, rodando em Node real no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de JavaScript',
      lessons: [
        {
          slug: 'js-basicos',
          title: 'Variáveis, tipos e template literals',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 35,
          quiz: [
            {
              question: 'Qual a diferença entre const e let?',
              options: [
                { id: 'a', text: 'const não pode ser reatribuída; let pode' },
                { id: 'b', text: 'let não pode ser reatribuída; const pode' },
                { id: 'c', text: 'São idênticas' },
                { id: 'd', text: 'const é para números' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que typeof idade retorna para idade = 25?',
              options: [
                { id: 'a', text: '"number"' },
                { id: 'b', text: '"int"' },
                { id: 'c', text: '"float"' },
                { id: 'd', text: '"integer"' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que template literals usam?',
              options: [
                { id: 'a', text: 'Crase ` e ${expressão}' },
                { id: 'b', text: 'Aspas duplas e +' },
                { id: 'c', text: 'Parênteses e %' },
                { id: 'd', text: 'Colchetes e #' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como imprimir no console?',
              options: [
                { id: 'a', text: 'console.log(valor)' },
                { id: 'b', text: 'print(valor)' },
                { id: 'c', text: 'echo valor' },
                { id: 'd', text: 'System.out.println' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que typeof "Ana" retorna?',
              options: [
                { id: 'a', text: '"string"' },
                { id: 'b', text: '"text"' },
                { id: 'c', text: '"char"' },
                { id: 'd', text: '"word"' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'js-arrays-objetos',
          title: 'Arrays e Objetos',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 35,
          quiz: [
            {
              question: 'Como adicionar um item no fim de um array?',
              options: [
                { id: 'a', text: 'array.push(item)' },
                { id: 'b', text: 'array.add(item)' },
                { id: 'c', text: 'array.append(item)' },
                { id: 'd', text: 'array.insert(item)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que array.includes(x) retorna?',
              options: [
                { id: 'a', text: 'true se x está no array' },
                { id: 'b', text: 'O índice de x' },
                { id: 'c', text: 'O tamanho do array' },
                { id: 'd', text: 'x duplicado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como acessar a propriedade nome de um objeto?',
              options: [
                { id: 'a', text: 'usuario.nome ou usuario["nome"]' },
                { id: 'b', text: 'usuario->nome' },
                { id: 'c', text: 'usuario.nome()' },
                { id: 'd', text: 'get(usuario, nome)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que Object.keys(obj) retorna?',
              options: [
                { id: 'a', text: 'Um array com as chaves do objeto' },
                { id: 'b', text: 'Os valores do objeto' },
                { id: 'c', text: 'O objeto ordenado' },
                { id: 'd', text: 'O tamanho do objeto' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como adicionar uma propriedade nova a um objeto?',
              options: [
                { id: 'a', text: 'obj.chave = valor' },
                { id: 'b', text: 'obj.add("chave")' },
                { id: 'c', text: 'obj.push(chave)' },
                { id: 'd', text: 'set(obj, chave)' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'js-funcoes-async',
          title: 'Funções, map/filter e async',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 40,
          quiz: [
            {
              question: 'O que array.map(fn) faz?',
              options: [
                { id: 'a', text: 'Cria um novo array aplicando fn a cada item' },
                { id: 'b', text: 'Modifica o array original no lugar' },
                { id: 'c', text: 'Remove itens do array' },
                { id: 'd', text: 'Ordena o array' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que array.filter(fn) faz?',
              options: [
                { id: 'a', text: 'Cria um novo array só com os itens que passam em fn' },
                { id: 'b', text: 'Deleta os itens que passam' },
                { id: 'c', text: 'Junta os itens' },
                { id: 'd', text: 'Multiplica os itens' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que array.reduce(fn, inicial) faz?',
              options: [
                { id: 'a', text: 'Acumula os itens num único valor' },
                { id: 'b', text: 'Reduz o tamanho do array' },
                { id: 'c', text: 'Remove duplicados' },
                { id: 'd', text: 'Cria vários arrays' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve await numa chamada fetch?',
              options: [
                { id: 'a', text: 'Esperar a resposta da API antes de continuar' },
                { id: 'b', text: 'Cancelar a requisição' },
                { id: 'c', text: 'Repetir a requisição' },
                { id: 'd', text: 'Acelerar a requisição' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que throw new Error("msg") faz?',
              options: [
                { id: 'a', text: 'Lança uma exceção — capturável com try/catch' },
                { id: 'b', text: 'Imprime um aviso' },
                { id: 'c', text: 'Retorna undefined' },
                { id: 'd', text: 'Para o servidor' },
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
const REGEX_COURSE = {
  slug: 'regex',
  title: 'Expressões Regulares',
  description:
    'Busca, extração e sanitização de texto com regex — a skill transversal mais subestimada do mercado.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Regex',
      lessons: [
        {
          slug: 'regex-basico',
          title: 'findall, fullmatch e padrões',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que re.findall(padrao, texto) retorna?',
              options: [
                { id: 'a', text: 'Uma lista com todas as ocorrências' },
                { id: 'b', text: 'A primeira ocorrência' },
                { id: 'c', text: 'True/False' },
                { id: 'd', text: 'O texto modificado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que \d representa numa regex?',
              options: [
                { id: 'a', text: 'Qualquer dígito (0-9)' },
                { id: 'b', text: 'O caractere d' },
                { id: 'c', text: 'Um espaço' },
                { id: 'd', text: 'O fim da string' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que + significa numa regex?',
              options: [
                { id: 'a', text: 'Uma ou mais repetições do anterior' },
                { id: 'b', text: 'Zero ou uma' },
                { id: 'c', text: 'Exatamente uma' },
                { id: 'd', text: 'Nenhuma' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que re.fullmatch(padrao, texto) exige?',
              options: [
                { id: 'a', text: 'Que o texto INTEIRO case com o padrão' },
                { id: 'b', text: 'Que uma parte case' },
                { id: 'c', text: 'Que nada case' },
                { id: 'd', text: 'Que o texto seja vazio' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que [a-z] representa?',
              options: [
                { id: 'a', text: 'Qualquer letra minúscula de a a z' },
                { id: 'b', text: 'A string "a-z"' },
                { id: 'c', text: 'Um hífen' },
                { id: 'd', text: 'Um dígito' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'regex-grupos',
          title: 'Grupos e extração',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Para que servem os parênteses numa regex?',
              options: [
                { id: 'a', text: 'Criam grupos capturáveis (m.group(1))' },
                { id: 'b', text: 'São só decoração' },
                { id: 'c', text: 'Indicam o fim' },
                { id: 'd', text: 'Repetem o padrão' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que re.search(padrao, texto) retorna?',
              options: [
                { id: 'a', text: 'A primeira ocorrência (objeto Match ou None)' },
                { id: 'b', text: 'Todas as ocorrências' },
                { id: 'c', text: 'Uma lista' },
                { id: 'd', text: 'O texto limpo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que re.sub(padrao, novo, texto) faz?',
              options: [
                { id: 'a', text: 'Substitui as ocorrências por novo' },
                { id: 'b', text: 'Remove o texto' },
                { id: 'c', text: 'Procura o novo' },
                { id: 'd', text: 'Divide o texto' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o padrão [^a-z] significa?',
              options: [
                { id: 'a', text: 'Tudo que NÃO é letra minúscula' },
                { id: 'b', text: 'Letras de a a z' },
                { id: 'c', text: 'O acento circunflexo' },
                { id: 'd', text: 'O início da string' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve mascarar dados (re.sub com *)?',
              options: [
                { id: 'a', text: 'Ocultar dados sensíveis (CPF, telefone) em logs' },
                { id: 'b', text: 'Deixar o texto bonito' },
                { id: 'c', text: 'Acelerar o programa' },
                { id: 'd', text: 'Criptografar' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'regex-aplicacoes',
          title: 'Aplicações: split e sanitização',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que re.split(padrao, texto) faz?',
              options: [
                { id: 'a', text: 'Divide o texto nos pontos que casam' },
                { id: 'b', text: 'Junta o texto' },
                { id: 'c', text: 'Substitui o texto' },
                { id: 'd', text: 'Ordena o texto' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que significa sanitizar texto?',
              options: [
                { id: 'a', text: 'Remover caracteres indesejados (símbolos, tags)' },
                { id: 'b', text: 'Deixar tudo maiúsculo' },
                { id: 'c', text: 'Criptografar' },
                { id: 'd', text: 'Comprimir' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que \s representa?',
              options: [
                { id: 'a', text: 'Qualquer espaço (espaço, tab, quebra)' },
                { id: 'b', text: 'A letra s' },
                { id: 'c', text: 'Um símbolo' },
                { id: 'd', text: 'Um dígito' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que {4} significa numa regex?',
              options: [
                { id: 'a', text: 'Exatamente 4 repetições do anterior' },
                { id: 'b', text: 'De 4 a 9 repetições' },
                { id: 'c', text: 'O número 4' },
                { id: 'd', text: '4 espaços' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como extrair domínios de emails com regex?',
              options: [
                { id: 'a', text: 're.findall(r"@([a-z0-9.]+)", texto)' },
                { id: 'b', text: 're.split("@")' },
                { id: 'c', text: 'texto.domain()' },
                { id: 'd', text: 're.replace("@")' },
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
const OOP_COURSE = {
  slug: 'oop-python',
  title: 'Orientação a Objetos com Python',
  description:
    'Classes, herança e encapsulamento — o paradigma que organiza sistemas grandes, com exercícios verificados.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de OOP',
      lessons: [
        {
          slug: 'oop-classes',
          title: 'Classes, __init__ e métodos',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que __init__ faz numa classe?',
              options: [
                { id: 'a', text: 'Inicializa o objeto — roda ao criar a instância' },
                { id: 'b', text: 'Deleta o objeto' },
                { id: 'c', text: 'É o nome da classe' },
                { id: 'd', text: 'Só existe em Java' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que self representa?',
              options: [
                { id: 'a', text: 'A própria instância (cada objeto tem o seu)' },
                { id: 'b', text: 'A classe' },
                { id: 'c', text: 'O módulo' },
                { id: 'd', text: 'O parâmetro do método' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como criar uma instância de Conta?',
              options: [
                { id: 'a', text: 'c = Conta("Ana", 100)' },
                { id: 'b', text: 'c = new Conta("Ana")' },
                { id: 'c', text: 'c = Conta.new()' },
                { id: 'd', text: 'c = conta()' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é um método?',
              options: [
                { id: 'a', text: 'Uma função definida dentro da classe' },
                { id: 'b', text: 'Uma variável da classe' },
                { id: 'c', text: 'Um atributo do objeto' },
                { id: 'd', text: 'Um módulo importado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que self.saldo = 0 faz?',
              options: [
                { id: 'a', text: 'Cria o atributo saldo da instância' },
                { id: 'b', text: 'Cria uma variável global' },
                { id: 'c', text: 'Zera o objeto' },
                { id: 'd', text: 'Erro de sintaxe' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'oop-heranca',
          title: 'Herança e polimorfismo',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que "class Cachorro(Animal)" significa?',
              options: [
                { id: 'a', text: 'Cachorro HERDA tudo de Animal (e pode sobrescrever)' },
                { id: 'b', text: 'Cachorro é uma função' },
                { id: 'c', text: 'Animal herda de Cachorro' },
                { id: 'd', text: 'Cachorro é uma instância' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é sobrescrever (override) um método?',
              options: [
                { id: 'a', text: 'Definir o MESMO método na subclasse com comportamento próprio' },
                { id: 'b', text: 'Apagar o método da classe pai' },
                { id: 'c', text: 'Chamar o método duas vezes' },
                { id: 'd', text: 'Renomear o método' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é polimorfismo?',
              options: [
                { id: 'a', text: 'Objetos diferentes respondem ao MESMO método de formas diferentes' },
                { id: 'b', text: 'Vários métodos com o mesmo nome' },
                { id: 'c', text: 'Uma classe com muitos atributos' },
                { id: 'd', text: 'Um método com muitos parâmetros' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a vantagem da herança?',
              options: [
                { id: 'a', text: 'Reuso: a subclasse herda atributos e métodos da base' },
                { id: 'b', text: 'Deixa o código mais curto sempre' },
                { id: 'c', text: 'Elimina a necessidade de classes' },
                { id: 'd', text: 'É obrigatória em Python' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se NÃO sobrescrever o método da base?',
              options: [
                { id: 'a', text: 'A subclasse usa a implementação da classe pai' },
                { id: 'b', text: 'Erro de execução' },
                { id: 'c', text: 'O método some' },
                { id: 'd', text: 'O programa não roda' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'oop-encapsulamento',
          title: 'Encapsulamento e @property',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que __saldo (duplo underscore) significa?',
              options: [
                { id: 'a', text: 'Atributo "privado" — acesso direto desencorajado' },
                { id: 'b', text: 'Atributo público' },
                { id: 'c', text: 'Uma variável global' },
                { id: 'd', text: 'Erro de sintaxe' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o @property?',
              options: [
                { id: 'a', text: 'Expor um atributo privado como leitura controlada' },
                { id: 'b', text: 'Criar um método estático' },
                { id: 'c', text: 'Apagar um atributo' },
                { id: 'd', text: 'Importar um módulo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que encapsular o saldo?',
              options: [
                { id: 'a', text: 'Controlar como o dado muda (ex: só via depositar/sacar)' },
                { id: 'b', text: 'Porque é obrigatório' },
                { id: 'c', text: 'Para ficar mais lento' },
                { id: 'd', text: 'Para ocupar menos memória' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é "name mangling" (__saldo)?',
              options: [
                { id: 'a', text: 'Python renomeia internamente para _Classe__saldo' },
                { id: 'b', text: 'Python apaga o atributo' },
                { id: 'c', text: 'Python torna público' },
                { id: 'd', text: 'Python cria uma cópia' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que um método getter (property) permite?',
              options: [
                { id: 'a', text: 'Ler o valor com sintaxe de atributo: c.saldo' },
                { id: 'b', text: 'Escrever direto no atributo' },
                { id: 'c', text: 'Deletar o atributo' },
                { id: 'd', text: 'Contar os atributos' },
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
const TS_COURSE = {
  slug: 'typescript',
  title: 'TypeScript na Prática',
  description:
    'Tipos, interfaces e generics — o JavaScript com segurança de tipos que o mercado inteiro usa. Roda em TS real no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de TypeScript',
      lessons: [
        {
          slug: 'ts-tipos',
          title: 'Tipos básicos e anotações',
          checkpoint: 'ml-base',
          runtime: 'ts',
          minutes: 35,
          quiz: [
            {
              question: 'Para que serve a anotação : number?',
              options: [
                { id: 'a', text: 'Declarar que a variável só aceita números' },
                { id: 'b', text: 'Converter a variável em número' },
                { id: 'c', text: 'Criar um número aleatório' },
                { id: 'd', text: 'É só decoração' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é um type alias (type Usuario = ...)?',
              options: [
                { id: 'a', text: 'Um nome para uma forma de dado — reutilizável' },
                { id: 'b', text: 'Um novo tipo de variável' },
                { id: 'c', text: 'Uma classe' },
                { id: 'd', text: 'Uma função' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a diferença de TS para JS?',
              options: [
                { id: 'a', text: 'TS adiciona tipos em tempo de desenvolvimento (que são removidos ao rodar)' },
                { id: 'b', text: 'TS é mais lento em produção' },
                { id: 'c', text: 'TS roda no navegador direto' },
                { id: 'd', text: 'TS não tem funções' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se passar uma string para uma função : number?',
              options: [
                { id: 'a', text: 'Erro de tipo em tempo de desenvolvimento' },
                { id: 'b', text: 'Erro em produção' },
                { id: 'c', text: 'O programa trava' },
                { id: 'd', text: 'Nada — converte sozinho' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'TypeScript é compilado ou interpretado?',
              options: [
                { id: 'a', text: 'Compilado para JavaScript (o navegador/node roda JS)' },
                { id: 'b', text: 'Interpretado direto' },
                { id: 'c', text: 'Compilado para binário' },
                { id: 'd', text: 'É uma linguagem de marcação' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'ts-interfaces',
          title: 'Interfaces e objetos',
          checkpoint: 'ml-base',
          runtime: 'ts',
          minutes: 35,
          quiz: [
            {
              question: 'O que é uma interface?',
              options: [
                { id: 'a', text: 'Um contrato de forma — o objeto DEVE ter essas propriedades' },
                { id: 'b', text: 'Uma classe abstrata' },
                { id: 'c', text: 'Um tipo primitivo' },
                { id: 'd', text: 'Uma função' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que significa "T[]" (ex: Produto[])?',
              options: [
                { id: 'a', text: 'Um array de elementos do tipo T' },
                { id: 'b', text: 'Um array vazio' },
                { id: 'c', text: 'Um tipo genérico' },
                { id: 'd', text: 'O último elemento' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que tipar objetos de API?',
              options: [
                { id: 'a', text: 'O compilador valida os campos antes de você usar' },
                { id: 'b', text: 'Para o JSON ficar menor' },
                { id: 'c', text: 'Não dá para tipar' },
                { id: 'd', text: 'Para acelerar o fetch' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se faltar um campo da interface?',
              options: [
                { id: 'a', text: 'Erro de tipo em desenvolvimento' },
                { id: 'b', text: 'O objeto vira undefined' },
                { id: 'c', text: 'O campo é criado vazio' },
                { id: 'd', text: 'Nada' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Interface vs type: qual usar para objetos?',
              options: [
                { id: 'a', text: 'Ambos funcionam — interface é tradicional para objetos' },
                { id: 'b', text: 'Só type funciona' },
                { id: 'c', text: 'Só interface funciona' },
                { id: 'd', text: 'Nenhum' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'ts-avancado',
          title: 'Union types e generics',
          checkpoint: 'ml-base',
          runtime: 'ts',
          minutes: 40,
          quiz: [
            {
              question: 'O que é union type (number | string)?',
              options: [
                { id: 'a', text: 'Aceita um OU outro tipo — e o typeof discrimina' },
                { id: 'b', text: 'Aceita os dois ao mesmo tempo' },
                { id: 'c', text: 'Um array misto' },
                { id: 'd', text: 'Um tipo opcional' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o typeof num union type?',
              options: [
                { id: 'a', text: 'Narrowing: saber qual tipo é antes de operar' },
                { id: 'b', text: 'Converter o tipo' },
                { id: 'c', text: 'Apagar o tipo' },
                { id: 'd', text: 'Criar o tipo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é um genérico (<T>)?',
              options: [
                { id: 'a', text: 'Uma função que funciona com QUALQUER tipo, preservando-o' },
                { id: 'b', text: 'Uma função sem tipo' },
                { id: 'c', text: 'Um tipo secreto' },
                { id: 'd', text: 'Um array de tipos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que T | undefined significa num retorno?',
              options: [
                { id: 'a', text: 'Pode devolver o valor OU undefined (ex: lista vazia)' },
                { id: 'b', text: 'O valor é opcional para quem chama' },
                { id: 'c', text: 'Erro garantido' },
                { id: 'd', text: 'O valor nunca existe' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que o mercado adotou TypeScript?',
              options: [
                { id: 'a', text: 'Erros de tipo aparecem em desenvolvimento, não em produção' },
                { id: 'b', text: 'É mais rápido que JS' },
                { id: 'c', text: 'É obrigatório' },
                { id: 'd', text: 'Substitui o CSS' },
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
const BACKEND_COURSE = {
  slug: 'backend-node',
  title: 'Backend com Node.js',
  description:
    'Servidores HTTP, rotas, JSON e APIs REST — crie backends de verdade com o http nativo do Node, direto no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Backend',
      lessons: [
        {
          slug: 'node-servidor',
          title: 'Seu primeiro servidor HTTP',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 40,
          quiz: [
            {
              question: 'O que http.createServer(callback) faz?',
              options: [
                { id: 'a', text: 'Cria um servidor HTTP — o callback responde cada requisição' },
                { id: 'b', text: 'Abre uma conexão com um servidor' },
                { id: 'c', text: 'Faz uma requisição HTTP' },
                { id: 'd', text: 'Instala o express' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que res.writeHead(200, headers) faz?',
              options: [
                { id: 'a', text: 'Define o status code e os headers da resposta' },
                { id: 'b', text: 'Envia o corpo da resposta' },
                { id: 'c', text: 'Fecha a conexão' },
                { id: 'd', text: 'Lê o corpo da requisição' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que res.end(dados) faz?',
              options: [
                { id: 'a', text: 'Envia o corpo e encerra a resposta' },
                { id: 'b', text: 'Inicia a resposta' },
                { id: 'c', text: 'Abre o servidor' },
                { id: 'd', text: 'Faz um log' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que server.listen(3001, callback) faz?',
              options: [
                { id: 'a', text: 'Faz o servidor escutar na porta 3001' },
                { id: 'b', text: 'Fecha o servidor' },
                { id: 'c', text: 'Faz uma requisição' },
                { id: 'd', text: 'Define o conteúdo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que req.url contém?',
              options: [
                { id: 'a', text: 'O caminho da requisição (ex: "/usuarios")' },
                { id: 'b', text: 'O corpo da requisição' },
                { id: 'c', text: 'O status da resposta' },
                { id: 'd', text: 'O método HTTP' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'node-api-rest',
          title: 'Construindo uma API REST',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 40,
          quiz: [
            {
              question: 'O que req.method contém?',
              options: [
                { id: 'a', text: 'O método HTTP (GET, POST...)' },
                { id: 'b', text: 'A URL completa' },
                { id: 'c', text: 'O corpo da requisição' },
                { id: 'd', text: 'O status code' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como extrair um id de "/usuarios/2"?',
              options: [
                { id: 'a', text: 'req.url.match(/^\/usuarios\/(\d+)$/)' },
                { id: 'b', text: 'req.params.id' },
                { id: 'c', text: 'req.query.id' },
                { id: 'd', text: 'req.body.id' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que Number("2") faz?',
              options: [
                { id: 'a', text: 'Converte a string "2" no número 2' },
                { id: 'b', text: 'Retorna NaN' },
                { id: 'c', text: 'Converte em texto' },
                { id: 'd', text: 'Arredonda 2.5' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que JSON.stringify(lista) faz?',
              options: [
                { id: 'a', text: 'Converte a lista em string JSON para enviar' },
                { id: 'b', text: 'Converte JSON em objeto' },
                { id: 'c', text: 'Formata o console' },
                { id: 'd', text: 'Valida o JSON' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como achar um item num array?',
              options: [
                { id: 'a', text: 'usuarios.find((x) => x.id === id)' },
                { id: 'b', text: 'usuarios.get(id)' },
                { id: 'c', text: 'usuarios[id]' },
                { id: 'd', text: 'usuarios.where(id)' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'node-erros',
          title: 'Erros, corpo e query strings',
          checkpoint: 'ml-base',
          runtime: 'node',
          minutes: 40,
          quiz: [
            {
              question: 'O que o evento "data" do req faz?',
              options: [
                { id: 'a', text: 'Entrega pedaços do corpo da requisição' },
                { id: 'b', text: 'Envia a resposta' },
                { id: 'c', text: 'Fecha a conexão' },
                { id: 'd', text: 'Define o status' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que JSON.parse(corpo) faz?',
              options: [
                { id: 'a', text: 'Converte a string JSON do corpo em objeto' },
                { id: 'b', text: 'Converte objeto em string' },
                { id: 'c', text: 'Valida a URL' },
                { id: 'd', text: 'Cria o servidor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o status 500?',
              options: [
                { id: 'a', text: 'Erro interno do servidor' },
                { id: 'b', text: 'Não encontrado' },
                { id: 'c', text: 'OK' },
                { id: 'd', text: 'Redirecionamento' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é uma query string ("?a=10&b=5")?',
              options: [
                { id: 'a', text: 'Parâmetros extras na URL após o ?' },
                { id: 'b', text: 'O corpo do POST' },
                { id: 'c', text: 'Os headers' },
                { id: 'd', text: 'O método HTTP' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que padronizar o JSON de erro?',
              options: [
                { id: 'a', text: 'O cliente (frontend) consegue tratar erros de forma uniforme' },
                { id: 'b', text: 'É obrigatório' },
                { id: 'c', text: 'Deixa o servidor mais rápido' },
                { id: 'd', text: 'Evita o JSON' },
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
const DOCKER_COURSE = {
  slug: 'docker',
  title: 'Docker na Prática',
  description:
    'Imagens, containers e Dockerfiles — rode Docker DE VERDADE no sandbox e entenda o que todo deploy usa.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Docker',
      lessons: [
        {
          slug: 'docker-imagens',
          title: 'Imagens e containers',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Qual a diferença entre imagem e container?',
              options: [
                { id: 'a', text: 'Imagem é o molde (estático); container é a execução (instância)' },
                { id: 'b', text: 'São a mesma coisa' },
                { id: 'c', text: 'Container é o molde; imagem a execução' },
                { id: 'd', text: 'Imagem é uma máquina virtual' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que docker images lista?',
              options: [
                { id: 'a', text: 'As imagens baixadas localmente' },
                { id: 'b', text: 'Os containers rodando' },
                { id: 'c', text: 'Os volumes' },
                { id: 'd', text: 'As redes' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a flag --rm faz no docker run?',
              options: [
                { id: 'a', text: 'Remove o container automaticamente quando termina' },
                { id: 'b', text: 'Remove a imagem' },
                { id: 'c', text: 'Reinicia o container' },
                { id: 'd', text: 'Roda em modo de remoção' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que alpine significa (ex: alpine, python:3.12-alpine)?',
              options: [
                { id: 'a', text: 'Uma distro Linux minúscula — imagens pequenas' },
                { id: 'b', text: 'Um tipo de container' },
                { id: 'c', text: 'Um banco de dados' },
                { id: 'd', text: 'Um framework' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que containers são leves comparados a VMs?',
              options: [
                { id: 'a', text: 'Compartilham o kernel do host — só o app e libs no container' },
                { id: 'b', text: 'Não usam Linux' },
                { id: 'c', text: 'São menores por design' },
                { id: 'd', text: 'Não rodam processos' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'docker-run',
          title: 'Rodando containers',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que "docker run alpine echo oi" faz?',
              options: [
                { id: 'a', text: 'Baixa alpine (se preciso), cria o container e roda o comando' },
                { id: 'b', text: 'Só baixa a imagem' },
                { id: 'c', text: 'Cria sem rodar' },
                { id: 'd', text: 'Para um container' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que docker run --rm python:3.12-alpine python -c "..." faz?',
              options: [
                { id: 'a', text: 'Roda Python DENTRO do container (isolado do host)' },
                { id: 'b', text: 'Roda Python no host' },
                { id: 'c', text: 'Instala Python no host' },
                { id: 'd', text: 'Erro — não pode' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o exit code de um container?',
              options: [
                { id: 'a', text: '0 = sucesso; diferente de 0 = erro (igual a processos)' },
                { id: 'b', text: 'Sempre 0' },
                { id: 'c', text: 'É aleatório' },
                { id: 'd', text: 'Indica o número de containers' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece com containers parados?',
              options: [
                { id: 'a', text: 'Continuam existindo (docker ps -a mostra) até serem removidos' },
                { id: 'b', text: 'São apagados sozinhos' },
                { id: 'c', text: 'Viram imagens' },
                { id: 'd', text: 'Reiniciam sozinhos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar --rm em testes?',
              options: [
                { id: 'a', text: 'Evita acumular containers parados no disco' },
                { id: 'b', text: 'Deixa mais rápido' },
                { id: 'c', text: 'É obrigatório' },
                { id: 'd', text: 'Preserva os logs' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'docker-dockerfile',
          title: 'Criando imagens com Dockerfile',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que a instrução FROM faz no Dockerfile?',
              options: [
                { id: 'a', text: 'Define a imagem base (ex: FROM alpine)' },
                { id: 'b', text: 'Roda um comando' },
                { id: 'c', text: 'Copia arquivos' },
                { id: 'd', text: 'Define variáveis' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a instrução CMD faz?',
              options: [
                { id: 'a', text: 'Define o comando padrão ao rodar o container' },
                { id: 'b', text: 'Compila o código' },
                { id: 'c', text: 'Copia o código' },
                { id: 'd', text: 'Baixa dependências' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que docker build -t meu-app . faz?',
              options: [
                { id: 'a', text: 'Constrói a imagem a partir do Dockerfile, com a tag meu-app' },
                { id: 'b', text: 'Roda a imagem' },
                { id: 'c', text: 'Envia para o registro' },
                { id: 'd', text: 'Deleta a imagem' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a instrução ENV faz?',
              options: [
                { id: 'a', text: 'Define variáveis de ambiente dentro do container' },
                { id: 'b', text: 'Define o ambiente de produção' },
                { id: 'c', text: 'Instala pacotes' },
                { id: 'd', text: 'Expõe portas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que WORKDIR /app faz?',
              options: [
                { id: 'a', text: 'Define o diretório de trabalho dentro do container' },
                { id: 'b', text: 'Cria um volume' },
                { id: 'c', text: 'Abre o editor' },
                { id: 'd', text: 'Executa um app' },
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
const FASTAPI_COURSE = {
  slug: 'fastapi',
  title: 'APIs com FastAPI',
  description:
    'O framework Python #1 do mercado: rotas, path params, query e POST com Pydantic — testado com TestClient real no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de FastAPI',
      lessons: [
        {
          slug: 'fastapi-primeiros-passos',
          title: 'Primeira API com FastAPI',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que o decorador @app.get("/") faz?',
              options: [
                { id: 'a', text: 'Registra a função para responder GET na rota /' },
                { id: 'b', text: 'Cria o servidor' },
                { id: 'c', text: 'Instala o FastAPI' },
                { id: 'd', text: 'Define o banco' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que uma função de rota retorna?',
              options: [
                { id: 'a', text: 'Um dict — que o FastAPI converte em JSON automaticamente' },
                { id: 'b', text: 'Uma string HTML sempre' },
                { id: 'c', text: 'Nada' },
                { id: 'd', text: 'Um objeto de resposta manual' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o TestClient faz?',
              options: [
                { id: 'a', text: 'Testa a API sem subir servidor — requests in-process' },
                { id: 'b', text: 'Sobe o servidor de produção' },
                { id: 'c', text: 'Faz deploy' },
                { id: 'd', text: 'Compila o código' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que client.get("/") retorna?',
              options: [
                { id: 'a', text: 'Uma resposta com status_code e .json()' },
                { id: 'b', text: 'O dict direto' },
                { id: 'c', text: 'O HTML renderizado' },
                { id: 'd', text: 'Um erro' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que FastAPI domina o mercado Python?',
              options: [
                { id: 'a', text: 'Type hints, validação automática e docs automáticas' },
                { id: 'b', text: 'É o mais antigo' },
                { id: 'c', text: 'Não precisa de Python' },
                { id: 'd', text: 'É um banco de dados' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'fastapi-rotas',
          title: 'Rotas, parâmetros e 404',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que {usuario_id} em "/usuarios/{usuario_id}" faz?',
              options: [
                { id: 'a', text: 'Captura o valor da URL e passa como parâmetro tipado' },
                { id: 'b', text: 'É só decoração' },
                { id: 'c', text: 'Cria um banco' },
                { id: 'd', text: 'Define o método' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se o parâmetro é int e vem "abc"?',
              options: [
                { id: 'a', text: 'FastAPI valida e devolve 422 (não aceita)' },
                { id: 'b', text: 'Converte para 0' },
                { id: 'c', text: 'Quebra o servidor' },
                { id: 'd', text: 'Aceita como string' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual status para recurso não encontrado?',
              options: [
                { id: 'a', text: '404' },
                { id: 'b', text: '200' },
                { id: 'c', text: '500' },
                { id: 'd', text: '201' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é o status 422?',
              options: [
                { id: 'a', text: 'Validação falhou — a requisição não bate com o esperado' },
                { id: 'b', text: 'Não encontrado' },
                { id: 'c', text: 'OK' },
                { id: 'd', text: 'Erro interno' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como devolver erro 404 no FastAPI?',
              options: [
                { id: 'a', text: 'return {"erro": "..."} e o cliente vê; ou raise HTTPException' },
                { id: 'b', text: 'return 404' },
                { id: 'c', text: 'Não é possível' },
                { id: 'd', text: 'client.get("/404")' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'fastapi-post',
          title: 'POST, query e Pydantic',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Para que serve um modelo Pydantic (class X(BaseModel))?',
              options: [
                { id: 'a', text: 'Valida e tipa o corpo da requisição automaticamente' },
                { id: 'b', text: 'Cria a tabela no banco' },
                { id: 'c', text: 'Define a rota' },
                { id: 'd', text: 'É uma função de teste' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como ler o corpo de um POST no FastAPI?',
              options: [
                { id: 'a', text: 'Declarar um parâmetro do tipo do modelo Pydantic' },
                { id: 'b', text: 'req.body manual' },
                { id: 'c', text: 'request.json()' },
                { id: 'd', text: 'Não dá para ler' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que são query params ("/soma?a=10&b=5")?',
              options: [
                { id: 'a', text: 'Parâmetros extras na URL — declarados como args da função' },
                { id: 'b', text: 'O corpo do POST' },
                { id: 'c', text: 'Os headers' },
                { id: 'd', text: 'O método HTTP' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se faltar um campo obrigatório do modelo?',
              options: [
                { id: 'a', text: 'FastAPI devolve 422 com a lista de erros' },
                { id: 'b', text: 'Cria o campo vazio' },
                { id: 'c', text: 'Quebra o servidor' },
                { id: 'd', text: 'Ignora' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar type hints nos parâmetros?',
              options: [
                { id: 'a', text: 'FastAPI valida e documenta automaticamente' },
                { id: 'b', text: 'Só por estilo' },
                { id: 'c', text: 'Para o Python rodar mais rápido' },
                { id: 'd', text: 'Não tem função' },
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
const REACT_COURSE = {
  slug: 'react',
  title: 'React do Zero',
  description:
    'Componentes, props e composição — o framework frontend #1 do mercado, rodando de verdade (SSR) no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de React',
      lessons: [
        {
          slug: 'react-componentes',
          title: 'Componentes e o primeiro render',
          checkpoint: 'ml-base',
          runtime: 'react',
          minutes: 40,
          quiz: [
            {
              question: 'O que é um componente React?',
              options: [
                { id: 'a', text: 'Uma função que retorna o que será renderizado' },
                { id: 'b', text: 'Um arquivo HTML' },
                { id: 'c', text: 'Uma classe CSS' },
                { id: 'd', text: 'Um servidor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que React.createElement("h1", null, "Olá") faz?',
              options: [
                { id: 'a', text: 'Cria um elemento h1 com o texto "Olá"' },
                { id: 'b', text: 'Renderiza direto no DOM' },
                { id: 'c', text: 'Cria um componente de classe' },
                { id: 'd', text: 'Importa o React' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que renderToString faz?',
              options: [
                { id: 'a', text: 'Converte o elemento React em HTML (server-side)' },
                { id: 'b', text: 'Monta no browser' },
                { id: 'c', text: 'Deleta o componente' },
                { id: 'd', text: 'Cria o servidor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que são as props de um componente?',
              options: [
                { id: 'a', text: 'Os dados de entrada — passados como atributos' },
                { id: 'b', text: 'As variáveis internas' },
                { id: 'c', text: 'Os arquivos de estilo' },
                { id: 'd', text: 'Os eventos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como o React renderiza no servidor?',
              options: [
                { id: 'a', text: 'SSR: renderToString gera o HTML final' },
                { id: 'b', text: 'Com um browser virtual' },
                { id: 'c', text: 'Não é possível' },
                { id: 'd', text: 'Com CSS' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'react-listas',
          title: 'Listas, keys e condicionais',
          checkpoint: 'ml-base',
          runtime: 'react',
          minutes: 40,
          quiz: [
            {
              question: 'Por que usar key em listas?',
              options: [
                { id: 'a', text: 'O React identifica cada item de forma única' },
                { id: 'b', text: 'É obrigatório para renderizar' },
                { id: 'c', text: 'Deixa a lista mais bonita' },
                { id: 'd', text: 'Ordena os itens' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como renderizar uma lista em React?',
              options: [
                { id: 'a', text: 'itens.map((item) => createElement("li", { key: item }, item))' },
                { id: 'b', text: 'for (item of itens) render(item)' },
                { id: 'c', text: 'itens.forEach(render)' },
                { id: 'd', text: 'render(itens)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que um if dentro do componente faz?',
              options: [
                { id: 'a', text: 'Escolhe o que renderizar com base na condição' },
                { id: 'b', text: 'Para o render' },
                { id: 'c', text: 'Cria um novo componente' },
                { id: 'd', text: 'Ignora as props' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o className faz no createElement?',
              options: [
                { id: 'a', text: 'Define a classe CSS (className, não class)' },
                { id: 'b', text: 'Define o id' },
                { id: 'c', text: 'Cria uma classe JS' },
                { id: 'd', text: 'Importa o CSS' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que React roda no servidor (SSR)?',
              options: [
                { id: 'a', text: 'Primeira renderização rápida e SEO — o HTML vem pronto' },
                { id: 'b', text: 'É a única forma' },
                { id: 'c', text: 'Para economizar memória' },
                { id: 'd', text: 'Não roda' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'react-composicao',
          title: 'Composição e children',
          checkpoint: 'ml-base',
          runtime: 'react',
          minutes: 40,
          quiz: [
            {
              question: 'O que é children num componente?',
              options: [
                { id: 'a', text: 'O conteúdo aninhado entre as tags do componente' },
                { id: 'b', text: 'Os filhos no banco' },
                { id: 'c', text: 'As props obrigatórias' },
                { id: 'd', text: 'O HTML gerado' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é composição em React?',
              options: [
                { id: 'a', text: 'Montar componentes maiores a partir de menores' },
                { id: 'b', text: 'Juntar arquivos CSS' },
                { id: 'c', text: 'Combinar servidores' },
                { id: 'd', text: 'Mesclar props' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como passar dados para um componente filho?',
              options: [
                { id: 'a', text: 'Via props: createElement(Componente, { dados })' },
                { id: 'b', text: 'Com variáveis globais' },
                { id: 'c', text: 'Escrevendo no banco' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que um layout (Header + Main + Footer) exemplifica?',
              options: [
                { id: 'a', text: 'Composição: componentes aninhados formam a página' },
                { id: 'b', text: 'Herança de classes' },
                { id: 'c', text: 'Um servidor HTTP' },
                { id: 'd', text: 'Um banco de dados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que componentes pequenos são bons?',
              options: [
                { id: 'a', text: 'Reuso, testabilidade e clareza' },
                { id: 'b', text: 'Menos arquivos' },
                { id: 'c', text: 'Mais rápido sempre' },
                { id: 'd', text: 'Não importa' },
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
const LINUX_COURSE = {
  slug: 'linux-shell',
  title: 'Linux & Terminal',
  description:
    'Arquivos, grep, pipes e permissões — o terminal que todo dev usa, com comandos reais no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Linux',
      lessons: [
        {
          slug: 'linux-arquivos',
          title: 'Navegando e criando arquivos',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o comando pwd mostra?',
              options: [
                { id: 'a', text: 'O diretório atual (print working directory)' },
                { id: 'b', text: 'A senha do usuário' },
                { id: 'c', text: 'A lista de arquivos' },
                { id: 'd', text: 'O conteúdo do arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando ls faz?',
              options: [
                { id: 'a', text: 'Lista os arquivos do diretório' },
                { id: 'b', text: 'Cria um diretório' },
                { id: 'c', text: 'Apaga arquivos' },
                { id: 'd', text: 'Move arquivos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que mkdir -p faz?',
              options: [
                { id: 'a', text: 'Cria diretório(s) — -p cria os intermediários sem erro' },
                { id: 'b', text: 'Lista diretórios' },
                { id: 'c', text: 'Remove diretórios' },
                { id: 'd', text: 'Renomeia diretórios' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando find procura?',
              options: [
                { id: 'a', text: 'Arquivos/pastas por nome, tipo e padrão' },
                { id: 'b', text: 'Erros em arquivos' },
                { id: 'c', text: 'Processos rodando' },
                { id: 'd', text: 'Usuários do sistema' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a diferença entre / e ~ no terminal?',
              options: [
                { id: 'a', text: '/ é a raiz do sistema; ~ é a home do usuário' },
                { id: 'b', text: 'São iguais' },
                { id: 'c', text: '~ é a raiz; / é a home' },
                { id: 'd', text: '/ é um arquivo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'linux-grep',
          title: 'grep, wc e filtros',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o comando grep faz?',
              options: [
                { id: 'a', text: 'Filtra linhas que contêm um padrão' },
                { id: 'b', text: 'Conta linhas' },
                { id: 'c', text: 'Ordena linhas' },
                { id: 'd', text: 'Substitui texto' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando wc -l faz?',
              options: [
                { id: 'a', text: 'Conta as linhas (word count)' },
                { id: 'b', text: 'Conta as palavras' },
                { id: 'c', text: 'Conta os bytes' },
                { id: 'd', text: 'Lista os arquivos' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o grep em logs?',
              options: [
                { id: 'a', text: 'Achar erros específicos entre milhares de linhas' },
                { id: 'b', text: 'Apagar logs antigos' },
                { id: 'c', text: 'Criar logs' },
                { id: 'd', text: 'Compactar logs' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando find -name "*.py" faz?',
              options: [
                { id: 'a', text: 'Acha arquivos .py por nome (glob)' },
                { id: 'b', text: 'Filtra conteúdo de arquivos' },
                { id: 'c', text: 'Conta arquivos .py' },
                { id: 'd', text: 'Ordena arquivos .py' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como contar quantos erros há num log?',
              options: [
                { id: 'a', text: 'grep erro log.txt | wc -l' },
                { id: 'b', text: 'wc erro log.txt' },
                { id: 'c', text: 'grep -c não existe' },
                { id: 'd', text: 'ls erro log.txt' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'linux-pipes',
          title: 'Pipes, sort e permissões',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o pipe (|) faz?',
              options: [
                { id: 'a', text: 'Envia a saída de um comando como entrada do próximo' },
                { id: 'b', text: 'Executa comandos em paralelo' },
                { id: 'c', text: 'Compara dois arquivos' },
                { id: 'd', text: 'Cria um arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando sort faz?',
              options: [
                { id: 'a', text: 'Ordena as linhas' },
                { id: 'b', text: 'Remove duplicados' },
                { id: 'c', text: 'Conta as linhas' },
                { id: 'd', text: 'Filtra linhas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o comando uniq -c faz?',
              options: [
                { id: 'a', text: 'Conta ocorrências consecutivas iguais' },
                { id: 'b', text: 'Remove todas as linhas iguais' },
                { id: 'c', text: 'Ordena e remove' },
                { id: 'd', text: 'Conta linhas totais' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que chmod +x arquivo faz?',
              options: [
                { id: 'a', text: 'Torna o arquivo executável' },
                { id: 'b', text: 'Torna o arquivo legível' },
                { id: 'c', text: 'Deleta o arquivo' },
                { id: 'd', text: 'Move o arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que as permissões -rwxr-xr-x significam?',
              options: [
                { id: 'a', text: 'Dono lê/escreve/executa; grupo e outros só leem/executam' },
                { id: 'b', text: 'Todos podem tudo' },
                { id: 'c', text: 'Só o dono pode ler' },
                { id: 'd', text: 'O arquivo é oculto' },
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
const SCRAPING_COURSE = {
  slug: 'web-scraping',
  title: 'Web Scraping com Python',
  description:
    'Extraia dados de páginas e APIs — regex em HTML, urllib e pipelines de coleta, com APIs reais no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Scraping',
      lessons: [
        {
          slug: 'scraping-html',
          title: 'Extraindo dados do HTML',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que é web scraping?',
              options: [
                { id: 'a', text: 'Extrair dados de páginas web de forma automatizada' },
                { id: 'b', text: 'Criar páginas web' },
                { id: 'c', text: 'Deletar sites' },
                { id: 'd', text: 'Hospedar sites' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar regex para extrair do HTML?',
              options: [
                { id: 'a', text: 'Acha padrões repetidos (class="produto">...) em uma linha' },
                { id: 'b', text: 'É a única forma' },
                { id: 'c', text: 'Regex entende HTML' },
                { id: 'd', text: 'Não funciona' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o regex class="produto" extrai do HTML?',
              options: [
                { id: 'a', text: 'Acha TODOS os produtos e captura o texto entre as tags' },
                { id: 'b', text: 'Acha o primeiro produto' },
                { id: 'c', text: 'Remove os produtos' },
                { id: 'd', text: 'Conta as tags' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que [^<]+ significa na regex?',
              options: [
                { id: 'a', text: 'Um ou mais caracteres que NÃO são <' },
                { id: 'b', text: 'Uma tag HTML' },
                { id: 'c', text: 'Um atributo' },
                { id: 'd', text: 'O fim da string' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que sites mudam e quebram scrapers?',
              options: [
                { id: 'a', text: 'HTML é código — qualquer mudança de layout quebra o padrão' },
                { id: 'b', text: 'Nunca mudam' },
                { id: 'c', text: 'Só APIs quebram' },
                { id: 'd', text: 'Não quebram' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'scraping-api',
          title: 'Coletando de APIs',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'Por que APIs são melhores que HTML para dados?',
              options: [
                { id: 'a', text: 'Dados estruturados (JSON) — sem regex, sem quebrar' },
                { id: 'b', text: 'São mais lentas' },
                { id: 'c', text: 'Não existem' },
                { id: 'd', text: 'Só devolvem HTML' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que urlopen(url) + json.loads() faz?',
              options: [
                { id: 'a', text: 'Busca a API e converte o JSON em objetos Python' },
                { id: 'b', text: 'Busca e converte em HTML' },
                { id: 'c', text: 'Só valida a URL' },
                { id: 'd', text: 'Envia dados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que fazer quando a API está lenta?',
              options: [
                { id: 'a', text: 'Usar timeout no urlopen para não travar' },
                { id: 'b', text: 'Esperar para sempre' },
                { id: 'c', text: 'Desligar o programa' },
                { id: 'd', text: 'Ignorar' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que uma list comprehension [u["name"] for u in usuarios] faz?',
              options: [
                { id: 'a', text: 'Extrai só os nomes de todos os usuários' },
                { id: 'b', text: 'Cria usuários' },
                { id: 'c', text: 'Deleta os nomes' },
                { id: 'd', text: 'Ordena os nomes' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como filtrar usuários por domínio de email?',
              options: [
                { id: 'a', text: '[u for u in usuarios if u["email"].endswith(".biz")]' },
                { id: 'b', text: 'usuarios.filter(".biz")' },
                { id: 'c', text: 'usuarios["email"]' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'scraping-pipeline',
          title: 'Pipelines de coleta',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que é um pipeline de coleta?',
              options: [
                { id: 'a', text: 'Coletar → transformar → analisar — o fluxo completo' },
                { id: 'b', text: 'Um comando do terminal' },
                { id: 'c', text: 'Um banco de dados' },
                { id: 'd', text: 'Uma página web' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como contar itens por categoria (ex: posts por usuário)?',
              options: [
                { id: 'a', text: 'Dict acumulador: por_usuario[p["userId"]] += 1' },
                { id: 'b', text: 'len(posts)' },
                { id: 'c', text: 'posts.count()' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que min(posts, key=lambda p: len(p["body"])) faz?',
              options: [
                { id: 'a', text: 'Acha o post com o menor body' },
                { id: 'b', text: 'Acha o menor post por id' },
                { id: 'c', text: 'Ordena os posts' },
                { id: 'd', text: 'Conta os posts' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como filtrar os concluídos de uma lista?',
              options: [
                { id: 'a', text: '[t for t in todos if t["completed"]]' },
                { id: 'b', text: 'todos.filter(True)' },
                { id: 'c', text: 'todos.completed()' },
                { id: 'd', text: 'len(todos)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que validar o scraping com dados reais?',
              options: [
                { id: 'a', text: 'O padrão só é confiável se rodou de verdade' },
                { id: 'b', text: 'É obrigatório' },
                { id: 'c', text: 'Não precisa' },
                { id: 'd', text: 'Para ficar bonito' },
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
const SECURITY_COURSE = {
  slug: 'ciberseguranca',
  title: 'Cibersegurança Essencial',
  description:
    'Hashing, SQL injection, XSS e práticas seguras — proteja seu código com demonstrações reais no sandbox.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Segurança',
      lessons: [
        {
          slug: 'security-hash',
          title: 'Hashing e senhas',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que é um hash (SHA-256)?',
              options: [
                { id: 'a', text: 'Uma "impressão digital" — texto vira 64 caracteres únicos' },
                { id: 'b', text: 'Uma criptografia reversível' },
                { id: 'c', text: 'Uma senha mascarada' },
                { id: 'd', text: 'Um número aleatório' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que NUNCA armazenar senha em texto puro?',
              options: [
                { id: 'a', text: 'Se o banco vazar, o atacante vê todas as senhas' },
                { id: 'b', text: 'Ocupa muito espaço' },
                { id: 'c', text: 'É mais lento' },
                { id: 'd', text: 'Não é problema' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como verificar uma senha com hash?',
              options: [
                { id: 'a', text: 'Hashear a senha digitada e comparar com o armazenado' },
                { id: 'b', text: 'Comparar as senhas em texto' },
                { id: 'c', text: 'Decriptar o hash' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é salt numa senha?',
              options: [
                { id: 'a', text: 'Um valor aleatório adicionado antes do hash — hashes únicos' },
                { id: 'b', text: 'Uma pitada de tempero' },
                { id: 'c', text: 'O nome do usuário' },
                { id: 'd', text: 'O hash da senha' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que hashes iguais para senhas iguais é um problema?',
              options: [
                { id: 'a', text: 'O atacante percebe que dois usuários têm a mesma senha' },
                { id: 'b', text: 'Não é problema' },
                { id: 'c', text: 'Ocupa mais espaço' },
                { id: 'd', text: 'É mais rápido' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'security-ataques',
          title: 'SQL injection e XSS',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que é SQL injection?',
              options: [
                { id: 'a', text: 'Injetar SQL malicioso no input para manipular o banco' },
                { id: 'b', text: 'Um vírus de banco' },
                { id: 'c', text: 'Um tipo de hash' },
                { id: 'd', text: 'Uma linguagem' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como o ataque com OR 1=1 (injeção) funciona?',
              options: [
                { id: 'a', text: 'A concatenação faz a condição virar sempre verdadeira' },
                { id: 'b', text: 'Quebra o banco' },
                { id: 'c', text: 'Deleta tabelas' },
                { id: 'd', text: 'Não funciona' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a defesa contra SQL injection?',
              options: [
                { id: 'a', text: 'Parâmetros preparados (? no sqlite) — nunca concatenar SQL' },
                { id: 'b', text: 'Usar SQL em maiúsculas' },
                { id: 'c', text: 'Esconder o banco' },
                { id: 'd', text: 'Usar regex no SQL' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é XSS?',
              options: [
                { id: 'a', text: 'Injetar script no navegador de outro usuário via input' },
                { id: 'b', text: 'Um erro de SQL' },
                { id: 'c', text: 'Um tipo de hash' },
                { id: 'd', text: 'Uma extensão de arquivo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como prevenir XSS?',
              options: [
                { id: 'a', text: 'Escapar o HTML (html.escape) antes de renderizar' },
                { id: 'b', text: 'Usar maiúsculas' },
                { id: 'c', text: 'Bloquear o usuário' },
                { id: 'd', text: 'Não é possível' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'security-praticas',
          title: 'Práticas seguras',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o hmac.compare_digest faz?',
              options: [
                { id: 'a', text: 'Compara hashes em tempo constante (evita timing attack)' },
                { id: 'b', text: 'Cria um hash' },
                { id: 'c', text: 'Encripta dados' },
                { id: 'd', text: 'Valida senhas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que é um timing attack?',
              options: [
                { id: 'a', text: 'Medir o tempo de resposta para adivinhar o valor' },
                { id: 'b', text: 'Um ataque de rede' },
                { id: 'c', text: 'Um vírus' },
                { id: 'd', text: 'Um spam' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quais requisitos de uma senha forte?',
              options: [
                { id: 'a', text: '8+ caracteres, maiúscula, número' },
                { id: 'b', text: 'Só números' },
                { id: 'c', text: '3 caracteres' },
                { id: 'd', text: 'Nome do usuário' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que significa "nunca confiar no input do usuário"?',
              options: [
                { id: 'a', text: 'Todo input deve ser validado/escapado antes de usar' },
                { id: 'b', text: 'Bloquear todos os usuários' },
                { id: 'c', text: 'Não ter formulários' },
                { id: 'd', text: 'Usar texto puro' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar os.urandom(16) num salt?',
              options: [
                { id: 'a', text: 'Gera bytes aleatórios criptograficamente seguros' },
                { id: 'b', text: 'É mais rápido' },
                { id: 'c', text: 'É determinístico' },
                { id: 'd', text: 'Não serve' },
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
const ALGORITMOS_COURSE = {
  slug: 'algoritmos-entrevista',
  title: 'Algoritmos de Entrevista',
  description:
    'Two Pointers, Sliding Window e Recursão — os padrões que caem em entrevistas de FAANG e startups.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Padrões de Entrevista',
      lessons: [
        {
          slug: 'alg-two-pointers',
          title: 'Two Pointers',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Qual a ideia do Two Pointers?',
              options: [
                { id: 'a', text: 'Dois índices (início e fim) andam em direção um ao outro' },
                { id: 'b', text: 'Dois arrays comparados' },
                { id: 'c', text: 'Dois loops aninhados' },
                { id: 'd', text: 'Duas funções recursivas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a complexidade do Two Pointers?',
              options: [
                { id: 'a', text: 'O(n) — cada elemento é visitado uma vez' },
                { id: 'b', text: 'O(n²) — loops aninhados' },
                { id: 'c', text: 'O(log n)' },
                { id: 'd', text: 'O(1)' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve a inversão in-place?',
              options: [
                { id: 'a', text: 'Inverter sem criar array novo — economia de memória' },
                { id: 'b', text: 'Deixar mais rápido' },
                { id: 'c', text: 'Ordenar a string' },
                { id: 'd', text: 'Não serve' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que achar par com soma alvo usa lista ORDENADA?',
              options: [
                { id: 'a', text: 'Se a soma é pequena, anda o esq; se grande, anda o dir' },
                { id: 'b', text: 'Não precisa ordenar' },
                { id: 'c', text: 'Para usar binary search' },
                { id: 'd', text: 'Qualquer lista serve' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o swap chars[esq], chars[dir] = chars[dir], chars[esq] faz?',
              options: [
                { id: 'a', text: 'Troca os dois valores de uma vez' },
                { id: 'b', text: 'Copia o array' },
                { id: 'c', text: 'Inverte a lista' },
                { id: 'd', text: 'Erro de sintaxe' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'alg-sliding-window',
          title: 'Sliding Window',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'Qual a ideia da Sliding Window?',
              options: [
                { id: 'a', text: 'Uma janela que desliza — remove da esquerda, adiciona à direita' },
                { id: 'b', text: 'Uma janela fixa que não muda' },
                { id: 'c', text: 'Dois ponteiros opostos' },
                { id: 'd', text: 'Recursão na janela' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a vantagem sobre recomputar a soma toda vez?',
              options: [
                { id: 'a', text: 'O(n) — cada elemento entra/sai da janela uma vez' },
                { id: 'b', text: 'O(n²) ainda' },
                { id: 'c', text: 'O(log n)' },
                { id: 'd', text: 'Não muda' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como atualizar a soma ao deslizar?',
              options: [
                { id: 'a', text: 'soma += nums[i] - nums[i-k] (adiciona novo, remove antigo)' },
                { id: 'b', text: 'soma = sum(nums[i-k:i])' },
                { id: 'c', text: 'soma *= 2' },
                { id: 'd', text: 'soma = 0' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quando o while soma > k encolhe a janela?',
              options: [
                { id: 'a', text: 'Quando a soma estoura o limite — remove da esquerda' },
                { id: 'b', text: 'Quando a soma é pequena' },
                { id: 'c', text: 'Sempre' },
                { id: 'd', text: 'Nunca' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que dir - esq + 1 representa?',
              options: [
                { id: 'a', text: 'O tamanho atual da janela' },
                { id: 'b', text: 'A soma da janela' },
                { id: 'c', text: 'O índice do meio' },
                { id: 'd', text: 'O alvo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'alg-recursao',
          title: 'Recursão',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que uma função recursiva precisa ter?',
              options: [
                { id: 'a', text: 'Caso base (para) + chamada a si mesma (menor)' },
                { id: 'b', text: 'Apenas chamadas a si mesma' },
                { id: 'c', text: 'Um loop for' },
                { id: 'd', text: 'Duas funções' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece sem caso base?',
              options: [
                { id: 'a', text: 'Recursão infinita → estouro de pilha (RecursionError)' },
                { id: 'b', text: 'Roda para sempre certo' },
                { id: 'c', text: 'Retorna 0' },
                { id: 'd', text: 'Compila com erro' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que fib(5) calcula?',
              options: [
                { id: 'a', text: 'O 5º número de Fibonacci (0,1,1,2,3,5 → 5)' },
                { id: 'b', text: '5! (fatorial)' },
                { id: 'c', text: 'A soma 1+2+3+4+5' },
                { id: 'd', text: 'O dobro de 5' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a desvantagem da recursão ingênua de Fibonacci?',
              options: [
                { id: 'a', text: 'Recomputa os mesmos valores — O(2^n) exponencial' },
                { id: 'b', text: 'Não funciona' },
                { id: 'c', text: 'É sempre melhor que loop' },
                { id: 'd', text: 'Usa muita memória de array' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que fatorial(5) retorna?',
              options: [
                { id: 'a', text: '120 (5*4*3*2*1)' },
                { id: 'b', text: '15' },
                { id: 'c', text: '25' },
                { id: 'd', text: '5' },
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
const SQLAVANCADO_COURSE = {
  slug: 'sql-avancado',
  title: 'SQL Avançado',
  description:
    'Subqueries, CTEs e window functions — as consultas que diferenciam quem só sabe SELECT de quem extrai insight de verdade.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — SQL Avançado',
      lessons: [
        {
          slug: 'sqlav-subqueries',
          title: 'Subqueries',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que é uma subquery?',
              options: [
                { id: 'a', text: 'Uma consulta dentro de outra (ex: dentro de WHERE)' },
                { id: 'b', text: 'Uma tabela temporária' },
                { id: 'c', text: 'Um JOIN' },
                { id: 'd', text: 'Uma view' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que SELECT AVG(valor) FROM vendas retorna?',
              options: [
                { id: 'a', text: 'A média de TODOS os valores (valor único)' },
                { id: 'b', text: 'A média por vendedor' },
                { id: 'c', text: 'A soma' },
                { id: 'd', text: 'A maior venda' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como achar quem está ACIMA da média?',
              options: [
                { id: 'a', text: 'WHERE valor > (SELECT AVG(valor) FROM vendas)' },
                { id: 'b', text: 'WHERE valor = MAX(valor)' },
                { id: 'c', text: 'HAVING valor > média' },
                { id: 'd', text: 'ORDER BY valor' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que GROUP BY vendedor faz numa subquery?',
              options: [
                { id: 'a', text: 'Agrupa para calcular por vendedor (ex: MAX por grupo)' },
                { id: 'b', text: 'Ordena por vendedor' },
                { id: 'c', text: 'Filtra vendedores' },
                { id: 'd', text: 'Conta vendedores' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar subquery em vez de resolver na aplicação?',
              options: [
                { id: 'a', text: 'O banco calcula com índices — sem mover dados' },
                { id: 'b', text: 'É mais bonito' },
                { id: 'c', text: 'Não tem diferença' },
                { id: 'd', text: 'Subquery é proibida' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'sqlav-cte',
          title: 'CTEs (WITH)',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que é uma CTE (WITH)?',
              options: [
                { id: 'a', text: 'Uma consulta nomeada que pode ser reutilizada na mesma query' },
                { id: 'b', text: 'Uma tabela permanente' },
                { id: 'c', text: 'Um índice' },
                { id: 'd', text: 'Uma função' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como se escreve uma CTE?',
              options: [
                { id: 'a', text: 'WITH nome AS (SELECT ...) SELECT ... FROM nome' },
                { id: 'b', text: 'CREATE TEMP TABLE nome' },
                { id: 'c', text: 'SELECT ... INTO nome' },
                { id: 'd', text: 'INSERT INTO nome SELECT' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a vantagem da CTE sobre subquery aninhada?',
              options: [
                { id: 'a', text: 'Legibilidade — a consulta vira blocos nomeados' },
                { id: 'b', text: 'É mais rápida sempre' },
                { id: 'c', text: 'Não tem vantagem' },
                { id: 'd', text: 'CTE não existe no sqlite' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que WITH totais AS (SELECT ... GROUP BY) faz?',
              options: [
                { id: 'a', text: 'Cria um bloco nomeado com totais por grupo' },
                { id: 'b', text: 'Ordena os totais' },
                { id: 'c', text: 'Deleta os totais' },
                { id: 'd', text: 'Soma tudo' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'CTE é uma tabela física?',
              options: [
                { id: 'a', text: 'Não — existe só durante a query (tabela virtual)' },
                { id: 'b', text: 'Sim, fica no banco' },
                { id: 'c', text: 'Depende do tamanho' },
                { id: 'd', text: 'Sim, com índice' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'sqlav-window',
          title: 'Window Functions',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que é uma window function?',
              options: [
                { id: 'a', text: 'Calcula sobre uma janela de linhas SEM agrupar (mantém as linhas)' },
                { id: 'b', text: 'Um JOIN especial' },
                { id: 'c', text: 'Uma CTE' },
                { id: 'd', text: 'Um índice' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Qual a diferença entre GROUP BY e window function?',
              options: [
                { id: 'a', text: 'GROUP BY reduz linhas; window mantém cada linha com o cálculo' },
                { id: 'b', text: 'São iguais' },
                { id: 'c', text: 'Window reduz linhas' },
                { id: 'd', text: 'GROUP BY mantém linhas' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que RANK() OVER (ORDER BY valor DESC) faz?',
              options: [
                { id: 'a', text: 'Numera as linhas por posição no ranking' },
                { id: 'b', text: 'Ordena a tabela' },
                { id: 'c', text: 'Agrupa por valor' },
                { id: 'd', text: 'Soma os valores' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que PARTITION BY vendedor faz na janela?',
              options: [
                { id: 'a', text: 'Reinicia o cálculo para cada vendedor' },
                { id: 'b', text: 'Junta com a tabela de vendedores' },
                { id: 'c', text: 'Ordena por vendedor' },
                { id: 'd', text: 'Filtra vendedores' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que SUM(valor) OVER (PARTITION BY vendedor ORDER BY id) calcula?',
              options: [
                { id: 'a', text: 'O acumulado (running total) por vendedor' },
                { id: 'b', text: 'A soma total geral' },
                { id: 'c', text: 'A média por vendedor' },
                { id: 'd', text: 'O maior valor' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
      ],
    },
  ],
}

const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE, SECURITY_COURSE, ALGORITMOS_COURSE, SQLAVANCADO_COURSE]

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
          runtime: (lesson as { runtime?: string }).runtime ?? 'python',
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
