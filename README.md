# Velora Commerce

Velora is a premium bilingual online shopping system built for executive presentation, portfolio showcase, and production-grade commerce expansion. The product combines a refined direct-to-consumer brand language with realistic catalogue data, multi-page storefront flows, and a scalable Next.js architecture.

## Product strategy

- Brand: `Velora`, a premium lifestyle technology house spanning audio, workspace, smart-living, travel power, and personal carry.
- Target user: design-conscious professionals, frequent travellers, and modern households who value fewer, better products and high-service retail experiences.
- Positioning: combine the clarity of premium hardware retail, the storytelling of elevated consumer brands, and the usability maturity of a strong commerce platform.
- Locales: English (`en`) and Traditional Chinese (`zh-Hant`) with locale-aware routing, browser detection, and persisted language preference.

## Experience coverage

- Home / landing page
- Shop / catalogue listing
- Category pages
- Search results
- Product detail pages with gallery, variants, specs, FAQ, reviews, and recommendations
- Wishlist
- Cart
- Checkout
- Order confirmation
- Sign-in and sign-up
- Account dashboard
- Order history
- Order detail
- Order tracking
- Offers / promotions
- Help centre
- About / brand story
- Contact
- Localized 404
- Operations dashboard

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Radix-based UI primitives in a shadcn-style component structure
- Zustand for cart / wishlist / locale preference persistence
- Server-rendered seeded catalogue and account data

## Project structure

```text
src/
  app/
    [locale]/             localized routes and page flows
    robots.ts             robots metadata
    sitemap.ts            sitemap metadata
    layout.tsx            global shell, fonts, metadata
    page.tsx              locale redirect entry
  components/
    layout/               header, footer, cart drawer, language switcher
    providers/            locale and app providers
    shared/               empty states, links, headings, ratings
    store/                product, cart, checkout, wishlist experiences
    ui/                   reusable design primitives
  lib/
    catalog.ts            seeded products, promotions, orders, profile data
    format.ts             currency/date/status formatting
    i18n.ts               locale detection and translation helpers
    request.ts            route locale resolution helpers
    site.ts               brand strategy, support, admin content
    store.ts              Zustand commerce state
    utils.ts              shared utility helpers
  messages/
    en.ts
    zh-Hant.ts
  proxy.ts                locale routing and cookie persistence
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Requests without a locale prefix are redirected using the saved language preference or the browser’s `Accept-Language` header.

## Verification

```bash
npm run lint
npm run build
```

Both commands pass in the current workspace.

## Notes for extension

- Payment is currently presented as a polished checkout experience with architecture ready for real gateway integration.
- Catalogue, offers, support content, and account data are seeded in TypeScript for presentation realism and straightforward future API replacement.
- Locale dictionaries cover shared UI while product and editorial content use localized data objects for clean scaling.
