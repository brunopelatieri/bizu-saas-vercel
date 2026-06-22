import { NavLink } from "react-router";
import { navItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

type SiteNavLinksProps = {
  onNavigate?: () => void;
  variant?: "inline" | "stack";
  className?: string;
  "aria-label"?: string;
};

export function SiteNavLinks({
  onNavigate,
  variant = "inline",
  className,
  "aria-label": ariaLabel = "Principal",
}: SiteNavLinksProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        variant === "inline"
          ? "hidden items-center gap-6 md:flex"
          : "flex flex-col gap-1",
        className,
      )}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.href === "/"}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "text-sm transition",
              variant === "inline"
                ? isActive
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                : cn(
                    "rounded-lg px-3 py-2.5 font-medium",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  ),
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
