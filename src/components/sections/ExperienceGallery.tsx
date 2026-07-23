import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";
import { galleryImages } from "@/data/gallery";

export function ExperienceGallery() {
  return (
    <InteractiveImageBentoGallery
      id="experiencias"
      headingId="experiencias-heading"
      eyebrow="La experiencia Savia"
      title="Un espacio para bajar el ritmo"
      description="Diseñamos cada espacio para conversar, trabajar, leer o simplemente disfrutar una buena taza."
      imageItems={galleryImages.map((image) => ({
        id: image.id,
        title: image.title,
        desc: image.description,
        url: image.src,
        alt: image.alt,
        span: image.span,
      }))}
      footer={
        <div className="flex justify-center">
          <Button variant="primary" href="#ubicaciones">
            Visitar nuestras cafeterías
            <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
          </Button>
        </div>
      }
    />
  );
}
