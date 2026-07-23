import { ArrowUpRight, Leaf } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { MatFrame } from "@/components/ui/MatFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

const principles = [
  {
    title: "Café de especialidad",
    description:
      "Seleccionamos orígenes con carácter y transparencia en toda la cadena.",
  },
  {
    title: "Tostado en pequeños lotes",
    description:
      "Revelamos el perfil único de cada origen con precisión y cuidado.",
  },
  {
    title: "Proveedores responsables",
    description:
      "Relaciones directas que respetan a las personas y los territorios.",
  },
  {
    title: "Preparación artesanal",
    description:
      "Cada método —filtrado, espresso o prensa— ejecutado sin prisa.",
  },
];

export function Story() {
  return (
    <section
      id="historia"
      aria-labelledby="historia-heading"
      className="section-pad bg-crema"
    >
      <Container>
        <div className="grid items-start gap-y-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-14 xl:gap-x-16">
          {/* Columna editorial: titular display, intro, principios y enlace */}
          <Reveal className="lg:col-span-5">
            <SectionHeading
              display
              align="left"
              id="historia-heading"
              eyebrow="Nuestra historia"
              title="Una historia que comienza en el origen"
            />

            <p className="mt-6 max-w-xl text-base leading-7 text-texto-secundario lg:text-lg lg:leading-8">
              Savia Café nace del respeto por las personas, los territorios y
              los procesos que existen detrás de cada taza. Creamos espacios
              donde el café se disfruta sin prisa y cada detalle tiene una razón.
            </p>

            {/* Principios con hairlines calidos y numeracion 01-04 */}
            <ul className="mt-8 grid grid-cols-2 border-t border-borde sm:mt-10">
              {principles.map((principle, index) => (
                <li
                  key={principle.title}
                  className={cn(
                    "border-b border-borde py-5",
                    index % 2 === 0
                      ? "border-r border-borde pr-5 sm:pr-8"
                      : "pl-5 sm:pl-8"
                  )}
                >
                  <span className="font-display text-base leading-none text-verde">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold leading-5 text-tinta">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-texto-secundario">
                    {principle.description}
                  </p>
                </li>
              ))}
            </ul>

            <a
              href="#origenes"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-tinta transition-colors hover:text-verde motion-reduce:transition-none"
            >
              Conocer nuestra historia
              <ArrowUpRight
                className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                strokeWidth={1.75}
                aria-hidden
              />
            </a>
          </Reveal>

          {/* Retrato grande enmarcado con sello verde encajado (notch-bl) */}
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.05}>
            <MatFrame
              size="lg"
              overlay={
                <div className="notch-bl absolute bottom-2 left-2 z-10 rounded-bl-[18px] rounded-tr-[18px] bg-crema-clara p-2.5 sm:bottom-3 sm:left-3 sm:rounded-bl-[26px] sm:rounded-tr-[24px] sm:p-3 sm:[--notch:22px]">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-verde px-3 py-2 text-crema-clara sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-2.5">
                    <Leaf
                      className="size-[18px] shrink-0 sm:size-5"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="whitespace-nowrap text-[0.75rem] font-bold uppercase tracking-[0.14em] sm:text-sm">
                      {site.name}
                    </span>
                  </span>
                </div>
              }
            >
              <SmartImage
                src="/images/story/roastery-interior.webp"
                alt="Interior de la tostería Savia Café"
                width={1200}
                height={1500}
                sizes="(min-width:1024px) 48vw, 92vw"
                radius="none"
                className="h-full w-full"
                imgClassName="object-cover"
              />
            </MatFrame>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
