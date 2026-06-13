"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Heart, LayoutDashboard, Image, Megaphone, HelpCircle, FileText, MessageSquare, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NAV = [
  { href: "/admin",          icon: LayoutDashboard, label: "Dashboard"  },
  { href: "/admin/annonces", icon: Megaphone,        label: "Annonces"   },
  { href: "/admin/galerie",  icon: Image,            label: "Galerie"    },
  { href: "/admin/contenu",  icon: FileText,         label: "Textes"     },
  { href: "/admin/faq",      icon: HelpCircle,       label: "FAQ"        },
  { href: "/admin/messages", icon: MessageSquare,    label: "Messages"   },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-[#e8e8e8]">
        <div className="w-8 h-8 rounded-full bg-[#839678] flex items-center justify-center flex-shrink-0">
          <Heart size={14} className="text-white fill-white" />
        </div>
        <div className="leading-tight">
          <span className="block font-[family-name:var(--font-source-serif)] text-base font-semibold text-[#1c1c1c]">Nass el Kheir</span>
          <span className="block text-[9px] tracking-widest uppercase text-[#839678] font-semibold">admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {NAV.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-150",
              isActive(href)
                ? "bg-[#839678] text-white shadow-sm"
                : "text-[#4a4a4a] hover:bg-[#f0f3ee] hover:text-[#839678]"
            )}
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[#e8e8e8]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-[#4a4a4a] hover:bg-red-50 hover:text-red-500 transition-all duration-150"
        >
          <LogOut size={17} />
          Se déconnecter
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-[#e8e8e8] min-h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#e8e8e8] flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#839678] flex items-center justify-center">
            <Heart size={12} className="text-white fill-white" />
          </div>
          <span className="font-semibold text-sm text-[#1c1c1c]">Admin</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg hover:bg-[#f0f3ee]">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white pt-14" onClick={(e) => e.stopPropagation()}>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
