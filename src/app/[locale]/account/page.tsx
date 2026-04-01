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
import { getMessages } from "@/lib/i18n";
import { resolveLocale } from "@/lib/request";
import { accountMembershipBenefits, accountQuickPaths } from "@/lib/site";
import { isDefined } from "@/lib/utils";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const messages = getMessages(locale);
  const recommendations = recommendationSlugs
    .slice(0, 3)
    .map((slug) => getProductBySlug(slug))
    .filter(isDefined);
  const latestOrder = sampleOrders[0];
  const lifetimeSpend = sampleOrders.reduce((total, order) => total + order.total, 0);
  const activeOrders = sampleOrders.filter((order) => order.status !== "delivered").length;

  return (
    <div className="container-shell space-y-8 py-10">
      <section className="surface-panel rounded-[40px] px-5 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-4">
            <Badge>{accountProfile.tier[locale]}</Badge>
            <div>
              <h1 className="font-display text-4xl leading-[0.95] md:text-5xl">
                {messages.accountPage.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                {messages.accountPage.welcome.replace("{name}", accountProfile.name)}
              </p>
            </div>
          </div>

          <div className="grid auto-cols-[minmax(160px,78%)] grid-flow-col gap-3 overflow-x-auto pb-1 md:grid-cols-3 md:grid-flow-row md:auto-cols-auto md:overflow-visible">
            <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
              <p className="text-sm text-slate-500">{messages.accountPage.lifetimeSpend}</p>
              <p className="mt-2 font-display text-3xl">{formatCurrency(lifetimeSpend, locale)}</p>
            </div>
            <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
              <p className="text-sm text-slate-500">{messages.accountPage.openOrders}</p>
              <p className="mt-2 font-display text-3xl">{activeOrders}</p>
            </div>
            <div className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4">
              <p className="text-sm text-slate-500">{messages.accountPage.savedProducts}</p>
              <p className="mt-2 font-display text-3xl">{initialWishlist.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.04fr_0.96fr]">
        <div className="space-y-8">
          <div className="surface-panel rounded-[32px] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-display text-[1.7rem] leading-tight md:text-3xl">
                {messages.accountPage.latestOrder}
              </h2>
              <Button asChild size="sm" variant="secondary">
                <LocaleLink href="/account/orders" locale={locale}>
                  {messages.accountPage.viewAll}
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

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <ReorderButton items={latestOrder.items} />
                  <Button asChild size="sm" variant="secondary">
                    <LocaleLink href="/account/tracking" locale={locale}>
                      {messages.accountPage.trackOrder}
                    </LocaleLink>
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
                  <span>{messages.accountPage.fulfillmentProgress}</span>
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

          <div className="surface-panel rounded-[32px] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-display text-[1.7rem] leading-tight md:text-3xl">
                {messages.accountPage.quickAccessTitle}
              </h2>
            </div>
            <div className="grid auto-cols-[minmax(245px,86%)] grid-flow-col gap-4 overflow-x-auto pb-1 md:grid-cols-2 md:grid-flow-row md:auto-cols-auto md:overflow-visible">
              {accountQuickPaths.map((item) => (
                <LocaleLink
                  key={item.id}
                  className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5 transition hover:bg-white"
                  href={item.href}
                  locale={locale}
                >
                  <p className="font-display text-3xl">{item.title[locale]}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description[locale]}</p>
                </LocaleLink>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="surface-panel rounded-[32px] p-5 md:p-6">
            <h2 className="font-display text-[1.7rem] leading-tight md:text-3xl">
              {messages.accountPage.memberProfile}
            </h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-sm text-slate-500">{messages.accountPage.membershipSince}</p>
                <p className="mt-2 font-display text-3xl">{accountProfile.tier[locale]}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {messages.accountPage.memberSince.replace(
                    "{date}",
                    formatDate(accountProfile.memberSince, locale),
                  )}
                </p>
              </div>
              <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-sm text-slate-500">{messages.accountPage.deliveryDefaults}</p>
                <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
                  {accountProfile.defaultAddress[locale]}
                </p>
                <p className="mt-2 text-sm text-slate-600">{accountProfile.defaultPayment[locale]}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {accountProfile.servicePreference[locale]}
                </p>
              </div>
              <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
                <p className="text-sm text-slate-500">{messages.accountPage.conciergeNote}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {accountProfile.conciergeNote[locale]}
                </p>
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[32px] p-5 md:p-6">
            <h2 className="font-display text-[1.7rem] leading-tight md:text-3xl">
              {messages.accountPage.privilegesTitle}
            </h2>
            <div className="mt-6 grid gap-4">
              {accountMembershipBenefits.map((benefit) => (
                <div
                  key={benefit.en}
                  className="rounded-[24px] border border-[var(--line)] bg-white/70 px-5 py-4 text-sm leading-7 text-slate-600"
                >
                  {benefit[locale]}
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
          <h2 className="font-display text-3xl">{messages.accountPage.recommendedTitle}</h2>
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
