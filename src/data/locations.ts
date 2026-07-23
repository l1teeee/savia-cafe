import type { CafeLocation } from "@/data/types";

export const cafeLocations: CafeLocation[] = [
  {
    id: "barrio-norte",
    name: "Barrio Norte",
    city: "Madrid",
    address: "Calle de la Acacia 12, 28004 Madrid (demo)",
    schedule: [
      { days: "Lun–Vie", hours: "8:00–20:00" },
      { days: "Sáb–Dom", hours: "9:00–21:00" },
    ],
    services: ["wifi", "filtrados", "take-away", "accesible"],
    mapsQuery: "Calle de la Acacia 12 Madrid",
    image: "/images/locations/barrio-norte.webp",
    isDemo: true,
  },
  {
    id: "el-born",
    name: "El Born",
    city: "Barcelona",
    address: "Carrer del Rec 45, 08003 Barcelona (demo)",
    schedule: [
      { days: "Lun–Vie", hours: "8:30–20:30" },
      { days: "Sáb–Dom", hours: "9:00–21:00" },
    ],
    services: ["wifi", "terraza", "pet-friendly", "filtrados"],
    mapsQuery: "Carrer del Rec 45 Barcelona",
    image: "/images/locations/el-born.webp",
    isDemo: true,
  },
  {
    id: "casco-historico",
    name: "Casco Histórico",
    city: "Sevilla",
    address: "Calle Sierpes 78, 41004 Sevilla (demo)",
    schedule: [
      { days: "Lun–Vie", hours: "8:30–20:00" },
      { days: "Sáb–Dom", hours: "9:30–21:30" },
    ],
    services: ["terraza", "accesible", "take-away", "pet-friendly"],
    mapsQuery: "Calle Sierpes 78 Sevilla",
    image: "/images/locations/casco-historico.webp",
    isDemo: true,
  },
];
