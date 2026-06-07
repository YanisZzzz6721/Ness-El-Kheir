import Link from "next/link";
import { Heart, ChevronDown } from "lucide-react";

const TAGS = ["Collectes", "Maraudes", "Aides aux étudiants", "Préparation de colis"];

export default function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-[#839678] min-h-[92vh] flex items-center"
    >
      {/* Cercles décoratifs */}
      <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[60px] right-[10%] w-[260px] h-[260px] rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-[30%] left-[-60px] w-[200px] h-[200px] rounded-full bg-white/5 pointer-events-none" />

      <div className="container-site relative z-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── Texte gauche ── */}
        <div className="flex flex-col gap-7">

          {/* Tags activités */}
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-white/15 text-white border border-white/20 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Titre */}
          <div>
            <h1 className="text-white font-[family-name:var(--font-source-serif)] font-light leading-[1.05]">
              Nass<br />el Kheir
            </h1>
            <p className="mt-2 text-white/60 text-sm font-semibold tracking-[0.2em] uppercase">
              association
            </p>
          </div>

          {/* Description */}
          <p className="text-white/85 text-base leading-relaxed max-w-md">
            <strong className="font-semibold text-white">Rejoignez Nass el Kheir</strong>,
            une association féminine destinée à mener des actions humanitaires envers les
            personnes en situation de précarité, les familles en difficulté, les enfants
            et les étudiants.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/faire-un-don"
              className="inline-flex items-center gap-2 bg-white text-[#839678] font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/90 transition-all duration-200 hover:-translate-y-px hover:shadow-lg"
            >
              <Heart size={15} className="fill-[#839678] text-[#839678]" />
              Je fais un don
            </Link>
            <a
              href="https://docs.google.com/forms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent text-white font-semibold text-sm px-7 py-3.5 rounded-full border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-200 hover:-translate-y-px"
            >
              Je deviens bénévole 🙋‍♀️
            </a>
          </div>
        </div>

        {/* ── Illustration droite ── */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-[380px] h-[380px]">
            {/* Cercle principal */}
            <div className="absolute inset-0 rounded-full bg-white/10 border border-white/20" />
            {/* Cercle intérieur */}
            <div className="absolute inset-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-white text-center px-8">
                <Heart size={48} className="fill-white/30 text-white" strokeWidth={1} />
                <p className="font-[family-name:var(--font-source-serif)] text-2xl font-light leading-tight">
                  Ensemble,<br />nous pouvons<br />tout changer
                </p>
              </div>
            </div>
            {/* Badges flottants */}
            <div className="absolute -top-4 left-8 bg-white rounded-[10px] shadow-lg px-4 py-2.5 text-sm font-semibold text-[#839678]">
              +80 bénévoles 💚
            </div>
            <div className="absolute -bottom-4 right-8 bg-white rounded-[10px] shadow-lg px-4 py-2.5 text-sm font-semibold text-[#839678]">
              12 maraudes ✓
            </div>
          </div>
        </div>
      </div>

      {/* ── Shape divider ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* ── Scroll hint ── */}
      <a
        href="#a-propos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
