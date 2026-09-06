import type { Metadata } from "next";
import { siteUrl } from "@/data/site";

/**
 * Shared page metadata.
 *
 * Only `/` used to emit openGraph, twitter and a canonical — the other ten
 * routes had none, so pasting a case study or the CV into LinkedIn, Messenger
 * or Slack rendered a bare URL with no title, image or description. Every
 * route goes through here now.
 *
 * The OG image stays a PNG deliberately: the rest of the site is WebP, but
 * link scrapers are inconsistent about it and a preview card that fails to
 * render is worse than a slightly larger file.
 */

const OG_IMAGE = siteUrl
  ? `${siteUrl}/assets/og-cover.png`
  : "/assets/og-cover.png";

const OG_ALT =
  "John Dominic Jasmin — AI automation for service businesses.";

/** Google cuts descriptions around 155-160 chars. Trim on a word boundary. */
export function clamp(text: string, max = 155): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "") + "…";
}

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const desc = clamp(description);
  return {
    title,
    description: desc,
    ...(siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      title,
      description: desc,
      siteName: "John Dominic Jasmin",
      ...(siteUrl ? { url: `${siteUrl}${path}` } : {}),
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [OG_IMAGE],
    },
  };
}
