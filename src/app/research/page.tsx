import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Niche Research",
  description: "Why StickerFit Studio targets sticker makers and Etsy sellers as a focused utility-content site.",
};

export default function ResearchPage() {
  return (
    <main className="article-page">
      <header className="article-hero">
        <p className="eyebrow">Market research</p>
        <h1>Why a sticker sheet planner is a focused Adsense-ready tool niche.</h1>
        <p>
          Research snapshot prepared on April 30, 2026. The project targets a specific workflow: small sellers who need
          to fit sticker designs into Cricut/Silhouette print-and-cut limits while keeping sheet profit visible.
        </p>
      </header>

      <div className="article-layout">
        <article className="article-body">
          <h2>Demand signal</h2>
          <p>
            Etsy reported 5.6 million Etsy marketplace active sellers as of December 31, 2025, and sticker makers sit
            inside a broader handmade, stationery, planner, and party-supply seller ecosystem. That is large enough for
            search traffic, but the tool still serves a narrow production problem.
          </p>

          <h2>Constraint signal</h2>
          <p>
            Cricut Print Then Cut does not use the full paper sheet because registration marks and machine limits reduce
            the cuttable area. Cricut&apos;s own help page lists Letter at 7.44 x 9.94 in and A4 at 7.2 x 10.62 in maximum
            cuttable dimensions for compatible machines. That creates a repeated calculator need.
          </p>

          <h2>Monetization fit</h2>
          <p>
            Google Publisher Policies require publisher content and prohibit low-value or under-construction screens.
            StickerFit Studio keeps the tool as the main value, adds original guides, includes privacy/terms pages, and
            reserves clearly labeled ad placements without blocking the interface.
          </p>

          <h2>Innovation points</h2>
          <ul>
            <li>Mixed-size sticker nesting instead of a single row/column calculator.</li>
            <li>Real-time waste, coverage, margin, and break-even price signals in one workspace.</li>
            <li>Exportable SVG layout and CSV cut list for production handoff.</li>
            <li>SEO guides mapped to practical search intents like sticker profit and Cricut cuttable area.</li>
          </ul>

          <h2>Initial content roadmap</h2>
          <p>
            Publish 8-12 supporting pages before applying for AdSense: paper size guides, sticker material cost tables,
            Cricut vs Silhouette notes, Etsy fee/pricing examples, printable label templates, and troubleshooting
            articles based on real maker questions.
          </p>

          <h2>Sources</h2>
          <ul>
            <li>
              <a href="https://investors.etsy.com/news-events/press-releases/detail/218/etsy-inc-reports-fourth-quarter-and-full-year-2025-results">
                Etsy FY 2025 results
              </a>
            </li>
            <li>
              <a href="https://help.cricut.com/hc/en-us/articles/360009429814-How-large-can-I-Print-Then-Cut">
                Cricut Print Then Cut maximum size help page
              </a>
            </li>
            <li>
              <a href="https://support.google.com/adsense/answer/1348688?hl=en">Google Publisher Policies</a>
            </li>
          </ul>
        </article>

        <aside className="article-aside">
          <AdSlot label="Research page sidebar ad placement after approval." size="sidebar" />
          <div className="side-note">
            <strong>Positioning</strong>
            <p>Use the calculator as the repeat-visit anchor, then expand traffic with focused guides.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
