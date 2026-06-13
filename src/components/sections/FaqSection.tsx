import SectionTitle from "@/components/ui/SectionTitle";
import Accordion from "@/components/ui/Accordion";

interface FaqItem { id: string; question: string; reponse: string; ordre: number }
interface Props { faq: FaqItem[] }

export default function FaqSection({ faq }: Props) {
  const items = faq.map((f) => ({ question: f.question, answer: f.reponse }));

  return (
    <section id="faq" className="section bg-white">
      <div className="container-site">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <SectionTitle label="FAQ" title="Les questions fréquentes" subtitle="Vous avez une question ? Nous avons sûrement la réponse ici." />
          {items.length === 0 ? (
            <p className="text-center text-[#8a8a8a]">Aucune question pour le moment.</p>
          ) : (
            <Accordion items={items} />
          )}
          <p className="text-center text-sm text-[#8a8a8a]">
            Vous ne trouvez pas votre réponse ?{" "}
            <a href="#contact" className="text-[#839678] font-semibold hover:underline">Écrivez-nous</a>
          </p>
        </div>
      </div>
    </section>
  );
}
