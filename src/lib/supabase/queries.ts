import { createClient } from "./server";

/** Récupère les annonces publiées, de la plus récente à la plus ancienne */
export async function getAnnonces() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("annonces")
    .select("*")
    .eq("publie", true)
    .order("created_at", { ascending: false });
  if (error) { console.error("[getAnnonces]", error.message); return []; }
  return data ?? [];
}

/** Récupère toutes les photos de la galerie */
export async function getGalerie() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("galerie")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("[getGalerie]", error.message); return []; }
  return data ?? [];
}

/** Récupère la FAQ triée par ordre */
export async function getFaq() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faq")
    .select("*")
    .order("ordre", { ascending: true });
  if (error) { console.error("[getFaq]", error.message); return []; }
  return data ?? [];
}

/** Récupère tous les textes du site sous forme d'objet clé→valeur */
export async function getSiteContent(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_content").select("id, valeur");
  if (error) { console.error("[getSiteContent]", error.message); return {}; }
  return Object.fromEntries((data ?? []).map((r) => [r.id, r.valeur]));
}
