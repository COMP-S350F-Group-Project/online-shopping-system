# Changelog

## 2026-04-01

### Added

- Introduced `src/lib/commerce.ts` to centralize shipping option content and shared order-summary calculation.
- Added persisted checkout snapshot support to the commerce store so confirmation pages can render real order data after purchase.
- Added a richer confirmation detail experience with order totals, delivery data, payment summary, and post-purchase next steps.
- Added `src/components/store/search-discovery-panel.tsx` as a reusable discovery module shared by header search and the search landing state.
- Added shared site-level content datasets for search intents, service shortcuts, account quick paths, membership benefits, and help standards.
- Added `src/lib/search.ts` to centralize search normalization, intent aliases, scoring, predictive suggestion assembly, and bilingual related-query generation.
- Added `src/app/api/search/suggest/route.ts` as an API-backed predictive search endpoint for reusable instant-search payloads.
- Added `src/components/store/search-combobox.tsx` as a shared instant-search surface for desktop header, mobile search entry, and the full search page.

### Changed

- Rebuilt checkout into a more premium transactional experience with trust cards, clearer delivery selection, better address structure, saved-card vs new-card payment handling, and stronger submit-state feedback.
- Upgraded cart totals to include duties and taxes, delivery promise details, and a closer pre-checkout alignment with the final order total.
- Reworked confirmation from a simple success state into a fuller post-purchase page with order snapshot continuity and direct next actions.
- Replaced unrealistic placeholder postal code defaults in seeded Hong Kong addresses.
- Upgraded desktop header search from a plain field to a guided discovery tray with curated search terms, category paths, collection shortcuts, and service entry points.
- Reworked the mobile menu into a more useful discovery surface with immediate wishlist/account shortcuts and the same search guidance as desktop.
- Refactored search, account, help, and admin pages to rely more heavily on shared data and dictionary-driven copy instead of inline locale branching.
- Upgraded guided search discovery into predictive search with live suggestions, reusable query interpretation, and clearer product/category/collection separation.
- Rebuilt the search results page around the shared search domain so featured sorting now respects relevance when a query is present.

### Improved

- Refined mobile checkout with a fixed total-and-submit bar, stronger summary placement, and tighter section density for smaller screens.
- Reduced mobile page weight on account, help, and admin with horizontally scrollable summary rails instead of long vertical metric stacks.
- Added clearer accessibility semantics for shipping and payment selection, plus explicit quantity-control labels in the cart.
- Improved bilingual consistency across search discovery, account headings, help support content, and admin operational labels.
- Reduced content duplication between header and search by centralizing merchandising and service shortcuts.
- Improved short-query relevance handling so compact terms such as `anc` no longer trigger irrelevant substring matches across unrelated products.
- Expanded shared search copy in English and Traditional Chinese for suggestion headings, instant-search actions, and related-query modules.

### Earlier In The Day

- Introduced product governance files: `ROADMAP.md`, `CHANGELOG.md`, `PRODUCT_AUDIT.md`, `DESIGN_NOTES.md`, and `I18N_STATUS.md`.
- Added a reusable `ReorderButton` client component for order-to-cart recovery.
- Expanded seeded account profile data with membership timing, payment default, service preference, and concierge context.

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
