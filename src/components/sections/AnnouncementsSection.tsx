import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { CalendarDays, ArrowRight } from "lucide-react";

// Données statiques — remplacées par Supabase à l'Étape 6
const PLACEHOLDER_ANNONCES = [
  {
    id: 1,
    titre: "Maraude du 15 juin — Paris 10e",
    contenu: "Rejoignez-nous pour notre prochaine maraude. Nous distribuerons des repas chauds et des kits d'hygiène aux personnes sans-abri. Rendez-vous à 18h place de la République.",
    date: "2025-06-15",
    tag: "Maraude",
  },
  {
    id: 2,
    titre: "Collecte de vêtements — Juin 2025",
    contenu: "Nous lançons une grande collecte de vêtements pour l'été. Vêtements propres, en bon état, adultes et enfants acceptés. Point de dépôt communiqué par Instagram.",
    date: "2025-06-01",
    tag: "Collecte",
  },
  {
    id: 3,
    titre: "Distribution de colis alimentaires",
    contenu: "Dans le cadre de notre partenariat associatif, nous organisons une distribution de colis alimentaires pour les familles en difficulté d'Île-de-France.",
    date: "2025-05-20",
    tag: "Distribution",
  },
];

const TAG_COLORS: Record<string, string> = {
  Maraude:      "bg-[#f0f3ee] text-[#839678]",
  Collecte:     "bg-[#fef3e2] text-[#c08a2a]",
  Distribution: "bg-[#eef6ff] text-[#3b82c4]",
};

function formatDate(d: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));
}

export default function AnnouncementsSection() {
  return (
    <section id="annonces" className="section bg-[#F6F6F6]">
      <div className="container-site flex flex-col gap-10">

        <SectionTitle
          label="Annonces"
          title="Nos dernières actualités"
          subtitle="Restez informés de nos prochaines actions et événements."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLACEHOLDER_ANNONCES.map((a) => (
            <Card key={a.id} className="flex flex-col">
              {/* Top color bar */}
              <div className="h-1.5 bg-[#839678]" />
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TAG_COLORS[a.tag] ?? "bg-[#f0f3ee] text-[#839678]"}`}>
                    {a.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#8a8a8a]">
                    <CalendarDays size={12} />
                    {formatDate(a.date)}
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

      </div>
    </section>
  );
}
