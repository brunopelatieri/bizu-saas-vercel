import { SiteLogo } from "@/components/layout/site-logo";
import { DashboardNavLinks } from "@/components/layout/dashboard-nav-links";
import { DashboardUserFooter } from "@/components/layout/dashboard-user-footer";
import { siteConfig } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

type DashboardSidebarProps = {
  collapsed?: boolean;
  className?: string;
};

export function DashboardSidebar({
  collapsed = false,
  className,
}: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200",
        collapsed ? "w-[4.5rem]" : "w-64",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border px-3",
          collapsed ? "justify-center" : "px-4",
        )}
      >
        {collapsed ? (
          <img
            src={siteConfig.logo}
            alt={siteConfig.name}
            className="h-7 w-auto object-contain"
          />
        ) : (
          <SiteLogo size="sm" asLink={false} />
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <DashboardNavLinks collapsed={collapsed} />
      </div>

      <DashboardUserFooter collapsed={collapsed} />
    </aside>
  );
}
