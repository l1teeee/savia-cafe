# Auditoría Visual — Savia Café

## Composición General

**Marco exterior (SiteFrame)**: Body espresso (#432724), contenido marfil (#FEF9F2) dentro de borde visible.
- Desktop: 20-24px (usar 24px)
- Tablet: 12-16px (usar 16px)
- Móvil: 5-8px (usar 8px)

**Alternancia de fondos por sección** (de arriba a abajo):
1. Marfil (#FEF9F2)
2. Marfil
3. Marfil
4. Beige (#F2EDE7)
5. Marfil
6. Marfil
7. Beige (#F2EDE7)
8. Marfil
9. Marfil
10. Marfil
11. Espresso (#432724)
12. Espresso (#432724)

**Ritmo vertical** (gap entre secciones, padding-block de cada sección):
- Desktop: 120-144px padding-block, ~30-40px gap visual. Usar clamp(7.5rem, 8vw, 9rem).
- Tablet (1024px): 96-112px padding-block. Usar clamp(6rem, 10vw, 7rem).
- Móvil (768px): 64-80px padding-block. Usar clamp(4rem, 12vw, 5rem).

## Jerarquía Tipográfica

**Montserrat** (variable vía `--font-montserrat`), sin serifs en web (título "Donde el origen..." se ve serif en captura = interpretación visual del peso ligero).

| Elemento | Tamaño | Peso | Tracking | Clamp Value |
|----------|--------|------|----------|-------------|
| Hero (h1) | 64px desktop | 300 | -0.02em | `clamp(2.6rem, 5vw, 4.5rem)` |
| Sección (h2) | 40px desktop | 300-400 | 0.05em | `clamp(2rem, 3vw, 3.5rem)` |
| Subtítulo (h3) | 24px | 500 | 0.1em | `clamp(1.5rem, 2vw, 2rem)` |
| Cuerpo (p, li) | 16-18px | 400 | 0.02em | `1rem / 1.125rem` (1.6-1.8 line-height) |
| Label (botones, tags, nav) | 12px | 600 | 0.15em | `0.75rem uppercase` |

Interlineado mínimo 1.6; en heroico 1.1.

## 12 Secciones — Proporciones y Responsive

### 1. Inicio (Hero)
- Alto mínimo: 78-88svh
- Grid: 3 / 6 / 3 columnas (desktop), 1 columna (móvil <768px). Imagen cuadrada centrada.
- Imagen placeholder: quadrado 1:1, max 400-480px.
- Padding: 80px top + 60px bottom (desktop); 60px top + 40px bottom (tablet); 40px + 20px (móvil).
- Responsive: 1440px (3/6/3 visible) → 1024px (stack a 2x2) → 768px (1 col, imagen 70% ancho).

### 2. Nuestro Café (Featured Coffee)
- Grid: 4 columnas (desktop), 2 (tablet 1024), carrusel móvil <768.
- Card: aspect-ratio 3:4 (imagen), padding 16px, gap 12px interior.
- Margin horizontal: 80px (desktop), 48px (tablet), 24px (móvil).
- Padding vertical: clamp(5rem, 8vw, 7rem).

### 3. Historia (Story)
- Grid: 2 columnas gap 96px (desktop), stack (móvil).
- Imagen 4:5 aspect-ratio, rounded-lg (1rem).
- Texto columna: max-width 550px, padding 24px interior.
- Responsive: 1440 (50/50) → 768 (imagen 100%, texto abajo).

### 4. Orígenes (Origins)
- Fondo: beige (#F2EDE7).
- Tabs centradas, underline activo (color verde #567A38).
- Grid 2 col (datos + mapa): 1024px+ / stack móvil.
- Mapa ilustrado: aspect-ratio 1:1 ó 4:5, rounded-xl (3rem).
- Padding: clamp(5rem, 8vw, 8rem) vertical, 80px horizontal (desktop), 48px (tablet), 24px (móvil).

### 5. Proceso (Coffee Process)
- 4 pasos horizontales (desktop), vertical línea izquierda (móvil).
- Cada paso: icono 48x48px, círculo suave, línea conectora pixel 1.5px verde.
- Gap entre pasos: 48px (desktop), 24px (móvil).
- Padding: clamp(5rem, 8vw, 7rem).

### 6. Menú (Café Menu)
- 3 columnas editoriales (desktop), acordeones (móvil).
- Filas: nombre left-aligned, línea punteada flexible, precio right-aligned.
- 3 imágenes insertas: aspect-ratio 16:9, rounded-lg, max-width 100%.
- Gaps: 24px entre ítems, 48px entre columnas.

### 7. Sostenibilidad (Sustainability)
- Fondo: beige (#F2EDE7).
- 3 cards grid (desktop), stack (móvil).
- Card: borde suave (1px #D4C3C0), padding 32px, rounded-lg.
- Métrica (número + label): número 48px peso 600 verde (#82B84B), label 12px peso 600.
- Padding sección: clamp(5rem, 8vw, 8rem).

### 8. Experiencias (Gallery)
- Grid asimétrico desktop (1 grande 2:2 + 4 pequeñas 1:1 ó similar).
- Carrusel Embla móvil, peek 20-30% siguiente card.
- Radios: 1.5rem (lg).
- Gap: 24px (desktop), 16px (móvil).

### 9. Ubicaciones (Locations)
- 3 cards grid (desktop), stack (móvil).
- Card: padding 32px, borde suave, sin fondo o fondo arena (#E6DDD3) muy tenue.
- Botones "Cómo llegar" / "Reservar": outline pastilla, hover verde.
- Responsive: 1440 (3 col) → 768 (2 col) → 390 (1 col).

### 10. Testimonios (Testimonials)
- 3 columnas (desktop), stack (móvil).
- Card: sin borde pesado, línea fina top (#D4C3C0), padding 24px.
- Texto: body-md, line-height 1.8, max-width 350px.
- Rating: 5 estrellas (icono Lucide, color arena #E6DDD3 ó verde activo).

### 11. Newsletter
- Fondo espresso (#432724).
- 2 columnas (desktop): texto izq + formulario der / stack móvil.
- Input email: width 100%, padding 12px 16px, background #F4EFE9 / 95%, placeholder gris.
- Botón: pastilla verde (#82B84B), padding 12px 28px, label 12px bold.
- Checkbox privacidad: margin-bottom 16px, label 12px.
- Padding sección: 80px (desktop), 48px (tablet), 32px (móvil).

### 12. Footer
- Fondo espresso (#432724).
- Texto: marfil (#F4EFE9) o blanco translúcido.
- Grid 4-5 columnas (desktop): logo-desc / compañía / soporte / ubicaciones / legal.
- Stack móvil, separadores finos.
- Padding: 80px top + 40px bottom (desktop); 48px + 32px (móvil).

## Diferencias Captura vs. Prototipo HTML

| Aspecto | Captura (fuente verdad) | Prototipo | Criterio |
|---------|--------------------------|-----------|----------|
| Marca | "Estrella Coffee Roasters" | Tipográfico "Savia Café" + Leaf | **Usar Savia Café.** |
| Imagen hero | Tablero ajedrez (PNG transparent) | Placeholder azul | Usar ImagePlaceholder, no CDN. |
| Hover image | No especificado | scale-110 (600ms) | **Usar max 1.03 / 600ms.** |
| Fondos tabs | Activo underline | Similar | Usar verde (#567A38) + line-height 2px. |
| Radios cards | Prototipo ~8px (lg) | Captura ~12px (xl) | **Usar 1rem (16px), flexible a 1.5rem (24px).** |
| Newsletter input | Fondo claro | Fondo espresso dark | **Seguir captura: fondo claro (#F4EFE9) sobre espresso.** |

Prioridad: **captura en composición, brief en marca y valores**. El HTML prototipo es guía de estructura, no código.

## Riesgos Visuales

1. **Verde como fondo**: Prohibido. Verde (#567A38, #82B84B) SOLO en:
   - Iconos (Lucide, 20-24px, stroke 1.5)
   - CTAs (botones pastilla, hover +5% saturación)
   - Líneas conectoras (proceso, 1.5px)
   - Estados activos (nav underline, tabs)
   - Métricas sostenibilidad (número grande)
   - Nunca `bg-green-*` en secciones.

2. **Sombras pesadas**: Box-shadow máximo `0 2px 8px rgba(0,0,0,0.06)` ó `0 4px 12px rgba(0,0,0,0.08)`. Sin drop-shadow, sin inset, sin blur >12px.

3. **Hover excesivo**: 
   - Imágenes: scale max 1.03, duración 600ms.
   - Botones: scale 1.015 (hover), 0.985 (active).
   - Enlaces: underline suave, no cambio color.

4. **Tipografía móvil**:
   - Mínimo 16px para body (WCAG).
   - h1 móvil NO menos de 24px (usar clamp garantiza).
   - Labels nunca <12px visual.

5. **Breakpoints inconsistentes**: Usar 1440 / 1024 / 768 / 390 / 320. No ad-hoc 900px ó 600px.

6. **Marco truncado en móvil**: Si frame thickness (<8px móvil) desaparece en scroll, contenido quedará flush. Validar overflow hidden en body.

7. **Imágenes placeholder**: No dejar `img` vacío. Usar ImagePlaceholder con aspect-ratio reservado + color fondo arena (#E6DDD3).

8. **CTA verde en fondo beige**: Contraste adecuado (#82B84B sobre #F2EDE7 = ~3.8:1). OK. Sobre espresso = ~8.5:1. Excelente.

---

**Resumen**: Composición editorial aireada, alternancia predecible de fondos, verde de acento restrictivo, tipografía ligera en jerarquía clara. Móvil: stack lineal, radios suaves, accesibilidad WCAG AA (min 16px, contrast, focus visible).
