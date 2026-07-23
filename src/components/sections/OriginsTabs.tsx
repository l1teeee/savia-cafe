"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin } from "lucide-react";
import type { CoffeeOrigin } from "@/data/types";
import { MatFrame } from "@/components/ui/MatFrame";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { DUR, EASE } from "@/lib/motion";

interface OriginsTabsProps {
  origins: CoffeeOrigin[];
  originImages: Record<string, React.ReactNode>;
}

export function OriginsTabs({ origins, originImages }: OriginsTabsProps) {
  const [activeId, setActiveId] = useState(origins[0]?.id || "");
  const tabListRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const activeOrigin = origins.find((origin) => origin.id === activeId);

  const handleTabClick = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const tabList = tabListRef.current;
      if (!tabList) return;

      const tabs = Array.from(
        tabList.querySelectorAll('[role="tab"]')
      ) as HTMLElement[];
      if (tabs.length === 0) return;

      const currentIndex = tabs.findIndex(
        (tab) => tab.id === `tab-${activeId}`
      );
      let nextIndex = currentIndex;

      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          nextIndex = (currentIndex + 1) % tabs.length;
          break;
        case "Home":
          event.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          event.preventDefault();
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      const nextTab = tabs[nextIndex];
      if (nextTab) {
        const nextOriginId = nextTab.id.replace("tab-", "");
        setActiveId(nextOriginId);
        nextTab.focus();
      }
    },
    [activeId]
  );

  return (
    <div className="min-w-0">
      <div
        role="tablist"
        aria-label="Orígenes del café"
        aria-orientation="horizontal"
        ref={tabListRef}
        onKeyDown={handleKeyDown}
        className="flex max-w-full flex-nowrap justify-start gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {origins.map((origin) => (
          <button
            key={origin.id}
            id={`tab-${origin.id}`}
            role="tab"
            aria-selected={activeId === origin.id}
            aria-controls={`panel-${origin.id}`}
            tabIndex={activeId === origin.id ? 0 : -1}
            onClick={() => handleTabClick(origin.id)}
            className={cn(
              "min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors motion-reduce:transition-none sm:px-5",
              activeId === origin.id
                ? "border-cafe bg-cafe text-crema-clara"
                : "border-borde bg-crema text-texto hover:border-cafe/40 hover:text-tinta"
            )}
          >
            {origin.country}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeOrigin && (
          <motion.div
            key={activeOrigin.id}
            role="tabpanel"
            id={`panel-${activeOrigin.id}`}
            aria-labelledby={`tab-${activeOrigin.id}`}
            tabIndex={0}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
            transition={
              prefersReducedMotion
                ? {}
                : { duration: DUR.fast, ease: EASE }
            }
            className="grid min-w-0 gap-8 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16"
          >
            <div className="min-w-0 lg:col-span-5">
              {/* Fotografía enmarcada con pestaña "Ficha de origen" encajada. */}
              <MatFrame
                overlay={
                  <div className="notch-tr absolute right-2 top-2 z-10 rounded-bl-[18px] rounded-tr-[18px] bg-crema-clara p-2 sm:right-3 sm:top-3 sm:rounded-bl-[24px] sm:rounded-tr-[26px] sm:p-2.5 sm:[--notch:22px]">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-cafe px-3 py-1.5 text-crema-clara sm:rounded-xl">
                      <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden />
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em]">
                        Ficha de origen
                      </span>
                    </span>
                  </div>
                }
              >
                {originImages[activeOrigin.id]}
              </MatFrame>
            </div>

            <div className="min-w-0 lg:col-span-6 lg:col-start-7">
              <h3 className="font-display font-display-origin-left text-[clamp(1.75rem,3vw,2.75rem)] text-tinta">
                {activeOrigin.country}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-texto-secundario">
                {activeOrigin.description}
              </p>

              {/* Datos en losetas enmarcadas con hairline */}
              <dl className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: "Región", value: activeOrigin.region },
                  { label: "Altitud", value: activeOrigin.altitude },
                  { label: "Variedad", value: activeOrigin.variety },
                  { label: "Proceso", value: activeOrigin.process },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-borde bg-crema-clara p-4 sm:p-5"
                  >
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-texto-secundario">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium leading-6 text-tinta sm:text-base">
                      {item.value}
                    </dd>
                  </div>
                ))}

                <div className="col-span-2 rounded-2xl border border-borde bg-crema-clara p-4 sm:p-5">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-texto-secundario">
                    Perfil de taza
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium leading-6 text-tinta sm:text-base">
                    {activeOrigin.notes}
                  </dd>
                </div>

                <div className="col-span-2 rounded-2xl border border-borde bg-crema-clara p-4 sm:p-5">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-texto-secundario">
                    Intensidad
                  </dt>
                  <dd className="mt-2 flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, dot) => (
                      <span
                        key={dot}
                        aria-hidden
                        className={cn(
                          "size-2 rounded-full",
                          dot < activeOrigin.intensity ? "bg-verde" : "bg-borde"
                        )}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium tabular-nums text-tinta">
                      {activeOrigin.intensity}
                      <span className="text-texto-secundario"> / 5</span>
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
