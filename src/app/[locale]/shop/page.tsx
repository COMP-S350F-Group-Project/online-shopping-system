import { CatalogToolbar } from "@/components/store/catalog-toolbar";
import { ProductCard } from "@/components/store/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories, products } from "@/lib/catalog";
import { filterProducts, sortProducts } from "@/lib/format";
import { collections } from "@/lib/site";
import { resolveLocale, type SearchParamsPromise } from "@/lib/request";
import { deserialiseSearchValue } from "@/lib/utils";

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParamsPromise;
}) {
  const locale = await resolveLocale(params);
  const query = await searchParams;
  const activeCategory = deserialiseSearchValue(query.category);
  const activeCollection = deserialiseSearchValue(query.collection);
  const sort = deserialiseSearchValue(query.sort) || "featured";

  const filtered = sortProducts(
    filterProducts(products, {
      category: activeCategory,
      collection: activeCollection,
    }),
    sort,
  );

  return (
    <div className="container-shell space-y-8 py-10">
      <SectionHeading
        description={
          locale === "zh-Hant"
            ? "瀏覽 Velora 全系列商品，並以分類、系列與排序快速調整視圖。"
            : "Browse the full Velora catalogue and refine by category, edit, and sort order."
        }
        eyebrow={locale === "zh-Hant" ? "商品列表" : "Product listing"}
        title={locale === "zh-Hant" ? "完整系列" : "The full collection"}
      />

      <CatalogToolbar categories={categories} collections={collections} locale={locale} />

      {filtered.length > 0 ? (
        <>
          <p className="text-sm text-slate-500">
            {locale === "zh-Hant"
              ? `共顯示 ${filtered.length} 件商品`
              : `Showing ${filtered.length} products`}
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.slug} locale={locale} product={product} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          description={
            locale === "zh-Hant"
              ? "可嘗試切換不同分類、系列或排序方式。"
              : "Try another category, collection, or sort combination."
          }
          locale={locale}
          primaryHref="/shop"
          primaryLabel={locale === "zh-Hant" ? "清除篩選" : "Reset filters"}
          secondaryHref="/"
          secondaryLabel={locale === "zh-Hant" ? "返回首頁" : "Return home"}
          title={
            locale === "zh-Hant"
              ? "目前沒有符合條件的商品"
              : "No products matched that combination"
          }
        />
      )}
    </div>
  );
}
