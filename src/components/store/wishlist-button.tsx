"use client";

import { Heart } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { useCommerceStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function WishlistButton({
  productSlug,
  className,
}: {
  productSlug: string;
  className?: string;
}) {
  const t = useTranslations();
  const wishlist = useCommerceStore((state) => state.wishlist);
  const toggleWishlist = useCommerceStore((state) => state.toggleWishlist);
  const isSaved = wishlist.includes(productSlug);

  return (
    <button
      aria-label={
        isSaved ? t("common.removeFromWishlist") : t("common.addToWishlist")
      }
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/75 text-slate-600 backdrop-blur transition hover:bg-white",
        className,
      )}
      onClick={() => toggleWishlist(productSlug)}
      type="button"
    >
      <Heart className={cn("h-4 w-4", isSaved && "fill-current text-rose-500")} />
    </button>
  );
}
