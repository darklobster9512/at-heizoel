import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, CompanyAddress, ContactLinks, LegalPage } from "@/components/legal/legal-page";
import { legalJsonLd } from "@/lib/seo";

const TITLE = "Impressum | Heizöl Austria";
const DESCRIPTION = "Impressum und Anbieterkennzeichnung von heizoel-austria.at, einem Onlineshop der Demovero GmbH in Berlin.";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/impressum" }], scripts: [legalJsonLd("/impressum", TITLE, DESCRIPTION)],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return <LegalPage title="Impressum" intro="Anbieterkennzeichnung und gesetzliche Pflichtangaben für heizoel-austria.at." sections={[
    { id: "anbieter", title: "Angaben gemäß § 5 DDG", content: <><p>{COMPANY.shop} ist ein Onlineshop der</p><CompanyAddress /></> },
    { id: "vertretung", title: "Vertretungsberechtigte Person", content: <p>Geschäftsführer: <strong className="text-ink">{COMPANY.director}</strong></p> },
    { id: "register", title: "Registereintrag", content: <p>{COMPANY.court}<br />Handelsregister: {COMPANY.register}</p> },
    { id: "umsatzsteuer", title: "Umsatzsteuer-ID", content: <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: {COMPANY.vatId}</p> },
    { id: "kontakt", title: "Kontakt", content: <ContactLinks /> },
    { id: "streitbeilegung", title: "Verbraucherstreitbeilegung", content: <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p> },
    { id: "haftung", title: "Haftung für Inhalte und Links", content: <><p>Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Eine Verpflichtung zur Überwachung übermittelter oder gespeicherter fremder Informationen besteht nur im Rahmen der gesetzlichen Vorschriften.</p><p>Externe Links wurden bei der Verlinkung geprüft. Für Inhalte verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.</p></> },
  ]} />;
}