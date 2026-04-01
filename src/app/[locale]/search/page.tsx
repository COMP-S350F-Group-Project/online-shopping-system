import { CatalogToolbar } from "@/components/store/catalog-toolbar";
import { ProductCard } from "@/components/store/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories, products } from "@/lib/catalog";
import { sortProducts } from "@/lib/format";
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
  const query = await searchParams;
  const q = deserialiseSearchValue(query.q);
  const sort = deserialiseSearchValue(query.sort) || "featured";
  const results = sortProducts(products, sort, q);

  return (
    <div className="container-shell space-y-8 py-10">
      <SectionHeading
        description={
          locale === "zh-Hant"
            ? "可依商品名稱、系列或用途快速搜尋整個目錄。"
            : "Search the entire catalogue by product name, collection, or use case."
        }
        eyebrow={locale === "zh-Hant" ? "搜尋" : "Search"}
        title={
          q
            ? locale === "zh-Hant"
              ? `「${q}」的搜尋結果`
              : `Results for “${q}”`
            : locale === "zh-Hant"
              ? "開始搜尋"
              : "Start searching"
        }
      />

      <CatalogToolbar categories={categories} collections={collections} locale={locale} />

      {results.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.slug} locale={locale} product={product} />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
