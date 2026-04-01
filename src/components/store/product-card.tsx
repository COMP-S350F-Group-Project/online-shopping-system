import { getCategoryBySlug, getProductPriceForSelection } from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";
import { getDiscountPercentage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { LocaleLink } from "@/components/shared/locale-link";
import { ProductVisual } from "@/components/store/product-visual";
import { QuickAddButton } from "@/components/store/quick-add-button";
import { WishlistButton } from "@/components/store/wishlist-button";
import { RatingStars } from "@/components/shared/rating-stars";
import type { Locale, Product } from "@/types";

export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const category = getCategoryBySlug(product.category);
  const price = getProductPriceForSelection(product, product.defaultVariantSelection);
  const discount = getDiscountPercentage(price, product.compareAtPrice);
  const primaryVisual = product.visuals[0];

  return (
    <article className="group rounded-[32px] border border-[var(--line)] bg-white/75 p-4 shadow-[0_16px_60px_rgba(15,23,42,0.05)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
      <div className="relative">
        <LocaleLink locale={locale} href={`/products/${product.slug}`}>
          <ProductVisual className="aspect-[4/4.8]" visual={primaryVisual} />
        </LocaleLink>
        <WishlistButton className="absolute right-3 top-3" productSlug={product.slug} />
      </div>

      <div className="space-y-4 px-2 pb-2 pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {category?.name[locale]}
          </p>
          {discount > 0 ? <Badge variant="outline">-{discount}%</Badge> : null}
        </div>

        <div className="space-y-2">
          <LocaleLink
            className="block font-display text-2xl leading-tight"
            href={`/products/${product.slug}`}
            locale={locale}
          >
            {product.name[locale]}
          </LocaleLink>
          <p className="text-sm leading-7 text-slate-600">
            {product.shortDescription[locale]}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <RatingStars value={Math.round(product.rating)} />
          <span>{product.rating.toFixed(1)}</span>
          <span>{product.reviewCount}</span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-[var(--ink)]">
              {formatCurrency(price, locale)}
            </p>
            {product.compareAtPrice ? (
              <p className="text-sm text-slate-400 line-through">
                {formatCurrency(product.compareAtPrice, locale)}
              </p>
            ) : null}
          </div>
          <QuickAddButton product={product} />
        </div>
      </div>
    </article>
  );
}
