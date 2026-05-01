import type { Metadata } from "next";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for StickerFit Studio.",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <main className="article-page narrow">
      <header className="article-hero">
        <p className="eyebrow">Policy</p>
        <h1>Privacy Policy</h1>
        <p>Last updated April 30, 2026.</p>
      </header>
      <article className="article-body">
        <p>
          StickerFit Studio runs the calculator in your browser. You do not need an account, and the tool does not upload
          sticker artwork or calculator inputs to our servers.
        </p>
        <h2>Analytics and ads</h2>
        <p>
          We may use analytics and advertising partners to understand site usage, keep the tool free, measure ads, and
          prevent abuse. These partners may use cookies or similar technologies according to their own policies.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </article>
    </main>
  );
}
