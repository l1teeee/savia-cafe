"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

interface FeaturedCoffeeCarouselProps {
  slides: React.ReactNode[];
}

export function FeaturedCoffeeCarousel({ slides }: FeaturedCoffeeCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    dragFree: false,
  });

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      setPrevDisabled(!emblaApi.canScrollPrev());
      setNextDisabled(!emblaApi.canScrollNext());
    };

    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);
    handleSelect();

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi]);

  const handlePrevClick = () => emblaApi?.scrollPrev();
  const handleNextClick = () => emblaApi?.scrollNext();
  const goToSlide = (index: number) => emblaApi?.scrollTo(index);

  return (
    <div
      className="flex w-full min-w-0 flex-col gap-4 md:hidden"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Cafés destacados"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          emblaApi?.scrollPrev();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          emblaApi?.scrollNext();
        }
      }}
    >
      <div className="min-w-0 overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${slides.length}`}
              aria-hidden={index !== selectedIndex}
              inert={index !== selectedIndex}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-borde pt-2">
        <div className="flex">
          <IconButton
            label="Anterior"
            onClick={handlePrevClick}
            disabled={prevDisabled}
            className="rounded-none disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft size={18} strokeWidth={1.5} aria-hidden />
          </IconButton>
          <IconButton
            label="Siguiente"
            onClick={handleNextClick}
            disabled={nextDisabled}
            className="rounded-none disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight size={18} strokeWidth={1.5} aria-hidden />
          </IconButton>
        </div>

        <div
          className="flex min-w-0 items-center justify-center"
          role="group"
          aria-label="Elegir café"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al café ${index + 1}`}
              aria-pressed={index === selectedIndex}
              className="inline-flex min-h-11 w-7 items-center justify-center"
            >
              <span
                className={`inline-block h-px transition-[width,background-color] motion-reduce:transition-none ${
                  index === selectedIndex ? "w-5 bg-tinta" : "w-3 bg-borde"
                }`}
                aria-hidden
              />
            </button>
          ))}
        </div>

        <p
          className="text-xs font-medium tabular-nums text-texto-secundario"
          aria-live="polite"
        >
          {String(selectedIndex + 1).padStart(2, "0")}/
          {String(slides.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
