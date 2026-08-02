# Edu Coding

Plataforma educacional textual-interativa no estilo Educative.io.

Catálogo inaugural: **IA para Devs** — ML, NLP, LLMs, GenAI e Cloud, 5 fases, hands-on.

## Stack

- **Next.js 16** (App Router, RSC, MDX)
- **TypeScript 5.x** (strict)
- **Drizzle ORM** + **Postgres** (Railway)
- **BetterAuth** (self-hosted, schema-first)
- **Railway Sandboxes** (runtime Python efêmero)
- **Tailwind CSS 4** + **@tailwindcss/typography**
- **Monaco Editor** (in-browser code editor)
- **pdf-lib** (PDF certificates)
- **Zod** (runtime validation)
- **Vitest** (tests)

## Como rodar local

```bash
# 1. Postgres local via Docker
docker run -d --name edu-coding-postgres \
  -e POSTGRES_USER=edu -e POSTGRES_PASSWORD=edu -e POSTGRES_DB=edu_coding \
  -p 5434:5432 postgres:16-alpine

# 2. Configurar .env.local (já existe, validar DATABASE_URL)
cat .env.local

# 3. Aplicar migrations
npm run db:migrate

# 4. (Opcional) Seed do curso
npm run db:seed

# 5. Dev server
npm run dev
```

Acesse http://localhost:3000

## Estrutura

```
edu-coding/
├── app/                       # Next.js App Router
│   ├── api/
│   │   ├── auth/[...all]/    # BetterAuth handler
│   │   ├── exec/             # Sandbox exec (auth required)
│   │   ├── lessons/[id]/complete/  # Quiz POST (auth required)
│   │   └── phases/[id]/certificate/ # PDF gen (auth required)
│   ├── auth/actions.ts        # (legacy) — now client-side forms
│   ├── login/                 # client form
│   ├── signup/                # client form
│   ├── courses/               # list + detail
│   └── lessons/[id]/          # MDX + SandboxRunner + Quiz
├── components/
│   ├── sandbox-runner.tsx     # Monaco + Run button + BYOK
│   ├── quiz.tsx               # Multiple-choice + scoring
│   ├── auth-buttons.tsx       # Sign in/out UI
│   └── mdx-components.tsx     # MDX registry
├── content/
│   └── lessons/ia-para-devs/
│       └── 01-fundamentos/
│           ├── regressao-linear.mdx    # sandbox + quiz
│           ├── arvores-decisao.mdx     # sandbox + quiz
│           └── knn-svm.mdx             # 2x sandbox + quiz
├── lib/
│   ├── auth/                  # BetterAuth setup
│   ├── db/                    # Drizzle schema + migrations + queries
│   └── sandbox/               # Railway sandbox wrapper
├── drizzle/                   # BetterAuth schema
├── scripts/                   # Seeds
└── railway.json               # Railway deploy config
```

## Endpoints

| Endpoint | Auth | Método | Função |
|---|---|---|---|
| `/api/auth/sign-up/email` | - | POST | Sign-up com email/password |
| `/api/auth/sign-in/email` | - | POST | Login |
| `/api/auth/sign-out` | - | POST | Logout |
| `/api/auth/get-session` | - | GET | Sessão atual |
| `/api/exec` | required | POST | Roda código Python no sandbox |
| `/api/lessons/[id]/complete` | required | POST | Salva quiz_score |
| `/api/phases/[id]/certificate` | required | GET | PDF do certificado |

## Fluxo demo (MVP)

1. Abrir `/` (home)
2. Clicar "Criar conta" → `/signup` → criar conta
3. Redirect → `/courses`
4. Clicar no curso "IA para Devs"
5. Ver 3 lições na Fase 01
6. Abrir "Regressão Linear"
7. **Clicar ▶ Run** no SandboxRunner → sandbox da Railway roda `sklearn.LinearRegression` → output no terminal-style abaixo do editor
8. **Scrollar pra Quiz** → marcar respostas → "Enviar respostas"
9. Voltar pro curso → ver ✓ verde + contagem "1/3 concluídas"
10. Completar todas as 3 lições → botão "📄 Certificado" aparece → baixar PDF

## Phase status

- [x] Phase 0.1 — BetterAuth setup
- [x] Phase 0.2 — Repo bootstrap
- [x] Phase 0.3 — Next.js 16 scaffold
- [x] Phase 0.4 — Drizzle + Postgres local
- [x] Phase 0.5 — Link Railway + sandbox test
- [x] Phase 1 — Catálogo + curso + lição (MDX)
- [x] Phase 2 — Sandbox execution no browser (Monaco + railway)
- [x] Phase 3 — BetterAuth (signup/login, posts autenticados)
- [x] Phase 4 — Quiz interativo + indicador ✓ no curso
- [x] Phase 4.5 — Certificado PDF (pdf-lib) ao completar fase
- [x] Phase 6 — `<SandboxRunner>` em todas as 3 lições
- [ ] Phase 5 — Deploy Railway (decisões destrutivas — pausado)

Spec original: `../coding-tutor-tutorials/.hermes/plans/2026-08-01_012235-edu-platform-mvp.md`

## Status de testes

| Componente | Estado |
|---|---|
| Build (Next 16 + TS strict) | ✅ exit 0 |
| Lint (ESLint 9 + next config) | ✅ exit 0 |
| Sign-up via form (browser) | ✅ 201 + cookie |
| Login via form (browser) | ✅ 200 + session |
| Sandbox exec (browser Run) | ✅ `slope=2.00` em ~10s |
| Quiz → DB persist | ✅ Maria 1 licao com score 100, Marco 3 |
| PDF certificate | ✅ 1.4KB PDF válido (application/pdf) |

## Custos locais

- **Postgres local Docker:** $0 (porta 5434, dev)
- **Railway sandboxes:** Experimental feature, free até limites
- **BetterAuth:** self-hosted, $0
- **Next.js dev server:** local

## Próximos passos opcionais

- Phase 5: deploy Railway (criar service, configurar secrets, publicar)
- Adicionar mais cursos (LangChain, LLMs, etc)
- Warm pool de sandboxes (cache ~1 sandbox/user logado)
- Rate limiting no `/api/exec`
