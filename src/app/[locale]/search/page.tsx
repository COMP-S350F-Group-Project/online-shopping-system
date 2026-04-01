import { CatalogToolbar } from "@/components/store/catalog-toolbar";
import { ProductCard } from "@/components/store/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LocaleLink } from "@/components/shared/locale-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/catalog";
import { filterProducts, sortProducts } from "@/lib/format";
import { getMessages } from "@/lib/i18n";
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
  const results = sortProducts(
    filterProducts(products, {
      search: q,
      category: activeCategory,
      collection: activeCollection,
    }),
    sort,
  );
  const highlightedResults = hasDiscoveryIntent ? sortProducts(products, "rating").slice(0, 6) : results;
  const matchingCategories = categories.filter((category) =>
    results.some((product) => product.category === category.slug),
  );
  const matchingCollections = collections.filter((collection) =>
    results.some((product) => product.collection === collection.slug),
  );
  const averageRating = results.length
    ? (results.reduce((total, product) => total + product.rating, 0) / results.length).toFixed(1)
    : null;
  const popularSearches =
    locale === "zh-Hant"
      ? ["降噪耳機", "旅行收納", "桌燈", "智慧家居", "送禮套裝", "GaN 充電器"]
      : ["noise cancelling", "travel carry", "desk light", "smart home", "gift set", "GaN charger"];
  const headlineTitle = hasDiscoveryIntent
    ? messages.searchPage.discoveryTitle
    : q
      ? locale === "zh-Hant"
        ? `「${q}」的搜尋結果`
        : `Results for “${q}”`
      : locale === "zh-Hant"
        ? "已套用篩選條件"
        : "Filtered results";
  const headlineDescription = hasDiscoveryIntent
    ? messages.searchPage.discoveryCopy
    : locale === "zh-Hant"
      ? "依分類、系列與排序方式快速縮小範圍，找到更貼近需求的選項。"
      : "Refine by category, edit, and sort order to narrow the catalogue with precision.";

  return (
    <div className="container-shell space-y-8 py-10">
      <SectionHeading
        description={headlineDescription}
        eyebrow={locale === "zh-Hant" ? "搜尋" : "Search"}
        title={headlineTitle}
      />

      <CatalogToolbar categories={categories} collections={collections} locale={locale} />

      {hasDiscoveryIntent ? (
        <>
          <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-panel rounded-[32px] p-6">
              <p className="eyebrow">{messages.searchPage.popularSearches}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {popularSearches.map((term) => (
                  <Button key={term} asChild size="sm" variant="secondary">
                    <LocaleLink href={`/search?q=${encodeURIComponent(term)}`} locale={locale}>
                      {term}
                    </LocaleLink>
                  </Button>
                ))}
              </div>
            </div>

            <div className="surface-panel rounded-[32px] p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="eyebrow">{messages.searchPage.browseCategories}</p>
                  <div className="mt-4 grid gap-3">
                    {categories.slice(0, 4).map((category) => (
                      <LocaleLink
                        key={category.slug}
                        className="rounded-[22px] border border-[var(--line)] bg-white/70 px-4 py-4 text-sm font-medium text-[var(--ink)] transition hover:bg-white"
                        href={`/categories/${category.slug}`}
                        locale={locale}
                      >
                        {category.name[locale]}
                      </LocaleLink>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="eyebrow">{messages.searchPage.curatedEdits}</p>
                  <div className="mt-4 grid gap-3">
                    {collections.map((collection) => (
                      <LocaleLink
                        key={collection.slug}
                        className="rounded-[22px] border border-[var(--line)] bg-white/70 px-4 py-4 text-sm font-medium text-[var(--ink)] transition hover:bg-white"
                        href={`/search?collection=${collection.slug}`}
                        locale={locale}
                      >
                        {collection.name[locale]}
                      </LocaleLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading
              description={
                locale === "zh-Hant"
                  ? "從評價與人氣表現最好的作品開始探索。"
                  : "Start with the products earning the strongest response across the collection."
              }
              eyebrow={locale === "zh-Hant" ? "立即探索" : "Start here"}
              title={locale === "zh-Hant" ? "Velora 熱門之選" : "Most loved right now"}
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
                    : locale === "zh-Hant"
                      ? `共 ${results.length} 項結果`
                      : `${results.length} results`}
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
                  {matchingCategories[0]?.name[locale] ?? (locale === "zh-Hant" ? "全部分類" : "All categories")}
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
          </div>

          {results.map((product) => (
            <ProductCard key={product.slug} locale={locale} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <EmptyState
            description={
              locale === "zh-Hant"
                ? "建議改用較寬鬆的關鍵字，或先從分類開始瀏覽。"
                : "Try a broader phrase, or start from a category and refine from there."
            }
            locale={locale}
            primaryHref="/shop"
            primaryLabel={locale === "zh-Hant" ? "瀏覽商品系列" : "Browse the collection"}
            secondaryHref="/"
            secondaryLabel={locale === "zh-Hant" ? "返回首頁" : "Return home"}
            title={locale === "zh-Hant" ? "找不到相關結果" : "No results found"}
          />

          <div className="surface-panel rounded-[32px] p-6">
            <p className="eyebrow">{messages.searchPage.popularSearches}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {popularSearches.map((term) => (
                <Button key={term} asChild size="sm" variant="secondary">
                  <LocaleLink href={`/search?q=${encodeURIComponent(term)}`} locale={locale}>
                    {term}
                  </LocaleLink>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
