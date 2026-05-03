import type { Metadata } from "next";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact StickerFit Studio about the calculator, production planning, billing support, and site feedback.",
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <main className="article-page narrow">
      <header className="article-hero">
        <p className="eyebrow">Contact</p>
        <h1>Questions or feedback about StickerFit Studio?</h1>
        <p>
          Send feedback, bug reports, and production-planning questions. Clear examples help us improve the calculator.
        </p>
      </header>
      <article className="article-body">
        <h2>Email support</h2>
        <p>
          For calculator feedback, production-planning questions, accessibility issues, billing questions, refund
          requests, or partnership inquiries, email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
        <h2>Billing support</h2>
        <p>
          If you contact us about a paid product, include the order email, receipt ID, product name, and a short
          description of the issue. We aim to respond to billing and refund requests within 3 business days.
        </p>
        <h2>What to include</h2>
        <p>
          If you are reporting a layout issue, include the paper preset, sticker dimensions, quantity, bleed, gap, and
          whether rotation was enabled. Do not send private customer data or payment details.
        </p>
        <h2>Response expectations</h2>
        <p>
          StickerFit Studio is a free planning tool. We prioritize reports that include reproducible calculator settings
          and clear examples of the expected sheet layout.
        </p>
      </article>
    </main>
  );
}
