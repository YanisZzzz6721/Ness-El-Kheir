import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      // Supabase Storage sera ajouté à l'Étape 5
    ],
  },
};

export default nextConfig;
