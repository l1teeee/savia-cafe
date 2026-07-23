import { ArrowUpRight } from "lucide-react";
import type { CoffeeProduct } from "@/data/types";
import { MatFrame } from "@/components/ui/MatFrame";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatPrice } from "@/lib/format";

interface CoffeeCardProps {
  coffee: CoffeeProduct;
}

// Escala de intensidad como puntos: rellenos hasta el nivel, resto hairline.
const LEVELS = [1, 2, 3, 4, 5];

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const { name, originCountry, process, description, intensity, priceEur, image } =
    coffee;

  return (
    <article className="group flex h-full min-w-0 flex-col">
      <MatFrame
        size="sm"
        overlay={
          // Pestaña "país . proceso" encajada en el borde del marco (idioma Hero).
          <div className="notch-tr absolute right-1.5 top-1.5 z-10 max-w-[calc(100%-1.25rem)] rounded-bl-[13px] rounded-tr-[13px] bg-crema-clara px-2.5 py-1.5">
            <p className="truncate text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-tinta">
              {originCountry} <span className="text-tinta/40">·</span> {process}
            </p>
          </div>
        }
      >
        <SmartImage
          src={image}
          alt={name}
          width={900}
          height={1200}
          sizes="(min-width:1280px) 20vw, (min-width:1024px) 22vw, (min-width:768px) 44vw, 82vw"
          radius="none"
          className="h-full w-full"
          imgClassName="transition-transform duration-500 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </MatFrame>

      <div className="mt-5 flex items-baseline justify-between gap-3">
        <h3 className="min-w-0 truncate text-xl font-normal tracking-[-0.02em] text-tinta">
          {name}
        </h3>
        <span className="inline-flex shrink-0 items-center rounded-full bg-crema px-3 py-1 text-sm font-bold tabular-nums text-tinta">
          {formatPrice(priceEur)}
        </span>
      </div>

      <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-texto-secundario">
        {description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-borde pt-4">
        <div className="flex shrink-0 flex-col items-start gap-1.5">
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-texto-secundario">
            Intensidad
          </span>
          <span
            className="flex items-center gap-1"
            role="img"
            aria-label={`${intensity} de 5`}
          >
            {LEVELS.map((level) => (
              <span
                key={level}
                aria-hidden
                className={
                  level <= intensity
                    ? "size-2 rounded-full bg-cafe"
                    : "size-2 rounded-full bg-borde"
                }
              />
            ))}
          </span>
        </div>

        <a
          href="#menu"
          aria-label={`Ver detalle de ${name}`}
          className="group/cta inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-cafe px-4 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-crema-clara transition-colors hover:bg-verde motion-reduce:transition-none"
        >
          Ver detalle
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 ease-out motion-safe:group-hover/cta:translate-x-0.5"
            strokeWidth={1.75}
            aria-hidden
          />
        </a>
      </div>
    </article>
  );
}
