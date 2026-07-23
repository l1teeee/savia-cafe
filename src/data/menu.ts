import type { MenuCategory } from "@/data/types";

export const menuCategories: MenuCategory[] = [
  {
    id: "espresso",
    title: "Espresso y negro",
    items: [
      {
        id: "espresso-single",
        name: "Espresso",
        description: "Dosis de sabor concentrado",
        priceEur: 2.1,
      },
      {
        id: "espresso-double",
        name: "Espresso doble",
        description: "Intensidad y profundidad en cada sorbo",
        priceEur: 2.6,
      },
      {
        id: "americano",
        name: "Americano",
        description: "Espresso diluido en agua caliente",
        priceEur: 2.8,
      },
      {
        id: "cortado",
        name: "Cortado",
        description: "Espresso suavizado con un punto de leche",
        priceEur: 2.4,
      },
    ],
  },
  {
    id: "leche",
    title: "Con leche fresca",
    items: [
      {
        id: "flat-white",
        name: "Flat white",
        description: "Espresso con microespuma sedosa",
        priceEur: 3.6,
      },
      {
        id: "cappuccino",
        name: "Cappuccino",
        description: "Equilibrio entre espresso y espuma",
        priceEur: 3.4,
      },
      {
        id: "latte",
        name: "Latte",
        description: "Suave y cremoso, perfecto para cualquier momento",
        priceEur: 3.6,
        tags: ["vegetal"],
      },
      {
        id: "latte-seasonale",
        name: "Latte especiado de temporada",
        description: "Mezcla cálida con especias aromáticas",
        priceEur: 3.9,
        tags: ["temporada"],
      },
    ],
  },
  {
    id: "filtrados",
    title: "Métodos filtrados",
    items: [
      {
        id: "v60",
        name: "V60 de origen",
        description: "Preparado a mano con café de un único origen",
        priceEur: 4.2,
      },
      {
        id: "chemex",
        name: "Chemex para dos",
        description: "Experiencia manual en jarra de vidrio",
        priceEur: 6.5,
      },
      {
        id: "aeropress",
        name: "Aeropress",
        description: "Rápido e intenso, lo mejor de ambos mundos",
        priceEur: 3.9,
      },
    ],
  },
  {
    id: "frios",
    title: "Bebidas frías",
    items: [
      {
        id: "espresso-tonic",
        name: "Espresso tonic",
        description: "Refrescante y sofisticado sin azúcares añadidos",
        priceEur: 4.5,
        tags: ["sin azúcar"],
      },
      {
        id: "cold-brew",
        name: "Cold brew 12h",
        description: "Infusión suave y natural extraída en frío",
        priceEur: 3.9,
        tags: ["sin azúcar"],
      },
      {
        id: "iced-latte",
        name: "Iced latte",
        description: "Cremoso y refrescante, perfecto en días cálidos",
        priceEur: 3.8,
      },
    ],
  },
  {
    id: "reposteria",
    title: "Repostería artesana",
    items: [
      {
        id: "croissant",
        name: "Croissant de mantequilla",
        description: "Hojaldre crujiente y mantecoso",
        priceEur: 2.6,
      },
      {
        id: "tostada-masa-madre",
        name: "Tostada de masa madre con tomate y AOVE",
        description: "Pan artesano con aceite de oliva virgen extra",
        priceEur: 3.8,
        tags: ["vegetal"],
      },
      {
        id: "cookie-chocolate",
        name: "Cookie de chocolate 70%",
        description: "Chocolate intenso en formato reconfortante",
        priceEur: 2.9,
      },
      {
        id: "bizcocho-limon",
        name: "Bizcocho de limón y amapola",
        description: "Ligero y aromático, sin gluten",
        priceEur: 3.2,
        tags: ["sin gluten"],
      },
    ],
  },
  {
    id: "temporada",
    title: "De temporada",
    items: [
      {
        id: "bowl-yogur",
        name: "Bowl de yogur, granola y fruta",
        description: "Desayuno equilibrado y sabroso",
        priceEur: 5.5,
        tags: ["vegetal"],
      },
      {
        id: "tarta-semana",
        name: "Tarta de la semana",
        description: "Creación especial del día, consulta disponibilidad",
        priceEur: 4.2,
        tags: ["temporada"],
      },
    ],
  },
];

export const menuImages = [
  {
    src: "/images/menu/pour-over-v60.webp",
    alt: "Preparación de café V60 con vertido manual",
  },
  {
    src: "/images/menu/flat-white.webp",
    alt: "Flat white con latte art decorativo",
  },
  {
    src: "/images/menu/artisan-pastry.webp",
    alt: "Repostería artesana de nuestro café",
  },
];
