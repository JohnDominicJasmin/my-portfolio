import { email, siteUrl } from "@/data/site";

/**
 * JSON-LD for the sales page.
 *
 * Deliberately omits `priceRange` and `aggregateRating`: there is no published
 * rate card and no review corpus, and inventing either is the kind of thing
 * Google penalises and prospects notice. Everything here is verifiable.
 */
export default function StructuredData() {
  if (!siteUrl) return null;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: "John Dominic Jasmin — AI Automation",
        url: siteUrl,
        image: `${siteUrl}/assets/og-cover.png`,
        description:
          "AI automation for service businesses: chat and voice agents that answer instantly, qualify the caller, and book the job at any hour.",
        email,
        areaServed: "Worldwide",
        provider: { "@id": `${siteUrl}/#person` },
        serviceType: [
          "AI automation",
          "AI voice agents",
          "Chatbot development",
          "Lead routing automation",
          "Workflow automation",
        ],
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "John Dominic Jasmin",
        url: siteUrl,
        email,
        jobTitle: "AI Automation Engineer",
        sameAs: [
          "https://www.linkedin.com/in/john-dominic-jasmin-56645a1b0",
          "https://github.com/JohnDominicJasmin",
        ],
        knowsAbout: [
          "AI automation",
          "Voice agents",
          "n8n",
          "Android development",
          "Kotlin",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "John Dominic Jasmin",
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  // Serialised from the literal above, so no user input reaches this. Escaping
  // `<` anyway means a future string containing "</script>" can never break out.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
