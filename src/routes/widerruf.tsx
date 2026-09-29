import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, CompanyAddress, ContactLinks, LegalPage } from "@/components/legal/legal-page";
import { legalJsonLd } from "@/lib/seo";

const TITLE = "Widerrufsbelehrung | Heizöl Austria";
const DESCRIPTION = "Informationen zum Widerrufsrecht bei Heizölbestellungen über heizoel-austria.at sowie Muster-Widerrufsformular.";

export const Route = createFileRoute("/widerruf")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION }, { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION }, { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ], links: [{ rel: "canonical", href: "/widerruf" }], scripts: [legalJsonLd("/widerruf", TITLE, DESCRIPTION)] }),
  component: WiderrufPage,
});

function WiderrufPage() {
  return <LegalPage title="Widerrufsbelehrung" intro="Informationen zum gesetzlichen Widerrufsrecht und ein Musterformular für Verbraucher." sections={[
    { id: "ausnahme", title: "Wichtiger Hinweis bei Heizöl", content: <p>Bei Heizölbestellungen kann das gesetzliche Widerrufsrecht nach § 312g Abs. 2 Nr. 8 BGB ausgeschlossen sein, wenn der Preis bei Vertragsschluss von Schwankungen auf dem Finanzmarkt abhängt, auf die der Unternehmer keinen Einfluss hat und die innerhalb der Widerrufsfrist auftreten können. Ob diese Ausnahme im Einzelfall greift, richtet sich nach dem konkreten Vertrag und der Preisbildung.</p> },
    { id: "recht", title: "Widerrufsrecht, sofern keine Ausnahme greift", content: <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Frist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung – etwa per E-Mail oder Brief – über Ihren Entschluss informieren.</p> },
    { id: "adresse", title: "Widerruf richten an", content: <><CompanyAddress /><ContactLinks /><p>Zur Wahrung der Frist reicht es aus, dass Sie die Mitteilung vor Ablauf der Widerrufsfrist absenden.</p></> },
    { id: "folgen", title: "Folgen des Widerrufs", content: <p>Wenn Sie diesen Vertrag wirksam widerrufen, erstatten wir alle von Ihnen erhaltenen Zahlungen einschließlich der Standard-Lieferkosten unverzüglich und spätestens binnen vierzehn Tagen ab Eingang Ihres Widerrufs. Für die Rückzahlung verwenden wir grundsätzlich dasselbe Zahlungsmittel wie bei der ursprünglichen Transaktion, sofern nichts anderes vereinbart wurde.</p> },
    { id: "vorzeitig", title: "Vorzeitige Leistung", content: <p>Verlangen Sie ausdrücklich, dass eine Dienstleistung während der Widerrufsfrist beginnt, kann bei wirksamem Widerruf Wertersatz für den bis dahin erbrachten Anteil geschuldet sein. Bei vollständig erbrachter Leistung kann das Widerrufsrecht unter den gesetzlichen Voraussetzungen erlöschen.</p> },
    { id: "formular", title: "Muster-Widerrufsformular", content: <div className="rounded-md border border-line bg-surface p-4"><p>Wenn Sie den Vertrag widerrufen wollen, können Sie folgenden Text verwenden:</p><p className="mt-3">An die Demovero GmbH, Kurfürstendamm 97–98, 10709 Berlin, E-Mail: {COMPANY.email}</p><p className="mt-3">Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der folgenden Waren beziehungsweise die Erbringung der folgenden Dienstleistung:</p><p className="mt-3">Bestellt am: __________<br />Name: __________<br />Anschrift: __________<br />Datum: __________<br />Unterschrift (nur bei Mitteilung auf Papier): __________</p></div> },
  ]} />;
}