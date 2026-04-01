"use client";

import { ShoppingBag } from "lucide-react";

import { useLocaleContext, useTranslations } from "@/components/providers/locale-provider";
import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getProductBySlug, getProductPriceForSelection, getSelectionSummary, getPromotionByCode } from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";
import { useCommerceStore } from "@/lib/store";

export function CartDrawer() {
  const { locale } = useLocaleContext();
  const t = useTranslations();
  const cart = useCommerceStore((state) => state.cart);
  const appliedCoupon = useCommerceStore((state) => state.appliedCoupon);

  const subtotal = cart.reduce((total, item) => {
    const product = getProductBySlug(item.productSlug);
    if (!product) {
      return total;
    }
    return total + getProductPriceForSelection(product, item.selections) * item.quantity;
  }, 0);

  const promotion = appliedCoupon ? getPromotionByCode(appliedCoupon) : undefined;
  const discount =
    promotion && subtotal >= promotion.minimumSpend
      ? promotion.discountType === "fixed"
        ? promotion.discountValue
        : Math.round((subtotal * promotion.discountValue) / 100)
      : 0;

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label={t("nav.cart")}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/75 text-[var(--ink)] backdrop-blur transition hover:bg-white"
          type="button"
        >
          <ShoppingBag className="h-4 w-4" />
          {itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--ink)] px-1 text-[10px] font-semibold text-white">
              {itemCount}
            </span>
          ) : null}
        </button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex h-full flex-col gap-6">
          <div className="space-y-2 border-b border-[var(--line)] pb-5 pr-8">
            <SheetTitle>{t("cartPage.title")}</SheetTitle>
            <SheetDescription>{t("cartPage.description")}</SheetDescription>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {cart.map((item) => {
              const product = getProductBySlug(item.productSlug);
              if (!product) {
                return null;
              }

              return (
                <div
                  key={`${item.productSlug}-${JSON.stringify(item.selections)}`}
                  className="rounded-[28px] border border-[var(--line)] bg-white/80 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-[var(--ink)]">{product.name[locale]}</p>
                      <p className="text-sm text-slate-500">
                        {getSelectionSummary(product, item.selections, locale)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {t("common.quantity")}: {item.quantity}
                      </p>
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

          <div className="space-y-4 rounded-[28px] bg-[var(--surface-strong)] p-5">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>{t("common.subtotal")}</span>
              <span>{formatCurrency(subtotal, locale)}</span>
            </div>
            {discount > 0 ? (
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{t("common.discount")}</span>
                <span>-{formatCurrency(discount, locale)}</span>
              </div>
            ) : null}
            <div className="flex items-center justify-between text-base font-semibold text-[var(--ink)]">
              <span>{t("common.total")}</span>
              <span>{formatCurrency(subtotal - discount, locale)}</span>
            </div>
            <div className="grid gap-3">
              <Button asChild className="w-full">
                <LocaleLink href="/checkout" locale={locale}>
                  {t("common.proceedToCheckout")}
                </LocaleLink>
              </Button>
              <Button asChild className="w-full" variant="secondary">
                <LocaleLink href="/cart" locale={locale}>
                  {t("nav.cart")}
                </LocaleLink>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
