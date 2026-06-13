"use client";

import { useState } from "react";
import { createFaq, updateFaq, deleteFaq } from "@/app/actions/admin";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";

interface FaqItem { id: string; question: string; reponse: string; ordre: number }

export default function FaqManager({ items: initial }: { items: FaqItem[] }) {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState({ question: "", reponse: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ question: "", reponse: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const toast = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const handleCreate = async () => {
    if (!form.question.trim() || !form.reponse.trim()) return;
    setLoading(true);
    const res = await createFaq({ ...form, ordre: items.length + 1 });
    if (res.success) { toast("✅ Question ajoutée !"); setForm({ question: "", reponse: "" }); window.location.reload(); }
    else toast("❌ " + res.error);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette question ?")) return;
    const res = await deleteFaq(id);
    if (res.success) { setItems(p => p.filter(i => i.id !== id)); toast("✅ Supprimée."); }
    else toast("❌ " + res.error);
  };

  const startEdit = (item: FaqItem) => { setEditId(item.id); setEditForm({ question: item.question, reponse: item.reponse }); };

  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    const res = await updateFaq(editId, editForm);
    if (res.success) { setItems(p => p.map(i => i.id === editId ? { ...i, ...editForm } : i)); setEditId(null); toast("✅ Modifiée !"); }
    else toast("❌ " + res.error);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {msg && <div className="bg-[#f0f3ee] text-[#839678] px-4 py-3 rounded-[10px] text-sm font-medium">{msg}</div>}

      {/* Formulaire ajout */}
      <div className="bg-white rounded-[16px] shadow-sm p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-[#1c1c1c] flex items-center gap-2"><Plus size={18} className="text-[#839678]" /> Nouvelle question</h2>
        <input value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))} placeholder="La question…" className="form-input" />
        <textarea value={form.reponse} onChange={e => setForm(p => ({ ...p, reponse: e.target.value }))} placeholder="La réponse…" rows={3} className="form-input resize-none" />
        <button onClick={handleCreate} disabled={loading || !form.question || !form.reponse} className="btn-primary self-start disabled:opacity-50">
          {loading ? "Ajout…" : "Ajouter la question"}
        </button>
      </div>

      {/* Liste */}
      <div className="flex flex-col gap-3">
        {items.length === 0 && <p className="text-[#8a8a8a] text-sm text-center py-8">Aucune question pour le moment.</p>}
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-[10px] shadow-sm p-5">
            {editId === item.id ? (
              <div className="flex flex-col gap-3">
                <input value={editForm.question} onChange={e => setEditForm(p => ({ ...p, question: e.target.value }))} className="form-input font-semibold" />
                <textarea value={editForm.reponse} onChange={e => setEditForm(p => ({ ...p, reponse: e.target.value }))} rows={3} className="form-input resize-none" />
                <div className="flex gap-2">
                  <button onClick={handleUpdate} disabled={loading} className="btn-primary text-sm py-2 px-4"><Check size={14} /> Enregistrer</button>
                  <button onClick={() => setEditId(null)} className="btn-outline text-sm py-2 px-4"><X size={14} /> Annuler</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[#1c1c1c] text-sm">❓ {item.question}</p>
                  <p className="text-sm text-[#4a4a4a] mt-1 leading-relaxed">{item.reponse}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(item)} className="p-2 rounded-[10px] hover:bg-[#f0f3ee] text-[#839678]"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-[10px] hover:bg-red-50 text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
