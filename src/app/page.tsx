import { AdSlot } from "@/components/AdSlot";
import { StickerPlanner } from "@/components/StickerPlanner";

export default function Home() {
  return (
    <main>
      <section className="product-intro">
        <div>
          <p className="eyebrow">Sticker sheet planner</p>
          <h1>Plan profitable Cricut and Silhouette sticker sheets in minutes.</h1>
          <p>
            A production calculator for Etsy sticker sellers: pack mixed-size stickers, estimate waste, export a cut list,
            and sanity-check sheet profit before you print.
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
    </main>
  );
}
