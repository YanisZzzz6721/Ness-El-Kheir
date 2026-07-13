import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { getSiteContent } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Ness el Kheir, association loi 1901 basée à Strasbourg.",
};

export default async function MentionsLegalesPage() {
  const content = await getSiteContent();
  const email = content.email ?? "contact@nesselkheir.fr";
  const nomAsso = content.hero_titre ?? "Ness el Kheir";

  return (
    <div className="bg-[#F6F6F6]">
      <div className="bg-[#839678] text-white py-14 px-4 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
            <FileText size={22} className="text-white" />
          </div>
          <h1 className="text-white font-[family-name:var(--font-source-serif)] font-light text-3xl md:text-4xl">
            Mentions légales
          </h1>
        </div>
      </div>

      <div className="container-site py-10 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#839678] hover:text-[#6b7d63] transition-colors mb-8">
          <ArrowLeft size={15} />
          Retour à l&apos;accueil
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-10 flex flex-col gap-8 text-sm text-[#4a4a4a] leading-relaxed">

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">Éditeur du site</h2>
            <p>
              Le présent site est édité par l&apos;association <strong>{nomAsso}</strong>, association loi 1901,
              basée à Strasbourg (67).
            </p>
            <p>
              Contact&nbsp;: <a href={`mailto:${email}`} className="text-[#839678] font-semibold hover:underline">{email}</a>
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">Hébergement</h2>
            <p>
              Ce site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
            </p>
            <p>
              La base de données et le stockage des images sont assurés par <strong>Supabase</strong> (Union Européenne).
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, photos, logo) est la propriété de {nomAsso},
              sauf mention contraire. Toute reproduction sans autorisation est interdite.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">Données personnelles</h2>
            <p>
              Le traitement des données personnelles collectées via ce site est détaillé dans notre{" "}
              <Link href="/confidentialite" className="text-[#839678] font-semibold hover:underline">
                politique de confidentialité
              </Link>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
