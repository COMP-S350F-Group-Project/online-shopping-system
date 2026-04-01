import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { brand, brandStory, collections, supportChannels } from "@/lib/site";
import { resolveLocale } from "@/lib/request";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  const strategyFrames = [
    {
      eyebrow: locale === "zh-Hant" ? "品牌定位" : "Brand direction",
      title:
        locale === "zh-Hant"
          ? "直營生活科技品牌"
          : "A direct-to-consumer lifestyle technology house",
      body: brand.strategy.concept[locale],
    },
    {
      eyebrow: locale === "zh-Hant" ? "核心客群" : "Core audience",
      title:
        locale === "zh-Hant"
          ? "為講究秩序與質感的現代生活而設"
          : "Built for people who want fewer, better things",
      body: brand.strategy.audience[locale],
    },
    {
      eyebrow: locale === "zh-Hant" ? "品牌觀點" : "Point of view",
      title:
        locale === "zh-Hant"
          ? "材質、服務與節奏同樣重要"
          : "Materials, service, and rhythm matter equally",
      body: brand.strategy.pointOfView[locale],
    },
  ];

  const operatingSignals = [
    {
      value: "48h",
      label:
        locale === "zh-Hant"
          ? "亞太主要城市常規配送節奏"
          : "Typical delivery rhythm into major APAC cities",
    },
    {
      value: locale === "zh-Hant" ? "7 天" : "7 days",
      label:
        locale === "zh-Hant" ? "專屬顧問服務覆蓋" : "Concierge coverage",
    },
    {
      value: locale === "zh-Hant" ? "30 天" : "30 days",
      label:
        locale === "zh-Hant" ? "安心退貨與售後週期" : "Return and aftercare window",
    },
  ];

  return (
    <div className="container-shell space-y-10 py-10">
      <section className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="surface-panel rounded-[40px] px-6 py-10 md:px-10 md:py-14">
          <p className="eyebrow">{locale === "zh-Hant" ? "品牌故事" : "Brand story"}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] md:text-7xl">
            {locale === "zh-Hant"
              ? "Velora 來自一個很簡單的想法: 讓科技與生活用品回到更清楚、更耐看的樣子。"
              : "Velora began with a simple idea: everyday technology should feel clearer, quieter, and better resolved."}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {brand.description[locale]}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            {brand.strategy.concept[locale]}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="subtle">
              <LocaleLink href="/shop" locale={locale}>
                {locale === "zh-Hant" ? "選購全系列" : "Shop the collection"}
              </LocaleLink>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <LocaleLink href="/contact" locale={locale}>
                {locale === "zh-Hant" ? "聯絡顧問" : "Speak with client care"}
              </LocaleLink>
            </Button>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="surface-panel rounded-[40px] p-6 md:p-8">
            <p className="eyebrow">{locale === "zh-Hant" ? "營運節奏" : "Operating rhythm"}</p>
            <div className="mt-6 grid gap-4">
              {operatingSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-[28px] border border-[var(--line)] bg-white/75 p-5"
                >
                  <p className="font-display text-4xl">{signal.value}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{signal.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-[40px] p-6 md:p-8">
            <p className="eyebrow">{locale === "zh-Hant" ? "一句話概括" : "In one sentence"}</p>
            <p className="mt-5 font-display text-3xl leading-tight text-[var(--ink)]">
              {locale === "zh-Hant"
                ? "Velora 讓器物、服務與履約彼此一致，像同一套作品。"
                : "Velora treats product, service, and fulfillment as one continuous design system."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {strategyFrames.map((frame) => (
          <div
            key={frame.title}
            className="surface-panel rounded-[32px] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.04)]"
          >
            <p className="eyebrow">{frame.eyebrow}</p>
            <p className="mt-4 font-display text-3xl leading-tight">{frame.title}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{frame.body}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow={locale === "zh-Hant" ? "系列語言" : "Collection language"}
          title={
            locale === "zh-Hant"
              ? "每個系列都對應一種生活場景，而不是單一商品堆疊。"
              : "Each edit is shaped around a way of living, not just a category shelf."
          }
          description={
            locale === "zh-Hant"
              ? "從城市通勤、安靜工作到短途旅行，Velora 以完整情境整理產品與服務。"
              : "From commuting and focused work to short-haul travel, Velora organizes products and service around complete use cases."
          }
        />

        <div className="grid gap-5 xl:grid-cols-3">
          {collections.map((collection) => (
            <LocaleLink
              key={collection.slug}
              className="surface-panel rounded-[32px] p-6 transition hover:-translate-y-1"
              href={`/search?collection=${collection.slug}`}
              locale={locale}
            >
              <p className="eyebrow">{locale === "zh-Hant" ? "主題系列" : "Curated edit"}</p>
              <p className="mt-4 font-display text-3xl">{collection.name[locale]}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {collection.description[locale]}
              </p>
              <p className="mt-6 text-sm font-semibold text-[var(--accent)]">
                {locale === "zh-Hant" ? "查看此系列" : "View this edit"}
              </p>
            </LocaleLink>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="surface-panel rounded-[40px] p-6 md:p-8">
          <SectionHeading
            className="max-w-none"
            eyebrow={locale === "zh-Hant" ? "品牌原則" : "What shapes Velora"}
            title={
              locale === "zh-Hant"
                ? "從外觀、手感到售後，每個細節都圍繞同一個標準。"
                : "From silhouette to aftercare, every layer is held to the same standard."
            }
          />
          <div className="mt-8 space-y-6">
            {brandStory.map((item) => (
              <div key={item.title.en} className="border-t border-[var(--line)] pt-6">
                <p className="font-display text-2xl">{item.title[locale]}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body[locale]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="surface-panel rounded-[40px] p-6 md:p-8">
            <p className="eyebrow">{locale === "zh-Hant" ? "服務是產品的一部分" : "Service is part of the product"}</p>
            <p className="mt-4 font-display text-3xl leading-tight">
              {locale === "zh-Hant"
                ? "我們把每一個接觸點都做得像購買同樣重要。"
                : "Every touchpoint is designed to feel as resolved as the purchase itself."}
            </p>
          </div>

          {supportChannels.map((channel) => (
            <div
              key={channel.id}
              className="surface-panel rounded-[32px] p-6 shadow-[0_16px_60px_rgba(15,23,42,0.04)]"
            >
              <p className="font-display text-3xl">{channel.title[locale]}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{channel.description[locale]}</p>
              <p className="mt-5 text-sm font-semibold text-[var(--ink)]">{channel.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
