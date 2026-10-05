import { createFileRoute, Link } from "@tanstack/react-router";
import { COMPANY, CompanyAddress, ContactLinks, LegalPage } from "@/components/legal/legal-page";
import { legalJsonLd } from "@/lib/seo";

const TITLE = "Allgemeine Geschäftsbedingungen | Heizöl Austria";
const DESCRIPTION = "AGB für Heizölbestellungen über heizoel-austria.at: Vertragsschluss, Preise, Lieferung, Zahlung, Gewährleistung und Verbraucherrechte.";

export const Route = createFileRoute("/agb")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION }, { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION }, { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ], links: [{ rel: "canonical", href: "/agb" }], scripts: [legalJsonLd("/agb", TITLE, DESCRIPTION)] }),
  component: AgbPage,
});

function AgbPage() {
  return <LegalPage title="Allgemeine Geschäftsbedingungen" intro="Diese Bedingungen regeln die Nutzung des Onlineshops und die Bestellung von Heizöl über heizoel-austria.at." sections={[
    { id: "anbieter", title: "1. Anbieter und Geltungsbereich", content: <><p>Diese Allgemeinen Geschäftsbedingungen gelten für Verträge, die Verbraucher oder Unternehmer über {COMPANY.shop} abschließen. Betreiber des Onlineshops ist:</p><CompanyAddress /><ContactLinks /></> },
    { id: "angebot", title: "2. Angebot und Vertragsschluss", content: <p>Die Darstellung von Preisen und Produkten ist noch kein verbindliches Angebot. Mit dem Absenden der Bestellung geben Sie ein verbindliches Angebot ab. Eine automatisch versandte Eingangsbestätigung dokumentiert den Eingang, stellt jedoch noch keine Annahme dar. Der Vertrag kommt mit ausdrücklicher Auftragsbestätigung oder Ausführung der Lieferung zustande.</p> },
    { id: "preise", title: "3. Preise und Liefermenge", content: <><p>Alle angezeigten Endpreise enthalten 20 % Umsatzsteuer und die ausgewiesenen Lieferkosten. Maßgeblich sind Lieferort, Produkt, Menge, Lieferstellen und gewählte Zusatzleistungen.</p><p>Heizöl wird mit geeichten Messanlagen abgegeben. Abgerechnet wird die tatsächlich gelieferte Menge. Eine technisch oder tankbedingt geringere Liefermenge wird litergenau berücksichtigt; marktübliche, zumutbare Mengenabweichungen bleiben zulässig.</p></> },
    { id: "lieferung", title: "4. Lieferung und Mitwirkung", content: <><p>Lieferzeiten sind nur verbindlich, wenn sie ausdrücklich bestätigt wurden. Der Kunde stellt sicher, dass Zufahrt, Tankanlage und Befüllanschluss sicher zugänglich und technisch geeignet sind. Besondere Zufahrts-, Schlauch- oder Fahrzeuganforderungen müssen bei der Bestellung angegeben werden.</p><p>Ist eine Lieferung aus vom Kunden zu vertretenden Gründen nicht möglich, können nachgewiesene Mehrkosten berechnet werden.</p></> },
    { id: "zahlung", title: "5. Zahlung", content: <p>Es gelten die im Bestellprozess angebotenen Zahlungsarten und Fälligkeiten. Je nach Region und Kundenstatus können Vorkasse, Barzahlung oder Girocard verfügbar sein. Bei Zahlungsverzug gelten die gesetzlichen Vorschriften.</p> },
    { id: "eigentum", title: "6. Eigentumsvorbehalt", content: <p>Bis zur vollständigen Bezahlung bleibt die gelieferte Ware Eigentum des jeweiligen Verkäufers. Eine Vermischung im Tank berührt die gesetzlichen Regelungen zum Eigentumsvorbehalt.</p> },
    { id: "widerruf", title: "7. Widerrufsrecht", content: <p>Für Verbraucher gelten die gesetzlichen Widerrufsregelungen. Bei Heizöl kann die Ausnahme für Waren greifen, deren Preis von Schwankungen auf dem Finanzmarkt abhängt, auf die der Unternehmer keinen Einfluss hat. Einzelheiten enthält die <Link to="/widerruf" className="font-medium text-brand hover:underline">Widerrufsbelehrung</Link>.</p> },
    { id: "gewaehrleistung", title: "8. Gewährleistung", content: <p>Es gelten die gesetzlichen Mängelrechte. Offensichtliche Beanstandungen zu Menge oder Qualität sollten möglichst bei Lieferung auf dem Lieferschein vermerkt und unverzüglich gemeldet werden; gesetzliche Rechte werden dadurch nicht eingeschränkt.</p> },
    { id: "haftung", title: "9. Haftung", content: <p>Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Verletzung von Leben, Körper oder Gesundheit sowie nach zwingenden gesetzlichen Vorschriften. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt.</p> },
    { id: "schluss", title: "10. Schlussbestimmungen", content: <p>Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Zwingende Verbraucherschutzvorschriften des Staates, in dem ein Verbraucher seinen gewöhnlichen Aufenthalt hat, bleiben unberührt. Sollte eine Bestimmung unwirksam sein, bleiben die übrigen Bestimmungen wirksam.</p> },
  ]} />;
}