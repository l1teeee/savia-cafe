import type { CoffeeProduct } from "@/data/types";

export const coffees: CoffeeProduct[] = [
  {
    id: "aurora",
    name: "Aurora",
    originCountry: "Etiopía",
    process: "Lavado",
    description:
      "Notas florales de jazmín y bergamota con una acidez cítrica luminosa que despierta los sentidos.",
    intensity: 2,
    priceEur: 12.5,
    weightGrams: 250,
    image: "/images/products/aurora-ethiopia.webp",
    isDemo: true,
  },
  {
    id: "tierra-roja",
    name: "Tierra Roja",
    originCountry: "Colombia",
    process: "Honey",
    description:
      "Panela y cacao rojo en un cuerpo sedoso, con notas de frutos secos que evocan la riqueza de las alturas colombianas.",
    intensity: 3,
    priceEur: 11.9,
    weightGrams: 250,
    image: "/images/products/tierra-roja-colombia.webp",
    isDemo: true,
  },
  {
    id: "bosque-alto",
    name: "Bosque Alto",
    originCountry: "Guatemala",
    process: "Natural",
    description:
      "Frutos del bosque y chocolate amargo en capas profundas, con un final largo y envolvente.",
    intensity: 4,
    priceEur: 13.2,
    weightGrams: 250,
    image: "/images/products/bosque-alto-guatemala.webp",
    isDemo: true,
  },
  {
    id: "casa-savia",
    name: "Casa Savia",
    originCountry: "Mezcla de la casa",
    process: "Espresso",
    description:
      "Almendra tostada y caramelo oscuro en perfecto equilibrio, diseñado para resaltar con leche.",
    intensity: 5,
    priceEur: 10.9,
    weightGrams: 250,
    image: "/images/products/casa-savia-espresso.webp",
    isDemo: true,
  },
];
