import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

interface Props { content: Record<string, string> }

export default function DonationSection({ content }: Props) {
  return (
    <section id="don" className="section bg-[#1c1c1c] relative overflow-hidden">
      <div className="absolute top-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-[#839678]/10 pointer-events-none" />
      <div className="absolute bottom-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full bg-[#839678]/10 pointer-events-none" />
      <div className="container-site relative z-10 text-center flex flex-col items-center gap-8">
        <div className="w-16 h-16 rounded-full bg-[#839678]/20 flex items-center justify-center">
          <Heart size={28} className="text-[#a3b396] fill-[#839678]" />
        </div>
        <div className="max-w-2xl flex flex-col gap-4">
          <h2 className="text-white font-[family-name:var(--font-source-serif)] font-light">
            {content.don_titre ?? "Nous sommes toutes bénévoles. Vous voulez nous aider ?"}
          </h2>
          <p className="text-white/60 leading-relaxed">
            {content.don_texte ?? "Chaque don nous permet de continuer nos actions sur le terrain."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {["5 €", "10 €", "20 €", "50 €", "Autre montant"].map((m) => (
            <Link key={m} href="/faire-un-don" className="px-5 py-2.5 rounded-full border border-[#839678]/40 text-[#a3b396] text-sm font-semibold hover:bg-[#839678] hover:text-white hover:border-[#839678] transition-all duration-200">
              {m}
            </Link>
          ))}
        </div>
        <Link href="/faire-un-don" className="inline-flex items-center gap-2 bg-[#839678] text-white font-semibold px-9 py-4 rounded-full hover:bg-[#6b7d63] transition-all duration-200 hover:-translate-y-px hover:shadow-lg text-base">
          <Heart size={16} className="fill-white" />
          Je fais un don
          <ArrowRight size={16} />
        </Link>
        <p className="text-white/30 text-xs">Association loi 1901 — Reçu fiscal sur demande</p>
      </div>
    </section>
  );
}
