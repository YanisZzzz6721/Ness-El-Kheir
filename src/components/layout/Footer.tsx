import Link from "next/link";
import { Heart, MessageCircle, Mail, Instagram } from "lucide-react";

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
  { label: "Mentions légales",              href: "/mentions-legales" },
  { label: "Politique de confidentialité",  href: "/confidentialite"  },
];

export default function Footer({ content }: Props) {
  const year = new Date().getFullYear();

  const instagramHandle = content.instagram_handle ?? "@nesselkheir";
  const telephone       = content.telephone ?? "06 00 00 00 00";
  const email           = content.email ?? "contact@nesselkheir.fr";
  const whatsappNumber  = telephone.replace(/\s/g, "").replace(/^0/, "33");
  const instagramUrl    = `https://instagram.com/${instagramHandle.replace("@", "")}`;
  const description     = content.footer_description ?? content.apropos_texte
    ?? "Une association féminine engagée dans des actions humanitaires envers les personnes en situation de précarité.";

  const socials = [
    { href: instagramUrl,                       icon: Instagram,     label: "Instagram" },
    { href: `https://wa.me/${whatsappNumber}`,   icon: MessageCircle, label: "WhatsApp"  },
    { href: `mailto:${email}`,                   icon: Mail,          label: "Email"     },
  ];

  return (
    <footer className="relative bg-[#1c1c1c] text-white rounded-t-[32px] md:rounded-t-[48px] shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.25)]">

      {/* Petit accent central — adoucit la coupure, marque le seuil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1.5 rounded-full bg-[#839678]" aria-hidden="true" />

      {/* ── Contenu principal ── */}
      <div className="container-site pt-16 pb-12 md:pt-20 md:pb-14 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#839678] flex items-center justify-center flex-shrink-0">
              <Heart size={15} className="text-white fill-white" />
            </div>
            <div className="leading-tight">
              <span className="block font-[family-name:var(--font-source-serif)] text-lg font-semibold leading-none">
                {content.hero_titre ?? "Ness el Kheir"}
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-[#a3b396] font-semibold mt-1">
                {content.hero_subtitle ?? "association"}
              </span>
            </div>
          </div>
          <p className="text-sm text-white/55 leading-relaxed max-w-xs">
            {description}
          </p>

          {/* Icônes réseaux sociaux */}
          <div className="flex items-center gap-3 mt-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#839678] hover:border-[#839678] hover:text-white transition-all duration-200"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-5">
          <h5 className="text-xs font-semibold uppercase tracking-widest text-white/35">
            Navigation
          </h5>
          <ul className="flex flex-col gap-3">
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

        {/* Contact */}
        <div className="flex flex-col gap-5">
          <h5 className="text-xs font-semibold uppercase tracking-widest text-white/35">
            Nous contacter
          </h5>
          <div className="flex flex-col gap-3.5">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
            >
              <MessageCircle size={15} className="flex-shrink-0" />
              WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Instagram size={15} className="flex-shrink-0" />
              {instagramHandle}
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors break-all"
            >
              <Mail size={15} className="flex-shrink-0" />
              {email}
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar — copyright + liens légaux ── */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col md:flex-row items-center justify-between py-6 gap-4 text-xs text-white/35">
          <span className="text-center md:text-left">
            © {year} {content.hero_titre ?? "Ness el Kheir"} — Tous droits réservés
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LINKS_LEGAL.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white/70 transition-colors">
                {link.label}
              </Link>
            ))}
            <span className="text-white/20">·</span>
            <span>Association loi 1901</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
