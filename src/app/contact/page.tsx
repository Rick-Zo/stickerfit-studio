import type { Metadata } from "next";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact StickerFit Studio about the sticker sheet calculator, production planning, and site feedback.",
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
          For calculator feedback, production-planning questions, accessibility issues, or partnership inquiries, email{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
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
