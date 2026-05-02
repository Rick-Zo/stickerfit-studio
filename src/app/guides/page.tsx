import type { Metadata } from "next";
import Link from "next/link";
import { guides, guidePath } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Sticker Seller Guides",
  description:
    "Practical guides for sticker sheet layout, Cricut planning, sticker paper cost, Etsy pricing, bleed, gaps, and production workflow.",
  alternates: {
    canonical: "/guides/",
  },
};

export default function GuidesPage() {
  return (
    <main className="article-page">
      <header className="article-hero">
        <p className="eyebrow">Sticker seller guides</p>
        <h1>Plan cleaner sticker sheets, price them better, and waste less paper.</h1>
        <p>
          These guides are written for small-batch sellers who need practical production decisions, not generic craft
          advice. Start with the calculator, then use the guides to refine sizing, cost, and workflow.
        </p>
      </header>

      <section className="content-band editorial-grid guide-grid" aria-label="Sticker seller guide library">
        {guides.map((guide) => (
          <article key={guide.slug}>
            <p className="eyebrow">{guide.category}</p>
            <h2>
              <Link href={guidePath(guide.slug)}>{guide.title}</Link>
            </h2>
            <p>{guide.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
