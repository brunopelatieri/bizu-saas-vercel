export const siteConfig = {
  name: "Bizu SaaS",
  description:
    "Boilerplate full-stack para criar SaaS, portais e sistemas web rápido, com metodologia de AI Software Engineering.",
  locale: "pt-BR",
  url: "https://bizu.bru.ia.br",
  logo: "/bizu_bru_ia.png",
  favicon: "/favicon.ico",
  screenshot: "/bizu_bru_ia_screenshot.webp",
  author: {
    name: "Bruno Pelatieri Goulart",
    displayName: "Bruno Pelatieri",
    role: "Enterprise Automation Architect • AI • DevOps • n8n Specialist",
    email: "brunopelatieri@gmail.com",
    phone: "+55 (19) 99249-6598",
    location: "Campinas, São Paulo, Brasil",
    experienceYears: "18+",
    careerStart: 2006,
    photo: "/bruno_pelatieri_goulart_bizu_bru_ia.webp",
  },
  links: {
    demo: "https://bizu.bru.ia.br",
    repo: "https://github.com/brunopelatieri/bizu-saas-vercel",
    repoVercel: "https://github.com/brunopelatieri/bizu-saas-vercel",
    site: "https://brunogoulart.com.br/",
    github: "https://github.com/brunopelatieri",
    gitlab: "https://gitlab.com/brunopelatieri",
    dockerHub: "https://hub.docker.com/u/brunopelatieri",
    linkedin: "https://www.linkedin.com/in/bruno-pelatieri-goulart/",
    youtube: "https://www.youtube.com/@devgalactico",
    x: "https://x.com/brunopelatieri",
    instagram: "https://www.instagram.com/brunopelatieri/",
    facebook: "https://www.facebook.com/bruno.pelatierigoulart",
    tiktok: "https://www.tiktok.com/@brunopelatieri",
    whatsapp: "https://wa.me/5519992496598",
  },
} as const;

export const navItems = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/projetos", label: "Projetos" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
] as const;

export type NavItem = (typeof navItems)[number];

/** @deprecated Prefer `footerSocialLinks` em `src/lib/constants/contact.ts` */
export const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "GitLab", href: siteConfig.links.gitlab },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "Site", href: siteConfig.links.site },
  { label: "YouTube", href: siteConfig.links.youtube },
  { label: "TikTok", href: siteConfig.links.tiktok },
  { label: "X", href: siteConfig.links.x },
  { label: "Instagram", href: siteConfig.links.instagram },
  { label: "Facebook", href: siteConfig.links.facebook },
  { label: "Docker Hub", href: siteConfig.links.dockerHub },
  { label: "WhatsApp", href: siteConfig.links.whatsapp },
] as const;
