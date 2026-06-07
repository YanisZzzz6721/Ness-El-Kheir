import type { Metadata } from "next";
import { Poppins, Source_Serif_4 } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

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
    <html lang="fr" className={`${poppins.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
    </html>
  );
}
