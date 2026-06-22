import type { ReactNode } from "react";
import {
  footerSocialLinks,
  type DirectContactChannel,
  type SocialLink,
} from "@/lib/constants/contact";
import {
  BrandIcon,
  ContactChannelIcon,
  socialIconButtonClass,
  socialLinkRowClass,
  type ContactChannel,
} from "@/components/icons/platform-icons";
import { cn } from "@/lib/utils";

const contactChannelMap: Record<string, ContactChannel> = {
  "E-mail": "email",
  WhatsApp: "whatsapp",
  Localização: "location",
};

type SocialIconLinksProps = {
  links?: SocialLink[];
  className?: string;
  iconClassName?: string;
};

/** Grid de ícones — rodapé e seções compactas. */
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
          className={socialIconButtonClass}
        >
          <BrandIcon brand={link.brand} className={iconClassName} />
        </a>
      ))}
    </div>
  );
}

type SocialLinksListProps = {
  links?: SocialLink[];
  className?: string;
};

/** Lista ícone + texto — contato e presença online. */
export function SocialLinksList({
  links = footerSocialLinks,
  className,
}: SocialLinksListProps) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {links.map((link) => (
        <li key={link.brand}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={socialLinkRowClass}
          >
            <BrandIcon brand={link.brand} className="size-4" />
            <span className="truncate">{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

type ContactLinksListProps = {
  channels: DirectContactChannel[];
  className?: string;
};

/** Canais diretos com ícones Lucide. */
export function ContactLinksList({
  channels,
  className,
}: ContactLinksListProps) {
  return (
    <ul className={cn("space-y-4 text-sm", className)}>
      {channels.map((channel) => {
        const iconChannel = contactChannelMap[channel.label];

        return (
          <li key={channel.label} className="flex items-start gap-3">
            {iconChannel ? (
              <ContactChannelIcon
                channel={iconChannel}
                className="mt-0.5 text-muted-foreground"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground">{channel.label}</p>
              {channel.href ? (
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className={cn(
                    "mt-0.5 flex items-center gap-2 truncate font-medium text-primary",
                    "transition-colors duration-200 hover:text-primary/80",
                  )}
                >
                  {channel.value}
                </a>
              ) : (
                <p className="mt-0.5 font-medium text-foreground">
                  {channel.value}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

type InlineSocialLinkProps = {
  link: SocialLink;
  children: ReactNode;
  className?: string;
};

/** Link inline com ícone — parágrafos da página Sobre. */
export function InlineSocialLink({
  link,
  children,
  className,
}: InlineSocialLinkProps) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline",
        "transition-colors duration-200 hover:text-primary/80",
        className,
      )}
    >
      <BrandIcon brand={link.brand} className="size-3.5" />
      {children}
    </a>
  );
}
