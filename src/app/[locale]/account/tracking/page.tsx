import { sampleOrders } from "@/lib/catalog";
import { formatDate } from "@/lib/format";
import { resolveLocale } from "@/lib/request";

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const activeOrder = sampleOrders[0];

  return (
    <div className="container-shell space-y-8 py-10">
      <div>
        <p className="eyebrow">{locale === "zh-Hant" ? "物流追蹤" : "Tracking"}</p>
        <h1 className="mt-3 font-display text-5xl leading-[0.95]">
          {locale === "zh-Hant" ? "掌握配送進度與每一個節點。" : "Follow every delivery milestone."}
        </h1>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="surface-panel rounded-[32px] p-6">
          <p className="text-sm text-slate-500">
            {locale === "zh-Hant" ? "目前追蹤中的訂單" : "Currently tracking"}
          </p>
          <h2 className="mt-3 font-display text-4xl">{activeOrder.number}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {locale === "zh-Hant"
              ? `追蹤編號 ${activeOrder.trackingNumber}，最新狀態為配送途中。`
              : `Tracking number ${activeOrder.trackingNumber}, currently in transit.`}
          </p>
        </section>

        <section className="surface-panel rounded-[32px] p-6">
          <div className="space-y-6">
            {activeOrder.timeline.map((event, index) => (
              <div key={event.timestamp} className="relative flex gap-4">
                {index !== activeOrder.timeline.length - 1 ? (
                  <div className="absolute left-[5px] top-4 h-full w-px bg-[var(--line)]" />
                ) : null}
                <div className={`mt-1 h-3 w-3 shrink-0 rounded-full ${event.complete ? "bg-[var(--accent)]" : "bg-black/15"}`} />
                <div>
                  <p className="font-semibold text-[var(--ink)]">{event.label[locale]}</p>
                  <p className="mt-1 text-sm text-slate-500">{event.description[locale]}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">
                    {formatDate(event.timestamp, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
