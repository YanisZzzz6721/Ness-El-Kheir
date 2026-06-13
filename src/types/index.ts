/**
 * Shared TypeScript types — Ness el Kheir
 */

export interface Annonce {
  id: string;
  titre: string;
  contenu: string;
  image_url?: string | null;
  publie: boolean;
  created_at: string;
}

export interface GaleriePhoto {
  id: string;
  url: string;
  alt?: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  nom: string;
  telephone: string;
  message: string;
  lu: boolean;
  created_at: string;
}
