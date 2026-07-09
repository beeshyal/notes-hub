import { MetadataRoute } from "next";
import { listDocuments } from "@/lib/kv";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXTAUTH_URL || "https://notes.bishal4.com.np";
  const docs = await listDocuments({ limit: 1000 });

  const staticRoutes = ["", "/about", "/privacy", "/terms", "/browse/BBS", "/browse/BBA", "/browse/MBA"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date()
    })
  );

  const docRoutes = docs.map((doc) => ({
    url: `${base}/document/${doc.id}`,
    lastModified: doc.uploadedAt
  }));

  return [...staticRoutes, ...docRoutes];
}
