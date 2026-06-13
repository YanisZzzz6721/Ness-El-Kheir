import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://ness-el-kheir.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
