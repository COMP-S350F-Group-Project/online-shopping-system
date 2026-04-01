"use client";

import { CreditCard, Mail, PackageCheck, Truck } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getProductPriceForSelection, getSelectionSummary } from "@/lib/catalog";
import { formatCurrency, formatDate, formatShippingMethod } from "@/lib/format";
import { useCommerceStore } from "@/lib/store";
import type { Locale } from "@/types";

export function ConfirmationExperience({
  locale,
  orderNumber,
}: {
  locale: Locale;
  orderNumber: string;
}) {
  const t = useTranslations();
  const lastCheckout = useCommerceStore((state) => state.lastCheckout);
  const order = lastCheckout?.orderNumber === orderNumber ? lastCheckout : undefined;

  if (!order) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="surface-panel rounded-[32px] p-6">
          <h2 className="font-display text-3xl">{t("confirmation.timelineTitle")}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">{t("confirmation.description")}</p>
        </div>
        <div className="surface-panel rounded-[32px] p-6">
          <h2 className="font-display text-3xl">{t("confirmation.deliveryTitle")}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {locale === "zh-Hant"
              ? "你可前往會員中心查看最新訂單狀態與配送進度。"
              : "Visit your account to review the latest order status and delivery progress."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="sm" variant="secondary">
              <LocaleLink href="/account/orders" locale={locale}>
                {t("confirmation.accountCta")}
              </LocaleLink>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <LocaleLink href="/contact" locale={locale}>
                {t("confirmation.supportCta")}
              </LocaleLink>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="space-y-6">
        <div className="surface-panel rounded-[32px] p-6">
          <h2 className="font-display text-3xl">{t("confirmation.summaryTitle")}</h2>
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
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        {getSelectionSummary(product, item.selections, locale)}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">× {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[var(--ink)]">
                      {formatCurrency(
                        getProductPriceForSelection(product, item.selections) * item.quantity,
                        locale,
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-3 border-t border-[var(--line)] pt-5 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>{t("common.subtotal")}</span>
              <span>{formatCurrency(order.subtotal, locale)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("common.discount")}</span>
              <span>{order.discount ? `-${formatCurrency(order.discount, locale)}` : "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("common.shipping")}</span>
              <span>{order.shipping ? formatCurrency(order.shipping, locale) : "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("common.tax")}</span>
              <span>{formatCurrency(order.tax, locale)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--line)] pt-4 text-lg font-semibold text-[var(--ink)]">
              <span>{t("common.total")}</span>
              <span>{formatCurrency(order.total, locale)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="surface-panel rounded-[32px] p-6">
          <h2 className="font-display text-3xl">{t("confirmation.deliveryTitle")}</h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm text-slate-500">{t("confirmation.orderDate")}</p>
                  <p className="mt-2 font-semibold text-[var(--ink)]">
                    {formatDate(order.placedAt, locale)}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{order.contact.email}</p>
                  <p className="text-sm leading-7 text-slate-600">{order.contact.phone}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
              <div className="flex items-start gap-3">
                <Truck className="mt-1 h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm text-slate-500">{t("confirmation.deliveryMethod")}</p>
                  <p className="mt-2 font-semibold text-[var(--ink)]">
                    {formatShippingMethod(order.shippingMethod, locale)}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {order.shippingAddress.name}
                    <br />
                    {order.shippingAddress.line1}
                    {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.region}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-1 h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm text-slate-500">{t("confirmation.paymentMethod")}</p>
                  <p className="mt-2 font-semibold text-[var(--ink)]">{order.paymentLabel}</p>
                  {order.orderNotes ? (
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {t("confirmation.notes")}: {order.orderNotes}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="surface-panel rounded-[32px] p-6">
          <h2 className="font-display text-3xl">{t("confirmation.timelineTitle")}</h2>
          <div className="mt-6 space-y-5">
            {[
              {
                icon: PackageCheck,
                title: t("confirmation.timelinePaymentTitle"),
                copy: t("confirmation.timelinePaymentCopy"),
              },
              {
                icon: Truck,
                title: t("confirmation.timelineDeliveryTitle"),
                copy: t("confirmation.timelineDeliveryCopy"),
              },
              {
                icon: Mail,
                title: t("confirmation.timelineSupportTitle"),
                copy: t("confirmation.timelineSupportCopy"),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
              >
                <item.icon className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-4 font-semibold text-[var(--ink)]">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="sm" variant="secondary">
              <LocaleLink href="/account/orders" locale={locale}>
                {t("confirmation.accountCta")}
              </LocaleLink>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <LocaleLink href="/contact" locale={locale}>
                {t("confirmation.supportCta")}
              </LocaleLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
