import { CartExperience } from "@/components/store/cart-experience";
import { SectionHeading } from "@/components/shared/section-heading";
import { resolveLocale } from "@/lib/request";

export default async function CartPage({
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
            ? "調整數量、套用優惠碼，並在結帳前確認配送方式。"
            : "Update quantities, apply promotions, and confirm delivery preferences before checkout."
        }
        eyebrow={locale === "zh-Hant" ? "購物袋" : "Shopping bag"}
        title={locale === "zh-Hant" ? "你的購物袋" : "Your bag"}
      />
      <CartExperience />
    </div>
  );
}
