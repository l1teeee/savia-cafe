import { ArrowUpRight } from "lucide-react";
import { CoffeeCard } from "@/components/cards/CoffeeCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coffees } from "@/data/coffees";
import { FeaturedCoffeeCarousel } from "./FeaturedCoffeeCarousel";

export function FeaturedCoffee() {
  const cards = coffees.map((coffee) => (
    <CoffeeCard key={coffee.id} coffee={coffee} />
  ));

  return (
    <section
      id="nuestro-cafe"
      aria-labelledby="nuestro-cafe-heading"
      className="section-pad bg-crema-clara"
    >
      <Container>
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-12">
          <SectionHeading
            id="nuestro-cafe-heading"
            eyebrow="Selección Savia"
            title="Una taza para cada momento"
            align="left"
            display
          />
          <a
            href="#menu"
            className="group/link inline-flex min-h-11 shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-cafe transition-colors hover:text-verde motion-reduce:transition-none"
          >
            Ver colección completa
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-out motion-safe:group-hover/link:translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden
            />
          </a>
        </header>

        <StaggerGroup className="hidden gap-x-6 gap-y-12 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-x-5 xl:gap-x-7">
          {coffees.map((coffee) => (
            <StaggerItem key={coffee.id} className="h-full min-w-0">
              <CoffeeCard coffee={coffee} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FeaturedCoffeeCarousel slides={cards} />
      </Container>
    </section>
  );
}
