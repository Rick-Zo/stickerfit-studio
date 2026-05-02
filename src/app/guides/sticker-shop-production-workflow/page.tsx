import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, getGuide } from "@/lib/guides";

const guide = getGuide("sticker-shop-production-workflow");

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: {
    canonical: "/guides/sticker-shop-production-workflow/",
  },
};

export default function StickerShopWorkflowPage() {
  return (
    <main className="article-page">
      <JsonLd data={articleSchema(guide)} />
      <header className="article-hero">
        <p className="eyebrow">Workflow guide</p>
        <h1>A sticker shop workflow that protects quality and margin.</h1>
        <p>
          A repeatable workflow turns a design idea into production notes, sheet exports, quality checks, and packed
          orders without forcing you to solve the same layout problem every batch.
        </p>
      </header>

      <div className="article-layout">
        <article className="article-body">
          <h2>Step 1: Decide the product unit</h2>
          <p>
            Before designing the listing image, decide what the customer receives: one large sticker, a mini sheet, a
            sampler, or a bundle. The product unit determines what has to fit on the sheet and how pricing should work.
          </p>

          <h2>Step 2: Plan the sheet</h2>
          <p>
            Enter sticker dimensions, quantity, bleed, gap, and safety margin in the calculator. Keep freebies and label
            variants as separate items. This shows whether the idea fits one sheet or spills into another production
            unit.
          </p>

          <h2>Step 3: Export repeatable notes</h2>
          <p>
            Save the SVG layout and CSV cut list with the product name. The CSV gives sheet number, item name, position,
            size, and rotation. Those details make repeat batches faster and reduce mistakes.
          </p>

          <h2>Step 4: Proof before scaling</h2>
          <p>
            Print one proof sheet and cut it with the same settings you plan to use for the batch. If the proof needs
            wider gaps, larger bleed, or a different arrangement, update the saved production notes.
          </p>

          <h2>Step 5: Review margin after the proof</h2>
          <p>
            Update material waste, labor time, and packaging cost after the proof. A beautiful design is not ready for a
            listing until the production workflow still leaves enough margin.
          </p>

          <p>
            Start the workflow with the <Link href="/">free sticker sheet planner</Link>.
          </p>
        </article>

        <aside className="article-aside">
          <AdSlot size="sidebar" />
          <div className="side-note">
            <strong>Repeatability matters</strong>
            <p>A profitable sticker is not only one that sells. It is one you can reproduce without redoing the setup.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
