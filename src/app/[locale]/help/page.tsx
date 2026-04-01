import { supportArticles, supportChannels } from "@/lib/site";
import { resolveLocale } from "@/lib/request";

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  return (
    <div className="container-shell space-y-8 py-10">
      <div>
        <p className="eyebrow">{locale === "zh-Hant" ? "支援中心" : "Support centre"}</p>
        <h1 className="mt-3 font-display text-5xl leading-[0.95]">
          {locale === "zh-Hant" ? "訂單、保養與設定支援都在這裡。" : "Orders, care, and setup guidance in one place."}
        </h1>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="surface-panel rounded-[32px] p-6">
          <h2 className="font-display text-3xl">
            {locale === "zh-Hant" ? "直接服務管道" : "Direct service channels"}
          </h2>
          <div className="mt-6 space-y-4">
            {supportChannels.map((channel) => (
              <div
                key={channel.id}
                className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
              >
                <p className="font-semibold text-[var(--ink)]">{channel.title[locale]}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {channel.description[locale]}
                </p>
                <p className="mt-3 text-sm font-medium text-[var(--ink)]">{channel.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          {supportArticles.map((article) => (
            <article
              key={article.id}
              className="surface-panel rounded-[32px] p-6 shadow-[0_16px_60px_rgba(15,23,42,0.04)]"
            >
              <p className="eyebrow">{article.category}</p>
              <h2 className="mt-3 font-display text-3xl">{article.title[locale]}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {article.excerpt[locale]}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {article.body[locale]}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
