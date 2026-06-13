import { getGalerie } from "@/lib/supabase/queries";
import SectionTitle from "@/components/ui/SectionTitle";
import GalleryGrid from "@/components/ui/GalleryGrid";

export default async function GallerySection() {
  const photos = await getGalerie();

  return (
    <section id="galerie" className="section bg-white">
      <div className="container-site flex flex-col gap-10">

        <SectionTitle
          label="Galerie"
          title="Quelques photos de nos actions"
          subtitle="Des moments capturés au fil de nos maraudes, collectes et distributions."
        />

        {photos.length === 0 ? (
          <div className="text-center py-16 text-[#8a8a8a]">
            <p className="text-4xl mb-4">📸</p>
            <p className="font-medium">Les photos arrivent bientôt !</p>
            <p className="text-sm mt-1">Notre administratrice met la galerie à jour régulièrement.</p>
          </div>
        ) : (
          <GalleryGrid photos={photos} />
        )}

      </div>
    </section>
  );
}
