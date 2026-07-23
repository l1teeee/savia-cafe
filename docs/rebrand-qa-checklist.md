# Rebrand QA Checklist - El Marco Vivo

Checklist para revisar que todas las secciones siguen el sistema visual calido actual.

## Cobertura Visual

- [ ] La paleta visible usa `crema`, `crema-clara`, `tinta`, `cafe`, `verde`, `verde-claro`, `tostado`, `texto`, `texto-secundario` y `borde`.
- [ ] No quedan tokens viejos en secciones o componentes visuales: `bg-fondo`, `text-hoja`, `bg-espresso`, `text-marfil`, `bg-beige-seccion`, `text-cta`, `text-cacao`, `bg-terracota`.
- [ ] Los fondos alternan con ritmo `crema` y `crema-clara`; Newsletter y Footer permanecen en `cafe`.
- [ ] Los titulares principales de seccion usan `SectionHeading display` o `.font-display text-tinta`.
- [ ] Solo existe un `<h1>` en Hero.
- [ ] Las piezas visuales principales usan `MatFrame`; imagenes dentro del marco usan `SmartImage radius="none"`.
- [ ] Las tabs notch usan `.notch-tr` o `.notch-bl` con panel `bg-crema-clara`.
- [ ] Los chips de icono usan losetas cuadradas, iconos `lucide-react`, `strokeWidth={1.75}` y `aria-hidden` cuando son decorativos.
- [ ] Los badges o sellos usan `bg-verde text-crema-clara`.
- [ ] Los botones usan variantes actuales de `Button`: `primary`, `outline`, `ghost`, `inverted` o `verde`.

## Accesibilidad e Interaccion

- [ ] El foco visible se ve en links, botones, tabs, inputs y controles custom.
- [ ] Los CTA verdes tienen outline con contraste suficiente.
- [ ] El contraste cumple AA, especialmente texto pequeno sobre fondos crema y texto claro sobre `cafe` o `verde`.
- [ ] Controles tactiles tienen al menos 44px de alto o ancho.
- [ ] Imagenes tienen `alt` util; imagenes decorativas o iconos no anuncian ruido.
- [ ] Formularios conservan `aria-live` para estados de exito y error.
- [ ] Tabs, accordions y dialogs mantienen roles, estado activo y navegacion por teclado.

## Motion

- [ ] Animaciones usan `Reveal`, `StaggerGroup`, `StaggerItem` o utilidades de `@/lib/motion`.
- [ ] El easing coincide con `EASE = [0.22, 1, 0.36, 1]`.
- [ ] `prefers-reduced-motion` elimina o reduce desplazamientos, escalas, parallax y autoplay decorativo.
- [ ] Hover y active states no dependen solo de movimiento para comunicar estado.

## Responsive

- [ ] Revisado en 320px, 375px, 390px, 768px, 1024px, 1280px y 1440px.
- [ ] No hay texto desbordado en botones, badges, tabs, cards o headings.
- [ ] Los marcos mantienen proporciones estables y no provocan saltos de layout.
- [ ] Notch tabs, chips y badges no tapan contenido esencial en movil.
- [ ] El contenido queda dentro del contenedor y no genera scroll horizontal.

## Comandos

```bash
npm run typecheck
npm run lint
npm run build
```

Buscar tokens viejos fuera de `globals.css`:

```bash
git grep -nE "bg-fondo|text-hoja|bg-espresso|text-marfil|bg-beige-seccion|text-cta|text-cacao|bg-terracota" -- . ":(exclude)src/app/globals.css"
```

El comando debe devolver cero coincidencias en codigo de secciones y componentes migrados.
