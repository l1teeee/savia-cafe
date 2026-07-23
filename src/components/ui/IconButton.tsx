import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: React.ReactNode;
}

export function IconButton({
  label,
  children,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl border border-transparent text-tinta transition-[color,background-color,border-color] duration-200 ease-out hover:border-borde hover:bg-crema-clara/70 motion-safe:active:scale-95 motion-reduce:transition-colors",
        className
      )}
      {...props}
    >
      <span aria-hidden>{children}</span>
    </button>
  );
}
