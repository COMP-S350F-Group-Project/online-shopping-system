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

- Some longer page-level copy is still localized with inline `locale === "zh-Hant"` branching inside page files instead of centralized dictionary entries.
- Operational labels such as payment method names are partly shared strings and could be normalized for stronger localization control.
- Search currently relies mostly on bilingual seeded product content rather than locale-specific synonyms or intent mapping.

## Quality Notes

- Traditional Chinese copy is written for natural Hong Kong usage and should stay concise, refined, and non-literal.
- English copy should remain understated and premium rather than marketing-heavy.
- New UI should not ship with untranslated fallback strings or mixed-language states.

## Next I18N Work

1. Extract more page-level strings from account, help, offers, and admin surfaces into dictionaries.
2. Standardize bilingual terminology for shipping, support, promotions, and after-sales language.
3. Add richer locale-aware search vocabulary and merchandising tags.
4. Keep validating both locales in every major iteration cycle.
