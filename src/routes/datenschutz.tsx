import { createFileRoute, Link } from "@tanstack/react-router";
import { COMPANY, CompanyAddress, ContactLinks, LegalPage } from "@/components/legal/legal-page";
import { legalJsonLd } from "@/lib/seo";

const TITLE = "Datenschutzerklärung | Heizöl Austria";
const DESCRIPTION = "Datenschutzerklärung von Heizöl Austria: Informationen zur Verarbeitung personenbezogener Daten bei Preisvergleich, Bestellung und Kontakt.";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION }, { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION }, { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ], links: [{ rel: "canonical", href: "/datenschutz" }], scripts: [legalJsonLd("/datenschutz", TITLE, DESCRIPTION)] }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return <LegalPage title="Datenschutzerklärung" intro="Hier erfahren Sie, welche personenbezogenen Daten wir verarbeiten, zu welchen Zwecken dies geschieht und welche Rechte Sie haben." sections={[
    { id: "verantwortlicher", title: "1. Verantwortlicher", content: <><CompanyAddress /><ContactLinks /></> },
    { id: "grundlagen", title: "2. Grundlagen der Verarbeitung", content: <><p>Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Website, zur Bearbeitung von Anfragen, zur Durchführung vorvertraglicher Maßnahmen oder zur Abwicklung von Bestellungen erforderlich ist.</p><p>Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. b DSGVO für Vertrag und vorvertragliche Maßnahmen, Art. 6 Abs. 1 lit. c DSGVO für rechtliche Pflichten, Art. 6 Abs. 1 lit. f DSGVO für berechtigte Interessen sowie Art. 6 Abs. 1 lit. a DSGVO, wenn Sie eine Einwilligung erteilen.</p></> },
    { id: "website", title: "3. Aufruf der Website", content: <p>Beim Aufruf der Website können technisch erforderliche Verbindungsdaten verarbeitet werden, etwa IP-Adresse, Zeitpunkt, aufgerufene Adresse, übertragene Datenmenge, Browser und Betriebssystem. Dies dient dem sicheren und störungsfreien Betrieb. Protokolldaten werden nur so lange gespeichert, wie dies für Sicherheit, Fehleranalyse und gesetzliche Pflichten erforderlich ist.</p> },
    { id: "preisvergleich", title: "4. Preisvergleich und Bestellung", content: <><p>Für Preisberechnung und Bestellung verarbeiten wir insbesondere Postleitzahl, Liefermenge, Lieferort, Lieferoptionen, Kontaktdaten, Rechnungsdaten, Zahlungsart und Angaben zur gewünschten Lieferung.</p><p>Erforderliche Daten können an den ausgewählten regionalen Lieferanten sowie an Zahlungs- und technische Dienstleister übermittelt werden, soweit dies zur Vertragserfüllung notwendig ist. Eine werbliche Nutzung erfolgt nur mit Einwilligung oder soweit gesetzlich zulässig.</p></> },
    { id: "kontakt", title: "5. Kontaktaufnahme", content: <p>Wenn Sie uns per E-Mail oder Kontaktformular kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung des Anliegens und möglicher Anschlussfragen. Pflichtangaben sind auf das für die Bearbeitung notwendige Maß beschränkt.</p> },
    { id: "cookies", title: "6. Cookies und ähnliche Technologien", content: <p>Wir verwenden technisch notwendige Speicherungen, damit zentrale Funktionen wie Navigation und Bestellablauf funktionieren. Optionale Analyse- oder Marketing-Technologien dürfen nur auf Grundlage Ihrer Einwilligung eingesetzt werden. Weitere Informationen finden Sie unter <Link to="/cookie-einstellungen" className="font-medium text-brand hover:underline">Cookie-Einstellungen</Link>.</p> },
    { id: "empfaenger", title: "7. Empfänger und Auftragsverarbeiter", content: <p>Daten erhalten nur Stellen, die sie zur Erfüllung ihrer Aufgaben benötigen. Dazu können Hosting-, IT-, Kommunikations-, Zahlungs- und Logistikdienstleister sowie der ausführende Heizölhändler gehören. Dienstleister werden vertraglich verpflichtet und erhalten nur erforderliche Daten.</p> },
    { id: "speicherung", title: "8. Speicherdauer", content: <p>Wir speichern Daten nur so lange, wie der jeweilige Zweck besteht. Danach werden sie gelöscht oder gesperrt, sofern gesetzliche Aufbewahrungsfristen – insbesondere handels- und steuerrechtliche Fristen – eine weitere Speicherung verlangen.</p> },
    { id: "rechte", title: "9. Ihre Rechte", content: <p>Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Sie können sich außerdem bei einer Datenschutzaufsichtsbehörde beschweren.</p> },
    { id: "widerspruch", title: "10. Widerspruch gegen Direktwerbung", content: <p>Der Verarbeitung Ihrer Daten für Zwecke der Direktwerbung können Sie jederzeit ohne Angabe von Gründen widersprechen. Richten Sie Ihre Nachricht an {COMPANY.email}.</p> },
    { id: "sicherheit", title: "11. Datensicherheit und Aktualisierung", content: <p>Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Daten vor Verlust, Veränderung und unberechtigtem Zugriff zu schützen. Diese Erklärung wird angepasst, wenn sich Funktionen, Dienstleister oder gesetzliche Anforderungen ändern.</p> },
  ]} />;
}