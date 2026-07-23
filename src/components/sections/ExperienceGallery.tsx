import { ArrowUpRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MatFrame } from "@/components/ui/MatFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/config/site";
import { galleryImages } from "@/data/gallery";
import { cn } from "@/lib/cn";
import { ExperienceGalleryCarousel } from "./ExperienceGalleryCarousel";

const gridPlacement = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-3",
  "md:col-span-4",
] as const;

// Sello verde encajado en la esquina de la pieza prominente (dispositivo del Hero).
const prominentBadge = (
  <div className="notch-tr absolute right-2 top-2 z-10 rounded-bl-[18px] rounded-tr-[18px] bg-crema-clara p-2 sm:right-3 sm:top-3 sm:p-2.5 sm:[--notch:22px]">
    <span className="inline-flex items-center gap-2 rounded-xl bg-verde px-3 py-2 text-crema-clara sm:rounded-2xl">
      <Leaf className="size-4 shrink-0 sm:size-5" strokeWidth={1.75} aria-hidden />
      <span className="whitespace-nowrap text-[0.75rem] font-bold uppercase tracking-[0.14em]">
        {site.name}
      </span>
    </span>
  </div>
);

export function ExperienceGallery() {
  const carouselSlides = galleryImages.map((image) => (
    <SmartImage
      key={image.id}
      src={image.src}
      alt={image.alt}
      width={1200}
      height={1500}
      sizes="86vw"
      radius="md"
      className="w-full"
      imgClassName="object-cover"
    />
  ));

  return (
    <section
      id="experiencias"
      aria-labelledby="experiencias-heading"
      className="bg-crema-clara py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <Reveal className="max-w-3xl">
          <SectionHeading
            id="experiencias-heading"
            display
            eyebrow="La experiencia Savia"
            title="Un espacio para bajar el ritmo"
            intro="Diseñamos cada espacio para conversar, trabajar, leer o simplemente disfrutar una buena taza."
            align="left"
          />
        </Reveal>

        <div className="mt-10 md:mt-12">
          <div className="hidden auto-rows-[clamp(8.5rem,15vw,13rem)] grid-cols-12 gap-2.5 md:grid">
            {galleryImages.map((image, index) => {
              // La pieza prominente va enmarcada; el resto a sangre con hover.
              if (image.prominent) {
                return (
                  <Reveal
                    key={image.id}
                    className={cn("h-full min-h-0", gridPlacement[index])}
                  >
                    <MatFrame
                      size="lg"
                      className="h-full"
                      innerClassName="h-full"
                      overlay={prominentBadge}
                    >
                      <SmartImage
                        src={image.src}
                        alt={image.alt}
                        width={1600}
                        height={1200}
                        sizes="(min-width:1024px) 55vw, 58vw"
                        radius="none"
                        className="h-full w-full"
                        imgClassName="object-cover"
                      />
                    </MatFrame>
                  </Reveal>
                );
              }

              return (
                <Reveal
                  key={image.id}
                  className={cn(
                    "group min-h-0 overflow-hidden rounded-[14px]",
                    gridPlacement[index]
                  )}
                >
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={900}
                    sizes="(min-width:1024px) 35vw, 40vw"
                    radius="md"
                    className="h-full w-full"
                    imgClassName="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.015]"
                  />
                </Reveal>
              );
            })}
          </div>

          <ExperienceGalleryCarousel slides={carouselSlides} />
        </div>

        <Reveal className="mt-10 flex justify-start md:mt-12">
          <Button variant="primary" href="#ubicaciones">
            Visitar nuestras cafeterías
            <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
