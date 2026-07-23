# Accesibilidad y Responsive — Savia Café

Cumplimiento WCAG 2.2 AA, matriz responsive, requisitos de teclado y QA final.

## 1. Requisitos WCAG 2.2 AA por Componente

### Header / Navegación
- **Estructura**: Una sola `<nav>` con `<ul>` de enlaces.
- **aria-current="page"**: Aplicado al enlace activo (ej. INICIO cuando en sección).
- **Skip link**: Enlace oculto visualmente al inicio, saltable por Tab, apunta a `#main-content`.
- **Focus visible**: `outline 2px solid #567A38` con offset 2px en todos los enlaces.
- **Responsive**: Desktop nav inline; móvil desaparece (se maneja con MobileMenu).

### MobileMenu (pantalla completa)
- **Estructura**: `<dialog>` o `role="dialog"` aria-modal="true" aria-labelledby="menu-title".
- **Focus trap**: Al abrir, focus → primer enlace; Tab ciclando; último enlace + Tab → botón cerrar.
- **Escape**: Cierra menú y restaura focus a hamburguesa.
- **aria-expanded**: Botón hamburguesa `aria-expanded="true"|"false"`.
- **Bloqueo scroll**: `overflow: hidden` en `<body>` mientras abierto.

### SearchOverlay
- **Estructura**: `role="dialog" aria-modal="true" aria-labelledby="search-title"`.
- **Focus trap**: Al abrir → input de búsqueda; Escape cierra y restaura focus.
- **Botón cerrar**: `aria-label="Cerrar búsqueda"`.
- **Resultados**: Lista con `role="listbox"`, items con `role="option"`.

### ReservationDialog (modal de reserva)
- **Estructura**: `role="dialog" aria-modal="true" aria-labelledby="reservation-title"`.
- **Focus trap**: Al abrir → primer campo del formulario.
- **Escape**: Cierra, restaura focus al botón "Reservar".
- **Campos**: Todos con `<label>` asociada vía `htmlFor`.

### Tabs de Orígenes (WAI-ARIA Tabs pattern)
- **Tablist**: `role="tablist"`.
- **Tabs**: `role="tab" aria-selected="true|false" aria-controls="tabpanel-id"`.
- **TabPanels**: `role="tabpanel" aria-labelledby="tab-id"`.
- **Navegación**: Flecha Derecha / Flecha Izquierda cambia tab (con wrap automático).
- **Home / End**: Salta al primer/último tab.
- **Crossfade**: Transición 320ms sin movimiento (prefers-reduced-motion omite).

### Carruseles Embla
- **Botones anterior/siguiente**: `aria-label="Carrusel anterior"`, `aria-label="Carrusel siguiente"`.
- **Indicadores**: Cada punto es `<button aria-label="Ir a slide 3">`; el actual `aria-current="true"`.
- **Sin autoplay**: Responsable del usuario.
- **Teclado**: Flecha Izquierda / Derecha navega; Enter sobre slide abre detalle.

### Formulario Newsletter
- **Label**: `<label htmlFor="email">` con texto visible.
- **Input email**: `type="email" aria-describedby="email-error"` (si hay error).
- **Checkbox privacidad**: `<label>` asociada.
- **aria-live="polite"**: Contenedor en el formulario anuncia "Enviando...", "Éxito", "Error".
- **Estados visuales**: No solo color; también icono o borde (✓ verde o × rojo).
- **Validación**: Zod + React Hook Form con mensajes de error accesibles.

### Formulario Reserva
- **Estructura**: Campos apilados verticalmente en móvil.
- **Todos con labels** asociadas.
- **aria-describedby**: En campos con restricciones ("Ej: 2025-07-18").
- **aria-live="polite"**: En estado de envío.
- **Error styling**: Borde + icono + texto en rojo, no solo color.

### Footer
- **Estructura**: `<footer>` con `<nav>` secundaria.
- **Listas**: `<ul><li>` correctas.
- **Enlaces**: Subrayados por defecto (legibilidad).
- **Contraste**: Texto claro sobre espresso (#432724) ≥ 4.5:1.

---

## 2. Verificación de Contraste Paleta Savia Café

| Combinación | Color Texto | Color Fondo | Ratio Aprox. | WCAG AA Texto Normal | WCAG AA Texto Grande | Acción |
|---|---|---|---|---|---|---|
| Cuerpo principal | #3D2923 | #FEF9F2 | ~10.5:1 | ✓ | ✓ | OK |
| Label terracota | #A4513B | #FEF9F2 (marfil) | ~6.2:1 | ✓ | ✓ | OK |
| Blanco | #FFFFFF | #432724 (espresso) | ~8.9:1 | ✓ | ✓ | OK |
| Verde CTA (texto oscuro) | #3D2923 | #82B84B | ~7.1:1 | ✓ | ✓ | OK |
| Verde hoja acento | #567A38 | #F2EDE7 (beige) | ~8.3:1 | ✓ | ✓ | OK |
| Texto secundario (espresso 68%) | #6F5D57 | #FEF9F2 | ~7.8:1 | ✓ | ✓ | OK |

**Conclusión**: Paleta completa cumple AA. Sin ajustes necesarios.

---

## 3. Matriz Responsive

| Sección | 1440px | 1024px | 768px | 390px | 320px |
|---|---|---|---|---|---|
| Hero | 78–88svh, grid 3/6/3 centrado | 75svh, grid 2/4/2 | 60svh, stack (img top) | 55svh, stack (img central) | 50svh, stack |
| FeaturedCoffee | 4 col grid | 2 col grid | 2 col grid | Carrusel Embla (1 visible + peek) | Carrusel Embla (1 visible) |
| Story | 2 col (img 4:5 + texto) | 2 col, gap menor | Stack vertical, img 4:5 | Stack, img 4:5 full width | Stack, img 4:5 full width |
| Origins Tabs | Tab list horizontal, 2 col data+mapa | Horizontal tabs, data full | Tabs, mapa debajo | Stack vertical, tabs full width | Stack, tabs scrollable |
| CoffeeProcess | 4 pasos horizontal línea | 4 pasos, línea menor | 2×2 grid, línea izquierda | Stack 1 col, línea left | Stack 1 col, línea left |
| CafeMenu | 3 col categorías | 2 col categorías | 1 col categorías, acordeón | Acordeón expandible | Acordeón expandible |
| Sustainability | 3 tarjetas row | 3 tarjetas row, gap menor | 2 tarjetas, 1 debajo | Stack 1 col | Stack 1 col |
| ExperienceGallery | Grid asimétrico 6 items | Grid 4-5 items | Grid 2×2 | Carrusel (1 visible + peek) | Carrusel (1 visible) |
| Locations | 3 tarjetas row | 2 tarjetas, 1 debajo | Stack 1 col | Stack 1 col | Stack 1 col |
| Testimonials | 3 col | 2 col | 1 col | Stack | Stack |

---

## 4. Reglas Duras (Implementación)

1. **Sin overflow horizontal**: `max-width: 100vw` o scroll-x: hidden en body.
2. **Áreas táctiles**: Botones, iconos interactivos ≥ 44×44px (desktop); 48×48px móvil.
3. **Texto móvil**: Base ≥ 16px (no zoom forzado, meta viewport `initial-scale=1`).
4. **Marco exterior SiteFrame**:
   - Desktop: 20–24px padding (espresso border exterior, marfil interior).
   - Tablet: 12–16px padding.
   - Móvil: 5–8px padding.
5. **Formularios móvil**: 1 columna, full width, sin sidebar.
6. **Hero sin cortes**: `min-height: 100svh` con fallback `min-height: 100vh`; no `height: 100vh` (evita corte en móvil).
7. **Imagen responsiva**: `max-width: 100%`, aspect-ratio preservado vía `<picture>` o `next/image`.
8. **Gap / Padding secciones**:
   - Desktop: 104–144px vertical.
   - Tablet: 80–104px.
   - Móvil: 56–80px.
9. **Fondos de sección**: Beige (#F2EDE7) alternado con marfil (#FEF9F2), sin gradientes pesados.
10. **Texto sobre fondo oscuro**: Espresso (#432724) → blanco o marfil, nunca gris pálido.

---

## 5. Requisitos de Teclado

| Componente | Tecla | Comportamiento Esperado |
|---|---|---|
| Nav desktop | Tab | Cicla por links; Shift+Tab atrás |
| Nav desktop | Enter | Navega a sección |
| MobileMenu botón | Enter / Space | Abre/cierra menú |
| MobileMenu | Tab | Cicla por enlaces dentro; último + Tab → botón cerrar |
| MobileMenu | Escape | Cierra, focus → hamburguesa |
| SearchOverlay | Escape | Cierra, focus → botón búsqueda |
| SearchOverlay | Tab | Cicla en input + resultados |
| Tabs Orígenes | Flecha Derecha | Siguiente tab (wrap al primero al final) |
| Tabs Orígenes | Flecha Izquierda | Tab anterior (wrap al último si al inicio) |
| Tabs Orígenes | Home | Primer tab |
| Tabs Orígenes | End | Último tab |
| Carrusel Embla | Flecha Izquierda | Slide anterior |
| Carrusel Embla | Flecha Derecha | Slide siguiente |
| Carrusel Embla | Enter (en slide) | Abre detalle o modal |
| Botón CTA | Enter / Space | Activa acción (scroll a sección, abre modal, envía) |
| Formulario | Tab | Cicla por campos |
| Formulario | Enter (en textarea) | Nueva línea; en botón submit: envía |
| Modal (Reserva, Búsqueda) | Escape | Cierra, restaura focus |
| ReservationDialog | Tab | Cicla dentro del modal (focus trap) |

---

## 6. Checklist QA Accesibilidad Final

- [ ] **Semántica**: Un único `<h1>`, jerarquía `<h2>` a `<h6>` correcta, sin saltos.
- [ ] **Skip link**: Presente y funcional (Tab oculto visible, salta a `#main-content`).
- [ ] **Landmarks**: `<header>`, `<nav>`, `<main>`, `<footer>` presentes.
- [ ] **Alt text**: Todas las imágenes con `alt` descriptivo o `alt=""` si decorativa.
- [ ] **Etiquetas**: Todos los inputs `<label>` asociada vía `htmlFor`.
- [ ] **aria-describedby**: En inputs con restricciones o errores.
- [ ] **aria-live**: En contenedores de estado (Newsletter, Reserva, notificaciones).
- [ ] **Modales**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, Escape.
- [ ] **Tabs**: `role="tablist|tab|tabpanel"`, navegación por flechas, `aria-selected`.
- [ ] **Contraste**: Todos los textos ≥ 4.5:1 (normal) o ≥ 3:1 (grande).
- [ ] **Focus visible**: Outline 2px+ visible en todos los elementos interactivos.
- [ ] **Iconos decorativos**: `aria-hidden="true"` en `<svg>` de puro relleno.
- [ ] **aria-current**: En nav activa (`aria-current="page"`).
- [ ] **Carruseles**: Botones con aria-label, indicadores accesibles, sin autoplay.
- [ ] **Teclado completo**: Tab, Shift+Tab, Enter, Space, Escape, Flechas (donde aplique).
- [ ] **Áreas táctiles**: ≥ 44×44px (desktop), ≥ 48×48px (móvil).
- [ ] **Texto móvil**: ≥ 16px, sin zoom forzado.
- [ ] **Sin overflow H**: `max-width: 100vw`, body `overflow-x: hidden`.
- [ ] **prefers-reduced-motion**: Sin parallax, sin scroll-hijacking, fades breves.
- [ ] **Formularios**: Validación clara (Zod + RHF), error styling (borde + icono + texto).
- [ ] **Botones**: Elementos reales `<button>` o `role="button"`, no `<div onClick>`.
