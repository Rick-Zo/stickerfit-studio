import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for StickerFit Studio.",
};

export default function TermsPage() {
  return (
    <main className="article-page narrow">
      <header className="article-hero">
        <p className="eyebrow">Policy</p>
        <h1>Terms of Use</h1>
        <p>Last updated April 30, 2026.</p>
      </header>
      <article className="article-body">
        <p>
          StickerFit Studio is a planning tool. It provides estimates for layout, waste, and pricing, but final production
          settings should be verified in your printer and cutting software before selling or shipping products.
        </p>
        <h2>No affiliation</h2>
        <p>
          StickerFit Studio is independent and is not affiliated with Cricut, Silhouette, Etsy, Google, or their related
          brands.
        </p>
        <h2>Limitation</h2>
        <p>
          The calculator is provided as-is. You are responsible for checking dimensions, fees, taxes, and production
          quality for your own shop.
        </p>
      </article>
    </main>
  );
}
