# Plan de implementación congelado — Savia Café

Coordinador: Fable 5. Implementación: agentes Haiku A–F en paralelo (A primero).
Este documento es el CONTRATO. Ningún agente modifica archivos fuera de su propiedad.
Referencias obligatorias: docs/reference/brief.md, docs/visual-audit.md,
docs/design-system.md, docs/motion-spec.md, docs/accessibility-responsive.md,
docs/image-manifest.json.

## Decisiones congeladas (resuelven contradicciones de los análisis)

1. `Reveal.tsx` y `Stagger.tsx` los crea el Agente A (todos dependen de ellos).
   El Agente F solo crea `ParallaxElement.tsx` y overlays.
2. `ReservationDialog` lo crea el Agente E usando la primitiva `Dialog` del Agente A.
3. `Button` NO usa motion: hover/active con CSS puro (`hover:scale-[1.015]
   active:scale-[0.985] transition`), así sigue siendo server-compatible.
4. Header compacto: transición CSS de altura via clase condicional, no animar padding
   con Motion (regla transform/opacity).
5. Stagger: usar `StaggerGroup` + `StaggerItem`; NO combinar con delay custom por índice.
6. Tokens: los nombres del design-system (`espresso, cacao, marfil, fondo, arena,
   beige-seccion, hoja, cta, terracota, texto`) son definitivos. Clases:
   `bg-espresso`, `text-texto`, `bg-beige-seccion`, etc.
7. Imágenes: TODAS via `SmartImage` (server component que usa next/image si el archivo
   existe en public/ y si no renderiza `ImagePlaceholder` con el mismo aspect-ratio).
8. Marco exterior y altura de header como variables CSS `--frame` y `--header-h`
   (responsive via media queries en globals.css). Header `fixed` con
   `top/left/right: var(--frame)`. Secciones con `scroll-margin-top`.
9. Precios en EUR (mercado España: Madrid/Barcelona/Sevilla), formato "4,50 €"
   via helper `formatPrice` en lib.
10. Un solo `h1` (hero). Cada sección `<section id aria-labelledby>` con `h2`.

## Estructura y propiedad de archivos

| Archivo | Propietario |
|---|---|
| src/app/layout.tsx, globals.css, sitemap.ts, robots.ts | A |
| src/config/site.ts | A |
| src/data/types.ts | A |
| src/lib/cn.ts, lib/motion.ts, lib/format.ts, lib/hooks.ts | A |
| src/components/ui/Button.tsx, Container.tsx, SectionHeading.tsx, Badge.tsx, Input.tsx, IconButton.tsx, SmartImage.tsx, ImagePlaceholder.tsx, Dialog.tsx | A |
| src/components/layout/SiteFrame.tsx | A |
| src/components/motion/Reveal.tsx, Stagger.tsx | A |
| src/components/layout/Header.tsx, MobileMenu.tsx | B |
| src/components/sections/Hero.tsx, FeaturedCoffee.tsx | B |
| src/components/cards/CoffeeCard.tsx, src/data/coffees.ts | B |
| src/components/sections/Story.tsx, Origins.tsx, CoffeeProcess.tsx | C |
| src/data/origins.ts, process.ts | C |
| src/components/sections/CafeMenu.tsx, Sustainability.tsx, ExperienceGallery.tsx | D |
| src/data/menu.ts, sustainability.ts, gallery.ts | D |
| src/components/sections/Locations.tsx, Testimonials.tsx, Newsletter.tsx | E |
| src/components/layout/Footer.tsx | E |
| src/components/cards/LocationCard.tsx, TestimonialCard.tsx | E |
| src/components/overlays/ReservationDialog.tsx | E |
| src/data/locations.ts, testimonials.ts | E |
| src/lib/validation.ts | E |
| src/components/motion/ParallaxElement.tsx | F |
| src/components/overlays/SearchOverlay.tsx, ShoppingDrawer.tsx, AccountPanel.tsx | F |
| tests/*, playwright.config.ts, docs/quality-checklist.md | F |
| src/app/page.tsx (integración final) | Coordinador |

## Contratos de módulos compartidos (API exacta — no desviarse)

### src/lib/cn.ts
```ts
export function cn(...classes: Array<string | false | null | undefined>): string
```

### src/lib/format.ts
```ts
export function formatPrice(eur: number): string   // 4.5 -> "4,50 €"
```

### src/lib/motion.ts  (client-safe, sin "use client"; solo constantes y variants)
```ts
import type { Variants } from "motion/react";
export const EASE: [number, number, number, number]  // [0.22, 1, 0.36, 1]
export const DUR = { fast: 0.3, base: 0.65 }
export const VIEWPORT = { once: true, margin: "-80px" as const }
export const fadeUp: Variants      // hidden {opacity 0, y 24} / visible {opacity 1, y 0, dur base, EASE}
export const fadeIn: Variants
export const staggerContainer: Variants  // visible: { transition: { staggerChildren: 0.08 } }
```

### src/lib/hooks.ts  ("use client")
```ts
export function useScrollLock(locked: boolean): void
export function useFocusTrap<T extends HTMLElement>(active: boolean): RefObject<T | null>
  // atrapa Tab/Shift+Tab dentro del ref, guarda y restaura el foco al desactivarse
export function useEscape(active: boolean, onClose: () => void): void
export function usePrefersReducedMotion(): boolean
```

### src/components/motion/Reveal.tsx  ("use client")
```ts
export function Reveal(props: { children; className?; delay?: number; as?: "div"|"section"|"li"; }): JSX
// whileInView fadeUp, respeta usePrefersReducedMotion (sin y-shift si reduce)
```

### src/components/motion/Stagger.tsx  ("use client")
```ts
export function StaggerGroup({ children, className? }): JSX   // container variants
export function StaggerItem({ children, className? }): JSX    // fadeUp item
```

### src/components/ui/Button.tsx  (server-compatible, CSS hover)
```ts
type ButtonProps = {
  variant?: "primary" | "outline" | "ghost";   // primary = bg-cta text-espresso
  size?: "md" | "lg";
  href?: string;            // si existe renderiza <a> (o Link si empieza por "/")
  className?; children; } & (atributos nativos de button/a)
export function Button(...)
```
primary: pastilla verde, texto espresso, uppercase label (12-13px, tracking 0.15em).
outline: borde 1px espresso/30, texto espresso, hover bg espresso + texto marfil.
ghost: sin borde, subrayado animado.

### src/components/ui/Container.tsx (server)
```ts
export function Container({ children, className?, as? }): JSX
// mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-16 xl:px-20
```

### src/components/ui/SectionHeading.tsx (server)
```ts
export function SectionHeading({ id?, eyebrow?, title, intro?, align = "center" }): JSX
// eyebrow: label verde hoja uppercase; title: h2 con id para aria-labelledby; intro: párrafo secundario
```

### src/components/ui/Badge.tsx (server)
```ts
export function Badge({ children, variant = "neutral" }): JSX  // "terracota" | "hoja" | "neutral"
```

### src/components/ui/Input.tsx (client-compatible, sin "use client" propio)
```ts
type InputProps = { label: string; id: string; error?: string; hint?: string } & InputHTMLAttributes
export function Input(...)  // label visible, aria-invalid, aria-describedby -> error id, React 19 ref-as-prop
```

### src/components/ui/IconButton.tsx (server-compatible)
```ts
export function IconButton({ label, children, className?, ...rest }): JSX
// <button> 44x44 min, aria-label=label, icono aria-hidden
```

### src/components/ui/SmartImage.tsx  (SERVER ONLY — usa node:fs; no importar desde client components)
```ts
export function SmartImage({ src, alt, width, height, sizes?, priority?, className?, imgClassName? }): JSX
// Si existe public/<src>: <Image>. Si no: <ImagePlaceholder> con mismas proporciones y alt.
```
REGLA: los client components (carruseles) reciben las imágenes YA renderizadas como
ReactNode desde el server component padre (patrón children/slots), nunca importan SmartImage.

### src/components/ui/ImagePlaceholder.tsx (server-compatible)
```ts
export function ImagePlaceholder({ alt, aspectClass?, className?, label? }): JSX
// bloque bg-arena con textura sutil, icono Coffee de lucide aria-hidden, texto pequeño
// opcional con la ruta esperada. role="img" aria-label=alt.
```

### src/components/ui/Dialog.tsx  ("use client")
```ts
export function Dialog({ open, onClose, title, children, footer?, size? }): JSX
// role="dialog" aria-modal aria-labelledby, portal no necesario (render condicional),
// AnimatePresence fade+y, useFocusTrap, useScrollLock, useEscape, botón cerrar X
// (IconButton), click en backdrop cierra. Restaura foco al cerrar.
```

### src/config/site.ts
```ts
export const site = {
  name: "Savia Café", descriptor: "Café de origen",
  tagline: "Donde el origen se convierte en sabor",
  description: "...",  // meta description
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://savia.example",
  locale: "es",
  isDemo: true,
  contact: { email: "hola@savia.example", phone: "+34 900 000 000 (demo)" },
  social: [{ id: "instagram", label: "Instagram", href: "#" } ...],  // href reales pendientes
  nav: [ { id: "inicio", label: "Inicio" }, { id: "nuestro-cafe", label: "Nuestro café" },
    { id: "menu", label: "Menú" }, { id: "origenes", label: "Orígenes" },
    { id: "experiencias", label: "Experiencias" }, { id: "sostenibilidad", label: "Sostenibilidad" },
    { id: "ubicaciones", label: "Ubicaciones" } ],  // href = `#${id}`
} as const;
export type NavItem = (typeof site.nav)[number];
```

### src/data/types.ts
```ts
import type { LucideIcon } from "lucide-react";
export interface CoffeeProduct { id: string; name: string; originCountry: string;
  process: string; description: string; intensity: 1|2|3|4|5; priceEur: number;
  weightGrams: number; image: string; isDemo: true; }
export interface CoffeeOrigin { id: string; country: string; region: string;
  altitude: string; variety: string; process: string; notes: string;
  intensity: 1|2|3|4|5; description: string; mapImage: string; isDemo: true; }
export interface ProcessStep { id: string; number: string; title: string;
  description: string; icon: LucideIcon; }
export type MenuTag = "vegetal" | "sin azúcar" | "sin gluten" | "temporada";
export interface MenuItem { id: string; name: string; description: string;
  priceEur: number; tags?: MenuTag[]; }
export interface MenuCategory { id: string; title: string; items: MenuItem[]; }
export interface SustainabilityMetric { id: string; value: string; label: string;
  description: string; isDemo: true; }
export interface SustainabilityPillar { id: string; title: string; description: string; icon: LucideIcon; }
export interface GalleryImage { id: string; src: string; alt: string;
  aspectClass: string; prominent?: boolean; }
export type LocationService = "wifi" | "terraza" | "accesible" | "filtrados" | "pet-friendly" | "take-away";
export interface CafeLocation { id: string; name: string; city: string; address: string;
  schedule: { days: string; hours: string }[]; services: LocationService[];
  mapsQuery: string; image: string; isDemo: true; }
export interface Testimonial { id: string; name: string; quote: string;
  locationId: string; locationLabel: string; rating: 1|2|3|4|5; isDemo: true; }
```

### src/lib/validation.ts (Agente E; zod v4)
```ts
export const newsletterSchema  // email válido + privacy: literal(true)
export type NewsletterValues
export const reservationSchema // locationId, date (no pasada), time, people 1-12, name >=2, email
export type ReservationValues
```

## globals.css (Agente A) — estructura obligatoria

```css
@import "tailwindcss";

@theme inline {
  --color-espresso: #432724; --color-cacao: #63463B; --color-marfil: #F4EFE9;
  --color-fondo: #FEF9F2; --color-arena: #E6DDD3; --color-beige-seccion: #F2EDE7;
  --color-hoja: #567A38; --color-cta: #82B84B; --color-terracota: #A4513B;
  --color-texto: #3D2923; --color-texto-secundario: rgb(61 41 35 / 0.72);
  --font-sans: var(--font-montserrat), ui-sans-serif, system-ui, sans-serif;
}

:root { --frame: 6px; --header-h: 4rem; }
@media (min-width: 768px) { :root { --frame: 14px; } }
@media (min-width: 1024px) { :root { --frame: 22px; --header-h: 5rem; } }

/* base: body bg espresso, color texto, antialiased; html scroll-behavior smooth
   (dentro de @media (prefers-reduced-motion: no-preference)); selection espresso/marfil;
   focus-visible global: outline 2px solid --color-cta offset 2px.
   .section-pad: py responsivo clamp(3.5rem, 8vw, 8.5rem).
   .link-underline (subrayado animado 300ms, del motion-spec).
   utilidades .text-label (0.75rem, 600, tracking .15em, uppercase). */
```
`layout.tsx`: lang="es", Montserrat (next/font/google, variable --font-montserrat,
display swap), metadata desde site config (title template, description, openGraph,
twitter, metadataBase new URL(site.url), alternates.canonical "/"), export viewport
con themeColor #432724. Skip link "Saltar al contenido" -> #contenido. SiteFrame envuelve.
NO montar Header/Footer en layout: los monta page.tsx (integración del coordinador).

`SiteFrame`: div bg-espresso min-h-dvh p-[var(--frame)]; interior bg-fondo rounded-[6px]
overflow-x-clip relative.

## Secciones — puntos no obvios

- Header (B): fixed top/left/right var(--frame); h var(--header-h); compacto tras
  scrollY>24 (clase, transición CSS). IntersectionObserver por sección para aria-current.
  Acciones: Search y Bag y Account reciben callbacks per props NO — mejor: Header es
  client y renderiza directamente <SearchOverlay/>, <ShoppingDrawer/>, <AccountPanel/>
  (de F) controlándolos con su estado. Si F no ha entregado aún, B crea stubs mínimos
  inline y el coordinador los sustituye. ES|EN: botón con title "Próximamente" accesible.
- Hero (B): server component; textos e imagen central via SmartImage (hero PNG 1:1,
  priority, sizes="(min-width:1024px) 40vw, 80vw"). Flechas decorativas opcionales.
- FeaturedCoffee (B): server comp mapea coffees -> <CoffeeCard> (server, usa SmartImage)
  y pasa las cards como children a un client component EmblaCarousel visible solo <lg
  (lg:grid). Embla: loop false, align start, dragFree false; botones prev/next 44px
  aria-label; dots role="tablist" accesibles.
- Origins (C): client component OriginsTabs recibe origins + un Record<id, ReactNode>
  de mapas ya renderizados (SmartImage) desde el server wrapper. Patrón WAI-ARIA tabs
  (roving tabindex, flechas, Home/End). AnimatePresence mode="wait" 320ms.
- CoffeeProcess (C): server; línea conectora con pseudo-elementos/divs decorativos
  aria-hidden; vertical en móvil (línea izquierda), horizontal lg+.
- CafeMenu (D): server para datos; acordeones móvil = client component
  (<details>/<summary> estilizado es aceptable y accesible; en lg+ grid 3 columnas
  siempre abiertas). Filas: nombre + puntos flexibles (border-dotted flex-1) + precio.
- Sustainability (D): métricas con isDemo -> nota visible "Datos demostrativos".
- ExperienceGallery (D): grid asimétrico lg (12 col: 1 imagen 7col row-span-2 + 4
  menores), móvil carrusel Embla igual patrón que FeaturedCoffee (server pasa slides).
- Locations (E): LocationCard server; "Cómo llegar" = <a href="https://www.openstreetmap.org/search?query={mapsQuery}" target _blank rel noopener> (sin API key);
  "Reservar" abre ReservationDialog (client) con la sucursal preseleccionada.
- Newsletter (E): client; RHF + zodResolver; estado success/error simulado con
  setTimeout 900ms; aria-live="polite"; nota "Solicitud de demostración — no se
  almacenan datos". Checkbox privacidad obligatorio.
- Footer (E): server; año new Date().getFullYear(); frase final; enlaces legales a "#"
  prohibidos -> usar botones disabled con aria-disabled y title "Próximamente" o
  enlaces a secciones existentes.
- Overlays (F): SearchOverlay busca client-side sobre un índice estático (props:
  entries: {label, targetId, keywords}[]) y navega con scrollIntoView; ShoppingDrawer
  lateral derecho con mensaje "Tienda próximamente" + resumen demo; AccountPanel
  "Próximamente" elegante. Todos sobre Dialog/primitivas de A (o propios usando hooks
  de A) con focus trap y Escape.

## Reglas de integración

1. Nada de `any`; nada de @ts-ignore. 2. Imports solo via `@/`. 3. Ningún archivo
fuera de tu propiedad (si necesitas algo de otro, define la interfaz y documenta en
un comentario TODO(coordinador)). 4. Sin URLs remotas. 5. Sin "Estrella".
6. Texto UI en español. 7. Todos los iconos lucide `aria-hidden` + tamaño 16-20px
stroke 1.5. 8. Validación final del coordinador: `npm run lint && npm run typecheck
&& npm run build`.
