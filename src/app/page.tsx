import { AdSlot } from "@/components/AdSlot";
import { StickerPlanner } from "@/components/StickerPlanner";

export default function Home() {
  return (
    <main>
      <section className="product-intro">
        <div>
          <p className="eyebrow">Sticker sheet planner</p>
          <h1>Sticker sheet calculator for Cricut, Silhouette, and Etsy sellers.</h1>
          <p>
            Plan mixed-size sticker layouts, estimate paper waste, export production files, and check sheet profit before
            you print.
          </p>
        </div>
        <AdSlot size="sidebar" />
      </section>

      <StickerPlanner />

      <section className="content-band two-column">
        <div>
          <p className="eyebrow">Made for sticker sellers</p>
          <h2>Turn a listing idea into a print-ready sheet plan.</h2>
          <p>
            Most calculators stop at simple rows and columns. StickerFit handles mixed SKUs, freebies, bleed, gaps, and
            platform fees in the same workspace, so a maker can turn a listing idea into a production sheet and price
            check without opening a spreadsheet.
          </p>
        </div>
        <div className="checklist">
          <span>Fit mixed sticker sizes</span>
          <span>Export SVG and CSV files</span>
          <span>Estimate material waste</span>
          <span>Price every sheet confidently</span>
        </div>
      </section>

      <section className="content-band editorial-grid">
        <article>
          <h2>How the sticker sheet calculator works</h2>
          <p>
            Enter each sticker size, quantity, bleed, spacing, and safety margin. StickerFit Studio packs the stickers
            into the selected cuttable area, then shows sheet count, coverage, waste, and unplaced items. The result gives
            you a fast production estimate before you open your cutting software.
          </p>
        </article>
        <article>
          <h2>Why mixed-size planning matters</h2>
          <p>
            Real sticker listings often combine round stickers, labels, sampler pieces, and small freebies. A simple
            rows-and-columns calculator cannot tell whether those pieces share a sheet efficiently. Mixed-size planning
            helps reduce wasted vinyl, sticker paper, ink, and packing time.
          </p>
        </article>
        <article>
          <h2>What you can export</h2>
          <p>
            Export an SVG layout for visual production notes and a CSV cut list with sheet number, item name, position,
            size, and rotation. Keep both files with your listing notes so repeat batches are easier to price and print.
          </p>
        </article>
      </section>
    </main>
  );
}
