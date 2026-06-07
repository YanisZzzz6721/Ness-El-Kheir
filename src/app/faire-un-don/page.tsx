import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ArrowLeft, ShieldCheck, Users, HandHeart, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Faire un don",
  description: "Soutenez Nass el Kheir et aidez-nous à continuer nos actions humanitaires en Île-de-France.",
};

// ─────────────────────────────────────────────────────────────
// 🔧 À REMPLACER dès réception du lien PayPal de la responsable
// ─────────────────────────────────────────────────────────────
const PAYPAL_LINK = "https://www.paypal.com/paypalme/AREMPLACER";
// ─────────────────────────────────────────────────────────────

const IMPACTS = [
  { emoji: "🍱", amount: "10 €",  description: "finance un repas chaud pour une personne lors d'une maraude" },
  { emoji: "🧴", amount: "20 €",  description: "permet de constituer un kit d'hygiène complet" },
  { emoji: "👕", amount: "30 €",  description: "contribue à une collecte de vêtements pour une famille" },
  { emoji: "📦", amount: "50 €",  description: "finance un colis alimentaire complet pour une famille" },
];

const REASSURANCES = [
  { icon: <ShieldCheck size={20} />, text: "Paiement 100% sécurisé via PayPal" },
  { icon: <Users size={20} />,       text: "Association loi 1901, bénévoles uniquement" },
  { icon: <HandHeart size={20} />,   text: "Chaque euro va directement au terrain" },
  { icon: <Truck size={20} />,       text: "+12 maraudes organisées grâce à vos dons" },
];

export default function FaireUnDonPage() {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">

      {/* ── Hero ── */}
      <div className="bg-[#839678] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-[-60px] left-[-60px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-40px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center">
            <Heart size={30} className="text-white fill-white" />
          </div>
          <h1 className="text-white font-[family-name:var(--font-source-serif)] font-light text-4xl md:text-5xl">
            Faire un don
          </h1>
          <p className="text-white/80 text-base leading-relaxed max-w-lg">
            Nous sommes toutes bénévoles. Votre don nous permet de continuer nos actions
            sur le terrain et d&apos;aider encore plus de personnes.
          </p>
        </div>
      </div>

      <div className="container-site py-14 flex flex-col gap-12">

        {/* Retour */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#8a8a8a] hover:text-[#839678] transition-colors w-fit"
        >
          <ArrowLeft size={15} />
          Retour à l&apos;accueil
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Gauche : impact ── */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="section-label">Impact de votre don</span>
              <h2 className="mt-3 text-[#1c1c1c] text-2xl font-[family-name:var(--font-source-serif)] font-light">
                Votre don, leur quotidien
              </h2>
              <p className="mt-3 text-[#4a4a4a] text-sm leading-relaxed">
                Chaque montant, petit ou grand, a un impact concret sur les personnes que
                nous accompagnons. Voici des exemples de ce que votre soutien permet.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {IMPACTS.map((item) => (
                <div
                  key={item.amount}
                  className="flex items-center gap-4 bg-white rounded-[10px] p-4 shadow-sm"
                >
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <div>
                    <span className="font-semibold text-[#839678]">{item.amount}</span>
                    <span className="text-[#4a4a4a] text-sm"> — {item.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Réassurances */}
            <div className="bg-white rounded-[10px] p-6 shadow-sm flex flex-col gap-3">
              {REASSURANCES.map((r, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-[#4a4a4a]">
                  <span className="text-[#839678] flex-shrink-0">{r.icon}</span>
                  {r.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Droite : CTA don ── */}
          <div className="bg-white rounded-[16px] shadow-md p-8 flex flex-col gap-8 sticky top-24">

            <div className="text-center flex flex-col items-center gap-3">
              <h3 className="font-[family-name:var(--font-source-serif)] text-2xl text-[#1c1c1c] font-light">
                Choisissez votre montant
              </h3>
              <p className="text-sm text-[#8a8a8a]">Vous serez redirigée vers PayPal, 100% sécurisé.</p>
            </div>

            {/* Montants suggérés */}
            <div className="grid grid-cols-3 gap-3">
              {["5 €", "10 €", "20 €", "30 €", "50 €", "100 €"].map((m) => (
                <a
                  key={m}
                  href={PAYPAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-3 rounded-[10px] border-2 border-[#e8e8e8] text-[#4a4a4a] font-semibold text-sm hover:border-[#839678] hover:text-[#839678] hover:bg-[#f0f3ee] transition-all duration-200"
                >
                  {m}
                </a>
              ))}
            </div>

            {/* Séparateur */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#e8e8e8]" />
              <span className="text-xs text-[#8a8a8a] font-medium">ou</span>
              <div className="flex-1 h-px bg-[#e8e8e8]" />
            </div>

            {/* Bouton principal */}
            <a
              href={PAYPAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-base py-4"
            >
              <Heart size={18} className="fill-white" />
              Je fais un don libre 🙏
            </a>

            <p className="text-center text-xs text-[#8a8a8a]">
              Vous serez redirigée vers PayPal.<br />
              Un reçu fiscal peut être fourni sur demande.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
