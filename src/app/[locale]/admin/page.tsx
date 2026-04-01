import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import {
  getCategoryBySlug,
  products,
  promotions,
  sampleOrders,
} from "@/lib/catalog";
import {
  formatCurrency,
  formatDate,
  formatOrderStatus,
  getOrderStatusTone,
} from "@/lib/format";
import { getMessages } from "@/lib/i18n";
import { resolveLocale } from "@/lib/request";
import {
  adminClients,
  adminMetrics,
  adminPromotionPerformance,
  adminQueue,
} from "@/lib/site";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const messages = getMessages(locale);

  const recentOrders = [...sampleOrders].sort(
    (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime(),
  );
  const inventoryWatch = [...products]
    .filter((product) => product.stockState !== "in-stock" || product.stockCount <= 18)
    .sort((a, b) => a.stockCount - b.stockCount)
    .slice(0, 6);
  const topProducts = [...products]
    .sort((a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating)
    .slice(0, 5);

  return (
    <div className="container-shell space-y-8 py-10">
      <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10 md:py-12">
        <p className="eyebrow">{messages.adminPage.title}</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.95] md:text-6xl">
          {locale === "zh-Hant"
            ? "用同一個視圖掌握商務表現、服務節奏與商品健康度。"
            : "Keep commerce performance, service response, and product health in one view."}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {messages.adminPage.description}
        </p>
      </section>

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

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-panel rounded-[32px] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl">{messages.adminPage.priorityQueue}</h2>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-medium text-[var(--ink)]">
              {adminQueue.length}
            </span>
          </div>
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
        </div>

        <div className="surface-panel rounded-[32px] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl">{messages.adminPage.promotions}</h2>
            <span className="text-sm text-slate-500">{promotions.length}</span>
          </div>
          <div className="mt-6 grid gap-4">
            {adminPromotionPerformance.map((entry) => (
              <div
                key={entry.code}
                className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                      {entry.code}
                    </p>
                    <p className="mt-2 font-display text-2xl">{entry.title[locale]}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{entry.note[locale]}</p>
                  </div>
                  <div className="min-w-32 rounded-[20px] bg-[var(--surface-strong)] px-4 py-3 text-right">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      {messages.adminPage.redemptions}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[var(--ink)]">{entry.redemptions}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-4 text-sm text-slate-600">
                  <span>{messages.adminPage.revenueInfluenced}</span>
                  <span className="font-semibold text-[var(--ink)]">
                    {formatCurrency(entry.revenue, locale)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-panel rounded-[32px] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl">{messages.adminPage.recentOrders}</h2>
            <Button asChild size="sm" variant="secondary">
              <LocaleLink href="/account/orders" locale={locale}>
                {locale === "zh-Hant" ? "查看全部" : "View all"}
              </LocaleLink>
            </Button>
          </div>

          <div className="mt-6 grid gap-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-semibold text-[var(--ink)]">{order.number}</p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getOrderStatusTone(order.status)}`}
                      >
                        {formatOrderStatus(order.status, locale)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{order.shippingAddress.name}</p>
                    <p className="text-sm text-slate-500">
                      {formatDate(order.placedAt, locale)} · {order.trackingNumber}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 xl:justify-end">
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                        {locale === "zh-Hant" ? "訂單總額" : "Order total"}
                      </p>
                      <p className="mt-1 font-semibold text-[var(--ink)]">
                        {formatCurrency(order.total, locale)}
                      </p>
                    </div>
                    <Button asChild size="sm" variant="secondary">
                      <LocaleLink href={`/account/orders/${order.id}`} locale={locale}>
                        {messages.adminPage.viewOrder}
                      </LocaleLink>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel rounded-[32px] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl">{messages.adminPage.inventoryWatch}</h2>
            <span className="text-sm text-slate-500">{inventoryWatch.length}</span>
          </div>
          <div className="mt-6 grid gap-4">
            {inventoryWatch.map((product) => {
              const category = getCategoryBySlug(product.category);

              return (
                <div
                  key={product.slug}
                  className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[var(--ink)]">{product.name[locale]}</p>
                      <p className="mt-2 text-sm text-slate-600">{category?.name[locale]}</p>
                      <p className="mt-2 text-sm text-slate-500">
                        {product.stockState === "preorder"
                          ? locale === "zh-Hant"
                            ? "預購候補中"
                            : "Pre-order queue"
                          : locale === "zh-Hant"
                            ? `僅餘 ${product.stockCount} 件`
                            : `${product.stockCount} units left`}
                      </p>
                    </div>
                    <Button asChild size="sm" variant="secondary">
                      <LocaleLink href={`/products/${product.slug}`} locale={locale}>
                        {messages.adminPage.viewProduct}
                      </LocaleLink>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-panel rounded-[32px] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl">{messages.adminPage.clientList}</h2>
            <span className="text-sm text-slate-500">{adminClients.length}</span>
          </div>
          <div className="mt-6 grid gap-4">
            {adminClients.map((client) => (
              <div
                key={client.id}
                className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[var(--ink)]">{client.name}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {client.city[locale]} · {client.tier[locale]}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{client.focus[locale]}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      {messages.adminPage.totalSpend}
                    </p>
                    <p className="mt-1 font-semibold text-[var(--ink)]">
                      {formatCurrency(client.totalSpend, locale)}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-slate-500">
                      {messages.adminPage.lastOrder}
                    </p>
                    <p className="mt-1 text-sm text-[var(--ink)]">
                      {formatDate(client.lastOrder, locale)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel rounded-[32px] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl">{messages.adminPage.topProducts}</h2>
            <span className="text-sm text-slate-500">{topProducts.length}</span>
          </div>
          <div className="mt-6 grid gap-4">
            {topProducts.map((product) => {
              const linkedPromotion = promotions.find(
                (promotion) => promotion.code === "FIRSTLIGHT" && product.compareAtPrice,
              );

              return (
                <div
                  key={product.slug}
                  className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="font-semibold text-[var(--ink)]">{product.name[locale]}</p>
                      <p className="mt-2 text-sm text-slate-600">
                        {product.rating.toFixed(1)} · {product.reviewCount}
                        {locale === "zh-Hant" ? " 則評價" : " reviews"}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        {linkedPromotion
                          ? linkedPromotion.title[locale]
                          : locale === "zh-Hant"
                            ? "自然轉換表現穩定"
                            : "Strong organic conversion"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 lg:justify-end">
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                          {locale === "zh-Hant" ? "現貨狀態" : "Stock"}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                          {product.stockState === "preorder"
                            ? locale === "zh-Hant"
                              ? "接受預購"
                              : "Pre-order"
                            : locale === "zh-Hant"
                              ? `餘量 ${product.stockCount}`
                              : `${product.stockCount} units`}
                        </p>
                      </div>
                      <Button asChild size="sm" variant="secondary">
                        <LocaleLink href={`/products/${product.slug}`} locale={locale}>
                          {messages.adminPage.viewProduct}
                        </LocaleLink>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
