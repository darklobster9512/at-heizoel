import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import {
  PriceSearchLoading,
  type PriceSearchValues,
} from "@/components/landing/price-search-loading";
import {
  ConditionsBox,
  HeizoelServiceIntro,
  HeizoelSorten,
  MatchingOffers,
  PersonalDataInfo,
  RegionalSeo,
  SiteFooter,
  Steps,
  ReferralBanner,
  TrustLinks,
} from "@/components/landing/sections";
import { jsonLd, organization, pageMeta, service, webPage, website } from "@/lib/seo";



const DESCRIPTION =
  "Deutsches Heizöl für Österreich vergleichen und Heizöl österreichweit günstig online bestellen. Tagesaktuelle Preise und Lieferung nach Österreich.";

const TITLE = "Heizöl bestellen & Heizölpreise vergleichen | Heizöl Austria";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, url: "/" }),
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      jsonLd(
        organization(),
        website(),
        webPage({ url: "/", name: TITLE, description: DESCRIPTION }),
        service({
          name: "Heizöl online bestellen",
          description:
            "Heizölpreise vergleichen und Heizöl österreichweit ab 1.500 Litern online bestellen, Lieferung inklusive.",
          url: "/preisrechner",
        }),
      ),
    ],
  }),
  component: Index,
});


function Index() {
  const [searchValues, setSearchValues] = useState<PriceSearchValues | null>(null);

  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      {searchValues ? (
        <PriceSearchLoading values={searchValues} />
      ) : (
        <>
          <main>
            <Hero onSearch={setSearchValues} />
            <ConditionsBox mobileOnly />
            <ConditionsBox />
            <Steps />
            <PersonalDataInfo />
            <MatchingOffers />
            <HeizoelSorten />
            <ReferralBanner />
            <HeizoelServiceIntro />
            <TrustLinks />
            <RegionalSeo />
          </main>
          <SiteFooter />
        </>
      )}
    </div>
  );
}
