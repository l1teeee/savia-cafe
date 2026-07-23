# Guion de diseño — "El Marco Vivo" (Savia Café)

Fuente de verdad para unificar TODAS las secciones con la línea gráfica del Hero
(`src/components/sections/Hero.tsx`). Léelo entero antes de tocar código. Referencia visual
canónica: el propio `Hero.tsx` y el `Header.tsx` (ya migrados).

> Regla del repo: esta es una versión modificada de Next.js 16. Respeta `AGENTS.md`; si tocas
> APIs de Next (`next/image`, metadata, etc.) consulta `node_modules/next/dist/docs/` antes.

---

## 1. Concepto

**Cada sección es una pieza enmarcada en una galería cálida.** El Hero define 5 dispositivos de
firma; se propagan a todo el sitio para dar unidad, variando su aplicación para que cada sección
tenga carácter propio. Creatividad DENTRO del sistema, no fuera de él.

## 2. Paleta (tokens ya definidos en `globals.css`)

| Token | Hex | Uso |
|-------|-----|-----|
| `crema` | #f1ebdd | Fondo de sección A, losetas de chip |
| `crema-clara` | #faf7ef | Fondo de sección B, mat del marco, tarjetas |
| `tinta` | #171512 | Titulares display, texto de máximo contraste |
| `cafe` | #382e28 | Fondos oscuros (Newsletter/Footer), chips oscuros, botón primary |
| `verde` | #3e7058 | Único acento: badges, iconos, CTA, sellos |
| `verde-claro` | #a8cfb9 | Acento suave sobre fondo oscuro |
| `tostado` | #d9c9ac | Hairlines/detalles cálidos |
| `texto` / `texto-secundario` | #352824 / #6e5d56 | Cuerpo de texto (se conserva) |
| `borde` | #ddd5cc | Hairlines (se conserva; ya es cálido) |

**Retirar** de las secciones: `bg-fondo`, `bg-beige-seccion`, `text-hoja`, `bg-espresso`,
`text-marfil`, `text-cta`, `text-cacao`, `bg-terracota`. (Siguen existiendo en tokens, pero no se
usan en la capa visual nueva.)

### Ritmo de fondos (de arriba abajo)
Hero `crema` → Featured `crema-clara` → Story `crema` → Origins `crema-clara` →
Process `crema` → Menu `crema-clara` → Sustainability `crema` → Gallery `crema-clara` →
Locations `crema` → Testimonials `crema-clara` → Newsletter `cafe` → Footer `cafe`.

## 3. Tipografía

- **Titulares de sección:** clase `.font-display` + `text-tinta`. `.font-display` ya aplica
  Montserrat 900, mayúsculas, `scaleX(0.9)`, `line-height 0.9`, tracking negativo. NO le pongas
  `font-light`/`font-normal` encima ni animes el titular con motion (rompería el `scaleX`).
  Tamaño típico: `text-[clamp(2rem,4vw,3.75rem)]` (ajústalo por sección).
- **Eyebrow:** `text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-tinta/60`
  (estilo Hero). Sustituye a `text-label text-hoja`.
- **Subtítulo/intro:** `font-light text-cafe/75` o `text-texto-secundario` para párrafos largos.
- **Cuerpo:** se conserva `text-texto` / `text-texto-secundario`.

## 4. Dispositivos de firma

### 4.1 Marco passe-partout → usa el primitivo `MatFrame`
`import { MatFrame } from "@/components/ui/MatFrame";`

```tsx
<MatFrame size="lg" className="col-span-…" overlay={/* notch tabs opcionales */}>
  {/* media a sangre, SIN redondeo propio */}
  <SmartImage src=… alt=… width=… height=… radius="none" className="h-full w-full" imgClassName="object-cover" />
</MatFrame>
```

Props: `size?: "sm" | "lg"` (sm = tarjetas, lg = hero-like, default `lg`),
`className` (mat exterior), `innerClassName` (superficie de recorte interior),
`overlay?: ReactNode` (para notch tabs/badges posicionados por ti, absolute),
`as?: "figure" | "div"` (default `figure`).
El mat es `bg-crema-clara` con sombra suave; el interior recorta con `overflow-hidden`.
La media hija debe ir a sangre (`radius="none"`, `h-full w-full`) para no duplicar bordes.

### 4.2 Notch tabs (ya en `globals.css`)
Clases `.notch-tr` (esquina superior derecha) y `.notch-bl` (inferior izquierda): dibujan las
curvas cóncavas que "encajan" un panel flotante en el borde del marco. Patrón (copiado del Hero):

```tsx
<div className="notch-tr absolute right-2 top-2 z-10 rounded-bl-[18px] rounded-tr-[18px] bg-crema-clara p-2.5 sm:[--notch:22px]">
  …contenido del tab…
</div>
```
El color del panel DEBE ser `bg-crema-clara` (igual que el mat) para que la curva empalme. Ajusta
`--notch` por breakpoint. Úsalo dentro del `overlay` de `MatFrame`.

### 4.3 Chips de iconos
Loseta cuadrada con icono `lucide` (`strokeWidth={1.75}`):
```tsx
<span className="grid size-11 place-items-center rounded-2xl bg-crema text-tinta sm:size-13">
  <Icon className="size-5 sm:size-6" strokeWidth={1.75} aria-hidden />
</span>
```
Variante oscura: `bg-cafe text-crema-clara`. Variante acento: `bg-verde text-crema-clara`.
En hover opcional `whileHover={{ scale: 1.05 }}` (respeta reduced-motion).

### 4.4 Badge / pastilla verde (sello recurrente)
```tsx
<span className="inline-flex items-center gap-2 rounded-full bg-verde px-3 py-2 text-crema-clara">
  <Leaf className="size-4" strokeWidth={1.75} aria-hidden />
  <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em]">…</span>
</span>
```

## 5. Primitivos compartidos actualizados (NO los edites; consúmelos)

- **`SectionHeading`** — nuevo prop `display?: boolean`. Pásalo `display` para titular
  `font-display` + eyebrow estilo Hero. Firma: `{ id?, eyebrow?, title, intro?, align?, display? }`.
- **`Button`** — misma API. `primary` = `bg-cafe text-crema-clara` (pastilla); `outline` =
  `border-cafe/25 text-cafe`; `verde` = CTA verde; `inverted` = para fondos oscuros. Radio píldora.
- **`SmartImage`** — nuevo prop `radius?: "none" | "sm" | "md" | "lg"` (default `sm` = actual).
  Dentro de `MatFrame` usa `radius="none"`. En grids sueltos usa `radius="md"`.
- **`MatFrame`** — descrito en 4.1.

## 6. Motion (se conserva)
Reutiliza `Reveal`, `StaggerGroup/StaggerItem`, y `lib/motion` (`EASE`, `riseIn`, `fadeUp`…).
Todo debe seguir respetando `prefers-reduced-motion` (usa `usePrefersReducedMotion` como el Hero).
No introduzcas librerías nuevas.

## 7. Accesibilidad (obligatorio conservar)
Un único `<h1>` (Hero). Mantén `id`/`aria-labelledby` de cada sección, roles de tabs/dialog/accordion,
`aria-current`, `aria-live` de formularios, foco visible, área táctil ≥44px, `alt` en imágenes y
`aria-hidden` en iconos decorativos. No degradar contraste (AA ≥4.5:1): `text-tinta`/`text-cafe`
sobre crema cumplen; verde sobre crema-clara para acentos, no para texto pequeño largo.

## 8. Dirección creativa por sección

- **FeaturedCoffee / CoffeeCard:** cada café dentro de `MatFrame size="sm"`; `país · proceso` como
  notch-tr sobre la imagen; precio como badge; intensidad con puntos/chips; CTA "Ver detalle"
  pastilla `cafe` con `ArrowUpRight`. Cabecera con `SectionHeading display`.
- **Story:** retrato grande en `MatFrame size="lg"` con badge verde (Leaf) encajado (notch-bl);
  principios en grid con hairline `border-borde` y numeración `01–04`; título display.
- **Origins / OriginsTabs:** tabs como chips-pestaña (activa `bg-cafe text-crema-clara`, inactiva
  `bg-crema`); mapa en `MatFrame` con notch "Ficha de origen"; datos (región, altitud…) en losetas
  `bg-crema-clara rounded-2xl`.
- **CoffeeProcess:** pasos como tarjetas con chip de icono verde + número display gigante
  (`font-display text-tinta/10` de fondo); hairlines cálidos.
- **CafeMenu / MenuAccordion:** cabecera display; precios con líder punteado; galería de imágenes en
  `MatFrame size="sm"`; acordeón móvil con chevron y hairline `border-borde`.
- **Sustainability:** métricas en marcos/chips; ilustración botánica dentro de `MatFrame` (fondo
  `bg-crema`); pilares con icono en chip verde; CTA outline.
- **ExperienceGallery:** mosaico donde la pieza prominente va en `MatFrame` con esquina notch; el
  resto en `SmartImage radius="md"` con hover `scale-[1.015]`.
- **Locations / LocationCard:** foto en `MatFrame size="sm"`; ciudad como notch; servicios como
  mini-chips de icono verde; botones "Cómo llegar" (outline) y "Reservar" (verde).
- **Testimonials / TestimonialCard:** cita en tarjeta `bg-crema-clara rounded-[20px]` con comilla
  `font-display` grande; autor + rating como badge verde.
- **Newsletter:** sección `bg-cafe text-crema-clara`; formulario dentro de tarjeta `bg-crema-clara`
  tipo marco (texto vuelve a `text-cafe`); input con foco verde; submit `variant="verde"`. Conserva
  toda la lógica de `react-hook-form`/zod y los estados `aria-live`.
- **Footer:** `bg-cafe text-crema-clara`; sello Leaf como en Header; enlaces `text-crema-clara/70`
  hover `text-crema-clara`; acentos verde. Conserva estructura semántica y notas legales.

## 9. Límites
No cambies datos (`src/data/*`), textos de marca, rutas, ni la lógica client (carousels, tabs,
acordeón, formularios). Solo la capa visual / idioma gráfico. Edita, no reescribas de cero cuando
puedas. Sin em dashes ni comillas tipográficas en el código.
