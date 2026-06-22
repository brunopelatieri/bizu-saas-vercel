import {
  BarChart3,
  FileStack,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
};

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { href: "/dashboard/projetos", label: "Projetos", icon: FolderKanban },
  { href: "/dashboard/clientes", label: "Clientes", icon: Users },
  { href: "/dashboard/arquivos", label: "Arquivos", icon: FileStack },
  { href: "/dashboard/relatorios", label: "Relatórios", icon: BarChart3 },
];

export const dashboardBottomNavItems: DashboardNavItem[] = [
  { href: "/dashboard/configuracoes", label: "Configurações", icon: Settings },
];

export const dashboardTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/projetos": "Projetos",
  "/dashboard/clientes": "Clientes",
  "/dashboard/arquivos": "Arquivos",
  "/dashboard/relatorios": "Relatórios",
  "/dashboard/configuracoes": "Configurações",
};

export function dashboardTitleFromPath(pathname: string): string {
  return dashboardTitles[pathname] ?? "Dashboard";
}
