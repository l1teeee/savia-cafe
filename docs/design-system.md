# Sistema de Diseno - El Marco Vivo

Fuente de verdad del sistema visual calido de Savia Cafe. Este documento describe el estado actual del codigo: tokens en `src/app/globals.css` y primitivos en `src/components/ui`.

## 1. Tokens de Color

| Token Tailwind | Hex | Uso |
| --- | --- | --- |
| `crema` | `#f1ebdd` | Fondo base del sitio y secciones A. Tambien se usa en superficies interiores de `MatFrame` y chips claros. |
| `crema-clara` | `#faf7ef` | Fondo alterno de secciones, mat exterior del marco, tarjetas claras y tabs notch. |
| `tinta` | `#171512` | Titulares display y texto de maximo contraste. |
| `cafe` | `#382e28` | Fondos oscuros, botones `primary`, chips oscuros y texto fuerte. |
| `verde` | `#3e7058` | Acento principal: badges, sellos, CTA verde, iconos y foco en inputs cuando aplica. |
| `verde-claro` | `#a8cfb9` | Acento suave sobre fondos oscuros. |
| `tostado` | `#d9c9ac` | Hairlines y detalles calidos. |
| `texto` | `#352824` | Cuerpo de texto principal. |
| `texto-secundario` | `#6e5d56` | Parrafos secundarios, intros y contenido de apoyo. |
| `borde` | `#ddd5cc` | Divisores, bordes sutiles y hairlines. |

El ritmo de fondos alterna `crema` y `crema-clara` para dar cadencia editorial: Hero en `crema`, siguiente seccion en `crema-clara`, y asi sucesivamente. Newsletter y Footer usan `cafe`.

Tokens antiguos como `bg-fondo`, `text-hoja`, `bg-espresso`, `text-marfil`, `bg-beige-seccion`, `text-cta`, `text-cacao` y `bg-terracota` no pertenecen a la capa visual nueva.

## 2. Tipografia

La fuente base es Montserrat via `--font-montserrat`.

- Titulares display: usar `.font-display` con `text-tinta`. La clase aplica Montserrat 900, mayusculas, `transform: scaleX(0.9)`, `line-height: 0.9`, `letter-spacing: -0.015em` y `transform-origin: center`. No animar el titular directamente con `motion` porque se pisa el `transform`.
- Eyebrow display: `text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-tinta/60`. En Hero sube a `sm:tracking-[0.24em]`.
- Cuerpo: usar `text-texto` para texto principal y `text-texto-secundario` para parrafos largos, intros y contenido de apoyo.
- Intro de seccion: `text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-texto-secundario`.

## 3. Dispositivos de Firma

### MatFrame

`MatFrame` es el marco passe-partout del sistema. El mat exterior es `bg-crema-clara` con sombra suave y la superficie interior recorta la media a sangre.

API:

```tsx
<MatFrame
  size="lg"
  className="..."
  innerClassName="..."
  overlay={...}
  as="figure"
>
  <SmartImage radius="none" className="h-full w-full" ... />
</MatFrame>
```

Props:

- `size?: "sm" | "lg"`: `sm` para tarjetas, `lg` para piezas grandes. Default `lg`.
- `className?: string`: clases del mat exterior.
- `innerClassName?: string`: clases de la superficie interior.
- `overlay?: React.ReactNode`: tabs notch, badges o sellos posicionados por el consumidor.
- `as?: "figure" | "div"`: elemento raiz. Default `figure`.

Dentro de `MatFrame`, la media debe usar `SmartImage radius="none"` para evitar doble radio.

### Notch Tabs

`.notch-tr` y `.notch-bl` viven en `globals.css`. Dibujan curvas concavas con pseudo-elementos y deben colocarse sobre un panel `bg-crema-clara`, igual que el mat, para que empalmen visualmente.

```tsx
<div className="notch-tr absolute right-2 top-2 z-10 rounded-bl-[18px] rounded-tr-[18px] bg-crema-clara p-2.5 sm:[--notch:22px]">
  ...
</div>
```

### Chips de Icono

Los chips son losetas cuadradas con iconos de `lucide-react`, normalmente con `strokeWidth={1.75}` y `aria-hidden` cuando son decorativos.

```tsx
<span className="grid size-11 place-items-center rounded-2xl bg-crema text-tinta sm:size-13">
  <Icon className="size-5 sm:size-6" strokeWidth={1.75} aria-hidden />
</span>
```

Variantes frecuentes: `bg-cafe text-crema-clara` para oscuro y `bg-verde text-crema-clara` para acento.

### Badge Verde

La pastilla verde funciona como sello recurrente de marca, estado o dato destacado.

```tsx
<span className="inline-flex items-center gap-2 rounded-full bg-verde px-3 py-2 text-crema-clara">
  <Leaf className="size-4" strokeWidth={1.75} aria-hidden />
  <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em]">...</span>
</span>
```

### Ritmo Crema

Las secciones deben respirar en alternancia `bg-crema` y `bg-crema-clara`. Evitar fondos viejos y paletas de espresso, marfil, hoja o beige heredadas salvo que existan por compatibilidad en `globals.css`.

## 4. API de Primitivos

### Button

`Button` acepta `variant?: "primary" | "outline" | "ghost" | "inverted" | "verde"` y `size?: "md" | "lg"`. Todos son pastillas con `min-h-11`, uppercase, tracking `0.12em`, foco visible y transiciones reducidas bajo `motion-reduce`.

- `primary`: `border-cafe bg-cafe text-crema-clara`, hover a `tinta`.
- `outline`: `border-cafe/25 bg-transparent text-cafe`, hover con borde `cafe`.
- `ghost`: transparente, `text-cafe`, hover sutil.
- `inverted`: para fondos oscuros, `bg-crema-clara text-cafe`, hover verde.
- `verde`: `border-verde bg-verde text-crema-clara`, hover a `tinta`.

### SectionHeading

API: `{ id?, eyebrow?, title, intro?, align?, display? }`.

Con `display`, el eyebrow usa el estilo del Hero y el titulo usa `.font-display text-tinta`. Sin `display`, conserva una variante mas liviana pero ya alineada a la paleta actual.

### SmartImage

API principal: `{ src, alt, width, height, sizes?, preload?, radius?, className?, imgClassName? }`.

`radius?: "none" | "sm" | "md" | "lg"`:

- `none`: sin radio, requerido dentro de `MatFrame`.
- `sm`: `rounded-[4px]`, default.
- `md`: `rounded-[14px]`, para grids sueltos.
- `lg`: `rounded-[20px]`, para imagenes destacadas fuera de marco.

Si el archivo existe en `public`, usa `next/image`; si no, renderiza `ImagePlaceholder`.

### MatFrame

Ver "Dispositivos de Firma". Es el primitivo central del rebrand y debe aparecer en piezas visuales principales.

## 5. Motion

El sistema reutiliza `Reveal`, `StaggerGroup`, `StaggerItem` y utilidades de `@/lib/motion`.

- Easing canonico: `EASE = [0.22, 1, 0.36, 1]`.
- Patrones: `riseIn`, `fadeUp`, `groupIn` y `still` para motion reducida.
- Respetar siempre `prefers-reduced-motion`. Usar `usePrefersReducedMotion` cuando haya animaciones client.
- Los cambios de color pueden mantenerse si comunican estado; desplazamientos, escalas y parallax deben retirarse o reducirse.

## 6. Accesibilidad

- Mantener un solo `<h1>`, ubicado en Hero.
- Cada seccion debe conservar `id` y `aria-labelledby` cuando aplique.
- Foco visible con `:focus-visible`; los CTA verdes fuerzan outline `tinta` para contraste.
- Area tactil minima de 44px en botones, tabs y controles.
- Contraste AA: minimo 4.5:1 para texto normal. Usar `text-tinta` o `text-cafe` sobre crema y reservar `verde` para acentos, badges y CTA.
- Imagenes con `alt` util; iconos decorativos con `aria-hidden`.
- Formularios con estados accesibles, incluyendo `aria-live`.
