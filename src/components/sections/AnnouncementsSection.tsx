import { getAnnonces } from "@/lib/supabase/queries";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { CalendarDays, ArrowRight } from "lucide-react";

const TAG_COLORS: Record<string, string> = {
  Maraude:      "bg-[#f0f3ee] text-[#839678]",
  Collecte:     "bg-[#fef3e2] text-[#c08a2a]",
  Distribution: "bg-[#eef6ff] text-[#3b82c4]",
  Événement:    "bg-[#fce7f3] text-[#be185d]",
};

function formatDate(d: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  }).format(new Date(d));
}

export default async function AnnouncementsSection() {
  const annonces = await getAnnonces();

  return (
    <section id="annonces" className="section bg-[#F6F6F6]">
      <div className="container-site flex flex-col gap-10">

        <SectionTitle
          label="Annonces"
          title="Nos dernières actualités"
          subtitle="Restez informées de nos prochaines actions et événements."
        />

        {annonces.length === 0 ? (
          <div className="text-center py-16 text-[#8a8a8a]">
            <p className="text-4xl mb-4">📢</p>
            <p className="font-medium">Aucune annonce pour le moment.</p>
            <p className="text-sm mt-1">Revenez bientôt pour nos prochaines actualités !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {annonces.map((a) => (
              <Card key={a.id} className="flex flex-col">
                <div className="h-1.5 bg-[#839678]" />
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TAG_COLORS["Annonce"] ?? "bg-[#f0f3ee] text-[#839678]"}`}>
                      Annonce
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#8a8a8a]">
                      <CalendarDays size={12} />
                      {formatDate(a.created_at)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-[#1c1c1c] text-base leading-snug">
                    {a.titre}
                  </h4>
                  <p className="text-sm text-[#4a4a4a] leading-relaxed flex-1">
                    {a.contenu.length > 120 ? a.contenu.slice(0, 120) + "…" : a.contenu}
                  </p>
                  <button className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#839678] hover:gap-2 transition-all duration-150 w-fit">
                    En savoir plus <ArrowRight size={14} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
