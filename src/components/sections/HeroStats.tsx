"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/cn";

interface Stat {
  value: number;
  pad2?: boolean;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 4, pad2: true, label: "Orígenes de especialidad" },
  { value: 3, pad2: true, label: "Cafeterías en España" },
  { value: 100, suffix: "%", label: "Tueste en lotes propios" },
];

function formatValue(current: number, stat: Stat): string {
  const rounded = Math.round(current);
  const base = stat.pad2 ? String(rounded).padStart(2, "0") : String(rounded);
  return stat.suffix ? `${base}${stat.suffix}` : base;
}

function useCountUp(target: number, active: boolean, disabled: boolean): number {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (disabled || !active) return;

    const duration = 1300;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, active, disabled]);

  return disabled ? target : value;
}

function StatItem({
  stat,
  active,
  disabled,
}: {
  stat: Stat;
  active: boolean;
  disabled: boolean;
}) {
  const current = useCountUp(stat.value, active, disabled);

  return (
    <div className="border-l border-borde pl-4 first:border-l-0 first:pl-0 sm:pl-6 sm:first:pl-0">
      <dt className="text-[clamp(1.9rem,4vw,2.75rem)] font-light leading-none tracking-[-0.03em] text-tinta tabular-nums">
        {formatValue(current, stat)}
      </dt>
      <dd className="mt-2 max-w-[10ch] text-[0.6875rem] font-semibold uppercase leading-tight tracking-[0.1em] text-texto-secundario">
        {stat.label}
      </dd>
    </div>
  );
}

export function HeroStats({ className }: { className?: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <dl
      ref={ref}
      className={cn("grid grid-cols-3 gap-x-4 sm:gap-x-6", className)}
    >
      {stats.map((stat) => (
        <StatItem
          key={stat.label}
          stat={stat}
          active={inView}
          disabled={prefersReducedMotion}
        />
      ))}
    </dl>
  );
}
