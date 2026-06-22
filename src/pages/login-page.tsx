import { Link, Navigate } from "react-router";
import { Sparkles } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { SiteLogo } from "@/components/layout/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useAuth } from "@/providers/auth-provider";

const CODE_TEXTURE = [
  "const stack = ['React', 'Hono', 'Drizzle'];",
  "export async function ship(feature: Spec) {",
  "  await clarify(feature);",
  "  return implement(feature);",
  "}",
  "// AI Software Engineering",
  "type QueryClient = TanStackQuery;",
].join("\n");

export function LoginPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="dark flex min-h-svh items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="dark relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 py-10">
      <ThemeToggle className="absolute top-4 right-4 z-20" />

      {/* Cyber grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/4%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/4%)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_20%,transparent_100%)]"
      />

      {/* Code texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]"
      >
        <pre className="absolute -top-8 -left-8 w-[140%] rotate-[-8deg] font-mono text-[11px] leading-6 text-primary whitespace-pre-wrap select-none">
          {CODE_TEXTURE.repeat(12)}
        </pre>
      </div>

      {/* Glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.74_0.14_230/18%),transparent_65%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.16_280/12%),transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary"
          >
            <Sparkles className="size-3" />
            Engineering AI Design
          </Badge>
          <div className="flex justify-center">
            <SiteLogo size="lg" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Entre ou crie sua conta para acessar o dashboard
          </p>
        </div>

        {/* Border beam card */}
        <div className="relative rounded-2xl p-[1px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,oklch(0.74_0.14_230/0%)_0deg,oklch(0.74_0.14_230/70%)_120deg,oklch(0.72_0.16_280/70%)_240deg,oklch(0.74_0.14_230/0%)_360deg)] opacity-80 blur-[1px] animate-[spin_8s_linear_infinite]"
          />
          <div className="relative rounded-2xl border border-border/60 bg-card/90 p-6 shadow-2xl shadow-primary/5 backdrop-blur-xl sm:p-8">
            {!isSupabaseConfigured() ? (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
                <p className="font-medium text-amber-400">
                  Supabase não configurado
                </p>
                <p className="mt-1 text-muted-foreground">
                  Defina{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">
                    VITE_SUPABASE_URL
                  </code>{" "}
                  e{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">
                    VITE_SUPABASE_PUBLISHABLE_KEY
                  </code>{" "}
                  no{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">
                    .env.local
                  </code>
                  .
                </p>
              </div>
            ) : (
              <AuthForm />
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link
            to="/"
            className="text-primary underline-offset-4 transition hover:underline"
          >
            ← Voltar para o site
          </Link>
        </p>
      </div>
    </div>
  );
}
