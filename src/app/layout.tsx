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

const BASE_URL = "https://ness-el-kheir.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ness el Kheir — Association humanitaire en Île-de-France",
    template: "%s | Ness el Kheir",
  },
  description:
    "Ness el Kheir est une association féminine humanitaire en Île-de-France. Collectes alimentaires, maraudes, distributions de vêtements, aide aux étudiants et aux familles en difficulté.",
  keywords: [
    "Ness el Kheir",
    "association humanitaire",
    "association féminine",
    "maraudes Île-de-France",
    "collecte alimentaire",
    "bénévoles",
    "aide précarité",
    "don association",
    "distribution vêtements",
    "Paris humanitaire",
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
    title: "Ness el Kheir — Association humanitaire en Île-de-France",
    description:
      "Association féminine engagée dans des actions humanitaires : maraudes, collectes alimentaires, distributions de vêtements et soutien aux familles en difficulté.",
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
    title: "Ness el Kheir — Association humanitaire",
    description: "Association féminine en Île-de-France : maraudes, collectes, distributions.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// Données structurées JSON-LD pour Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Ness el Kheir",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Association féminine humanitaire en Île-de-France : collectes alimentaires, maraudes, distributions de vêtements, aide aux étudiants.",
  areaServed: {
    "@type": "Place",
    name: "Île-de-France",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Footer />
      </body>
    </html>
  );
}
