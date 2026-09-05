import type { MetadataRoute } from "next";
import { allProjects } from "@/data/projects";
import { siteUrl } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl || "";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/cv`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...allProjects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
