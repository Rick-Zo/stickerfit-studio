import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, getGuide } from "@/lib/guides";

const guide = getGuide("etsy-sticker-pricing-fees");

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: {
    canonical: "/guides/etsy-sticker-pricing-fees/",
  },
};

export default function EtsyStickerPricingFeesPage() {
  return (
    <main className="article-page">
      <JsonLd data={articleSchema(guide)} />
      <header className="article-hero">
        <p className="eyebrow">Marketplace guide</p>
        <h1>Etsy sticker pricing starts before you publish the listing.</h1>
        <p>
          Competitor prices can be useful context, but your actual margin depends on sheet yield, packaging, labor,
          listing strategy, and marketplace fees.
        </p>
      </header>

      <div className="article-layout">
        <article className="article-body">
          <h2>Price from the batch, not the guess</h2>
          <p>
            Before you publish, decide how many sellable items come from one printed sheet. Then estimate the total cost
            of that sheet and divide it across the products you will actually sell. This keeps you from pricing a listing
            that looks competitive but loses money in production.
          </p>

          <h2>Costs to model before Etsy fees</h2>
          <ul>
            <li>Sticker paper, laminate, ink, and test prints.</li>
            <li>Labor for printing, cutting, weeding, packing, and rework.</li>
            <li>Packaging materials such as backing cards, sleeves, mailers, and labels.</li>
            <li>Extra sheets used for freebies, samples, or failed cuts.</li>
          </ul>

          <h2>Fees need a buffer</h2>
          <p>
            Marketplace fee structures can change, and shipping choices can affect your real margin. Use a fee buffer in
            the calculator instead of assuming every order will behave the same way. If your sticker pack has a small sale
            price, even a small fee change can matter.
          </p>

          <h2>Bundle decisions affect margin</h2>
          <p>
            A single sticker, a three-pack, and a themed sampler may use the same artwork but produce different margins.
            The best bundle is often the one that fills the sheet cleanly and makes packaging efficient.
          </p>

          <p>
            Build the sheet first in <Link href="/">StickerFit Studio</Link>, then use the profit panel to test price,
            fee, and packaging assumptions.
          </p>
        </article>

        <aside className="article-aside">
          <AdSlot size="sidebar" />
          <div className="side-note">
            <strong>Before publishing</strong>
            <p>Run one sample batch and write down the real time spent. Labor is where many sticker listings lose margin.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
