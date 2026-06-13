import { createClient } from "@/lib/supabase/server";
import { Megaphone, ImageIcon, MessageSquare, HelpCircle, FileText, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [
    { count: nbAnnonces },
    { count: nbPhotos },
    { count: nbMessages },
    { count: nbFaq },
  ] = await Promise.all([
    supabase.from("annonces").select("*", { count: "exact", head: true }),
    supabase.from("galerie").select("*",  { count: "exact", head: true }),
    supabase.from("messages").select("*", { count: "exact", head: true }).eq("lu", false),
    supabase.from("faq").select("*",      { count: "exact", head: true }),
  ]);

  const stats = [
    {
      href:  "/admin/annonces",
      icon:  Megaphone,
      label: "Annonces",
      value: nbAnnonces ?? 0,
      desc:  "publiées",
      bg:    "bg-[#f0f3ee]",
      color: "text-[#839678]",
      border:"border-[#839678]/20",
    },
    {
      href:  "/admin/galerie",
      icon:  ImageIcon,
      label: "Photos",
      value: nbPhotos ?? 0,
      desc:  "dans la galerie",
      bg:    "bg-amber-50",
      color: "text-amber-600",
      border:"border-amber-200",
    },
    {
      href:  "/admin/messages",
      icon:  MessageSquare,
      label: "Messages",
      value: nbMessages ?? 0,
      desc:  "non lus",
      bg:    "bg-blue-50",
      color: "text-blue-600",
      border:"border-blue-200",
    },
    {
      href:  "/admin/faq",
      icon:  HelpCircle,
      label: "FAQ",
      value: nbFaq ?? 0,
      desc:  "questions",
      bg:    "bg-pink-50",
      color: "text-pink-600",
      border:"border-pink-200",
    },
  ];

  const shortcuts = [
    {
      href:  "/admin/annonces",
      emoji: "➕",
      label: "Nouvelle annonce",
      desc:  "Publier une actualité",
      color: "hover:border-[#839678]",
    },
    {
      href:  "/admin/galerie",
      emoji: "📸",
      label: "Ajouter des photos",
      desc:  "Mettre à jour la galerie",
      color: "hover:border-amber-400",
    },
    {
      href:  "/admin/contenu",
      emoji: "✏️",
      label: "Modifier les textes",
      desc:  "Titre, description, infos…",
      color: "hover:border-blue-400",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 md:gap-8 pb-10">

      {/* ── Bandeau de bienvenue ── */}
      <div className="bg-[#839678] rounded-2xl p-5 md:p-7 text-white relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Tableau de bord</p>
          <h1 className="font-[family-name:var(--font-source-serif)] text-2xl md:text-3xl font-light">
            Bonjour 👋
          </h1>
          <p className="text-white/75 text-sm mt-1.5">
            Bienvenue dans votre espace administrateur.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <TrendingUp size={14} className="text-white/60" />
            <span className="text-xs text-white/60">Tout se passe bien sur le site.</span>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#8a8a8a] mb-3 px-0.5">
          Vue d&apos;ensemble
        </h2>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {stats.map(({ href, icon: Icon, label, value, desc, bg, color, border }) => (
            <Link
              key={href}
              href={href}
              className={`bg-white rounded-xl border ${border} p-4 md:p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200 group`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center ${color}`}>
                  <Icon size={17} />
                </div>
                <ArrowRight size={14} className="text-[#c8c8c8] group-hover:text-[#839678] group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-[#1c1c1c] leading-none">{value}</p>
                <p className="text-[11px] text-[#8a8a8a] mt-0.5">{desc}</p>
              </div>
              <p className="text-xs font-semibold text-[#4a4a4a]">{label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Actions rapides ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#8a8a8a] mb-3 px-0.5">
          Actions rapides
        </h2>
        <div className="flex flex-col gap-2.5">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`bg-white rounded-xl border border-[#e8e8e8] ${s.color} p-4 flex items-center gap-4 hover:shadow-sm transition-all duration-200 group`}
            >
              <span className="text-2xl flex-shrink-0">{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1c1c1c] text-sm">{s.label}</p>
                <p className="text-xs text-[#8a8a8a] mt-0.5 truncate">{s.desc}</p>
              </div>
              <ArrowRight size={15} className="text-[#c8c8c8] group-hover:text-[#839678] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── Liens utiles ── */}
      <div className="bg-white rounded-xl border border-[#e8e8e8] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText size={15} className="text-[#839678]" />
          <span className="text-sm text-[#4a4a4a] font-medium">Modifier tous les textes du site</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/admin/contenu"
            className="text-xs font-semibold text-[#839678] bg-[#f0f3ee] hover:bg-[#839678] hover:text-white px-3 py-1.5 rounded-full transition-all"
          >
            Textes →
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold text-[#4a4a4a] bg-[#F6F6F6] hover:bg-[#e8e8e8] px-3 py-1.5 rounded-full transition-all"
          >
            Voir le site ↗
          </Link>
        </div>
      </div>

    </div>
  );
}
