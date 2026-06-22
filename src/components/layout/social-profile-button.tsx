import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/icons/platform-icons";
import type { SocialLink } from "@/lib/constants/contact";
import { cn } from "@/lib/utils";

type SocialProfileButtonProps = {
  link: SocialLink;
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
};

/** Botão de perfil social com ícone — hero da página Sobre. */
export function SocialProfileButton({
  link,
  variant = "outline",
  className,
}: SocialProfileButtonProps) {
  return (
    <a href={link.href} target="_blank" rel="noreferrer">
      <Button variant={variant} className={cn("gap-2", className)}>
        <BrandIcon brand={link.brand} className="size-4" />
        {link.label}
      </Button>
    </a>
  );
}
