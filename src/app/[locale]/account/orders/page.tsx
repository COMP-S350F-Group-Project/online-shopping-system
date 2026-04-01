import { ReorderButton } from "@/components/account/reorder-button";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { sampleOrders } from "@/lib/catalog";
import {
  formatCurrency,
  formatDate,
  formatOrderStatus,
  formatShippingMethod,
  getOrderProgress,
  getOrderStatusTone,
} from "@/lib/format";
import { resolveLocale } from "@/lib/request";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const activeOrders = sampleOrders.filter((order) => order.status !== "delivered").length;
  const deliveredOrders = sampleOrders.filter((order) => order.status === "delivered").length;
  const totalSpend = sampleOrders.reduce((total, order) => total + order.total, 0);

  return (
    <div className="container-shell space-y-8 py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{locale === "zh-Hant" ? "訂單紀錄" : "Order history"}</p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95]">
            {locale === "zh-Hant" ? "每一筆訂單與後續進度，都整理在同一處。" : "Every order and its next step, organized in one place."}
          </h1>
        </div>
        <Button asChild variant="secondary">
          <LocaleLink href="/account/tracking" locale={locale}>
            {locale === "zh-Hant" ? "查看物流追蹤" : "Open tracking"}
          </LocaleLink>
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="surface-panel rounded-[28px] p-5">
          <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "進行中的訂單" : "Open orders"}</p>
          <p className="mt-3 font-display text-4xl">{activeOrders}</p>
        </div>
        <div className="surface-panel rounded-[28px] p-5">
          <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "已完成送達" : "Delivered orders"}</p>
          <p className="mt-3 font-display text-4xl">{deliveredOrders}</p>
        </div>
        <div className="surface-panel rounded-[28px] p-5">
          <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "累計消費" : "Total spend"}</p>
          <p className="mt-3 font-display text-4xl">{formatCurrency(totalSpend, locale)}</p>
        </div>
      </div>

      <div className="grid gap-5">
        {sampleOrders.map((order) => (
          <div key={order.id} className="surface-panel rounded-[32px] p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-semibold text-[var(--ink)]">{order.number}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getOrderStatusTone(order.status)}`}>
                    {formatOrderStatus(order.status, locale)}
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  {formatDate(order.placedAt, locale)} · {formatShippingMethod(order.shippingMethod, locale)}
                </p>
                <p className="text-sm text-slate-500">
                  {order.paymentMethod} · {order.trackingNumber}
                </p>
              </div>

              <div className="w-full max-w-sm">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
                  <span>{locale === "zh-Hant" ? "履約進度" : "Fulfillment progress"}</span>
                  <span>{getOrderProgress(order)}%</span>
                </div>
                <div className="h-2 rounded-full bg-black/6">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${getOrderProgress(order)}%` }}
                  />
                </div>
              </div>

              <div className="grid gap-1 text-right">
                <p className="font-semibold text-[var(--ink)]">{formatCurrency(order.total, locale)}</p>
                <p className="text-sm text-slate-500">
                  {locale === "zh-Hant" ? `${order.items.length} 件商品` : `${order.items.length} items`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 xl:justify-end">
                <ReorderButton items={order.items} />
                <Button asChild size="sm" variant="secondary">
                  <LocaleLink href={`/account/orders/${order.id}`} locale={locale}>
                    {locale === "zh-Hant" ? "查看詳情" : "View detail"}
                  </LocaleLink>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
