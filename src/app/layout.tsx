import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const siteDescription =
  "Free sticker sheet calculator for Cricut, Silhouette, and Etsy sellers. Plan mixed-size layouts, reduce waste, export SVG/CSV files, and estimate profit.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Sticker Sheet Calculator for Cricut | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "sticker sheet calculator",
    "Cricut sticker sheet planner",
    "Etsy sticker profit calculator",
    "print then cut layout",
    "Silhouette sticker template",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo-mark.svg",
    shortcut: "/logo-mark.svg",
  },
  openGraph: {
    title: `Sticker Sheet Calculator for Cricut | ${siteName}`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "StickerFit Studio sticker sheet calculator preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sticker Sheet Calculator for Cricut | ${siteName}`,
    description: siteDescription,
    images: ["/og-image.svg"],
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteName,
      url: siteUrl,
      logo: absoluteUrl("/logo.svg"),
      contactPoint: {
        "@type": "ContactPoint",
        url: absoluteUrl("/contact/"),
        contactType: "customer support",
      },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      publisher: {
        "@id": absoluteUrl("/#organization"),
      },
      potentialAction: {
        "@type": "UseAction",
        name: "Use the sticker sheet calculator",
        target: siteUrl,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <JsonLd data={siteSchema} />
        {adsenseClient ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <header className="site-header">
          <Link href="/" className="brand" aria-label="StickerFit Studio home">
            <Image src="/logo.svg" alt="StickerFit Studio" width={180} height={48} priority />
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/">Calculator</Link>
            <Link href="/guides/sticker-sheet-profit-calculator">Profit Guide</Link>
            <Link href="/guides/cricut-print-then-cut-size-chart">Size Guide</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <div>
            <strong>{siteName}</strong>
            <p>Independent sticker sheet planning tool for small-batch sellers.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
