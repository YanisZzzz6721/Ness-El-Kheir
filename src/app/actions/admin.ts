"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { sanitizeText } from "@/lib/sanitize";

/** Vérifie que l'utilisateur est bien authentifié */
async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Non autorisé");
  return user;
}

// ─── ANNONCES ───
export async function createAnnonce(data: { titre: string; contenu: string }) {
  await requireAuth();
  const titre   = sanitizeText(data.titre,   200);
  const contenu = sanitizeText(data.contenu, 5000);
  if (!titre || !contenu) return { success: false, error: "Titre et contenu obligatoires." };

  const supabase = await createAdminClient();
  const { error } = await supabase.from("annonces").insert({ titre, contenu, publie: true });
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function updateAnnonce(id: string, data: { titre: string; contenu: string }) {
  await requireAuth();
  const titre   = sanitizeText(data.titre,   200);
  const contenu = sanitizeText(data.contenu, 5000);
  if (!titre || !contenu) return { success: false, error: "Champs obligatoires." };

  const supabase = await createAdminClient();
  const { error } = await supabase.from("annonces").update({ titre, contenu }).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function deleteAnnonce(id: string) {
  await requireAuth();
  const supabase = await createAdminClient();
  const { error } = await supabase.from("annonces").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── GALERIE ───
export async function deletePhoto(id: string, url: string) {
  await requireAuth();
  const supabase = await createAdminClient();
  const path = url.split("/storage/v1/object/public/galerie/")[1];
  if (path) await supabase.storage.from("galerie").remove([decodeURIComponent(path)]);
  const { error } = await supabase.from("galerie").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── FAQ ───
export async function createFaq(data: { question: string; reponse: string; ordre: number }) {
  await requireAuth();
  const question = sanitizeText(data.question, 300);
  const reponse  = sanitizeText(data.reponse,  2000);
  if (!question || !reponse) return { success: false, error: "Question et réponse obligatoires." };

  const supabase = await createAdminClient();
  const { error } = await supabase.from("faq").insert({ question, reponse, ordre: data.ordre });
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function updateFaq(id: string, data: { question: string; reponse: string }) {
  await requireAuth();
  const question = sanitizeText(data.question, 300);
  const reponse  = sanitizeText(data.reponse,  2000);
  if (!question || !reponse) return { success: false, error: "Champs obligatoires." };

  const supabase = await createAdminClient();
  const { error } = await supabase.from("faq").update({ question, reponse }).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function deleteFaq(id: string) {
  await requireAuth();
  const supabase = await createAdminClient();
  const { error } = await supabase.from("faq").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── CONTENU SITE ───
const ALLOWED_CONTENT_IDS = [
  "hero_titre", "hero_subtitle", "hero_description", "hero_tags",
  "apropos_texte", "stats_benevoles", "stats_maraudes", "stats_actions", "stats_partenariats",
  "rejoindre_texte", "google_form_url",
  "contact_titre", "contact_texte", "instagram_handle", "telephone", "email",
  "don_titre", "don_texte", "footer_description",
];

export async function updateSiteContent(id: string, valeur: string) {
  await requireAuth();
  // Whitelist des IDs autorisés (protection contre injection de clés arbitraires)
  if (!ALLOWED_CONTENT_IDS.includes(id)) {
    return { success: false, error: "Champ non autorisé." };
  }
  const safeValeur = sanitizeText(valeur, 3000);
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("site_content")
    .update({ valeur: safeValeur, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── MESSAGES ───
export async function markMessageLu(id: string) {
  await requireAuth();
  const supabase = await createAdminClient();
  const { error } = await supabase.from("messages").update({ lu: true }).eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteMessage(id: string) {
  await requireAuth();
  const supabase = await createAdminClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
