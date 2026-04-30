import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Cricut Print Then Cut Size Chart",
  description: "A practical size chart for planning sticker sheets inside Cricut Print Then Cut limits.",
};

export default function CricutSizeGuidePage() {
  return (
    <main className="article-page">
      <header className="article-hero">
        <p className="eyebrow">Size guide</p>
        <h1>Cricut Print Then Cut size chart for sticker sheet planning.</h1>
        <p>
          Use the cuttable area, not the paper size, when planning sticker products. Registration marks and machine
          constraints reduce the usable space.
        </p>
      </header>

      <div className="article-layout">
        <article className="article-body">
          <h2>Common planning presets</h2>
          <div className="data-table" role="table" aria-label="Print Then Cut planning presets">
            <div role="row">
              <strong role="columnheader">Preset</strong>
              <strong role="columnheader">Paper size</strong>
              <strong role="columnheader">Planner working area</strong>
            </div>
            <div role="row">
              <span role="cell">Cricut Letter</span>
              <span role="cell">8.5 x 11 in</span>
              <span role="cell">7.44 x 9.94 in</span>
            </div>
            <div role="row">
              <span role="cell">Cricut A4</span>
              <span role="cell">8.27 x 11.69 in</span>
              <span role="cell">7.2 x 10.62 in</span>
            </div>
            <div role="row">
              <span role="cell">Conservative Silhouette Letter</span>
              <span role="cell">8.5 x 11 in</span>
              <span role="cell">7.8 x 10.2 in</span>
            </div>
          </div>

          <h2>Bleed and gap rules</h2>
          <p>
            Bleed adds art around the cut edge. Gap is the space between stickers. Both reduce the number of stickers per
            sheet, so the calculator applies them before nesting the layout.
          </p>

          <h2>When to rotate designs</h2>
          <p>
            Rotation helps long labels, sampler packs, and freebie stickers share rows. It is usually safe for non-text
            art, but keep text-oriented stickers upright if the customer experience depends on reading direction.
          </p>

          <p>
            The presets in <Link href="/">StickerFit Studio</Link> are planning defaults. Always verify final artwork in
            your cutting software before production.
          </p>
        </article>

        <aside className="article-aside">
          <AdSlot size="sidebar" />
          <div className="side-note">
            <strong>Quick reminder</strong>
            <p>
              Check your final file inside your cutting software before printing a full batch. Software updates and machine
              settings can change the usable area.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
