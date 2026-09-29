/**
 * Zentrale SEO-Bausteine (JSON-LD) für Heizöl Austria.
 * Alle URLs sind relativ – Crawler lösen sie gegen die aktuelle Domain auf.
 */

export const SITE_NAME = "Heizöl Austria";
export const LEGAL_NAME = "Demovero GmbH";
export const SITE_EMAIL = "info@heizoel-deutschland.com";
export const SITE_PHONE = "+49 30 5678 9000";

export const ORG_ID = "/#organization";
export const WEBSITE_ID = "/#website";

export const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Kurfürstendamm 97-98",
  postalCode: "10709",
  addressLocality: "Berlin",
  addressRegion: "Berlin",
  addressCountry: "DE",
} as const;

export function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: "/",
    logo: { "@type": "ImageObject", url: "/apple-touch-icon.png", width: 180, height: 180 },
    image: "/apple-touch-icon.png",
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    vatID: "DE281404005",
    address: POSTAL_ADDRESS,
    areaServed: { "@type": "Country", name: "Österreich" },
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: "/",
    inLanguage: "de-AT",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "/preisrechner?plz={plz}" },
      "query-input": "required name=plz",
    },
  };
}

export type Crumb = { name: string; item: string };

export function breadcrumb(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPage(opts: {
  url: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage" | "ItemPage";
}) {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: "de-AT",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

export function article(opts: {
  url: string;
  headline: string;
  description: string;
  section?: string;
}) {
  return {
    "@type": "Article",
    "@id": `${opts.url}#article`,
    headline: opts.headline,
    description: opts.description,
    articleSection: opts.section,
    inLanguage: "de-AT",
    mainEntityOfPage: { "@id": `${opts.url}#webpage` },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function service(opts: { name: string; description: string; url: string }) {
  return {
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: "Heizöllieferung",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Österreich" },
  };
}

/** Baut ein fertiges JSON-LD-Script für head().scripts. */
export function jsonLd(...nodes: unknown[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }),
  };
}

/** Standard-Meta-Satz für öffentliche Seiten. */
export function pageMeta(opts: { title: string; description: string; url: string; ogType?: string }) {
  return [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: opts.ogType ?? "website" },
    { property: "og:url", content: opts.url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
  ];
}

/** Meta-Satz für nicht indexierbare Bereiche (Bestellung, Login, Konto). */
export const NOINDEX_META = [
  { name: "robots", content: "noindex, nofollow" },
  { name: "googlebot", content: "noindex, nofollow" },
];

/** Head-Script für Rechtstextseiten: Unternehmen, Seite und Brotkrümelpfad. */
export function legalJsonLd(url: string, name: string, description: string) {
  return jsonLd(
    organization(),
    webPage({ url, name, description }),
    breadcrumb([
      { name: "Startseite", item: "/" },
      { name: (name.split(/[|—]/)[0] ?? name).trim(), item: url },
    ]),
  );
}
