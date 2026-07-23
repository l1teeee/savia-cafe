"use client";

import { useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import {
  useScrollLock,
  useFocusTrap,
  useEscape,
  usePrefersReducedMotion,
} from "@/lib/hooks";
import { EASE, DUR } from "@/lib/motion";
import { IconButton } from "./IconButton";
import { cn } from "@/lib/cn";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "lg";
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  size = "sm",
}: DialogProps) {
  useScrollLock(open);
  useEscape(open, onClose);
  const trapRef = useFocusTrap<HTMLDivElement>(open);
  const prefersReducedMotion = usePrefersReducedMotion();
  const titleId = useId();
  const duration = prefersReducedMotion ? 0 : DUR.fast;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: EASE }}
            className="fixed inset-0 z-40 bg-tinta/60"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration, ease: EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <div
              ref={trapRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={cn(
                "relative my-auto w-full rounded-2xl bg-crema-clara p-6 shadow-xl sm:p-8",
                size === "sm" ? "max-w-lg" : "max-w-2xl"
              )}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <h2 id={titleId} className="font-display text-2xl text-tinta">
                  {title}
                </h2>
                <IconButton label="Cerrar" onClick={onClose}>
                  <X size={20} strokeWidth={1.5} aria-hidden />
                </IconButton>
              </div>

              <div className="text-texto">{children}</div>

              {footer && (
                <div className="mt-6 border-t border-borde pt-6">{footer}</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
