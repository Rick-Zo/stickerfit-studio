import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why StickerFit Studio helps sticker sellers plan Cricut and Silhouette sticker sheets with less waste and clearer pricing.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  return (
    <main className="article-page narrow">
      <header className="article-hero">
        <p className="eyebrow">About StickerFit Studio</p>
        <h1>A practical planner for small-batch sticker production.</h1>
        <p>
          StickerFit Studio helps makers turn sticker ideas into print-ready sheet plans with clearer layout, waste, and
          pricing signals.
        </p>
      </header>
      <article className="article-body">
        <h2>Why this tool exists</h2>
        <p>
          Sticker sellers often work with tight print-and-cut areas, mixed product sizes, sampler sheets, freebies, and
          marketplace fees. A design that looks profitable can quickly become expensive if it wastes paper or spills onto
          an extra sheet. StickerFit Studio brings layout planning and sheet-level pricing into one workspace.
        </p>
        <h2>Who it is for</h2>
        <p>
          The calculator is built for Etsy sellers, planner sticker shops, handmade stationery brands, and anyone using a
          desktop cutter such as Cricut or Silhouette for short-run sticker products.
        </p>
        <h2>How to use it</h2>
        <p>
          Add your sticker dimensions, choose a cuttable-area preset, adjust bleed and spacing, then export the SVG layout
          or CSV cut list. Always verify the final file in your printer and cutting software before production.
        </p>
      </article>
    </main>
  );
}
