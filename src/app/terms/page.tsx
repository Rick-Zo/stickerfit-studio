import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for StickerFit Studio, including acceptable use, paid offers, and support terms.",
  alternates: {
    canonical: "/terms/",
  },
};

export default function TermsPage() {
  return (
    <main className="article-page narrow">
      <header className="article-hero">
        <p className="eyebrow">Policy</p>
        <h1>Terms of Use</h1>
        <p>Last updated May 3, 2026.</p>
      </header>
      <article className="article-body">
        <p>
          StickerFit Studio provides browser-based sticker sheet planning tools, production guides, and related digital
          resources for small sticker shops. By using the site, you agree to use the calculator and any downloadable or
          paid resources responsibly and only for lawful business or personal planning.
        </p>
        <h2>Estimates and production responsibility</h2>
        <p>
          The calculator provides estimates for layout, waste, material usage, and pricing. You are responsible for
          checking final dimensions, fees, taxes, print quality, cut settings, marketplace rules, and customer promises
          before selling or shipping any sticker product.
        </p>
        <h2>Paid offers and checkout</h2>
        <p>
          The core calculator is currently free to use. If paid digital products, templates, subscriptions, or Pro
          features become available, the relevant product page or checkout will show the price, currency, billing
          interval, included features, and any applicable taxes before you pay.
        </p>
        <p>
          Payments may be processed by payment providers such as Stripe or Creem. StickerFit Studio does not ask you to
          email card details and does not store full card numbers on this website.
        </p>
        <h2>Delivery, refunds, and cancellation</h2>
        <p>
          Paid digital products are delivered online through the checkout flow, receipt email, download link, or account
          access page described at purchase. No physical shipping is provided unless a product page clearly says
          otherwise.
        </p>
        <p>
          Refund and cancellation terms are described in the <Link href="/refund-policy/">Refund Policy</Link>. For
          billing questions, subscription cancellation help, refund requests, or receipt issues, contact{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
        <h2>Acceptable use</h2>
        <p>
          You may not use StickerFit Studio to plan, sell, or promote illegal products, counterfeit goods, products that
          infringe another party&apos;s intellectual property, or any activity that violates the rules of the platforms or
          payment providers you use.
        </p>
        <h2>No affiliation</h2>
        <p>
          StickerFit Studio is independent and is not affiliated with Cricut, Silhouette, Etsy, Google, or their related
          brands.
        </p>
        <h2>Limitation</h2>
        <p>
          StickerFit Studio is provided as-is. To the fullest extent permitted by law, we are not responsible for losses
          caused by incorrect production settings, marketplace fee changes, customer disputes, or business decisions made
          from calculator estimates.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </article>
    </main>
  );
}
