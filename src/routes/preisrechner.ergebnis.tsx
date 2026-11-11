import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  BadgePercent,
  Check,
  CheckCircle2,
  ChevronDown,
  Lock,
  ShieldCheck,
  ThumbsUp,
  Truck,
  X,
} from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/sections";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const rechnung = { url: "/img/rechnung.png" };
const barzahlung = { url: "/img/barzahlung.png" };
const ecKarte = { url: "/img/ec-karte.png" };
const dropGreen = { url: "/img/drop-green.png" };
import { lookupPlzCity } from "@/lib/plz-city";
import { saveOrderDraft } from "@/lib/order-draft";
import { trackPixelEvent } from "@/lib/meta-pixel";


const TITLE = "Ihr persönliches Heizölangebot | Heizöl Austria";
const DESCRIPTION =
  "Ihr persönliches Heizölangebot: Heizöl Standard ab 128,78 €/100L und Premium ab 133,16 €/100L — inkl. Lieferung und 20 % MwSt., Lieferung österreichweit.";

export const Route = createFileRoute("/preisrechner/ergebnis")({
  validateSearch: (search: Record<string, unknown>) => {
    const menge = Number(search['menge']);
    const abladestellen = Number(search['abladestellen']);
    return {
      plz: String(search['plz'] ?? "").replace(/\D/g, "").slice(0, 4),
      menge: Number.isFinite(menge) && menge > 0 ? Math.min(32000, Math.max(1500, menge)) : 3000,
      abladestellen:
        Number.isFinite(abladestellen) && abladestellen > 0 ? Math.min(10, abladestellen) : 1,
    };
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { name: "googlebot", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/preisrechner/ergebnis" }],
  }),
  component: ErgebnisPage,
});

const PRICE_STANDARD = 128.78;
const PRICE_PREMIUM = 133.16;

const HOSE_OPTIONS = ["bis 40 m", "bis 60 m", "bis 80 m"];
const TRUCK_OPTIONS = [
  "egal (auch mit Hänger)",
  "max. 26 t / 2,60 m breit",
  "max. 18 t / 2,55 m breit",
  "max. 10 t / 2,30 m breit",
];
const DELIVERY_POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const COMPARE_ROWS = [
  { label: "Für alle Ölheizungen", standard: true, premium: true },
  { label: "Mischbar mit anderen Sorten", standard: true, premium: true },
  { label: "Geringerer Verbrauch (~5 %)", standard: false, premium: true },
  { label: "Angenehmer Geruch", standard: false, premium: true },
  { label: "Bessere Lagerfähigkeit", standard: false, premium: true },
  { label: "Schützt die Heizung", standard: false, premium: true },
];

const PAYMENTS = [
  { label: "EC-Karte", img: ecKarte.url },
  { label: "Bar", img: barzahlung.url },
  { label: "Rechnung", img: rechnung.url },
];

const ADVANTAGES = [
  {
    icon: BadgePercent,
    title: "Garantiert günstigste Preise",
    text: "Direkter Handel ohne Zwischenhändler-Aufschläge.",
  },
  {
    icon: Truck,
    title: "Österreichweite Lieferung inklusive",
    text: "Alle Lieferkosten sind bereits im Preis enthalten.",
  },
  {
    icon: ShieldCheck,
    title: "100 % Käuferschutz garantiert",
    text: "Ihre Bestellung ist durch unsere Liefergarantie abgesichert.",
  },
  {
    icon: Lock,
    title: "SSL-verschlüsselt & DSGVO-konform",
    text: "Keine Weitergabe Ihrer Daten an Dritte.",
  },
];

const fmtEuro = (v: number) =>
  v.toLocaleString("de-AT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtLiters = (v: number) => v.toLocaleString("de-AT");

const fieldClass =
  "mt-1.5 rounded-md border border-line bg-background px-3 py-3 text-[14px] text-hero-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:px-4";

function ErgebnisPage() {
  const search = Route.useSearch();

  // Confirmed values (drive pricing)
  const [plz, setPlz] = useState(search.plz);
  const [liters, setLiters] = useState(search.menge);
  const [points, setPoints] = useState(search.abladestellen);
  const [hose, setHose] = useState(HOSE_OPTIONS[0]!);
  const [truck, setTruck] = useState(TRUCK_OPTIONS[0]!);

  const [editing, setEditing] = useState(false);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setCity(null);
    void lookupPlzCity(plz).then((c) => {
      if (active) setCity(c);
    });
    return () => {
      active = false;
    };
  }, [plz]);

  const plzLabel = plz ? (city ? `${plz} ${city}` : plz) : "—";

  const [variant, setVariant] = useState<"standard" | "premium">("standard");
  const [compareOpen, setCompareOpen] = useState(false);
  const [stand, setStand] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryIso, setDeliveryIso] = useState("");

  useEffect(() => {
    const now = new Date();
    setStand(
      `${now.toLocaleDateString("de-AT")}, ${now.toLocaleTimeString("de-AT", {
        hour: "2-digit",
        minute: "2-digit",
      })} Uhr`,
    );
    const d = new Date();
    d.setDate(d.getDate() + 7);
    setDeliveryDate(d.toLocaleDateString("de-AT"));
    setDeliveryIso(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
  }, []);


  const price = variant === "premium" ? PRICE_PREMIUM : PRICE_STANDARD;
  const total = useMemo(() => (liters / 100) * price, [liters, price]);

  const toggleEditing = () => setEditing((v) => !v);

  const navigate = useNavigate();

  const goToOrder = () => {
    trackPixelEvent("Lead", { content_name: "ZurBestellung" });
    saveOrderDraft({
      plz,
      city,
      liters,
      points,
      hose,
      truck,
      earliestDate: deliveryIso,
      variant,
      pricePer100: price,
      total,
    });
    void navigate({ to: "/bestellen" });
  };



  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main className="py-6 md:py-8">
        <div className="mx-auto max-w-xl px-4">
          {/* Kopf: Titel + Stand-Badge */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-[24px] font-bold leading-[1.25] text-conditions md:text-[28px]">
              Ihr persönliches Heizölangebot
            </h1>
            <p className="inline-flex shrink-0 items-center self-start rounded-md bg-ink px-2.5 py-1.5 text-[12px] font-semibold text-white sm:self-auto">
              Stand: {stand || "—"}
            </p>
          </div>

          {/* Lieferdaten */}
          <div className="mt-5 rounded-xl border border-line bg-background px-4 py-3.5 shadow-card md:px-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <p className="text-[14px] font-bold text-ink md:text-[15px]">
                {plzLabel}
                <span className="mx-2 font-normal text-muted-custom">·</span>
                {fmtLiters(liters)} L
                <span className="mx-2 font-normal text-muted-custom">·</span>
                ab {deliveryDate || "—"}
              </p>
              <button
                type="button"
                onClick={toggleEditing}
                className="shrink-0 text-[13px] font-semibold text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
              >
                {editing ? "schließen" : "ändern"}
              </button>
            </div>

            {editing && (
              <div className="mt-3 border-t border-line pt-2.5">
                 <div className="flex flex-col gap-2 border-b border-line py-2.5 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
                  <span className="text-[13px] font-medium text-hero-text">PLZ</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-ink">{plzLabel}</span>
                    <Link
                      to="/preisrechner"
                      className="text-[13px] font-normal text-muted-custom underline underline-offset-4 transition-colors hover:text-ink"
                    >
                      ändern
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-line py-1.5">
                  <span className="text-[13px] font-medium text-hero-text">Liefermenge</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-ink">{fmtLiters(liters)} Liter</span>
                    <Link
                      to="/preisrechner"
                      className="text-[13px] font-normal text-muted-custom underline underline-offset-4 transition-colors hover:text-ink"
                    >
                      ändern
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-line py-1.5">
                  <span className="text-[13px] font-medium text-hero-text">Lieferstellen</span>
                  <Select value={String(points)} onValueChange={(v) => setPoints(Number(v))}>
                     <SelectTrigger className={`${fieldClass} h-11 w-full py-2 focus:ring-0 min-[390px]:w-auto min-[390px]:min-w-[140px]`}>
                      <SelectValue placeholder="Abladestellen wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {DELIVERY_POINTS.map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} Lieferstelle{n === 1 ? "" : "n"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="flex flex-col gap-2 border-b border-line py-2.5 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
                  <span className="text-[13px] font-medium text-hero-text">Schlauch</span>
                  <Select value={hose} onValueChange={setHose}>
                     <SelectTrigger className={`${fieldClass} h-11 w-full py-2 focus:ring-0 min-[390px]:w-auto min-[390px]:min-w-[140px]`}>
                      <SelectValue placeholder="Schlauchlänge wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {HOSE_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="flex flex-col gap-2 border-b border-line py-2.5 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
                  <span className="text-[13px] font-medium text-hero-text">Tankwagen</span>
                  <Select value={truck} onValueChange={setTruck}>
                     <SelectTrigger className={`${fieldClass} h-11 w-full py-2 focus:ring-0 min-[390px]:w-auto min-[390px]:min-w-[220px]`}>
                      <SelectValue placeholder="Tankwagen wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRUCK_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="flex flex-col gap-1 py-2.5 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
                  <span className="text-[13px] font-medium text-hero-text">Frühestens lieferbar ab</span>
                  <span className="text-[14px] font-semibold text-brand">{deliveryDate || "—"}</span>
                </div>
              </div>
            )}
          </div>

          {/* Angebots-Card */}
          <div className="mt-4 overflow-hidden rounded-xl border border-line bg-background shadow-card">
            {/* Tabs */}
            <div className="grid grid-cols-2 border-b border-line">
              {(
                [
                  { id: "standard", label: "Standard", sub: "Das Günstige" },
                  { id: "premium", label: "Premium", sub: "Das Sparsame" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setVariant(t.id)}
                  aria-pressed={variant === t.id}
                   className={`flex min-w-0 flex-wrap items-center justify-center gap-1.5 px-2 py-3.5 text-center transition-colors sm:gap-2 sm:px-3 ${
                    variant === t.id
                      ? "border-b-[3px] border-b-brand bg-background text-conditions"
                      : "border-b-[3px] border-b-transparent bg-surface text-muted-custom hover:text-ink"
                  }`}
                >
                  <img
                    src={dropGreen.url}
                    alt=""
                    className={`h-4 w-4 shrink-0 object-contain transition-all ${
                      variant === t.id ? "" : "grayscale opacity-60"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="text-[14px] font-bold leading-tight">{t.label}</span>
                  <span className="hidden text-[12px] font-normal sm:inline">{t.sub}</span>
                  {t.id === "premium" ? (
                    <span className="rounded-sm bg-[#f5b301] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink">
                      Empfohlen
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            {/* Beschreibung */}
            <p className="border-b border-line px-5 py-3.5 text-[13px] leading-[1.7] text-muted-custom">
              {variant === "premium"
                ? "Heizöl Premium mit Additiven — für ca. 5 % niedrigeren Verbrauch und längere Lagerfähigkeit."
                : "Heizöl Standard (DIN 51603-1) — geeignet für alle Ölheizungen."}
            </p>

            {/* Preise */}
            <div className="grid grid-cols-2 gap-4 border-b border-line px-5 py-4">
              <div>
                <p className="text-[12px] text-muted-custom">Preis pro 100 Liter</p>
                <p className="mt-1 text-[20px] font-bold leading-none text-conditions md:text-[22px]">
                  {fmtEuro(price)} €
                </p>
              </div>
              <div className="text-right">
                <p className="text-[12px] text-muted-custom">Gesamtpreis inkl. Lieferung</p>
                <p className="mt-1 text-[20px] font-bold leading-none text-conditions md:text-[22px]">
                  {fmtEuro(total)} €
                </p>
                <p className="mt-1 text-[11px] text-muted-custom">inkl. 20 % MwSt.</p>
              </div>
            </div>

            {/* Direktpreis-Hinweis */}
            <p className="flex items-center justify-center gap-1.5 border-b border-line px-5 py-3 text-[13px] font-semibold text-brand">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Direktpreis ohne Zwischenhändler — inkl. Lieferung
            </p>

            {/* Lieferung + Zahlungsarten */}
            <div className="grid gap-4 border-b border-line px-5 py-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-custom">
                  Lieferung
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                  <CheckCircle2 className="h-4 w-4 text-brand" aria-hidden="true" />
                  ab {deliveryDate || "—"}
                </p>
                <p className="mt-0.5 text-[12px] text-muted-custom">Österreichweit</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-custom">
                  Zahlungsarten
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {PAYMENTS.map((p) => (
                    <li
                      key={p.label}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1"
                    >
                      <img
                        src={p.img}
                        alt={p.label}
                        className="h-4 w-auto object-contain"
                        loading="lazy"
                      />
                      <span className="text-[11px] font-medium text-ink">{p.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="border-b border-line px-5 py-5">
              <button
                type="button"
                onClick={goToOrder}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-brand px-5 py-4 text-[16px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Zur Bestellung »
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-muted-custom">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                100 % sicher &amp; SSL-verschlüsselt
              </p>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setCompareOpen((v) => !v)}
                  aria-expanded={compareOpen}
                  aria-controls="sorten-vergleich"
                  className="mx-auto flex items-center gap-1.5 text-[13px] font-semibold text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
                >
                  Sorten im Detail vergleichen
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${compareOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id="sorten-vergleich"
                  className={`grid transition-all duration-300 ease-out ${
                    compareOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                   <div className="overflow-x-auto">
                     <table className="w-full min-w-[360px] border-collapse text-left text-[13px]">
                      <thead>
                        <tr className="border-b border-line">
                          <th scope="col" className="py-2 pr-2 font-semibold text-ink">
                            <span className="sr-only">Merkmal</span>
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-2 text-center font-bold text-conditions"
                          >
                            Standard
                          </th>
                          <th
                            scope="col"
                            className="py-2 pl-2 text-center font-bold text-conditions"
                          >
                            Premium
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {COMPARE_ROWS.map((row) => (
                          <tr key={row.label} className="border-b border-line last:border-b-0">
                            <th scope="row" className="py-2.5 pr-2 font-normal text-ink">
                              {row.label}
                            </th>
                            <td className="px-2 py-2.5 text-center">
                              {row.standard ? (
                                <Check
                                  className="mx-auto h-4 w-4 text-brand"
                                  aria-label="Ja"
                                />
                              ) : (
                                <X
                                  className="mx-auto h-4 w-4 text-muted-custom"
                                  aria-label="Nein"
                                />
                              )}
                            </td>
                            <td className="py-2.5 pl-2 text-center">
                              {row.premium ? (
                                <Check
                                  className="mx-auto h-4 w-4 text-brand"
                                  aria-label="Ja"
                                />
                              ) : (
                                <X
                                  className="mx-auto h-4 w-4 text-muted-custom"
                                  aria-label="Nein"
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <p className="bg-surface px-5 py-2.5 text-center text-[11px] text-muted-custom">
              Lieferung durch Heizöl Austria oder einen regionalen Partnerhändler
            </p>
          </div>

          {/* Bindender Preis */}
          <div className="mt-4 rounded-xl bg-surface px-5 py-5 text-center shadow-card">
            <p className="text-[15px] font-bold text-conditions">Preis ist bindend bei Bestellung.</p>
            <p className="mt-1 text-[14px] font-semibold text-conditions">
              Es entstehen keine weiteren Kosten!
            </p>
          </div>

          {/* Ihre Vorteile */}
          <section className="mt-4 rounded-xl bg-surface px-5 py-5 shadow-card" aria-labelledby="vorteile-title">
            <h2
              id="vorteile-title"
              className="flex items-center gap-2 text-[16px] font-bold text-conditions"
            >
              <ThumbsUp className="h-4.5 w-4.5 text-brand" aria-hidden="true" />
              Ihre Vorteile
            </h2>
            <ul className="mt-4 space-y-4">
              {ADVANTAGES.map((a) => {
                const Icon = a.icon;
                return (
                  <li key={a.title} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <p className="text-[14px] font-bold text-ink">{a.title}</p>
                      <p className="mt-0.5 text-[13px] leading-[1.6] text-muted-custom">{a.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
