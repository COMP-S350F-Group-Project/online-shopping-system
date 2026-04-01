"use client";

import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { useCommerceStore } from "@/lib/store";
import type { OrderItem } from "@/types";

export function ReorderButton({
  items,
  className,
  variant = "secondary",
}: {
  items: OrderItem[];
  className?: string;
  variant?: "default" | "secondary" | "ghost" | "subtle";
}) {
  const t = useTranslations();
  const addToCart = useCommerceStore((state) => state.addToCart);

  return (
    <Button
      className={className}
      onClick={() => {
        items.forEach((item) => addToCart(item));
        toast.success(t("common.orderAddedToCart"));
      }}
      size="sm"
      type="button"
      variant={variant}
    >
      <RotateCcw className="h-4 w-4" />
      {t("accountPage.buyAgain")}
    </Button>
  );
}
