import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { getSiteContent } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles de Ness el Kheir.",
};

export default async function ConfidentialitePage() {
  const content = await getSiteContent();
  const email = content.email ?? "contact@nesselkheir.fr";
  const nomAsso = content.hero_titre ?? "Ness el Kheir";

  return (
    <div className="bg-[#F6F6F6]">
      <div className="bg-[#839678] text-white py-14 px-4 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
            <ShieldCheck size={22} className="text-white" />
          </div>
          <h1 className="text-white font-[family-name:var(--font-source-serif)] font-light text-3xl md:text-4xl">
            Politique de confidentialité
          </h1>
        </div>
      </div>

      <div className="container-site py-10 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#839678] hover:text-[#6b7d63] transition-colors mb-8">
          <ArrowLeft size={15} />
          Retour à l&apos;accueil
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-10 flex flex-col gap-8 text-sm text-[#4a4a4a] leading-relaxed">

          <p className="text-xs text-[#8a8a8a]">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}</p>

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">1. Qui sommes-nous ?</h2>
            <p>
              {nomAsso} est une association loi 1901 basée à Strasbourg. Cette politique de confidentialité
              explique quelles données personnelles nous collectons via ce site, pourquoi, et quels sont vos droits.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">2. Données collectées</h2>
            <p>Nous collectons uniquement les données que vous nous transmettez volontairement via notre formulaire de contact :</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Nom et prénom</li>
              <li>Numéro de téléphone</li>
              <li>Contenu de votre message</li>
            </ul>
            <p>Nous ne collectons aucune donnée de navigation, aucun cookie publicitaire ni traceur tiers.</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">3. Finalité du traitement</h2>
            <p>
              Les données transmises via le formulaire de contact sont utilisées exclusivement pour répondre à votre
              demande (question, besoin d&apos;aide, proposition de don ou de bénévolat). Elles ne sont ni vendues,
              ni cédées, ni utilisées à des fins commerciales.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">4. Hébergement et sécurité</h2>
            <p>
              Les données sont hébergées de façon sécurisée via Supabase (Union Européenne) et le site est hébergé
              par Vercel. L&apos;accès aux messages reçus est strictement réservé aux administratrices de l&apos;association,
              via un accès protégé par mot de passe.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">5. Durée de conservation</h2>
            <p>
              Les messages sont conservés le temps nécessaire au traitement de votre demande, puis supprimés
              à l&apos;initiative de l&apos;association. Vous pouvez à tout moment demander leur suppression anticipée.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">6. Vos droits (RGPD)</h2>
            <p>Conformément au Règlement Général sur la Protection des Données, vous disposez d&apos;un droit :</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>D&apos;accès à vos données</li>
              <li>De rectification</li>
              <li>De suppression (« droit à l&apos;oubli »)</li>
              <li>D&apos;opposition au traitement</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à l&apos;adresse&nbsp;:{" "}
              <a href={`mailto:${email}`} className="text-[#839678] font-semibold hover:underline">{email}</a>
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-source-serif)] text-lg text-[#1c1c1c] font-semibold">7. Cookies</h2>
            <p>
              Ce site n&apos;utilise pas de cookies de suivi publicitaire ou analytique. Seuls des cookies techniques
              strictement nécessaires au fonctionnement de l&apos;espace administrateur peuvent être déposés.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
