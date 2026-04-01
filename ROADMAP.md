# Velora Roadmap

Last updated: 2026-04-01
Owner: Product Engineering

## Product Direction

Velora is a premium direct-to-consumer lifestyle technology brand built around quiet luxury, thoughtful utility, and bilingual commerce for Hong Kong and international customers. The experience should feel commercially credible, operationally believable, and visually competitive with top-tier modern commerce products.

## Stack And Architecture

- Next.js 16 App Router with TypeScript
- Tailwind CSS 4 with reusable UI primitives
- Radix/shadcn-style component architecture
- Zustand for client-side commerce state
- Locale-aware routing with `en` and `zh-Hant`
- Seeded catalog, order, account, support, and admin data in `src/lib/catalog.ts`
- Shared formatting, locale, and routing helpers in `src/lib`

## Current State

- Premium bilingual storefront is live across home, catalog, PDP, cart, checkout, account, support, story, and admin surfaces.
- Locale switching, browser detection, and persisted language preference are implemented.
- Seeded commerce and order data support realistic flows without exposing non-production wording in UI.
- Recent upgrades improved search discovery, product media, editorial pages, admin realism, the member after-sales center, and the checkout-to-confirmation journey.
- Mobile responsiveness and transactional accessibility are now materially stronger across checkout, account, help, and admin.
- Header and search now share a reusable discovery layer that surfaces popular intents, category shortcuts, curated edits, and service routes.
- Predictive search now runs through a shared search domain and API-backed suggestion payloads instead of static discovery alone.
- Mobile navigation now behaves more like a discovery canvas with quick account paths, category access, seasonal edits, and service shortcuts.
- The bag drawer now acts as a true transactional wayfinding surface with live order totals, in-drawer quantity control, cross-sell recommendations, and a stronger empty-bag state.
- High-value page copy for search, account, help, and admin is increasingly centralized in the translation dictionaries instead of inline locale branches.

## Active Priorities

1. Continue refining search with stronger synonym coverage, multilingual vocabulary mapping, and more context-aware merchandising beyond the current predictive suggestions.
2. Reduce the remaining inline locale branches, especially in operational and promotional surfaces.
3. Continue accessibility and SEO hardening across transactional flows and navigation overlays.
4. Keep refining cart drawer behavior and mobile navigation based on real-device interaction findings.
5. Introduce API-ready service boundaries for auth, checkout, and order management.

## Next Iterations

### Now

- Deepen the new predictive search with broader synonyms, query grouping, and better distinction between product, category, and editorial intent.
- Continue extracting page-level copy into shared dictionaries to reduce inline locale branching.
- Document product audit findings, design intent, and i18n coverage after each cycle.
- Keep lint and production build green after every iteration.

### Next

- Add richer saved-item flows, cross-sell logic, and reorder affordances across account surfaces.
- Deepen cart drawer behavior with better gesture handling, quantity-control interaction polish, and stronger saved-item continuity.
- Expand confirmation and order history with stronger lifecycle continuity between purchase and aftercare.
- Add query-aware merchandising blocks, richer no-result recovery, and locale-specific search intent tuning.

### Later

- Add operational realism for admin actions, inventory changes, and promotion workflows.
- Expand SEO depth with richer structured metadata and collection storytelling.

### Ongoing Quality Gates

- No user-facing language may suggest a demo, prototype, test, or mock experience.
- All major user-facing flows must remain fully localized in English and Traditional Chinese.
- New UI must preserve premium visual hierarchy, spacing, and trustworthy commerce tone.
- Any new feature should be production-expandable rather than a dead-end showcase-only pattern.
