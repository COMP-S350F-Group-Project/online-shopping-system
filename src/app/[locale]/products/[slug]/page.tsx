import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getProductBySlug,
  products,
} from "@/lib/catalog";
import { resolveLocale } from "@/lib/request";
import { ProductGallery } from "@/components/store/product-gallery";
import { ProductPurchasePanel } from "@/components/store/product-purchase-panel";
import { ProductCard } from "@/components/store/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RatingStars } from "@/components/shared/rating-stars";
import { isDefined } from "@/lib/utils";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name[locale === "zh-Hant" ? "zh-Hant" : "en"],
    description:
      product.shortDescription[locale === "zh-Hant" ? "zh-Hant" : "en"],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolved = await params;
  const { slug } = resolved;
  const locale = await resolveLocale(Promise.resolve({ locale: resolved.locale }));
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.relatedSlugs
    .map((relatedSlug) => getProductBySlug(relatedSlug))
    .filter(isDefined);
  const boughtTogether = product.boughtTogetherSlugs
    .map((relatedSlug) => getProductBySlug(relatedSlug))
    .filter(isDefined);

  return (
    <div className="space-y-14 py-10">
      <section className="container-shell grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <ProductGallery locale={locale} product={product} />
        <ProductPurchasePanel locale={locale} product={product} />
      </section>

      <section className="container-shell">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="surface-panel rounded-[32px] p-6">
            <p className="eyebrow">
              {locale === "zh-Hant" ? "產品亮點" : "Highlights"}
            </p>
            <div className="mt-5 space-y-4">
              {product.features.map((feature) => (
                <div key={feature.title.en} className="border-t border-[var(--line)] pt-4">
                  <p className="font-display text-2xl">{feature.title[locale]}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {feature.description[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Tabs className="surface-panel rounded-[32px] p-6" defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">
                {locale === "zh-Hant" ? "產品介紹" : "Overview"}
              </TabsTrigger>
              <TabsTrigger value="specs">
                {locale === "zh-Hant" ? "規格資訊" : "Specifications"}
              </TabsTrigger>
              <TabsTrigger value="shipping">
                {locale === "zh-Hant" ? "配送與退貨" : "Shipping"}
              </TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <p className="font-display text-3xl">
                    {locale === "zh-Hant"
                      ? "為真實生活節奏而設計。"
                      : "Designed around real daily movement."}
                  </p>
                  <p className="text-base leading-8 text-slate-600">
                    {product.description[locale]}
                  </p>
                </div>
                <div className="space-y-4 rounded-[28px] bg-[var(--surface-strong)] p-5">
                  <div className="flex items-center gap-3">
                    <RatingStars value={Math.round(product.rating)} />
                    <span className="font-semibold text-[var(--ink)]">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-500">
                      {product.reviewCount}
                    </span>
                  </div>
                  <div className="grid gap-3">
                    {product.highlights.map((highlight) => (
                      <div
                        key={highlight.en}
                        className="rounded-[20px] border border-white/50 bg-white/70 px-4 py-3 text-sm font-medium text-[var(--ink)]"
                      >
                        {highlight[locale]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs">
              <div className="grid gap-6 md:grid-cols-2">
                {product.specifications.map((group) => (
                  <div
                    key={group.title.en}
                    className="rounded-[28px] border border-[var(--line)] bg-white/75 p-5"
                  >
                    <p className="font-display text-2xl">{group.title[locale]}</p>
                    <div className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <div
                          key={item.label.en}
                          className="flex items-start justify-between gap-4 border-t border-[var(--line)] pt-3 text-sm"
                        >
                          <span className="text-slate-500">{item.label[locale]}</span>
                          <span className="max-w-[16rem] text-right text-[var(--ink)]">
                            {item.value[locale]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: locale === "zh-Hant" ? "出貨安排" : "Dispatch",
                    body: product.shipping.dispatch[locale],
                  },
                  {
                    title: locale === "zh-Hant" ? "配送方式" : "Delivery",
                    body: product.shipping.delivery[locale],
                  },
                  {
                    title: locale === "zh-Hant" ? "退貨政策" : "Returns",
                    body: product.shipping.returns[locale],
                  },
                ].map((entry) => (
                  <div
                    key={entry.title}
                    className="rounded-[28px] border border-[var(--line)] bg-white/75 p-5"
                  >
                    <p className="font-display text-2xl">{entry.title}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{entry.body}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <Accordion className="space-y-3" collapsible type="single">
                {product.faq.map((entry, index) => (
                  <AccordionItem key={entry.question.en} value={`faq-${index}`}>
                    <AccordionTrigger>{entry.question[locale]}</AccordionTrigger>
                    <AccordionContent>{entry.answer[locale]}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="container-shell space-y-8">
        <div className="space-y-2">
          <p className="eyebrow">
            {locale === "zh-Hant" ? "一起選購" : "Frequently bought together"}
          </p>
          <h2 className="font-display text-4xl">
            {locale === "zh-Hant" ? "與這件商品搭配得最好。" : "Pairs well with this piece."}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {boughtTogether.map((entry) => (
            <ProductCard key={entry.slug} locale={locale} product={entry} />
          ))}
        </div>
      </section>

      <section className="container-shell space-y-8">
        <div className="space-y-2">
          <p className="eyebrow">{locale === "zh-Hant" ? "延伸推薦" : "You may also like"}</p>
          <h2 className="font-display text-4xl">
            {locale === "zh-Hant" ? "同樣值得納入日常的產品。" : "More pieces designed with the same point of view."}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((entry) => (
            <ProductCard key={entry.slug} locale={locale} product={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
