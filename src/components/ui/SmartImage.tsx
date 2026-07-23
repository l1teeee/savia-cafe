import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { cn } from "@/lib/cn";

export interface SmartImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  preload?: boolean;
  radius?: "none" | "sm" | "md" | "lg";
  className?: string;
  imgClassName?: string;
}

const radiusClass = {
  none: "rounded-none",
  sm: "rounded-[4px]",
  md: "rounded-[14px]",
  lg: "rounded-[20px]",
} as const;

export function SmartImage({
  src,
  alt,
  width,
  height,
  sizes,
  preload,
  radius = "sm",
  className,
  imgClassName,
}: SmartImageProps) {
  const imagePath = path.join(process.cwd(), "public", src);
  const imageExists = fs.existsSync(imagePath);
  const round = radiusClass[radius];

  if (imageExists) {
    return (
      <div
        className={cn("overflow-hidden bg-arena/30", round, className)}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          preload={preload}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <ImagePlaceholder
        alt={alt}
        label={src}
        aspectClass="h-full w-full"
        className={cn("h-full w-full", round)}
      />
    </div>
  );
}
