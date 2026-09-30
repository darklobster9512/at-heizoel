import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Lock,
  Mail,
  Phone,
  Truck,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  loadOrderDraft,
  saveOrderConfirmation,
  saveOrderDraft,
  type OrderDraft,
} from "@/lib/order-draft";
import { submitPanelOrder } from "@/lib/panel-orders";
import { createKlarnaSession, KlarnaAbortError, waitForKlarnaPayment } from "@/lib/klarna-pay";
import { ReviewCarousel, ReviewStars } from "@/components/landing/review-carousel";
const ekomi = { url: "/img/ekomi.webp" };
const trustedShops = { url: "/img/trusted-shops-icon.png" };
const googleIcon = { url: "/img/google-icon.webp" };
const vorauskasse = { url: "/img/vorauskasse.png" };
const barzahlung = { url: "/img/barzahlung.png" };
const ecKarte = { url: "/img/ec-karte.png" };

const TITLE = "Bestellung — Wunschtermin wählen | Heizöl Austria";
const DESCRIPTION =
  "Wählen Sie Ihren Wunschtermin für die Heizöllieferung: Vormittag oder Nachmittag, ohne Anmeldung, Lieferkosten inklusive.";

export const Route = createFileRoute("/bestellen")({
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
    links: [
      { rel: "canonical", href: "/bestellen" },
      { rel: "preload", as: "image", href: "/img/klarna.webp" },
    ],
  }),
  component: BestellenPage,
});

const fmtEuro = (v: number) =>
  v.toLocaleString("de-AT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtLiters = (v: number) => v.toLocaleString("de-AT");

type Salutation = "Herr" | "Frau" | "Firma";
const SALUTATIONS: Salutation[] = ["Herr", "Frau", "Firma"];

const PAYMENT_OPTIONS: { id: string; label: string; desc: string; icon: { url: string }; hint?: string; badge?: string }[] = [
  { id: "vorkasse", label: "Vorkasse", desc: "Bequem per Überweisung bezahlen.", icon: vorauskasse },
  { id: "bar", label: "Barzahlung", desc: "Direkt bei Lieferung bezahlen.", icon: barzahlung, hint: "50% Anzahlung sichert Tagespreis" },
  { id: "ec", label: "EC-Karte", desc: "Bei Lieferung mit Karte bezahlen.", icon: ecKarte, hint: "50% Anzahlung sichert Tagespreis" },
  { id: "klarna", label: "Klarna Sofortüberweisung", desc: "Sofort per Online-Banking bezahlen – sicher über Klarna.", icon: { url: "/img/klarna.webp" } },
  { id: "klarna-cc", label: "Kreditkarte", desc: "Sichere Zahlung per Kreditkarte – abgewickelt über Klarna.", icon: { url: "/img/klarna.webp" } },
  { id: "klarna-rechnung", label: "Rechnung – in 30 Tagen bezahlen", desc: "Bequem später zahlen – abgewickelt über Klarna.", icon: { url: "/img/klarna.webp" } },
];

const CHECKS = [
  "Bestellung ohne Anmeldung",
  "Lieferkosten enthalten",
  "Tagespreis garantiert",
  "Ihre Daten sind sicher verschlüsselt",
];

const KLARNA_LABELS: Record<string, string> = {
  klarna: "Klarna Sofortüberweisung",
  "klarna-cc": "Klarna Kreditkarte",
  "klarna-rechnung": "Klarna Rechnung (30 Tage)",
};
const isKlarna = (p: string) => p in KLARNA_LABELS;

interface AddressForm {
  salutation: Salutation;
  company?: string;
  firstName: string;
  lastName: string;
  street: string;
  streetNo: string;
  plz: string;
  city: string;
}

const emptyAddress = (plz = "", city = ""): AddressForm => ({
  salutation: "Herr",
  company: "",
  firstName: "",
  lastName: "",
  street: "",
  streetNo: "",
  plz,
  city,
});

function nextWorkday(d: Date): Date {
  const next = new Date(d);
  do {
    next.setDate(next.getDate() + 1);
  } while (next.getDay() === 0 || next.getDay() === 6);
  return next;
}

function toIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

const fieldClass = (invalid?: boolean) =>
  `h-11 w-full rounded-md border bg-background px-3 text-[14px] text-ink outline-none transition-colors placeholder:text-muted-custom focus:border-brand focus:ring-2 focus:ring-brand/20 ${
    invalid ? "border-red-500" : "border-line"
  }`;

function Field({
  label,
  required,
  error,
  children,
  className = "",
}: {
  label: React.ReactNode;
  required?: boolean | undefined;
  error?: string | undefined;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-[13px] font-bold text-conditions">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1 text-[12px] text-red-500">{error}</p> : null}
    </div>
  );
}

function SectionCard({
  icon,
  title,
  hint,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-line bg-background shadow-card">
      <div className="flex items-center gap-3 border-b border-line bg-brand/5 px-4 py-3.5">
        <span className="flex size-9 items-center justify-center rounded-md bg-brand text-white">
          {icon}
        </span>
        <h2 className="text-[16px] font-bold text-conditions">
          {title}
          {hint ? (
            <span className="ml-2 text-[13px] font-normal text-muted-custom">{hint}</span>
          ) : null}
        </h2>
      </div>
      <div className="px-4 py-4">{children}</div>
    </section>
  );
}

function AddressFields({
  value,
  onChange,
  errors,
  withSalutationButtons,
}: {
  value: AddressForm;
  onChange: (next: AddressForm) => void;
  errors: Record<string, string>;
  withSalutationButtons?: boolean;
}) {
  const set = (patch: Partial<AddressForm>) => onChange({ ...value, ...patch });
  return (
    <div className="grid gap-3">
      {withSalutationButtons ? (
        <div>
          <p className="mb-1 text-[13px] font-bold text-conditions">Anrede</p>
          <div className="grid grid-cols-3 gap-2">
            {SALUTATIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set({ salutation: s })}
                aria-pressed={value.salutation === s}
                className={`flex h-11 items-center justify-center gap-1.5 rounded-md border text-[14px] font-semibold transition-colors ${
                  value.salutation === s
                    ? "border-brand bg-brand/5 text-conditions ring-1 ring-brand"
                    : "border-line bg-background text-ink hover:border-brand/60"
                }`}
              >
                {value.salutation === s ? (
                  <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                ) : null}
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Field label="Anrede">
          <Select value={value.salutation} onValueChange={(v) => set({ salutation: v as Salutation })}>
            <SelectTrigger className="h-11 w-full rounded-md border border-line bg-background px-3 text-[14px] text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 [&>span]:line-clamp-1">
              <SelectValue placeholder="Anrede wählen" />
            </SelectTrigger>
            <SelectContent>
              {SALUTATIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
      {value.salutation === "Firma" ? (
        <Field label="Firmenname" required={withSalutationButtons} error={errors["company"]}>
          <input
            value={value.company ?? ""}
            onChange={(e) => set({ company: e.target.value })}
            placeholder="Firmenname"
            className={fieldClass(!!errors["company"])}
            autoComplete="organization"
          />
        </Field>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Vorname" required={withSalutationButtons} error={errors["firstName"]}>
          <input
            value={value.firstName}
            onChange={(e) => set({ firstName: e.target.value })}
            placeholder="Vorname"
            className={fieldClass(!!errors["firstName"])}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Nachname" required={withSalutationButtons} error={errors["lastName"]}>
          <input
            value={value.lastName}
            onChange={(e) => set({ lastName: e.target.value })}
            placeholder="Nachname"
            className={fieldClass(!!errors["lastName"])}
            autoComplete="family-name"
          />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
        <Field label="Straße" required={withSalutationButtons} error={errors["street"]}>
          <input
            value={value.street}
            onChange={(e) => set({ street: e.target.value })}
            placeholder="Straße"
            className={fieldClass(!!errors["street"])}
            autoComplete="street-address"
          />
        </Field>
        <Field label="Nr." required={withSalutationButtons} error={errors["streetNo"]}>
          <input
            value={value.streetNo}
            onChange={(e) => set({ streetNo: e.target.value })}
            placeholder="Nr."
            className={fieldClass(!!errors["streetNo"])}
          />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
        <Field label="PLZ" required={withSalutationButtons} error={errors["plz"]}>
          <input
            value={value.plz}
            onChange={(e) => set({ plz: e.target.value.replace(/\D/g, "").slice(0, 4) })}
            placeholder="PLZ"
            inputMode="numeric"
            className={fieldClass(!!errors["plz"])}
            autoComplete="postal-code"
          />
        </Field>
        <Field label="Ort" required={withSalutationButtons} error={errors["city"]}>
          <input
            value={value.city}
            onChange={(e) => set({ city: e.target.value })}
            placeholder="Ort"
            className={fieldClass(!!errors["city"])}
            autoComplete="address-level2"
          />
        </Field>
      </div>
    </div>
  );
}

function BestellenPage() {
  const [draft, setDraft] = useState<OrderDraft | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [slot, setSlot] = useState<{ date: string; period: "vormittag" | "nachmittag" | "telefon" } | null>(
    null,
  );
  const [step, setStep] = useState<1 | 2>(1);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState<AddressForm>(emptyAddress());
  const [billingDifferent, setBillingDifferent] = useState(false);
  const [billing, setBilling] = useState<AddressForm>(emptyAddress());
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("vorkasse");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [klarnaWaiting, setKlarnaWaiting] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const popupRef = useRef<Window | null>(null);
  const klarnaAbortRef = useRef<AbortController | null>(null);
  const klarnaUrlRef = useRef<string>("");

  useEffect(() => {
    const d = loadOrderDraft();
    setDraft(d);
    if (d) {
      setDelivery(emptyAddress(d.plz, d.city ?? ""));
      if (d.slot) setSlot(d.slot);
    }
    setLoaded(true);
  }, []);

  const days = useMemo(() => {
    if (!draft) return [];
    const base = new Date(`${draft.earliestDate}T00:00:00`);
    let cur = Number.isNaN(base.getTime()) ? new Date() : base;
    while (cur.getDay() === 0 || cur.getDay() === 6) cur = nextWorkday(cur);
    const list = [cur];
    for (let i = 0; i < 2; i++) list.push(nextWorkday(list[list.length - 1]!));
    return list.map((d) => ({
      iso: toIso(d),
      weekday: d.toLocaleDateString("de-AT", { weekday: "long" }),
      date: d.toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" }),
    }));
  }, [draft]);

  const select = (date: string, period: "vormittag" | "nachmittag" | "telefon") => {
    setSlot({ date, period });
    if (draft) saveOrderDraft({ ...draft, slot: { date, period } });
  };

  const proceed = () => {
    if (!slot) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const slotLabel = (() => {
    if (!slot) return "";
    if (slot.period === "telefon") return "Termin telefonisch vereinbaren";
    const day = days.find((d) => d.iso === slot.date);
    const period = slot.period === "vormittag" ? "Vormittag (8:00 - 12:00 Uhr)" : "Nachmittag (15:00 - 18:00 Uhr)";
    return day ? `${day.weekday}, ${day.date} · ${period}` : period;
  })();

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next["email"] = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    if (phone.trim().length < 5) next["phone"] = "Bitte geben Sie Ihre Telefonnummer ein.";
    if (delivery.salutation === "Firma") {
      if (!delivery.company?.trim()) next["company"] = "Bitte ausfüllen.";
    } else {
      if (!delivery.firstName.trim()) next["firstName"] = "Bitte ausfüllen.";
      if (!delivery.lastName.trim()) next["lastName"] = "Bitte ausfüllen.";
    }
    if (!delivery.street.trim()) next["street"] = "Bitte ausfüllen.";
    if (!delivery.streetNo.trim()) next["streetNo"] = "Bitte ausfüllen.";
    if (!/^\d{4}$/.test(delivery.plz)) next["plz"] = "4-stellige PLZ eingeben.";
    if (!delivery.city.trim()) next["city"] = "Bitte ausfüllen.";
    if (billingDifferent) {
      if (billing.salutation === "Firma") {
        if (!billing.company?.trim()) next["b_company"] = "Bitte ausfüllen.";
      } else {
        if (!billing.firstName.trim()) next["b_firstName"] = "Bitte ausfüllen.";
        if (!billing.lastName.trim()) next["b_lastName"] = "Bitte ausfüllen.";
      }
      if (!billing.street.trim()) next["b_street"] = "Bitte ausfüllen.";
      if (!billing.streetNo.trim()) next["b_streetNo"] = "Bitte ausfüllen.";
      if (!/^\d{4}$/.test(billing.plz)) next["b_plz"] = "4-stellige PLZ eingeben.";
      if (!billing.city.trim()) next["b_city"] = "Bitte ausfüllen.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }
    return true;
  };

  const openKlarnaPopup = (url: string) => {
    const w = window.open(url, "klarna", "width=600,height=860");
    popupRef.current = w;
    setPopupBlocked(!w);
    return w;
  };

  const cancelKlarna = () => {
    klarnaAbortRef.current?.abort();
    try {
      popupRef.current?.close();
    } catch {
      /* ignore */
    }
  };

  const submit = async () => {
    if (submitting) return;
    if (!validate() || !draft) return;
    setSubmitError(null);
    setSubmitting(true);
    let klarnaRef = "";
    try {
      if (isKlarna(payment)) {
        // Popup synchron beim Klick öffnen (sonst blockiert der Browser)
        const popup = openKlarnaPopup("about:blank");
        const session = await createKlarnaSession({ totalEuro: draft.total, email });
        klarnaUrlRef.current = session.checkoutUrl;
        if (popup && !popup.closed) popup.location.href = session.checkoutUrl;
        else openKlarnaPopup(session.checkoutUrl);
        const controller = new AbortController();
        klarnaAbortRef.current = controller;
        setKlarnaWaiting(true);
        await waitForKlarnaPayment(session, () => popupRef.current, controller.signal);
        try {
          popupRef.current?.close();
        } catch {
          /* ignore */
        }
        klarnaRef = session.sessionId;
      }
      const placedAt = new Date().toISOString();
      const orderNotes = klarnaRef
        ? `${notes.trim() ? `${notes.trim()}\n` : ""}${KLARNA_LABELS[payment]} bezahlt (Sitzung ${klarnaRef})`
        : notes;
      const result = await submitPanelOrder({
        draft,
        slot: slot ?? undefined,
        email,
        phone,
        delivery,
        billing: billingDifferent ? billing : undefined,
        notes: orderNotes,
        payment,
        placedAt,
      });
      saveOrderConfirmation({
        ...draft,
        ...(slot ? { slot } : {}),
        orderNo: result.orderNumber,
        email: email.trim(),
        phone: phone.trim(),
        delivery,
        ...(billingDifferent ? { billing } : {}),
        notes,
        payment,
        placedAt,
      });
      void navigate({ to: "/bestaetigung" });
    } catch (error) {
      if (isKlarna(payment) && !klarnaRef) {
        try {
          popupRef.current?.close();
        } catch {
          /* ignore */
        }
      }
      setSubmitError(
        error instanceof KlarnaAbortError
          ? `${error.message} Es wurde keine Bestellung angelegt – Ihre Eingaben bleiben erhalten.`
          : error instanceof Error
            ? error.message
            : "Die Bestellung konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.",
      );
      setSubmitting(false);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } finally {
      setKlarnaWaiting(false);
      setPopupBlocked(false);
      klarnaAbortRef.current = null;
    }
  };


  if (!loaded) {
    return <div className="min-h-screen bg-surface font-body text-ink" />;
  }

  if (!draft) {
    return (
      <div className="flex min-h-screen flex-col bg-surface font-body text-ink">
        <main className="flex-1 px-4 py-14">
          <div className="mx-auto max-w-md rounded-xl border border-line bg-background px-6 py-8 text-center shadow-card">
            <h1 className="text-[20px] font-bold text-conditions">Keine Auswahl gefunden</h1>
            <p className="mt-2 text-[14px] text-muted-custom">
              Bitte berechnen Sie zuerst Ihren Heizölpreis, danach können Sie Ihren Wunschtermin
              wählen.
            </p>
            <Link
              to="/preisrechner"
              className="mt-5 inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-[15px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover"
            >
              Zum Preisrechner
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const sortLabel = draft.variant === "premium" ? "Heizöl Premium" : "Heizöl Standard";
  const slotCardClass = (active: boolean) =>
    `flex-1 rounded-lg border px-3 py-3 text-center transition-colors ${
      active
        ? "border-brand bg-brand/5 ring-1 ring-brand"
        : "border-line bg-background hover:border-brand/60"
    }`;

  const billingErrors: Record<string, string> = {};
  for (const [k, v] of Object.entries(errors)) {
    if (k.startsWith("b_")) billingErrors[k.slice(2)] = v;
  }

  return (
    <div className="min-h-screen bg-surface font-body text-ink">
      {/* Sticky Zusammenfassung */}
      <div className="sticky top-0 z-30 border-b-2 border-b-brand bg-background">
        <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-bold text-conditions md:text-[15px]">
              {fmtLiters(draft.liters)} L {sortLabel}
            </p>
            <p className="truncate text-[12px] text-muted-custom">
              {draft.points} Lieferstelle{draft.points === 1 ? "" : "n"} · {draft.plz}
              {draft.city ? ` · ${draft.city}` : ""}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[16px] font-bold leading-tight text-conditions md:text-[18px]">
              {fmtEuro(draft.total)} €
            </p>
            <p className="text-[11px] uppercase tracking-wide text-muted-custom">
              {fmtEuro(draft.pricePer100)} €/100 L · inkl. MwSt.
            </p>
          </div>
        </div>
      </div>

      <main className="px-4 py-5">
        <div className="mx-auto max-w-3xl">
            <>
              {step === 1 ? (
                <>
                  <div className="flex flex-col items-start gap-3 rounded-md border border-line bg-background px-4 py-3 shadow-card min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div>
                        <ReviewStars />
                        <p className="text-[14px] font-bold text-conditions">4,9 / 5</p>
                      </div>
                      <span className="h-8 w-px bg-line" aria-hidden="true" />
                      <div>
                        <p className="text-[14px] font-bold text-conditions">Über 25.000 zufriedene Kunden</p>
                        <p className="text-[12px] text-muted-custom">Bestellung jederzeit kostenlos stornierbar</p>
                      </div>
                    </div>
                    <p className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
                      <Lock className="h-4 w-4" aria-hidden="true" />
                      Sichere Bestellung
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-3 rounded-md border border-line bg-background px-4 py-3 shadow-card sm:gap-4">
                    <p className="text-[11px] font-semibold uppercase text-muted-custom">Geprüft &amp; sicher</p>
                    <span className="h-6 w-px bg-line" aria-hidden="true" />
                    <img src={trustedShops.url} alt="Trusted Shops" className="h-7 w-auto object-contain" />
                    <img src={ekomi.url} alt="eKomi" className="h-7 w-auto object-contain" />
                    <img src={googleIcon.url} alt="Google Bewertungen" className="h-6 w-auto object-contain" />
                  </div>
                </>
              ) : null}

              {/* Titel */}
              <h1 className="mt-6 text-[24px] font-bold leading-[1.25] text-conditions md:text-[28px]">
                {step === 1 ? "Wann soll geliefert werden?" : "Fast fertig — nur noch Ihre Daten"}
              </h1>
              <p className="mt-1.5 text-[14px] text-muted-custom">
                {step === 1 ? (
                  <>
                    Wählen Sie Ihren Wunschtermin —{" "}
                    <span className="font-semibold text-ink">keine Anmeldung nötig</span>.
                  </>
                ) : (
                  "Ihr Termin ist reserviert. Noch wenige Angaben und Ihre Bestellung ist abgeschlossen."
                )}
              </p>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {CHECKS.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[13px] text-hero-text">
                    <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>

              {/* Schritte */}
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-background px-4 py-4 shadow-card">
                <div className="flex flex-col items-center gap-1">
                  {step === 2 ? (
                    <span className="flex size-7 items-center justify-center rounded-full bg-brand text-white">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                  ) : (
                    <span className="flex size-7 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white">
                      1
                    </span>
                  )}
                  <span className="text-[12px] font-bold text-conditions">Termin</span>
                </div>
                <span className={`h-px flex-1 ${step === 2 ? "bg-brand" : "bg-line"}`} />
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-[13px] font-bold ${
                      step === 2 ? "bg-brand text-white" : "bg-surface text-muted-custom"
                    }`}
                  >
                    2
                  </span>
                  <span
                    className={`text-[12px] ${step === 2 ? "font-bold text-conditions" : "text-muted-custom"}`}
                  >
                    Daten &amp; Zahlung
                  </span>
                </div>
              </div>

              {step === 1 ? (
                <>
                  {/* Terminauswahl */}
                  <section
                    className="mt-4 overflow-hidden rounded-xl border border-line bg-background shadow-card"
                    aria-labelledby="termin-title"
                  >
                    <div className="flex items-center gap-3 border-b border-line bg-brand/5 px-4 py-3.5">
                      <span className="flex size-9 items-center justify-center rounded-md bg-brand text-white">
                        <CalendarDays className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h2 id="termin-title" className="text-[16px] font-bold text-conditions">
                        Wann darf geliefert werden?
                      </h2>
                    </div>

                    <div className="px-4 py-4">
                      {days.map((d) => (
                        <div key={d.iso} className="mb-3 overflow-hidden rounded-lg border border-line last:mb-0">
                          <div className="flex items-center justify-between gap-3 bg-surface px-3 py-2.5">
                            <p className="text-[14px] font-bold text-conditions">{d.weekday}</p>
                            <p className="text-[14px] font-bold text-conditions">{d.date}</p>
                          </div>
                          <div className="flex flex-col gap-2 p-3 sm:flex-row">
                            <button
                              type="button"
                              onClick={() => select(d.iso, "vormittag")}
                              aria-pressed={slot?.date === d.iso && slot?.period === "vormittag"}
                              className={slotCardClass(slot?.date === d.iso && slot?.period === "vormittag")}
                            >
                              <p className="text-[14px] font-bold text-conditions">Vormittag</p>
                              <p className="text-[12px] text-muted-custom">8:00 - 12:00 Uhr</p>
                            </button>
                            <button
                              type="button"
                              onClick={() => select(d.iso, "nachmittag")}
                              aria-pressed={slot?.date === d.iso && slot?.period === "nachmittag"}
                              className={slotCardClass(slot?.date === d.iso && slot?.period === "nachmittag")}
                            >
                              <p className="text-[14px] font-bold text-conditions">Nachmittag</p>
                              <p className="text-[12px] text-muted-custom">15:00 - 18:00 Uhr</p>
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="my-4 flex items-center gap-3">
                        <span className="h-px flex-1 bg-line" />
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-custom">
                          oder
                        </span>
                        <span className="h-px flex-1 bg-line" />
                      </div>

                      <button
                        type="button"
                        onClick={() => select("telefon", "telefon")}
                        aria-pressed={slot?.period === "telefon"}
                        className={`flex w-full items-center gap-4 rounded-lg border px-4 py-4 text-left transition-colors ${
                          slot?.period === "telefon"
                            ? "border-brand bg-brand/5 ring-1 ring-brand"
                            : "border-line bg-background hover:border-brand/60"
                        }`}
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                          <Phone className="size-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[16px] font-bold text-conditions md:text-[17px]">
                            Termin telefonisch vereinbaren
                          </span>
                          <span className="block text-[14px] text-muted-custom">
                            Lieferfrist: 7 Werktage. Wir melden uns bei Ihnen.
                          </span>
                        </span>
                        {slot?.period === "telefon" ? (
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                            <Check className="size-3.5" aria-hidden="true" />
                          </span>
                        ) : (
                          <span
                            className="size-6 shrink-0 rounded-full border-2 border-line bg-background"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </section>

                  <section className="mt-4 rounded-md border border-line bg-background px-4 py-4 shadow-card" aria-labelledby="stimmen-title">
                    <p id="stimmen-title" className="flex items-center gap-2 text-[14px] font-bold text-conditions">
                      <ReviewStars />
                      Das sagen unsere Kunden
                    </p>
                    <ReviewCarousel />
                  </section>

                  <button
                    type="button"
                    onClick={proceed}
                    disabled={!slot}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-brand px-5 py-4 text-[16px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Weiter zu Ihren Daten
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  {!slot ? (
                    <p className="mt-2 text-center text-[13px] text-muted-custom">
                      Bitte wählen Sie einen Termin oder die telefonische Absprache.
                    </p>
                  ) : null}
                </>
              ) : (
                <>
                  {/* Zurück */}
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-2 text-[13px] font-semibold text-conditions transition-colors hover:border-brand/60"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Zurück zum Termin
                  </button>

                  <div className="mt-4 grid gap-4">
                    {/* Kontakt */}
                    <SectionCard icon={<Mail className="h-5 w-5" aria-hidden="true" />} title="Kontakt">
                      <div className="grid gap-3">
                        <Field label="E-Mail-Adresse" required error={errors["email"]}>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="z.B. max@mustermann.at"
                            className={fieldClass(!!errors["email"])}
                            autoComplete="email"
                          />
                        </Field>
                        <div className="rounded-lg border border-line bg-brand/5 p-3">
                          <Field label="Telefonnummer" required error={errors["phone"]}>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="z.B. 0664 1234567"
                              className={fieldClass(!!errors["phone"])}
                              autoComplete="tel"
                            />
                          </Field>
                          <p className="mt-2 flex items-start gap-1.5 text-[12px] text-muted-custom">
                            <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                            <span>
                              <span className="font-bold text-conditions">Wichtig:</span> Der
                              Lieferfahrer ruft Sie 30 Min. vor Ankunft an.
                            </span>
                          </p>
                        </div>
                      </div>
                    </SectionCard>

                    {/* Lieferadresse */}
                    <SectionCard icon={<Truck className="h-5 w-5" aria-hidden="true" />} title="Lieferadresse">
                      <AddressFields
                        value={delivery}
                        onChange={setDelivery}
                        errors={errors}
                        withSalutationButtons
                      />
                    </SectionCard>

                    {/* Weitere Angaben */}
                    <SectionCard
                      icon={<FileText className="h-5 w-5" aria-hidden="true" />}
                      title="Weitere Angaben"
                      hint="(optional)"
                    >
                      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-surface px-3 py-3">
                        <input
                          type="checkbox"
                          checked={billingDifferent}
                          onChange={(e) => setBillingDifferent(e.target.checked)}
                          className="mt-0.5 size-4 accent-brand"
                        />
                        <span className="text-[13px]">
                          <span className="font-bold text-conditions">Andere Rechnungsadresse?</span>{" "}
                          <span className="text-muted-custom">
                            Nur ankreuzen, wenn die Rechnung nicht an die Lieferadresse gehen soll.
                          </span>
                        </span>
                      </label>

                      {billingDifferent ? (
                        <div className="mt-3 rounded-lg border border-line bg-surface p-3">
                          <AddressFields
                            value={billing}
                            onChange={setBilling}
                            errors={billingErrors}
                          />
                        </div>
                      ) : null}

                      <div className="mt-3">
                        <Field
                          label={
                            <>
                              Hinweise zur Lieferung{" "}
                              <span className="text-muted-custom">(optional)</span>
                            </>
                          }
                        >
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="z.B. Tank im Keller, Einfahrt rechts"
                            rows={3}
                            className="w-full rounded-md border border-line bg-background px-3 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted-custom focus:border-brand focus:ring-2 focus:ring-brand/20"
                          />
                        </Field>
                      </div>
                    </SectionCard>

                    {/* Zahlungsmethode */}
                    <SectionCard
                      icon={<CreditCard className="h-5 w-5" aria-hidden="true" />}
                      title="Zahlungsmethode"
                    >
                      <div className="grid gap-3" role="radiogroup" aria-label="Zahlungsmethode">
                        {PAYMENT_OPTIONS.filter((p) => !isKlarna(p.id)).map((p) => {
                          const active = payment === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              onClick={() => setPayment(p.id)}
                              className={`relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors min-[390px]:grid-cols-[auto_auto_minmax(0,1fr)] ${
                                active
                                  ? "border-brand bg-brand/5 ring-1 ring-brand"
                                  : "border-line bg-background hover:border-brand/60"
                              }`}
                            >
                              <span
                                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                                  active ? "border-brand" : "border-line"
                                }`}
                                aria-hidden="true"
                              >
                                {active ? <span className="size-2.5 rounded-full bg-brand" /> : null}
                              </span>
                              <img
                                src={p.icon.url}
                                alt=""
                                className="h-8 w-auto shrink-0 object-contain min-[390px]:h-9"
                                loading="eager"
                                decoding="async"
                              />
                               <span className="col-span-2 min-w-0 min-[390px]:col-span-1">
                                <span className="block text-[14px] font-bold text-conditions">
                                  {p.label}
                                </span>
                                <span className="block text-[12px] text-muted-custom">{p.desc}</span>
                                {p.hint ? (
                                  <span className="mt-1 inline-block rounded bg-brand/10 px-1.5 py-0.5 text-[11px] font-semibold text-brand">
                                    {p.hint}
                                  </span>
                                ) : null}
                              </span>
                              {p.badge ? (
                                <span className="absolute -top-2 right-3 rounded-sm bg-brand px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                  {p.badge}
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </SectionCard>

                    <section className="overflow-hidden rounded-md border border-line bg-background shadow-card" aria-label="Vertrauen und sichere Zahlung">
                      <div className="grid sm:grid-cols-2">
                        <div className="flex items-center gap-3 px-4 py-3.5 sm:border-r sm:border-line">
                          <img src={trustedShops.url} alt="Trusted Shops Käuferschutz" className="h-9 w-9 object-contain" />
                          <div>
                            <p className="text-[13px] font-bold text-conditions">Käuferschutz</p>
                            <p className="text-[12px] text-muted-custom">Trusted Shops zertifiziert</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 border-t border-line px-4 py-3.5 sm:border-t-0">
                          <img src={ekomi.url} alt="eKomi Kundenbewertungen" className="h-9 w-9 object-contain" />
                          <div>
                            <p className="text-[13px] font-bold text-conditions">4,9 / 5 Sterne</p>
                            <p className="text-[12px] text-muted-custom">Über 25.000 zufriedene Kunden</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-line px-4 py-3">
                        <p className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand">
                          <Lock className="h-4 w-4" aria-hidden="true" />
                          Sichere Bestellung
                        </p>
                        <span className="hidden h-5 w-px bg-line sm:block" aria-hidden="true" />
                        <p className="text-[11px] font-semibold uppercase text-muted-custom">Geprüft &amp; sicher</p>
                        <img src={googleIcon.url} alt="Google Bewertungen" className="h-6 w-auto object-contain" />
                        <p className="basis-full text-center text-[11px] text-muted-custom">Bestellung jederzeit kostenlos stornierbar</p>
                      </div>
                    </section>

                    {/* Bestellübersicht */}
                    <section className="rounded-xl border border-line bg-background px-4 py-4 shadow-card" aria-labelledby="bestelluebersicht-title">
                      <h2 id="bestelluebersicht-title" className="mb-3 text-[16px] font-bold text-conditions">Bestellübersicht</h2>
                      <dl className="grid gap-2 text-[13px]">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-dashed border-line pb-2">
                          <dt className="text-muted-custom">{sortLabel}</dt>
                          <dd className="font-bold text-conditions">{fmtLiters(draft.liters)} Liter</dd>
                        </div>
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-dashed border-line pb-2">
                          <dt className="text-muted-custom">Lieferung an</dt>
                          <dd className="text-right font-bold text-conditions">{draft.plz}{draft.city ? ` ${draft.city}` : ""}</dd>
                        </div>
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 pb-1">
                          <dt className="text-muted-custom">Lieferkosten</dt>
                          <dd className="font-bold text-brand">inklusive</dd>
                        </div>
                      </dl>
                      <div className="mt-2 flex items-center justify-between gap-4 border-t-2 border-conditions pt-3">
                        <p className="text-[17px] font-bold text-conditions">Gesamtpreis</p>
                        <p className="text-[18px] font-bold text-conditions">{fmtEuro(draft.total)} €</p>
                      </div>
                      <p className="mt-2 text-[12px] text-muted-custom">inkl. gesetzlicher Umsatzsteuer &amp; Lieferung — Tagespreis bindend bei Bestellung</p>
                    </section>
                  </div>

                  {Object.keys(errors).length > 0 ? (
                    <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] font-semibold text-red-600">
                      Bitte prüfen Sie die markierten Felder.
                    </p>
                  ) : null}

                  {submitError ? (
                    <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] font-semibold text-red-600">
                      {submitError}
                    </p>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => void submit()}
                    disabled={submitting}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-brand px-5 py-4 text-[16px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? "Bestellung wird übermittelt ..." : "Jetzt verbindlich bestellen"}
                    {submitting ? null : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </>
              )}
            </>
        </div>
      </main>

      {klarnaWaiting || (submitting && isKlarna(payment)) ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-conditions/50 px-4" role="dialog" aria-modal="true" aria-labelledby="klarna-wait-title">
          <div className="w-full max-w-sm rounded-xl border border-line bg-background px-6 py-7 text-center shadow-card">
            <img src="/img/klarna.webp" alt="Klarna" className="mx-auto h-10 w-auto" />
            <h2 id="klarna-wait-title" className="mt-4 text-[17px] font-bold text-conditions">
              Zahlung wird in Klarna abgeschlossen …
            </h2>
            <p className="mt-2 text-[13px] text-muted-custom">
              {popupBlocked
                ? "Ihr Browser hat das Klarna-Fenster blockiert. Bitte öffnen Sie es über den Button."
                : "Bitte schließen Sie die Zahlung im Klarna-Fenster ab. Danach wird Ihre Bestellung automatisch übermittelt."}
            </p>
            <div className="mt-5 grid gap-2">
              <button
                type="button"
                disabled={!klarnaUrlRef.current}
                onClick={() => {
                  const w = window.open(klarnaUrlRef.current, "klarna", "width=600,height=860");
                  if (w) {
                    popupRef.current = w;
                    setPopupBlocked(false);
                  }
                }}
                className="rounded-md bg-brand px-4 py-3 text-[14px] font-bold text-white transition-colors hover:bg-brand-hover disabled:opacity-60"
              >
                {popupBlocked ? "Klarna öffnen" : "Klarna-Fenster erneut öffnen"}
              </button>
              <button
                type="button"
                onClick={cancelKlarna}
                className="rounded-md border border-line bg-background px-4 py-3 text-[14px] font-semibold text-conditions hover:bg-surface"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Sticky Preisleiste */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-background pb-[env(safe-area-inset-bottom)] shadow-header-strong focus-within:relative">
          <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
            <div>
              <p className="text-[17px] font-bold leading-tight text-conditions">
                {fmtEuro(draft.total)} €
              </p>
              <p className="text-[12px] text-muted-custom">inkl. MwSt. · kostenlose Lieferung</p>
            </div>
            {step === 1 ? (
              <button
                type="button"
                onClick={proceed}
                disabled={!slot}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-brand px-4 py-3 text-[15px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
              >
                Weiter
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void submit()}
                disabled={submitting}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-brand px-4 py-3 text-[15px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-70 sm:px-6"
              >
                {submitting ? "Wird gesendet ..." : "Bestellen"}
                {submitting ? null : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
              </button>
            )}
          </div>
      </div>
    </div>
  );
}
