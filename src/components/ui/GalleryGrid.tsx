"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import type { GaleriePhoto } from "@/types";

export default function GalleryGrid({ photos }: { photos: GaleriePhoto[] }) {
  const [lightbox, setLightbox] = useState<GaleriePhoto | null>(null);

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 gap-3 md:gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-[10px] group cursor-pointer"
            onClick={() => setLightbox(photo)}
          >
            <Image
              src={photo.url}
              alt={photo.alt ?? "Photo Nass el Kheir"}
              width={600}
              height={500}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#839678]/0 group-hover:bg-[#839678]/30 transition-all duration-300 flex items-center justify-center">
              <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-[#8a8a8a]">
        De nouvelles photos sont ajoutées régulièrement par notre équipe.
      </p>

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
          <div className="max-w-3xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.url}
              alt={lightbox.alt ?? "Photo Nass el Kheir"}
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
    </>
  );
}
