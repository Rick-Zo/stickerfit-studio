import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for StickerFit Studio.",
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
          StickerFit Studio stores calculator inputs in your browser session only. The current version does not require an
          account, collect payment data, or send sticker artwork to a server.
        </p>
        <h2>Analytics and ads</h2>
        <p>
          A production deployment may use privacy-respecting analytics and Google AdSense. Ad providers may use cookies
          and similar technologies to measure ads and prevent abuse. Add your live provider details here before launch.
        </p>
        <h2>Contact</h2>
        <p>Replace this placeholder with the site owner&apos;s public contact email before submitting to AdSense.</p>
      </article>
    </main>
  );
}
