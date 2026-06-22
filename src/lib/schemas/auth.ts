import { z } from "zod";

const phoneDigits = z
  .string()
  .min(1, "Telefone celular é obrigatório")
  .transform((value) => value.replace(/\D/g, ""))
  .refine(
    (digits) => digits.length >= 10 && digits.length <= 11,
    "Informe um celular válido com DDD",
  );

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Informe seu nome completo"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  phone: phoneDigits,
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
