"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug, getProductBySlug } from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";
import { useCommerceStore } from "@/lib/store";
import type { Locale } from "@/types";

export function WishlistExperience({
  locale,
  emptyTitle,
  emptyCopy,
  addLabel,
  removeLabel,
}: {
  locale: Locale;
  emptyTitle: string;
  emptyCopy: string;
  addLabel: string;
  removeLabel: string;
}) {
  const wishlist = useCommerceStore((state) => state.wishlist);
  const toggleWishlist = useCommerceStore((state) => state.toggleWishlist);
  const moveWishlistToCart = useCommerceStore((state) => state.moveWishlistToCart);

  if (wishlist.length === 0) {
    return (
      <EmptyState
        description={emptyCopy}
        locale={locale}
        primaryHref="/shop"
        primaryLabel={locale === "zh-Hant" ? "前往選購" : "Browse the collection"}
        secondaryHref="/"
        secondaryLabel={locale === "zh-Hant" ? "返回首頁" : "Return home"}
        title={emptyTitle}
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {wishlist.map((slug) => {
        const product = getProductBySlug(slug);
        if (!product) {
          return null;
        }
        const category = getCategoryBySlug(product.category);

        return (
          <div
            key={slug}
            className="rounded-[32px] border border-[var(--line)] bg-white/75 p-5 shadow-[0_16px_60px_rgba(15,23,42,0.04)] backdrop-blur"
          >
            <div className="space-y-3">
              <p className="eyebrow">{category?.name[locale]}</p>
              <h2 className="font-display text-3xl leading-tight">
                {product.name[locale]}
              </h2>
              <p className="text-sm leading-7 text-slate-600">
                {product.shortDescription[locale]}
              </p>
              <p className="text-lg font-semibold text-[var(--ink)]">
                {formatCurrency(product.price, locale)}
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              <Button
                onClick={() =>
                  moveWishlistToCart(product.slug, product.defaultVariantSelection)
                }
              >
                {addLabel}
              </Button>
              <Button onClick={() => toggleWishlist(product.slug)} variant="secondary">
                {removeLabel}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
