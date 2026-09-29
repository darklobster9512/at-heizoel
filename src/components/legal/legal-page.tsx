import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/sections";

export const COMPANY = {
  shop: "heizoel-austria.at",
  company: "Demovero GmbH",
  street: "Kurfürstendamm 97–98",
  city: "10709 Berlin",
  court: "Amtsgericht Charlottenburg (Berlin)",
  register: "HRB 283996 B",
  director: "Koko Goldmann",
  vatId: "DE281404005",
  email: "info@heizoel-deutschland.com",
} as const;

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        <header className="border-b-[3px] border-b-brand bg-surface">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-5 md:py-14">
            <nav aria-label="Brotkrümelnavigation" className="text-sm text-muted-custom">
              <Link to="/" className="hover:text-brand hover:underline">
                Startseite
              </Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </nav>
            <h1 className="mt-5 text-[28px] font-bold leading-tight text-conditions md:text-[38px]">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-muted-custom md:text-base">
              {intro}
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-5 md:grid-cols-[220px_minmax(0,1fr)] md:py-14">
          <aside className="h-fit border-l-2 border-brand pl-4 md:sticky md:top-32">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-custom">Inhalt</p>
            <nav className="mt-3" aria-label={`${title} Inhaltsverzeichnis`}>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-sm leading-5 text-ink hover:text-brand hover:underline">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="min-w-0 space-y-9">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-line pb-8 last:border-b-0">
                <h2 className="text-xl font-bold leading-tight text-conditions md:text-2xl">{section.title}</h2>
                <div className="mt-4 space-y-3 break-words text-[14px] leading-7 text-muted-custom md:text-[15px]">
                  {section.content}
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function CompanyAddress() {
  return (
    <address className="not-italic">
      <strong className="text-ink">{COMPANY.company}</strong><br />
      {COMPANY.street}<br />
      {COMPANY.city}<br />
      Deutschland
    </address>
  );
}

export function ContactLinks() {
  return (
    <p>
      E-Mail: <a className="font-medium text-brand hover:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
      Website: <a className="font-medium text-brand hover:underline" href={`https://${COMPANY.shop}`}>{COMPANY.shop}</a>
    </p>
  );
}