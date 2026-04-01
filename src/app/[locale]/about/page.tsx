import { brand, brandStory } from "@/lib/site";
import { resolveLocale } from "@/lib/request";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  return (
    <div className="container-shell space-y-8 py-10">
      <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10 md:py-14">
        <p className="eyebrow">{locale === "zh-Hant" ? "品牌故事" : "Brand story"}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] md:text-7xl">
          {locale === "zh-Hant"
            ? "Velora 來自一個很簡單的想法: 讓科技與生活用品回到更清楚、更耐看的樣子。"
            : "Velora began with a simple idea: everyday technology should feel clearer, quieter, and better resolved."}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {brand.strategy.concept[locale]}
        </p>
      </section>

      <div className="grid gap-5 xl:grid-cols-3">
        {brandStory.map((item) => (
          <div
            key={item.title.en}
            className="surface-panel rounded-[32px] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.04)]"
          >
            <p className="font-display text-3xl leading-tight">{item.title[locale]}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.body[locale]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
