import { Link } from "react-router";
import { useState } from "react";
import { Menu } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { SiteNavLinks } from "@/components/layout/site-nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

type SiteHeaderAuthActionsProps = {
  onNavigate?: () => void;
  layout?: "inline" | "stack";
};

function SiteHeaderAuthActions({
  onNavigate,
  layout = "inline",
}: SiteHeaderAuthActionsProps) {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div
        className={cn(
          "flex items-center gap-3",
          layout === "stack" && "mt-4 w-full flex-col",
        )}
      >
        <Link to="/dashboard" className={layout === "stack" ? "w-full" : undefined}>
          <Button
            size="sm"
            className={layout === "stack" ? "w-full" : undefined}
            onClick={onNavigate}
          >
            Dashboard
          </Button>
        </Link>
        {isSupabaseConfigured() ? (
          <Button
            variant="ghost"
            size="sm"
            className={layout === "stack" ? "w-full" : undefined}
            onClick={() => {
              onNavigate?.();
              void signOut();
            }}
          >
            Sair
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <Link to="/login" className={layout === "stack" ? "mt-4 block w-full" : undefined}>
      <Button
        size="sm"
        className={layout === "stack" ? "w-full" : undefined}
        onClick={onNavigate}
      >
        Entrar
      </Button>
    </Link>
  );
}

export function SiteHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 overflow-hidden border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-3 sm:px-6">
        <SiteLogo size="md" className="min-w-0 max-w-[min(100%,10rem)] sm:max-w-none" />

        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <SiteNavLinks variant="inline" />
          <ThemeToggle />
          <div className="hidden items-center gap-3 md:flex">
            <SiteHeaderAuthActions />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-72 flex-col gap-0 p-0 sm:max-w-xs"
        >
          <SheetHeader className="border-b border-border px-4 py-4">
            <SheetTitle className="flex items-center">
              <SiteLogo size="sm" asLink={false} />
            </SheetTitle>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <SiteNavLinks
              variant="stack"
              aria-label="Menu mobile"
              onNavigate={() => setMobileNavOpen(false)}
            />
            <SiteHeaderAuthActions
              layout="stack"
              onNavigate={() => setMobileNavOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
