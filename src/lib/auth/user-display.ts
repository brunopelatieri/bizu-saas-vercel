import type { User } from "@supabase/supabase-js";

export function getUserDisplayName(user: User | null): string {
  if (!user) return "Usuário";

  const metadataName = user.user_metadata?.full_name;
  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }

  return user.email?.split("@")[0] ?? "Usuário";
}

export function getUserInitials(user: User | null): string {
  const name = getUserDisplayName(user);
  const parts = name.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

export function getUserAvatarUrl(user: User | null): string | undefined {
  const avatar = user?.user_metadata?.avatar_url;
  return typeof avatar === "string" ? avatar : undefined;
}
