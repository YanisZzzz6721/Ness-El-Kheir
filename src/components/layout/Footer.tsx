import Link from "next/link";
import { Heart, MessageCircle, Mail, Instagram, ArrowUpRight } from "lucide-react";

interface Props { content: Record<string, string> }

const LINKS_NAV = [
  { label: "Accueil",   href: "#accueil"   },
  { label: "À propos",  href: "#a-propos"  },
  { label: "Galerie",   href: "#galerie"   },
  { label: "Annonces",  href: "#annonces"  },
  { label: "Contact",   href: "#contact"   },
  { label: "FAQ",       href: "#faq"       },
];

const LINKS_LEGAL = [
  { label: "Mentions légales",             href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite"  },
];

export default function Footer({ content }: Props) {
  const year = new Date().getFullYear();

  const instagramHandle = content.instagram_handle ?? "@nesselkheir";
  const telephone       = content.telephone ?? "06 00 00 00 00";
  const email           = content.email ?? "contact@nesselkheir.fr";
  const whatsappNumber  = telephone.replace(/\s/g, "").replace(/^0/, "33");
  const instagramUrl    = `https://instagram.com/${instagramHandle.replace("@", "")}`;
  const description     = content.footer_description ?? content.apropos_texte
    ?? "Une association engagée dans des actions solidaires envers les personnes en situation de précarité.";

  return (
    <footer className="relative bg-[#1c1c1c] text-white rounded-t-[32px] md:rounded-t-[48px] shadow-[0_-16px_48px_-20px_rgba(0,0,0,0.3)] mt-4">

      <div className="container-site pt-16 pb-14 md:pt-24 md:pb-16 flex flex-col gap-16 md:gap-14">

        {/* ── Rangée principale ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-12 md:gap-16">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#839678] flex items-center justify-center flex-shrink-0">
                <Heart size={16} className="text-white fill-white" />
              </div>
              <div className="leading-tight">
                <span className="block font-[family-name:var(--font-source-serif)] text-xl font-semibold leading-none">
                  {content.hero_titre ?? "Ness el Kheir"}
                </span>
                <span className="block text-[10px] tracking-widest uppercase text-[#a3b396] font-semibold mt-1.5">
                  {content.hero_subtitle ?? "association"}
                </span>
              </div>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-sm">
              {description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <h5 className="text-xs font-semibold uppercase tracking-widest text-white/35">
              Navigation
            </h5>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-3.5">
              {LINKS_NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — card unique, pas de doublon avec les icônes */}
          <div className="flex flex-col gap-5">
            <h5 className="text-xs font-semibold uppercase tracking-widest text-white/35">
              Nous contacter
            </h5>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 bg-white/[0.06] hover:bg-[#839678] border border-white/10 hover:border-[#839678] rounded-xl px-4 py-3.5 transition-all duration-200 group"
            >
              <span className="flex items-center gap-2.5 text-sm font-medium text-white">
                <MessageCircle size={16} className="text-[#a3b396] group-hover:text-white transition-colors" />
                Discuter sur WhatsApp
              </span>
              <ArrowUpRight size={15} className="text-white/40 group-hover:text-white transition-colors" />
            </a>
            <a
              href={`mailto:${email}`}
              className="text-sm text-white/55 hover:text-white transition-colors break-all"
            >
              {email}
            </a>
          </div>
        </div>

        {/* ── Réseaux sociaux — ligne dédiée, aérée ── */}
        <div className="flex items-center gap-4 border-t border-white/[0.08] pt-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/35 mr-1">
            Suivez-nous
          </span>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#839678] hover:border-[#839678] hover:text-white transition-all duration-200"
          >
            <Instagram size={17} />
          </a>
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#839678] hover:border-[#839678] hover:text-white transition-all duration-200"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col-reverse md:flex-row items-center justify-between py-6 gap-3 text-xs text-white/35">
          <span>© {year} {content.hero_titre ?? "Ness el Kheir"} — Association loi 1901</span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LINKS_LEGAL.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white/70 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
