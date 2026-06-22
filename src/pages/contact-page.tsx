import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { SocialIconLinks } from "@/components/layout/social-icon-links";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  directContactChannels,
  footerSocialLinks,
} from "@/lib/constants/contact";
import { siteConfig } from "@/lib/constants/navigation";

const channelIcons = {
  "E-mail": Mail,
  WhatsApp: Phone,
  Localização: MapPin,
} as const;

export function ContactPage() {
  return (
    <>
      <PageHero
        title="Contato"
        description="Vamos conversar sobre seu próximo projeto de SaaS, automação com IA ou arquitetura full-stack."
      />
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <ContactForm />
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Canais diretos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm">
                  {directContactChannels.map((channel) => {
                    const Icon = channelIcons[channel.label as keyof typeof channelIcons];

                    return (
                      <li key={channel.label} className="flex gap-3">
                        {Icon ? (
                          <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <p className="text-muted-foreground">{channel.label}</p>
                          {channel.href ? (
                            <a
                              href={channel.href}
                              {...(channel.external
                                ? { target: "_blank", rel: "noreferrer" }
                                : {})}
                              className="block truncate font-medium text-primary transition hover:opacity-80"
                            >
                              {channel.value}
                            </a>
                          ) : (
                            <p className="font-medium text-foreground">
                              {channel.value}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Redes & presença online</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SocialIconLinks links={footerSocialLinks} />
                <p className="text-xs text-muted-foreground">
                  {siteConfig.author.displayName} · {siteConfig.author.location}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
