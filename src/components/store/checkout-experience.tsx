"use client";

import { startTransition, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getProductBySlug,
  getProductPriceForSelection,
  getPromotionByCode,
} from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";
import { useCommerceStore } from "@/lib/store";
import type { Locale } from "@/types";

const shippingFees = {
  complimentary: 0,
  express: 90,
  studio: 0,
} as const;

export function CheckoutExperience({ locale }: { locale: Locale }) {
  const router = useRouter();
  const t = useTranslations();
  const cart = useCommerceStore((state) => state.cart);
  const appliedCoupon = useCommerceStore((state) => state.appliedCoupon);
  const shippingMethod = useCommerceStore((state) => state.shippingMethod);
  const completeCheckout = useCommerceStore((state) => state.completeCheckout);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const summary = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => {
      const product = getProductBySlug(item.productSlug);
      if (!product) {
        return sum;
      }
      return sum + getProductPriceForSelection(product, item.selections) * item.quantity;
    }, 0);

    const promotion = appliedCoupon ? getPromotionByCode(appliedCoupon) : undefined;
    const discount =
      promotion && subtotal >= promotion.minimumSpend
        ? promotion.discountType === "fixed"
          ? promotion.discountValue
          : Math.round((subtotal * promotion.discountValue) / 100)
        : 0;
    const shipping = shippingFees[shippingMethod];
    const tax = Math.round((subtotal - discount) * 0.03);

    return {
      subtotal,
      discount,
      shipping,
      tax,
      total: subtotal - discount + shipping + tax,
    };
  }, [appliedCoupon, cart, shippingMethod]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          setIsSubmitting(true);

          const orderNumber = `VLR-${Math.floor(10000 + Math.random() * 89999)}`;
          completeCheckout(orderNumber);

          startTransition(() => {
            router.push(`/${locale}/checkout/confirmation?order=${orderNumber}`);
          });
        }}
      >
        <section className="rounded-[32px] border border-[var(--line)] bg-white/75 p-6 backdrop-blur">
          <div className="mb-5 space-y-2">
            <h2 className="font-display text-3xl">{t("checkout.contact")}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder={t("auth.firstName")} required />
            <Input placeholder={t("auth.lastName")} required />
            <Input className="md:col-span-2" placeholder={t("auth.email")} required type="email" />
            <Input className="md:col-span-2" defaultValue="+852 6123 4568" placeholder="Phone" required type="tel" />
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--line)] bg-white/75 p-6 backdrop-blur">
          <div className="mb-5 space-y-2">
            <h2 className="font-display text-3xl">{t("checkout.shippingAddress")}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input className="md:col-span-2" defaultValue="Tower 3, 39 Conduit Road" required />
            <Input defaultValue="Mid-Levels West" required />
            <Input defaultValue="Hong Kong" required />
            <Input defaultValue="Hong Kong Island" required />
            <Input defaultValue="000000" required />
            <Textarea className="md:col-span-2" placeholder={t("checkout.orderNotes")} />
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--line)] bg-white/75 p-6 backdrop-blur">
          <div className="mb-5 space-y-2">
            <h2 className="font-display text-3xl">{t("checkout.payment")}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input className="md:col-span-2" placeholder={t("checkout.cardName")} required />
            <Input className="md:col-span-2" defaultValue="4242 4242 4242 4242" placeholder={t("checkout.cardNumber")} required />
            <Input defaultValue="08 / 29" placeholder={t("checkout.expiry")} required />
            <Input defaultValue="482" placeholder={t("checkout.cvc")} required />
          </div>
        </section>
      </form>

      <aside className="space-y-5">
        <div className="rounded-[32px] border border-[var(--line)] bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur">
          <div className="space-y-5">
            <h2 className="font-display text-3xl">{t("cartPage.summaryTitle")}</h2>
            <div className="space-y-4">
              {cart.map((item) => {
                const product = getProductBySlug(item.productSlug);
                if (!product) {
                  return null;
                }
                return (
                  <div
                    key={`${item.productSlug}-${JSON.stringify(item.selections)}`}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="font-medium text-[var(--ink)]">{product.name[locale]}</p>
                      <p className="text-sm text-slate-500">× {item.quantity}</p>
                    </div>
                    <p className="font-medium text-[var(--ink)]">
                      {formatCurrency(
                        getProductPriceForSelection(product, item.selections) * item.quantity,
                        locale,
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 border-t border-[var(--line)] pt-4 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>{t("common.subtotal")}</span>
                <span>{formatCurrency(summary.subtotal, locale)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t("common.discount")}</span>
                <span>{summary.discount ? `-${formatCurrency(summary.discount, locale)}` : "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t("common.shipping")}</span>
                <span>{summary.shipping ? formatCurrency(summary.shipping, locale) : "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t("common.tax")}</span>
                <span>{formatCurrency(summary.tax, locale)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--line)] pt-4 text-lg font-semibold text-[var(--ink)]">
              <span>{t("common.total")}</span>
              <span>{formatCurrency(summary.total, locale)}</span>
            </div>

            <Button
              className="w-full"
              disabled={isSubmitting}
              onClick={() => {
                const submitButton = document.querySelector<HTMLButtonElement>(
                  "button[type='submit']",
                );
                submitButton?.click();
              }}
            >
              {t("checkout.placeOrder")}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
