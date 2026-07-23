# Vídeos del hero

## Dónde colocarlos

```
public/videos/
├── hero-01.mp4
├── hero-02.mp4
└── hero-03.mp4
```

El póster de cada vídeo (primer fotograma) va aparte, junto al resto de imágenes:

```
public/images/hero/
├── hero-01-poster.webp
├── hero-02-poster.webp
└── hero-03-poster.webp
```

Se referencian desde el código como `/videos/hero-01.mp4` y
`/images/hero/hero-01-poster.webp` (sin `public/` en la ruta).

## Especificación técnica

| Parámetro | Valor recomendado | Motivo |
|---|---|---|
| Formato | MP4 (H.264 + `faststart`) | Compatible con todos los navegadores |
| Formato opcional | WebM (VP9) junto al MP4 | ~30% menos peso donde se soporte |
| Resolución | 1920 × 1080 | El marco mide ~1184px; 1080p cubre pantallas retina |
| Duración | 6 – 12 s, en bucle continuo | Ciclos largos pesan y nadie los ve enteros |
| Peso | **< 3 MB por vídeo** | Van sobre el pliegue: condicionan la carga inicial |
| Audio | **Sin pista de audio** | El autoplay solo funciona en silencio; además ahorra peso |
| Encuadre | Sujeto centrado | Se recorta con `object-fit: cover` |

### Sobre el encuadre

El marco del hero no tiene proporción fija: crece hasta llenar la pantalla. En
móvil queda vertical y estrecho, y en escritorio panorámico. El recorte es
agresivo en los extremos, así que **el motivo principal debe ir centrado** y sin
elementos importantes cerca de los bordes.

### Comando de compresión

Con ffmpeg, partiendo de un original:

```bash
ffmpeg -i original.mov \
  -vf "scale=1920:-2" \
  -c:v libx264 -crf 26 -preset slow \
  -movflags +faststart \
  -an \
  public/videos/hero-01.mp4
```

`-an` elimina el audio, `-crf 26` equilibra calidad y peso (baja el número si se
ve con artefactos), y `+faststart` mueve los metadatos al principio para que el
vídeo empiece a reproducirse antes de descargarse entero.

Póster desde el primer fotograma:

```bash
ffmpeg -i public/videos/hero-01.mp4 -vframes 1 -q:v 2 \
  public/images/hero/hero-01-poster.webp
```

## Rendimiento

El `<video>` sustituye a la imagen LCP, así que:

- El atributo `poster` es **obligatorio**: es lo que pinta el navegador
  mientras el vídeo carga y lo que mide el LCP.
- Solo se precarga el primero (`preload="auto"`); los otros dos van en
  `preload="none"` hasta que se necesiten.
- Con `prefers-reduced-motion: reduce` no se reproduce ninguno: se muestra
  únicamente el póster fijo.
