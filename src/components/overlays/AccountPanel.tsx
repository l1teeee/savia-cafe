"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UserRound, X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import {
  useEscape,
  useFocusTrap,
  usePrefersReducedMotion,
  useScrollLock,
} from "@/lib/hooks";
import { DUR, EASE } from "@/lib/motion";

interface AccountPanelProps {
  open: boolean;
  onClose: () => void;
}

export function AccountPanel({ open, onClose }: AccountPanelProps) {
  useScrollLock(open);
  useEscape(open, onClose);
  const trapRef = useFocusTrap<HTMLDivElement>(open);
  const prefersReducedMotion = usePrefersReducedMotion();
  const titleId = useId();
  const descriptionId = useId();
  const duration = prefersReducedMotion ? 0 : DUR.fast;

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
            aria-label="Cerrar panel de cuenta"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-tinta/60"
          />

          <motion.div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto overscroll-contain bg-crema-clara p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-borde pb-5">
              <div>
                <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-tinta/60">
                  Próximamente
                </p>
                <h2 id={titleId} className="font-display text-2xl text-tinta">
                  Mi cuenta
                </h2>
              </div>
              <IconButton
                label="Cerrar panel de cuenta"
                onClick={onClose}
                className="min-h-11 min-w-11 shrink-0 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <X size={20} strokeWidth={1.5} aria-hidden />
              </IconButton>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
              <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-crema text-tinta">
                <UserRound size={28} strokeWidth={1.4} aria-hidden />
              </span>
              <h3 className="mb-3 font-display text-xl text-tinta">
                El acceso aún no está habilitado
              </h3>
              <p
                id={descriptionId}
                className="max-w-xs text-base leading-relaxed text-texto-secundario"
              >
                Este sitio es una demostración y no solicita credenciales ni
                crea cuentas. La experiencia de fidelidad llegará más adelante.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cafe/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-cafe transition-colors hover:bg-cafe hover:text-crema-clara motion-reduce:transition-none"
            >
              Entendido
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
