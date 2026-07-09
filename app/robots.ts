import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${process.env.NEXTAUTH_URL || "https://notes.bishal4.com.np"}/sitemap.xml`
  };
}
