import type { Metadata } from "next";
import { Poppins, Source_Serif_4 } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteContent } from "@/lib/supabase/queries";
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

const BASE_URL = "https://ness-el-kheir.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ness el Kheir — Association humanitaire à Strasbourg",
    template: "%s | Ness el Kheir",
  },
  description:
    "Ness el Kheir est une association féminine humanitaire à Strasbourg (67). Aide aux personnes âgées, soutien aux étudiants, collectes alimentaires, distribution de vêtements, aide aux familles en difficulté et actions solidaires en Alsace.",
  keywords: [
    "Ness el Kheir Strasbourg",
    "Ness el Kheir",
    "association humanitaire Strasbourg",
    "association féminine Strasbourg",
    "aide personnes âgées Strasbourg",
    "soutien étudiants Strasbourg",
    "collecte alimentaire 67",
    "bénévoles Strasbourg",
    "aide précarité Alsace",
    "don association Strasbourg",
    "distribution vêtements Strasbourg",
    "action solidaire Bas-Rhin",
    "association 67",
  ],
  authors: [{ name: "Ness el Kheir" }],
  creator: "Ness el Kheir",
  publisher: "Ness el Kheir",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "Ness el Kheir",
    title: "Ness el Kheir — Association humanitaire à Strasbourg",
    description:
      "Association féminine à Strasbourg : aide aux personnes âgées, soutien aux étudiants, collectes alimentaires, distributions de vêtements et aide aux familles en difficulté.",
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "Logo Ness el Kheir",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ness el Kheir — Association humanitaire Strasbourg",
    description: "Association féminine à Strasbourg : aide aux personnes âgées, étudiants, collectes, distributions.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "ceg8m9S1ec6cwMqHDH4_cCu9CfCoOW-k8IfMs-YZZbY",
  },
};

// Données structurées JSON-LD pour Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Ness el Kheir",
  alternateName: "Ness el Kheir Strasbourg",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Association féminine humanitaire à Strasbourg : aide aux personnes âgées, soutien aux étudiants, collectes alimentaires, distributions de vêtements, aide aux familles en difficulté.",
  areaServed: {
    "@type": "Place",
    name: "Strasbourg, Bas-Rhin, Alsace",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Strasbourg",
    postalCode: "67000",
    addressRegion: "Alsace",
    addressCountry: "FR",
  },
  foundingDate: "2023",
  nonprofitStatus: "NonprofitType",
  sameAs: ["https://www.instagram.com/nesselkheir"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: "French",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();

  return (
    <html lang="fr" className={`${poppins.variable} ${sourceSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer content={content} />
      </body>
    </html>
  );
}
