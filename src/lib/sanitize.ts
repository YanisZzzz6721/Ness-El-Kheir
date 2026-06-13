/**
 * Sanitisation des entrées utilisateur
 * — Protection XSS : supprime les balises HTML/scripts
 * — Protection injection : trim + limite de longueur
 * — Les requêtes Supabase utilisent des requêtes paramétrées (pas de SQL injection possible)
 */

/** Supprime toute balise HTML et caractères dangereux */
export function sanitizeText(input: string, maxLength = 2000): string {
  return input
    .trim()
    .slice(0, maxLength)
    // Supprime toutes les balises HTML
    .replace(/<[^>]*>/g, "")
    // Supprime les entités HTML dangereuses
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/data:/gi, "");
}

/** Valide un email basiquement */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Valide un numéro de téléphone français */
export function isValidPhone(phone: string): boolean {
  return /^[\d\s\+\-\.\(\)]{7,20}$/.test(phone.trim());
}
