import type { MetadataRoute } from "next";
import { allProjects } from "@/data/projects";
import { siteUrl } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl || "";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/hvac`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/restoration`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/cv`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...allProjects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
