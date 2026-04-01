import { notFound } from "next/navigation";

import { CatalogToolbar } from "@/components/store/catalog-toolbar";
import { ProductCard } from "@/components/store/product-card";
import { categories, getCategoryBySlug, getProductsByCategory } from "@/lib/catalog";
import { sortProducts } from "@/lib/format";
import { collections } from "@/lib/site";
import { resolveLocale, type SearchParamsPromise } from "@/lib/request";
import { deserialiseSearchValue } from "@/lib/utils";

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: SearchParamsPromise;
}) {
  const { slug } = await params;
  const locale = await resolveLocale(
    Promise.resolve({
      locale: (await params).locale,
    }),
  );
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const query = await searchParams;
  const activeCollection = deserialiseSearchValue(query.collection);
  const sort = deserialiseSearchValue(query.sort) || "featured";

  const filtered = sortProducts(
    getProductsByCategory(category.slug).filter((product) =>
      activeCollection ? product.collection === activeCollection : true,
    ),
    sort,
  );

  return (
    <div className="space-y-8 py-10">
      <section className="container-shell surface-panel rounded-[40px] px-6 py-10 md:px-10 md:py-12">
        <p className="eyebrow">{category.eyebrow[locale]}</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl">
          {category.heroTitle[locale]}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {category.heroCopy[locale]}
        </p>
      </section>
      <section className="container-shell space-y-6">
        <CatalogToolbar categories={categories} collections={collections} locale={locale} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.slug} locale={locale} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
