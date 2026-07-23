import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";

export function SharedMoments() {
  return (
    <section
      id="momentos"
      aria-labelledby="momentos-heading"
      className="bg-crema py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="overflow-hidden rounded-[28px] bg-verde px-6 py-10 shadow-[0_18px_50px_rgba(23,45,33,0.18)] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-verde-claro">
                Momentos Savia
              </p>
              <h2
                id="momentos-heading"
                className="font-display font-display-origin-left mt-3 max-w-md text-[clamp(2rem,4vw,3.25rem)] text-crema-clara"
              >
                Sorbos que se comparten mejor
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-crema-clara/85 sm:text-base">
                Cada taza sale de la barra pensada para una mesa compartida:
                una pausa, una conversación, un instante que vale la pena
                alargar.
              </p>
              <div className="mt-8">
                <Button variant="inverted" href="#ubicaciones">
                  Reserva tu mesa
                  <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.05} className="relative">
              <SmartImage
                src="/images/gallery/barista-brewing.webp"
                alt="Barista sirviendo café de especialidad desde una jarra de vidrio"
                width={900}
                height={1100}
                sizes="(min-width:1024px) 32vw, 88vw"
                radius="lg"
                className="w-full"
                imgClassName="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[16px] bg-tinta/90 p-4 sm:inset-x-6 sm:bottom-6 sm:p-5">
                <p className="text-sm leading-relaxed text-crema-clara sm:text-base">
                  &quot;Porque un gran café no es solo una bebida: es una
                  experiencia para compartir.&quot;
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
