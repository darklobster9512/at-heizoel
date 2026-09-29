import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/legal-page";
import { legalJsonLd } from "@/lib/seo";


const TITLE = "Cookie-Einstellungen | Heizöl Austria";
const DESCRIPTION = "Informationen zu Cookies und lokalen Speicherungen auf heizoel-austria.at sowie Hinweise zur Verwaltung im Browser.";

export const Route = createFileRoute("/cookie-einstellungen")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION }, { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION }, { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ], links: [{ rel: "canonical", href: "/cookie-einstellungen" }], scripts: [legalJsonLd("/cookie-einstellungen", TITLE, DESCRIPTION)] }),
  component: CookiePage,
});

function CookiePage() {
  return <LegalPage title="Cookie-Einstellungen" intro="Informationen darüber, welche Speichertechnologien diese Website nutzt und wie Sie diese kontrollieren können." sections={[
    { id: "ueberblick", title: "1. Überblick", content: <p>Cookies sind kleine Textdateien, die ein Browser auf Ihrem Gerät speichert. Ähnliche Technologien, etwa lokaler oder sitzungsbezogener Speicher, können Einstellungen und den Stand eines Vorgangs sichern. Wir unterscheiden zwischen technisch notwendigen und optionalen Technologien.</p> },
    { id: "notwendig", title: "2. Technisch notwendige Speicherungen", content: <p>Notwendige Speicherungen ermöglichen Kernfunktionen wie Seitennavigation, Formularschritte, Sicherheitsfunktionen und die vorübergehende Speicherung einer begonnenen Bestellung. Ohne sie können einzelne Bereiche nicht zuverlässig funktionieren. Grundlage ist unser berechtigtes Interesse an einem sicheren und nutzbaren Angebot sowie die Durchführung vorvertraglicher Maßnahmen.</p> },
    { id: "funktional", title: "3. Funktionale Technologien", content: <p>Funktionale Speicherungen können von Ihnen gewählte Einstellungen über einen Seitenwechsel hinweg behalten. Soweit sie nicht für eine ausdrücklich gewünschte Funktion erforderlich sind, werden sie nur mit Ihrer Einwilligung verwendet.</p> },
    { id: "analyse", title: "4. Analyse und Marketing", content: <p>Analyse- oder Marketing-Technologien dürfen nur eingesetzt werden, wenn Sie zuvor eingewilligt haben. Sie können dazu dienen, Reichweite und Nutzung zu verstehen oder Inhalte zu personalisieren. Derzeit werden auf dieser Informationsseite keine konkreten Anbieter behauptet; bei einer späteren Einbindung werden Anbieter, Zweck, Laufzeit und Widerrufsmöglichkeit transparent ergänzt.</p> },
    { id: "verwalten", title: "5. Einstellungen verwalten", content: <p>Sie können Cookies in Ihrem Browser anzeigen, blockieren und löschen. Bitte beachten Sie, dass das Sperren notwendiger Speicherungen die Bestellstrecke oder andere Funktionen beeinträchtigen kann. Eine einmal erteilte Einwilligung muss ebenso einfach widerrufbar sein wie sie erteilt wurde.</p> },
    { id: "datenschutz", title: "6. Weitere Informationen", content: <p>Weitere Angaben zu Rechtsgrundlagen, Speicherdauer und Ihren Rechten finden Sie in unserer <Link to="/datenschutz" className="font-medium text-brand hover:underline">Datenschutzerklärung</Link>.</p> },
  ]} />;
}