import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";
import SiteFrame from "@/components/layout/SiteFrame";
import "./globals.css";

const montserrat = localFont({
  src: "./fonts/montserrat-latin.woff2",
  variable: "--font-montserrat",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.descriptor}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    title: `${site.name} — ${site.descriptor}`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.descriptor}`,
    description: site.description,
  },
  robots: site.isDemo
    ? {
        index: false,
        follow: false,
        noarchive: true,
      }
    : {
        index: true,
        follow: true,
      },
};

export const viewport: Viewport = {
  themeColor: "#432724",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-cafe focus:text-crema-clara focus:px-4 focus:py-2 focus:rounded"
        >
          Saltar al contenido
        </a>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
