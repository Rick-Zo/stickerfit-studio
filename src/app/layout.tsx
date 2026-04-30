import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stickerfit.example.com";
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "StickerFit Studio | Sticker Sheet Layout and Profit Calculator",
    template: "%s | StickerFit Studio",
  },
  description:
    "Plan Cricut and Silhouette sticker sheets, optimize mixed-size sticker layouts, export SVG/CSV files, and estimate Etsy seller profit.",
  keywords: [
    "sticker sheet calculator",
    "Cricut sticker sheet planner",
    "Etsy sticker profit calculator",
    "print then cut layout",
    "Silhouette sticker template",
  ],
  openGraph: {
    title: "StickerFit Studio",
    description: "A mixed-size sticker sheet planner and profit calculator for small-batch sellers.",
    url: siteUrl,
    siteName: "StickerFit Studio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
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
            <span>SF</span>
            StickerFit Studio
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/research">Research</Link>
            <Link href="/guides/sticker-sheet-profit-calculator">Profit Guide</Link>
            <Link href="/guides/cricut-print-then-cut-size-chart">Size Guide</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <div>
            <strong>StickerFit Studio</strong>
            <p>Independent planning tool for sticker sellers. Not affiliated with Cricut, Silhouette, Etsy, or Google.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
