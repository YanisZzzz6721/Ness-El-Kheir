"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

// Données statiques — remplacées par Supabase à l'Étape 6
const PLACEHOLDER_PHOTOS = [
  { id: 1, url: "https://placehold.co/600x750/839678/ffffff?text=Photo+1", alt: "Action bénévoles" },
  { id: 2, url: "https://placehold.co/600x500/6b7d63/ffffff?text=Photo+2", alt: "Distribution alimentaire" },
  { id: 3, url: "https://placehold.co/600x800/a3b396/ffffff?text=Photo+3", alt: "Maraude Paris" },
  { id: 4, url: "https://placehold.co/600x600/839678/ffffff?text=Photo+4", alt: "Collecte vêtements" },
  { id: 5, url: "https://placehold.co/600x700/6b7d63/ffffff?text=Photo+5", alt: "Préparation colis" },
  { id: 6, url: "https://placehold.co/600x550/a3b396/ffffff?text=Photo+6", alt: "Équipe bénévoles" },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<{ url: string; alt: string } | null>(null);

  return (
    <section id="galerie" className="section bg-white">
      <div className="container-site flex flex-col gap-10">

        <SectionTitle
          label="Galerie"
          title="Quelques photos de nos actions"
          subtitle="Des moments capturés au fil de nos maraudes, collectes et distributions."
        />

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4">
          {PLACEHOLDER_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="relative mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-[10px] group cursor-pointer"
              onClick={() => setLightbox(photo)}
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                width={600}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-[#839678]/0 group-hover:bg-[#839678]/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Note dynamique */}
        <p className="text-center text-sm text-[#8a8a8a]">
          De nouvelles photos sont ajoutées régulièrement par notre équipe.
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-white/70 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Fermer"
          >
            <X size={32} />
          </button>
          <div
            className="max-w-3xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.url}
              alt={lightbox.alt}
              width={900}
              height={700}
              className="max-h-[85vh] w-auto rounded-[10px] shadow-2xl object-contain"
            />
            {lightbox.alt && (
              <p className="text-center text-white/70 text-sm mt-3">{lightbox.alt}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
