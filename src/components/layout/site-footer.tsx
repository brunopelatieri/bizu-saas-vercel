import { Link } from "react-router";
import { SiteLogo } from "@/components/layout/site-logo";
import {
  ContactLinksList,
  SocialIconLinks,
} from "@/components/layout/social-icon-links";
import { directContactChannels } from "@/lib/constants/contact";
import { navItems, siteConfig } from "@/lib/constants/navigation";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <SiteLogo size="md" asLink={false} />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              Navegação
            </p>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              Redes & contato
            </p>
            <SocialIconLinks className="mb-4" />
            <ContactLinksList channels={directContactChannels} />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {year} {siteConfig.author.name}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            {siteConfig.author.role}
          </p>
        </div>
      </div>
    </footer>
  );
}
