import { config } from "dotenv";
import { Hono } from "hono";
import { createRequestHandler } from "react-router";
import { api } from "@/api/app";

// Em desenvolvimento, carrega variáveis do .env.local (DATABASE_URL etc.).
// Na Vercel as variáveis são injetadas pelo painel do projeto.
if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.local" });
  config();
}

// @ts-expect-error — virtual module gerado pelo React Router no build
import * as build from "virtual:react-router/server-build";

const requestHandler = createRequestHandler(build);

const app = new Hono();

// Aliases de healthcheck (monitores costumam usar /health ou Spring /actuator/health).
const health = () => new Response(JSON.stringify({ ok: true }), {
  status: 200,
  headers: { "Content-Type": "application/json" },
});
app.get("/health", health);
app.get("/actuator/health", health);

// /api/* antes do handler SSR (mesma origem, sem CORS).
app.route("/api", api);

// Preflight de scanners — evita "Invalid request method OPTIONS" no RR.
app.options("*", () => new Response(null, { status: 204 }));

app.all("*", async (c) => {
  try {
    return await requestHandler(c.req.raw);
  } catch (error) {
    // RR lança em rotas inexistentes; retorna 404 limpo sem stack trace nos logs.
    if (error instanceof Error) {
      if (error.message.startsWith("No route matches URL")) {
        return c.body(null, 404);
      }
      if (error.message.startsWith("Invalid request method")) {
        return c.body(null, 405);
      }
    }
    throw error;
  }
});

export default app.fetch;
