import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";
import { contactMessageSchema } from "@/lib/schemas/contact";

/**
 * App Hono com a lógica de negócio da API.
 * Montado em `/api` em `src/server.ts` (Vercel Functions + dev local).
 */
export const api = new Hono();

api.get("/health", (c) => c.json({ ok: true }));

api.post(
  "/contact",
  zValidator("json", contactMessageSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error:
            result.error.issues[0]?.message ?? "Preencha todos os campos.",
        },
        400,
      );
    }
  }),
  async (c) => {
    const body = c.req.valid("json");

    try {
      await getDb().insert(contactMessages).values(body);
    } catch {
      return c.json(
        {
          error:
            "Falha ao salvar. Verifique DATABASE_URL e as migrations do Drizzle.",
        },
        500,
      );
    }

    return c.json({ ok: true });
  },
);
