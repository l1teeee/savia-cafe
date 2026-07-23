"use client";

import { motion } from "motion/react";
import { VIEWPORT, DUR, EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const Component = as === "div" ? motion.div : as === "section" ? motion.section : motion.li;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={
        prefersReducedMotion
          ? {
              hidden: { opacity: 1, y: 0 },
              visible: { opacity: 1, y: 0 },
            }
          : {
              hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: DUR.base,
                  ease: EASE,
                  delay,
                },
              },
            }
      }
      className={className}
    >
      {children}
    </Component>
  );
}
