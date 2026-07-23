"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUp, VIEWPORT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerGroup({ children, className }: StaggerGroupProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={
        prefersReducedMotion
          ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
          : staggerContainer
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      variants={
        prefersReducedMotion
          ? {
              hidden: { opacity: 1, y: 0 },
              visible: { opacity: 1, y: 0 },
            }
          : fadeUp
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
