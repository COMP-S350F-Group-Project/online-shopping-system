"use client";

import { useState } from "react";

import { ProductVisual } from "@/components/store/product-visual";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types";

export function ProductGallery({
  locale,
  product,
}: {
  locale: Locale;
  product: Product;
}) {
  const [active, setActive] = useState(product.visuals[0].id);
  const visual = product.visuals.find((item) => item.id === active) ?? product.visuals[0];

  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-[36px] border border-[var(--line)] bg-white/70 p-4 backdrop-blur">
        <ProductVisual
          className="aspect-[4/4.6] transition duration-500 group-hover:scale-[1.01]"
          locale={locale}
          visual={visual}
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {product.visuals.map((item) => (
          <button
            key={item.id}
            className={cn(
              "rounded-[24px] border border-[var(--line)] bg-white/70 p-2 transition",
              item.id === active && "border-[var(--accent)] shadow-[0_10px_40px_rgba(178,132,76,0.16)]",
            )}
            onClick={() => setActive(item.id)}
            type="button"
          >
            <ProductVisual
              className="aspect-square rounded-[18px]"
              locale={locale}
              visual={item}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
