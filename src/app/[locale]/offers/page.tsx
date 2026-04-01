import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { getProductBySlug, promotions } from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";
import { resolveLocale } from "@/lib/request";
import { isDefined } from "@/lib/utils";

const promotionProductMap: Record<string, string[]> = {
  FIRSTLIGHT: ["arc-one-headphones", "halo-mini-speaker", "frame-s-display"],
  STUDIOSET: ["lumen-desk-light", "loom-wireless-keyboard", "aether-air-monitor"],
  TRAVELREADY: ["meridian-weekender", "orbit-gan-charger", "forma-sling"],
};

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  const privilegedProducts = Array.from(
    new Set(promotions.flatMap((promotion) => promotionProductMap[promotion.code] ?? [])),
  )
    .map((slug) => getProductBySlug(slug))
    .filter(isDefined);

  const memberPrivileges = [
    {
      title: locale === "zh-Hant" ? "滿額免運與快遞升級" : "Complimentary delivery and express upgrades",
      body:
        locale === "zh-Hant"
          ? "依訂單內容與地區，於結帳時自動套用最合適的配送禮遇。"
          : "The most appropriate shipping benefit is applied automatically at checkout based on basket and destination.",
    },
    {
      title: locale === "zh-Hant" ? "成套選購與送禮禮遇" : "Set-building and gifting privileges",
      body:
        locale === "zh-Hant"
          ? "當商品之間具備高搭配性時，優惠會圍繞完整場景而非單件折扣。"
          : "When products work naturally together, the offer is designed around the complete use case, not just a single line item.",
    },
    {
      title: locale === "zh-Hant" ? "工作室取貨與專屬顧問" : "Studio pickup and concierge support",
      body:
        locale === "zh-Hant"
          ? "針對高價值訂單與重要送禮需求，可安排更細緻的取貨與交付節奏。"
          : "Higher-value purchases and important gifts can be matched with more deliberate pickup and handoff support.",
    },
  ];

  const offerContext: Record<
    string,
    { audience: string; note: string; valueLabel: string }
  > = {
    FIRSTLIGHT: {
      audience:
        locale === "zh-Hant" ? "適合首次建立 Velora 配置" : "For first-time Velora purchases",
      note:
        locale === "zh-Hant"
          ? "最適合以一件主力商品搭配一至兩件配件完成首購。"
          : "Best used when anchoring the first order around one hero product and one or two companions.",
      valueLabel:
        locale === "zh-Hant" ? "首筆訂單 9 折" : "10% off first order",
    },
    STUDIOSET: {
      audience:
        locale === "zh-Hant" ? "適合桌面與居家場景升級" : "For workspace and home upgrades",
      note:
        locale === "zh-Hant"
          ? "桌燈、鍵盤與智慧生活產品一起購入時最具價值。"
          : "Most effective when desk lighting, keyboards, and smart-living objects are purchased together.",
      valueLabel:
        locale === "zh-Hant"
          ? `現折 ${formatCurrency(300, locale)}`
          : `${formatCurrency(300, locale)} off`,
    },
    TRAVELREADY: {
      audience:
        locale === "zh-Hant" ? "適合旅行與送禮型訂單" : "For travel-led and gifting orders",
      note:
        locale === "zh-Hant"
          ? "購物袋越完整，越能發揮配送升級與附加禮遇價值。"
          : "The fuller the travel basket, the more value comes through in the delivery upgrade and included accessories.",
      valueLabel:
        locale === "zh-Hant" ? "含快遞升級" : "Express included",
    },
  };

  return (
    <div className="container-shell space-y-8 py-10">
      <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10 md:py-14">
        <p className="eyebrow">{locale === "zh-Hant" ? "優惠活動" : "Offers"}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] md:text-7xl">
          {locale === "zh-Hant"
            ? "讓升級、送禮與成套選購更划算，但仍保持品牌體驗的精準感。"
            : "Privileges designed to make upgrading, gifting, and building a set feel more rewarding without diluting the brand."}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {locale === "zh-Hant"
            ? "Velora 的禮遇圍繞完整購買場景而設計，並在結帳前清楚呈現使用門檻與適用方式。"
            : "Velora privileges are designed around complete purchase moments, with clear thresholds and clean application before checkout."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="subtle">
            <LocaleLink href="/shop" locale={locale}>
              {locale === "zh-Hant" ? "開始選購" : "Start shopping"}
            </LocaleLink>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <LocaleLink href="/contact" locale={locale}>
              {locale === "zh-Hant" ? "詢問送禮建議" : "Ask for gifting advice"}
            </LocaleLink>
          </Button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {promotions.map((promotion) => {
          const context = offerContext[promotion.code];

          return (
            <div
              key={promotion.code}
              className="surface-panel rounded-[32px] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">{promotion.badge[locale]}</p>
                  <h2 className="mt-3 font-display text-3xl leading-tight">
                    {promotion.title[locale]}
                  </h2>
                </div>
                <div className="rounded-[20px] bg-[var(--accent-soft)] px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    {locale === "zh-Hant" ? "禮遇內容" : "Privilege"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                    {context.valueLabel}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {promotion.description[locale]}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{context.note}</p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-[24px] border border-[var(--line)] bg-white/70 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    {locale === "zh-Hant" ? "適用情境" : "Best for"}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--ink)]">
                    {context.audience}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[var(--line)] bg-white/70 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    {locale === "zh-Hant" ? "最低消費" : "Minimum spend"}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--ink)]">
                    {formatCurrency(promotion.minimumSpend, locale)}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[var(--line)] bg-white/70 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    {locale === "zh-Hant" ? "優惠碼" : "Code"}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[var(--ink)]">
                    {promotion.code}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.96fr_1.04fr]">
        <div className="surface-panel rounded-[40px] p-6 md:p-8">
          <SectionHeading
            className="max-w-none"
            eyebrow={locale === "zh-Hant" ? "禮遇原則" : "How privileges are designed"}
            title={
              locale === "zh-Hant"
                ? "每一項優惠都服務於更完整的購買體驗，而不是單純壓低價格。"
                : "Every privilege is built to improve the purchase experience, not simply reduce the number at checkout."
            }
          />
          <div className="mt-8 grid gap-4">
            {memberPrivileges.map((privilege) => (
              <div
                key={privilege.title}
                className="rounded-[28px] border border-[var(--line)] bg-white/70 p-5"
              >
                <p className="font-display text-2xl leading-tight">{privilege.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{privilege.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel rounded-[40px] p-6 md:p-8">
          <p className="eyebrow">{locale === "zh-Hant" ? "使用方式" : "How offers apply"}</p>
          <div className="mt-6 space-y-4">
            {[
              locale === "zh-Hant"
                ? "優惠可在加入購物袋後於結帳前檢視門檻是否符合。"
                : "Eligibility is visible in the bag and before payment is completed.",
              locale === "zh-Hant"
                ? "同一張訂單僅套用最合適的一項主要禮遇，以維持結帳清晰。"
                : "Only the most appropriate primary privilege is applied per order to keep checkout clear.",
              locale === "zh-Hant"
                ? "如需大量送禮、企業採購或特殊交付安排，可直接聯絡顧問協助。"
                : "For larger gifting, corporate orders, or special handoff arrangements, client care can assist directly.",
            ].map((line) => (
              <div
                key={line}
                className="rounded-[24px] border border-[var(--line)] bg-white/70 px-5 py-4 text-sm leading-7 text-slate-600"
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow={locale === "zh-Hant" ? "推薦搭配" : "Best paired with current privileges"}
          title={
            locale === "zh-Hant"
              ? "這些商品最能體現目前禮遇的價值。"
              : "Products that make the current privileges work hardest."
          }
          description={
            locale === "zh-Hant"
              ? "從主力商品到高搭配度配件，挑選最適合用來組成完整購物袋的作品。"
              : "From hero products to high-fit companions, these pieces are the strongest starting points for a complete basket."
          }
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {privilegedProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} locale={locale} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
