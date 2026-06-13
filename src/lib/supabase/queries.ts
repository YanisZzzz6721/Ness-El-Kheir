import { createClient } from "./server";

/** Récupère les annonces publiées, de la plus récente à la plus ancienne */
export async function getAnnonces() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("annonces")
    .select("*")
    .eq("publie", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAnnonces]", error.message);
    return [];
  }
  return data ?? [];
}

/** Récupère toutes les photos de la galerie, de la plus récente à la plus ancienne */
export async function getGalerie() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("galerie")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getGalerie]", error.message);
    return [];
  }
  return data ?? [];
}
