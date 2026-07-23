# Auditoría Técnica — Savia Café (Agente 2)

## 1. Estado Actual del Repositorio

### Archivos Existentes
- **Layout reutilizable**: `src/app/layout.tsx` (Create Next App template). Remplazar completamente: agregar `Metadata` (title/description/viewport/themeColor), importar Montserrat vía `next/font` con variable `--font-montserrat`, eliminar Geist (no en especificaciones), agregar SiteFrame, Header y Footer como componentes.
- **Page demo**: `src/app/page.tsx` (boilerplate Vercel). Descartar completamente; reemplazar con 11 secciones del brief (Hero, FeaturedCoffee, Story, Origins, CoffeeProcess, CafeMenu, Sustainability, ExperienceGallery, Locations, Testimonials, Newsletter).
- **Globals.css**: Base Tailwind v4 correcta, pero FALTA paleta semántica completa. Agregar variables CSS (espresso, cacao, marfil, fondo, arena, etc.) y exponerlas vía `@theme inline { --color-espresso: ..., }` para acceso en Tailwind.
- **SVG demo**: `public/*.svg` (next.svg, vercel.svg, window.svg, etc.). Descartar; reemplazar con `public/images/` (estructura en docs/image-manifest.json).

### Carpetas Faltantes (Crear Estructura)
```
src/
  components/
    cards/          (CoffeeCard, MenuItemCard, etc.)
    layout/         (Header, Footer, SiteFrame)
    motion/         (RevealWrapper, parallax hooks)
    overlays/       (SearchOverlay, ShoppingDrawer, ReservationDialog)
    sections/       (Hero, FeaturedCoffee, Story, Origins, CoffeeProcess, CafeMenu, Sustainability, ExperienceGallery, Locations, Testimonials, Newsletter)
    ui/             (Button, Input, ImagePlaceholder, etc.)
  config/
    site.ts         (marca, URLs, metadata centralizados)
  data/
    coffee.ts       (CoffeeProduct[])
    origins.ts      (CoffeeOrigin[])
    menu.ts         (MenuCategory[], MenuItem[])
    locations.ts    (CafeLocation[])
    testimonials.ts (Testimonial[])
    sustainability.ts (SustainabilityMetric[])
  lib/
    motion.ts       (constantes reveal, stagger, parallax)
    utils.ts        (cn, classname merging)
```

## 2. Arquitectura Next.js Propuesta

### Server vs Client
- **Server Components (default)**: Layout root, secciones státicas, data fetching, metadata.
- **Client Components (`"use client"`)**: 
  - Header (scroll listener para compacto, nav interactivo)
  - Overlays: SearchOverlay, ShoppingDrawer, ReservationDialog
  - Carruseles: FeaturedCoffee (Embla), ExperienceGallery (Embla)
  - Tabs: Origins (crossfade 320ms)
  - Modales: focus trap, Escape, restaurar foco
  - Formularios: Newsletter (Zod + RHF), validación en cliente

### Secciones (SCs o CC)
- **Hero**: SC (imagen vía ImagePlaceholder, CTA botón "DESCUBRIR" verde).
- **FeaturedCoffee**: CC (Embla carrusel, peek móvil, 4 col desktop/2 tablet).
- **Story**: SC (imagen 4:5 + 4 pilares).
- **Origins**: CC (tabs con crossfade, Lucide icons).
- **CoffeeProcess**: SC (4 pasos, línea conectora, layout vertical móvil).
- **CafeMenu**: CC (acordeones móvil, validación WCAG).
- **Sustainability**: SC (3 métricas, lista compromisos, fondo beige).
- **ExperienceGallery**: CC (Embla carrusel móvil, grid asimétrico desktop).
- **Locations**: CC (ReservationDialog modal).
- **Testimonials**: SC (líneas finas, 3 col/apilado).
- **Newsletter**: CC (formulario RHF + Zod, aria-live, simulación demo marcada).

## 3. Scripts npm Verificados

### Existentes
```json
"dev": "next dev"              ✓ Correcto
"build": "next build"          ✓ Correcto
"start": "next start"          ✓ Correcto
"lint": "eslint"               ⚠ INCOMPLETO: agregar ruta "./src/**"
```

### Faltantes (Agregar a package.json)
```json
"typecheck": "tsc --noEmit"
"lint": "eslint \"./src/**\" --max-warnings=0"
```

**Nota ESLint 9**: Flat config correcto en eslint.config.mjs. Lint script necesita argumento de ruta explícita o patrón.

## 4. Convenciones Next.js 16 Verificadas

| Convención | Estatus | Acción |
|-----------|---------|--------|
| Metadata API | ✓ Importada en layout | Agregar title/description/viewport/themeColor/robots/sitemap |
| `next/font` | ⚠ Geist presente | Reemplazar Geist + Geist_Mono con Montserrat (variable `--font-montserrat`) |
| `next/image` | ✓ Importada en demo | Usar ImagePlaceholder SC hasta que existan archivos en `public/images/` |
| Viewport/ThemeColor | ✗ Falta | Exportar en layout: `export const viewport = { themeColor: "#432724" }` |
| Sitemap/Robots | ✗ Falta | Crear `src/app/sitemap.ts` y `src/app/robots.ts` (tipos en Next.js docs) |

## 5. Dependencias

### Instaladas ✓
- next 16.2.10, react 19.2.4, react-dom 19.2.4 (estables)
- @tailwindcss/postcss 4, tailwindcss 4 (v4, sin tailwind.config)
- motion 12.42.2, embla-carousel-react 8.6.0, lucide-react 1.25.0 (motion/react es el hook de esta versión)
- zod 4.4.3, react-hook-form 7.82.0, @hookform/resolvers 5.4.0 (formularios validados)
- eslint 9 (flat config), typescript 5 (strict)

### Riesgos de Compatibilidad React 19
- **motion 12.42.2**: Verificar que no depreca Hydrate Server Component patterns; revisar docs motion/react.
- **Embla 8.6.0**: Valida con React 19 (peerDependencies). SVG scroll-hijacking: proceder con cuidado en tabs parallax.
- **RHF 7.82.0**: Validado React 19; usar `watch()` dentro de CC, no SC.

## 6. Riesgos Técnicos Concretos

| Riesgo | Mitigación |
|--------|-----------|
| Hydration mismatch (Header scroll) | CC Header con `useEffect` que detecta scroll DESPUÉS de mount. Estado en `sessionStorage` o Context, no SSR-mismatch. |
| Focus trap (modales) | Usar `useEffect` + `useRef` para focus inicial en modal; Escape key handler limpia y restaura foco anterior. |
| Tailwind v4 clases dinámicas | NO usar `cls = \`bg-\${color}\`` (no funciona sin SafeList). Usar mapa: `const bgColor = { espresso: "bg-espresso" }`. |
| Parallax + `prefers-reduced-motion` | Motion.tsx recibe `reduceMotion` prop; parallax = 0 en `@media (prefers-reduced-motion)`. Test con DevTools. |
| Embla carrusel touch + mobile scroll | Embla automático en mobile (<768px). Test en device: no hijacking horizontal scroll. |
| Formulario Newsletter (falso demo) | Marcar claramente "Solicitud de demostración" en UI. Validación Zod local, NO enviar datos. Estado visual: focus/inválido/enviando/éxito/error con aria-live. |
| Import aliases `@/*` | tsconfig.json y eslint.config.mjs ya configurados. Validar en build: `next build`. |

---

**Siguientes pasos**: 
1. Reemplazar layout.tsx (Metadata, Montserrat, SiteFrame).
2. Crear estructura de carpetas + componentes base (Button, Input, ImagePlaceholder).
3. Agregar paleta variables en globals.css.
4. Crear `src/data/*.ts` con tipos explícitos.
5. Agregar script `typecheck` y corregir lint script.
6. Crear sitemap.ts y robots.ts en src/app/.
