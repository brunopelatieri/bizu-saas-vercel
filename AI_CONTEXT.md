# AI Context — Bizu SaaS

Este arquivo é o ponto de entrada rápido para qualquer LLM/AI Agent entender o
projeto antes de propor ou executar mudanças.

## Objetivo

Boilerplate full-stack para iniciar projetos rapidamente com metodologia de
**AI Software Engineering**: contexto explícito, decisões documentadas,
desenvolvimento guiado por especificação e stack moderna para entregar projetos
com velocidade, precisão e escalabilidade.

Projetos-alvo:

- SaaS
- portal de clientes
- site institucional
- landing page
- blog
- dashboard/admin
- sistemas web de aplicação

## Arquivos Que Devem Ser Lidos Primeiro

1. `AI_CONTEXT.md` — visão rápida e regras de atualização de contexto.
2. `PROJECT_TECHNICAL_SPEC.md` — especificação técnica completa.
3. `MIGRATION_NOTES.md` — decisões da migração para React Router Framework Mode.
4. `.specify/memory/constitution.md` — constituição SpecifyX.
5. `.cursor/rules/*.mdc` — regras operacionais do workspace.

## Arquitetura Atual

```text
React Router v7 Framework Mode (SSR global) + @vercel/react-router
  |
  |-- Rotas públicas com SSR: /, /sobre, /projetos, /contato, /blog, /blog/:slug
  |-- Rotas auth standalone: /login, /auth/callback
  `-- Dashboard client-only por convenção: /dashboard/**

Hono API no server entry (Web API / Vercel Functions):
  |-- src/server.ts
  `-- src/api/app.ts (/api/*)

Dados:
  |-- Drizzle ORM + postgres.js -> Neon Postgres (DATABASE_URL pooled)
  `-- Supabase auxiliar (Auth OAuth, Storage, Edge Functions, Realtime)

Deploy: Vercel (Production + Preview) — env vars abaixo
```

## Regras de Decisão

- Não reintroduzir `src/App.tsx`, `src/main.tsx`, `index.html` ou pasta `server/` legada.
- Não adicionar proxy `/api` no Vite; API e frontend compartilham origem.
- Não usar `supabase.from()` para CRUD da aplicação.
- Não colocar dados sensíveis do dashboard em `loader` server-side.
- Use `meta` nativo do React Router para SEO/Open Graph.
- Use loaders server-side para dados públicos indexáveis (blog, landing dinâmica).
- Use client-side fetching/TanStack Query para área autenticada.
- Use Zod para contratos de entrada de API e formulários.
- Use Drizzle migrations para mudanças de schema.
- `DATABASE_URL` na Vercel: Neon **Pooled** ([neon.com](https://neon.com/)).
- Auth: Supabase OAuth via `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`.

## Quando Atualizar Contexto

Atualize este arquivo e `PROJECT_TECHNICAL_SPEC.md` quando mudar:

- Arquitetura.
- Rotas.
- Stack ou dependências relevantes.
- Deploy/Vercel.
- Banco/schema.
- Regras de uso de Supabase.
- Estratégia de auth, billing, multi-tenant ou dashboard.
- Convenções de IA/SpecifyX.

Se a mudança afetar onboarding, atualize também `README.md`.
Se a mudança afetar agentes/LLMs, atualize também `.cursor/rules/`.

## Status Atual

- Produção: [https://bizu.bru.ia.br](https://bizu.bru.ia.br) — **Vercel** (deploy ok).
- Repositório: [bizu-saas-vercel](https://github.com/brunopelatieri/bizu-saas-vercel).
- **Env vars (Production + Preview na Vercel):**
  - `DATABASE_URL` — [Neon](https://neon.com/) connection string **Pooled**
  - `DIRECT_URL` — Neon **Direct** (migrations local/CI; não na Vercel)
  - `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase Auth OAuth
- React Router Framework Mode com `ssr: true` e preset `@vercel/react-router`.
- Hono montado em `src/server.ts` (entry Web API para Vercel Functions).
- Blog SSR com fonte estática em `src/lib/content/posts.ts`.
- Dashboard inicial protegido no cliente.
- TanStack Query Provider em `src/providers/query-provider.tsx` (QueryClient por instância via `useState`).
- Login premium com tabs Login/Cadastro, react-hook-form + Zod e sonner.
- Dashboard sidebar responsivo (desktop colapsável + mobile Sheet), avatar do usuário na base.
- Header público responsivo (`SiteHeader`): nav inline ≥ md; mobile hamburger + Sheet à direita.
- Tema dark/light com Zustand; **padrão dark** e script anti-flash.
- Sonner montado globalmente.

## Pendências Técnicas Conhecidas

- Evoluir blog estático para tabela Drizzle quando virar feature real.
- Criar schemas compartilhados adicionais conforme novos forms/APIs surgirem.
- Persistir telefone/nome do cadastro em tabela Drizzle além do `user_metadata` Supabase.
