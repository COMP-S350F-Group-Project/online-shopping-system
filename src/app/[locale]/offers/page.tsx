import { promotions } from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";
import { resolveLocale } from "@/lib/request";

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  return (
    <div className="container-shell space-y-8 py-10">
      <div>
        <p className="eyebrow">{locale === "zh-Hant" ? "優惠活動" : "Offers"}</p>
        <h1 className="mt-3 font-display text-5xl leading-[0.95]">
          {locale === "zh-Hant" ? "讓升級、送禮與成套選購更划算。" : "Privileges for gifting, upgrading, and building a set."}
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {promotions.map((promotion) => (
          <div
            key={promotion.code}
            className="surface-panel rounded-[32px] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.04)]"
          >
            <p className="eyebrow">{promotion.badge[locale]}</p>
            <h2 className="mt-3 font-display text-3xl">{promotion.title[locale]}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {promotion.description[locale]}
            </p>
            <div className="mt-6 rounded-[24px] border border-[var(--line)] bg-white/70 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                {locale === "zh-Hant" ? "優惠碼" : "Code"}
              </p>
              <p className="mt-2 text-xl font-semibold text-[var(--ink)]">{promotion.code}</p>
              <p className="mt-3 text-sm text-slate-500">
                {locale === "zh-Hant"
                  ? `最低消費 ${formatCurrency(promotion.minimumSpend, locale)}`
                  : `Minimum spend ${formatCurrency(promotion.minimumSpend, locale)}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
