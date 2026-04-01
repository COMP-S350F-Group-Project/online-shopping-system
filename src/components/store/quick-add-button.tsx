"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/providers/locale-provider";
import { useCommerceStore } from "@/lib/store";
import type { Product } from "@/types";

export function QuickAddButton({ product }: { product: Product }) {
  const t = useTranslations();
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
        toast.success(t("common.addedToCart"));
      }}
    >
      <ShoppingBag className="h-4 w-4" />
      {t("common.add")}
    </Button>
  );
}
