export const site = {
  name: "Savia Café",
  descriptor: "Café de origen",
  tagline: "El origen, vivo.",
  description:
    "Savia Café. Café de especialidad de origen: tostado en pequeños lotes, preparado con intención. Madrid, Barcelona y Sevilla. Sitio demostrativo.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://savia.example",
  locale: "es",
  isDemo: true,
  contact: {
    email: "hola@savia.example",
    phone: "+34 900 000 000 (demo)",
  },
  social: [
    { id: "instagram", label: "Instagram", href: null },
    { id: "facebook", label: "Facebook", href: null },
    { id: "tiktok", label: "TikTok", href: null },
  ],
  nav: [
    { id: "inicio", label: "Inicio" },
    { id: "nuestro-cafe", label: "Nuestro café" },
    { id: "menu", label: "Menú" },
    { id: "origenes", label: "Orígenes" },
    { id: "experiencias", label: "Experiencias" },
    { id: "sostenibilidad", label: "Sostenibilidad" },
    { id: "ubicaciones", label: "Ubicaciones" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
