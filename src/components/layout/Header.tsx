"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Accueil",    href: "#accueil"   },
  { label: "À propos",   href: "#a-propos"  },
  { label: "Rejoindre",  href: "#rejoindre" },
  { label: "Galerie",    href: "#galerie"   },
  { label: "Annonces",   href: "#annonces"  },
  { label: "Contact",    href: "#contact"   },
  { label: "FAQ",        href: "#faq"       },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full">

      {/* ── Main Nav ── */}
      <nav
        className={cn(
          "bg-white transition-shadow duration-300",
          scrolled ? "shadow-md" : "shadow-sm"
        )}
      >
        <div className="container-site flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={closeMenu}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
              <Image src="/logo.png" alt="Logo Nass el Kheir" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <span className="block font-[family-name:var(--font-source-serif)] text-lg font-semibold text-[#1c1c1c] leading-none">
                Nass el Kheir
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-[#839678] font-semibold">
                association
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[#4a4a4a] rounded-lg hover:text-[#839678] hover:bg-[#f0f3ee] transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/faire-un-don"
              className="ml-3 btn-primary text-sm py-2 px-5"
            >
              <Heart size={14} className="fill-white" />
              Faire un don
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f0f3ee] transition-colors text-[#4a4a4a]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-[#e8e8e8]",
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container-site flex flex-col py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="px-4 py-3 text-sm font-medium text-[#4a4a4a] rounded-[10px] hover:text-[#839678] hover:bg-[#f0f3ee] transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/faire-un-don"
              onClick={closeMenu}
              className="mt-2 btn-primary text-sm justify-center"
            >
              <Heart size={14} className="fill-white" />
              Faire un don
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
