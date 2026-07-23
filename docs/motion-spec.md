# Especificación de Animaciones — Savia Café

Motion for React (`motion/react`), React 19, Next.js App Router. Componentes animados como client components.

---

## 1. Constantes del Sistema

Archivo: `src/lib/motion.ts`

```typescript
import type { Variants } from 'motion/react';

export const MOTION = {
  duration: {
    fast: 0.3,      // 300ms (botones, hover sutil)
    base: 0.65,     // 650ms (reveal estándar)
    slow: 1,        // 1000ms (parallax, transiciones de página)
  },
  ease: [0.22, 1, 0.36, 1],  // Cubic Bezier suave
  reveal: {
    distance: 24,              // 24px desplazamiento inicial
    margin: '-80px',           // Inicia animación 80px antes de entrar
    once: true,                // Solo una vez
  },
  stagger: 80,                 // 80ms entre items
  parallax: { max: 12 },       // Max 12px (solo desktop)
} as const;

// Variantes tipadas de Motion
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: MOTION.reveal.distance },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.duration.base,
        ease: MOTION.ease,
        delay: i * (MOTION.stagger / 1000),
      },
    }),
  } as Variants,

  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: MOTION.duration.base, ease: MOTION.ease },
    },
  } as Variants,

  scaleSubtle: {
    hidden: { scale: 0.98, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: MOTION.duration.base, ease: MOTION.ease },
    },
  } as Variants,

  containerStagger: {
    visible: {
      transition: { staggerChildren: MOTION.stagger / 1000 },
    },
  } as Variants,
} as const;
```

---

## 2. Catálogo de Animaciones por Componente

### Reveal de Sección
```typescript
import { motion } from 'motion/react';
import { MOTION, variants } from '@/lib/motion';

<motion.section
  initial="hidden"
  whileInView="visible"
  variants={variants.fadeUp}
  viewport={{ margin: MOTION.reveal.margin, once: MOTION.reveal.once }}
>
```

### Stagger de Cards (Embla, grid)
```typescript
<motion.div
  variants={variants.containerStagger}
  initial="hidden"
  whileInView="visible"
  viewport={{ margin: MOTION.reveal.margin, once: MOTION.reveal.once }}
>
  {items.map((item, i) => (
    <motion.div key={item.id} variants={variants.fadeUp} custom={i}>
      {/* card content */}
    </motion.div>
  ))}
</motion.div>
```

### Hover de Imagen
```typescript
// Escala máx 1.03, 600ms, suave (no rebote)
<motion.img
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.6, ease: MOTION.ease }}
/>
```

### Botones
```typescript
// Hover 1.015 / Active 0.985
<motion.button
  whileHover={{ scale: 1.015 }}
  whileTap={{ scale: 0.985 }}
  transition={{ duration: MOTION.duration.fast, ease: MOTION.ease }}
/>
```

### Enlaces con Subrayado Animado (CSS puro)
```css
/* src/styles/link-underline.css */
a.link-underline {
  position: relative;
  text-decoration: none;
  color: inherit;
}

a.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

a.link-underline:hover::after,
a.link-underline:focus::after {
  width: 100%;
}
```

### Tabs de Orígenes (Crossfade + desplazamiento sutil)
```typescript
import { AnimatePresence } from 'motion/react';

<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.32, ease: MOTION.ease }}
  >
    {/* tab content */}
  </motion.div>
</AnimatePresence>
```

### Header Compacto (sin layout shift)
```typescript
// Técnica: padding simulado con transform, no height
<motion.header
  style={{
    backgroundColor: 'rgba(244, 239, 233, 0.9)',
    backdropFilter: 'blur(8px)',
  }}
  animate={{ paddingBlock: isCompact ? '0.75rem' : '1.25rem' }}
  transition={{ duration: 0.4, ease: MOTION.ease }}
/>
```

### Menú Móvil (entrada/salida)
```typescript
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: MOTION.duration.fast }}
    >
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.4, ease: MOTION.ease }}
      >
        {/* nav items */}
      </motion.nav>
    </motion.div>
  )}
</AnimatePresence>
```

### Overlays (fade + y sutil)
```typescript
<motion.div
  initial={{ opacity: 0, y: -12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -12 }}
  transition={{ duration: 0.3, ease: MOTION.ease }}
/>
```

### Parallax Botánico (solo desktop, max 12px)
```typescript
import { useScroll, useTransform, motion } from 'motion/react';

function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [MOTION.parallax.max, -MOTION.parallax.max]);

  return (
    <motion.div ref={ref} style={{ y }} className="hidden md:block">
      {/* botanical image */}
    </motion.div>
  );
}
```

---

## 3. `prefers-reduced-motion` — Estrategia Global

### Hook personalizado
```typescript
// src/hooks/useReducedMotion.ts
import { useReducedMotion as useMotionReducedMotion } from 'motion/react';

export function useReducedMotion() {
  return useMotionReducedMotion() ?? false;
}
```

### Variantes adaptables
```typescript
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: MOTION.reveal.distance },
    visible: (i = 0, reduceMotion = false) => ({
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: MOTION.duration.base, ease: MOTION.ease, delay: i * (MOTION.stagger / 1000) },
    }),
  } as Variants,
};
```

### Qué se desactiva
- Parallax botánico (scroll transform)
- Desplazamientos (y, x)
- Stagger de items (delay anulado)

### Qué se conserva
- Fades breves (opacidad 300ms → instantáneo es muy abrupto)
- Cambios instantáneos en escalas y rotaciones si hay contenido dinámico

---

## 4. Lista Negra Explícita

Prohibido en todas las animaciones:

- **Rebotes** (`bounce`, `elastic` easings)
- **Elasticidad** (`spring` sin control)
- **Scroll hijacking** (cambiar scroll, parallax perpetuo)
- **Animaciones perpetuas** (loops infinitos, `repeat: Infinity`)
- **Blur animado** (`filter: blur()` en transiciones = jank)
- **Duraciones > 1s** (salvo parallax controlado por viewport)

---

## 5. Rendimiento

### Buenas Prácticas

1. **Solo transform/opacity**
   - Animar: `transform` (scale, rotate, translate), `opacity`
   - NO: width, height, left, top, padding, margin, background-color

2. **will-change puntual**
   ```css
   .animated-element {
     will-change: transform, opacity;
   }
   /* Remover después de la animación con CSS o JS */
   ```

3. **No animar fuera de viewport**
   - Motion usa `whileInView` con margin para iniciar sólo cuando es visible
   - Viewport detection automático: evita renders innecesarios

4. **Limpiar listeners**
   ```typescript
   useEffect(() => {
     return () => {
       // Scroll listeners se limpian automáticamente en motion/react
     };
   }, []);
   ```

5. **Desactivar parallax en mobile**
   ```typescript
   className="hidden md:block" // Parallax solo desktop
   ```

---

**Última actualización:** 2026-07-18  
**Librería:** Motion for React (motion/react)  
**React:** 19 | **Next.js:** 16.2+ App Router
