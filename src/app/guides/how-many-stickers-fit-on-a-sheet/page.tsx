import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, getGuide } from "@/lib/guides";

const guide = getGuide("how-many-stickers-fit-on-a-sheet");

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: {
    canonical: "/guides/how-many-stickers-fit-on-a-sheet/",
  },
};

export default function HowManyStickersFitPage() {
  return (
    <main className="article-page">
      <JsonLd data={articleSchema(guide)} />
      <header className="article-hero">
        <p className="eyebrow">Layout guide</p>
        <h1>How many stickers fit on a sheet? Start with the usable area.</h1>
        <p>
          The answer is rarely just rows times columns. A realistic estimate needs finished sticker size, bleed, gaps,
          safety margin, rotation, and whether small freebies can fill leftover space.
        </p>
      </header>

      <div className="article-layout">
        <article className="article-body">
          <h2>The quick estimate</h2>
          <p>
            Start with the cuttable working area, not the paper size. Subtract safety margin, add bleed to each sticker,
            then add the gap between stickers. That gives a practical footprint for each piece.
          </p>
          <div className="formula-box">
            Sticker footprint = finished size + bleed on both sides + required gap
          </div>

          <h2>Why simple grid math is often wrong</h2>
          <p>
            A grid estimate works for one sticker size, but real seller sheets often include logo stickers, product
            labels, sampler pieces, and freebies. A 2 in round sticker may leave strips of empty space that fit 1 in
            freebies perfectly. A long label may fit only if rotation is allowed. These details can change sheet count
            and profit.
          </p>

          <h2>Planning checklist</h2>
          <ol>
            <li>Choose the cutter preset that matches your production setup.</li>
            <li>Enter the finished size, not the artboard size.</li>
            <li>Add bleed before judging how many pieces fit.</li>
            <li>Use realistic gaps so cutting and weeding stay reliable.</li>
            <li>Test rotation for labels, freebies, and packaging stickers.</li>
          </ol>

          <h2>Example seller decision</h2>
          <p>
            If a sticker idea needs two sheets for one listing, the problem may not be the sale price. It may be the size
            mix. Try reducing the largest sticker slightly, rotating labels, or moving freebies onto leftover space. A
            small layout change can avoid an extra sheet and protect margin.
          </p>

          <p>
            Want the exact count for your sticker mix? <Link href="/">Open the sticker sheet calculator</Link> and test
            your real dimensions.
          </p>
        </article>

        <aside className="article-aside">
          <AdSlot size="sidebar" />
          <div className="side-note">
            <strong>Seller tip</strong>
            <p>Use one sheet as the planning unit. If the listing spills onto another sheet, recalculate price before posting.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
