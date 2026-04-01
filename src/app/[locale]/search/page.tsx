import { CatalogToolbar } from "@/components/store/catalog-toolbar";
import { SearchCombobox } from "@/components/store/search-combobox";
import { ProductCard } from "@/components/store/product-card";
import { SearchDiscoveryPanel } from "@/components/store/search-discovery-panel";
import { EmptyState } from "@/components/shared/empty-state";
import { LocaleLink } from "@/components/shared/locale-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/catalog";
import { sortProducts } from "@/lib/format";
import { getMessages } from "@/lib/i18n";
import { searchProducts } from "@/lib/search";
import { collections } from "@/lib/site";
import { resolveLocale, type SearchParamsPromise } from "@/lib/request";
import { deserialiseSearchValue } from "@/lib/utils";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParamsPromise;
}) {
  const locale = await resolveLocale(params);
  const messages = getMessages(locale);
  const query = await searchParams;
  const q = deserialiseSearchValue(query.q);
  const activeCategory = deserialiseSearchValue(query.category);
  const activeCollection = deserialiseSearchValue(query.collection);
  const sort = deserialiseSearchValue(query.sort) || "featured";
  const hasDiscoveryIntent = !q && !activeCategory && !activeCollection;
  const searchState = searchProducts({
    items: products,
    query: q,
    category: activeCategory,
    collection: activeCollection,
    locale,
  });
  const results =
    q && sort === "featured"
      ? searchState.results
      : sortProducts(searchState.results, sort);
  const highlightedResults = hasDiscoveryIntent ? sortProducts(products, "rating").slice(0, 6) : results;
  const matchingCategories = searchState.matchingCategories;
  const matchingCollections = searchState.matchingCollections;
  const relatedQueries = searchState.relatedQueries;
  const averageRating = results.length
    ? (results.reduce((total, product) => total + product.rating, 0) / results.length).toFixed(1)
    : null;
  const headlineTitle = hasDiscoveryIntent
    ? messages.searchPage.discoveryTitle
    : q
      ? messages.searchPage.resultsFor.replace("{query}", q)
      : messages.searchPage.filteredTitle;
  const headlineDescription = hasDiscoveryIntent
    ? messages.searchPage.discoveryCopy
    : messages.searchPage.refinedCopy;

  return (
    <div className="container-shell space-y-8 py-10">
      <SectionHeading
        description={headlineDescription}
        eyebrow={messages.searchPage.eyebrow}
        title={headlineTitle}
      />

      <div className="surface-panel rounded-[32px] p-4 md:p-5">
        <SearchCombobox
          initialQuery={q ?? ""}
          locale={locale}
          panelMode="inline"
          showDiscoveryWhenEmpty={false}
        />
      </div>

      <CatalogToolbar categories={categories} collections={collections} locale={locale} />

      {hasDiscoveryIntent ? (
        <>
          <SearchDiscoveryPanel locale={locale} />

          <section className="space-y-6">
            <SectionHeading
              description={messages.searchPage.startDescription}
              eyebrow={messages.searchPage.startEyebrow}
              title={messages.searchPage.startTitle}
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {highlightedResults.map((product) => (
                <ProductCard key={product.slug} locale={locale} product={product} />
              ))}
            </div>
          </section>
        </>
      ) : results.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="space-y-5 md:col-span-2 xl:col-span-3">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="surface-panel rounded-[28px] p-5">
                <p className="text-sm text-slate-500">
                  {q
                    ? messages.searchPage.resultCount.replace("{count}", String(results.length)).replace("{query}", q)
                    : messages.shop.showing.replace("{count}", String(results.length))}
                </p>
                <p className="mt-3 font-display text-4xl">{results.length}</p>
              </div>
              <div className="surface-panel rounded-[28px] p-5">
                <p className="text-sm text-slate-500">{messages.searchPage.bestMatch}</p>
                <p className="mt-3 font-display text-2xl">
                  {results[0]?.name[locale] ?? "—"}
                </p>
              </div>
              <div className="surface-panel rounded-[28px] p-5">
                <p className="text-sm text-slate-500">{messages.searchPage.averageRating}</p>
                <p className="mt-3 font-display text-4xl">{averageRating ?? "—"}</p>
              </div>
              <div className="surface-panel rounded-[28px] p-5">
                <p className="text-sm text-slate-500">{messages.searchPage.matchingCategories}</p>
                <p className="mt-3 font-display text-2xl">
                  {matchingCategories[0]?.name[locale] ?? messages.searchPage.allCategories}
                </p>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <div className="surface-panel rounded-[28px] p-5">
                <p className="eyebrow">{messages.searchPage.matchingCategories}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {matchingCategories.slice(0, 5).map((category) => (
                    <Button key={category.slug} asChild size="sm" variant="secondary">
                      <LocaleLink href={`/categories/${category.slug}`} locale={locale}>
                        {category.name[locale]}
                      </LocaleLink>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="surface-panel rounded-[28px] p-5">
                <p className="eyebrow">{messages.searchPage.matchingCollections}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {matchingCollections.slice(0, 5).map((collection) => (
                    <Button key={collection.slug} asChild size="sm" variant="secondary">
                      <LocaleLink href={`/search?collection=${collection.slug}`} locale={locale}>
                        {collection.name[locale]}
                      </LocaleLink>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {relatedQueries.length > 0 ? (
              <div className="surface-panel rounded-[28px] p-5">
                <p className="eyebrow">{messages.searchPage.relatedSearches}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {relatedQueries.map((term) => (
                    <Button key={term} asChild size="sm" variant="secondary">
                      <LocaleLink href={`/search?q=${encodeURIComponent(term)}`} locale={locale}>
                        {term}
                      </LocaleLink>
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {results.map((product) => (
            <ProductCard key={product.slug} locale={locale} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <EmptyState
            description={messages.searchPage.emptyCopy}
            locale={locale}
            primaryHref="/shop"
            primaryLabel={messages.searchPage.emptyPrimaryLabel}
            secondaryHref="/"
            secondaryLabel={messages.searchPage.emptySecondaryLabel}
            title={messages.searchPage.emptyTitle}
          />

          {relatedQueries.length > 0 ? (
            <div className="surface-panel rounded-[32px] p-6">
              <p className="eyebrow">{messages.searchPage.relatedSearches}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {relatedQueries.map((term) => (
                  <Button key={term} asChild size="sm" variant="secondary">
                    <LocaleLink href={`/search?q=${encodeURIComponent(term)}`} locale={locale}>
                      {term}
                    </LocaleLink>
                  </Button>
                ))}
              </div>
            </div>
          ) : null}

          <SearchDiscoveryPanel locale={locale} />
        </div>
      )}
    </div>
  );
}
