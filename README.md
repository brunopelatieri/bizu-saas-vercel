# Bizu SaaS

**Bizu SaaS** é um boilerplate full-stack para começar projetos web rápido, com
base robusta, documentação viva e fluxo pensado para desenvolvimento com
**AI Software Engineering**.

Ele serve para criar SaaS, portais de clientes, sites institucionais, landing
pages, blogs, dashboards/admin e sistemas web de aplicação sem começar do zero.

## Demo

**URL:** [https://bizu.bru.ia.br](https://bizu.bru.ia.br)

Deploy exclusivo na **Vercel** com React Router v7 Framework Mode, preset
`@vercel/react-router` e SSR via Vercel Functions.

## O Que Vem Pronto

- Landing page responsiva, blog com SSR, páginas públicas e meta tags.
- Login com Supabase Auth e dashboard/admin client-side.
- API Hono no server entry (mesma origem que o SSR).
- Postgres próprio via Drizzle ORM (connection pooler recomendado).
- Base visual com shadcn/ui, Tailwind v4, tema claro/escuro e componentes prontos.
- Estrutura de contexto para agentes de IA entenderem o projeto antes de mexer.

## Resumo Técnico 80/20

```text
React Router v7 + @vercel/react-router (SSR via Functions)
  |
  |-- /api/*              Hono API -> Drizzle -> Postgres
  |-- /, /sobre, /blog    rotas públicas com SSR e SEO
  |-- /login              Supabase Auth
  `-- /dashboard/**       client-side, sem loader sensível no servidor
```

Stack principal: **React 19**, **TypeScript**, **React Router v7**, **Vite**,
**Tailwind v4**, **shadcn/ui**, **Hono**, **Drizzle**, **Postgres**, **Supabase
Auth/Storage**, **Zod**, **Zustand**, **TanStack Query**, **React Hook Form**,
**Stripe**, **Nodemailer** e **Vercel**.

## Metodologia Sugerida

Este template foi pensado para trabalhar com humanos e agentes de IA no mesmo
fluxo. A ideia é aplicar **AI Software Engineering**: especificar antes de
implementar, manter contexto técnico vivo e deixar decisões importantes
documentadas.

Antes de pedir mudanças para uma IA ou abrir uma feature relevante, leia primeiro:

- `AI_CONTEXT.md` — visão rápida e regras de atualização de contexto.
- `PROJECT_TECHNICAL_SPEC.md` — especificação técnica completa.
- `MIGRATION_NOTES.md` — decisões da migração para React Router Framework Mode.
- `.specify/memory/constitution.md` — princípios de desenvolvimento SpecifyX.

## Como Clonar e Rodar

```bash
git clone https://github.com/brunopelatieri/bizu-saas-vercel.git
cd bizu-saas-vercel

npm install
cp .env.example .env.local
# Configure DATABASE_URL (Postgres com pooler) e VITE_SUPABASE_*

npm run db:migrate
npm run dev
```

App em desenvolvimento:

```text
http://localhost:5173
```

## Deploy na Vercel

1. Importe o repositório na [Vercel](https://vercel.com).
2. Framework Preset: **React Router** (detectado automaticamente com o preset).
3. Node.js: **22.x**.
4. Configure as variáveis de ambiente (Production e Preview):

| Variável | Obrigatória | Observação |
|----------|-------------|------------|
| `DATABASE_URL` | Sim | URL **pooled** (Neon, Supabase pooler, PgBouncer) |
| `DIRECT_URL` | Migrations | Usada localmente/CI com `drizzle-kit` |
| `VITE_SUPABASE_URL` | Sim | Necessária no build |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Sim | Necessária no build |

5. No Supabase, adicione a URL de produção em **Redirect URLs**:
   `https://seu-dominio.vercel.app/auth/callback`
6. Rode migrations contra o Postgres de produção **antes** do primeiro deploy
   com formulário de contato (`npm run db:migrate` com `DIRECT_URL` apontando
   para o banco).

Build command: `npm run build` (padrão). Output gerenciado pelo preset Vercel.

## Variáveis Principais

- `DATABASE_URL` — conexão runtime com Postgres (use pooler na Vercel).
- `DIRECT_URL` — conexão usada pelo Drizzle Kit/migrations.
- `VITE_SUPABASE_URL` — URL pública do projeto Supabase.
- `VITE_SUPABASE_PUBLISHABLE_KEY` — chave pública do Supabase.

## Scripts Úteis

```bash
npm run dev          # dev server: React Router + Hono
npm run build        # build de produção (Vercel)
npm run typecheck    # typegen + TypeScript
npm run db:generate  # gera migrations Drizzle
npm run db:migrate   # aplica migrations
npm run db:studio    # abre Drizzle Studio
```

## Documentação

- `AI_CONTEXT.md` — o que faz, para quem é e como agentes devem se orientar.
- `PROJECT_TECHNICAL_SPEC.md` — arquitetura, stack, rotas, deploy e decisões.
- `MIGRATION_NOTES.md` — histórico técnico da migração para SSR + Vercel.
- `.cursor/rules/` — regras persistentes para agentes no Cursor.

## Autor

**Bruno Pelatieri Goulart**  
Enterprise Automation Architect • AI • DevOps • n8n Specialist
