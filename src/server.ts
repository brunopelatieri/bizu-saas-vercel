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

// /api/* antes do handler SSR (mesma origem, sem CORS).
app.route("/api", api);

app.all("*", (c) => requestHandler(c.req.raw));

export default app.fetch;
