import type { Metadata } from "next";

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
        <h2>Contact status</h2>
        <p>
          Public contact details will be added after the custom domain and site mailbox are ready.
        </p>
        <h2>What to include</h2>
        <p>
          If you are reporting a layout issue, include the paper preset, sticker dimensions, quantity, bleed, gap, and
          whether rotation was enabled. Do not send private customer data or payment details.
        </p>
      </article>
    </main>
  );
}
