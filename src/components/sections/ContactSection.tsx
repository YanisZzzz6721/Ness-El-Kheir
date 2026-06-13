"use client";

import { useState } from "react";
import { Send, CheckCircle2, Instagram, Phone } from "lucide-react";
import { submitContact } from "@/app/actions/contact";

interface Props { content: Record<string, string> }
type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection({ content }: Props) {
  const [form, setForm] = useState({ nom: "", telephone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await submitContact(form);
    if (result.success) {
      setStatus("success");
      setForm({ nom: "", telephone: "", message: "" });
    } else {
      setErrorMsg(result.error ?? "Erreur inconnue.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section bg-[#839678]">
      <div className="container-site">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          <div className="flex flex-col gap-6 text-white">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/15 text-white px-3 py-1.5 rounded-full mb-4">Contact</span>
              <h2 className="text-white font-[family-name:var(--font-source-serif)] font-light">
                {content.contact_titre ?? "Vous avez un besoin particulier ?"}
              </h2>
            </div>
            <p className="text-white/80 leading-relaxed">
              {content.contact_texte ?? "Notre équipe vous répond dans les plus brefs délais."}
            </p>
            <div className="flex flex-col gap-3 mt-2">
              <a href={`https://instagram.com/${(content.instagram_handle ?? "@nasselkheir").replace("@","")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0"><Instagram size={16} /></div>
                <span className="text-sm font-medium">{content.instagram_handle ?? "@nasselkheir"}</span>
              </a>
              <a href={`tel:${(content.telephone ?? "0600000000").replace(/\s/g,"")}`} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0"><Phone size={16} /></div>
                <span className="text-sm font-medium">{content.telephone ?? "06 00 00 00 00"}</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-[16px] shadow-xl p-7 md:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle2 size={48} className="text-[#839678]" />
                <h3 className="text-[#1c1c1c] text-xl font-semibold">Message envoyé !</h3>
                <p className="text-[#4a4a4a] text-sm">Nous vous répondrons très prochainement.</p>
                <button onClick={() => setStatus("idle")} className="mt-2 btn-outline text-sm">Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#4a4a4a] uppercase tracking-wide">Votre nom et prénom *</label>
                  <input type="text" name="nom" value={form.nom} onChange={handleChange} required placeholder="Fatima Dupont" className="form-input" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#4a4a4a] uppercase tracking-wide">Votre numéro de téléphone *</label>
                  <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} required placeholder="06 00 00 00 00" className="form-input" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#4a4a4a] uppercase tracking-wide">Votre question / besoin *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Décrivez votre demande…" className="form-input resize-none" />
                </div>
                {status === "error" && <p className="text-red-500 text-sm">{errorMsg}</p>}
                <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center mt-1 disabled:opacity-60">
                  {status === "loading" ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={15} />}
                  {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
