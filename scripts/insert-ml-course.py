"""Insere o ML_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

ml_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const ML_COURSE = {
  slug: 'machine-learning',
  title: 'Machine Learning com Python',
  description:
    'Regressão, classificação e clustering com scikit-learn real — os três pilares do ML que o mercado contrata.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — ML com scikit-learn',
      lessons: [
        {
          slug: 'ml-regressao',
          title: 'Regressão linear',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que a regressão linear prevê?',
              options: [
                { id: 'a', text: 'Um valor contínuo (preço, salário, temperatura)' },
                { id: 'b', text: 'Uma categoria' },
                { id: 'c', text: 'Um cluster' },
                { id: 'd', text: 'Uma string' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o coef (coeficiente) significa?',
              options: [
                { id: 'a', text: 'Quanto y muda quando x aumenta 1' },
                { id: 'b', text: 'O valor de y quando x é 0' },
                { id: 'c', text: 'A acurácia' },
                { id: 'd', text: 'O erro' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o intercept (intercepto) é?',
              options: [
                { id: 'a', text: 'O valor de y quando x é 0' },
                { id: 'b', text: 'A inclinação' },
                { id: 'c', text: 'O número de amostras' },
                { id: 'd', text: 'A variância' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como o modelo aprende?',
              options: [
                { id: 'a', text: 'fit(X, y) — ajusta a reta aos dados de treino' },
                { id: 'b', text: 'predict(X, y)' },
                { id: 'c', text: 'score(X, y)' },
                { id: 'd', text: 'Nada — é manual' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que predict([[80]]) faz?',
              options: [
                { id: 'a', text: 'Usa a reta aprendida para prever o y de x=80' },
                { id: 'b', text: 'Treina o modelo' },
                { id: 'c', text: 'Calcula o erro' },
                { id: 'd', text: 'Mostra os dados' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'ml-classificacao',
          title: 'Classificação com árvores',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que a classificação prevê?',
              options: [
                { id: 'a', text: 'Uma categoria (passou/não, comprou/não)' },
                { id: 'b', text: 'Um valor contínuo' },
                { id: 'c', text: 'Um cluster' },
                { id: 'd', text: 'Um preço' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que RandomForestClassifier faz?',
              options: [
                { id: 'a', text: 'Combina MUITAS árvores de decisão (ensemble)' },
                { id: 'b', text: 'Uma árvore única' },
                { id: 'c', text: 'Uma regressão' },
                { id: 'd', text: 'Um cluster' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o score(X, y) mede?',
              options: [
                { id: 'a', text: 'A acurácia: fração de previsões corretas' },
                { id: 'b', text: 'O erro quadrático' },
                { id: 'c', text: 'O número de árvores' },
                { id: 'd', text: 'O tempo de treino' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Para que serve o random_state=42?',
              options: [
                { id: 'a', text: 'Torna o resultado reproduzível (mesmo seed)' },
                { id: 'b', text: 'Deixa mais rápido' },
                { id: 'c', text: 'Escolhe o melhor modelo' },
                { id: 'd', text: 'Não faz nada' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'DecisionTreeClassifier decide como?',
              options: [
                { id: 'a', text: 'Dividindo os dados por regras (if x > 30 ...)' },
                { id: 'b', text: 'Ajustando uma reta' },
                { id: 'c', text: 'Agrupando por distância' },
                { id: 'd', text: 'Sorteando' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'ml-clustering',
          title: 'Clustering com KMeans',
          checkpoint: 'ml-base',
          minutes: 40,
          quiz: [
            {
              question: 'O que clustering faz?',
              options: [
                { id: 'a', text: 'Agrupa dados SEM rótulos (não supervisionado)' },
                { id: 'b', text: 'Prevê um valor' },
                { id: 'c', text: 'Classifica em categorias' },
                { id: 'd', text: 'Faz regressão' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o KMeans calcula?',
              options: [
                { id: 'a', text: 'k centros (centroids) que minimizam a distância dos pontos' },
                { id: 'b', text: 'Uma reta' },
                { id: 'c', text: 'Árvores' },
                { id: 'd', text: 'Probabilidades' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que cluster_centers_ contém?',
              options: [
                { id: 'a', text: 'As coordenadas do centro de cada grupo' },
                { id: 'b', text: 'Os rótulos' },
                { id: 'c', text: 'Os dados originais' },
                { id: 'd', text: 'A inércia' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que labels_ contém?',
              options: [
                { id: 'a', text: 'O número do grupo de cada ponto' },
                { id: 'b', text: 'As distâncias' },
                { id: 'c', text: 'Os centros' },
                { id: 'd', text: 'A acurácia' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que a inércia (inertia_) mede?',
              options: [
                { id: 'a', text: 'A soma das distâncias ao centro — menor = grupos mais coesos' },
                { id: 'b', text: 'O número de grupos' },
                { id: 'c', text: 'A acurácia' },
                { id: 'd', text: 'O tempo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
      ],
    },
  ],
}

'''
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE, SECURITY_COURSE, ALGORITMOS_COURSE, SQLAVANCADO_COURSE, JWT_COURSE, ESTATISTICA_COURSE, GITAVANCADO_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, ml_course + marker.replace("GITAVANCADO_COURSE]", "GITAVANCADO_COURSE, ML_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("ML_COURSE inserido")
