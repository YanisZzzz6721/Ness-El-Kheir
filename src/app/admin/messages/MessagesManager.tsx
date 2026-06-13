"use client";

import { useState } from "react";
import { markMessageLu, deleteMessage } from "@/app/actions/admin";
import { Trash2, CheckCheck, Phone, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message { id: string; nom: string; telephone: string; message: string; lu: boolean; created_at: string }

export default function MessagesManager({ messages: initial }: { messages: Message[] }) {
  const [messages, setMessages] = useState(initial);
  const [msg, setMsg] = useState("");

  const toast = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const handleLu = async (id: string) => {
    await markMessageLu(id);
    setMessages(p => p.map(m => m.id === id ? { ...m, lu: true } : m));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    const res = await deleteMessage(id);
    if (res.success) { setMessages(p => p.filter(m => m.id !== id)); toast("✅ Message supprimé."); }
    else toast("❌ " + res.error);
  };

  const nonLus = messages.filter(m => !m.lu).length;

  return (
    <div className="flex flex-col gap-4">
      {msg && <div className="bg-[#f0f3ee] text-[#839678] px-4 py-3 rounded-[10px] text-sm font-medium">{msg}</div>}

      {nonLus > 0 && (
        <div className="bg-[#eef6ff] border border-[#bfdbfe] text-[#3b82c4] px-4 py-3 rounded-[10px] text-sm font-medium">
          📬 {nonLus} message(s) non lu(s)
        </div>
      )}

      {messages.length === 0 ? (
        <div className="text-center py-16 text-[#8a8a8a]">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">Aucun message reçu pour le moment.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <div key={m.id} className={cn("bg-white rounded-[10px] shadow-sm p-5 flex flex-col gap-3 border-l-4", m.lu ? "border-[#e8e8e8]" : "border-[#839678]")}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {!m.lu && <span className="w-2 h-2 rounded-full bg-[#839678] flex-shrink-0" />}
                    <span className="flex items-center gap-1.5 font-semibold text-[#1c1c1c] text-sm"><User size={14} /> {m.nom}</span>
                  </div>
                  <a href={`tel:${m.telephone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-xs text-[#839678] hover:underline"><Phone size={12} /> {m.telephone}</a>
                </div>
                <span className="text-xs text-[#8a8a8a] flex-shrink-0">{new Date(m.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <p className="text-sm text-[#4a4a4a] leading-relaxed bg-[#F6F6F6] rounded-[10px] p-3">{m.message}</p>
              <div className="flex gap-2">
                {!m.lu && (
                  <button onClick={() => handleLu(m.id)} className="flex items-center gap-1.5 text-xs font-semibold text-[#839678] bg-[#f0f3ee] hover:bg-[#839678] hover:text-white px-3 py-1.5 rounded-full transition-all">
                    <CheckCheck size={13} /> Marquer comme lu
                  </button>
                )}
                <button onClick={() => handleDelete(m.id)} className="flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-50 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-full transition-all">
                  <Trash2 size={13} /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
