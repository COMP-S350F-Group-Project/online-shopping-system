import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { ProductCard } from "@/components/store/product-card";
import { ProductVisual } from "@/components/store/product-visual";
import { SectionHeading } from "@/components/shared/section-heading";
import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  brand,
  brandStory,
  collections,
  supportChannels,
} from "@/lib/site";
import {
  categories,
  getProductBySlug,
  heroSlugs,
  products,
  recommendationSlugs,
} from "@/lib/catalog";
import { resolveLocale } from "@/lib/request";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const heroProducts = heroSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);
  const recommendations = recommendationSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  return (
    <div className="space-y-24 pb-24 pt-8">
      <section className="container-shell">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-panel relative overflow-hidden rounded-[40px] px-6 py-10 md:px-10 md:py-12">
            <div className="absolute -right-10 top-0 h-56 w-56 rounded-full bg-[color:var(--accent-soft)] blur-3xl" />
            <div className="relative max-w-2xl space-y-6">
              <Badge>{brand.tagline[locale]}</Badge>
              <div className="space-y-4">
                <h1 className="font-display text-5xl leading-[0.92] md:text-7xl">
                  {locale === "zh-Hant"
                    ? "把高品質生活科技，整理成一種更從容的購物方式。"
                    : "A premium online shopping system built around calmer, better products."}
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-600">
                  {brand.description[locale]}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <LocaleLink href="/shop" locale={locale}>
                    {locale === "zh-Hant" ? "探索完整系列" : "Explore the full collection"}
                  </LocaleLink>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <LocaleLink href="/about" locale={locale}>
                    {locale === "zh-Hant" ? "閱讀品牌故事" : "Read the brand story"}
                  </LocaleLink>
                </Button>
              </div>

              <div className="grid gap-3 pt-4 md:grid-cols-3">
                {[
                  {
                    icon: Truck,
                    label: locale === "zh-Hant" ? "亞太地區快速配送" : "Fast APAC delivery",
                  },
                  {
                    icon: ShieldCheck,
                    label: locale === "zh-Hant" ? "30 天安心退貨" : "30-day returns",
                  },
                  {
                    icon: Sparkles,
                    label: locale === "zh-Hant" ? "七日專屬顧問服務" : "Seven-day concierge support",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[28px] border border-[var(--line)] bg-white/65 p-4"
                  >
                    <item.icon className="mb-3 h-5 w-5 text-[var(--accent)]" />
                    <p className="text-sm font-medium text-[var(--ink)]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {heroProducts.map((product, index) => (
              <LocaleLink
                key={product.slug}
                className={index === 0 ? "md:col-span-2" : ""}
                href={`/products/${product.slug}`}
                locale={locale}
              >
                <div className="surface-panel h-full rounded-[36px] p-4">
                  <ProductVisual
                    className={index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}
                    locale={locale}
                    visual={product.visuals[0]}
                  />
                  <div className="flex items-center justify-between gap-4 px-2 pb-2 pt-5">
                    <div>
                      <p className="font-display text-2xl">{product.name[locale]}</p>
                      <p className="text-sm text-slate-600">{product.shortDescription[locale]}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                </div>
              </LocaleLink>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell space-y-8">
        <SectionHeading
          description={locale === "zh-Hant"
            ? "從聆聽、桌面、居家到隨行收納，以清晰結構整理整個系列。"
            : "Browse the catalogue through audio, workspace, home, travel, and personal-carry lenses."}
          eyebrow={locale === "zh-Hant" ? "資訊架構" : "Information architecture"}
          title={locale === "zh-Hant" ? "以真實購物邏輯建立清晰導航。" : "A commerce architecture shaped around real browsing behaviour."}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {categories.map((category) => (
            <LocaleLink
              key={category.slug}
              className="surface-panel rounded-[32px] p-6 transition hover:-translate-y-1"
              href={`/categories/${category.slug}`}
              locale={locale}
            >
              <p className="eyebrow">{category.eyebrow[locale]}</p>
              <p className="mt-3 font-display text-3xl leading-tight">
                {category.name[locale]}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {category.description[locale]}
              </p>
            </LocaleLink>
          ))}
        </div>
      </section>

      <section className="container-shell space-y-8">
        <SectionHeading
          description={locale === "zh-Hant"
            ? "從最佳實務中提煉，卻維持品牌語言一致與原創性。"
            : "Premium DTC patterns, original styling, and realistic seeded data working together as one product."}
          eyebrow={locale === "zh-Hant" ? "焦點選品" : "Featured edit"}
          title={collections[0].name[locale]}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} locale={locale} product={product} />
          ))}
        </div>
      </section>

      <section className="container-shell">
        <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="surface-panel rounded-[40px] p-8 md:p-10">
            <SectionHeading
              description={brand.strategy.pointOfView[locale]}
              eyebrow={locale === "zh-Hant" ? "產品策略" : "Product strategy"}
              title={locale === "zh-Hant" ? "Velora 如何定位這個品牌。"
                : "How Velora positions the brand."}
            />
            <div className="mt-8 space-y-6">
              {brandStory.map((item) => (
                <div key={item.title.en} className="border-t border-[var(--line)] pt-6">
                  <p className="font-display text-2xl">{item.title[locale]}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.body[locale]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {supportChannels.map((channel) => (
              <div
                key={channel.id}
                className="surface-panel rounded-[32px] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.04)]"
              >
                <p className="eyebrow">
                  {locale === "zh-Hant" ? "服務節點" : "Service layer"}
                </p>
                <p className="mt-3 font-display text-3xl leading-tight">
                  {channel.title[locale]}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {channel.description[locale]}
                </p>
                <p className="mt-6 text-sm font-semibold text-[var(--ink)]">
                  {channel.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell space-y-8">
        <SectionHeading
          description={locale === "zh-Hant"
            ? "適合通勤、混合辦公與注重質感的現代生活。"
            : "Selected for commuting, hybrid work, gifting, and compact urban homes."}
          eyebrow={locale === "zh-Hant" ? "推薦商品" : "Recommended"}
          title={locale === "zh-Hant" ? "更像真實商業產品的完成度。" : "The kind of polish that feels ready to launch."}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {recommendations.map((product) => (
            <ProductCard key={product.slug} locale={locale} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
