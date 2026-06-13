import { createClient } from "@/lib/supabase/server";
import GalerieManager from "./GalerieManager";

export default async function AdminGaleriePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("galerie").select("*").order("created_at", { ascending: false });
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-[family-name:var(--font-source-serif)] text-3xl text-[#1c1c1c] font-light">Galerie photos</h1>
        <p className="text-[#8a8a8a] text-sm mt-1">Ajoutez et supprimez des photos facilement.</p>
      </div>
      <GalerieManager photos={data ?? []} />
    </div>
  );
}
