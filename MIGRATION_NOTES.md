# Migração para React Router v7 — Framework Mode + Vercel

Este documento descreve a evolução do projeto e o **estado atual** do template:

1. **SPA (Library Mode)** → **Framework Mode** (SSR global, route modules).
2. **Servidor Node long-running** (`react-router-hono-server`) → **deploy Vercel-only**
   (`@vercel/react-router` + server entry Web API).

Produção: **https://bizu.bru.ia.br** na Vercel. Repositório:
**https://github.com/brunopelatieri/bizu-saas-vercel**.

---

## 1. Resumo do que mudou

### Histórico (SPA → Framework Mode)

| Antes | Depois |
|-------|--------|
| Vite SPA + `index.html` + `main.tsx` + `<BrowserRouter>` em `App.tsx` | Framework Mode com `react-router.config.ts`, `src/root.tsx` e `src/routes.ts` |
| 2 processos em dev (Vite :5173 + Hono :3001) com proxy `/api` | 1 processo em dev (`react-router dev`), API e SSR na mesma origem |
| Sem SSR (crawlers não viam conteúdo) | SSR em runtime nas rotas públicas (`/`, `/blog`, `/blog/:slug`, etc.) |
| SEO/Open Graph inexistentes | `meta` nativa por rota, incluindo OG dinâmico por post |
| API Hono em `server/` via `@hono/node-server` | API Hono em `src/api/app.ts` |

### Estado atual (deploy Vercel)

| Antes (fase intermediária) | Agora |
|----------------------------|-------|
| `react-router-hono-server` + `node build/server/index.js` | `@vercel/react-router` preset + `src/server.ts` (Web API) |
| Dockerfile / docker-compose para runtime | Deploy exclusivo na Vercel (sem container da app) |
| Postgres local via Docker Compose | Postgres gerenciado + **connection pooler** (`DATABASE_URL`) |
| Script `npm start` | Removido — build via `npm run build`, runtime na Vercel |

> **Importante sobre "SSR por rota":** o React Router v7 **não** possui flag de
> SSR por rota. O flag `ssr` em `react-router.config.ts` é **global**. Para
> manter a área autenticada como SPA, as rotas `/dashboard/**` simplesmente
> **não têm `loader` de servidor** — o `ProtectedRoute` faz o gate no cliente e
> os dados são buscados no browser (Supabase). O shell do dashboard até passa
> pelo SSR (apenas o markup do layout), mas **nenhum dado sensível é
> serializado no HTML inicial**, que é exatamente o objetivo.

---

## 2. Decisões tomadas

1. **`ssr: true` global + dashboard client-only.** Atende SEO nas públicas e
   mantém a área logada sem SSR de dados sensíveis.
2. **Preset `@vercel/react-router`.** Bundle splitting e manifest em
   `.vercel/react-router-build-result.json` para Functions na Vercel.
3. **Server entry Web API (`src/server.ts`).** Hono montado em `/api`; demais
   rotas delegadas ao `createRequestHandler` do React Router — compatível com
   Vercel Functions (Fluid compute).
4. **Blog estático por enquanto.** Conteúdo em `src/lib/content/posts.ts`.
   Os `loader`s leem dele; ao migrar para o banco, troque o corpo de
   `getAllPosts`/`getPostBySlug` por queries Drizzle — os loaders rodam no
   runtime server-side (Vercel Function), sem volta HTTP interna.
5. **Postgres serverless.** `src/db/index.ts` usa pool enxuto (`max: 1`);
   `DATABASE_URL` em produção deve apontar para pooler (Neon, Supabase pooler,
   PgBouncer).

---

## 3. Arquivos principais

- `react-router.config.ts` — `appDirectory: "src"`, `ssr: true`, `presets: [vercelPreset()]`.
- `vite.config.ts` — `reactRouter()`; `rollupOptions.input: "./src/server.ts"` no build SSR.
- `src/server.ts` — entry Web API: `app.route("/api", api)` + `createRequestHandler`.
- `src/api/app.ts` — Hono com `/health` e `/contact` (montados em `/api/*`).
- `src/root.tsx` — documento raiz, `<Meta/>`, providers, tema anti-flash.
- `src/routes.ts` + `src/routes/*.tsx` — route modules (`meta`, `loader` quando necessário).
- `src/pages/*.tsx` — componentes de página importados pelas routes (sem alteração estrutural).
- `src/lib/content/posts.ts` — fonte estática do blog.

**Removidos (Vercel-only):** `Dockerfile`, `.dockerignore`, `docker-compose.yml`,
`react-router-hono-server`, `@hono/node-server`, script `npm start`.

---

## 4. Arquivos modificados na migração Framework Mode

- `package.json` — scripts `dev` / `build` / `typecheck`; dependência `@vercel/react-router`.
- `tsconfig.app.json` — `rootDirs` + include de `.react-router/types`.
- `tsconfig.node.json` — configs node-side.
- Layouts e `protected-route.tsx` — export `default`, imports de `react-router`.
- Imports `react-router-dom` → `react-router` (~14 arquivos).
- Componentes de landing — copy alinhada ao stack Vercel (fora de `src/pages/`).

---

## 5. Arquivos removidos (legado SPA / server/)

- `index.html`, `src/main.tsx`, `src/App.tsx`
- `server/main.ts`, `server/index.ts`, `server/routes/contact.ts`

---

## 6. Dependências

**Adicionadas:** `@react-router/dev` (dev), `@react-router/node`, `react-router`,
`@vercel/react-router`, `isbot`, `dotenv`.

**Removidas:** `react-router-hono-server`, `@hono/node-server`, `react-router-dom`,
`concurrently`, `tsx`.

---

## 7. CORS e mesma origem

Front e API compartilham origem via `src/server.ts` — não há proxy `/api` no Vite
e não há CORS em dev/produção. Se a API for exposta a outra origem (ex.: app
mobile), reintroduza `cors()` do Hono apenas nas rotas necessárias em
`src/api/app.ts`.

---

## 8. Comandos

```bash
# Desenvolvimento local (SSR + API + HMR — mesmo entry que produção)
npm run dev

# Type-check (gera tipos das rotas e roda tsc)
npm run typecheck

# Build de produção (artefatos + .vercel/react-router-build-result.json)
npm run build

# Migrations (local/CI — não roda no deploy Vercel)
npm run db:migrate
```

App em dev: **http://localhost:5173**

---

## 9. Variáveis de ambiente

| Variável | Onde | Uso |
|----------|------|-----|
| `DATABASE_URL` | Vercel + `.env.local` | Runtime Drizzle — use URL **pooled** na Vercel |
| `DIRECT_URL` | local/CI | `drizzle-kit` migrations |
| `VITE_SUPABASE_URL` | Vercel (build) | Auth/Storage no client |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Vercel (build) | Auth/Storage no client |

Em dev, copie `.env.example` → `.env.local`. Na Vercel, configure no painel
(Production + Preview).

---

## 10. Deploy (Vercel)

### Checklist

1. Importe o repositório na [Vercel](https://vercel.com) (Framework: **React Router**).
2. Node.js **22.x**.
3. Build command: `npm run build` (padrão; output gerenciado pelo preset).
4. Configure env vars (§9).
5. Rode `npm run db:migrate` com `DIRECT_URL` **antes** do formulário de contato em produção.
6. No Supabase, adicione **Redirect URLs**: `https://<dominio>/auth/callback`.

### Stack server (referência)

```text
react-router.config.ts  →  vercelPreset()
src/server.ts           →  export default app.fetch
src/api/app.ts          →  montado em /api
vite.config.ts          →  rollup input ./src/server.ts (SSR build)
```

Healthcheck: `GET /api/health`

### Postgres em serverless

- Migrations **fora** do deploy (local ou pipeline CI).
- Runtime usa pooler; evite conexões diretas sem pool em Functions.
- `src/db/index.ts`: `max: 1` por instância.

---

## 11. Como evoluir

- **Blog no banco:** tabela `posts` no Drizzle + migration; trocar corpo de
  `getAllPosts`/`getPostBySlug` em `src/lib/content/posts.ts`.
- **Proteção SSR por sessão:** leitura de sessão Supabase no `loader` de rota
  pública específica, se necessário — documentar o motivo.
- **Pré-render (SSG):** avaliar `prerender` em `react-router.config.ts` (muda
  trade-off de SSR dinâmico).
- **Preview deployments:** repetir env vars e redirect URLs Supabase para URLs de preview, se usar auth em preview.
