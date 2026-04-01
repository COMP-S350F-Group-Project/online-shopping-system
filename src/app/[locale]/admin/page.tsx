import { adminMetrics, adminQueue } from "@/lib/site";
import { resolveLocale } from "@/lib/request";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  return (
    <div className="container-shell space-y-8 py-10">
      <div>
        <p className="eyebrow">{locale === "zh-Hant" ? "營運後台" : "Operations dashboard"}</p>
        <h1 className="mt-3 font-display text-5xl leading-[0.95]">
          {locale === "zh-Hant" ? "商務、庫存與服務狀態的整體視圖。" : "A high-level view across commerce, inventory, and service."}
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric) => (
          <div
            key={metric.label.en}
            className="surface-panel rounded-[32px] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.04)]"
          >
            <p className="text-sm text-slate-500">{metric.label[locale]}</p>
            <p className="mt-3 font-display text-4xl">{metric.value}</p>
            <p className="mt-3 text-sm text-slate-600">{metric.delta[locale]}</p>
          </div>
        ))}
      </div>

      <section className="surface-panel rounded-[32px] p-6">
        <h2 className="font-display text-3xl">
          {locale === "zh-Hant" ? "當前待處理項目" : "Current priority queue"}
        </h2>
        <div className="mt-6 grid gap-4">
          {adminQueue.map((item) => (
            <div
              key={item.id}
              className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-[var(--ink)]">{item.title[locale]}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail[locale]}</p>
                </div>
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-medium text-[var(--ink)]">
                  {item.status[locale]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
