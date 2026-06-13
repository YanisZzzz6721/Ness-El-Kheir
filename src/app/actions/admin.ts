"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ─── ANNONCES ───
export async function createAnnonce(data: { titre: string; contenu: string }) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("annonces").insert({ ...data, publie: true });
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function deleteAnnonce(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("annonces").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function updateAnnonce(id: string, data: { titre: string; contenu: string }) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("annonces").update(data).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── GALERIE ───
export async function deletePhoto(id: string, url: string) {
  const supabase = await createAdminClient();
  // Extraire le path dans le bucket depuis l'URL
  const path = url.split("/storage/v1/object/public/galerie/")[1];
  if (path) await supabase.storage.from("galerie").remove([path]);
  const { error } = await supabase.from("galerie").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── FAQ ───
export async function createFaq(data: { question: string; reponse: string; ordre: number }) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("faq").insert(data);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function updateFaq(id: string, data: { question: string; reponse: string }) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("faq").update(data).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function deleteFaq(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("faq").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── CONTENU SITE ───
export async function updateSiteContent(id: string, valeur: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("site_content")
    .update({ valeur, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── MESSAGES ───
export async function markMessageLu(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("messages").update({ lu: true }).eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteMessage(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
