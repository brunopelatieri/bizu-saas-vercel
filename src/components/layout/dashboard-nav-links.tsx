import { NavLink } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  dashboardBottomNavItems,
  dashboardNavItems,
  type DashboardNavItem,
} from "@/lib/constants/dashboard-nav";

type DashboardNavLinksProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
  className?: string;
};

function NavItem({
  item,
  collapsed,
  onNavigate,
}: {
  item: DashboardNavItem;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  const link = (
    <NavLink
      to={item.href}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
          collapsed && "justify-center px-2",
        )
      }
    >
      <Icon className="size-4 shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );

  if (!collapsed) {
    return link;
  }

  return (
    <Tooltip>
      <TooltipTrigger>{link}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export function DashboardNavLinks({
  collapsed = false,
  onNavigate,
  className,
}: DashboardNavLinksProps) {
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {dashboardNavItems.map((item) => (
        <NavItem
          key={item.href}
          item={item}
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      ))}
      <div className="my-2 h-px bg-sidebar-border" />
      {dashboardBottomNavItems.map((item) => (
        <NavItem
          key={item.href}
          item={item}
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}
