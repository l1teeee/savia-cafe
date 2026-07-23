"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Bean, Coffee, Flame, Leaf, Sprout } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { EASE, groupIn, riseIn, still } from "@/lib/motion";

/*
 * Ordenados de más ligero a más pesado: solo el primero se precarga, y los
 * demás no se descargan hasta que les toca el turno.
 */
const videos = [
  "/videos/hero-01.mp4",
  "/videos/hero-02.mp4",
  "/videos/hero-03.mp4",
];

const methods = [
  { label: "Origen trazable", icon: Sprout },
  { label: "Grano de especialidad", icon: Bean },
  { label: "Tueste propio", icon: Flame },
  { label: "Filtrado y espresso", icon: Coffee },
];

// Mismos valores que los tokens de globals.css: motion necesita el color
// resuelto para poder interpolarlo, no acepta una clase de Tailwind.
const COLOR = {
  crema: "#f1ebdd",
  cremaClara: "#faf7ef",
  tinta: "#171512",
  verde: "#3e7058",
  cafe: "#382e28",
} as const;


/*
 * El marco no se funde con opacity: se mueve solo con transform, que no
 * cuesta repintado y mantiene visible el loader desde el primer frame.
 */
const frame: Variants = {
  hidden: { y: 26, scale: 0.985 },
  visible: {
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

/*
 * Ni los chips ni el badge tienen entrada propia: llegan con el marco, como
 * parte de la misma pieza. Lo único que animan es el color, que arranca
 * invertido y cae a su tono de reposo, anticipando el efecto del hover.
 */
const chip: Variants = {
  hidden: { backgroundColor: COLOR.cremaClara, color: COLOR.cafe },
  visible: {
    backgroundColor: COLOR.cafe,
    color: COLOR.cremaClara,
    transition: { duration: 0.9, ease: EASE },
  },
};

const badge: Variants = {
  hidden: { backgroundColor: COLOR.cremaClara, color: COLOR.verde },
  visible: {
    backgroundColor: COLOR.verde,
    color: COLOR.cremaClara,
    transition: { duration: 0.9, ease: EASE },
  },
};

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState<boolean[]>(() => videos.map(() => false));
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const failedRef = useRef<boolean[]>(videos.map(() => false));

  // Devuelve el siguiente vídeo utilizable. Si todos fallaron mantiene el
  // actual: el loader blanco sigue visible y no se entra en bucle.
  const nextUsable = (from: number) => {
    for (let step = 1; step <= videos.length; step += 1) {
      const candidate = (from + step) % videos.length;
      if (!failedRef.current[candidate]) return candidate;
    }
    return from;
  };

  const handleEnded = useCallback((index: number) => {
    setActive((current) => (current === index ? nextUsable(index) : current));
  }, []);

  const handleError = useCallback((index: number) => {
    failedRef.current[index] = true;
    setActive((current) => (current === index ? nextUsable(index) : current));
  }, []);

  const handleReady = useCallback((index: number) => {
    setReady((current) => {
      if (current[index]) return current;
      const updated = [...current];
      updated[index] = true;
      return updated;
    });
  }, []);

  useEffect(() => {
    if (reduced) return;

    refs.current.forEach((video, index) => {
      if (video && index !== active) video.pause();
    });

    const video = refs.current[active];
    if (!video) return;

    video.currentTime = 0;
    // El autoplay puede rechazarse: se ignora y queda la fotografía de fondo.
    void video.play().catch(() => undefined);
  }, [active, reduced]);

  const pick = (variants: Variants) => (reduced ? still : variants);
  // El cambio de color se mantiene con movimiento reducido: es información,
  // no decoración. Lo que se retira es el desplazamiento.
  const hoverChip = {
    ...(reduced ? {} : { scale: 1.05 }),
    backgroundColor: COLOR.cremaClara,
    color: COLOR.cafe,
  };
  const hoverBadge = {
    ...(reduced ? {} : { scale: 1.03 }),
    backgroundColor: COLOR.cremaClara,
    color: COLOR.verde,
  };
  const tap = reduced ? undefined : { scale: 0.94 };

  return (
    <section
      id="inicio"
      aria-labelledby="inicio-heading"
      className="relative flex min-h-svh flex-col overflow-hidden border-b border-borde/70 bg-crema pt-[var(--header-h)]"
    >
      <Container className="flex min-w-0 flex-1 flex-col py-5 sm:py-6 lg:py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={pick(groupIn)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="shrink-0 text-center">
            <motion.p
              variants={pick(riseIn)}
              className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-tinta/60 sm:text-[0.6875rem] sm:tracking-[0.24em]"
            >
              Un ritual de origen, sorbo a sorbo
            </motion.p>

            {/* El h1 conserva su scaleX de .font-display: si motion animase el
                titular directamente, sobrescribiría ese transform. */}
            <motion.div variants={pick(riseIn)}>
              <h1
                id="inicio-heading"
                className="font-display mx-auto mt-2.5 max-w-[15ch] text-balance text-[clamp(2.05rem,7.2vw,5.25rem)] text-tinta sm:mt-3.5 sm:max-w-none"
              >
                Eleva tu café de cada día
              </h1>
            </motion.div>
          </div>

          <motion.figure
            variants={pick(frame)}
            className="relative mt-4 flex min-h-0 flex-1 flex-col rounded-[24px] bg-crema-clara p-2 shadow-[0_18px_50px_rgba(60,45,38,0.08)] sm:mt-5 sm:rounded-[32px] sm:p-3 lg:mt-6"
          >
            <div className="relative min-h-[30svh] w-full flex-1 overflow-hidden rounded-[18px] bg-white sm:rounded-[26px]">
              {/* Los vídeos se apilan sobre un loader blanco. No se utiliza
                  póster ni fotografía de respaldo, evitando que aparezca una
                  imagen distinta antes de que el vídeo esté preparado. */}
              {!reduced &&
                videos.map((src, index) => (
                  <motion.video
                    key={src}
                    ref={(element) => {
                      refs.current[index] = element;
                    }}
                    src={src}
                    muted
                    playsInline
                    preload={index === 0 ? "auto" : "none"}
                    aria-hidden
                    tabIndex={-1}
                    onCanPlay={() => handleReady(index)}
                    onEnded={() => handleEnded(index)}
                    onError={() => handleError(index)}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: index === active && ready[index] ? 1 : 0,
                    }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="absolute inset-0 size-full object-cover object-center"
                  />
                ))}

              <div
                aria-hidden
                style={{ opacity: !reduced && ready[active] ? 0 : 1 }}
                className="hero-video-loader pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
              />

              <div
                aria-hidden
                style={{ opacity: !reduced && ready[active] ? 1 : 0 }}
                className="pointer-events-none absolute inset-0 z-[2] bg-linear-to-t from-tinta/25 via-transparent to-transparent transition-opacity duration-700"
              />
            </div>

            <motion.div
              role="group"
              aria-label="Cómo trabajamos el café"
              className="notch-tr absolute right-2 top-2 z-10 flex gap-1.5 rounded-bl-[18px] rounded-tr-[18px] bg-crema-clara p-2.5 sm:right-3 sm:top-3 sm:gap-2 sm:rounded-bl-[24px] sm:rounded-tr-[26px] sm:p-3 sm:[--notch:22px]"
            >
              {methods.map(({ label, icon: Icon }) => (
                <motion.span
                  key={label}
                  variants={pick(chip)}
                  whileHover={hoverChip}
                  whileTap={tap}
                  title={label}
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-crema text-tinta sm:size-13 sm:rounded-2xl"
                >
                  <Icon
                    className="size-[18px] sm:size-6"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="sr-only">{label}</span>
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="notch-bl absolute bottom-2 left-2 z-10 rounded-bl-[18px] rounded-tr-[18px] bg-crema-clara p-2.5 sm:bottom-3 sm:left-3 sm:rounded-bl-[26px] sm:rounded-tr-[24px] sm:p-3 sm:[--notch:22px]"
            >
              <motion.div
                variants={pick(badge)}
                whileHover={hoverBadge}
                className="inline-flex items-center gap-2 rounded-xl bg-verde px-3 py-2 text-crema-clara sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-2.5"
              >
                <Leaf
                  className="size-[18px] shrink-0 sm:size-5"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="whitespace-nowrap text-[0.75rem] font-bold uppercase tracking-[0.14em] sm:text-sm">
                  {site.name}
                </span>
              </motion.div>
            </motion.div>

            <figcaption className="sr-only">
              Preparación de café en Savia Café
            </figcaption>
          </motion.figure>
        </motion.div>
      </Container>
    </section>
  );
}
