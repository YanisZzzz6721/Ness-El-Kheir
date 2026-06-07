import SectionTitle from "@/components/ui/SectionTitle";
import { CheckCircle2 } from "lucide-react";

const CONDITIONS = [
  "Être majeure",
  "Résider en Île-de-France",
  "Être une femme (association féminine)",
];

export default function JoinSection() {
  return (
    <section id="rejoindre" className="section bg-[#F6F6F6]">
      <div className="container-site">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">

          <SectionTitle
            label="Rejoindre"
            title="Comment nous rejoindre ?"
            subtitle="Vous souhaitez vous engager à nos côtés ? Voici les conditions pour devenir bénévole au sein de Nass el Kheir."
          />

          {/* Card conditions */}
          <div className="bg-white rounded-[16px] shadow-md p-8 md:p-10 flex flex-col gap-8">

            <div>
              <h3 className="text-[#1c1c1c] text-xl mb-5 font-[family-name:var(--font-source-serif)]">
                Les conditions
              </h3>
              <ul className="flex flex-col gap-4">
                {CONDITIONS.map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-[#839678] flex-shrink-0 fill-[#f0f3ee] stroke-[#839678]" />
                    <span className="text-[#4a4a4a] font-medium">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#e8e8e8] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-[#8a8a8a]">
                Prête à rejoindre l&apos;aventure ? Remplissez le formulaire d&apos;inscription.
              </p>
              <a
                href="https://docs.google.com/forms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-shrink-0"
              >
                Je deviens bénévole 🙋‍♀️
              </a>
            </div>
          </div>

          {/* Note informelle */}
          <p className="text-center text-sm text-[#8a8a8a]">
            Des questions avant de postuler ?{" "}
            <a href="#contact" className="text-[#839678] font-semibold hover:underline">
              Contactez-nous
            </a>
          </p>

        </div>
      </div>
    </section>
  );
}
