import Link from "next/link";
import { cn } from "@/lib/cn";

interface ButtonVariantProps {
  variant?: "primary" | "outline" | "ghost" | "inverted" | "verde";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

type AnchorButtonProps = ButtonVariantProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type NativeButtonProps = ButtonVariantProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    href,
    className,
    children,
    ...rest
  } = props;
  const baseStyles =
    "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full border font-medium uppercase tracking-[0.12em] transition-[color,background-color,border-color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-55 motion-safe:active:scale-[0.99] motion-reduce:transition-colors";

  const variants = {
    primary:
      "border-cafe bg-cafe text-crema-clara hover:border-tinta hover:bg-tinta",
    outline:
      "border-cafe/25 bg-transparent text-cafe hover:border-cafe hover:bg-cafe/[0.04]",
    ghost:
      "border-transparent bg-transparent text-cafe hover:border-borde hover:bg-crema-clara/60",
    inverted:
      "border-crema-clara bg-crema-clara text-cafe hover:border-verde hover:bg-verde hover:text-crema-clara",
    verde:
      "border-verde bg-verde text-crema-clara hover:border-tinta hover:bg-tinta",
  };

  const sizes = {
    md: "px-5 py-2.5 text-xs",
    lg: "px-6 py-3 text-xs sm:px-7",
  };

  const buttonClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (href !== undefined) {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    if (href.startsWith("#") || href.startsWith("http")) {
      return (
        <a href={href} className={buttonClassName} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={buttonClassName} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  );
}
