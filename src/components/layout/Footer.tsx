import Link from "next/link";
import { Heart, MessageCircle, Mail } from "lucide-react";

const LINKS_NAV = [
  { label: "Accueil",   href: "#accueil"   },
  { label: "À propos",  href: "#a-propos"  },
  { label: "Galerie",   href: "#galerie"   },
  { label: "Annonces",  href: "#annonces"  },
  { label: "Contact",   href: "#contact"   },
  { label: "FAQ",       href: "#faq"       },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1c1c1c] text-white">
      {/* Main footer */}
      <div className="container-site py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#839678] flex items-center justify-center flex-shrink-0">
              <Heart size={14} className="text-white fill-white" />
            </div>
            <div className="leading-tight">
              <span className="block font-[family-name:var(--font-source-serif)] text-lg font-semibold leading-none">
                Nass el Kheir
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-[#a3b396] font-semibold">
                association
              </span>
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            Une association féminine engagée dans des actions humanitaires envers les personnes en situation de précarité.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <h5 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            Navigation
          </h5>
          <ul className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-4">
          <h5 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            Nous contacter
          </h5>
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/33600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
            <a
              href="mailto:contact@nasselkheir.fr"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Mail size={14} />
              contact@nasselkheir.fr
            </a>
          </div>
          <Link
            href="/faire-un-don"
            className="mt-2 btn-outline text-sm justify-center border-[#839678] text-[#a3b396] hover:bg-[#839678] hover:text-white w-full text-center"
          >
            <Heart size={14} />
            Faire un don
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between py-4 gap-2 text-xs text-white/30">
          <span>© {year} Nass el Kheir — Tous droits réservés</span>
          <span>Association loi 1901</span>
        </div>
      </div>
    </footer>
  );
}
