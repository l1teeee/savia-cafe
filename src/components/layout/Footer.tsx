import { Leaf } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { cafeLocations } from "@/data/locations";

const legalItems = ["Privacidad", "Cookies", "Términos"] as const;
const paymentMethods = ["Tarjeta", "Efectivo", "Pago móvil"] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const referenceSchedule = cafeLocations[0]?.schedule ?? [];

  return (
    <footer
      aria-labelledby="footer-heading"
      className="border-t border-crema-clara/10 bg-cafe text-crema-clara"
    >
      <Container className="py-10 sm:py-12">
        <h2 id="footer-heading" className="sr-only">
          Información de {site.name}
        </h2>

        <div className="grid gap-8 border-b border-crema-clara/15 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <a
              href="#inicio"
              aria-label={`${site.name}, volver al inicio`}
              className="inline-flex min-h-11 items-center gap-3"
            >
              {/* Sello Leaf verde, rima con el Header */}
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full bg-verde text-crema-clara"
              >
                <Leaf size={18} strokeWidth={1.6} />
              </span>
              <span className="flex flex-col">
                <span className="text-lg font-bold uppercase tracking-[0.16em] text-crema-clara sm:text-xl">
                  {site.name}
                </span>
                <span className="text-label mt-1 text-verde-claro">
                  {site.descriptor}
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-crema-clara/65">
              Café de especialidad, tostado en pequeños lotes y preparado con
              intención. Este sitio y sus datos son demostrativos.
            </p>
          </div>

          <nav
            aria-labelledby="footer-navigation-heading"
          >
            <h3
              id="footer-navigation-heading"
              className="text-label mb-2 text-crema-clara"
            >
              Explorar
            </h3>
            <ul className="flex flex-wrap gap-x-5">
              {site.nav.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="inline-flex min-h-11 items-center text-sm text-crema-clara/70 underline decoration-crema-clara/25 underline-offset-4 transition-colors hover:text-crema-clara"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid gap-6 border-b border-crema-clara/15 py-7 sm:grid-cols-2 lg:grid-cols-[0.85fr_1.25fr_1fr] lg:gap-10">
          <section
            aria-labelledby="footer-contact-heading"
          >
            <h3
              id="footer-contact-heading"
              className="text-label mb-3 text-crema-clara"
            >
              Contacto demostrativo
            </h3>
            <address className="space-y-1.5 text-sm not-italic text-crema-clara/65">
              <p>{site.contact.email}</p>
              <p>{site.contact.phone}</p>
            </address>
          </section>

          <section aria-labelledby="footer-locations-heading">
            <h3
              id="footer-locations-heading"
              className="text-label mb-3 text-crema-clara"
            >
              Nuestras casas
            </h3>
            <ul className="grid gap-1.5 text-sm text-crema-clara/65 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {cafeLocations.map((location) => (
                <li key={location.id}>
                  <span className="font-medium text-crema-clara">
                    {location.name}
                  </span>{" "}
                  · {location.city} · demo
                </li>
              ))}
            </ul>
            <a
              href="#ubicaciones"
              className="link-underline mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-crema-clara"
            >
              Ver ubicaciones
            </a>
          </section>

          <section aria-labelledby="footer-schedule-heading">
            <h3
              id="footer-schedule-heading"
              className="text-label mb-3 text-crema-clara"
            >
              Horario orientativo
            </h3>
            <dl className="space-y-1.5 text-sm text-crema-clara/65">
              {referenceSchedule.map((slot) => (
                <div
                  key={slot.days}
                  className="flex flex-wrap justify-between gap-x-4 gap-y-1"
                >
                  <dt>{slot.days}</dt>
                  <dd className="text-crema-clara">{slot.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-xs text-crema-clara/60">
              Horarios de demostración; consulta cada ubicación.
            </p>
          </section>
        </div>

        <div className="grid gap-6 pt-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <section aria-labelledby="footer-social-heading">
            <h3 id="footer-social-heading" className="text-label mb-1 text-crema-clara">
              Redes
            </h3>
            <ul className="flex flex-wrap gap-x-5">
              {site.social.map((network) => (
                <li key={network.id}>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    aria-describedby="footer-pending-note"
                    title="Próximamente"
                    className="inline-flex min-h-11 items-center text-sm text-crema-clara/60 underline decoration-crema-clara/25 underline-offset-4 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {network.label}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-legal-heading">
            <h3 id="footer-legal-heading" className="text-label mb-1 text-crema-clara">
              Legal
            </h3>
            <ul className="flex flex-wrap gap-x-5">
              {legalItems.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    aria-describedby="footer-pending-note"
                    title="Próximamente"
                    className="inline-flex min-h-11 items-center text-sm text-crema-clara/60 underline decoration-crema-clara/25 underline-offset-4 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <p id="footer-pending-note" className="text-xs text-crema-clara/60">
              Redes y contenidos legales disponibles próximamente.
            </p>
          </section>

          <section aria-labelledby="footer-preferences-heading">
            <h3
              id="footer-preferences-heading"
              className="text-label mb-3 text-crema-clara"
            >
              Preferencias
            </h3>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-crema-clara/60">
              <div
                className="flex items-center gap-2"
                aria-label="Selector de idioma"
              >
                <span aria-current="true" className="font-semibold text-crema-clara">
                  ES
                </span>
                <span aria-hidden className="text-crema-clara/30">
                  /
                </span>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  aria-describedby="footer-language-note"
                  title="Próximamente"
                  className="min-h-11 text-crema-clara/60 disabled:cursor-not-allowed"
                >
                  EN
                </button>
              </div>
              <span>{paymentMethods.join(" · ")}</span>
            </div>
            <p id="footer-language-note" className="text-xs text-crema-clara/60">
              Inglés disponible próximamente.
            </p>
          </section>
        </div>

        <div className="mt-7 border-t border-crema-clara/15 pt-6 sm:flex sm:items-end sm:justify-between sm:gap-8">
          <p className="max-w-xl text-lg font-light leading-snug text-crema-clara sm:text-xl">
            Cada taza tiene un origen. Cada visita, una historia.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-crema-clara/60 sm:mt-0 sm:text-right">
            © {year} {site.name}. Sitio demostrativo.
          </p>
        </div>
      </Container>
    </footer>
  );
}
