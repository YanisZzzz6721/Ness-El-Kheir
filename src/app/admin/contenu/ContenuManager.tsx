"use client";

import { useState } from "react";
import { updateSiteContent } from "@/app/actions/admin";
import { Save, Check } from "lucide-react";

interface Field { id: string; label: string; hint?: string; multiline?: boolean }

const SECTIONS: { title: string; emoji: string; fields: Field[] }[] = [
  {
    title: "Page d'accueil — Hero", emoji: "🏠",
    fields: [
      { id: "hero_titre",       label: "Titre principal",           hint: 'Ex : "Nass el Kheir"' },
      { id: "hero_subtitle",    label: "Sous-titre",                hint: 'Ex : "association"' },
      { id: "hero_description", label: "Description d\'accroche",   hint: "Texte sous le titre", multiline: true },
      { id: "hero_tags",        label: "Tags d\'activités",         hint: "Séparés par des virgules : Collectes,Maraudes,…" },
    ],
  },
  {
    title: "À propos", emoji: "💚",
    fields: [
      { id: "apropos_texte", label: "Texte de présentation", multiline: true },
      { id: "stats_benevoles",    label: "Nombre de bénévoles",     hint: 'Ex : "+80"' },
      { id: "stats_maraudes",     label: "Nombre de maraudes",      hint: 'Ex : "12"' },
      { id: "stats_actions",      label: "Nombre d\'actions sociales", hint: 'Ex : "5"' },
      { id: "stats_partenariats", label: "Nombre de partenariats",  hint: 'Ex : "2"' },
    ],
  },
  {
    title: "Rejoindre", emoji: "🙋‍♀️",
    fields: [
      { id: "rejoindre_texte",  label: "Texte section Rejoindre",  multiline: true },
      { id: "google_form_url",  label: "Lien formulaire bénévole", hint: "URL Google Form" },
    ],
  },
  {
    title: "Contact", emoji: "📞",
    fields: [
      { id: "contact_titre", label: "Titre de la section contact" },
      { id: "contact_texte", label: "Texte de la section contact", multiline: true },
      { id: "instagram_handle", label: "Compte Instagram",  hint: 'Ex : "@nasselkheir"' },
      { id: "telephone",        label: "Numéro de téléphone", hint: 'Ex : "06 00 00 00 00"' },
      { id: "email",            label: "Adresse email" },
    ],
  },
  {
    title: "Section Don", emoji: "🙏",
    fields: [
      { id: "don_titre", label: "Titre section don" },
      { id: "don_texte", label: "Texte section don", multiline: true },
    ],
  },
  {
    title: "Footer", emoji: "📄",
    fields: [
      { id: "footer_description", label: "Description dans le footer", multiline: true },
    ],
  },
];

export default function ContenuManager({ content: initial }: { content: Record<string, string> }) {
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const handleSave = async (id: string) => {
    setLoading(id);
    const res = await updateSiteContent(id, values[id] ?? "");
    if (res.success) { setSaved(p => ({ ...p, [id]: true })); setTimeout(() => setSaved(p => ({ ...p, [id]: false })), 2000); }
    setLoading(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {SECTIONS.map((section) => (
        <div key={section.title} className="bg-white rounded-[16px] shadow-sm p-4 sm:p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-[#1c1c1c] text-base flex items-center gap-2">
            <span>{section.emoji}</span> {section.title}
          </h2>
          {section.fields.map((field) => (
            <div key={field.id} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#4a4a4a] uppercase tracking-wide">{field.label}</label>
              {field.hint && <p className="text-xs text-[#8a8a8a]">{field.hint}</p>}
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-start">
                {field.multiline ? (
                  <textarea
                    value={values[field.id] ?? ""}
                    onChange={e => setValues(p => ({ ...p, [field.id]: e.target.value }))}
                    rows={3}
                    className="form-input resize-none flex-1"
                  />
                ) : (
                  <input
                    type="text"
                    value={values[field.id] ?? ""}
                    onChange={e => setValues(p => ({ ...p, [field.id]: e.target.value }))}
                    className="form-input flex-1"
                  />
                )}
                <button
                  onClick={() => handleSave(field.id)}
                  disabled={loading === field.id}
                  className={`flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[10px] text-sm font-semibold transition-all w-full sm:w-auto ${saved[field.id] ? "bg-green-100 text-green-600" : "bg-[#f0f3ee] text-[#839678] hover:bg-[#839678] hover:text-white"}`}
                >
                  {saved[field.id] ? <Check size={15} /> : <Save size={15} />}
                  {saved[field.id] ? "Sauvegardé !" : "Sauvegarder"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
