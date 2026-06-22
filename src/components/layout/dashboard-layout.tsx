import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { DashboardNavLinks } from "@/components/layout/dashboard-nav-links";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { DashboardUserFooter } from "@/components/layout/dashboard-user-footer";
import { SiteLogo } from "@/components/layout/site-logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { dashboardTitleFromPath } from "@/lib/constants/dashboard-nav";

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { pathname } = useLocation();
  const title = dashboardTitleFromPath(pathname);

  return (
    <div className="flex h-svh overflow-hidden bg-background">
      <div className="hidden md:flex">
        <DashboardSidebar collapsed={collapsed} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardTopbar
          title={title}
          sidebarCollapsed={collapsed}
          onToggleSidebar={() => setCollapsed((value) => !value)}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="mb-6 text-2xl font-bold tracking-tight md:hidden">
            {title}
          </h1>
          <Outlet />
        </main>
      </div>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="flex h-full w-72 flex-col gap-0 p-0">
          <SheetHeader className="border-b border-border px-4 py-4">
            <SheetTitle className="flex items-center">
              <SiteLogo size="sm" asLink={false} />
            </SheetTitle>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            <DashboardNavLinks onNavigate={() => setMobileNavOpen(false)} />
          </div>
          <DashboardUserFooter />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default DashboardLayout;
