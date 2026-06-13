import { createClient } from "@/lib/supabase/server";
import AnnouncesManager from "./AnnouncesManager";

export default async function AdminAnnoncesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("annonces").select("*").order("created_at", { ascending: false });
  return (
    <div className="flex flex-col gap-6 pt-16 md:pt-0">
      <div>
        <h1 className="font-[family-name:var(--font-source-serif)] text-3xl text-[#1c1c1c] font-light">Annonces</h1>
        <p className="text-[#8a8a8a] text-sm mt-1">Créez, modifiez et supprimez vos annonces.</p>
      </div>
      <AnnouncesManager annonces={data ?? []} />
    </div>
  );
}
