import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nass el Kheir — Association humanitaire",
    template: "%s | Nass el Kheir",
  },
  description:
    "Nass el Kheir est une association féminine engagée dans des actions humanitaires : collectes, maraudes, distributions alimentaires et vestimentaires, soutien aux étudiants.",
  keywords: ["association", "humanitaire", "bénévoles", "maraudes", "collectes", "Île-de-France"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Nass el Kheir",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
