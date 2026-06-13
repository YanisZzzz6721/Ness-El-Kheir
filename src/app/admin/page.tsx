import { createClient } from "@/lib/supabase/server";
import { Megaphone, Image, MessageSquare, HelpCircle, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [{ count: nbAnnonces }, { count: nbPhotos }, { count: nbMessages }, { count: nbFaq }] = await Promise.all([
    supabase.from("annonces").select("*", { count: "exact", head: true }),
    supabase.from("galerie").select("*",  { count: "exact", head: true }),
    supabase.from("messages").select("*", { count: "exact", head: true }).eq("lu", false),
    supabase.from("faq").select("*",      { count: "exact", head: true }),
  ]);

  const cards = [
    { href: "/admin/annonces", icon: Megaphone,     label: "Annonces",         value: nbAnnonces ?? 0, desc: "publiées",           color: "bg-[#f0f3ee] text-[#839678]" },
    { href: "/admin/galerie",  icon: Image,          label: "Photos",           value: nbPhotos   ?? 0, desc: "dans la galerie",    color: "bg-[#fef3e2] text-[#c08a2a]" },
    { href: "/admin/messages", icon: MessageSquare,  label: "Messages",         value: nbMessages ?? 0, desc: "non lus",            color: "bg-[#eef6ff] text-[#3b82c4]" },
    { href: "/admin/faq",      icon: HelpCircle,     label: "FAQ",              value: nbFaq      ?? 0, desc: "questions",          color: "bg-[#fce7f3] text-[#be185d]" },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div>
        <h1 className="font-[family-name:var(--font-source-serif)] text-3xl text-[#1c1c1c] font-light">Bonjour 👋</h1>
        <p className="text-[#8a8a8a] text-sm mt-1">Voici un résumé de votre site.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ href, icon: Icon, label, value, desc, color }) => (
          <Link key={href} href={href} className="bg-white rounded-[10px] shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1c1c1c]">{value}</p>
              <p className="text-xs text-[#8a8a8a]">{desc}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#4a4a4a]">{label}</span>
              <ArrowRight size={14} className="text-[#8a8a8a] group-hover:text-[#839678] transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Raccourcis */}
      <div>
        <h2 className="text-base font-semibold text-[#1c1c1c] mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: "/admin/annonces", label: "➕ Nouvelle annonce",  desc: "Publier une actualité" },
            { href: "/admin/galerie",  label: "📸 Ajouter des photos", desc: "Mettre à jour la galerie" },
            { href: "/admin/contenu",  label: "✏️ Modifier les textes", desc: "Titre, description, infos…" },
          ].map((a) => (
            <Link key={a.href} href={a.href} className="bg-white rounded-[10px] shadow-sm p-4 hover:shadow-md hover:border-[#839678] border border-transparent transition-all group">
              <p className="font-semibold text-[#1c1c1c] text-sm">{a.label}</p>
              <p className="text-xs text-[#8a8a8a] mt-0.5">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Liens rapides */}
      <div className="flex flex-wrap gap-3">
        <Link href="/admin/contenu" className="flex items-center gap-1.5 text-sm text-[#839678] hover:underline"><FileText size={14} /> Modifier les textes du site</Link>
        <span className="text-[#e8e8e8]">|</span>
        <Link href="/" target="_blank" className="flex items-center gap-1.5 text-sm text-[#839678] hover:underline"><ArrowRight size={14} /> Voir le site public</Link>
      </div>
    </div>
  );
}
