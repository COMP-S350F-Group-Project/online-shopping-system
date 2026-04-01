import { ReorderButton } from "@/components/account/reorder-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { ProductCard } from "@/components/store/product-card";
import {
  accountProfile,
  getProductBySlug,
  initialWishlist,
  recommendationSlugs,
  sampleOrders,
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
import { isDefined } from "@/lib/utils";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const recommendations = recommendationSlugs
    .slice(0, 3)
    .map((slug) => getProductBySlug(slug))
    .filter(isDefined);
  const latestOrder = sampleOrders[0];
  const lifetimeSpend = sampleOrders.reduce((total, order) => total + order.total, 0);
  const activeOrders = sampleOrders.filter((order) => order.status !== "delivered").length;

  const quickPaths = [
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
          ? "持續掌握目前配送進度與每一個節點。"
          : "Follow delivery milestones and the next handoff point.",
    },
    {
      href: "/wishlist",
      title: locale === "zh-Hant" ? "收藏清單" : "Wishlist",
      copy:
        locale === "zh-Hant"
          ? "保留想比較、送禮或之後回購的商品。"
          : "Keep pieces you want to compare, gift, or revisit later.",
    },
    {
      href: "/contact",
      title: locale === "zh-Hant" ? "聯絡顧問" : "Contact care",
      copy:
        locale === "zh-Hant"
          ? "需要送禮、改址或補件支援時可直接聯絡。"
          : "Reach client care for gifting, address changes, or replacements.",
    },
  ];

  const membershipBenefits = [
    locale === "zh-Hant"
      ? "工作室取貨與配送節奏可依需求調整"
      : "Studio pickup and delivery rhythm can be adjusted around your schedule",
    locale === "zh-Hant"
      ? "高價值訂單可享較細緻的送禮與售後協助"
      : "Higher-value purchases receive more deliberate gifting and aftercare support",
    locale === "zh-Hant"
      ? "收藏與購買紀錄會用來優化下一次推薦"
      : "Saved products and purchase history help refine the next recommendation set",
  ];

  return (
    <div className="container-shell space-y-8 py-10">
      <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-4">
            <Badge>{accountProfile.tier[locale]}</Badge>
            <div>
              <h1 className="font-display text-5xl leading-[0.95]">
                {locale === "zh-Hant" ? "會員中心" : "Your account"}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                {locale === "zh-Hant"
                  ? `你好，${accountProfile.name}。在這裡管理訂單、配送、付款偏好與專屬顧問服務。`
                  : `Welcome back, ${accountProfile.name}. Manage orders, delivery rhythm, payment preferences, and concierge support from one place.`}
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
              <p className="text-sm text-slate-500">
                {locale === "zh-Hant" ? "累計消費" : "Lifetime spend"}
              </p>
              <p className="mt-2 font-display text-3xl">{formatCurrency(lifetimeSpend, locale)}</p>
            </div>
            <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
              <p className="text-sm text-slate-500">
                {locale === "zh-Hant" ? "進行中的訂單" : "Open orders"}
              </p>
              <p className="mt-2 font-display text-3xl">{activeOrders}</p>
            </div>
            <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
              <p className="text-sm text-slate-500">
                {locale === "zh-Hant" ? "收藏商品" : "Saved products"}
              </p>
              <p className="mt-2 font-display text-3xl">{initialWishlist.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.04fr_0.96fr]">
        <div className="space-y-8">
          <div className="surface-panel rounded-[32px] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-display text-3xl">
                {locale === "zh-Hant" ? "最新訂單動態" : "Latest order activity"}
              </h2>
              <Button asChild size="sm" variant="secondary">
                <LocaleLink href="/account/orders" locale={locale}>
                  {locale === "zh-Hant" ? "查看全部" : "View all"}
                </LocaleLink>
              </Button>
            </div>

            <div className="rounded-[28px] border border-[var(--line)] bg-white/70 p-5">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-[var(--ink)]">{latestOrder.number}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getOrderStatusTone(latestOrder.status)}`}>
                      {formatOrderStatus(latestOrder.status, locale)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {formatDate(latestOrder.placedAt, locale)} ·{" "}
                    {formatShippingMethod(latestOrder.shippingMethod, locale)}
                  </p>
                  <p className="text-sm text-slate-500">{latestOrder.trackingNumber}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <ReorderButton items={latestOrder.items} />
                  <Button asChild size="sm" variant="secondary">
                    <LocaleLink href="/account/tracking" locale={locale}>
                      {locale === "zh-Hant" ? "查看物流" : "Track order"}
                    </LocaleLink>
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
                  <span>{locale === "zh-Hant" ? "履約進度" : "Fulfillment progress"}</span>
                  <span>{getOrderProgress(latestOrder)}%</span>
                </div>
                <div className="h-2 rounded-full bg-black/6">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${getOrderProgress(latestOrder)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[32px] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-display text-3xl">
                {locale === "zh-Hant" ? "快速前往" : "Quick access"}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {quickPaths.map((item) => (
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
        </div>

        <div className="space-y-8">
          <div className="surface-panel rounded-[32px] p-6">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "會員與服務偏好" : "Membership and service profile"}
            </h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-sm text-slate-500">
                  {locale === "zh-Hant" ? "會員等級與加入時間" : "Membership and since"}
                </p>
                <p className="mt-2 font-display text-3xl">{accountProfile.tier[locale]}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {locale === "zh-Hant"
                    ? `加入於 ${formatDate(accountProfile.memberSince, locale)}`
                    : `Member since ${formatDate(accountProfile.memberSince, locale)}`}
                </p>
              </div>
              <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-sm text-slate-500">
                  {locale === "zh-Hant" ? "預設送達與付款" : "Delivery and payment defaults"}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
                  {accountProfile.defaultAddress[locale]}
                </p>
                <p className="mt-2 text-sm text-slate-600">{accountProfile.defaultPayment[locale]}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {accountProfile.servicePreference[locale]}
                </p>
              </div>
              <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-sm text-slate-500">
                  {locale === "zh-Hant" ? "顧問備註" : "Concierge note"}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {accountProfile.conciergeNote[locale]}
                </p>
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[32px] p-6">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "會員禮遇" : "Member privileges"}
            </h2>
            <div className="mt-6 grid gap-4">
              {membershipBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-[24px] border border-[var(--line)] bg-white/70 px-5 py-4 text-sm leading-7 text-slate-600"
                >
                  {benefit}
                </div>
              ))}
              <div className="rounded-[24px] bg-[var(--surface-strong)] px-5 py-4 text-sm leading-7 text-[var(--ink)]">
                {accountProfile.nextReward[locale]}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
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
      </section>
    </div>
  );
}
