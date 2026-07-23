import { Coffee } from "lucide-react";
import { cn } from "@/lib/cn";

interface ImagePlaceholderProps {
  alt: string;
  aspectClass?: string;
  className?: string;
  label?: string;
}

export function ImagePlaceholder({
  alt,
  aspectClass = "aspect-square",
  className,
  label,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "shimmer flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-crema to-tostado/70",
        aspectClass,
        className
      )}
    >
      <div className="text-center space-y-2">
        <Coffee
          className="mx-auto h-8 w-8 text-verde/70 motion-safe:animate-pulse"
          aria-hidden
        />
        {label && (
          <p className="px-2 text-xs font-medium text-texto/50">{label}</p>
        )}
      </div>
    </div>
  );
}
