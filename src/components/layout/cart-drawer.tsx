"use client";

import { useMemo } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useLocaleContext, useTranslations } from "@/components/providers/locale-provider";
import { LocaleLink } from "@/components/shared/locale-link";
import { QuickAddButton } from "@/components/store/quick-add-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  categories,
  getCategoryBySlug,
  getProductBySlug,
  getProductPriceForSelection,
  getPromotionByCode,
  getSelectionSummary,
  products,
} from "@/lib/catalog";
import { calculateOrderSummary, getShippingOptionContent } from "@/lib/commerce";
import { formatCurrency } from "@/lib/format";
import { collections } from "@/lib/site";
import { useCommerceStore } from "@/lib/store";

export function CartDrawer() {
  const { locale } = useLocaleContext();
  const t = useTranslations();
  const cart = useCommerceStore((state) => state.cart);
  const wishlist = useCommerceStore((state) => state.wishlist);
  const appliedCoupon = useCommerceStore((state) => state.appliedCoupon);
  const shippingMethod = useCommerceStore((state) => state.shippingMethod);
  const updateQuantity = useCommerceStore((state) => state.updateQuantity);
  const removeFromCart = useCommerceStore((state) => state.removeFromCart);
  const moveToWishlist = useCommerceStore((state) => state.moveToWishlist);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const summary = useMemo(
    () => calculateOrderSummary(cart, appliedCoupon, shippingMethod),
    [appliedCoupon, cart, shippingMethod],
  );
  const selectedShipping = getShippingOptionContent(shippingMethod, locale);
  const promotion = appliedCoupon ? getPromotionByCode(appliedCoupon) : undefined;

  const recommendedProducts = useMemo(() => {
    const inCart = new Set(cart.map((item) => item.productSlug));
    const saved = new Set<string>();
    const candidateSlugs: string[] = [];

    for (const item of cart) {
      const product = getProductBySlug(item.productSlug);
      if (!product) {
        continue;
      }

      for (const slug of [...product.boughtTogetherSlugs, ...product.relatedSlugs]) {
        if (inCart.has(slug) || saved.has(slug)) {
          continue;
        }
        saved.add(slug);
        candidateSlugs.push(slug);
      }
    }

    for (const product of products) {
      if (candidateSlugs.length >= 2) {
        break;
      }

      if (inCart.has(product.slug) || saved.has(product.slug)) {
        continue;
      }

      saved.add(product.slug);
      candidateSlugs.push(product.slug);
    }

    return candidateSlugs
      .map((slug) => getProductBySlug(slug))
      .filter((product): product is NonNullable<typeof product> => Boolean(product))
      .slice(0, 2);
  }, [cart]);

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
      <SheetContent className="overflow-y-auto">
        <div className="flex h-full flex-col gap-6">
          <div className="space-y-2 border-b border-[var(--line)] pb-5 pr-8">
            <SheetTitle>{t("cartPage.title")}</SheetTitle>
            <SheetDescription>{t("cartPage.description")}</SheetDescription>
          </div>

          {cart.length === 0 ? (
            <div className="space-y-5">
              <div className="rounded-[28px] border border-[var(--line)] bg-white/80 p-6">
                <p className="eyebrow">{t("cartPage.emptyDrawerEyebrow")}</p>
                <h3 className="mt-3 font-display text-3xl leading-tight">
                  {t("cartPage.emptyTitle")}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t("cartPage.emptyCopy")}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Button asChild>
                    <LocaleLink href="/shop" locale={locale}>
                      {t("common.continueShopping")}
                    </LocaleLink>
                  </Button>
                  <Button asChild variant="secondary">
                    <LocaleLink
                      href={`/search?collection=${collections[0].slug}`}
                      locale={locale}
                    >
                      {collections[0].name[locale]}
                    </LocaleLink>
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {categories.slice(0, 4).map((category) => (
                  <LocaleLink
                    key={category.slug}
                    className="rounded-[24px] border border-[var(--line)] bg-white/75 px-4 py-4 transition hover:bg-white"
                    href={`/categories/${category.slug}`}
                    locale={locale}
                  >
                    <p className="text-sm font-semibold text-[var(--ink)]">{category.name[locale]}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {category.description[locale]}
                    </p>
                  </LocaleLink>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-[30px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(243,238,227,0.92))] p-5">
                <p className="eyebrow">{t("cartPage.drawerEyebrow")}</p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl text-[var(--ink)]">
                      {formatCurrency(summary.total, locale)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {selectedShipping.promise}
                    </p>
                  </div>
                  <div className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-2 text-xs font-semibold text-[var(--ink)]">
                    {t("cartPage.drawerItemCount", { count: itemCount })}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const product = getProductBySlug(item.productSlug);
                  if (!product) {
                    return null;
                  }

                  const category = getCategoryBySlug(product.category);

                  return (
                    <div
                      key={`${item.productSlug}-${JSON.stringify(item.selections)}`}
                      className="rounded-[28px] border border-[var(--line)] bg-white/80 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                              {category?.name[locale]}
                            </p>
                            <p className="font-semibold text-[var(--ink)]">{product.name[locale]}</p>
                            <p className="text-sm text-slate-500">
                              {getSelectionSummary(product, item.selections, locale)}
                            </p>
                          </div>
                          <div className="inline-flex items-center gap-4 rounded-full border border-[var(--line)] bg-white/80 px-4 py-2">
                            <button
                              aria-label={t("cartPage.decreaseQuantity", {
                                product: product.name[locale],
                              })}
                              className="rounded-full p-1 text-slate-500 hover:bg-black/5"
                              onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                              type="button"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-5 text-center font-medium">{item.quantity}</span>
                            <button
                              aria-label={t("cartPage.increaseQuantity", {
                                product: product.name[locale],
                              })}
                              className="rounded-full p-1 text-slate-500 hover:bg-black/5"
                              onClick={() => updateQuantity(item, item.quantity + 1)}
                              type="button"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                            <button
                              className="font-medium text-slate-500 transition hover:text-[var(--ink)]"
                              onClick={() => {
                                moveToWishlist(item);
                                toast.success(t("cartPage.savedForLaterToast"));
                              }}
                              type="button"
                            >
                              {wishlist.includes(item.productSlug)
                                ? t("nav.wishlist")
                                : t("common.saveForLater")}
                            </button>
                            <button
                              className="inline-flex items-center gap-1 font-medium text-slate-500 transition hover:text-[var(--ink)]"
                              onClick={() => {
                                removeFromCart(item);
                                toast.success(t("cartPage.removedToast"));
                              }}
                              type="button"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              {t("common.remove")}
                            </button>
                          </div>
                        </div>
                        <p className="text-lg font-semibold text-[var(--ink)]">
                          {formatCurrency(
                            getProductPriceForSelection(product, item.selections) * item.quantity,
                            locale,
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {recommendedProducts.length > 0 ? (
                  <section className="rounded-[28px] border border-[var(--line)] bg-white/80 p-5">
                    <div className="space-y-2">
                      <p className="eyebrow">{t("cartPage.recommendedTitle")}</p>
                      <p className="text-sm leading-7 text-slate-600">
                        {t("cartPage.recommendedCopy")}
                      </p>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {recommendedProducts.map((product) => (
                        <div
                          key={product.slug}
                          className="rounded-[22px] border border-[var(--line)] bg-[var(--surface-strong)] p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                              <p className="font-semibold text-[var(--ink)]">{product.name[locale]}</p>
                              <p className="text-sm leading-6 text-slate-600">
                                {product.shortDescription[locale]}
                              </p>
                              <p className="text-sm font-semibold text-[var(--ink)]">
                                {formatCurrency(
                                  getProductPriceForSelection(
                                    product,
                                    product.defaultVariantSelection,
                                  ),
                                  locale,
                                )}
                              </p>
                            </div>
                            <QuickAddButton product={product} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>

              <div className="space-y-4 rounded-[28px] bg-[var(--surface-strong)] p-5">
                <div className="space-y-2 text-sm text-slate-600">
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
                    <span>
                      {summary.shipping ? formatCurrency(summary.shipping, locale) : t("common.free")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t("common.tax")}</span>
                    <span>{formatCurrency(summary.tax, locale)}</span>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[var(--line)] bg-white/80 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--ink)]">{selectedShipping.label}</p>
                    <p className="text-sm text-slate-500">
                      {selectedShipping.fee
                        ? formatCurrency(selectedShipping.fee, locale)
                        : t("common.free")}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{selectedShipping.promise}</p>
                  <p className="mt-2 text-xs leading-6 text-slate-500">{selectedShipping.detail}</p>
                  {promotion ? (
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                      {promotion.code}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                  {[t("common.complimentaryShipping"), t("common.returns"), t("common.concierge")].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-[20px] border border-[var(--line)] bg-white/70 px-3 py-3 text-xs font-medium leading-5 text-slate-600"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-[var(--line)] pt-4 text-base font-semibold text-[var(--ink)]">
                  <span>{t("common.total")}</span>
                  <span>{formatCurrency(summary.total, locale)}</span>
                </div>

                <div className="grid gap-3">
                  <Button asChild className="w-full">
                    <LocaleLink href="/checkout" locale={locale}>
                      {t("common.proceedToCheckout")}
                    </LocaleLink>
                  </Button>
                  <Button asChild className="w-full" variant="secondary">
                    <LocaleLink href="/cart" locale={locale}>
                      {t("cartPage.editBag")}
                    </LocaleLink>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
