# Changelog

## 2026-04-01

### Added

- Introduced product governance files: `ROADMAP.md`, `CHANGELOG.md`, `PRODUCT_AUDIT.md`, `DESIGN_NOTES.md`, and `I18N_STATUS.md`.
- Added a reusable `ReorderButton` client component for order-to-cart recovery.
- Expanded seeded account profile data with membership timing, payment default, service preference, and concierge context.

### Changed

- Rebuilt the account overview into a fuller membership and service hub with spend metrics, quick paths, latest order activity, recommendations, and concierge context.
- Reworked order history into a more credible after-sales index with progress bars, payment and shipping metadata, and one-tap reorder.
- Upgraded order detail with item configuration summaries, timeline clarity, delivery and payment panels, support actions, and reorder recovery.
- Refined tracking into a dedicated post-purchase page with clearer milestone framing, recipient context, support actions, and progress visualization.
- Added shipping method formatting helpers and new localized feedback for reorder actions.

## Earlier Foundation Work

### Storefront

- Built a premium bilingual commerce experience across home, catalog, search, PDP, cart, checkout, confirmation, auth, account, wishlist, offers, help, about, contact, admin, and localized 404 states.
- Established the Velora brand direction and seeded a realistic premium catalog with categories, collections, variants, reviews, policies, and order data.

### Experience Upgrades

- Improved homepage storytelling and CTA styling to remove low-end visual signals.
- Upgraded product media with richer gallery and immersive viewing behavior.
- Expanded search into a discovery surface with real filtering, category and collection entry points, and merchandising blocks.
- Raised admin realism with recent orders, inventory signals, promotion performance, and customer snapshots.
- Rebuilt about, help, and offers into more editorial and commercially credible brand pages.

### Platform

- Implemented locale routing, browser-language detection, persisted locale preference, SEO metadata, sitemap, robots, and locale-aware formatting.
- Kept `npm run lint` and `npm run build` passing after each major cycle.
