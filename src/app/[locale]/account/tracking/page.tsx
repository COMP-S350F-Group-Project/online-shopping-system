import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { sampleOrders } from "@/lib/catalog";
import {
  formatDate,
  formatOrderStatus,
  formatShippingMethod,
  getOrderProgress,
  getOrderStatusTone,
} from "@/lib/format";
import { resolveLocale } from "@/lib/request";

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const activeOrder = sampleOrders[0];
  const nextMilestone = activeOrder.timeline.find((event) => !event.complete) ?? activeOrder.timeline.at(-1);

  return (
    <div className="container-shell space-y-8 py-10">
      <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10 md:py-12">
        <p className="eyebrow">{locale === "zh-Hant" ? "物流追蹤" : "Tracking"}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] md:text-6xl">
          {locale === "zh-Hant" ? "掌握配送進度、下一個節點與交付安排。" : "Follow delivery progress, the next milestone, and the final handoff."}
        </h1>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
            <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "訂單編號" : "Order number"}</p>
            <p className="mt-2 font-display text-3xl">{activeOrder.number}</p>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
            <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "目前狀態" : "Current status"}</p>
            <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getOrderStatusTone(activeOrder.status)}`}>
              {formatOrderStatus(activeOrder.status, locale)}
            </p>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
            <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "追蹤編號" : "Tracking number"}</p>
            <p className="mt-2 text-sm font-semibold text-[var(--ink)]">{activeOrder.trackingNumber}</p>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
            <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "下一個節點" : "Next milestone"}</p>
            <p className="mt-2 text-sm font-semibold text-[var(--ink)]">{nextMilestone?.label[locale]}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
        <section className="space-y-6">
          <div className="surface-panel rounded-[32px] p-6">
            <p className="text-sm text-slate-500">
              {locale === "zh-Hant" ? "目前追蹤中的訂單" : "Currently tracking"}
            </p>
            <h2 className="mt-3 font-display text-4xl">{activeOrder.number}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {locale === "zh-Hant"
                ? `追蹤編號 ${activeOrder.trackingNumber}，配送方式為${formatShippingMethod(activeOrder.shippingMethod, locale)}。`
                : `Tracking number ${activeOrder.trackingNumber}, shipping via ${formatShippingMethod(activeOrder.shippingMethod, locale).toLowerCase()}.`}
            </p>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
                <span>{locale === "zh-Hant" ? "履約進度" : "Fulfillment progress"}</span>
                <span>{getOrderProgress(activeOrder)}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/6">
                <div
                  className="h-full rounded-full bg-[var(--accent)]"
                  style={{ width: `${getOrderProgress(activeOrder)}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "收件資訊" : "Recipient"}</p>
                <p className="mt-2 font-semibold text-[var(--ink)]">{activeOrder.shippingAddress.name}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {activeOrder.shippingAddress.line1}
                  {activeOrder.shippingAddress.line2 ? `, ${activeOrder.shippingAddress.line2}` : ""}
                  <br />
                  {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.region}
                </p>
              </div>
              <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "預計安排" : "Current handoff"}</p>
                <p className="mt-2 text-sm font-semibold text-[var(--ink)]">{nextMilestone?.description[locale]}</p>
                <p className="mt-2 text-sm text-slate-500">
                  {nextMilestone ? formatDate(nextMilestone.timestamp, locale) : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[32px] p-6">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "需要協助？" : "Need support?"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {locale === "zh-Hant"
                ? "如需變更地址、安排代收或查詢特殊交付時段，可直接聯絡客戶服務。"
                : "For address changes, concierge receipt, or special delivery windows, client care can assist directly."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="sm" variant="secondary">
                <LocaleLink href="/contact" locale={locale}>
                  {locale === "zh-Hant" ? "聯絡客戶服務" : "Contact client care"}
                </LocaleLink>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <LocaleLink href={`/account/orders/${activeOrder.id}`} locale={locale}>
                  {locale === "zh-Hant" ? "查看訂單詳情" : "View order detail"}
                </LocaleLink>
              </Button>
            </div>
          </div>
        </section>

        <section className="surface-panel rounded-[32px] p-6">
          <h2 className="font-display text-3xl">
            {locale === "zh-Hant" ? "配送時間線" : "Tracking timeline"}
          </h2>
          <div className="mt-6 space-y-6">
            {activeOrder.timeline.map((event, index) => (
              <div key={event.timestamp} className="relative flex gap-4">
                {index !== activeOrder.timeline.length - 1 ? (
                  <div className="absolute left-[5px] top-4 h-full w-px bg-[var(--line)]" />
                ) : null}
                <div
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                    event.complete ? "bg-[var(--accent)]" : "bg-black/15"
                  }`}
                />
                <div>
                  <p className="font-semibold text-[var(--ink)]">{event.label[locale]}</p>
                  <p className="mt-1 text-sm leading-7 text-slate-500">{event.description[locale]}</p>
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
