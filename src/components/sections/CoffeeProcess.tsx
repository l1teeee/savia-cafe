import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export function CoffeeProcess() {
  return (
    <section
      id="proceso"
      aria-labelledby="proceso-heading"
      className="section-pad bg-crema"
    >
      <Container>
        <SectionHeading
          display
          align="left"
          id="proceso-heading"
          eyebrow="Del grano a la taza"
          title="El sabor toma forma"
        />

        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4">
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <StaggerItem key={step.id} className="h-full min-w-0">
                <article className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-borde bg-crema-clara p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-cafe/25 hover:shadow-[0_10px_24px_rgba(60,45,38,0.06)] motion-safe:hover:-translate-y-0.5 motion-reduce:transition-colors lg:p-6">
                  {/* Numero display como marca de agua de fondo */}
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute right-2 top-1 select-none text-[5.5rem] leading-none text-tinta/[0.08] sm:text-[6.5rem]"
                  >
                    {step.number}
                  </span>

                  <div className="relative flex flex-1 flex-col">
                    {/* Chip de icono verde (idioma del Hero) */}
                    <span className="grid size-12 place-items-center rounded-2xl bg-verde text-crema-clara sm:size-13">
                      <Icon
                        className="size-5 sm:size-6"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>

                    <h3 className="mt-5 text-lg font-medium tracking-[-0.015em] text-tinta lg:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-texto-secundario lg:leading-7">
                      {step.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
