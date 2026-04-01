import { notFound } from "next/navigation";

import { ReorderButton } from "@/components/account/reorder-button";
import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import {
  getOrderById,
  getProductBySlug,
  getProductPriceForSelection,
  getSelectionSummary,
} from "@/lib/catalog";
import {
  formatCurrency,
  formatDate,
  formatOrderStatus,
  formatShippingMethod,
  getOrderProgress,
  getOrderStatusTone,
} from "@/lib/format";
import { resolveLocale } from "@/lib/request";

export async function generateStaticParams() {
  return ["order-20481", "order-20319"].map((id) => ({ id }));
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const resolved = await params;
  const locale = await resolveLocale(
    Promise.resolve({
      locale: resolved.locale,
    }),
  );
  const order = getOrderById(resolved.id);

  if (!order) {
    notFound();
  }

  const nextMilestone = order.timeline.find((event) => !event.complete) ?? order.timeline.at(-1);

  return (
    <div className="container-shell space-y-8 py-10">
      <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-4">
            <p className="eyebrow">{locale === "zh-Hant" ? "訂單詳情" : "Order detail"}</p>
            <div>
              <h1 className="font-display text-5xl leading-[0.95]">{order.number}</h1>
              <p className="mt-3 text-base leading-8 text-slate-600">
                {formatDate(order.placedAt, locale)} · {formatShippingMethod(order.shippingMethod, locale)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${getOrderStatusTone(order.status)}`}>
              {formatOrderStatus(order.status, locale)}
            </span>
            <ReorderButton items={order.items} />
            <Button asChild variant="secondary">
              <LocaleLink href="/account/tracking" locale={locale}>
                {locale === "zh-Hant" ? "查看物流" : "Track order"}
              </LocaleLink>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
            <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "履約進度" : "Fulfillment progress"}</p>
            <p className="mt-2 font-display text-3xl">{getOrderProgress(order)}%</p>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
            <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "追蹤編號" : "Tracking number"}</p>
            <p className="mt-2 text-sm font-semibold text-[var(--ink)]">{order.trackingNumber}</p>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
            <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "下一個節點" : "Next milestone"}</p>
            <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
              {nextMilestone?.label[locale]}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-6">
          <div className="surface-panel rounded-[32px] p-6">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "商品內容" : "Items in this order"}
            </h2>
            <div className="mt-6 space-y-4">
              {order.items.map((item) => {
                const product = getProductBySlug(item.productSlug);
                if (!product) {
                  return null;
                }
                return (
                  <div
                    key={`${item.productSlug}-${JSON.stringify(item.selections)}`}
                    className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <p className="font-semibold text-[var(--ink)]">{product.name[locale]}</p>
                        <p className="text-sm text-slate-600">
                          {getSelectionSummary(product, item.selections, locale)}
                        </p>
                        <p className="text-sm text-slate-500">× {item.quantity}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-semibold text-[var(--ink)]">
                          {formatCurrency(
                            getProductPriceForSelection(product, item.selections) * item.quantity,
                            locale,
                          )}
                        </p>
                        <Button asChild size="sm" variant="secondary">
                          <LocaleLink href={`/products/${product.slug}`} locale={locale}>
                            {locale === "zh-Hant" ? "查看商品" : "View product"}
                          </LocaleLink>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="surface-panel rounded-[32px] p-6">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "配送進度" : "Tracking timeline"}
            </h2>
            <div className="mt-6 space-y-5">
              {order.timeline.map((event, index) => (
                <div key={event.timestamp} className="relative flex gap-4">
                  {index !== order.timeline.length - 1 ? (
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
          </div>
        </section>

        <section className="space-y-6">
          <div className="surface-panel rounded-[32px] p-6">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "配送與付款" : "Delivery and payment"}
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "收件資訊" : "Recipient"}</p>
                <p className="mt-2 font-semibold text-[var(--ink)]">{order.shippingAddress.name}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {order.shippingAddress.line1}
                  {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.region}
                  <br />
                  {order.shippingAddress.country}
                </p>
              </div>
              <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-sm text-slate-500">{locale === "zh-Hant" ? "付款方式" : "Payment method"}</p>
                <p className="mt-2 font-semibold text-[var(--ink)]">{order.paymentMethod}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {formatShippingMethod(order.shippingMethod, locale)}
                </p>
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[32px] p-6">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "訂單摘要" : "Summary"}
            </h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>{locale === "zh-Hant" ? "小計" : "Subtotal"}</span>
                <span>{formatCurrency(order.subtotal, locale)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{locale === "zh-Hant" ? "折扣" : "Discount"}</span>
                <span>-{formatCurrency(order.discount, locale)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{locale === "zh-Hant" ? "運費" : "Shipping"}</span>
                <span>{formatCurrency(order.shipping, locale)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{locale === "zh-Hant" ? "稅項" : "Tax"}</span>
                <span>{formatCurrency(order.tax, locale)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--line)] pt-4 text-lg font-semibold text-[var(--ink)]">
                <span>{locale === "zh-Hant" ? "合計" : "Total"}</span>
                <span>{formatCurrency(order.total, locale)}</span>
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[32px] p-6">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "需要協助？" : "Need help with this order?"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {locale === "zh-Hant"
                ? "如需改址、收件安排、禮品補件或售後協助，可直接聯絡客戶服務。"
                : "For address changes, handoff coordination, gifting adjustments, or aftercare, client care can assist directly."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="sm" variant="secondary">
                <LocaleLink href="/contact" locale={locale}>
                  {locale === "zh-Hant" ? "聯絡客戶服務" : "Contact client care"}
                </LocaleLink>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <LocaleLink href="/help" locale={locale}>
                  {locale === "zh-Hant" ? "查看支援中心" : "Open support centre"}
                </LocaleLink>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
