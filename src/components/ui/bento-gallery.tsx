"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  useEscape,
  useFocusTrap,
  usePrefersReducedMotion,
  useScrollLock,
} from "@/lib/hooks";
import { DUR, EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/cn";

export interface BentoGalleryItem {
  id: number | string;
  title: string;
  desc: string;
  url: string;
  alt: string;
  span: string;
}

interface InteractiveImageBentoGalleryProps {
  imageItems: BentoGalleryItem[];
  title: string;
  description: string;
  eyebrow?: string;
  id?: string;
  headingId?: string;
  footer?: React.ReactNode;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DUR.base,
      ease: EASE,
    },
  },
};

function ImageModal({
  item,
  onClose,
}: {
  item: BentoGalleryItem;
  onClose: () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const trapRef = useFocusTrap<HTMLDivElement>(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  useScrollLock(true);
  useEscape(true, onClose);

  const transition = {
    duration: prefersReducedMotion ? 0 : DUR.fast,
    ease: EASE,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-tinta/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 16, scale: 0.98 }
        }
        transition={transition}
        className="relative my-auto w-full max-w-6xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 z-10 inline-flex size-11 items-center justify-center rounded-full bg-crema-clara text-tinta shadow-lg transition-colors hover:bg-verde hover:text-crema-clara sm:right-3 sm:top-3"
          aria-label="Cerrar imagen ampliada"
        >
          <X size={22} strokeWidth={1.75} aria-hidden />
        </button>

        <figure>
          <div className="relative h-[min(72vh,50rem)] w-full overflow-hidden rounded-[20px] bg-cafe">
            <Image
              src={item.url}
              alt={item.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <figcaption className="mx-auto mt-4 max-w-3xl text-center text-crema-clara">
            <h3
              id={titleId}
              className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl"
            >
              {item.title}
            </h3>
            <p
              id={descriptionId}
              className="mt-1 text-sm leading-relaxed text-crema-clara/75 sm:text-base"
            >
              {item.desc}
            </p>
          </figcaption>
        </figure>
      </motion.div>
    </motion.div>
  );
}

export default function InteractiveImageBentoGallery({
  imageItems,
  title,
  description,
  eyebrow,
  id,
  headingId: suppliedHeadingId,
  footer,
}: InteractiveImageBentoGalleryProps) {
  const generatedHeadingId = useId();
  const headingId = suppliedHeadingId ?? generatedHeadingId;
  const [selectedItem, setSelectedItem] =
    useState<BentoGalleryItem | null>(null);
  const [dragConstraint, setDragConstraint] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement>(null);
  const draggedRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const calculateConstraints = () => {
      if (!gridRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const gridWidth = gridRef.current.scrollWidth;
      setDragConstraint(Math.min(0, containerWidth - gridWidth));
    };

    calculateConstraints();

    const resizeObserver = new ResizeObserver(calculateConstraints);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (gridRef.current) resizeObserver.observe(gridRef.current);

    window.addEventListener("resize", calculateConstraints);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateConstraints);
    };
  }, [imageItems]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0, 0.18], [24, 0]);

  const openItem = (item: BentoGalleryItem) => {
    if (!draggedRef.current) setSelectedItem(item);
  };

  return (
    <>
      <section
        ref={targetRef}
        id={id}
        aria-labelledby={headingId}
        className="relative w-full overflow-hidden bg-crema-clara py-16 sm:py-20 lg:py-24"
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { opacity, y }}
          className="w-full px-5 sm:px-7 md:px-8 lg:px-10 xl:px-12"
        >
          <SectionHeading
            id={headingId}
            display
            eyebrow={eyebrow}
            title={title}
            intro={description}
            align="center"
          />
        </motion.div>

        <div
          ref={containerRef}
          className="relative mt-10 w-full cursor-grab active:cursor-grabbing sm:mt-12"
          role="region"
          aria-label="Galería interactiva de la experiencia Savia. Arrastra horizontalmente para explorar."
        >
          <motion.div
            className="w-max"
            drag="x"
            dragConstraints={{ left: dragConstraint, right: 0 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => {
              draggedRef.current = true;
            }}
            onDragEnd={() => {
              window.setTimeout(() => {
                draggedRef.current = false;
              }, 0);
            }}
          >
            <motion.div
              ref={gridRef}
              className="grid h-[30rem] grid-flow-col grid-rows-2 auto-cols-[14rem] gap-3 sm:h-[34rem] sm:auto-cols-[17rem]"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {imageItems.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  variants={
                    prefersReducedMotion
                      ? {
                          hidden: { opacity: 1 },
                          visible: { opacity: 1 },
                        }
                      : itemVariants
                  }
                  whileHover={
                    prefersReducedMotion ? undefined : { y: -3, scale: 1.01 }
                  }
                  whileTap={
                    prefersReducedMotion ? undefined : { scale: 0.99 }
                  }
                  transition={{ duration: DUR.fast, ease: EASE }}
                  onClick={() => openItem(item)}
                  className={cn(
                    "group relative min-h-0 min-w-0 cursor-zoom-in overflow-hidden rounded-[18px] bg-cafe text-left shadow-[0_12px_35px_rgba(56,46,40,0.12)]",
                    item.span
                  )}
                  aria-label={`Ampliar: ${item.title}`}
                >
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 640px) 34rem, 28rem"
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-tinta/90 via-tinta/15 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 z-10 block p-4 text-crema-clara sm:p-5">
                    <span className="block text-base font-semibold tracking-[-0.02em] sm:text-lg">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-crema-clara/80 sm:text-sm">
                      {item.desc}
                    </span>
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {footer && (
          <div className="mt-10 flex w-full justify-center px-5 sm:mt-12 sm:px-7 md:px-8">
            {footer}
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
