import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import { useEffect } from "react";

import type { Route } from "./+types/root";
import i18n from "@/i18n";
import { useLanguageSync } from "@/shared/hooks/use-language-sync";
import { PageLoadBlur } from "@/shared/ui/page-load-blur/page-load-blur";
import "./app.css";

export const links: Route.LinksFunction = () => [
  // Favicons & PWA assets from /public/favicon
  {
    rel: "icon",
    type: "image/x-icon",
    href: "/favicon/favicon.ico",
  },
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/favicon/favicon.svg",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/favicon/favicon-96x96.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon/apple-touch-icon.png",
  },
  {
    rel: "manifest",
    href: "/favicon/site.webmanifest",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const isProduction = import.meta.env.MODE === "production";
  const gtagId = import.meta.env.VITE_GTAG_ID;

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {isProduction && gtagId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            />
            <script
              // Inline config is required by Google, keep minimal
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gtagId}', { send_page_view: false });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#0A0A0F] focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-[#9D6BF7]"
        >
          Skip to main content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only run when gtag is available (after script loads)
    const gtag = (window as any).gtag as
      | ((...args: unknown[]) => void)
      | undefined;
    if (!gtag) return;

    gtag("event", "page_view", {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  useLanguageSync();
  return (
    <>
      <PageLoadBlur />
      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = i18n.t("errors.oops");
  let details = i18n.t("errors.unexpected");
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404 ? i18n.t("errors.notFound") : i18n.t("errors.error");
    details =
      error.status === 404
        ? i18n.t("errors.notFoundDetails")
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
