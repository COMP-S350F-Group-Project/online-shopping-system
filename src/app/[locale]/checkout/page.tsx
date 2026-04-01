import { CheckoutExperience } from "@/components/store/checkout-experience";
import { SectionHeading } from "@/components/shared/section-heading";
import { resolveLocale } from "@/lib/request";

export default async function CheckoutPage({
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
            ? "以簡潔而可信的流程完成配送、付款與訂單確認。"
            : "Complete delivery, payment, and review in a streamlined checkout flow."
        }
        eyebrow={locale === "zh-Hant" ? "結帳流程" : "Checkout"}
        title={locale === "zh-Hant" ? "安全結帳" : "Secure checkout"}
      />
      <CheckoutExperience locale={locale} />
    </div>
  );
}
