import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "neutral" | "terracota" | "hoja";
}

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  const variants = {
    neutral: "border-borde bg-transparent text-texto-secundario",
    terracota: "border-verde/40 bg-verde/5 text-verde",
    hoja: "border-verde/40 bg-verde/5 text-verde",
  };

  return (
    <span
      className={cn(
        "text-label inline-block rounded-full border px-2.5 py-1 font-semibold tracking-[0.12em]",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}
