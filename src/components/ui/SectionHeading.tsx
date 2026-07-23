import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  /** Titular editorial condensado (font-display) + eyebrow estilo Hero. */
  display?: boolean;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "center",
  display = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("space-y-3", align === "center" ? "text-center" : "text-left")}
    >
      {eyebrow && (
        <p
          className={cn(
            display
              ? "text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-tinta/60"
              : "text-label font-semibold text-verde"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-balance",
          display
            ? cn(
                "font-display text-[clamp(2rem,4vw,3.75rem)] text-tinta",
                align === "left" && "font-display-origin-left"
              )
            : "text-[clamp(1.875rem,3vw,3rem)] font-light leading-[1.08] tracking-[-0.035em] text-tinta"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed text-texto-secundario",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
