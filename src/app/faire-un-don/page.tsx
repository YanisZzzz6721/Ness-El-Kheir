import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ArrowLeft, ShieldCheck, Users, HandHeart, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Faire un don",
  description: "Soutenez Nass el Kheir et aidez-nous à continuer nos actions humanitaires en Île-de-France.",
};

// 🔧 À REMPLACER dès réception du lien PayPal
const PAYPAL_LINK = "https://www.paypal.com/paypalme/AREMPLACER";

const IMPACTS = [
  { emoji: "🍱", amount: "10 €", description: "finance un repas chaud lors d'une maraude" },
  { emoji: "🧴", amount: "20 €", description: "permet de constituer un kit d'hygiène complet" },
  { emoji: "👕", amount: "30 €", description: "contribue à une collecte de vêtements" },
  { emoji: "📦", amount: "50 €", description: "finance un colis alimentaire pour une famille" },
];

const REASSURANCES = [
  { icon: <ShieldCheck size={18} />, text: "Paiement 100% sécurisé via PayPal" },
  { icon: <Users size={18} />,       text: "Association loi 1901, bénévoles uniquement" },
  { icon: <HandHeart size={18} />,   text: "Chaque euro va directement au terrain" },
  { icon: <Truck size={18} />,       text: "+12 maraudes grâce à vos dons" },
];

export default function FaireUnDonPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-[#839678] text-white py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-[-60px] left-[-60px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-40px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
            <Heart size={26} className="text-white fill-white" />
          </div>
          <h1 className="text-white font-[family-name:var(--font-source-serif)] font-light text-4xl md:text-5xl">
            Faire un don
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Nous sommes toutes bénévoles. Votre don nous permet de continuer nos actions sur le terrain.
          </p>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div className="bg-[#F6F6F6]">
        {/* Bouton retour flottant, séparé du hero */}
        <div className="container-site pt-8 pb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#839678] hover:bg-[#6b7d63] px-4 py-2 rounded-full transition-colors shadow-sm"
          >
            <ArrowLeft size={14} />
            Retour à l&apos;accueil
          </Link>
        </div>

        <div className="container-site py-8 pb-16 flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* ── Gauche : impact ── */}
            <div className="flex flex-col gap-5">
              <div>
                <span className="section-label">Impact de votre don</span>
                <h2 className="mt-3 font-[family-name:var(--font-source-serif)] text-2xl text-[#1c1c1c] font-light">
                  Votre don, leur quotidien
                </h2>
                <p className="mt-2 text-[#4a4a4a] text-sm leading-relaxed">
                  Chaque montant a un impact concret. Voici des exemples de ce que votre soutien permet.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {IMPACTS.map((item) => (
                  <div key={item.amount} className="flex items-center gap-4 bg-white rounded-[10px] p-4 shadow-sm">
                    <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                    <p className="text-sm text-[#4a4a4a]">
                      <span className="font-semibold text-[#839678]">{item.amount}</span>
                      {" — "}{item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[10px] p-5 shadow-sm flex flex-col gap-3">
                {REASSURANCES.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[#4a4a4a]">
                    <span className="text-[#839678] flex-shrink-0">{r.icon}</span>
                    {r.text}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Droite : CTA ── */}
            <div className="bg-white rounded-2xl shadow-md p-7 flex flex-col gap-6 lg:sticky lg:top-28">
              <div className="text-center">
                <h3 className="font-[family-name:var(--font-source-serif)] text-xl text-[#1c1c1c] font-light">
                  Choisissez votre montant
                </h3>
                <p className="text-xs text-[#8a8a8a] mt-1">Vous serez redirigé vers PayPal, 100% sécurisé.</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["5 €", "10 €", "20 €", "30 €", "50 €", "100 €"].map((m) => (
                  <a
                    key={m}
                    href={PAYPAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center justify-center py-3 rounded-[10px] border-2 border-[#e8e8e8] text-[#4a4a4a] font-semibold text-sm hover:border-[#839678] hover:text-[#839678] hover:bg-[#f0f3ee] transition-all duration-200"
                  >
                    {m}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#e8e8e8]" />
                <span className="text-xs text-[#8a8a8a] font-medium">ou</span>
                <div className="flex-1 h-px bg-[#e8e8e8]" />
              </div>

              <a
                href={PAYPAL_LINK}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-primary w-full justify-center py-3.5 text-base"
              >
                <Heart size={17} className="fill-white" />
                Je fais un don libre 🙏
              </a>

              <p className="text-center text-xs text-[#8a8a8a] leading-relaxed">
                Redirection vers PayPal sécurisé.<br />
                Reçu fiscal disponible sur demande.
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
