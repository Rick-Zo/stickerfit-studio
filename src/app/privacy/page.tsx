import type { Metadata } from "next";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for StickerFit Studio, including calculator data, analytics, ads, and payment processing.",
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
        <p>Last updated May 3, 2026.</p>
      </header>
      <article className="article-body">
        <p>
          StickerFit Studio runs the calculator in your browser. You do not need an account, and the tool does not upload
          sticker artwork or calculator inputs to our servers.
        </p>
        <h2>Support messages</h2>
        <p>
          If you email us, we receive the information you choose to send, such as your email address, calculator settings,
          billing question, or support request. Do not send private customer data, full card numbers, or sensitive
          identity documents by email.
        </p>
        <h2>Payments</h2>
        <p>
          If paid digital products or subscriptions become available, checkout may be handled by payment providers such
          as Stripe or Creem. Those providers may collect payment details, billing information, tax information, fraud
          signals, and receipt data under their own policies. StickerFit Studio does not store full card numbers.
        </p>
        <h2>Analytics and ads</h2>
        <p>
          We may use analytics and advertising partners to understand site usage, keep the tool free, measure ads, and
          prevent abuse. These partners may use cookies or similar technologies according to their own policies.
        </p>
        <h2>Cookies and local data</h2>
        <p>
          The site may use browser storage, cookies, or similar technologies for analytics, advertising, security, and
          checkout features. Calculator layouts and exports are generated locally in your browser unless a future paid
          feature clearly explains otherwise.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </article>
    </main>
  );
}
