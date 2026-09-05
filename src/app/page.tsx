import type { Metadata } from "next";
import SalesPage from "@/components/SalesPage";
import StructuredData from "@/components/StructuredData";
import { siteUrl } from "@/data/site";
import { salesFonts } from "./fonts";
import "./sales.css";

const title = "John Dominic Jasmin | AI Automation for Service Businesses";
const description =
  "The lead you missed at 2am already hired someone else. I build the system that answers instantly, qualifies the caller, and books the job, at any hour.";
const ogImage = siteUrl
  ? `${siteUrl}/assets/og-cover.png`
  : "/assets/og-cover.png";

export const metadata: Metadata = {
  title,
  description,
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "John Dominic Jasmin",
    ...(siteUrl ? { url: siteUrl } : {}),
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "The lead you missed at 2am already hired someone else — John Dominic Jasmin, AI automation for service businesses.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function Home() {
  return (
    <div className={salesFonts}>
      <StructuredData />
      <SalesPage />
    </div>
  );
}
