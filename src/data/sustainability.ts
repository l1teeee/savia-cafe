import type { SustainabilityMetric, SustainabilityPillar } from "@/data/types";
import { Leaf, Recycle, HandHeart, Sprout } from "lucide-react";

export const sustainabilityMetrics: SustainabilityMetric[] = [
  {
    id: "trazabilidad",
    value: "100%",
    label: "Café trazable",
    description:
      "Cada grano que llega a nuestras máquinas tiene un origen verificable y documentado.",
    isDemo: true,
  },
  {
    id: "empaques",
    value: "85%",
    label: "Empaques reciclables",
    description:
      "Nuestros empaques son compostables o reciclables, reduciendo impacto ambiental.",
    isDemo: true,
  },
  {
    id: "comercio",
    value: "Directo",
    label: "Comercio justo",
    description:
      "Trabajamos directamente con productores, garantizando precios justos y relaciones estables.",
    isDemo: true,
  },
];

export const sustainabilityPillars: SustainabilityPillar[] = [
  {
    id: "responsable",
    title: "Compra responsable",
    description:
      "Relaciones directas con productores, garantizando trazabilidad y prácticas éticas en cada paso de la cadena.",
    icon: Leaf,
  },
  {
    id: "residuos",
    title: "Reducción de residuos",
    description:
      "Reutilización del café molido en compost y proyectos de agricultura urbana con nuestras comunidades.",
    icon: Recycle,
  },
  {
    id: "empaques",
    title: "Empaques responsables",
    description:
      "Bolsas compostables, envases reutilizables y eliminación total de plástico de un solo uso.",
    icon: HandHeart,
  },
  {
    id: "comunidad",
    title: "Proyectos con la comunidad",
    description:
      "Educación, plantación de árboles y apoyo a iniciativas locales que cultiven un futuro más verde.",
    icon: Sprout,
  },
];
