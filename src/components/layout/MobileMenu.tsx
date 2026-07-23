"use client";

import { AnimatePresence, motion } from "motion/react";
import { Leaf, Search, ShoppingBag, User, X } from "lucide-react";
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

interface MobileMenuProps {
  open: boolean;
  activeSection: string;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenBag: () => void;
  onOpenAccount: () => void;
}

export function MobileMenu({
  open,
  activeSection,
  onClose,
  onOpenSearch,
  onOpenBag,
  onOpenAccount,
}: MobileMenuProps) {
  useScrollLock(open);
  useEscape(open, onClose);
  const trapRef = useFocusTrap<HTMLDivElement>(open);
  const prefersReducedMotion = usePrefersReducedMotion();
  const duration = prefersReducedMotion ? 0 : DUR.fast;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={trapRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration, ease: EASE }}
          className="fixed inset-0 z-40 flex min-h-0 flex-col overflow-hidden bg-crema xl:hidden"
        >
          <div className="flex min-h-[var(--header-h)] shrink-0 items-center justify-between gap-4 border-b border-borde px-5 sm:px-7">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-full border border-verde bg-verde text-crema-clara"
              >
                <Leaf size={15} strokeWidth={1.5} />
              </span>
              <div className="min-w-0 leading-none">
                <h2
                  id="mobile-menu-title"
                  className="truncate text-[0.9375rem] font-bold uppercase tracking-[0.16em] text-tinta sm:text-base"
                >
                  {site.name}
                </h2>
                <p className="mt-1 truncate text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-tinta/60 sm:text-[0.5625rem]">
                  Menú principal
                </p>
              </div>
            </div>
            <IconButton
              label="Cerrar menú"
              onClick={onClose}
              className="shrink-0"
            >
              <X size={19} strokeWidth={1.5} aria-hidden />
            </IconButton>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <nav aria-label="Navegación móvil" className="px-5 py-5 sm:px-7 sm:py-6">
              <ul className="divide-y divide-borde border-y border-borde">
                {site.nav.map(({ id, label }, index) => {
                  const isActive = activeSection === id;

                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        aria-current={isActive ? "location" : undefined}
                        onClick={onClose}
                        className={cn(
                          "flex min-h-14 items-center justify-between gap-4 px-1 py-3 text-lg tracking-[-0.02em] transition-colors motion-reduce:transition-none",
                          isActive
                            ? "font-medium text-texto"
                            : "font-light text-texto-secundario hover:text-texto"
                        )}
                      >
                        <span className="flex items-baseline gap-3">
                          <span
                            aria-hidden
                            className="w-5 text-[0.625rem] font-semibold tabular-nums tracking-[0.08em] text-verde"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{label}</span>
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "h-px bg-verde transition-[width,opacity] duration-200 motion-reduce:transition-none",
                            isActive ? "w-5 opacity-100" : "w-0 opacity-0"
                          )}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="grid shrink-0 grid-cols-3 gap-2 border-t border-borde px-5 py-4 sm:px-7">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-haspopup="dialog"
              className="flex min-h-14 w-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-borde bg-crema-clara px-2 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-texto transition-colors hover:bg-crema motion-reduce:transition-none"
            >
              <Search size={18} strokeWidth={1.5} className="text-verde" aria-hidden />
              Buscar
            </button>

            <button
              type="button"
              onClick={onOpenAccount}
              aria-haspopup="dialog"
              className="flex min-h-14 w-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-borde bg-crema-clara px-2 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-texto transition-colors hover:bg-crema motion-reduce:transition-none"
            >
              <User size={18} strokeWidth={1.5} className="text-verde" aria-hidden />
              Mi cuenta
            </button>

            <button
              type="button"
              onClick={onOpenBag}
              aria-haspopup="dialog"
              className="flex min-h-14 w-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-borde bg-crema-clara px-2 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-texto transition-colors hover:bg-crema motion-reduce:transition-none"
            >
              <ShoppingBag
                size={18}
                strokeWidth={1.5}
                className="text-verde"
                aria-hidden
              />
              Mi bolsa
            </button>

            <div
              className="col-span-3 flex items-center gap-1 pt-2"
              role="group"
              aria-label="Idioma"
            >
              <span
                aria-current="true"
                aria-label="Español, idioma actual"
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-texto"
              >
                ES
              </span>
              <span
                aria-label="Inglés, próximamente"
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-texto-secundario opacity-65"
              >
                EN
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
