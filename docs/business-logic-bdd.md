# StickerFit Studio Business Logic BDD

## Product Context

StickerFit Studio is a public, free sticker sheet calculator for small-batch sellers. The business goal is to attract makers who search for sticker sheet layout, Cricut Print Then Cut sizing, and Etsy sticker pricing help, then keep them on the site with a useful production planning workflow that can support SEO and future AdSense revenue.

Primary users:

- Sticker sellers using Cricut, Silhouette, or similar desktop cutters.
- Etsy or handmade shop owners who need sheet-level pricing and waste estimates.
- Search visitors reading guides before using the calculator.

Core value:

- Convert sticker dimensions, quantities, bleed, gaps, and production costs into a practical sheet plan.
- Show sheet count, placed quantity, waste, and estimated profit before the user prints.
- Export layout and cut-list files that help repeat production runs.

## Feature: Sheet Preset Selection

Scenario: User starts with a known cutter preset

Given a sticker seller opens the calculator
When they select a preset such as Cricut Letter, Cricut A4, Silhouette Letter, or Full Letter Proof
Then the calculator should apply the correct sheet size and cuttable area
And the preview should update without requiring a page reload
And the layout metrics should reflect the selected working area

Scenario: User changes bleed, gap, or safety margin

Given the seller has entered sticker dimensions
When they adjust bleed, gap, or safety margin
Then the packer should recalculate usable space
And placed quantity, sheet count, and waste should update immediately
And the preview should show the resulting layout boundaries

## Feature: Mixed Sticker Planning

Scenario: User plans a sheet with multiple sticker sizes

Given the seller has multiple sticker products or freebies
When they add each sticker name, width, height, quantity, and color
Then the system should pack those mixed sizes into one or more sheets
And each placed item should retain its name, position, dimensions, and color

Scenario: User allows rotation

Given a sticker can fit better when rotated
When rotation is enabled
Then the packing logic may rotate eligible items
And the preview and CSV export should identify rotated placements

Scenario: User removes or edits an item

Given the seller has a sticker mix configured
When they remove an item or change a quantity
Then the sheet plan should recalculate from the current inputs only
And old placements should not remain in the preview or export

## Feature: Layout Metrics and Profit Check

Scenario: Calculator summarizes production impact

Given the user has entered a sticker mix
When the layout is calculated
Then the system should show placed items, required sheet count, coverage, and waste
And these metrics should help the seller decide whether a product idea is efficient enough to print

Scenario: User estimates sheet profitability

Given the seller enters material, ink, labor, packaging, platform fee, and selling price assumptions
When the calculator updates
Then the profit panel should estimate sheet-level cost, fee impact, and margin
And the result should be presented as a planning estimate, not a financial guarantee

## Feature: Production Exports

Scenario: User exports an SVG layout

Given the current layout has at least one placed sticker
When the user clicks Export SVG
Then the system should download a visual production layout
And the exported file should match the currently selected sheet plan

Scenario: User exports a CSV cut list

Given the current layout has placed stickers across one or more sheets
When the user clicks Cut List CSV
Then the system should download rows containing sheet number, item name, dimensions, position, and rotation
And the file should support repeat production notes outside the website

## Feature: Public Content and Trust Pages

Scenario: Search visitor lands on a guide

Given a visitor searches for sticker pricing or Cricut Print Then Cut sizing
When they open a guide page
Then the page should answer the query directly
And it should link naturally back to the calculator workflow
And it should use canonical URLs, sitemap inclusion, and structured data suitable for indexing

Scenario: Visitor checks site legitimacy

Given a visitor reviews the footer
When they open About, Contact, Privacy, or Terms
Then each page should read like a production website
And no demo-only, temporary, or internal launch notes should appear
And the public contact route should use a domain-based support address

## Non-Functional Acceptance Criteria

- The calculator must run without user accounts.
- Sticker artwork and calculator inputs must stay in the browser unless a future backend feature explicitly changes that policy.
- The homepage, guides, contact, privacy, terms, robots, and sitemap routes must return HTTP 200 in production.
- Footer navigation should prioritize user-facing trust pages; `sitemap.xml` should remain available for crawlers but should not be presented as a primary user link.
- Public pages must avoid personal contact details, local machine paths, demo notes, or temporary launch language.
- SEO metadata should use the production domain, currently `https://sticker-fit.com`.

## Future Optimization Points

- Configure a working domain mailbox or email routing for `support@sticker-fit.com`.
- Add a lightweight contact form backed by a trusted form service or serverless endpoint with spam protection.
- Add saved presets in local storage so repeat sellers can keep common sticker mixes and cost assumptions.
- Add metric/imperial unit switching for non-US sellers.
- Add more cutter presets and clearly document each working area source.
- Add a comparison mode that shows how changing gap, bleed, or rotation affects sheet count and margin.
- Expand guide content around sticker pricing, vinyl waste reduction, and platform fee examples.
- Add AdSense only after policy pages, contact flow, original guide content, and traffic quality are stable.
- Add analytics events for preset changes, exports, and guide-to-calculator flows without collecting private production data.
- Add visual regression checks for the calculator at desktop and mobile widths.
