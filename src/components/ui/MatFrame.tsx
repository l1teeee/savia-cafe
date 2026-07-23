import { cn } from "@/lib/cn";

interface MatFrameProps {
  children: React.ReactNode;
  /** Notch tabs / badges posicionados en absolute por el consumidor. */
  overlay?: React.ReactNode;
  /** Clases del mat exterior (tamaño, col-span, etc.). */
  className?: string;
  /** Clases de la superficie interior de recorte. */
  innerClassName?: string;
  /** sm = tarjetas; lg = hero-like. */
  size?: "sm" | "lg";
  as?: "figure" | "div";
}

/*
 * Marco passe-partout del Hero convertido en primitivo: mat crema-clara con
 * sombra suave y una superficie interior que recorta la media a sangre. La
 * media hija debe ir sin redondeo propio (radius="none") para que solo el
 * marco defina las esquinas.
 */
export function MatFrame({
  children,
  overlay,
  className,
  innerClassName,
  size = "lg",
  as: As = "figure",
}: MatFrameProps) {
  const mat =
    size === "sm"
      ? "rounded-[18px] p-1.5"
      : "rounded-[24px] p-2 sm:rounded-[32px] sm:p-3";
  const inner =
    size === "sm" ? "rounded-[13px]" : "rounded-[18px] sm:rounded-[26px]";

  return (
    <As
      className={cn(
        "relative bg-crema-clara shadow-[0_18px_50px_rgba(60,45,38,0.08)]",
        mat,
        className
      )}
    >
      <div className={cn("relative overflow-hidden bg-crema", inner, innerClassName)}>
        {children}
      </div>
      {overlay}
    </As>
  );
}
