import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, getGuide } from "@/lib/guides";

const guide = getGuide("common-sticker-sizes-for-cricut");

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: {
    canonical: "/guides/common-sticker-sizes-for-cricut/",
  },
};

export default function CommonStickerSizesPage() {
  return (
    <main className="article-page">
      <JsonLd data={articleSchema(guide)} />
      <header className="article-hero">
        <p className="eyebrow">Size guide</p>
        <h1>Common sticker sizes for Cricut sheets and small shops.</h1>
        <p>
          Sticker size is a product decision and a production decision. The right dimensions should feel good to the
          customer while still fitting efficiently on your sheet.
        </p>
      </header>

      <div className="article-layout">
        <article className="article-body">
          <h2>Common size ranges</h2>
          <div className="data-table" role="table" aria-label="Common sticker size planning ranges">
            <div role="row">
              <strong role="columnheader">Sticker type</strong>
              <strong role="columnheader">Common use</strong>
              <strong role="columnheader">Planning note</strong>
            </div>
            <div role="row">
              <span role="cell">1 in minis</span>
              <span role="cell">Freebies, icons, planner dots</span>
              <span role="cell">Great for filling leftover space</span>
            </div>
            <div role="row">
              <span role="cell">2 in rounds</span>
              <span role="cell">Logo stickers, seals, packs</span>
              <span role="cell">Easy to compare across sheets</span>
            </div>
            <div role="row">
              <span role="cell">3 x 1 in labels</span>
              <span role="cell">Packaging and business labels</span>
              <span role="cell">Rotation can improve yield</span>
            </div>
          </div>

          <h2>Choose size by use case</h2>
          <p>
            Planner stickers need to fit spreads and habit trackers. Packaging stickers need to be readable on mailers or
            sleeves. Laptop and water bottle stickers can be larger, but they may reduce sheet yield quickly.
          </p>

          <h2>Design sets around the sheet</h2>
          <p>
            If you sell themed packs, choose sizes that work together. A large hero sticker can pair with small accent
            pieces, while long labels may sit beside mini icons. Mixed-size planning helps the set feel intentional
            without wasting an entire strip of paper.
          </p>

          <h2>Test before committing to a product line</h2>
          <p>
            Create a few variants and compare sheet count, waste, and price. A sticker that is only slightly smaller may
            unlock a cleaner layout and a better margin without changing the customer experience much.
          </p>

          <p>
            Compare size options in <Link href="/">StickerFit Studio</Link> before choosing the final listing dimensions.
          </p>
        </article>

        <aside className="article-aside">
          <AdSlot size="sidebar" />
          <div className="side-note">
            <strong>Size strategy</strong>
            <p>Do not pick sizes in isolation. Pick a set of sizes that share a sheet efficiently.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
