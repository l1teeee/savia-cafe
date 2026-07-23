import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const ritualMoments = [
  {
    id: "prepara",
    src: "/images/menu/pour-over-v60.webp",
    alt: "Vertido lento de agua sobre un filtro V60 durante la preparación",
  },
  {
    id: "elabora",
    src: "/images/gallery/barista-brewing.webp",
    alt: "Barista elaborando café con técnica manual en la barra",
  },
  {
    id: "acompana",
    src: "/images/gallery/pastry-detail.webp",
    alt: "Repostería artesana recién horneada para acompañar el café",
  },
  {
    id: "disfruta",
    src: "/images/gallery/guests-conversation.webp",
    alt: "Clientes disfrutando de una conversación alrededor de una mesa",
  },
];

export function RitualGallery() {
  return (
    <section
      id="ritual"
      aria-labelledby="ritual-heading"
      className="border-t border-borde bg-crema-clara py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <SectionHeading
            id="ritual-heading"
            eyebrow="Ritual Savia"
            title="Prepara. Comparte. Disfruta."
            align="left"
            display
          />
        </div>

        <StaggerGroup className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-12 md:grid-cols-4">
          {ritualMoments.map((moment) => (
            <StaggerItem key={moment.id}>
              <SmartImage
                src={moment.src}
                alt={moment.alt}
                width={480}
                height={600}
                sizes="(min-width:768px) 22vw, 44vw"
                radius="lg"
                className="w-full"
                imgClassName="object-cover"
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
