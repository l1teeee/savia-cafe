import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { origins } from "@/data/origins";
import { OriginsTabs } from "./OriginsTabs";

export function Origins() {
  const originImages: Record<string, React.ReactNode> = {};

  origins.forEach((origin) => {
    originImages[origin.id] = (
      <SmartImage
        src={origin.image}
        alt={`Paisaje cafetalero de ${origin.region}, ${origin.country}`}
        width={1200}
        height={1200}
        sizes="(min-width:1280px) 35vw, (min-width:1024px) 40vw, 90vw"
        radius="none"
        className="w-full bg-crema-clara"
      />
    );
  });

  return (
    <section
      id="origenes"
      aria-labelledby="origenes-heading"
      className="section-pad bg-crema-clara"
    >
      <Container>
        <Reveal className="mb-10 grid gap-5 md:grid-cols-12 md:items-end lg:mb-14 lg:gap-12 xl:gap-16">
          <div className="md:col-span-7 lg:col-span-6">
            <SectionHeading
              display
              align="left"
              id="origenes-heading"
              eyebrow="Orígenes"
              title="Cada origen cuenta una historia"
            />
          </div>
          <p className="max-w-xl text-base leading-7 text-texto-secundario md:col-span-5 md:pb-1 lg:col-span-5 lg:col-start-7 lg:text-lg lg:leading-8">
            Trabajamos con cuatro territorios de carácter único, donde la
            altitud, el suelo y el clima convergen en granos excepcionales.
          </p>
        </Reveal>

        <OriginsTabs origins={origins} originImages={originImages} />
      </Container>
    </section>
  );
}
