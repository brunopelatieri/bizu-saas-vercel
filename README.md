# Bizu SaaS

**Bizu SaaS** é um boilerplate full-stack para começar projetos web rápido, com base robusta, documentação viva e fluxo pensado para desenvolvimento com **AI Software Engineering**.

Ele serve para criar SaaS, portais de clientes, sites institucionais, landing pages, blogs, dashboards/admin e sistemas web de aplicação sem começar do zero.

---

## 📋 Índice

- [Bizu SaaS](#bizu-saas)
  - [📋 Índice](#-índice)
  - [Demo](#demo)
  - [O Que Vem Pronto](#o-que-vem-pronto)
  - [Resumo Técnico 80/20](#resumo-técnico-8020)
  - [Metodologia Sugerida](#metodologia-sugerida)
  - [Como Clonar e Rodar](#como-clonar-e-rodar)
  - [Deploy na Vercel](#deploy-na-vercel)
  - [Variáveis Principais](#variáveis-principais)
  - [Scripts Úteis](#scripts-úteis)
  - [Documentação](#documentação)
  - [Autor](#autor)

---

## Demo

**URL:** [https://bizu.bru.ia.br](https://bizu.bru.ia.br)

Deploy exclusivo na **Vercel** com React Router v7 Framework Mode, preset `@vercel/react-router` e SSR via Vercel Functions.

**Produção configurada:** Postgres [Neon](https://neon.com/) + Auth OAuth Supabase (env vars em Production e Preview na Vercel).

---

## O Que Vem Pronto

- Landing page responsiva, blog com SSR, páginas públicas e meta tags
- Login com Supabase Auth e dashboard/admin client-side
- API Hono no server entry (mesma origem que o SSR)
- Postgres próprio via Drizzle ORM (connection pooler recomendado)
- Base visual com shadcn/ui, Tailwind v4, tema claro/escuro e componentes prontos
- Estrutura de contexto para agentes de IA entenderem o projeto antes de mexer

---

## Resumo Técnico 80/20

```text
React Router v7 + @vercel/react-router (SSR via Functions)
  |
  |-- /api/*              Hono API -> Drizzle -> Postgres
  |-- /, /sobre, /blog    rotas públicas com SSR e SEO
  |-- /login              Supabase Auth
  `-- /dashboard/**       client-side, sem loader sensível no servidor
```

**Stack principal:** React 19, TypeScript, React Router v7, Vite, Tailwind v4, shadcn/ui, Hono, Drizzle, Postgres, Supabase Auth/Storage, Zod, Zustand, TanStack Query, React Hook Form, Stripe, Nodemailer e Vercel.

---

## Metodologia Sugerida

Este template foi pensado para trabalhar com humanos e agentes de IA no mesmo fluxo. A ideia é aplicar **AI Software Engineering**: especificar antes de implementar, manter contexto técnico vivo e deixar decisões importantes documentadas.

Antes de pedir mudanças para uma IA ou abrir uma feature relevante, leia primeiro:

| Documento | Quando consultar |
|---|---|
| `AI_CONTEXT.md` | Visão rápida e regras de atualização de contexto |
| `PROJECT_TECHNICAL_SPEC.md` | Especificação técnica completa |
| `MIGRATION_NOTES.md` | Decisões da migração para React Router Framework Mode |
| `.specify/memory/constitution.md` | Princípios de desenvolvimento SpecifyX |

---

## Como Clonar e Rodar

```bash
git clone https://github.com/brunopelatieri/bizu-saas-vercel.git
cd bizu-saas-vercel

npm install
cp .env.example .env.local
# Configure Neon (Pooled + Direct) e VITE_SUPABASE_* (OAuth)

npm run db:migrate
npm run dev
```

App em desenvolvimento:

```text
http://localhost:5173
```

---

## Deploy na Vercel

1. Importe o repositório na [Vercel](https://vercel.com)
2. Framework Preset: **React Router** (detectado automaticamente com o preset)
3. Node.js: **22.x**
4. Configure as variáveis de ambiente em **Production** e **Preview** (mesmas chaves):

| Variável | Obrigatória | Fonte / observação |
|---|---|---|
| `DATABASE_URL` | Sim | [Neon](https://neon.com/) — connection string **Pooled** (runtime Drizzle na Vercel) |
| `DIRECT_URL` | Migrations | Neon — connection string **Direct** (local/CI; não precisa na Vercel) |
| `VITE_SUPABASE_URL` | Sim | Supabase → Project Settings → API (OAuth no client) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Sim | Supabase → publishable key (build Vite) |

> **Neon:** Console → seu projeto → **Connection Details** → copie *Pooled* para `DATABASE_URL` e *Direct* para `DIRECT_URL` (migrations).

> **Supabase OAuth:** Authentication → URL Configuration → **Redirect URLs**:
> `https://bizu.bru.ia.br/auth/callback`
> (e URLs de preview `https://*.vercel.app/auth/callback`, se necessário)

5. Rode migrations contra o Neon **antes** do formulário de contato em produção:

   ```bash
   # .env.local com DIRECT_URL = Neon Direct
   npm run db:migrate
   ```

6. Build command: `npm run build` (padrão). Output gerenciado pelo preset Vercel.

---

## Variáveis Principais

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | Neon **Pooled** (runtime na Vercel e dev local) |
| `DIRECT_URL` | Neon **Direct** (migrations com `drizzle-kit`) |
| `VITE_SUPABASE_URL` | URL do projeto Supabase (OAuth) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave pública Supabase (build Vite) |

---

## Scripts Úteis

```bash
npm run dev          # dev server: React Router + Hono
npm run build        # build de produção (Vercel)
npm run typecheck    # typegen + TypeScript
npm run db:generate  # gera migrations Drizzle
npm run db:migrate   # aplica migrations
npm run db:studio    # abre Drizzle Studio
```

---

## Documentação

| Arquivo | Conteúdo |
|---|---|
| `AI_CONTEXT.md` | O que faz, para quem é e como agentes devem se orientar |
| `PROJECT_TECHNICAL_SPEC.md` | Arquitetura, stack, rotas, deploy e decisões |
| `MIGRATION_NOTES.md` | Histórico técnico da migração para SSR + Vercel |
| `.cursor/rules/` | Regras persistentes para agentes no Cursor |

---

## Autor

**Bruno Pelatieri Goulart**
Enterprise Automation Architect • AI • DevOps • n8n Specialist