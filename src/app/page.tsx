import SectionTitle from "@/components/ui/SectionTitle";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import { Users, Truck, HandHeart, Handshake } from "lucide-react";

const FAQ_ITEMS = [
  { question: "Où êtes-vous implantées ?", answer: "Nous sommes implantées en Île-de-France." },
  { question: "Où distribuez-vous ?", answer: "Nous distribuons sur Paris et ses alentours." },
  { question: "À qui distribuez-vous ?", answer: "Aux personnes en situation de précarité." },
  { question: "Pourquoi une association 100% femmes ?", answer: "Pour offrir un environnement sans mixité, répondant au besoin de nombreuses femmes cherchant des espaces où elles peuvent se sentir particulièrement à l'aise." },
];

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* Preview des composants — sera remplacé par les vraies sections à l'étape 3 */}
      <section className="section bg-[#F6F6F6]">
        <div className="container-site flex flex-col gap-12">

          <SectionTitle
            label="Composants UI"
            title="Aperçu du design system"
            subtitle="Header, Footer, Button, StatCard, Card et Accordion sont prêts."
          />

          {/* Boutons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-primary">je fais un don 🙏</button>
            <button className="btn-outline">je deviens bénévole 🙋‍♀️</button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 justify-center">
            {["Collectes", "Maraudes", "Aides aux étudiants", "Colis repas"].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<Users size={20} />} value="+80" label="bénévoles investies" />
            <StatCard icon={<Truck size={20} />} value="12" label="maraudes effectuées" />
            <StatCard icon={<HandHeart size={20} />} value="5" label="actions sociales" />
            <StatCard icon={<Handshake size={20} />} value="2" label="partenariats" />
          </div>

          {/* Card */}
          <div className="max-w-sm mx-auto w-full">
            <Card>
              <div className="p-6 flex flex-col gap-2">
                <span className="section-label">Annonce</span>
                <h4 className="text-[#1c1c1c]">Maraude du 15 juin</h4>
                <p className="text-sm text-[#4a4a4a]">Rejoignez-nous pour notre prochaine maraude sur Paris. Rendez-vous à 18h place de la République.</p>
                <button className="btn-outline text-sm mt-2">En savoir plus</button>
              </div>
            </Card>
          </div>

          {/* Accordion */}
          <div className="max-w-2xl mx-auto w-full">
            <SectionTitle label="FAQ" title="Questions fréquentes" className="mb-8" />
            <Accordion items={FAQ_ITEMS} />
          </div>

        </div>
      </section>
    </div>
  );
}
