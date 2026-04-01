import { notFound } from "next/navigation";

import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import { getOrderById, getProductBySlug } from "@/lib/catalog";
import { formatCurrency, formatDate, getOrderStatusTone } from "@/lib/format";
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

  return (
    <div className="container-shell space-y-8 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{locale === "zh-Hant" ? "訂單詳情" : "Order detail"}</p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95]">{order.number}</h1>
          <p className="mt-3 text-base text-slate-600">{formatDate(order.placedAt, locale)}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-4 py-2 text-sm font-semibold ${getOrderStatusTone(order.status)}`}>
            {order.status}
          </span>
          <Button asChild variant="secondary">
            <LocaleLink href="/account/tracking" locale={locale}>
              {locale === "zh-Hant" ? "查看物流" : "Track order"}
            </LocaleLink>
          </Button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="surface-panel rounded-[32px] p-6">
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[var(--ink)]">{product.name[locale]}</p>
                      <p className="mt-2 text-sm text-slate-500">× {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[var(--ink)]">
                      {formatCurrency(product.price * item.quantity, locale)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <div className="surface-panel rounded-[32px] p-6">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "配送進度" : "Tracking timeline"}
            </h2>
            <div className="mt-6 space-y-5">
              {order.timeline.map((event) => (
                <div key={event.timestamp} className="flex gap-4">
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--accent)]" />
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
        </section>
      </div>
    </div>
  );
}
