import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "../components/ui/sonner";
import { CookieConsent } from "../components/cookie-consent";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-7xl font-bold text-foreground">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">Seite nicht gefunden</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Diese Seite existiert nicht oder wurde verschoben. Berechnen Sie stattdessen direkt Ihren
          aktuellen Heizölpreis oder wählen Sie Ihre Region.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            to="/preisrechner"
            className="inline-flex items-center justify-center rounded-[4px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Heizölpreis berechnen
          </Link>
          <Link
            to="/heizoelpreise"
            className="inline-flex items-center justify-center rounded-[4px] border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Heizölpreise nach Region
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-[4px] border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}


function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Diese Seite konnte nicht geladen werden
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Es ist ein technischer Fehler aufgetreten. Bitte laden Sie die Seite neu oder kehren Sie
          zur Startseite zurück.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-[4px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Erneut versuchen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-[4px] border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Zur Startseite
          </a>

        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Heizöl bestellen & Heizölpreise vergleichen | Heizöl Austria" },
      {
        name: "description",
        content:
          "Deutsches Heizöl für Österreich vergleichen und Heizöl österreichweit günstig online bestellen. Tagesaktuelle Preise und Lieferung nach Österreich.",
      },
      { name: "author", content: "Demovero GmbH" },
      { name: "publisher", content: "Demovero GmbH" },
      { name: "language", content: "de-AT" },
      { httpEquiv: "content-language", content: "de-AT" },
      { name: "geo.region", content: "AT" },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },

      { property: "og:site_name", content: "Heizöl Austria" },
      { property: "og:locale", content: "de_AT" },
      { property: "og:title", content: "Heizöl bestellen & Heizölpreise vergleichen | Heizöl Austria" },
      {
        property: "og:description",
        content:
          "Deutsches Heizöl für Österreich vergleichen und Heizöl österreichweit günstig online bestellen. Tagesaktuelle Preise und Lieferung nach Österreich.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        // Meta Pixel Code (Facebook)
        type: "text/javascript",
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1078017144584283');fbq('track', 'PageView');`,
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },


      { rel: "icon", href: "/favicon.svg?v=3", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png?v=3", type: "image/png", sizes: "64x64" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=3", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de-AT">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Meta Pixel Code (noscript-Fallback) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=1078017144584283&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();


  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster />
      <CookieConsent />
    </QueryClientProvider>
  );
}
