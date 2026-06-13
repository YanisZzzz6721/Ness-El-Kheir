"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { sanitizeText, isValidPhone } from "@/lib/sanitize";

interface ContactFormData {
  nom:       string;
  telephone: string;
  message:   string;
}

export async function submitContact(data: ContactFormData) {
  // ── Validation & sanitisation ──
  const nom       = sanitizeText(data.nom ?? "",       100);
  const telephone = sanitizeText(data.telephone ?? "", 20);
  const message   = sanitizeText(data.message ?? "",   2000);

  if (!nom)       return { success: false, error: "Le nom est obligatoire." };
  if (!telephone) return { success: false, error: "Le téléphone est obligatoire." };
  if (!message)   return { success: false, error: "Le message est obligatoire." };

  if (!isValidPhone(telephone)) {
    return { success: false, error: "Numéro de téléphone invalide." };
  }

  if (message.length < 5) {
    return { success: false, error: "Le message est trop court." };
  }

  // ── Insert Supabase (requête paramétrée, pas d'injection SQL possible) ──
  const supabase = await createAdminClient();
  const { error } = await supabase.from("messages").insert({ nom, telephone, message });

  if (error) {
    console.error("[submitContact]", error.message);
    return { success: false, error: "Une erreur est survenue. Veuillez réessayer." };
  }

  return { success: true };
}
