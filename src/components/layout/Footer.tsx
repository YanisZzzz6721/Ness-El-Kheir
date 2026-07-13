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
    <div className="bg-[#F6F6F6] pt-10 md:pt-16">
      <footer className="relative bg-[#1c1c1c] text-white rounded-t-[32px] md:rounded-t-[40px]">

        <div className="container-site pt-14 pb-10 md:pt-20 md:pb-12 flex flex-col gap-12 md:gap-14">

          {/* Brand — seul en haut, bien espacé du bord */}
          <div className="flex flex-col gap-4 max-w-sm">
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
            <p className="text-sm text-white/55 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Colonnes — chacune son sujet, rien ne se mélange */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">

            <div className="flex flex-col gap-4">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-white/35">
                Sommaire
              </h5>
              <ul className="flex flex-col gap-3">
                {LINKS_NAV.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-white/35">
                Légal
              </h5>
              <ul className="flex flex-col gap-3">
                {LINKS_LEGAL.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-white/35">
                Nous contacter
              </h5>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <MessageCircle size={16} className="text-[#a3b396] flex-shrink-0" />
                  WhatsApp
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Instagram size={16} className="text-[#a3b396] flex-shrink-0" />
                  Instagram
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors break-all"
                >
                  <Mail size={16} className="text-[#a3b396] flex-shrink-0" />
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/10">
          <div className="container-site flex items-center justify-center py-6 text-xs text-white/35 text-center">
            <span>© {year} {content.hero_titre ?? "Ness el Kheir"} — Association loi 1901</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
