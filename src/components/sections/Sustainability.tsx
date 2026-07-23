import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MatFrame } from "@/components/ui/MatFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import {
  sustainabilityMetrics,
  sustainabilityPillars,
} from "@/data/sustainability";

// Sello verde recurrente encajado en el marco (dispositivo del Hero).
const illustrationBadge = (
  <div className="notch-bl absolute bottom-2 left-2 z-10 rounded-bl-[18px] rounded-tr-[18px] bg-crema-clara p-2 sm:bottom-3 sm:left-3 sm:p-2.5 sm:[--notch:22px]">
    <span className="inline-flex items-center gap-2 rounded-xl bg-verde px-3 py-2 text-crema-clara sm:rounded-2xl">
      <Leaf className="size-4 shrink-0 sm:size-5" strokeWidth={1.75} aria-hidden />
      <span className="whitespace-nowrap text-[0.75rem] font-bold uppercase tracking-[0.14em]">
        Modelo circular
      </span>
    </span>
  </div>
);

export function Sustainability() {
  const hasDemoMetrics = sustainabilityMetrics.some((metric) => metric.isDemo);

  return (
    <section
      id="sostenibilidad"
      aria-labelledby="sostenibilidad-heading"
      className="bg-crema py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <Reveal className="max-w-3xl">
          <SectionHeading
            id="sostenibilidad-heading"
            display
            eyebrow="Sostenibilidad"
            title="Cultivar hoy. Cuidar el mañana."
            intro="Creemos en un modelo circular donde el valor de nuestro café regresa a la tierra y a quienes la trabajan."
            align="left"
          />
        </Reveal>

        {/* Metricas en tarjetas crema-clara: numero grande + label acento */}
        <StaggerGroup className="mt-10 grid gap-3 sm:gap-4 md:mt-12 md:grid-cols-3">
          {sustainabilityMetrics.map((metric) => (
            <StaggerItem key={metric.id} className="h-full">
              <article className="flex h-full flex-col rounded-[20px] border border-borde/70 bg-crema-clara p-6 sm:p-7">
                <p className="text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-none text-tinta">
                  {metric.value}
                </p>
                <span className="mt-5 block h-px w-10 bg-verde/60" aria-hidden />
                <h3 className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-verde">
                  {metric.label}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-texto-secundario">
                  {metric.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {hasDemoMetrics && (
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-texto-secundario">
            Datos de demostración para esta experiencia conceptual; no representan
            métricas verificadas ni compromisos publicados.
          </p>
        )}

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="mx-auto w-full max-w-md">
            {/* Ilustracion botanica enmarcada sobre crema */}
            <MatFrame size="lg" innerClassName="bg-crema" overlay={illustrationBadge}>
              <SmartImage
                src="/images/sustainability/coffee-plant-roots.svg"
                alt="Ilustración botánica de una planta de café con raíces, tierra y cerezas maduras"
                width={1600}
                height={1600}
                sizes="(min-width:1024px) 40vw, 88vw"
                radius="none"
                className="!bg-transparent"
                imgClassName="object-contain p-6 sm:p-8"
              />
            </MatFrame>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-tinta/60">
                Acciones con intención
              </p>
              <h3 className="mt-3 max-w-2xl text-[clamp(1.5rem,2.5vw,2.25rem)] font-light leading-tight text-tinta">
                Compromisos que se convierten en acciones cotidianas
              </h3>
            </Reveal>

            <StaggerGroup className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {sustainabilityPillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <StaggerItem key={pillar.id}>
                    <article className="border-t border-borde pt-5">
                      <span className="grid size-11 place-items-center rounded-2xl bg-verde text-crema-clara sm:size-12">
                        <Icon
                          className="size-5 sm:size-6"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </span>
                      <h4 className="mt-4 text-base font-semibold text-tinta">
                        {pillar.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-texto-secundario">
                        {pillar.description}
                      </p>
                    </article>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>

            <Reveal className="mt-8">
              <Button variant="outline" href="#origenes">
                Conocer nuestro impacto
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
