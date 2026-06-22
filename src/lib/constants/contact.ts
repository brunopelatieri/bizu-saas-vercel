import { siteConfig } from "@/lib/constants/navigation";

export type SocialBrand =
  | "github"
  | "gitlab"
  | "dockerHub"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "x"
  | "instagram"
  | "facebook"
  | "site";

export type SocialLink = {
  brand: SocialBrand;
  label: string;
  href: string;
};

/** Redes oficiais — ordem de exibição no rodapé (ícones). */
export const footerSocialLinks: SocialLink[] = [
  { brand: "github", label: "GitHub", href: siteConfig.links.github },
  { brand: "gitlab", label: "GitLab", href: siteConfig.links.gitlab },
  { brand: "linkedin", label: "LinkedIn", href: siteConfig.links.linkedin },
  { brand: "youtube", label: "YouTube", href: siteConfig.links.youtube },
  { brand: "tiktok", label: "TikTok", href: siteConfig.links.tiktok },
  { brand: "x", label: "X (Twitter)", href: siteConfig.links.x },
  { brand: "instagram", label: "Instagram", href: siteConfig.links.instagram },
  { brand: "facebook", label: "Facebook", href: siteConfig.links.facebook },
  { brand: "dockerHub", label: "Docker Hub", href: siteConfig.links.dockerHub },
  { brand: "site", label: "Site pessoal", href: siteConfig.links.site },
];

export type DirectContactChannel = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

/** Canais diretos — página de contato e rodapé. */
export const directContactChannels: DirectContactChannel[] = [
  {
    label: "E-mail",
    value: siteConfig.author.email,
    href: `mailto:${siteConfig.author.email}`,
    external: false,
  },
  {
    label: "WhatsApp",
    value: siteConfig.author.phone,
    href: siteConfig.links.whatsapp,
    external: true,
  },
  {
    label: "Localização",
    value: siteConfig.author.location,
  },
];

/** Canais de produção de conteúdo — página Sobre. */
export const contentProductionLinks: SocialLink[] = [
  { brand: "youtube", label: "YouTube", href: siteConfig.links.youtube },
  { brand: "tiktok", label: "TikTok", href: siteConfig.links.tiktok },
];

export const experienceSummary = `${siteConfig.author.experienceYears} anos de experiência (desde ${siteConfig.author.careerStart})`;
