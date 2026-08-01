# Edu Coding

Plataforma educacional textual-interativa no estilo Educative.io.

Catálogo inaugural: **Pós Tech — IA para Devs** (FIAP/Alura) — 360h, 10 meses, hands-on.

## Stack

- **Next.js 16** (App Router, RSC, MDX)
- **TypeScript 5.x** (strict)
- **Drizzle ORM** + **Postgres** (Railway)
- **BetterAuth** (self-hosted, schema-first)
- **Railway Sandboxes** (runtime Python efêmero)
- **Tailwind CSS** + **@tailwindcss/typography**
- **Monaco Editor** (in-browser code editor)
- **Zod** (runtime validation)
- **Vitest** (tests)

## Estrutura

```
edu-coding/
├── app/                       # Next.js App Router
├── components/                # React components
├── content/
│   └── lessons/               # MDX files (aulas)
├── lib/
│   ├── auth/                  # BetterAuth setup
│   ├── db/                    # Drizzle schema + migrations
│   └── sandbox/               # Railway sandbox wrapper
├── scripts/                   # Seeds, helpers
└── .hermes/plans/             # Specs (linkadas ao repo principal)
```

## Comandos

```bash
npm run dev          # dev server
npm run build        # production build
npm run test         # vitest
npm run db:generate  # gerar migração Drizzle
npm run db:migrate   # aplicar migrações
npm run db:seed      # seed do curso IA para Devs
```

## Status

- [x] Phase 0.1 — BetterAuth setup
- [x] Phase 0.2 — Repo bootstrap
- [ ] Phase 0.3 — Next.js 16 scaffold
- [ ] Phase 0.4 — Drizzle + Postgres
- [ ] Phase 1 — Catalogo + lição
- [ ] Phase 2 — Sandbox execution
- [ ] Phase 3 — Auth + progress
- [ ] Phase 4 — Quiz + certificação
- [ ] Phase 5 — Deploy
- [ ] Phase 6 — Polish

Spec completa: `../coding-tutor-tutorials/.hermes/plans/2026-08-01_012235-edu-platform-mvp.md`.
