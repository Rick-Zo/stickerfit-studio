import type { Metadata } from "next";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund, cancellation, and digital delivery policy for StickerFit Studio.",
  alternates: {
    canonical: "/refund-policy/",
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="article-page narrow">
      <header className="article-hero">
        <p className="eyebrow">Policy</p>
        <h1>Refund Policy</h1>
        <p>Last updated May 3, 2026.</p>
      </header>
      <article className="article-body">
        <p>
          StickerFit Studio is currently a free browser-based calculator. This policy applies if we offer paid digital
          downloads, templates, subscriptions, or Pro features in the future.
        </p>
        <h2>Digital delivery</h2>
        <p>
          Paid products are delivered digitally through the checkout flow, receipt email, download link, or account
          access page described at purchase. We do not provide physical shipping unless a product page clearly says
          otherwise.
        </p>
        <h2>Refund requests</h2>
        <p>
          Contact <a href={`mailto:${contactEmail}`}>{contactEmail}</a> within 14 days of purchase if you cannot access
          the product, were charged twice, believe there was a billing error, or the product is materially different from
          the description shown at checkout.
        </p>
        <p>
          Refunds are reviewed case by case. Completed downloads, completed services, or change-of-mind requests after
          substantial use are generally not refundable unless required by law or the checkout page states a different
          policy.
        </p>
        <h2>Subscriptions</h2>
        <p>
          If a recurring subscription is offered, the checkout page will show the billing interval and price before you
          pay. You can cancel future renewals through the billing portal, customer portal, receipt link, or by contacting
          support. Any remaining access period is shown in the checkout, receipt, or portal for that product.
        </p>
        <h2>Response time</h2>
        <p>
          We aim to respond to billing, cancellation, and refund requests within 3 business days. Please contact support
          before opening a payment dispute so we can investigate the issue quickly.
        </p>
      </article>
    </main>
  );
}
