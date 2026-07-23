"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface ExperienceGalleryCarouselProps {
  slides: React.ReactNode[];
}

export function ExperienceGalleryCarousel({
  slides,
}: ExperienceGalleryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(slides.length > 1);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!emblaApi) return;

    const updateControls = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateControls);
    updateControls();

    return () => {
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateControls);
    };
  }, [emblaApi]);

  const jump = prefersReducedMotion;

  return (
    <div
      className="md:hidden"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Galería de la experiencia Savia Café"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          emblaApi?.scrollPrev(jump);
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          emblaApi?.scrollNext(jump);
        }
      }}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_92%] pr-2"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${slides.length}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <IconButton
          label="Imagen anterior"
          onClick={() => emblaApi?.scrollPrev(jump)}
          disabled={!canScrollPrev}
          className="h-11 w-11 shrink-0 !rounded-none border-b border-borde hover:!bg-transparent disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={20} strokeWidth={1.5} aria-hidden />
        </IconButton>

        <p
          className="min-w-0 text-center text-sm text-texto-secundario"
          aria-live="polite"
          aria-atomic="true"
        >
          Imagen {selectedIndex + 1} de {slides.length}
        </p>

        <IconButton
          label="Imagen siguiente"
          onClick={() => emblaApi?.scrollNext(jump)}
          disabled={!canScrollNext}
          className="h-11 w-11 shrink-0 !rounded-none border-b border-borde hover:!bg-transparent disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={20} strokeWidth={1.5} aria-hidden />
        </IconButton>
      </div>

      <div
        className="mx-auto grid w-full max-w-72 grid-cols-6"
        role="group"
        aria-label="Seleccionar imagen"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index, jump)}
            aria-label={`Ir a la imagen ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
            className="inline-flex h-11 w-11 items-center justify-center justify-self-center transition-opacity hover:opacity-70"
          >
            <span
              aria-hidden
              className={
                selectedIndex === index
                  ? "h-px w-8 bg-verde"
                  : "h-px w-8 bg-borde"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}
