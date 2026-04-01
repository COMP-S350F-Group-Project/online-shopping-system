import { SectionHeading } from "@/components/shared/section-heading";
import { WishlistExperience } from "@/components/store/wishlist-experience";
import { resolveLocale } from "@/lib/request";

export default async function WishlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  return (
    <div className="container-shell space-y-8 py-10">
      <SectionHeading
        description={
          locale === "zh-Hant"
            ? "把喜歡的商品留在同一個地方，方便比較、送禮與下一次購入。"
            : "Keep favourite products together for comparing, gifting, or returning later."
        }
        eyebrow={locale === "zh-Hant" ? "收藏" : "Wishlist"}
        title={locale === "zh-Hant" ? "收藏清單" : "Saved products"}
      />
      <WishlistExperience
        addLabel={locale === "zh-Hant" ? "加入購物袋" : "Add to bag"}
        emptyCopy={
          locale === "zh-Hant"
            ? "從 Velora 最受歡迎的商品開始建立你的專屬清單。"
            : "Start building your shortlist with Velora’s most loved products."
        }
        emptyTitle={locale === "zh-Hant" ? "尚未收藏任何商品" : "Nothing saved yet"}
        locale={locale}
        removeLabel={locale === "zh-Hant" ? "移除收藏" : "Remove"}
      />
    </div>
  );
}
