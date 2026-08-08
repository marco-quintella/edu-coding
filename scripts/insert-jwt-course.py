"""Insere o JWT_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

jwt_course = '''
/** Catálogo completo — adicione novos cursos aqui. */
const JWT_COURSE = {
  slug: 'autenticacao-jwt',
  title: 'Autenticação & JWT',
  description:
    'Tokens, assinatura HMAC e expiração — construa autenticação do zero e entenda o que todo backend usa.',
  phases: [
    {
      slug: '01-fundamentos',
      title: 'Fase 01 — Fundamentos de Auth',
      lessons: [
        {
          slug: 'jwt-base64',
          title: 'Base64 e a estrutura do token',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que o JWT é?',
              options: [
                { id: 'a', text: 'JSON Web Token — um token com header.payload.assinatura' },
                { id: 'b', text: 'Um banco de dados' },
                { id: 'c', text: 'Uma senha criptografada' },
                { id: 'd', text: 'Um protocolo de rede' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que base64 faz?',
              options: [
                { id: 'a', text: 'Codifica dados em texto seguro (NÃO criptografa!)' },
                { id: 'b', text: 'Criptografa os dados' },
                { id: 'c', text: 'Comprime os dados' },
                { id: 'd', text: 'Assina os dados' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Quantas partes tem um JWT?',
              options: [
                { id: 'a', text: '3: header.payload.assinatura' },
                { id: 'b', text: '2: header.payload' },
                { id: 'c', text: '1: só o payload' },
                { id: 'd', text: '4: + expiração' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o header do JWT contém?',
              options: [
                { id: 'a', text: 'O algoritmo (alg: HS256) e o tipo (typ: JWT)' },
                { id: 'b', text: 'Os dados do usuário' },
                { id: 'c', text: 'A assinatura' },
                { id: 'd', text: 'A expiração' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que o payload do JWT contém?',
              options: [
                { id: 'a', text: 'As claims: quem é (sub), nome, role...' },
                { id: 'b', text: 'O segredo do servidor' },
                { id: 'c', text: 'A senha do usuário' },
                { id: 'd', text: 'O algoritmo' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'jwt-assinatura',
          title: 'Assinatura HMAC',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que a assinatura do JWT garante?',
              options: [
                { id: 'a', text: 'Que o token NÃO foi adulterado (integridade)' },
                { id: 'b', text: 'Que os dados estão ocultos' },
                { id: 'c', text: 'Que o usuário está online' },
                { id: 'd', text: 'Que o token não expira' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que HMAC-SHA256 faz?',
              options: [
                { id: 'a', text: 'Gera um hash com chave secreta — só quem tem o segredo valida' },
                { id: 'b', text: 'Criptografa o payload' },
                { id: 'c', text: 'Codifica em base64' },
                { id: 'd', text: 'Gera números aleatórios' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Como verificar um token?',
              options: [
                { id: 'a', text: 'Reassinar header.payload com o segredo e comparar' },
                { id: 'b', text: 'Decodificar o payload e confiar' },
                { id: 'c', text: 'Comparar com a senha' },
                { id: 'd', text: 'Ler a assinatura' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que usar hmac.compare_digest na verificação?',
              options: [
                { id: 'a', text: 'Comparação em tempo constante — evita timing attack' },
                { id: 'b', text: 'É mais rápido' },
                { id: 'c', text: 'É obrigatório' },
                { id: 'd', text: 'Compara strings grandes' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que acontece se alguém mudar o payload do token?',
              options: [
                { id: 'a', text: 'A assinatura não bate — a verificação falha' },
                { id: 'b', text: 'O token continua válido' },
                { id: 'c', text: 'O servidor quebra' },
                { id: 'd', text: 'O payload é ignorado' },
              ],
              correctOptionId: 'a',
            },
          ],
        },
        {
          slug: 'jwt-producao',
          title: 'JWT em produção',
          checkpoint: 'ml-base',
          minutes: 35,
          quiz: [
            {
              question: 'O que a claim exp (expiração) faz?',
              options: [
                { id: 'a', text: 'Define quando o token deixa de valer — rejeitado depois disso' },
                { id: 'b', text: 'Estende o token' },
                { id: 'c', text: 'Renova a senha' },
                { id: 'd', text: 'É opcional e ignorada' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que verificar ao receber um token?',
              options: [
                { id: 'a', text: 'Assinatura + expiração (e papel se precisar)' },
                { id: 'b', text: 'Só decodificar' },
                { id: 'c', text: 'Só a expiração' },
                { id: 'd', text: 'Nada — confiar' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Por que o segredo (SECRETO) nunca pode vazar?',
              options: [
                { id: 'a', text: 'Quem tem o segredo forja tokens válidos de qualquer usuário' },
                { id: 'b', text: 'Sem segredo o token não roda' },
                { id: 'c', text: 'O token fica lento' },
                { id: 'd', text: 'Não importa' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'Onde o segredo deve ficar?',
              options: [
                { id: 'a', text: 'Em variável de ambiente do servidor — nunca no código/banco' },
                { id: 'b', text: 'No payload do token' },
                { id: 'c', text: 'No frontend' },
                { id: 'd', text: 'No banco junto do usuário' },
              ],
              correctOptionId: 'a',
            },
            {
              question: 'O que um login com JWT faz?',
              options: [
                { id: 'a', text: 'Verifica a senha e devolve um token assinado' },
                { id: 'b', text: 'Armazena a sessão no servidor' },
                { id: 'c', text: 'Envia a senha no token' },
                { id: 'd', text: 'Cria um cookie sem assinatura' },
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
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE, SECURITY_COURSE, ALGORITMOS_COURSE, SQLAVANCADO_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, jwt_course + marker.replace("SQLAVANCADO_COURSE]", "SQLAVANCADO_COURSE, JWT_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("JWT_COURSE inserido")
