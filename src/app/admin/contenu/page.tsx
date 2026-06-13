import { createClient } from "@/lib/supabase/server";
import ContenuManager from "./ContenuManager";

export default async function AdminContenuPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_content").select("*");
  const content = Object.fromEntries((data ?? []).map(r => [r.id, r.valeur]));
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-[family-name:var(--font-source-serif)] text-3xl text-[#1c1c1c] font-light">Textes du site</h1>
        <p className="text-[#8a8a8a] text-sm mt-1">Modifiez tous les textes visibles sur votre site.</p>
      </div>
      <ContenuManager content={content} />
    </div>
  );
}
