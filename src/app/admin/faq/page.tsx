import { createClient } from "@/lib/supabase/server";
import FaqManager from "./FaqManager";

export default async function AdminFaqPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("faq").select("*").order("ordre", { ascending: true });
  return (
    <div className="flex flex-col gap-6 pt-16 md:pt-0">
      <div>
        <h1 className="font-[family-name:var(--font-source-serif)] text-3xl text-[#1c1c1c] font-light">FAQ</h1>
        <p className="text-[#8a8a8a] text-sm mt-1">Ajoutez, modifiez et supprimez les questions fréquentes.</p>
      </div>
      <FaqManager items={data ?? []} />
    </div>
  );
}
