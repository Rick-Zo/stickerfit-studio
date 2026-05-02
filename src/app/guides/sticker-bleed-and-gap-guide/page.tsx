import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, getGuide } from "@/lib/guides";

const guide = getGuide("sticker-bleed-and-gap-guide");

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: {
    canonical: "/guides/sticker-bleed-and-gap-guide/",
  },
};

export default function StickerBleedGapGuidePage() {
  return (
    <main className="article-page">
      <JsonLd data={articleSchema(guide)} />
      <header className="article-hero">
        <p className="eyebrow">Production guide</p>
        <h1>Sticker bleed and gap settings: cleaner cuts without wasting the sheet.</h1>
        <p>
          Bleed, gap, and safety margin are small numbers that decide whether a sheet cuts cleanly, fits efficiently, and
          survives repeat production.
        </p>
      </header>

      <div className="article-layout">
        <article className="article-body">
          <h2>What bleed does</h2>
          <p>
            Bleed extends artwork beyond the final cut edge. If the cutter is slightly off, bleed helps prevent a white
            rim around the sticker. The tradeoff is simple: more bleed means each sticker uses more sheet space.
          </p>

          <h2>What gap does</h2>
          <p>
            Gap is the open space between stickers. It gives the blade and the user room to work. Tight gaps may improve
            yield, but they can make cutting, peeling, and quality control harder, especially on glossy or laminated
            sheets.
          </p>

          <h2>How safety margin differs</h2>
          <p>
            Safety margin protects the edge of the working area. It is not the same as gap. Gap separates stickers from
            each other; safety margin separates the whole layout from the machine boundary.
          </p>

          <h2>A reliable testing workflow</h2>
          <ol>
            <li>Start with conservative bleed and gap values.</li>
            <li>Print one proof sheet before a full batch.</li>
            <li>Reduce gap only if the sheet cuts and weeds consistently.</li>
            <li>Record the final values with your SVG and CSV exports.</li>
          </ol>

          <h2>When smaller is not better</h2>
          <p>
            A layout that fits more stickers can still cost more if it causes failed cuts or slow weeding. The best
            setting is the one that gives enough yield while keeping production repeatable.
          </p>

          <p>
            Try your own numbers in the <Link href="/">free sticker sheet calculator</Link> and compare sheet count,
            coverage, and waste.
          </p>
        </article>

        <aside className="article-aside">
          <AdSlot size="sidebar" />
          <div className="side-note">
            <strong>Quality check</strong>
            <p>If a tighter layout adds rework, it is not cheaper. Include failed sheets in your pricing model.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
