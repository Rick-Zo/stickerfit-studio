import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Sticker Sheet Profit Calculator Guide",
  description: "A practical guide for pricing handmade sticker sheets with material, ink, labor, packaging, and platform fees.",
};

export default function ProfitGuidePage() {
  return (
    <main className="article-page">
      <header className="article-hero">
        <p className="eyebrow">Pricing guide</p>
        <h1>Sticker sheet profit calculator: the simple formula sellers miss.</h1>
        <p>
          A sticker sheet price is not only paper plus ink. The hidden drivers are wasted sheet area, setup time, platform
          fees, and whether your freebies still fit on the same page.
        </p>
      </header>

      <div className="article-layout">
        <article className="article-body">
          <h2>Use a per-sheet model first</h2>
          <p>
            For small-batch sellers, a sheet is the production unit. Start with material cost, ink cost, labor minutes,
            packaging, and marketplace fees. Then divide profit by the number of sellable stickers only after the layout
            is known.
          </p>

          <div className="formula-box">
            Profit = sale price - material - ink - labor - packaging - platform fees
          </div>

          <h2>Why layout changes price</h2>
          <p>
            A 2 in sticker might fit 12, 15, or 18 units depending on bleed, gaps, and rotation. The same sale price can
            swing from healthy margin to break-even if the layout spills onto a second sheet. Use the planner on the home
            page before creating a listing photo or bulk printing.
          </p>

          <h2>Suggested workflow</h2>
          <ol>
            <li>Enter your real cuttable area preset and sticker sizes.</li>
            <li>Add freebies or label variants as separate sticker items.</li>
            <li>Set material, ink, packaging, and fee assumptions.</li>
            <li>Export the CSV cut list and keep it with your production notes.</li>
          </ol>

          <h2>Good starting assumptions</h2>
          <p>
            If you are unsure, start with conservative values: one premium sticker sheet, 4-6 minutes of labor, packaging
            cost per order, and a marketplace fee buffer. Replace these numbers with your actual shop data after a few
            batches.
          </p>

          <p>
            Ready to test a real order? <Link href="/">Open the free sticker sheet calculator</Link>.
          </p>
        </article>

        <aside className="article-aside">
          <AdSlot label="Profit guide ad placement after approval." size="sidebar" />
          <div className="side-note">
            <strong>SEO target</strong>
            <p>Sticker sheet profit calculator, Etsy sticker pricing, sticker cost per sheet.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
