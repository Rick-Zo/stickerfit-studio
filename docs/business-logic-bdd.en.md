# StickerFit Studio BDD Specification

## Metadata

- Product: StickerFit Studio
- Domain: Sticker sheet layout planning and sheet-level pricing
- Production domain: `https://sticker-fit.com`
- Primary user: Small-batch sticker seller
- Document style: Behavior-Driven Development, Gherkin-compatible
- Scenario ID format: `SSF-<feature number>-<scenario number>`

## Business Goal

StickerFit Studio helps sticker sellers plan mixed-size Cricut and Silhouette sticker sheets before printing. The site should attract search visitors with useful content, convert them into calculator users, and provide enough trust signals for a production website that can later support AdSense revenue.

## Actors

- `Sticker seller`: A maker who prepares sticker sheets for sale or fulfillment.
- `Search visitor`: A visitor who arrives through Google or another search engine.
- `Returning seller`: A seller who comes back to repeat or adjust a production plan.
- `Crawler`: A search engine bot reading metadata, robots, and sitemap routes.

## Domain Glossary

- `Sheet preset`: A named paper and cutter profile, such as Cricut Letter or Silhouette Letter.
- `Working area`: The printable or cuttable area inside a sheet preset.
- `Sticker item`: A sticker definition with name, width, height, quantity, and color.
- `Bleed`: Extra margin around a sticker for print and cut tolerance.
- `Gap`: Required spacing between placed stickers.
- `Safety margin`: Inner offset from the working-area boundary.
- `Placed item`: A sticker instance that fits on a generated sheet.
- `Unplaced item`: A sticker instance that cannot fit within the current constraints.
- `Coverage`: The percentage of working area occupied by placed stickers.
- `Waste`: Remaining unused working area after placement.
- `Sheet profit`: Estimated revenue minus material, ink, labor, packaging, and platform fees.

## Global Invariants

```gherkin
Feature: Global production behavior

  Rule: The public website must behave like an operating product

    Scenario: SSF-00-01 Public pages contain no internal launch notes
      Given a visitor opens any public page
      When the page content is rendered
      Then the page must not show demo-only wording
      And the page must not show temporary setup notes
      And the page must not show personal email addresses
      And the page must not show local machine paths

    Scenario: SSF-00-02 The calculator can be used without an account
      Given a sticker seller opens the homepage
      When they use the calculator controls
      Then they must not be required to sign in
      And their sticker dimensions must remain usable in the browser session

    Scenario: SSF-00-03 Public metadata uses the production domain
      Given a crawler requests a public page
      When it reads canonical URLs, Open Graph URLs, JSON-LD, robots, and sitemap entries
      Then those URLs should use "https://sticker-fit.com"
```

## Feature 1: Public Navigation and Trust Pages

```gherkin
Feature: Public navigation and trust pages

  Rule: Footer navigation should serve human visitors

    Scenario: SSF-01-01 Footer exposes user-facing trust pages
      Given a visitor opens the homepage
      When they review the footer
      Then they should see links to About, Contact, Privacy, and Terms
      And they should not see a visible Sitemap footer link

    Scenario: SSF-01-02 Sitemap remains available for crawlers
      Given a crawler requests "/sitemap.xml"
      When the route is served
      Then the response should return HTTP 200
      And the sitemap should list the homepage, guides, About, Contact, Privacy, and Terms pages

    Scenario: SSF-01-03 Contact page reads like an active support page
      Given a visitor opens "/contact/"
      When the content is rendered
      Then the page should show the support email "support@sticker-fit.com"
      And the page should explain what information to include in a layout issue report
      And the page should not mention that contact details will be added later
```

## Feature 2: Sheet Preset Selection

```gherkin
Feature: Sheet preset selection

  Rule: Presets define the available production space

    Scenario Outline: SSF-02-01 Seller selects a cutter preset
      Given a sticker seller is on the calculator
      When they select the "<preset>" preset
      Then the calculator should apply the matching sheet size
      And the calculator should apply the matching working area
      And the preview should update without a page reload
      And layout metrics should recalculate from the selected preset

      Examples:
        | preset            |
        | Cricut Letter     |
        | Cricut A4         |
        | Silhouette Letter |
        | Full Letter Proof |

    Scenario: SSF-02-02 Seller adjusts production spacing
      Given a sticker seller has selected a sheet preset
      And at least one sticker item exists
      When they change bleed, gap, or safety margin
      Then the packing engine should recalculate usable space
      And placed quantity, sheet count, coverage, and waste should update
      And the preview should show the new layout boundaries
```

## Feature 3: Sticker Mix Management

```gherkin
Feature: Sticker mix management

  Rule: The seller can model a real mixed-size sticker sheet

    Scenario: SSF-03-01 Seller adds multiple sticker items
      Given the seller has products, labels, samplers, or freebies to print
      When they add sticker name, width, height, quantity, and color for each item
      Then the system should treat each row as a distinct sticker item
      And the preview should preserve item name and color
      And the exported data should preserve item dimensions and quantity

    Scenario: SSF-03-02 Seller edits an existing sticker item
      Given the seller has a sticker mix configured
      When they edit an item name, size, quantity, or color
      Then the sheet plan should recalculate using the current item values
      And old placements should not remain in the preview

    Scenario: SSF-03-03 Seller removes a sticker item
      Given the seller has more than one sticker item
      When they remove one item
      Then the removed item should no longer appear in metrics, preview, SVG export, or CSV export
```

## Feature 4: Packing, Rotation, and Metrics

```gherkin
Feature: Packing, rotation, and metrics

  Rule: Layout results should help the seller decide whether a sheet is efficient

    Scenario: SSF-04-01 Calculator packs mixed-size stickers
      Given a sticker mix contains different sizes
      When the layout is calculated
      Then the engine should place stickers across one or more sheets
      And each placed item should have a sheet number, x position, y position, width, height, and rotation state
      And any item that cannot fit should be counted as unplaced

    Scenario: SSF-04-02 Rotation improves yield when enabled
      Given a sticker item can fit better when rotated
      When rotation is enabled
      Then the packing engine may rotate eligible placements
      And the preview should visually reflect rotated placements
      And the CSV export should identify rotated placements

    Scenario: SSF-04-03 Rotation is blocked when disabled
      Given a sticker item would fit only by rotating
      When rotation is disabled
      Then the packing engine should not rotate that item
      And the item should remain unplaced if it cannot fit in its original orientation

    Scenario: SSF-04-04 Metrics summarize production impact
      Given a layout has been calculated
      When the seller reviews the metrics panel
      Then they should see placed quantity, sheet count, coverage, and waste
      And these metrics should change immediately after relevant input changes
```

## Feature 5: Sheet-Level Profit Estimation

```gherkin
Feature: Sheet-level profit estimation

  Rule: Pricing output is a planning estimate, not a financial guarantee

    Scenario: SSF-05-01 Seller enters cost assumptions
      Given the seller has a sheet plan
      When they enter material, ink, labor, packaging, platform fee, and selling price assumptions
      Then the calculator should estimate sheet-level cost
      And the calculator should estimate fee impact
      And the calculator should estimate margin or profit

    Scenario: SSF-05-02 Profit updates with sheet count
      Given the seller has entered cost assumptions
      When sheet count changes because of layout inputs
      Then the profit estimate should update from the current sheet count
      And the seller should be able to judge whether the product idea remains viable
```

## Feature 6: Production Exports

```gherkin
Feature: Production exports

  Rule: Exports should match the current calculator state

    Scenario: SSF-06-01 Seller exports an SVG layout
      Given the current layout has at least one placed sticker
      When the seller clicks Export SVG
      Then the browser should download an SVG layout
      And the SVG should represent the current sheet preset, working area, and placed stickers

    Scenario: SSF-06-02 Seller exports a CSV cut list
      Given the current layout has at least one placed sticker
      When the seller clicks Cut List CSV
      Then the browser should download a CSV file
      And each row should include sheet number, item name, position, size, and rotation state

    Scenario: SSF-06-03 Exports do not include stale items
      Given the seller has edited or removed a sticker item
      When they export SVG or CSV
      Then the exported file should reflect the latest calculator state only
```

## Feature 7: SEO Entry Points

```gherkin
Feature: SEO entry points

  Rule: Search visitors should find useful content and a clear path to the calculator

    Scenario Outline: SSF-07-01 Guide page answers a search intent
      Given a search visitor opens "<guide_path>"
      When they read the page
      Then the page should answer the primary search intent directly
      And the page should connect the topic back to the sticker sheet calculator
      And the page should have a self-referencing canonical URL

      Examples:
        | guide_path                                      |
        | /guides/sticker-sheet-profit-calculator/        |
        | /guides/cricut-print-then-cut-size-chart/       |

    Scenario: SSF-07-02 Robots and sitemap support indexing
      Given a crawler requests "/robots.txt"
      When the response is served
      Then crawling should not be blocked
      And the response should point to "https://sticker-fit.com/sitemap.xml"

    Scenario: SSF-07-03 Structured data describes the operating website
      Given a crawler reads JSON-LD on the homepage
      When it parses the structured data
      Then it should find Organization and WebSite nodes
      And the Organization node should reference the production logo
      And the contact point should use the domain support address
```

## Feature 8: Privacy and Data Handling

```gherkin
Feature: Privacy and data handling

  Rule: The default calculator workflow should not require server-side storage

    Scenario: SSF-08-01 Calculator inputs stay in the browser
      Given a seller enters sticker sizes, quantities, and cost assumptions
      When they use the calculator
      Then the site should not require an account
      And the site should not upload sticker artwork or calculator inputs to an application server

    Scenario: SSF-08-02 Privacy page explains analytics and ads plainly
      Given a visitor opens "/privacy/"
      When they read the privacy policy
      Then the page should state that analytics and advertising partners may use cookies or similar technologies
      And the page should provide the support email for privacy questions
```

## Future Optimization Backlog

```gherkin
Feature: Future optimization backlog

  Rule: Future work should be testable before implementation

    Scenario: SSF-90-01 Configure domain email routing
      Given "support@sticker-fit.com" is published on the website
      When Cloudflare Email Routing is configured
      Then the address should forward to a verified destination mailbox
      And MX, SPF, and DKIM records should exist for the domain

    Scenario: SSF-90-02 Add saved local presets
      Given a returning seller uses the same sticker mix repeatedly
      When they save a preset
      Then the preset should be stored locally in the browser
      And no account should be required

    Scenario: SSF-90-03 Add metric and imperial units
      Given a seller works outside US inch-based workflows
      When they switch units
      Then dimensions should display in the selected unit system
      And exports should clearly identify the unit used

    Scenario: SSF-90-04 Add layout comparison mode
      Given a seller is optimizing waste and margin
      When they compare different bleed, gap, rotation, or preset settings
      Then the tool should show sheet count, coverage, waste, and profit differences side by side

    Scenario: SSF-90-05 Expand SEO content library
      Given search demand exists around sticker production and pricing
      When new guide pages are published
      Then each guide should target one clear search intent
      And each guide should link to a relevant calculator workflow

    Scenario: SSF-90-06 Add privacy-safe analytics events
      Given the site needs product usage signals
      When analytics events are added
      Then events should track workflow actions such as preset selection and exports
      And events should not collect private customer data or sticker artwork
```
