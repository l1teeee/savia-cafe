import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCoffee } from "@/components/sections/FeaturedCoffee";
import { Story } from "@/components/sections/Story";
import { Origins } from "@/components/sections/Origins";
import { CoffeeProcess } from "@/components/sections/CoffeeProcess";
import { CafeMenu } from "@/components/sections/CafeMenu";
import { Sustainability } from "@/components/sections/Sustainability";
import { ExperienceGallery } from "@/components/sections/ExperienceGallery";
import { Locations } from "@/components/sections/Locations";
import { SharedMoments } from "@/components/sections/SharedMoments";
import { Newsletter } from "@/components/sections/Newsletter";
import { site } from "@/config/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.name,
    description: site.description,
    url: site.url,
    priceRange: "€€",
    servesCuisine: ["Café de especialidad", "Repostería artesanal"],
  };

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <Hero />
        <FeaturedCoffee />
        <Story />
        <Origins />
        <CoffeeProcess />
        <CafeMenu />
        <Sustainability />
        <ExperienceGallery />
        <Locations />
        <SharedMoments />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
