import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { MatFrame } from "@/components/ui/MatFrame";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { MenuAccordion } from "./MenuAccordion";
import { menuCategories, menuImages } from "@/data/menu";
import { formatPrice } from "@/lib/format";

export function CafeMenu() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="bg-crema-clara py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <Reveal className="max-w-3xl">
          <SectionHeading
            display
            id="menu-heading"
            eyebrow="Nuestra barra"
            title="Preparado para disfrutarlo a tu manera"
            align="left"
          />
        </Reveal>

        <div className="mt-10 md:mt-12">
          {/* Desktop: Grid de 3 columnas */}
          <div className="hidden lg:block">
            <StaggerGroup className="grid grid-cols-3 gap-x-10 gap-y-12">
              {menuCategories.map((category) => (
                <StaggerItem
                  key={category.id}
                  className="border-t border-borde pt-4"
                >
                  <div>
                    <h3 className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-verde">
                      {category.title}
                    </h3>
                    <div className="space-y-4">
                      {category.items.map((item) => (
                        <div key={item.id} className="space-y-1.5">
                          <div className="flex items-baseline gap-2.5">
                            <span className="text-sm font-medium text-texto">
                              {item.name}
                            </span>
                            <span
                              aria-hidden
                              className="flex-1 translate-y-[-3px] border-b border-dotted border-borde"
                            />
                            <span className="whitespace-nowrap text-sm font-semibold text-texto">
                              {formatPrice(item.priceEur)}
                            </span>
                          </div>
                          <p className="text-[0.8125rem] leading-relaxed text-texto-secundario">
                            {item.description}
                          </p>
                          {item.tags && item.tags.length > 0 && (
                            <ul className="flex flex-wrap gap-x-3 gap-y-1 pt-0.5">
                              {item.tags.map((tag) => (
                                <li
                                  key={tag}
                                  className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-verde"
                                >
                                  {tag === "vegetal"
                                    ? "Vegetal"
                                    : tag === "sin azúcar"
                                      ? "Sin azúcar"
                                      : tag === "sin gluten"
                                      ? "Sin gluten"
                                        : "Temporada"}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* Mobile: Acordeones */}
          <div className="lg:hidden">
            <Reveal>
              <MenuAccordion categories={menuCategories} />
            </Reveal>
          </div>
        </div>

        {/* Galeria: cada imagen enmarcada en passe-partout (idioma del Hero) */}
        <div className="mt-12 md:mt-14">
          <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {menuImages.map((image, index) => (
              <StaggerItem
                key={index}
                className="first:col-span-2 sm:first:col-span-1"
              >
                <MatFrame size="sm">
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={800}
                    sizes="(min-width:640px) 30vw, 90vw"
                    radius="none"
                    className="w-full"
                    imgClassName="object-cover"
                  />
                </MatFrame>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-start md:mt-12">
          <Reveal>
            <Button variant="verde" href="#ubicaciones">
              Encontrar una cafetería
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
