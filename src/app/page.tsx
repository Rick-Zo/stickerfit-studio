import { AdSlot } from "@/components/AdSlot";
import { StickerPlanner } from "@/components/StickerPlanner";

export default function Home() {
  return (
    <main>
      <section className="product-intro">
        <div>
          <p className="eyebrow">StickerFit Studio</p>
          <h1>Plan profitable Cricut and Silhouette sticker sheets in minutes.</h1>
          <p>
            A production calculator for Etsy sticker sellers: pack mixed-size stickers, estimate waste, export a cut list,
            and sanity-check sheet profit before you print.
          </p>
        </div>
        <AdSlot label="Reserved for one responsive display ad after AdSense approval." size="sidebar" />
      </section>

      <StickerPlanner />

      <section className="content-band two-column">
        <div>
          <p className="eyebrow">Niche angle</p>
          <h2>Built for small-batch sellers, not generic print shops.</h2>
          <p>
            Most calculators stop at simple rows and columns. StickerFit handles mixed SKUs, freebies, bleed, gaps, and
            platform fees in the same workspace, so a maker can turn a listing idea into a production sheet and price
            check without opening a spreadsheet.
          </p>
        </div>
        <div className="checklist">
          <span>Mixed-size sticker nesting</span>
          <span>SVG and CSV exports</span>
          <span>Waste and margin signals</span>
          <span>AdSense-ready content structure</span>
        </div>
      </section>
    </main>
  );
}
