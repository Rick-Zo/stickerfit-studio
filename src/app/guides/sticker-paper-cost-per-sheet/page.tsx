import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, getGuide } from "@/lib/guides";

const guide = getGuide("sticker-paper-cost-per-sheet");

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: {
    canonical: "/guides/sticker-paper-cost-per-sheet/",
  },
};

export default function StickerPaperCostPage() {
  return (
    <main className="article-page">
      <JsonLd data={articleSchema(guide)} />
      <header className="article-hero">
        <p className="eyebrow">Cost guide</p>
        <h1>Sticker paper cost per sheet: the number your price depends on.</h1>
        <p>
          Paper price is only the start. A useful cost per sheet includes ink, laminate, test prints, failed cuts,
          packaging, and a waste buffer for the batches that do not go perfectly.
        </p>
      </header>

      <div className="article-layout">
        <article className="article-body">
          <h2>Build a real sheet cost</h2>
          <p>
            Handmade sticker sellers often underprice because they only count the sticker paper. Treat each printed sheet
            as a production unit and include every cost that happens before the product reaches the customer.
          </p>
          <div className="formula-box">
            Real sheet cost = paper + ink + laminate + labor + packaging + failed-print buffer
          </div>

          <h2>What to include</h2>
          <div className="data-table" role="table" aria-label="Sticker sheet cost inputs">
            <div role="row">
              <strong role="columnheader">Cost input</strong>
              <strong role="columnheader">Why it matters</strong>
              <strong role="columnheader">How to estimate</strong>
            </div>
            <div role="row">
              <span role="cell">Sticker paper</span>
              <span role="cell">Your base material cost</span>
              <span role="cell">Pack price divided by usable sheets</span>
            </div>
            <div role="row">
              <span role="cell">Ink</span>
              <span role="cell">Heavy color designs cost more</span>
              <span role="cell">Use an average per printed sheet</span>
            </div>
            <div role="row">
              <span role="cell">Waste buffer</span>
              <span role="cell">Misprints and bad cuts are normal</span>
              <span role="cell">Add a small percent to each batch</span>
            </div>
          </div>

          <h2>Do not hide labor inside margin</h2>
          <p>
            If a batch takes trimming, weeding, packing, and quality checks, labor belongs in the model. Even a few
            minutes per sheet changes pricing when you sell lower-cost sticker packs.
          </p>

          <h2>Connect cost to layout</h2>
          <p>
            Cost per sheet only becomes useful once you know how many sellable stickers fit. A layout that places 18
            stickers instead of 15 lowers the cost per sticker without changing your supply price. That is why sheet
            planning and pricing should happen together.
          </p>

          <p>
            Use <Link href="/">StickerFit Studio</Link> to test how sheet count changes your margin before printing a
            batch.
          </p>
        </article>

        <aside className="article-aside">
          <AdSlot size="sidebar" />
          <div className="side-note">
            <strong>Practical buffer</strong>
            <p>Track failed sheets for a month. Use that average as your waste buffer instead of guessing.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
