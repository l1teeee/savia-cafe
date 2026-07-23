"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { MenuCategory } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

interface MenuAccordionProps {
  categories: MenuCategory[];
}

export function MenuAccordion({ categories }: MenuAccordionProps) {
  const [openId, setOpenId] = useState<string>(categories[0]?.id);

  return (
    <div className="space-y-3">
      {categories.map((category) => {
        const isOpen = openId === category.id;

        return (
          <div
            key={category.id}
            className="overflow-hidden rounded-[18px] border border-borde bg-crema-clara"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? "" : category.id)}
              className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors hover:text-verde"
              aria-expanded={isOpen}
              aria-controls={`menu-panel-${category.id}`}
            >
              <span className="text-label font-semibold text-tinta">
                {category.title}
              </span>
              {/* Chip de chevron con acento verde */}
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-borde bg-crema text-verde">
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </span>
            </button>

            {isOpen && (
              <div
                id={`menu-panel-${category.id}`}
                className="space-y-4 border-t border-borde px-4 py-5"
              >
                {category.items.map((item) => (
                  <div key={item.id} className="space-y-1.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-sm font-medium text-texto">
                        {item.name}
                      </span>
                      <span
                        aria-hidden
                        className="flex-1 translate-y-[-3px] border-b border-dotted border-borde"
                      />
                      <span className="whitespace-nowrap text-sm font-semibold text-texto">
                        {formatPrice(item.priceEur)}
                      </span>
                    </div>
                    <p className="text-[0.8125rem] leading-relaxed text-texto-secundario">
                      {item.description}
                    </p>
                    {item.tags && item.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-x-3 gap-y-1 pt-0.5">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-verde"
                          >
                            {tag === "vegetal"
                              ? "Vegetal"
                              : tag === "sin azúcar"
                                ? "Sin azúcar"
                                : tag === "sin gluten"
                                ? "Sin gluten"
                                  : "Temporada"}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
