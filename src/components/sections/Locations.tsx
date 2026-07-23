import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocationCard } from "@/components/cards/LocationCard";
import { ReservationTrigger } from "@/components/overlays/ReservationDialog";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { cafeLocations } from "@/data/locations";

export function Locations() {
  return (
    <section
      id="ubicaciones"
      aria-labelledby="ubicaciones-heading"
      className="border-t border-borde bg-crema py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <SectionHeading
            id="ubicaciones-heading"
            eyebrow="Nuestras casas"
            title="Encuentra tu cafetería más cercana"
            align="left"
            display
          />
        </div>

        <div className="mt-10 md:mt-12">
          <StaggerGroup className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {cafeLocations.map((location) => (
              <StaggerItem key={location.id} className="h-full">
                <LocationCard location={location}>
                  <ReservationTrigger
                    locationId={location.id}
                    locations={cafeLocations}
                    label="Reservar"
                  />
                </LocationCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* Nota del mapa como pieza enmarcada; chip verde de acento */}
        <aside
          className="mt-10 flex items-start gap-4 rounded-[20px] bg-crema-clara p-5 shadow-[0_18px_50px_rgba(60,45,38,0.06)] sm:items-center md:mt-12"
          role="note"
          aria-label="Información sobre el mapa de ubicaciones"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-verde text-crema-clara">
            <MapPin size={20} strokeWidth={1.75} aria-hidden />
          </span>
          <p className="max-w-3xl text-sm leading-relaxed text-texto-secundario">
            <span className="font-medium text-tinta">
              Mapa interactivo próximamente.
            </span>{" "}
            La integración está preparada sin claves en cliente; mientras tanto,
            usa &quot;Cómo llegar&quot; en cada cafetería para abrir la ruta en OpenStreetMap.
          </p>
        </aside>
      </Container>
    </section>
  );
}
