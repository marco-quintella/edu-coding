"""Insere o SECURITY_COURSE no seed."""
src = open('scripts/seed-ia-para-devs.ts').read()

security_course = '''
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
              question: 'Como o ataque \' OR \'1\'=\'1 funciona?',
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

'''
marker = "const COURSES: Array<typeof COURSE> = [COURSE, PYTHON_COURSE, SQL_COURSE, GIT_COURSE, EDA_COURSE, PANDAS_COURSE, TESTES_COURSE, APIS_COURSE, AUTOMACAO_COURSE, JS_COURSE, REGEX_COURSE, OOP_COURSE, TS_COURSE, BACKEND_COURSE, DOCKER_COURSE, FASTAPI_COURSE, REACT_COURSE, LINUX_COURSE, SCRAPING_COURSE]"
assert marker in src, "marker COURSES não encontrado"
src = src.replace(marker, security_course + marker.replace("SCRAPING_COURSE]", "SCRAPING_COURSE, SECURITY_COURSE]"), 1)
open('scripts/seed-ia-para-devs.ts', 'w').write(src)
print("SECURITY_COURSE inserido")
