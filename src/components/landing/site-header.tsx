import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calculator,
  ChevronDown,
  Fuel,
  HelpCircle,
  Menu,
  MapPin,
  Star,
  TrendingUp,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { RatingBadge } from "./rating-badge";

const HEIZOEL_LINKS = [
  {
    to: "/preisrechner",
    title: "Heizöl Preise heute",
    description: "Aktueller Tagespreis & 7-Tage-Trend",
    icon: TrendingUp,
  },
  {
    to: "/preisrechner",
    title: "Heizöl kaufen",
    description: "Deutsches Heizöl für Österreich",
    icon: Fuel,
  },
  {
    to: "/preisrechner",
    title: "Heizölpreis pro Liter",
    description: "PLZ eingeben, Preis sofort berechnen",
    icon: Calculator,
  },
  {
    to: "/heizoelpreise",
    title: "Heizölpreise nach Region",
    description: "9 Bundesländer & über 2.000 Orte",
    icon: MapPin,
  },
] as const;


const INFO_SERVICE_LINKS = [
  {
    to: "/lieferung-zahlung",
    title: "Lieferung & Zahlung",
    description: "Liefer- und Zahlungsmodalitäten",
    icon: Truck,
  },
  {
    to: "/bewertungen",
    title: "Kundenbewertungen",
    description: "Erfahrungen mit unserem Service",
    icon: Star,
  },
  {
    to: "/faq",
    title: "Heizöl FAQ",
    description: "Heizöl sicher kaufen",
    icon: HelpCircle,
  },
] as const;

function Dropdown({
  label,
  links,
}: {
  label: string;
  links: readonly {
    to: string;
    title: string;
    description: string;
    icon: typeof TrendingUp;
  }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex h-12 items-center gap-1 bg-transparent text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        {label}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-max pt-1.5">
          <div className="overflow-hidden rounded-lg border border-line bg-background shadow-card">
            <div className="h-[3px] w-full bg-brand" aria-hidden="true" />
            <ul className="grid gap-1 p-2">
              {links.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title}>
                    <Link
                      to={item.to}
                      className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-ink">{item.title}</span>
                        <span className="text-xs text-muted-custom">{item.description}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background shadow-header-strong">
      <div className="mx-auto grid h-[52px] max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 md:flex md:h-16 md:justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Menü öffnen"
              className="-ml-2 size-11 shrink-0 text-ink md:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="mobile-menu-scrollbar flex h-dvh w-screen max-w-none flex-col gap-0 overflow-y-auto p-0 sm:max-w-none md:hidden"
          >
            <SheetHeader className="border-b border-line px-5 py-4 text-left">
              <SheetTitle>
                <Logo className="h-auto w-[134px] text-brand-logo" />
                <span className="sr-only">Heizöl Austria Navigation</span>
              </SheetTitle>
            </SheetHeader>

            <nav aria-label="Mobile Hauptnavigation" className="flex-1 px-5 py-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-custom">
                  Heizölpreise
                </p>
                <ul className="mt-2 divide-y divide-line">
                  {HEIZOEL_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title}>
                        <SheetClose asChild>
                          <Link to={item.to} className="flex min-h-12 items-center gap-3 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                              <Icon className="size-[18px]" aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-ink">{item.title}</span>
                              <span className="block text-xs text-muted-custom">{item.description}</span>
                            </span>
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-custom">
                  Info &amp; Service
                </p>
                <ul className="mt-2 divide-y divide-line">
                  {INFO_SERVICE_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title}>
                        <SheetClose asChild>
                          <Link to={item.to} className="flex items-center gap-3 py-3.5">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                              <Icon className="size-[18px]" aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-ink">{item.title}</span>
                              <span className="block text-xs text-muted-custom">{item.description}</span>
                            </span>
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-7 grid gap-3">
                <SheetClose asChild>
                  <Link
                    to="/kontakt"
                    className="flex h-11 items-center justify-center rounded-md border border-line text-sm font-semibold text-ink"
                  >
                    Kontakt &amp; Hilfe
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/preisrechner"
                    className="flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white shadow-cta"
                  >
                    Preis berechnen
                  </Link>
                </SheetClose>
              </div>
            </nav>

            <div className="border-t border-line bg-surface px-5 py-5">
              <RatingBadge expanded />
            </div>
          </SheetContent>
        </Sheet>

        <Link
          to="/"
          className="min-w-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <Logo className="h-auto w-[104px] text-brand-logo md:w-[152px]" />
        </Link>

        <div className="flex shrink-0 items-center md:hidden">
          <RatingBadge compact />
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <RatingBadge />
          <span className="hidden h-8 w-px bg-line sm:block" />
          <Link
            to="/preisrechner"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-deep transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Preis berechnen <span aria-hidden="true">›</span>
          </Link>
        </div>
      </div>

      <nav aria-label="Hauptnavigation" className="hidden border-y border-line bg-surface md:block">
        <div className="mx-auto flex h-12 max-w-6xl items-center gap-6 px-5">
          <Dropdown label="Heizölpreise" links={HEIZOEL_LINKS} />
          <Dropdown label="Info & Service" links={INFO_SERVICE_LINKS} />
          <Link
            to="/kontakt"
            className="inline-flex h-12 items-center text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            KONTAKT &amp; HILFE
          </Link>
        </div>
      </nav>
    </header>
  );
}
