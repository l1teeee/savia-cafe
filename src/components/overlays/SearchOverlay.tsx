"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import {
  useEscape,
  useFocusTrap,
  usePrefersReducedMotion,
  useScrollLock,
} from "@/lib/hooks";
import { DUR, EASE } from "@/lib/motion";

interface SearchEntry {
  label: string;
  targetId: string;
  keywords: string[];
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

function normalizeSearchText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const prefersReducedMotion = usePrefersReducedMotion();
  const dialogTitleId = useId();
  const inputId = useId();
  const resultsId = useId();
  const duration = prefersReducedMotion ? 0 : DUR.fast;

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useScrollLock(open);
  useEscape(open, handleClose);
  const trapRef = useFocusTrap<HTMLDivElement>(open);

  const entries = useMemo<SearchEntry[]>(() => {
    const navEntries = site.nav.map((item) => ({
      label: item.label,
      targetId: item.id,
      keywords: [item.label],
    }));

    const extraEntries: SearchEntry[] = [
      {
        label: "Aurora — Etiopía",
        targetId: "nuestro-cafe",
        keywords: ["aurora", "etiopía", "café", "floral", "lavado"],
      },
      {
        label: "Tierra Roja — Colombia",
        targetId: "nuestro-cafe",
        keywords: ["tierra", "roja", "colombia", "café", "dulce", "honey"],
      },
      {
        label: "Bosque Alto — Guatemala",
        targetId: "nuestro-cafe",
        keywords: ["bosque", "alto", "guatemala", "café", "natural"],
      },
      {
        label: "Casa Savia — Espresso",
        targetId: "nuestro-cafe",
        keywords: ["casa", "savia", "espresso", "mezcla", "café"],
      },
      {
        label: "Reservar mesa",
        targetId: "ubicaciones",
        keywords: ["reservar", "mesa", "reserva", "ubicaciones", "cafetería"],
      },
      {
        label: "Newsletter",
        targetId: "newsletter",
        keywords: ["newsletter", "suscripción", "email", "novedades"],
      },
    ];

    return [...navEntries, ...extraEntries];
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query.trim());
    if (!normalizedQuery) return [];

    return entries.filter((entry) => {
      const searchableText = [entry.label, ...entry.keywords]
        .map(normalizeSearchText)
        .join(" ");

      return searchableText.includes(normalizedQuery);
    });
  }, [entries, query]);

  const handleResultClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    handleClose();

    if (element) {
      window.requestAnimationFrame(() => {
        element.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      });
    }
  };

  const resultLabel =
    results.length === 1 ? "1 resultado" : `${results.length} resultados`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: EASE }}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Cerrar búsqueda"
            onClick={handleClose}
            className="absolute inset-0 h-full w-full cursor-default bg-tinta/60"
          />

          <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-y-auto overscroll-contain p-4 pt-[max(5rem,15svh)]">
            <motion.div
              ref={trapRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration, ease: EASE }}
              className="pointer-events-auto relative w-full max-w-xl rounded-2xl bg-crema-clara p-5 shadow-xl sm:p-6"
            >
              <h2
                id={dialogTitleId}
                className="font-display mb-5 pr-14 text-2xl text-tinta"
              >
                Buscar en {site.name}
              </h2>

              <div className="relative mb-4">
                <label htmlFor={inputId} className="sr-only">
                  Buscar en el sitio
                </label>
                <Search
                  size={18}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario"
                  aria-hidden
                />
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar cafés, orígenes o secciones…"
                  autoComplete="off"
                  aria-controls={resultsId}
                  className="min-h-12 w-full rounded-lg border border-borde bg-crema py-3 pl-11 pr-14 text-base text-texto placeholder:text-texto-secundario focus-visible:border-verde focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde/20"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-1 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-texto-secundario transition-colors hover:bg-crema motion-reduce:transition-none"
                    aria-label="Limpiar búsqueda"
                  >
                    <X size={18} strokeWidth={1.5} aria-hidden />
                  </button>
                )}
              </div>

              <IconButton
                label="Cerrar búsqueda"
                onClick={handleClose}
                className="absolute right-4 top-4 min-h-11 min-w-11 motion-reduce:transform-none motion-reduce:transition-none sm:right-5 sm:top-5"
              >
                <X size={20} strokeWidth={1.5} aria-hidden />
              </IconButton>

              <div
                id={resultsId}
                role="region"
                aria-live="polite"
                aria-atomic="true"
                aria-label={resultLabel}
                className="mb-4 min-h-8"
              >
                {results.length > 0 ? (
                  <ul className="space-y-1">
                    {results.map((entry, index) => (
                      <li key={`${entry.targetId}-${entry.label}-${index}`}>
                        <button
                          type="button"
                          onClick={() => handleResultClick(entry.targetId)}
                          className={cn(
                            "flex min-h-12 w-full items-center rounded-lg px-3 py-3 text-left text-base text-texto transition-colors",
                            "hover:bg-crema focus-visible:bg-crema focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde motion-reduce:transition-none"
                          )}
                        >
                          {entry.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : query.trim() ? (
                  <p className="px-3 py-4 text-base text-texto-secundario">
                    No encontramos nada para «{query}». Prueba con otra palabra.
                  </p>
                ) : (
                  <p className="px-3 py-4 text-base text-texto-secundario">
                    Escribe para buscar cafés, ubicaciones y secciones del sitio.
                  </p>
                )}
              </div>

              <p className="border-t border-borde pt-3 text-center text-xs text-texto-secundario">
                Pulsa Escape para cerrar
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
