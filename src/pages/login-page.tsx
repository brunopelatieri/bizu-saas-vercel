import { Link, Navigate } from "react-router";
import { Sparkles } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { SiteLogo } from "@/components/layout/site-logo";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/constants/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useAuth } from "@/providers/auth-provider";

const CODE_TEXTURE = [
  "const stack = ['React', 'Hono', 'Drizzle'];",
  "export async function ship(feature: Spec) {",
  "  await clarify(feature);",
  "  return implement(feature);",
  "}",
  "// AI Software Engineering",
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/3.5%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/3.5%)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_25%,transparent_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.035]"
      >
        <pre className="absolute inset-0 font-mono text-[10px] leading-5 text-primary whitespace-pre-wrap select-none">
          {CODE_TEXTURE.repeat(20)}
        </pre>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-20%] left-1/2 h-[480px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.74_0.14_230/14%),transparent_68%)] blur-3xl"
      />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
        <header className="mb-8 w-full text-center">
          <Badge
            variant="outline"
            className="mb-5 border-primary/25 bg-primary/5 px-3 py-1 text-primary"
          >
            <Sparkles className="size-3.5" />
            Engineering AI Design
          </Badge>
          <div className="flex flex-col items-center gap-3">
            <SiteLogo size="lg" asLink={false} />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {siteConfig.name.replace(" SaaS", "")}
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre ou crie sua conta para acessar o dashboard
              </p>
            </div>
          </div>
        </header>

        <div className="relative w-full">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-2xl bg-[linear-gradient(135deg,oklch(0.74_0.14_230/35%),oklch(0.72_0.16_280/25%),oklch(0.74_0.14_230/15%))] opacity-80 blur-sm"
          />

          <div className="relative w-full overflow-hidden rounded-2xl border border-border/50 bg-background/45 p-6 shadow-[0_0_40px_-12px_oklch(0.74_0.14_230/25%)] backdrop-blur-xl sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.74_0.14_230/60%),oklch(0.72_0.16_280/50%),transparent)]"
            />

            {!isSupabaseConfigured() ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
                <p className="font-medium text-amber-400">
                  Supabase não configurado
                </p>
                <p className="mt-2 text-muted-foreground">
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
