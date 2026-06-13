"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation basique côté client
    if (!form.email.includes("@") || form.password.length < 6) {
      setError("Veuillez renseigner un email et un mot de passe valides.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email:    form.email.trim().toLowerCase(),
      password: form.password,
    });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm mx-auto">

        {/* Logo + titre */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-md border border-[#e8e8e8]">
            <Image src="/logo.png" alt="Logo" width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-source-serif)] text-xl text-[#1c1c1c] font-semibold">
              Ness el Kheir
            </p>
            <p className="text-xs text-[#8a8a8a] tracking-widest uppercase font-semibold mt-0.5">
              Espace administrateur
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col gap-5">
          <h1 className="text-[#1c1c1c] text-lg font-semibold text-center">Connexion</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" autoComplete="on">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-[#4a4a4a] uppercase tracking-wide">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="votre@email.fr"
                className="w-full px-4 py-3 border border-[#e8e8e8] rounded-[10px] text-sm text-[#1c1c1c] placeholder:text-[#8a8a8a] focus:outline-none focus:border-[#839678] focus:ring-2 focus:ring-[#839678]/20 transition-all"
              />
            </div>

            {/* Mot de passe */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-[#4a4a4a] uppercase tracking-wide">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 border border-[#e8e8e8] rounded-[10px] text-sm text-[#1c1c1c] placeholder:text-[#8a8a8a] focus:outline-none focus:border-[#839678] focus:ring-2 focus:ring-[#839678]/20 transition-all [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a8a] hover:text-[#839678] transition-colors p-1"
                  aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div role="alert" className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-[10px] px-4 py-3 text-center">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#839678] hover:bg-[#6b7d63] text-white font-semibold py-3 rounded-[10px] text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
            >
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#8a8a8a] mt-5">
          Accès réservé aux administratrices du site.
        </p>
      </div>
    </div>
  );
}
