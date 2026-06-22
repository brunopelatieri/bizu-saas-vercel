import { useNavigate } from "react-router";
import { ExternalLink, LogOut, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  getUserInitials,
} from "@/lib/auth/user-display";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

type DashboardUserFooterProps = {
  collapsed?: boolean;
  className?: string;
};

export function DashboardUserFooter({
  collapsed = false,
  className,
}: DashboardUserFooterProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);
  const avatarUrl = getUserAvatarUrl(user);

  const avatar = (
    <Avatar size={collapsed ? "sm" : "default"}>
      {avatarUrl ? <AvatarImage src={avatarUrl} alt={displayName} /> : null}
      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
        {initials}
      </AvatarFallback>
    </Avatar>
  );

  const trigger = (
    <DropdownMenuTrigger
      className={cn(
        "outline-none",
        collapsed
          ? "inline-flex size-9 items-center justify-center rounded-lg hover:bg-sidebar-accent"
          : "flex h-auto w-full items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent",
      )}
    >
      {avatar}
      {!collapsed ? (
        <>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-medium">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
          <MoreHorizontal className="size-4 shrink-0 text-muted-foreground" />
        </>
      ) : null}
    </DropdownMenuTrigger>
  );

  const menu = (
    <DropdownMenu>
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger>{trigger}</TooltipTrigger>
          <TooltipContent side="right">{displayName}</TooltipContent>
        </Tooltip>
      ) : (
        trigger
      )}
      <DropdownMenuContent align="end" side="top" className="w-56">
        <DropdownMenuItem onClick={() => navigate("/")}>
          <ExternalLink />
          Site público
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            void signOut();
          }}
        >
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return <div className={cn("border-t border-sidebar-border p-2", className)}>{menu}</div>;
}
