import { BrandIcon } from "@/components/icons/brand-icons";
import {
  footerSocialLinks,
  type SocialLink,
} from "@/lib/constants/contact";
import { cn } from "@/lib/utils";

type SocialIconLinksProps = {
  links?: SocialLink[];
  className?: string;
  iconClassName?: string;
};

export function SocialIconLinks({
  links = footerSocialLinks,
  className,
  iconClassName,
}: SocialIconLinksProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <a
          key={link.brand}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          title={link.label}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:border-primary/40 hover:bg-muted hover:text-primary"
        >
          <BrandIcon brand={link.brand} className={iconClassName} />
        </a>
      ))}
    </div>
  );
}
