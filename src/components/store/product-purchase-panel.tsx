"use client";

import { useMemo, useState, useTransition } from "react";
import { Check, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { getProductPriceForSelection, getVariantOption } from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";
import { useCommerceStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types";

export function ProductPurchasePanel({
  locale,
  product,
}: {
  locale: Locale;
  product: Product;
}) {
  const t = useTranslations();
  const router = useRouter();
  const addToCart = useCommerceStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [selections, setSelections] = useState(product.defaultVariantSelection);

  const price = useMemo(
    () => getProductPriceForSelection(product, selections),
    [product, selections],
  );

  const stockMessage =
    product.stockState === "low"
      ? t("common.lowStock", { count: product.stockCount })
      : product.stockState === "preorder"
        ? t("common.preorder")
        : t("common.inStock");

  return (
    <div className="space-y-8 rounded-[36px] border border-[var(--line)] bg-white/75 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.06)] backdrop-blur md:p-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="eyebrow">{product.category.replace("-", " ")}</p>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">
            {product.name[locale]}
          </h1>
          <p className="text-base leading-7 text-slate-600">
            {product.description[locale]}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-2xl font-semibold text-[var(--ink)]">
            {formatCurrency(price, locale)}
          </p>
          {product.compareAtPrice ? (
            <p className="text-base text-slate-400 line-through">
              {formatCurrency(product.compareAtPrice, locale)}
            </p>
          ) : null}
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-medium text-[var(--ink)]">
            <Check className="h-4 w-4" />
            {stockMessage}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {product.variants.map((group) => (
          <div key={group.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--ink)]">
                {t("product.variant", { name: group.name[locale] })}
              </p>
              <p className="text-sm text-slate-500">
                {getVariantOption(product, group.id, selections[group.id])?.label[locale]}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const isActive = selections[group.id] === option.id;
                return (
                  <button
                    key={option.id}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
                      isActive
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]"
                        : "border-[var(--line)] bg-white/70 text-slate-700 hover:bg-white",
                    )}
                    onClick={() =>
                      setSelections((current) => ({
                        ...current,
                        [group.id]: option.id,
                      }))
                    }
                    type="button"
                  >
                    {group.display === "swatch" && option.hex ? (
                      <span
                        className="h-3 w-3 rounded-full border border-black/10"
                        style={{ backgroundColor: option.hex }}
                      />
                    ) : null}
                    {option.label[locale]}
                    {option.surcharge ? (
                      <span className="text-xs text-slate-500">
                        +{formatCurrency(option.surcharge, locale)}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--ink)]">{t("common.quantity")}</p>
          <div className="inline-flex items-center gap-4 rounded-full border border-[var(--line)] bg-white/80 px-4 py-2">
            <button
              className="rounded-full p-1 text-slate-500 hover:bg-black/5"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              type="button"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-6 text-center font-medium">{quantity}</span>
            <button
              className="rounded-full p-1 text-slate-500 hover:bg-black/5"
              onClick={() => setQuantity((value) => value + 1)}
              type="button"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Button
            className="w-full"
            onClick={() => {
              addToCart({
                productSlug: product.slug,
                quantity,
                selections,
              });
              toast.success(t("common.addedToCart"));
            }}
          >
            {t("common.addToCart")}
          </Button>
          <Button
            className="w-full"
            disabled={isPending}
            variant="secondary"
            onClick={() => {
              addToCart({
                productSlug: product.slug,
                quantity,
                selections,
              });
              startTransition(() => {
                router.push(`/${locale}/checkout`);
              });
            }}
          >
            {t("common.buyNow")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 rounded-[28px] bg-[var(--surface-strong)] p-5 text-sm text-slate-600">
        <div className="flex items-start gap-3">
          <Truck className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
          <p>{product.shipping.delivery[locale]}</p>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
          <p>{product.shipping.returns[locale]}</p>
        </div>
      </div>
    </div>
  );
}
