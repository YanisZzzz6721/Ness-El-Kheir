"use server";

import { createAdminClient } from "@/lib/supabase/server";

interface ContactFormData {
  nom: string;
  telephone: string;
  message: string;
}

export async function submitContact(data: ContactFormData) {
  if (!data.nom?.trim() || !data.telephone?.trim() || !data.message?.trim()) {
    return { success: false, error: "Tous les champs sont obligatoires." };
  }

  const supabase = await createAdminClient();

  const { error } = await supabase.from("messages").insert({
    nom:       data.nom.trim(),
    telephone: data.telephone.trim(),
    message:   data.message.trim(),
  });

  if (error) {
    console.error("[submitContact]", error.message);
    return { success: false, error: "Une erreur est survenue. Veuillez réessayer." };
  }

  return { success: true };
}
