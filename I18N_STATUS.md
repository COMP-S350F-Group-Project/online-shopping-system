# I18N Status

Last updated: 2026-04-01

## Supported Locales

- `en`
- `zh-Hant`

## Implemented

- Locale-aware routing with localized path handling through the App Router.
- Browser-language detection for default locale selection.
- Persisted locale preference in client commerce state.
- Locale-aware currency and date formatting.
- Language switcher in the UI.
- Translation dictionaries for core shared UI, commerce actions, checkout text, support text, and major page-level copy.
- Additional localized accessibility labels for quantity controls and mobile checkout summary states.
- Shared bilingual discovery copy for header search, search landing, account quick paths, help shortcuts, and admin operational labels.
- Shared bilingual predictive-search copy for suggestion headings, product/category/edit groupings, empty instant-search feedback, and related-query modules.

## Coverage Snapshot

### Fully Covered Or Near-Fully Covered

- Global navigation and footer
- Homepage and merchandising sections
- Catalog, category, and search journeys
- Product detail, cart, checkout, and confirmation
- Authentication and contact flows
- Wishlist, offers, help, and about pages
- Account, order history, order detail, and tracking

## Known Gaps

- Some longer page-level copy is still localized with inline `locale === "zh-Hant"` branching inside page files instead of centralized dictionary entries, but search/account/help/admin have been reduced significantly.
- Operational labels such as payment method names are partly shared strings and could be normalized for stronger localization control.
- Search now has shared intent mapping and related-query generation, but it still needs richer locale-specific synonyms, typo tolerance, and deeper vocabulary coverage.
- Remaining inline page-level bilingual copy is now concentrated more in offers, some operational views, and scattered supporting sections rather than the main search/account/help/admin surfaces.

## Quality Notes

- Traditional Chinese copy is written for natural Hong Kong usage and should stay concise, refined, and non-literal.
- English copy should remain understated and premium rather than marketing-heavy.
- New UI should not ship with untranslated fallback strings or mixed-language states.

## Next I18N Work

1. Extract the remaining page-level strings from offers, admin edge cases, and supporting surfaces into dictionaries.
2. Standardize bilingual terminology for shipping, support, promotions, payment, and after-sales language.
3. Add richer locale-aware search vocabulary, synonyms, typo handling, and merchandising tags.
4. Keep validating both locales in every major iteration cycle.
