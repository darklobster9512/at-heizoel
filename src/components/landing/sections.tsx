import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Info, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
const barzahlungAsset = { url: "/img/barzahlung.png" };
const vorauskasseAsset = { url: "/img/vorauskasse.png" };
const ecKarteAsset = { url: "/img/ec-karte.png" };

export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand-deep">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-ink md:text-[38px]">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-muted-custom">{intro}</p> : null}
    </div>
  );
}

const heizoelHero = { url: "/img/heizoel-hero.webp" };

const CONDITIONS_LEFT = [
  ["Literpreis:", "ca. 128,78 € bis 163,15 € je 100 Liter (Heizöl EL)"],
  ["Liefermenge:", "Min. 1500 bis Max. 32.000 Liter"],
];

const CONDITIONS_RIGHT = [
  ["Lieferzeit:", "ca. 4 bis 10 Werktage, Express möglich"],
  ["Zahlungsarten:", "Vorkasse, Bar, EC-Karte"],
];

function ConditionsList({ items }: { items: string[][] }) {
  return (
    <dl className="grid gap-y-2.5">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="grid gap-x-3 gap-y-0.5 text-[13.5px] leading-snug sm:grid-cols-[150px_1fr]"
        >
          <dt className="font-bold text-conditions">{label}</dt>
          <dd className="tabular text-conditions">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ConditionsBox({ mobileOnly = false }: { mobileOnly?: boolean }) {
  return (
    <section
      aria-label="Preis Übersicht"
      className={mobileOnly ? "bg-surface md:hidden" : "hidden bg-background md:block"}
    >
      <div className={`mx-auto max-w-6xl px-5 ${mobileOnly ? "pb-5 pt-4" : "pb-12 pt-6"}`}>
        <div className="rounded-md bg-line px-4 py-4 md:bg-surface md:px-6 md:py-5">
          <h2 className="text-[14px] font-bold text-conditions">
            Heizöl Preis-Übersicht
          </h2>
          <div className="mt-4 grid gap-x-8 gap-y-2.5 md:grid-cols-[1.25fr_1fr]">
            <ConditionsList items={CONDITIONS_LEFT} />
            <ConditionsList items={CONDITIONS_RIGHT} />
          </div>
        </div>
      </div>
    </section>
  );
}


const freeInquiry = { url: "/img/free-inquiry.svg" };
const getOffers = { url: "/img/get-offers.svg" };
const closeApplication = { url: "/img/close-application.svg" };
const coupleOnCouch = { url: "/img/couple-on-couch.webp" };
const offerList = { url: "/img/heizoel-offer-list.webp" };
const interestIcon = { url: "/img/interest.svg" };
const neutralIcon = { url: "/img/neutral.svg" };
const freeIcon = { url: "/img/free.svg" };
const dataSafetyIcon = { url: "/img/data-safety.svg" };

export const STEPS = [
  {
    icon: freeInquiry.url,
    iconAlt: "Monitor-Symbol, Schritt 1",
    width: 128,
    height: 128,
    title: "Kostenlose\nPreisanfrage",
    text: "Geben Sie einfach Ihre Postleitzahl, die gewünschte Menge und Abladestellen ein – bequem von zu Hause aus.",
  },
  {
    icon: getOffers.url,
    iconAlt: "Listen-Symbol, Schritt 2",
    width: 67,
    height: 56,
    title: "Angebote vergleichen",
    text: "Sie erhalten aktuelle Heizölpreise von Händlern aus Ihrer Region und wählen das günstigste Angebot.",
  },
  {
    icon: closeApplication.url,
    iconAlt: "Hand mit Münzen, Schritt 3",
    width: 72,
    height: 72,
    title: "Heizöl bestellen",
    text: "Bestellen Sie direkt online beim Händler Ihrer Wahl – die Lieferung erfolgt zum Wunschtermin.",
  },
];

export function Steps() {
  return (
    <section id="ablauf" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-14">
        <h2 className="text-[22px] font-bold tracking-tight text-conditions md:text-2xl">
          In 3 Schritten zum günstigen Heizöl
        </h2>
        <ol className="mt-9 grid gap-9 md:grid-cols-3 md:gap-x-12">
          {STEPS.map((s) => (
            <li key={s.title} className="flex items-start gap-5">
              <img
                src={s.icon}
                alt={s.iconAlt}
                width={s.width}
                height={s.height}
                className="h-[72px] w-[72px] shrink-0 object-contain"
              />
              <div className="max-w-[250px] pt-0.5">
                <h3 className="whitespace-pre-line text-[21px] font-bold leading-[1.18] text-conditions">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-conditions/85">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

  );
}

export function PersonalDataInfo() {
  return (
    <section className="bg-surface" aria-labelledby="personal-data-title">
      <div className="mx-auto grid max-w-6xl items-center gap-8 pb-14 md:grid-cols-[1.45fr_1fr] md:gap-20 md:px-5 md:py-[106px]">
        <div className="order-2 max-w-[610px] px-5 text-conditions md:order-1 md:px-0">
          <h2
            id="personal-data-title"
            className="max-w-[560px] text-[25px] font-bold leading-[1.3] md:text-[28px]"
          >
            Heizöl günstig einkaufen
          </h2>

          <div className="mt-8 space-y-4 text-[16px] leading-[1.5]">
            <p>
              <strong>Heizöl</strong> ist neben Gas der wichtigste Energieträger – besonders in der
              kalten Jahreszeit spielen die <strong>Heizölpreise</strong> eine große Rolle.
            </p>
            <p>
              Die Preise für Heizöl schwanken stark. Sie hängen ab vom <strong>Dollarkurs</strong>,
              der weltweiten <strong>Ölnachfrage</strong> und der politischen Lage in den
              ölfördernden Ländern.
            </p>
            <p>
              Deshalb lohnt es sich, das ganze Jahr über die Marktentwicklung zu beobachten und bei{" "}
              <strong>günstigen Preisen</strong> zuzugreifen.
            </p>
            <p>
              Vor einer Bestellung sollten Verbraucher die Angebote mit einem{" "}
              <strong>Heizölrechner vergleichen</strong> – denn auch zwischen den Händlern gibt es
              deutliche Unterschiede.
            </p>
          </div>
        </div>

        <img
          src={coupleOnCouch.url}
          alt="Ein Paar betrachtet gemeinsam ein Smartphone"
          width={400}
          height={400}
          loading="lazy"
          className="order-1 aspect-square w-full object-cover md:order-2 md:max-w-[400px] md:justify-self-end"
        />
      </div>
    </section>
  );
}

const OFFER_ADVANTAGES = [
  {
    icon: interestIcon.url,
    iconAlt: "Lupe mit Preisdiagramm",
    title: "Günstige Preise",
    text: "Sparen Sie durch den direkten Preisvergleich von über 300 Heizölhändlern aus Ihrer Region.",
  },
  {
    icon: neutralIcon.url,
    iconAlt: "Regionale Händler",
    title: "Regionale Händler",
    text: "Wir vergleichen nur Händler, die auch tatsächlich in Ihre Region liefern.",
  },
  {
    icon: freeIcon.url,
    iconAlt: "Kostenlose Preisanfrage",
    title: "Kostenlos &\nunverbindlich",
    text: "Es warten keine versteckten Kosten auf Sie und Sie können die Anfrage jederzeit widerrufen.",
  },
  {
    icon: dataSafetyIcon.url,
    iconAlt: "Geschützte Datenübertragung",
    title: "Datensicherheit",
    text: "Für eine sichere Übermittlung Ihrer persönlichen Daten sorgen unsere strengen Datenschutzrichtlinien.",
  },
];

export function MatchingOffers() {
  return (
    <section className="overflow-hidden bg-background" aria-labelledby="matching-offers-title">
      <div className="mx-auto grid max-w-6xl items-center gap-8 pt-0 md:h-[557px] md:grid-cols-[404px_1fr] md:gap-[74px] md:px-5 md:pt-8">
        <div className="order-1 h-[258px] w-full overflow-hidden md:contents">
          <img
            src={offerList.url}
            alt="Beispielhafte Heizöl-Angebote verschiedener Händler"
            width={404}
            height={575}
            loading="lazy"
            className="mx-auto w-full max-w-[404px] self-start md:order-1 md:-translate-x-[78px]"
          />
        </div>

        <div className="order-2 flex flex-col justify-center px-5 pb-10 pt-0 md:h-[557px] md:px-0 md:pb-14">
          <h2
            id="matching-offers-title"
            className="text-center text-[25px] font-bold leading-[1.25] text-conditions md:text-[28px]"
          >
             Mit Heizöl Austria zum günstigsten Heizölpreis
          </h2>

          <ul className="mt-8 grid gap-x-[72px] gap-y-8 sm:grid-cols-2 md:-ml-[94px] md:w-[calc(100%+94px)]">
            {OFFER_ADVANTAGES.map((advantage) => (
              <li key={advantage.title} className="flex items-start gap-3">
                <img
                  src={advantage.icon}
                  alt={advantage.iconAlt}
                  width={40}
                  height={40}
                  className="size-10 shrink-0 object-contain"
                />
                <div className="max-w-[280px] text-conditions">
                  <h3 className="whitespace-pre-line text-[21px] font-bold leading-[1.2]">
                    {advantage.title}
                  </h3>
                  <p className="mt-1 text-[16px] leading-[1.5]">{advantage.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center md:mt-8">
            <Button asChild className="h-12 w-full max-w-[298px] text-[13px] font-bold !text-white shadow-md">
              <Link to="/preisrechner">Jetzt Heizölpreise vergleichen</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}



const HEIZOEL_ROWS: { label: string; info: string; standard: boolean; premium: boolean }[] = [
  {
    label: "mit anderen Heizölsorten mischbar",
    info: "Mit anderen Ölsorten mischbar: Heizöl Standard und Premium lassen sich auch bei Restbeständen im Tank untereinander mischen. Mischbarkeit von Bioheizöl mit Heizöl Standard und Premium ist abhängig von Ihrer Heizanlage. Fragen Sie im Zweifelsfall den Hersteller Ihres Heizgerätes.",
    standard: true,
    premium: true,
  },
  {
    label: "für alle Ölheizungen geeignet",
    info: "Für alle Ölheizungen geeignet: Einsatz für alle Ölheizungen inkl. Brennwerttechnik.",
    standard: true,
    premium: true,
  },
  {
    label: "geringerer Verbrauch",
    info: "Reduzierter Verbrauch: Nahezu rückstandfreie Verbrennung führt zu höherer Effizienz und dadurch Reduzierung des Ölverbrauchs, verhindert Ablagerungen und sorgt so für eine bessere Wärme- bzw. Energieausbeute. Es bildet sich weniger Ruß und somit werden die Umwelt-Emissionen gesenkt.",
    standard: false,
    premium: true,
  },
  {
    label: "angenehmer Geruch",
    info: "Angenehmer Geruch: Geruchszusätze neutralisieren den typischen Ölgeruch und sorgen für angenehmen Duft, sowohl während der Betankung als auch im Regelbetrieb der Heizung.",
    standard: false,
    premium: true,
  },
  {
    label: "verbesserte Lagerfähigkeit",
    info: "Höhere Lagerstabilität des Heizöls: Stabilitätsverbesserer verhindern die Bildung von Sedimenten, Ablagerungen und Schlamm und verlangsamen somit die natürliche Alterung des Öls und machen es länger lagerfähig.",
    standard: false,
    premium: true,
  },
  {
    label: "höhere Betriebssicherheit & Lebenszeit der Heizungsanlage",
    info: "Höhere Betriebssicherheit & Lebenszeit der Heizung: Die Minimierung von Ablagerungen und Ruß reduziert nicht nur den Verbrauch, sondern schützt auch vor störungsbedingten Ausfällen. Spezielle Additive unterbinden beispielsweise die Rostbildung im Brennersystem. Eine erhöhte Schmierfähigkeit schützt die Förderpumpe. Insgesamt erhöht dies die Nutzungsdauer, schützt vor teuren Reparaturen und senkt den Wartungsaufwand.",
    standard: false,
    premium: true,
  },
  {
    label: "umweltschonende Biokomponenten",
    info: "Schwefelarmes Heizöl: Enthält Komponenten aus nachwachsenden Rohstoffen, meist durch Beimischung von Rapsöl oder anderen veresterten Pflanzenölen. Hierdurch wird eine Reduzierung der CO2-Emissionen erreicht.",
    standard: false,
    premium: false,
  },
];

function Mark({ yes }: { yes: boolean }) {
  return yes ? (
    <Check className="h-5 w-5 text-brand" strokeWidth={3} aria-label="Ja" />
  ) : (
    <X className="h-5 w-5 text-muted-foreground" strokeWidth={3} aria-label="Nein" />
  );
}

const dropGreen = { url: "/img/drop-green.png" };
const dropBrown = { url: "/img/drop-brown.png" };

function InfoCell({ info, label }: { info: string; label: string }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setPinned(false);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Info: ${label}`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => {
            if (!pinned) setOpen(false);
          }}
          onClick={(e) => {
            e.preventDefault();
            if (pinned) {
              setPinned(false);
              setOpen(false);
            } else {
              setPinned(true);
              setOpen(true);
            }
          }}
          className="mx-auto flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-conditions"
        >
          <Info className="h-[18px] w-[18px]" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          if (!pinned) setOpen(false);
        }}
        className="max-w-[320px] text-left text-[13px] leading-relaxed text-conditions"
      >
        <p className="mb-1.5 text-[14px] font-semibold text-ink">{label}</p>
        {info}
      </PopoverContent>
    </Popover>
  );
}

const GRID =
  "grid grid-cols-[minmax(0,1fr)_32px_68px_68px] gap-1 md:grid-cols-[1fr_60px_220px_220px] md:gap-2";

export function HeizoelSorten() {
  return (
    <section id="heizoelsorten" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-[1283px] px-5 py-16 md:py-20">
        <p className="text-center text-[11px] font-light uppercase tracking-[0.2em] text-muted-custom">
          Welches Heizöl brauche ich?
        </p>
        <h2 className="mt-3 text-center text-[28px] font-bold leading-[1.2] text-conditions md:text-[34px]">
          Heizölsorten im Überblick
        </h2>

        <div className="mt-10 overflow-hidden rounded-xl border border-line bg-card shadow-sm">
          {/* Kopfzeile */}
          <div className={`${GRID} items-end border-b border-line bg-muted/40 px-5 py-4 md:px-8 md:py-5`}>
            <div />
            <div />
            <div className="text-center">
              <p className="text-[12px] font-bold leading-tight text-conditions md:text-[15px]">
                Heizöl Standard
              </p>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] md:text-xs" style={{ color: "#7AB616" }}>
                <img src={dropGreen.url} alt="" className="h-3.5 w-3.5 object-contain" /> Das Günstige
              </p>
            </div>
            <div className="text-center">
              <p className="text-[12px] font-bold leading-tight text-conditions md:text-[15px]">
                Heizöl Premium
              </p>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] md:text-xs" style={{ color: "#A0522D" }}>
                <img src={dropBrown.url} alt="" className="h-3.5 w-3.5 object-contain" /> Das Sparsame
              </p>
            </div>
          </div>

          {HEIZOEL_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`${GRID} items-center px-5 py-4 md:px-8 md:py-5 ${i > 0 ? "border-t border-line" : ""}`}
            >
              <p className="text-[13px] font-semibold leading-snug text-conditions md:text-[15px]">
                {row.label}
              </p>
              <InfoCell info={row.info} label={row.label} />
              <div className="flex justify-center">
                <Mark yes={row.standard} />
              </div>
              <div className="flex justify-center">
                <Mark yes={row.premium} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const TRUST_CARDS = [
  {
    title: "Heizöl günstig bestellen – so einfach geht's",
    links: [
      { label: "Heizöl Preisvergleich", href: "/preisrechner" },
      { label: "Aktuelle Heizölpreise", href: "/preisrechner" },
      { label: "Heizöl EL Standard", href: "/preisrechner" },
      { label: "Premium-Heizöl", href: "/preisrechner" },
    ],
  },
  {
    title: "Der richtige Zeitpunkt für Ihre Bestellung",
    links: [
      { label: "Preisentwicklung", href: "/faq" },
      { label: "Heizöl im Sommer kaufen", href: "/faq" },
      { label: "Sammelbestellungen", href: "/faq" },
      { label: "Preisgarantie", href: "/faq" },
    ],
  },
  {
    title: "Lieferung und Zahlung im Überblick",
    links: [
      { label: "Lieferzeiten", href: "/lieferung-zahlung" },
      { label: "Expresslieferung", href: "/lieferung-zahlung" },
      { label: "Zahlungsarten", href: "/lieferung-zahlung" },
      { label: "Mindestbestellmenge", href: "/lieferung-zahlung" },
    ],
  },
  {
    title: "Heizöl-Wissen für Ihr Zuhause",
    links: [
      { label: "Sorten im Vergleich", href: "/heizoel-wissen#sorten" },
      { label: "Tank richtig pflegen", href: "/heizoel-wissen#tank" },
      { label: "Verbrauch senken", href: "/heizoel-wissen#verbrauch" },
      { label: "Heizöl-Glossar", href: "/heizoel-wissen#glossar" },
    ],
  },
  {
    title: "Ihr Wegweiser zu Preisen, Händlern und Beratung",
    links: [
      { label: "Preisrechner", href: "/preisrechner" },
      { label: "Händler in Ihrer Region", href: "/preisrechner" },
      { label: "Beratung", href: "/kontakt" },
      { label: "Häufige Fragen", href: "/faq" },
    ],
  },
];



export function TrustLinks() {
  return (
    <section aria-label="Weitere Heizöl-Themen" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="pr-4">
            <h2 className="text-[26px] font-bold leading-[1.25] text-conditions">
              Vertrauen Sie auf Heizöl Austria – Ihr Heizöl-Preisvergleich
            </h2>
            <p className="mt-5 text-[15px] leading-[1.6] text-conditions">
              Entdecken Sie jetzt weitere Themen und Vergleichsmöglichkeiten rund um
              Heizöl, Lieferung und den besten Preis für Ihre Region.
            </p>
          </div>

          {TRUST_CARDS.map((card) => (
            <div key={card.title} className="rounded-sm bg-background px-6 py-6">
              <p className="text-[15px] leading-[1.45] text-footer-text">{card.title}</p>
              <ul className="mt-5 space-y-3">
                {card.links.map((l) => {
                  const hashIndex = l.href.indexOf("#");
                  const path = hashIndex === -1 ? l.href : l.href.slice(0, hashIndex);
                  const hash = hashIndex === -1 ? undefined : l.href.slice(hashIndex + 1);
                  return (
                  <li key={l.label}>
                    <Link
                      to={path}
                      hash={hash ?? ""}
                      className="group flex items-start gap-3 text-[15px] font-semibold text-brand-deep hover:underline"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="mt-[3px] h-4 w-4 shrink-0 text-brand"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                      <span>{l.label}</span>
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const FOOTER_SERVICES = [
  { label: "Hilfe", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Bewertungen", href: "/bewertungen" },
  { label: "Lieferung & Zahlung", href: "/lieferung-zahlung" },
];

const FOOTER_RECHTLICHES = [
  { label: "AGB", href: "/agb" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Cookie-Einstellungen", href: "/cookie-einstellungen" },
  { label: "Widerruf", href: "/widerruf" },
];



function FooterLinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((l) => {
        const isInternal = l.href.startsWith("/") && !l.href.startsWith("//");
        return (
          <li key={l.label}>
            {isInternal ? (
              <Link
                to={l.href}
                className="inline-block text-[13px] leading-5 text-footer-text hover:underline"
              >
                {l.label}
              </Link>
            ) : (
              <a href={l.href} className="text-[13px] leading-5 text-footer-text hover:underline">
                {l.label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <>
      <CitySeo />

      <footer className="border-t border-line bg-card text-ink">
      <div className="mx-auto max-w-[1283px] px-5 py-10 md:px-[66px] md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.25fr_0.9fr_0.9fr_1.15fr] md:gap-10">
          <div>
            <Link to="/" aria-label="Heizöl Austria Startseite" className="inline-block text-ink">
              <Logo />
            </Link>
            <p className="mt-3 max-w-[280px] text-[13px] leading-[1.5] text-footer-text">
              Heizöl online günstig bestellen. Tagesaktuelle Preise, österreichweite Lieferung,
              deutsches Heizöl für Österreich.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:contents">
            <nav aria-label="Services">
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
                Services
              </h4>
              <FooterLinkList items={FOOTER_SERVICES} />
            </nav>

            <nav aria-label="Rechtliches">
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
                Rechtliches
              </h4>
              <FooterLinkList items={FOOTER_RECHTLICHES} />
            </nav>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
              Zahlungsarten
            </h4>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <img
                src={barzahlungAsset.url}
                alt="Barzahlung"
                className="h-10 w-auto object-contain md:h-12"
                loading="lazy"
              />
              <img
                src={vorauskasseAsset.url}
                alt="Vorauskasse"
                className="h-10 w-auto object-contain md:h-12"
                loading="lazy"
              />
              <img
                src={ecKarteAsset.url}
                alt="EC-Karte"
                className="h-10 w-auto object-contain md:h-12"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1283px] flex-col gap-2 px-5 py-4 text-[12px] text-footer-text md:flex-row md:items-center md:justify-between md:px-[66px]">
        <p>© 2026 Demovero GmbH | heizoel-austria.at</p>
        <div className="flex gap-5">
          <Link to="/impressum" className="hover:underline">
            Impressum
          </Link>
          <Link to="/datenschutz" className="hover:underline">
            Datenschutz
          </Link>
          <Link to="/agb" className="hover:underline">
            AGB
          </Link>
        </div>
      </div>
      </footer>
    </>
  );
}


export function ReferralBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Freunde werben" className="relative bg-white">
      <div className="hidden md:block">
        <div className={`${compact ? "h-[60px]" : "h-[150px]"} bg-white`} />
        <div className="relative bg-surface">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-0 px-5">
            <div className="relative">
              <img
                src={heizoelHero.url}
                 alt="Beraterin von Heizöl Austria mit Tablet"
                loading="lazy"
                decoding="async"
                className="absolute bottom-0 left-[40px] h-[350px] w-auto object-contain object-bottom"
              />
            </div>
            <div className="-ml-32 flex min-h-[290px] flex-col justify-center py-10">
              <h2 className="text-[26px] font-bold leading-tight text-conditions">
                Jetzt Heizöl günstiger bestellen!
              </h2>
              <p className="mt-5 max-w-[540px] text-[15px] leading-[1.7] text-muted-custom">
                Vergleichen Sie den Preis für deutsches Heizöl an Ihrer österreichischen Lieferadresse.
              </p>
              <div className="mt-7">
                <Button asChild className="h-12 w-full max-w-[250px] text-[13px] font-bold !text-white shadow-md">
                  <Link to="/preisrechner">Heizölpreis berechnen</Link>
                </Button>
              </div>
              <p className="mt-4 max-w-[540px] text-[13px] leading-[1.6] text-muted-custom/70">
                Keine Anmeldung nötig • Sofortiger Preisvergleich • Preis für Ihre PLZ berechnen
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className={`flex justify-center bg-white ${compact ? "pt-2" : "pt-6"}`}>
          <img
            src={heizoelHero.url}
             alt="Beraterin von Heizöl Austria mit Tablet"
            loading="lazy"
            decoding="async"
            className="h-[240px] w-auto object-contain"
          />
        </div>
        <div className="-mt-[120px] bg-surface px-5 pb-10 pt-[132px] text-center">
          <h2 className="text-[22px] font-bold leading-tight text-conditions">
            Jetzt Heizöl günstiger bestellen!
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-muted-custom">
            Vergleichen Sie den Preis für deutsches Heizöl an Ihrer österreichischen Lieferadresse.
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="h-12 w-full max-w-[280px] text-[13px] font-bold !text-white shadow-md">
              <Link to="/preisrechner">Heizölpreis berechnen</Link>
            </Button>
          </div>
          <p className="mt-4 px-2 text-[13px] leading-[1.6] text-muted-custom/70">
            Keine Anmeldung nötig • Sofortiger Preisvergleich • Preis für Ihre PLZ berechnen
          </p>
        </div>
      </div>
    </section>
  );
}

export function HeizoelServiceIntro() {
  return (
    <section className="bg-white" aria-labelledby="heizoel-service-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2
          id="heizoel-service-title"
          className="text-center text-[25px] font-bold leading-[1.25] text-conditions md:text-[30px]"
        >
          Heizölpreise heute & Heizöl online bestellen
        </h2>
        <div className="mx-auto mt-8 max-w-[920px] space-y-5 text-[16px] leading-[1.65] text-conditions">
          <p>
            Heizöl Austria bietet deutsches Heizöl für Kundinnen und Kunden in Österreich an.
            Geben Sie Ihre österreichische Postleitzahl und Liefermenge ein, um Ihren Preis zu berechnen.
            Deutsches Heizöl kann dabei günstiger sein; maßgeblich ist stets der angezeigte Endpreis.
          </p>
          <p>
            Vergleichen Sie den Preis für Ihre Adresse und Ihre gewünschte Menge. Vor dem Abschluss
            sehen Sie den Gesamtpreis, die Lieferbedingungen und die angebotenen Zahlungsarten.
          </p>
          <p>
            Heizöl bestellen war noch nie so einfach: PLZ und Menge eingeben, Preis vergleichen, online bestellen —
            ohne Registrierung in <strong>2 Minuten</strong>. Wir bieten sowohl{" "}
            <strong>Heizöl Standard</strong> (günstige Basisvariante) als auch <strong>Heizöl Premium</strong> (mit
            Additiven für geringeren Verbrauch und längere Lagerfähigkeit). Alle Preise sind{" "}
            <strong>Endpreise inklusive MwSt. und Lieferung</strong> — angegeben in <strong>€/100L</strong>.
          </p>
          <p>
            Die verfügbaren Zahlungsarten und Liefertermine werden Ihnen bei der Bestellung angezeigt.
            heizoel-austria.at — deutsches Heizöl für Österreich.
          </p>
        </div>
      </div>
    </section>
  );
}

const REGIONAL_BUTTONS: { label: string; state: string }[] = [
  { label: "Heizölpreise Burgenland", state: "burgenland" },
  { label: "Heizölpreise Kärnten", state: "kaernten" },
  { label: "Heizölpreise Niederösterreich", state: "niederoesterreich" },
  { label: "Heizölpreise Oberösterreich", state: "oberoesterreich" },
  { label: "Heizölpreise Salzburg", state: "salzburg" },
  { label: "Heizölpreise Steiermark", state: "steiermark" },
  { label: "Heizölpreise Tirol", state: "tirol" },
  { label: "Heizölpreise Vorarlberg", state: "vorarlberg" },
  { label: "Heizölpreise Wien", state: "wien" },
];

export function RegionalSeo() {
  return (
    <section className="bg-white" aria-labelledby="regional-seo-title">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-custom">
            Heizölpreise nach Region
          </p>
          <h2
            id="regional-seo-title"
            className="mt-2 text-[20px] font-semibold leading-[1.25] text-conditions md:text-[24px]"
          >
            Heizöl in Ihrem Bundesland bestellen
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[13px] leading-[1.7] text-muted-custom">
            Tagesaktuelle Heizölpreise für alle 9 Bundesländer — Lieferung österreichweit, Festpreisgarantie.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
          {REGIONAL_BUTTONS.map((item) => (
            <Link
              key={item.label}
              to="/heizoelpreise/bundesland/$state"
              params={{ state: item.state }}
              title={item.label}
              className="rounded-lg border border-line bg-card px-3.5 py-2.5 text-left text-[13px] font-medium leading-snug text-conditions transition-colors hover:border-brand hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const CITY_LINKS: { label: string; city: string }[] = [
  { label: "Heizölpreise Wien", city: "wien-wien" },
  { label: "Heizölpreise Graz", city: "graz-steiermark" },
  { label: "Heizölpreise Linz", city: "linz-oberoesterreich" },
  { label: "Heizölpreise Salzburg", city: "salzburg-salzburg" },
  { label: "Heizölpreise Innsbruck", city: "innsbruck-tirol" },
  { label: "Heizölpreise Klagenfurt", city: "klagenfurt-am-woerthersee-kaernten" },
  { label: "Heizölpreise St. Pölten", city: "sankt-poelten-niederoesterreich" },
  { label: "Heizölpreise Bregenz", city: "bregenz-vorarlberg" },
  { label: "Heizölpreise Eisenstadt", city: "eisenstadt-burgenland" },
];

const STATE_LINKS: { label: string; state: string }[] = [
  { label: "Heizölpreise Burgenland", state: "burgenland" },
  { label: "Heizölpreise Kärnten", state: "kaernten" },
  { label: "Heizölpreise Niederösterreich", state: "niederoesterreich" },
  { label: "Heizölpreise Oberösterreich", state: "oberoesterreich" },
  { label: "Heizölpreise Salzburg", state: "salzburg" },
  { label: "Heizölpreise Steiermark", state: "steiermark" },
  { label: "Heizölpreise Tirol", state: "tirol" },
  { label: "Heizölpreise Vorarlberg", state: "vorarlberg" },
  { label: "Heizölpreise Wien", state: "wien" },
];

const seoLinkClass =
  "block text-left text-[12px] leading-snug text-conditions transition-colors hover:text-brand md:text-[13px]";

function SeoLinkGrid({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 first:mt-0">
      {title ? (
        <h3 className="text-left text-[16px] font-semibold leading-[1.3] text-conditions md:text-[18px]">
          {title}
        </h3>
      ) : null}
      <div className={`grid grid-cols-2 gap-x-4 ${title ? "mt-4" : "mt-6"} gap-y-2 md:grid-cols-4`}>
        {children}
      </div>
    </div>
  );
}

export function CitySeo() {
  return (
    <section className="bg-surface" aria-labelledby="city-seo-title">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <h2
          id="city-seo-title"
          className="text-left text-[20px] font-semibold leading-[1.25] text-conditions md:text-[24px]"
        >
          Heizöl &amp; Heizölpreise in österreichischen Orten
        </h2>
        <SeoLinkGrid title="">
          {CITY_LINKS.map((item) => (
            <Link
              key={item.label}
              to="/heizoelpreise/$city"
              params={{ city: item.city }}
              title={item.label}
              className={seoLinkClass}
            >
              {item.label}
            </Link>
          ))}
        </SeoLinkGrid>
        <SeoLinkGrid title="Heizölpreise nach Bundesland">
          {STATE_LINKS.map((item) => (
            <Link
              key={item.label}
              to="/heizoelpreise/bundesland/$state"
              params={{ state: item.state }}
              title={item.label}
              className={seoLinkClass}
            >
              {item.label}
            </Link>
          ))}
        </SeoLinkGrid>
      </div>
    </section>
  );
}
