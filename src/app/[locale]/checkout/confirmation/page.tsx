import { CircleCheckBig, PackageCheck, Truck } from "lucide-react";

import { ConfirmationExperience } from "@/components/store/confirmation-experience";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { resolveLocale, type SearchParamsPromise } from "@/lib/request";
import { deserialiseSearchValue } from "@/lib/utils";

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParamsPromise;
}) {
  const locale = await resolveLocale(params);
  const query = await searchParams;
  const orderNumber = deserialiseSearchValue(query.order) || "VLR-24816";

  return (
    <div className="container-shell space-y-8 py-10">
      <div className="surface-panel rounded-[40px] px-6 py-10 text-center md:px-10 md:py-14">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700">
            <CircleCheckBig className="h-8 w-8" />
          </div>
          <SectionHeading
            className="mx-auto"
            description={
              locale === "zh-Hant"
                ? `訂單編號 ${orderNumber} 已建立，確認電郵與後續物流更新已寄出。`
                : `Order ${orderNumber} has been placed. Confirmation and tracking updates are on the way.`
            }
            eyebrow={locale === "zh-Hant" ? "訂單完成" : "Order complete"}
            title={locale === "zh-Hant" ? "訂單已確認" : "Order confirmed"}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: PackageCheck,
                title: locale === "zh-Hant" ? "備貨中" : "Preparing",
                copy:
                  locale === "zh-Hant"
                    ? "你的訂單已進入工作室備貨流程。"
                    : "Your order is now moving through the studio fulfillment queue.",
              },
              {
                icon: Truck,
                title: locale === "zh-Hant" ? "物流更新" : "Tracking updates",
                copy:
                  locale === "zh-Hant"
                    ? "出貨後將以電郵持續通知物流狀態。"
                    : "Shipping milestones will be sent to you automatically by email.",
              },
              {
                icon: CircleCheckBig,
                title: locale === "zh-Hant" ? "售後支援" : "Aftercare",
                copy:
                  locale === "zh-Hant"
                    ? "如需更改收件安排，可直接聯絡 Velora 顧問。"
                    : "For delivery changes or gifting requests, client care can assist directly.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[var(--line)] bg-white/70 p-5"
              >
                <item.icon className="mb-4 h-5 w-5 text-[var(--accent)]" />
                <p className="font-display text-2xl">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <LocaleLink href="/account/tracking" locale={locale}>
                {locale === "zh-Hant" ? "查看物流追蹤" : "Track this order"}
              </LocaleLink>
            </Button>
            <Button asChild variant="secondary">
              <LocaleLink href="/account/orders" locale={locale}>
                {locale === "zh-Hant" ? "查看訂單紀錄" : "Open account orders"}
              </LocaleLink>
            </Button>
            <Button asChild variant="secondary">
              <LocaleLink href="/shop" locale={locale}>
                {locale === "zh-Hant" ? "繼續選購" : "Continue shopping"}
              </LocaleLink>
            </Button>
          </div>
        </div>
      </div>

      <ConfirmationExperience locale={locale} orderNumber={orderNumber} />
    </div>
  );
}
