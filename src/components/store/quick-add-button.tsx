"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useLocaleContext } from "@/components/providers/locale-provider";
import { useCommerceStore } from "@/lib/store";
import type { Product } from "@/types";

export function QuickAddButton({ product }: { product: Product }) {
  const { locale } = useLocaleContext();
  const addToCart = useCommerceStore((state) => state.addToCart);

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() => {
        addToCart({
          productSlug: product.slug,
          quantity: 1,
          selections: product.defaultVariantSelection,
        });
        toast.success(locale === "zh-Hant" ? "已加入購物袋" : "Added to bag");
      }}
    >
      <ShoppingBag className="h-4 w-4" />
      {locale === "zh-Hant" ? "加入" : "Add"}
    </Button>
  );
}
