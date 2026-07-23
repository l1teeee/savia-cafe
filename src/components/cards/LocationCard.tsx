import {
  Wifi,
  Sun,
  Accessibility,
  FlaskConical,
  PawPrint,
  ShoppingBag,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MatFrame } from "@/components/ui/MatFrame";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import type { CafeLocation } from "@/data/types";

interface LocationCardProps {
  location: CafeLocation;
  children?: React.ReactNode;
}

const serviceIcons: Record<
  string,
  { icon: LucideIcon; label: string }
> = {
  wifi: { icon: Wifi, label: "Wifi" },
  terraza: { icon: Sun, label: "Terraza" },
  accesible: { icon: Accessibility, label: "Accesible" },
  filtrados: { icon: FlaskConical, label: "Filtrados" },
  "pet-friendly": { icon: PawPrint, label: "Amigable con mascotas" },
  "take-away": { icon: ShoppingBag, label: "Para llevar" },
};

export function LocationCard({ location, children }: LocationCardProps) {
  return (
    <article className="group flex h-full flex-col">
      <MatFrame
        size="sm"
        overlay={
          // Ciudad encajada en el marco como notch tab, con pastilla verde
          <div className="notch-tr absolute right-1.5 top-1.5 z-10 rounded-bl-[13px] rounded-tr-[13px] bg-crema-clara p-1.5 sm:[--notch:18px]">
            <span className="inline-flex items-center gap-1.5 rounded-[11px] bg-verde px-2.5 py-1.5 text-crema-clara">
              <MapPin className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.12em]">
                {location.city}
              </span>
            </span>
          </div>
        }
      >
        <SmartImage
          src={location.image}
          alt={`${location.name}, ${location.city}`}
          width={1200}
          height={900}
          sizes="(min-width:1024px) 30vw, 90vw"
          radius="none"
          className="h-full w-full"
          imgClassName="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.015] motion-reduce:transition-none"
        />
      </MatFrame>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <h3 className="text-xl font-medium tracking-[-0.01em] text-tinta">
          {location.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-texto-secundario">
          {location.address}
        </p>

        <dl className="mt-4 space-y-1.5 border-t border-borde pt-3 text-sm">
          {location.schedule.map((slot, idx) => (
            <div key={idx} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
              <dt className="min-w-fit font-medium text-texto-secundario">
                {slot.days}:
              </dt>
              <dd className="text-texto">{slot.hours}</dd>
            </div>
          ))}
        </dl>

        {location.services.length > 0 && (
          <div
            className="mt-4 flex flex-wrap gap-2"
            aria-label="Servicios disponibles"
          >
            {location.services.map((service) => {
              const serviceInfo = serviceIcons[service];
              if (!serviceInfo) return null;
              const Icon = serviceInfo.icon;
              return (
                <span
                  key={service}
                  className="grid size-9 place-items-center rounded-xl bg-crema text-verde"
                  title={serviceInfo.label}
                >
                  <Icon size={16} strokeWidth={1.75} aria-hidden />
                  <span className="sr-only">{serviceInfo.label}</span>
                </span>
              );
            })}
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <Button
            variant="outline"
            href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(location.mapsQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.6875rem]"
          >
            Cómo llegar
          </Button>
          {children}
        </div>
      </div>
    </article>
  );
}
