import { createFileRoute } from "@tanstack/react-router";
import {
  Truck,
  Wallet,
  Lock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";
const barzahlungAsset = { url: "/img/barzahlung.png" };
const vorauskasseAsset = { url: "/img/vorauskasse.png" };
const ecKarteAsset = { url: "/img/ec-karte.png" };
const lieferfristAsset = { url: "/img/lieferfrist.png" };

import {
  breadcrumb,
  jsonLd,
  organization,
  pageMeta,
  service,
  webPage,
} from "@/lib/seo";

const TITLE = "Heizöl Lieferung & Zahlung: Ablauf, Fristen, Zahlarten";
const DESCRIPTION =
  "Heizöl-Lieferung in ca. 7 Werktagen österreichweit: Ablauf am Liefertag, Schlauchlängen, Abladestellen und Zahlung per Vorkasse, Bar oder EC-Karte ohne Aufpreis.";
const URL = "/lieferung-zahlung";

export const Route = createFileRoute("/lieferung-zahlung")({
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, url: URL }),
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLd(
        organization(),
        webPage({ url: URL, name: TITLE, description: DESCRIPTION }),
        breadcrumb([
          { name: "Startseite", item: "/" },
          { name: "Lieferung & Zahlung", item: URL },
        ]),
        service({
          name: "Heizöllieferung österreichweit",
          description: DESCRIPTION,
          url: URL,
        }),
      ),
    ],
  }),
  component: LieferungZahlungPage,
});


const USPS = [
  {
    icon: Truck,
    title: "Schnelle Lieferung",
    text: "ca. 7 Werktage österreichweit",
  },
  {
    icon: Wallet,
    title: "Flexible Zahlung",
    text: "Bar, EC-Karte, Vorauskasse",
  },
  {
    icon: Lock,
    title: "Festpreisgarantie",
    text: "Preis des Bestelltages gilt",
  },
  {
    icon: ShieldCheck,
    title: "50 € Entschädigung",
    text: "Bei Lieferverspätung",
  },
];

const DELIVERY_POINTS = [
  "Die Heizöl-Lieferung erfolgt durch unsere eigene Tankflotte oder unseren ausgewählten Partnerhändler in Ihrer Region.",
  "Wir setzen uns vor Lieferung mit Ihnen in Verbindung und vereinbaren einen verbindlichen Liefertermin.",
  "Sammelbestellungen dürfen nicht weiter als 10 km voneinander entfernt sein. Jeder Abladevorgang gilt als eine Lieferstelle, unabhängig von der Entfernung (auch wenn die Lieferstellen direkt nebeneinander liegen).",
  "Die Abrechnung erfolgt litergenau und zum Preis des Bestelltages.",
  "Sie erhalten zu jeder Bestellung eine Rechnung. Bei Sammelbestellungen erhält jeder Besteller eine separate Rechnung.",
];

const PAYMENT_METHODS = [
  {
    image: barzahlungAsset.url,
    alt: "Barzahlung — Bargeld wird an Tankwagenfahrer übergeben",
    title: "Barzahlung",
    paragraphs: [
      "Sie zahlen die Rechnungssumme direkt nach der Betankung in bar an den Tankwagenfahrer.",
      "Bitte achten Sie darauf, ausreichend Bargeld vorrätig zu haben, um den kompletten Kaufbetrag begleichen zu können.",
    ],
  },
  {
    image: vorauskasseAsset.url,
    alt: "Vorauskasse — Überweisung vor der Lieferung",
    title: "Vorauskasse",
    paragraphs: [
      "Die Bezahlung erfolgt durch Überweisung vor der Lieferung direkt auf das Konto des Lieferanten.",
      "Die Kontodaten erhalten Sie mit der Auftragsbestätigung des Händlers oder in separater E-Mail.",
      "Sollte Ihre bestellte und gezahlte Menge nicht in Ihren Heizöltank passen, wird Ihnen der überschüssige Betrag direkt vom Lieferanten erstattet.",
    ],
  },
  {
    image: ecKarteAsset.url,
    alt: "EC-Karte — Kartenzahlung am Tankwagen",
    title: "EC-Karte (Girocard)",
    paragraphs: [
      "Sie zahlen direkt nach der Lieferung am Tankwagen über ein mobiles Kartenlesegerät. Neben Ihrer EC-Karte benötigen Sie hierzu noch Ihre PIN.",
      "Bitte achten Sie auf ein ausreichendes Kartenlimit. Das Kartenlimit variiert von Bank zu Bank. Wenn Sie unsicher sind, fragen Sie bei Ihrer Bank nach. Sie können das Kartenlimit auch vorübergehend für den Tag der Lieferung erhöhen lassen — hierzu reicht oftmals ein Anruf bei Ihrer Hausbank aus.",
    ],
  },
];

function LieferungZahlungPage() {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        {/* Seitenkopf */}
        <section className="border-b border-line bg-surface" aria-labelledby="lz-title">
          <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
            <h1
              id="lz-title"
              className="text-[28px] font-bold leading-tight text-conditions md:text-[36px]"
            >
              Lieferung &amp; Zahlung
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-muted-custom md:text-[16px]">
              Alle Informationen zu Lieferzeiten, Zahlungsarten und Liefermodalitäten
            </p>
          </div>
        </section>

        {/* USP-Kacheln */}
        <section className="bg-background" aria-label="Ihre Vorteile">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 py-10 min-[380px]:grid-cols-2 md:grid-cols-4 md:gap-6 md:py-12">
            {USPS.map((usp) => (
              <div
                key={usp.title}
                className="rounded-xl border border-line border-t-4 border-t-brand bg-card p-5 text-center shadow-sm"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <usp.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-3 text-sm font-semibold leading-tight text-ink md:text-[15px]">
                  {usp.title}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-custom md:text-[13px]">
                  {usp.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* So funktioniert die Lieferung + Lieferfrist */}
        <section className="border-t border-line bg-surface" aria-labelledby="lieferung-title">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr] md:py-16">
            <div>
              <h2
                id="lieferung-title"
                className="text-[22px] font-bold leading-tight text-conditions md:text-[26px]"
              >
                So funktioniert die Lieferung
              </h2>
              <ul className="mt-6 space-y-4">
                {DELIVERY_POINTS.map((point) => (
                  <li key={point.slice(0, 32)} className="flex gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <p className="text-[14px] leading-[1.7] text-muted-custom md:text-[15px]">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] leading-[1.7] text-muted-custom md:text-[15px]">
                Weitere Informationen zu Lieferung &amp; Zahlung erhalten Sie auf unserer{" "}
                <a href="/faq" className="font-semibold text-brand hover:underline">
                  Hilfeseite
                </a>
                .
              </p>
            </div>

            {/* Lieferfrist-Box */}
            <div className="h-fit rounded-xl border border-line bg-card p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-conditions">Lieferfrist</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted-custom">
                Aktuelle Auslastung des Heizöl-Handels, d. h. durchschnittliche Wartezeit auf die
                Lieferung im Vergleich zum Jahresmittel.
              </p>
              <img
                src={lieferfristAsset.url}
                alt="Aktuelle Lieferfrist: hohe Auslastung"
                loading="lazy"
                className="mx-auto mt-5 h-auto w-full max-w-[260px] object-contain"
              />
              <p className="mt-3 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-bold text-brand">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand" />
                  </span>
                  hoch
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Zahlungsarten */}
        <section className="border-t border-line bg-background" aria-labelledby="zahlung-title">
          <div className="mx-auto max-w-6xl px-5 pt-12 pb-6 md:pt-16 md:pb-8">
            <h2
              id="zahlung-title"
              className="text-[22px] font-bold leading-tight text-conditions md:text-[26px]"
            >
              Unsere Zahlungsarten
            </h2>
            <p className="mt-2 text-[14px] font-semibold text-brand md:text-[15px]">
              Alle Zahlungsarten ohne Aufpreis
            </p>
            <p className="mt-4 max-w-3xl text-[13px] leading-[1.7] text-muted-custom md:text-[14px]">
              Bitte beachten Sie, dass die aufgeführten Liefer- und Zahlungsmodalitäten regional
              abweichen können, bzw. dass nicht in jeder Region alle Zahlungsarten verfügbar sind
              und Lieferzeiten abweichen können. Bei Neukunden ist in einigen Regionen eine
              Anzahlung notwendig. Individuelle Modalitäten für Ihre Region erhalten Sie nach
              Eingabe Ihrer Postleitzahl.
            </p>

            <div className="mt-8 grid gap-4">
              {PAYMENT_METHODS.map((method) => (
              <article
                  key={method.title}
                  className="flex flex-col gap-5 rounded-xl border border-line border-l-4 border-l-brand bg-card p-5 shadow-sm md:flex-row md:items-start"
                >
                  <img
                    src={method.image}
                    alt={method.alt}
                    loading="lazy"
                    className="h-20 max-w-full self-center object-contain md:h-24 md:shrink-0 md:self-start"
                  />
                  <div>
                    <h3 className="text-[17px] font-bold text-conditions">{method.title}</h3>
                    {method.paragraphs.map((p) => (
                      <p
                        key={p.slice(0, 32)}
                        className="mt-3 text-[13px] leading-[1.7] text-muted-custom md:text-[14px]"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ReferralBanner compact />
      </main>
      <SiteFooter />
    </div>
  );
}
