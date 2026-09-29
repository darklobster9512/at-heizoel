import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";
import {
  breadcrumb,
  jsonLd,
  organization,
  pageMeta,
  webPage,
} from "@/lib/seo";

const TITLE = "Heizöl Austria – Kundenbewertungen";
const DESCRIPTION =
  "Informationen zu Heizöl Austria, deutschem Heizöl und dem Preisvergleich für Österreich.";
const URL = "/bewertungen";

export const Route = createFileRoute("/bewertungen")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, url: URL }),
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLd(
        organization(),
        webPage({ url: URL, name: TITLE, description: DESCRIPTION }),
        breadcrumb([
          { name: "Startseite", item: "/" },
          { name: "Kundenbewertungen", item: URL },
        ]),
      ),
    ],
  }),
  component: BewertungenPage,
});


function BewertungenPage() {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
            <h1 className="text-[28px] font-bold text-conditions md:text-[36px]">Kundenbewertungen</h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-custom">
              Für Heizöl Austria sind derzeit keine unabhängig bestätigten Bewertungen veröffentlicht.
              Vergleichen Sie den Endpreis für deutsches Heizöl an Ihrer österreichischen Lieferadresse.
            </p>
          </div>
        </section>

        <ReferralBanner compact />
      </main>
      <SiteFooter />
    </div>
  );
}
