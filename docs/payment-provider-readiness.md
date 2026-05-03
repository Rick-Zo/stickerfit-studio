# Payment Provider Readiness

Last updated: 2026-05-03

This checklist records the website requirements to review before applying for Stripe, Creem, or another payment provider.

## Current Status

- Production domain: `https://sticker-fit.com`
- Public support email: `support@sticker-fit.com`
- Current product: free browser-based sticker sheet calculator
- Paid checkout: not live yet
- Database/account system: not used yet

## Public Website Requirements

- Product/service description must be clear on the homepage and pricing page.
- Pricing must be visible before checkout, including currency and billing interval.
- Contact support must use the domain email and must not ask users to send card data by email.
- Privacy Policy must explain analytics, ads, support emails, payment provider processing, and cookies/local storage.
- Terms of Use must explain service scope, user responsibility, acceptable use, paid offers, delivery, refunds, and limitations.
- Refund Policy must explain digital delivery, refund window, cancellation path, and response time.
- The sitemap must include public trust pages so reviewers and crawlers can find them.

## Current Public Pages

- `/` - Free sticker sheet calculator and product description.
- `/pricing/` - Current free pricing and future paid-product disclosure.
- `/refund-policy/` - Refund, cancellation, and digital delivery policy.
- `/terms/` - Terms of Use.
- `/privacy/` - Privacy Policy.
- `/contact/` - Domain support email and billing support instructions.

## Before Applying With A Paid Product

1. Choose the first paid offer.
   - Recommended simple offer: one-time digital download, such as a sticker pricing workbook or production checklist.
   - More complex offer: subscription for saved presets, batch exports, and Pro templates.

2. Publish a real product page before review.
   - Product name.
   - What the buyer receives.
   - Price and currency.
   - One-time or recurring billing.
   - Delivery method.
   - Refund and cancellation summary.

3. Configure checkout.
   - Use hosted Stripe Checkout, Stripe Payment Links, Creem checkout, or another hosted payment flow first.
   - Do not collect card numbers directly on StickerFit Studio.
   - Make sure checkout branding, product name, price, and support email match the website.

4. Confirm operational details.
   - Support mailbox receives billing questions.
   - Refund/cancellation process is documented.
   - Receipt and customer portal links work.
   - No prohibited or restricted products are listed.

## Review Risks

- A payment application may be rejected or delayed if the website only shows a free tool but the payment account claims a paid product.
- A future subscription should not be submitted until the billing interval, cancellation path, and customer portal are ready.
- Avoid unsupported claims, fake testimonials, misleading brand affiliation, or use of restricted third-party intellectual property.
- Keep personal emails and private addresses off the public site unless there is a deliberate business reason to publish them.
