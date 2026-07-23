import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}

export function Container({
  children,
  className,
  as: As = "div",
}: ContainerProps) {
  return (
    <As
      className={cn(
        "mx-auto w-full max-w-[1280px] px-5 sm:px-7 md:px-8 lg:px-10 xl:px-12",
        className
      )}
    >
      {children}
    </As>
  );
}
