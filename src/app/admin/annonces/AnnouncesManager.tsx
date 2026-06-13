"use client";

import { useState } from "react";
import { createAnnonce, updateAnnonce, deleteAnnonce } from "@/app/actions/admin";
import { Trash2, Pencil, Plus, X, Check } from "lucide-react";
import type { Annonce } from "@/types";

export default function AnnouncesManager({ annonces: initial }: { annonces: Annonce[] }) {
  const [annonces, setAnnonces] = useState(initial);
  const [form, setForm] = useState({ titre: "", contenu: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ titre: "", contenu: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const toast = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const handleCreate = async () => {
    if (!form.titre.trim() || !form.contenu.trim()) return;
    setLoading(true);
    const res = await createAnnonce(form);
    if (res.success) {
      toast("✅ Annonce publiée !");
      setForm({ titre: "", contenu: "" });
      window.location.reload();
    } else toast("❌ Erreur : " + res.error);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette annonce ?")) return;
    const res = await deleteAnnonce(id);
    if (res.success) { setAnnonces(p => p.filter(a => a.id !== id)); toast("✅ Supprimée."); }
    else toast("❌ " + res.error);
  };

  const startEdit = (a: Annonce) => { setEditId(a.id); setEditForm({ titre: a.titre, contenu: a.contenu }); };

  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    const res = await updateAnnonce(editId, editForm);
    if (res.success) {
      setAnnonces(p => p.map(a => a.id === editId ? { ...a, ...editForm } : a));
      setEditId(null);
      toast("✅ Modifiée !");
    } else toast("❌ " + res.error);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {msg && <div className="bg-[#f0f3ee] text-[#839678] px-4 py-3 rounded-[10px] text-sm font-medium">{msg}</div>}

      {/* Formulaire création */}
      <div className="bg-white rounded-[16px] shadow-sm p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-[#1c1c1c] flex items-center gap-2"><Plus size={18} className="text-[#839678]" /> Nouvelle annonce</h2>
        <input value={form.titre} onChange={e => setForm(p => ({ ...p, titre: e.target.value }))} placeholder="Titre de l'annonce" className="form-input" />
        <textarea value={form.contenu} onChange={e => setForm(p => ({ ...p, contenu: e.target.value }))} placeholder="Contenu de l'annonce…" rows={4} className="form-input resize-none" />
        <button onClick={handleCreate} disabled={loading || !form.titre || !form.contenu} className="btn-primary self-start disabled:opacity-50">
          {loading ? "Publication…" : "Publier l'annonce"}
        </button>
      </div>

      {/* Liste */}
      <div className="flex flex-col gap-3">
        {annonces.length === 0 && <p className="text-[#8a8a8a] text-sm text-center py-8">Aucune annonce pour le moment.</p>}
        {annonces.map((a) => (
          <div key={a.id} className="bg-white rounded-[10px] shadow-sm p-5">
            {editId === a.id ? (
              <div className="flex flex-col gap-3">
                <input value={editForm.titre} onChange={e => setEditForm(p => ({ ...p, titre: e.target.value }))} className="form-input font-semibold" />
                <textarea value={editForm.contenu} onChange={e => setEditForm(p => ({ ...p, contenu: e.target.value }))} rows={3} className="form-input resize-none" />
                <div className="flex gap-2">
                  <button onClick={handleUpdate} disabled={loading} className="btn-primary text-sm py-2 px-4"><Check size={14} /> Enregistrer</button>
                  <button onClick={() => setEditId(null)} className="btn-outline text-sm py-2 px-4"><X size={14} /> Annuler</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1c1c1c]">{a.titre}</h3>
                  <p className="text-sm text-[#4a4a4a] mt-1 leading-relaxed">{a.contenu}</p>
                  <p className="text-xs text-[#8a8a8a] mt-2">{new Date(a.created_at).toLocaleDateString("fr-FR")}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(a)} className="p-2 rounded-[10px] hover:bg-[#f0f3ee] text-[#839678] transition-colors"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(a.id)} className="p-2 rounded-[10px] hover:bg-red-50 text-red-400 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
