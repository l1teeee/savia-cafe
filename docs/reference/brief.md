# Brief maestro — Savia Café (leer antes de cualquier tarea)

Landing editorial premium para una cafetería de especialidad. Next.js 16.2 App Router,
React 19, TypeScript estricto, Tailwind CSS v4 (tokens via `@theme` en `globals.css`,
NO existe tailwind.config), Motion for React (`motion/react`), Embla Carousel,
Lucide React, Zod, React Hook Form. Server Components por defecto; `"use client"` solo
en piezas interactivas. Alias de imports: `@/*` -> `src/*`.

IMPORTANTE: leer `node_modules/next/dist/docs/01-app/**` ante cualquier duda de API.
Referencias visuales: `docs/reference/screenshot-notes.md` y
`docs/reference/prototype-excerpt.html`.

## Marca (centralizada en `src/config/site.ts`)
- Nombre: "Savia Café". Descriptor: "Café de origen".
- Eslogan: "Donde el origen se convierte en sabor".
- PROHIBIDO: "Estrella Coffee Roasters", logos de terceros, URLs remotas
  (googleusercontent, CDN de Tailwind, Material Symbols), textos de otra marca.
- Logotipo: tipográfico original (texto "Savia" + detalle hoja Lucide `Leaf` opcional).

## Paleta (variables CSS semánticas en `globals.css`, expuestas a Tailwind via @theme)
- espresso `#432724` (marco, newsletter, footer) / cacao `#63463B`
- marfil `#F4EFE9` / fondo `#FEF9F2` / arena `#E6DDD3` / beige sección `#F2EDE7`
- verde hoja `#567A38` (iconos, texto acento) / verde CTA `#82B84B`
- terracota `#A4513B` / texto `#3D2923` / texto secundario: espresso al 68-75%
- El verde SOLO en CTAs, estados activos, indicadores, iconos, métricas. Nunca fondo grande.

## Tipografía
Montserrat via `next/font` (variable `--font-montserrat`, ya configurada en layout).
- Hero: `clamp(2.6rem, 5vw, 4.5rem)` peso 300. Sección: `clamp(2rem, 3vw, 3.5rem)` peso 300-400.
- Cuerpo 400, 1rem-1.125rem, interlineado amplio. Labels 0.72-0.8rem, peso 600,
  uppercase, tracking `0.15em`.

## Marco exterior (SiteFrame)
Body espresso; contenido marfil dentro de un marco visible: 20-24px desktop,
12-16px tablet, 5-8px móvil. Header fijo DENTRO del marco. Max-width visual 1440-1600px.

## Secciones (orden en page.tsx) — ids para navegación
1. `inicio` Hero: título centrado, grid 3/6/3 (texto der-alineado, imagen botánica
   cuadrada, texto izq-alineado), CTA verde "DESCUBRIR NUESTRO CAFÉ". 78-88svh desktop.
   Móvil: título, subtítulo, imagen, texto1, texto2, CTA (no ocultar textos).
2. `nuestro-cafe` FeaturedCoffee "Una taza para cada momento": 4 productos
   (Aurora — Etiopía lavado; Tierra Roja — Colombia honey; Bosque Alto — Guatemala
   natural; Casa Savia — mezcla espresso). Desktop 4 col, tablet 2, móvil carrusel Embla
   con peek. Card: imagen 3:4, "PAÍS • PROCESO", nombre, descripción, intensidad,
   precio, "Ver detalle".
3. `historia` Story "Una historia que comienza en el origen": 2 col (imagen 4:5 + texto),
   4 pilares, CTA "CONOCER NUESTRA HISTORIA".
4. `origenes` Origins "Cada origen cuenta una historia": tabs El Salvador / Colombia /
   Etiopía / Guatemala. Datos: región, altitud, variedad, proceso, notas, intensidad,
   descripción + mapa ilustrado. Crossfade 300-400ms, y<=12px. Fondo beige sección.
5. `proceso` CoffeeProcess "El sabor toma forma": 4 pasos (Cultivo, Selección, Tostado,
   Preparación) con número, icono Lucide, punto verde y línea conectora.
   Horizontal desktop / vertical móvil (línea a la izquierda).
6. `menu` CafeMenu "Preparado para disfrutarlo a tu manera" (visual "Nuestra Barra"):
   categorías Espresso / Con leche / Filtrados / Fríos / Repostería / Temporada.
   Filas editoriales (nombre + línea flexible + precio, descripción debajo, badges
   vegetal/sin azúcar/sin gluten/temporada). 3 imágenes. Móvil: acordeones accesibles.
   CTA "VER MENÚ COMPLETO".
7. `sostenibilidad` Sustainability "Cultivar hoy. Cuidar el mañana.": texto intro,
   3 métricas (100% café trazable / 85% empaques reciclables / Relaciones directas,
   marcadas isDemo), lista de compromisos, CTA "CONOCER NUESTRO IMPACTO". Fondo beige.
8. `experiencias` ExperienceGallery "Un espacio para bajar el ritmo": grid asimétrico
   desktop (1 grande + 3-4 secundarias), carrusel móvil. CTA "VISITAR NUESTRAS CAFETERÍAS".
9. `ubicaciones` Locations "Encuentra tu cafetería más cercana": 3 sucursales demo
   (Barrio Norte Madrid, El Born Barcelona, Casco Histórico Sevilla) con horarios,
   servicios (iconos), "Cómo llegar" y "Reservar" (abre ReservationDialog).
   Mapa = placeholder estilizado, sin Google Maps.
10. Testimonials "Historias alrededor de una taza": 3 testimonios demo, líneas finas,
    sin cajas pesadas. 3 col desktop / apilado móvil.
11. `newsletter` Newsletter fondo espresso: "Haz una pausa. Nosotros llevamos el café.",
    input email + checkbox privacidad + botón verde "QUIERO RECIBIR NOVEDADES".
    Validación Zod + RHF, estados (focus/inválido/enviando/éxito/error) con aria-live,
    simulación claramente marcada "Solicitud de demostración", sin almacenar datos.
12. Footer espresso: logo, descriptor, nav secundaria, horarios, contacto, redes,
    ubicaciones, legal, idioma, pagos genéricos, año dinámico, frase
    "Cada taza tiene un origen. Cada visita, una historia."

## Header
Fijo dentro del marco. Desktop: marca izq, nav (Inicio, Nuestro café, Menú, Orígenes,
Experiencias, Sostenibilidad, Ubicaciones), acciones der (búsqueda, cuenta, bolsa,
ES/EN). 76-84px -> 60-68px compacto al scroll, fondo marfil translúcido + backdrop-blur.
Enlace activo con línea (aria-current), scroll suave. Móvil: logo + bolsa + hamburguesa;
menú pantalla completa con focus trap, Escape, bloqueo scroll. Búsqueda = SearchOverlay,
bolsa = ShoppingDrawer, cuenta = panel "Próximamente".

## Motion (constantes en `src/lib/motion.ts`)
- Reveal: opacity 0->1, y 24->0, 650ms, ease `[0.22, 1, 0.36, 1]`, once, margin -80px.
- Stagger 80ms. Imágenes hover scale max 1.03/600ms. Botones hover 1.015 / active 0.985.
- Tabs crossfade 320ms y<=8px. Parallax botánico max 12px.
- `prefers-reduced-motion`: sin parallax ni desplazamientos; fades breves o nada.
- PROHIBIDO: rebotes, scroll hijacking, animaciones perpetuas, >1s.

## Imágenes
Todavía NO existen. Usar el componente `ImagePlaceholder` (src/components/ui) que
reserva aspect-ratio y muestra un bloque elegante; cuando el archivo exista en
`public/images/...` se usa `next/image`. Rutas y prompts: `docs/image-manifest.json`
y `docs/codex-image-prompts.md`. Nunca URLs remotas ni imágenes rotas.

## Accesibilidad (WCAG 2.2 AA)
Un solo h1, jerarquía correcta, skip link, landmarks, alt text, labels, aria-live en
formularios, focus visible, teclado completo, Escape + restauración de foco en modales,
botones reales, contraste, iconos decorativos aria-hidden, aria-current en nav,
carruseles controlables. Áreas táctiles >=44px. Texto móvil >=16px.

## Responsive
Breakpoints de diseño: 1440 / 1280 / 1024 / 768 / 390 / 375 / 320. Sin overflow
horizontal. Secciones 104-144px desktop / 80-104 tablet / 56-80 móvil de padding vertical.

## Datos
Todo el contenido en `src/data/*.ts` con tipos explícitos (`CoffeeProduct`,
`CoffeeOrigin`, `MenuCategory`, `MenuItem`, `CafeLocation`, `Testimonial`,
`SustainabilityMetric`). Contenido demo marcado `isDemo: true`. Precios configurables.
Nada de `any`. Nada de listas largas hardcodeadas en JSX.
