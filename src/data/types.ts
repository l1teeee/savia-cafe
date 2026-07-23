import type { LucideIcon } from "lucide-react";

export interface CoffeeProduct {
  id: string;
  name: string;
  originCountry: string;
  process: string;
  description: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  priceEur: number;
  weightGrams: number;
  image: string;
  isDemo: true;
}

export interface CoffeeOrigin {
  id: string;
  country: string;
  region: string;
  altitude: string;
  variety: string;
  process: string;
  notes: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  description: string;
  image: string;
  isDemo: true;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export type MenuTag = "vegetal" | "sin azúcar" | "sin gluten" | "temporada";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceEur: number;
  tags?: MenuTag[];
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface SustainabilityMetric {
  id: string;
  value: string;
  label: string;
  description: string;
  isDemo: true;
}

export interface SustainabilityPillar {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  aspectClass: string;
  prominent?: boolean;
}

export type LocationService =
  | "wifi"
  | "terraza"
  | "accesible"
  | "filtrados"
  | "pet-friendly"
  | "take-away";

export interface CafeLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  schedule: { days: string; hours: string }[];
  services: LocationService[];
  mapsQuery: string;
  image: string;
  isDemo: true;
}
