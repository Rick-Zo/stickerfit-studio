import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing information for StickerFit Studio's free calculator and future paid digital products.",
  alternates: {
    canonical: "/pricing/",
  },
};

export default function PricingPage() {
  return (
    <main className="article-page narrow">
      <header className="article-hero">
        <p className="eyebrow">Pricing</p>
        <h1>StickerFit Studio pricing</h1>
        <p>The sticker sheet calculator is free to use. Paid digital products are not available for purchase yet.</p>
      </header>
      <article className="article-body">
        <h2>Free calculator</h2>
        <p>
          Price: 0 USD. The free calculator includes mixed-size sticker layout planning, bleed and gap controls, sheet
          usage estimates, profit inputs, SVG export, and CSV cut-list export.
        </p>
        <h2>Future paid products</h2>
        <p>
          If we launch paid downloads, templates, subscriptions, or Pro features, each product page and checkout will
          show the final price, currency, billing interval, included features, tax handling, and refund terms before
          payment.
        </p>
        <h2>Billing questions</h2>
        <p>
          For pricing, receipt, cancellation, or refund questions, email{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. You can also read the{" "}
          <Link href="/refund-policy/">Refund Policy</Link> and <Link href="/terms/">Terms of Use</Link>.
        </p>
      </article>
    </main>
  );
}
