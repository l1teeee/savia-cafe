import { Sprout, Hand, Flame, Coffee } from "lucide-react";
import type { ProcessStep } from "@/data/types";

export const processSteps: ProcessStep[] = [
  {
    id: "cultivo",
    number: "01",
    title: "Cultivo",
    description:
      "Trabajamos con productores que practican agricultura regenerativa, fortaleciendo suelos y ecosistemas. Cada finca es un territorio vivo donde el café convive en armonía con la naturaleza.",
    icon: Sprout,
  },
  {
    id: "seleccion",
    number: "02",
    title: "Selección",
    description:
      "Recolección manual y clasificación cuidadosa del grano en su punto óptimo de madurez. Solo las cerezas más sabrosas alcanzan nuestro tostadero.",
    icon: Hand,
  },
  {
    id: "tostado",
    number: "03",
    title: "Tostado",
    description:
      "Tostamos en pequeños lotes que revelan el carácter único de cada origen. Calor y tiempo precisos transforman el potencial del grano en sabor memorable.",
    icon: Flame,
  },
  {
    id: "preparacion",
    number: "04",
    title: "Preparación",
    description:
      "Métodos precisos y artesanales sin prisa: filtrados, espresso, prensa francesa. Cada taza es un acto consciente de disfrute y conexión.",
    icon: Coffee,
  },
];
