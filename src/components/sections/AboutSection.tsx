import SectionTitle from "@/components/ui/SectionTitle";
import StatCard from "@/components/ui/StatCard";
import { Users, Truck, HandHeart, Handshake } from "lucide-react";

interface Props { content: Record<string, string> }

export default function AboutSection({ content }: Props) {
  const stats = [
    { icon: <Users size={22} />,     value: content.stats_benevoles    ?? "+80", label: "bénévoles investies" },
    { icon: <Truck size={22} />,     value: content.stats_maraudes     ?? "12",  label: "maraudes effectuées" },
    { icon: <HandHeart size={22} />, value: content.stats_actions      ?? "5",   label: "actions sociales" },
    { icon: <Handshake size={22} />, value: content.stats_partenariats ?? "2",   label: "partenariats" },
  ];

  return (
    <section id="a-propos" className="section bg-white">
      <div className="container-site flex flex-col gap-12">
        <SectionTitle
          label="À propos"
          title="Ness el Kheir, c'est quoi ?"
          subtitle={content.apropos_texte}
        />
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#4a4a4a] text-base leading-relaxed">Aujourd&apos;hui, notre association, c&apos;est&nbsp;:</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => <StatCard key={s.label} icon={s.icon} value={s.value} label={s.label} />)}
        </div>
        <div className="bg-[#f0f3ee] rounded-[16px] p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { emoji: "💚", title: "Solidarité",   text: "Nous agissons ensemble, pour les autres, sans distinction." },
            { emoji: "🤝", title: "Engagement",   text: "Chaque bénévole s'investit avec cœur dans chaque action." },
            { emoji: "🌱", title: "Bienveillance",text: "Un environnement doux, féminin et sans jugement." },
          ].map((v) => (
            <div key={v.title} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{v.emoji}</span>
              <h4 className="font-semibold text-[#1c1c1c] text-base">{v.title}</h4>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
