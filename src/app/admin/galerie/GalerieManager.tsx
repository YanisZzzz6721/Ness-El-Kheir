"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { deletePhoto } from "@/app/actions/admin";
import { Upload, Trash2, ImagePlus, X } from "lucide-react";
import type { GaleriePhoto } from "@/types";

export default function GalerieManager({ photos: initial }: { photos: GaleriePhoto[] }) {
  const [photos, setPhotos] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<File[]>([]);
  const [msg, setMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const toast = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 4000); };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setPreviews(Array.from(files));
  };

  const handleUpload = async () => {
    if (!previews.length) return;
    setUploading(true);
    const supabase = createClient();
    const newPhotos: GaleriePhoto[] = [];

    for (const file of previews) {
      const ext  = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("galerie").upload(path, file, { upsert: false });
      if (upErr) { toast("❌ Erreur upload : " + upErr.message); continue; }

      const { data: { publicUrl } } = supabase.storage.from("galerie").getPublicUrl(path);
      const { data: row, error: dbErr } = await supabase.from("galerie").insert({ url: publicUrl, alt: "" }).select().single();
      if (dbErr) { toast("❌ Erreur BDD : " + dbErr.message); continue; }
      newPhotos.push(row);
    }

    setPhotos(p => [...newPhotos, ...p]);
    setPreviews([]);
    toast(`✅ ${newPhotos.length} photo(s) ajoutée(s) !`);
    setUploading(false);
  };

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Supprimer cette photo ?")) return;
    const res = await deletePhoto(id, url);
    if (res.success) { setPhotos(p => p.filter(ph => ph.id !== id)); toast("✅ Photo supprimée."); }
    else toast("❌ " + res.error);
  };

  return (
    <div className="flex flex-col gap-6">
      {msg && <div className="bg-[#f0f3ee] text-[#839678] px-4 py-3 rounded-[10px] text-sm font-medium">{msg}</div>}

      {/* Zone upload */}
      <div
        className="bg-white border-2 border-dashed border-[#e8e8e8] hover:border-[#839678] rounded-[16px] p-10 flex flex-col items-center gap-4 cursor-pointer transition-colors group"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
      >
        <div className="w-14 h-14 rounded-full bg-[#f0f3ee] group-hover:bg-[#839678]/10 flex items-center justify-center transition-colors">
          <ImagePlus size={24} className="text-[#839678]" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-[#1c1c1c]">Glissez vos photos ici</p>
          <p className="text-sm text-[#8a8a8a] mt-1">ou cliquez pour sélectionner — JPG, PNG, WEBP</p>
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
      </div>

      {/* Prévisualisation avant upload */}
      {previews.length > 0 && (
        <div className="bg-white rounded-[16px] shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-[#1c1c1c]">{previews.length} photo(s) sélectionnée(s)</p>
            <button onClick={() => setPreviews([])} className="text-[#8a8a8a] hover:text-red-400"><X size={18} /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {previews.map((f, i) => (
              <div key={i} className="relative w-20 h-20 rounded-[10px] overflow-hidden">
                <Image src={URL.createObjectURL(f)} alt={f.name} fill className="object-cover" />
              </div>
            ))}
          </div>
          <button onClick={handleUpload} disabled={uploading} className="btn-primary self-start disabled:opacity-50">
            <Upload size={15} />
            {uploading ? "Upload en cours…" : `Publier ${previews.length} photo(s)`}
          </button>
        </div>
      )}

      {/* Grille photos existantes */}
      {photos.length === 0 ? (
        <p className="text-center text-[#8a8a8a] text-sm py-8">Aucune photo dans la galerie. Ajoutez-en une !</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map((ph) => (
            <div key={ph.id} className="relative group rounded-[10px] overflow-hidden aspect-square">
              <Image src={ph.url} alt={ph.alt ?? ""} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button
                  onClick={() => handleDelete(ph.id, ph.url)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full transition-all hover:bg-red-600"
                  aria-label="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
