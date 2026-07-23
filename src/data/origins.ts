import type { CoffeeOrigin } from "@/data/types";

export const origins: CoffeeOrigin[] = [
  {
    id: "el-salvador",
    country: "El Salvador",
    region: "Apaneca-Ilamatepec",
    altitude: "1.350 – 1.700 msnm",
    variety: "Bourbon, Pacas",
    process: "Honey",
    notes: "miel, naranja confitada, chocolate con leche",
    intensity: 3,
    description:
      "Las tierras volcánicas de Apaneca-Ilamatepec producen granos con una dulzura natural incomparable. Trabajamos con familias locales comprometidas con el cultivo regenerativo y la preservación de la biodiversidad.",
    image: "/images/origins/el-salvador-coffee-farm.webp",
    isDemo: true,
  },
  {
    id: "colombia",
    country: "Colombia",
    region: "Huila",
    altitude: "1.500 – 1.900 msnm",
    variety: "Caturra, Castillo",
    process: "Lavado",
    notes: "panela, ciruela roja, cacao",
    intensity: 3,
    description:
      "Huila es cuna de innovación cafetera en Colombia. Nuestros productores aplican técnicas sostenibles mientras conservan los saberes ancestrales de sus territorios.",
    image: "/images/origins/colombia-coffee-farm.webp",
    isDemo: true,
  },
  {
    id: "etiopia",
    country: "Etiopía",
    region: "Yirgacheffe, Gedeo",
    altitude: "1.800 – 2.200 msnm",
    variety: "Variedades heirloom",
    process: "Lavado",
    notes: "jazmín, bergamota, té negro",
    intensity: 2,
    description:
      "La cuna del café silvestre. En Etiopía recolectamos variedades ancestrales de pequeños productores que mantienen prácticas agroforestales complejas y respetuosas con el ecosistema.",
    image: "/images/origins/ethiopia-coffee-farm.webp",
    isDemo: true,
  },
  {
    id: "guatemala",
    country: "Guatemala",
    region: "Antigua, Acatenango",
    altitude: "1.500 – 1.800 msnm",
    variety: "Bourbon, Caturra",
    process: "Natural",
    notes: "frutos rojos maduros, caramelo, especias dulces",
    intensity: 4,
    description:
      "Las laderas de los volcanes Antigua y Acatenango crean microclimas únicos. Nuestros asociados cultivan con fermentación controlada que resalta la complejidad característica de esta región.",
    image: "/images/origins/guatemala-coffee-farm.webp",
    isDemo: true,
  },
];
