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
- Recent upgrades improved search discovery, product media, editorial pages, admin realism, and the member after-sales center.

## Active Priorities

1. Raise member center and after-sales quality to match home and PDP polish.
2. Reduce remaining inline locale branches by extracting more copy into shared translation dictionaries.
3. Strengthen checkout realism with better payment architecture and post-purchase states.
4. Improve mobile ergonomics for dense account, support, and admin pages.
5. Continue accessibility and SEO hardening.

## Next Iterations

### Now

- Finalize the upgraded account, order history, order detail, and tracking journeys.
- Document product audit findings, design intent, and i18n coverage after each cycle.
- Keep lint and production build green after every iteration.

### Next

- Upgrade checkout with more refined payment step structure, trust messaging, and failure recovery.
- Add richer saved-item flows, cross-sell logic, and reorder affordances across account surfaces.
- Improve search with instant suggestions, synonyms, and merchandising blocks.

### Later

- Introduce API-ready service boundaries for auth, checkout, and order management.
- Add operational realism for admin actions, inventory changes, and promotion workflows.
- Expand SEO depth with richer structured metadata and collection storytelling.

### Ongoing Quality Gates

- No user-facing language may suggest a demo, prototype, test, or mock experience.
- All major user-facing flows must remain fully localized in English and Traditional Chinese.
- New UI must preserve premium visual hierarchy, spacing, and trustworthy commerce tone.
- Any new feature should be production-expandable rather than a dead-end showcase-only pattern.
