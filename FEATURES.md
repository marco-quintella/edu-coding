# Backlog de Features — Edu Coding

Lista para avaliação e priorização. Nenhum item é compromisso — apenas opções.

---

## 🟢 Prontas pra começar (baixo esforço, alto impacto)

| # | Feature | Descrição | Esforço |
|---|---------|-----------|---------|
| 1 | **Dashboard do aluno** | Página `/dashboard` com progresso geral, curso atual, últimas lições, certificados. | Médio |
| 2 | **Mais lições na Fase 02** | Expandir "IA para Devs" com lições de NLP, embeddings, fine-tuning. | Conteúdo |
| 3 | **Meta tags / SEO** | Open Graph, description, Twitter cards em todas as páginas. | Baixo |
| 4 | **Favicon + manifest** | PWA básico: ícones, cor do tema, `manifest.json`. | Baixo |
| 5 | **404 customizado** | Página de erro amigável com links úteis. | Baixo |

## 🟡 Médio prazo (precisam de mais design/dev)

| # | Feature | Descrição | Esforço |
|---|---------|-----------|---------|
| 6 | **Dark mode completo** |ThemeProvider já existe — falta consistência em todos os componentes + toggle visível. | Médio |
| 7 | **Responsividade mobile** | Nav hamburger, cards responsivos, sidebar colapsável no mobile. | Médio |
| 8 | **Busca de lições** | Full-text search nas lições (Drizzle + Postgres `tsvector`). | Médio |
| 9 | **Notas do aluno** | Bloco de anotações pessoal por lição (salvo no DB). | Médio |
| 10 | **Bookmark/favoritos** | Marcar lições para revisar depois. | Médio |
| 11 | **Tempo de estudo** | Tracker de tempo gasto por lição (client-side timer → API). | Médio |
| 12 | **Ranking / leaderboard** | Top alunos por quizzes acertados ou lições concluídas. | Médio |
| 13 | **Certificado compartilhável** | Link público + badge para LinkedIn. | Médio |

## 🔴 Longo prazo (maior complexidade)

| # | Feature | Descrição | Esforço |
|---|---------|-----------|---------|
| 14 | **Novo curso: "Python para Data Science"** | Segundo curso no catálogo, validando a estrutura multi-curso. | Alto (conteúdo) |
| 15 | **Sistema de discusses/comentários** | Comentários por lição, threading, notificações. | Alto |
| 16 | **Admin panel** | CRUD de cursos/fases/lições via UI (sem depender de seed SQL). | Alto |
| 17 | **Email transacional** | Boas-vindas, certificado pronto, progresso semanal. | Alto |
| 18 | **App mobile (PWA ou RN)** | Experiência nativa com offline para lições já baixadas. | Alto |
| 19 | **AI tutor integrado** | Chat contextual com a lição atual (RAG sobre o conteúdo MDX). | Alto |
| 20 | **Paginação / infinite scroll** | Catálogo e listas com muitos cursos/lições. | Médio |

---

## Critérios de priorização

- **Impacto no usuário**: o quanto melhora a experiência de aprendizado
- **Esforço de implementação**: tempo e complexidade técnica
- **Dependências**: precisa de infra extra? muda schema? quebra API?
- **Validação**: precisa de feedback do usuário antes de investir?

> Última atualização: 2026-08-03
