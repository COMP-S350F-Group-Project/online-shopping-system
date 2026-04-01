import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { ProductCard } from "@/components/store/product-card";
import {
  accountProfile,
  getProductBySlug,
  recommendationSlugs,
  sampleOrders,
} from "@/lib/catalog";
import { formatCurrency, formatDate, getOrderStatusTone } from "@/lib/format";
import { resolveLocale } from "@/lib/request";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const recommendations = recommendationSlugs
    .slice(0, 3)
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  return (
    <div className="container-shell space-y-8 py-10">
      <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-4">
            <Badge>{accountProfile.tier[locale]}</Badge>
            <div>
              <h1 className="font-display text-5xl leading-[0.95]">
                {locale === "zh-Hant" ? "會員中心" : "Your account"}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                {locale === "zh-Hant"
                  ? `你好，${accountProfile.name}。這裡集中管理你的訂單、地址與服務通知。`
                  : `Welcome back, ${accountProfile.name}. Orders, addresses, and service updates all live here.`}
              </p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
              <p className="text-sm text-slate-500">
                {locale === "zh-Hant" ? "會員級別" : "Membership"}
              </p>
              <p className="mt-2 font-display text-3xl">{accountProfile.tier[locale]}</p>
            </div>
            <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
              <p className="text-sm text-slate-500">
                {locale === "zh-Hant" ? "預設收件地區" : "Default address"}
              </p>
              <p className="mt-2 font-display text-3xl">{accountProfile.defaultAddress[locale]}</p>
            </div>
            <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
              <p className="text-sm text-slate-500">
                {locale === "zh-Hant" ? "下一個禮遇" : "Next reward"}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--ink)]">
                {accountProfile.nextReward[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-panel rounded-[32px] p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "最近訂單" : "Recent orders"}
            </h2>
            <Button asChild size="sm" variant="secondary">
              <LocaleLink href="/account/orders" locale={locale}>
                {locale === "zh-Hant" ? "查看全部" : "View all"}
              </LocaleLink>
            </Button>
          </div>
          <div className="space-y-4">
            {sampleOrders.map((order) => (
              <LocaleLink
                key={order.id}
                className="block rounded-[24px] border border-[var(--line)] bg-white/70 p-5 transition hover:bg-white"
                href={`/account/orders/${order.id}`}
                locale={locale}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--ink)]">{order.number}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {formatDate(order.placedAt, locale)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getOrderStatusTone(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="font-semibold text-[var(--ink)]">
                      {formatCurrency(order.total, locale)}
                    </p>
                  </div>
                </div>
              </LocaleLink>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="surface-panel rounded-[32px] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-display text-3xl">
                {locale === "zh-Hant" ? "快速前往" : "Quick access"}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  href: "/account/orders",
                  title: locale === "zh-Hant" ? "訂單紀錄" : "Order history",
                  copy:
                    locale === "zh-Hant"
                      ? "查看每筆訂單、付款方式與售後狀態。"
                      : "Review every order, payment method, and aftercare status.",
                },
                {
                  href: "/account/tracking",
                  title: locale === "zh-Hant" ? "物流追蹤" : "Tracking",
                  copy:
                    locale === "zh-Hant"
                      ? "持續掌握目前配送進度與節點。"
                      : "Monitor the current delivery timeline and milestones.",
                },
                {
                  href: "/wishlist",
                  title: locale === "zh-Hant" ? "收藏清單" : "Wishlist",
                  copy:
                    locale === "zh-Hant"
                      ? "整理喜歡的商品，方便下次比較與選購。"
                      : "Keep saved products together for comparing and buying later.",
                },
                {
                  href: "/contact",
                  title: locale === "zh-Hant" ? "聯絡顧問" : "Contact care",
                  copy:
                    locale === "zh-Hant"
                      ? "需要送禮、地址變更或補件支援時可直接聯絡。"
                      : "Reach client care for gifting, delivery changes, or replacements.",
                },
              ].map((item) => (
                <LocaleLink
                  key={item.href}
                  className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5 transition hover:bg-white"
                  href={item.href}
                  locale={locale}
                >
                  <p className="font-display text-3xl">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.copy}</p>
                </LocaleLink>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-3xl">
                {locale === "zh-Hant" ? "為你推薦" : "Recommended for you"}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {recommendations.map((product) => (
                <ProductCard key={product.slug} locale={locale} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
