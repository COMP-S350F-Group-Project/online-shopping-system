"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useLocaleContext, useTranslations } from "@/components/providers/locale-provider";
import { EmptyState } from "@/components/shared/empty-state";
import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getProductBySlug,
  getProductPriceForSelection,
  getPromotionByCode,
  getSelectionSummary,
} from "@/lib/catalog";
import { calculateOrderSummary, getShippingOptionContent } from "@/lib/commerce";
import { formatCurrency } from "@/lib/format";
import { useCommerceStore } from "@/lib/store";

export function CartExperience() {
  const { locale } = useLocaleContext();
  const t = useTranslations();
  const cart = useCommerceStore((state) => state.cart);
  const wishlist = useCommerceStore((state) => state.wishlist);
  const appliedCoupon = useCommerceStore((state) => state.appliedCoupon);
  const shippingMethod = useCommerceStore((state) => state.shippingMethod);
  const updateQuantity = useCommerceStore((state) => state.updateQuantity);
  const removeFromCart = useCommerceStore((state) => state.removeFromCart);
  const moveToWishlist = useCommerceStore((state) => state.moveToWishlist);
  const moveWishlistToCart = useCommerceStore((state) => state.moveWishlistToCart);
  const applyCoupon = useCommerceStore((state) => state.applyCoupon);
  const setShippingMethod = useCommerceStore((state) => state.setShippingMethod);
  const [couponInput, setCouponInput] = useState(appliedCoupon ?? "");

  const summary = useMemo(
    () => calculateOrderSummary(cart, appliedCoupon, shippingMethod),
    [appliedCoupon, cart, shippingMethod],
  );
  const selectedShipping = getShippingOptionContent(shippingMethod, locale);
  const promotion = appliedCoupon ? getPromotionByCode(appliedCoupon) : undefined;

  if (cart.length === 0) {
    return (
      <div className="space-y-8">
        <EmptyState
          description={t("cartPage.emptyCopy")}
          locale={locale}
          primaryHref="/shop"
          primaryLabel={t("empty.viewShop")}
          secondaryHref="/"
          secondaryLabel={t("empty.backHome")}
          title={t("cartPage.emptyTitle")}
        />

        {wishlist.length > 0 ? (
          <div className="rounded-[32px] border border-[var(--line)] bg-white/75 p-6 backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="font-display text-3xl">{t("cartPage.savedTitle")}</h2>
              <LocaleLink
                className="text-sm font-semibold text-[var(--accent)]"
                href="/wishlist"
                locale={locale}
              >
                {t("nav.wishlist")}
              </LocaleLink>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {wishlist.map((productSlug) => {
                const product = getProductBySlug(productSlug);
                if (!product) {
                  return null;
                }
                return (
                  <div
                    key={productSlug}
                    className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-strong)] p-4"
                  >
                    <div className="space-y-2">
                      <p className="font-semibold text-[var(--ink)]">{product.name[locale]}</p>
                      <p className="text-sm text-slate-600">
                        {formatCurrency(product.price, locale)}
                      </p>
                    </div>
                    <Button
                      className="mt-4 w-full"
                      onClick={() =>
                        moveWishlistToCart(product.slug, product.defaultVariantSelection)
                      }
                      size="sm"
                    >
                      {t("common.addToCart")}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-4">
        {cart.map((item) => {
          const product = getProductBySlug(item.productSlug);
          if (!product) {
            return null;
          }

          return (
            <div
              key={`${item.productSlug}-${JSON.stringify(item.selections)}`}
              className="rounded-[32px] border border-[var(--line)] bg-white/75 p-5 shadow-[0_16px_60px_rgba(15,23,42,0.04)] backdrop-blur"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="font-display text-2xl leading-tight">
                      {product.name[locale]}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      {getSelectionSummary(product, item.selections, locale)}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-4 rounded-full border border-[var(--line)] bg-white/80 px-4 py-2">
                    <button
                      className="rounded-full p-1 text-slate-500 hover:bg-black/5"
                      onClick={() =>
                        updateQuantity(item, Math.max(1, item.quantity - 1))
                      }
                      type="button"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-5 text-center font-medium">{item.quantity}</span>
                    <button
                      className="rounded-full p-1 text-slate-500 hover:bg-black/5"
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                      type="button"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  <p className="text-lg font-semibold text-[var(--ink)]">
                    {formatCurrency(
                      getProductPriceForSelection(product, item.selections) * item.quantity,
                      locale,
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => moveToWishlist(item)}
                      size="sm"
                      variant="secondary"
                    >
                      {t("common.saveForLater")}
                    </Button>
                    <Button
                      onClick={() => removeFromCart(item)}
                      size="sm"
                      variant="ghost"
                    >
                      <Trash2 className="h-4 w-4" />
                      {t("common.remove")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="space-y-5">
        <div className="rounded-[32px] border border-[var(--line)] bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur">
          <div className="space-y-5">
            <h2 className="font-display text-3xl">{t("cartPage.summaryTitle")}</h2>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[var(--ink)]">
                {t("cartPage.couponLabel")}
              </label>
              <div className="flex gap-3">
                <Input
                  onChange={(event) => setCouponInput(event.target.value.toUpperCase())}
                  placeholder={t("cartPage.couponPlaceholder")}
                  value={couponInput}
                />
                <Button
                  onClick={() => {
                    const applied = applyCoupon(couponInput);
                    if (applied) {
                      toast.success(t("cartPage.couponApplied"));
                    } else {
                      toast.error(t("cartPage.couponUnavailable"));
                    }
                  }}
                  type="button"
                  variant="secondary"
                >
                  {t("common.apply")}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[var(--ink)]">
                {t("cartPage.shippingMethod")}
              </p>
              <div className="grid gap-2">
                {(["complimentary", "express", "studio"] as const).map((method) => {
                  const option = getShippingOptionContent(method, locale);

                  return (
                  <button
                    key={method}
                    className={`rounded-[20px] border px-4 py-3 text-left text-sm transition ${
                      method === shippingMethod
                        ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                        : "border-[var(--line)] bg-white/70 hover:bg-white"
                    }`}
                    onClick={() => setShippingMethod(method)}
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-[var(--ink)]">
                        {option.label}
                      </span>
                      <span className="text-slate-500">
                        {option.fee
                          ? formatCurrency(option.fee, locale)
                          : t("common.free")}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-slate-500">{option.promise}</p>
                  </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>{t("common.subtotal")}</span>
                <span>{formatCurrency(summary.subtotal, locale)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t("common.discount")}</span>
                <span>
                  {summary.discount ? `-${formatCurrency(summary.discount, locale)}` : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t("common.shipping")}</span>
                <span>
                  {summary.shipping ? formatCurrency(summary.shipping, locale) : "—"}
                </span>
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

            <div className="rounded-[24px] bg-[var(--surface-strong)] px-4 py-4">
              <p className="text-sm font-semibold text-[var(--ink)]">{selectedShipping.label}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{selectedShipping.promise}</p>
              <p className="mt-2 text-xs leading-6 text-slate-500">{selectedShipping.detail}</p>
              {promotion ? (
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                  {promotion.code}
                </p>
              ) : null}
            </div>

            <Button asChild className="w-full">
              <LocaleLink href="/checkout" locale={locale}>
                {t("common.proceedToCheckout")}
              </LocaleLink>
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
