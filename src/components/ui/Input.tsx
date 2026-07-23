import { cn } from "@/lib/cn";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  id,
  error,
  hint,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-texto">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-lg border bg-crema-clara px-4 py-2 text-texto placeholder:text-texto-secundario transition-colors focus-visible:border-verde focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde/20",
          error
            ? "border-verde focus-visible:border-verde"
            : "border-borde hover:border-borde/60",
          className
        )}
        {...props}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm font-semibold text-verde"
          role="alert"
        >
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-texto-secundario">{hint}</p>
      )}
    </div>
  );
}
