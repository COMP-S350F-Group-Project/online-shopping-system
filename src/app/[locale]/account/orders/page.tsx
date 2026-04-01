import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { sampleOrders } from "@/lib/catalog";
import {
  formatCurrency,
  formatDate,
  formatOrderStatus,
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

  return (
    <div className="container-shell space-y-8 py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{locale === "zh-Hant" ? "訂單紀錄" : "Order history"}</p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95]">
            {locale === "zh-Hant" ? "所有訂單一目了然。" : "Every order, in one place."}
          </h1>
        </div>
        <Button asChild variant="secondary">
          <LocaleLink href="/account/tracking" locale={locale}>
            {locale === "zh-Hant" ? "查看物流追蹤" : "Open tracking"}
          </LocaleLink>
        </Button>
      </div>

      <div className="grid gap-5">
        {sampleOrders.map((order) => (
          <LocaleLink
            key={order.id}
            className="surface-panel rounded-[32px] p-6 transition hover:-translate-y-0.5"
            href={`/account/orders/${order.id}`}
            locale={locale}
          >
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-[var(--ink)]">{order.number}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getOrderStatusTone(order.status)}`}>
                    {formatOrderStatus(order.status, locale)}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{formatDate(order.placedAt, locale)}</p>
              </div>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-black/6">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${getOrderProgress(order)}%` }}
                  />
                </div>
              </div>
              <div className="grid gap-1 text-right">
                <p className="font-semibold text-[var(--ink)]">
                  {formatCurrency(order.total, locale)}
                </p>
                <p className="text-sm text-slate-500">
                  {locale === "zh-Hant"
                    ? `${order.items.length} 件商品`
                    : `${order.items.length} items`}
                </p>
              </div>
            </div>
          </LocaleLink>
        ))}
      </div>
    </div>
  );
}
