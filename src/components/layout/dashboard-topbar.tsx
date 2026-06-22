import { Link } from "react-router";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardTopbarProps = {
  title?: string;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  onOpenMobileNav?: () => void;
  className?: string;
};

export function DashboardTopbar({
  title = "Dashboard",
  sidebarCollapsed = false,
  onToggleSidebar,
  onOpenMobileNav,
  className,
}: DashboardTopbarProps) {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between gap-3 overflow-hidden border-b border-border bg-background/95 px-3 backdrop-blur supports-backdrop-filter:bg-background/80 sm:px-4",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={onOpenMobileNav}
          aria-label="Abrir menu"
        >
          <Menu className="size-5" />
        </Button>

        {onToggleSidebar ? (
          <Button
            variant="ghost"
            size="icon"
            className="hidden shrink-0 md:inline-flex"
            onClick={onToggleSidebar}
            aria-label={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="size-4" />
            ) : (
              <PanelLeftClose className="size-4" />
            )}
          </Button>
        ) : null}

        <div className="flex min-w-0 shrink items-center md:hidden">
          <SiteLogo size="sm" asLink={false} className="max-w-[min(100%,9rem)]" />
        </div>

        <span className="hidden truncate text-sm font-semibold tracking-tight md:inline">
          {title}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          to="/"
          className="hidden text-xs text-muted-foreground transition hover:text-foreground sm:block"
        >
          Site público
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
