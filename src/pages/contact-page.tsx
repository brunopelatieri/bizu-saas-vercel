import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import {
  ContactLinksList,
  SocialIconLinks,
  SocialLinksList,
} from "@/components/layout/social-icon-links";
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
                <ContactLinksList channels={directContactChannels} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Redes & presença online</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <SocialIconLinks links={footerSocialLinks} />
                <SocialLinksList links={footerSocialLinks} />
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{siteConfig.author.displayName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{siteConfig.author.location}</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
