"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Accueil",   href: "#accueil"   },
  { label: "À propos",  href: "#a-propos"  },
  { label: "Rejoindre", href: "#rejoindre" },
  { label: "Galerie",   href: "#galerie"   },
  { label: "Annonces",  href: "#annonces"  },
  { label: "Contact",   href: "#contact"   },
  { label: "FAQ",       href: "#faq"       },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <nav className={cn(
          "bg-white transition-all duration-300",
          scrolled ? "shadow-md" : "shadow-sm"
        )}>
          <div className="container-site flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" onClick={close} className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-[#e8e8e8] group-hover:scale-105 transition-transform duration-200">
                <Image src="/logo.png" alt="Logo Ness el Kheir" width={80} height={80} quality={100} className="w-full h-full object-cover" />
              </div>
              <div className="leading-tight">
                <span className="block font-[family-name:var(--font-source-serif)] text-lg font-semibold text-[#1c1c1c] leading-none">
                  Ness el Kheir
                </span>
                <span className="block text-[10px] tracking-widest uppercase text-[#839678] font-semibold">
                  association
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}
                  className="px-3 py-2 text-sm font-medium text-[#4a4a4a] rounded-lg hover:text-[#839678] hover:bg-[#f0f3ee] transition-all duration-150">
                  {link.label}
                </a>
              ))}
              <Link href="/faire-un-don" className="ml-3 btn-primary text-sm py-2 px-5">
                <Heart size={14} className="fill-white" />
                Faire un don
              </Link>
            </div>

            {/* Burger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              className="lg:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-xl bg-[#839678] hover:bg-[#6b7d63] transition-colors duration-200 flex-shrink-0 shadow-sm"
            >
              <span className={cn(
                "block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center",
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              )} />
              <span className={cn(
                "block w-5 h-[2px] bg-white rounded-full transition-all duration-300",
                menuOpen ? "opacity-0 scale-x-0" : ""
              )} />
              <span className={cn(
                "block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center",
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              )} />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay backdrop */}
      <div
        onClick={close}
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer menu mobile */}
      <div className={cn(
        "lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
        menuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e8e8]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e8e8e8]">
              <Image src="/logo.png" alt="Logo" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="font-[family-name:var(--font-source-serif)] font-semibold text-[#1c1c1c] text-sm">Ness el Kheir</span>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f0f3ee] hover:bg-[#e0e8db] text-[#839678] transition-colors"
            aria-label="Fermer"
          >
            <span className="text-lg leading-none font-light">✕</span>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-4">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-[10px] text-sm font-medium text-[#1c1c1c] hover:bg-[#f0f3ee] hover:text-[#839678] transition-all duration-200 mb-1",
                "translate-x-0 opacity-100"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#839678] flex-shrink-0" />
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA don */}
        <div className="p-5 border-t border-[#e8e8e8]">
          <Link
            href="/faire-un-don"
            onClick={close}
            className="btn-primary w-full justify-center py-3.5 text-base"
          >
            <Heart size={16} className="fill-white" />
            Faire un don 🙏
          </Link>
        </div>
      </div>
    </>
  );
}
