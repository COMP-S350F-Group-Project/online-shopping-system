import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { resolveLocale } from "@/lib/request";
import { supportArticles, supportChannels } from "@/lib/site";

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  const serviceStandards = [
    {
      value: locale === "zh-Hant" ? "1 個工作天內" : "Within one business day",
      label: locale === "zh-Hant" ? "電郵與諮詢回覆目標" : "Email response target",
    },
    {
      value: locale === "zh-Hant" ? "10:00 - 19:00" : "10:00 - 19:00",
      label: locale === "zh-Hant" ? "優先專線服務時段" : "Priority line coverage",
    },
    {
      value: locale === "zh-Hant" ? "當日可預約" : "Same-day by appointment",
      label: locale === "zh-Hant" ? "工作室取貨與體驗安排" : "Studio pickup and consultations",
    },
  ];

  const quickPaths = [
    {
      title: locale === "zh-Hant" ? "追蹤訂單" : "Track an order",
      body:
        locale === "zh-Hant"
          ? "查看物流節點、預計送達時間與收件資訊。"
          : "View delivery milestones, expected arrival windows, and recipient details.",
      href: "/account/tracking",
    },
    {
      title: locale === "zh-Hant" ? "安排退換貨" : "Start a return or exchange",
      body:
        locale === "zh-Hant"
          ? "針對尺寸、顏色或商品狀態提供直接協助。"
          : "Get direct support for size changes, colour swaps, or return requests.",
      href: "/contact",
    },
    {
      title: locale === "zh-Hant" ? "預約顧問服務" : "Book client care",
      body:
        locale === "zh-Hant"
          ? "取得送禮建議、搭配推薦或到店諮詢安排。"
          : "Ask for gifting advice, product pairing guidance, or a studio appointment.",
      href: "/contact",
    },
  ];

  const categoryLabels: Record<string, string> = {
    shipping: locale === "zh-Hant" ? "配送" : "Shipping",
    returns: locale === "zh-Hant" ? "退換貨" : "Returns",
    care: locale === "zh-Hant" ? "保養" : "Care",
  };

  return (
    <div className="container-shell space-y-8 py-10">
      <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10 md:py-14">
        <p className="eyebrow">{locale === "zh-Hant" ? "支援中心" : "Support centre"}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] md:text-7xl">
          {locale === "zh-Hant"
            ? "訂單、保養與設定支援，都應該像選購一樣流暢。"
            : "Orders, care, and setup support should feel as polished as the purchase itself."}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {locale === "zh-Hant"
            ? "透過追蹤、顧問服務與常見問題整理，在最短路徑內找到你需要的答案。"
            : "Move quickly from tracking and care guidance to direct client service, without searching through noise."}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="subtle">
            <LocaleLink href="/account/tracking" locale={locale}>
              {locale === "zh-Hant" ? "查看物流追蹤" : "Track an order"}
            </LocaleLink>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <LocaleLink href="/contact" locale={locale}>
              {locale === "zh-Hant" ? "聯絡客戶服務" : "Contact client care"}
            </LocaleLink>
          </Button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {quickPaths.map((path) => (
          <LocaleLink
            key={path.title}
            className="surface-panel rounded-[32px] p-6 transition hover:-translate-y-1"
            href={path.href}
            locale={locale}
          >
            <p className="eyebrow">{locale === "zh-Hant" ? "快速入口" : "Quick path"}</p>
            <p className="mt-4 font-display text-3xl leading-tight">{path.title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{path.body}</p>
            <p className="mt-6 text-sm font-semibold text-[var(--accent)]">
              {locale === "zh-Hant" ? "立即前往" : "Open now"}
            </p>
          </LocaleLink>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-5">
          <section className="surface-panel rounded-[32px] p-6">
            <h2 className="font-display text-3xl">
              {locale === "zh-Hant" ? "直接服務管道" : "Direct service channels"}
            </h2>
            <div className="mt-6 space-y-4">
              {supportChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
                >
                  <p className="font-semibold text-[var(--ink)]">{channel.title[locale]}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {channel.description[locale]}
                  </p>
                  <p className="mt-3 text-sm font-medium text-[var(--ink)]">{channel.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-panel rounded-[32px] p-6">
            <p className="eyebrow">{locale === "zh-Hant" ? "服務標準" : "Service standards"}</p>
            <div className="mt-5 grid gap-4">
              {serviceStandards.map((standard) => (
                <div
                  key={standard.label}
                  className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
                >
                  <p className="font-display text-3xl">{standard.value}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{standard.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="space-y-6">
          <SectionHeading
            eyebrow={locale === "zh-Hant" ? "常見問題" : "Most requested answers"}
            title={
              locale === "zh-Hant"
                ? "把最常被詢問的事情整理得更快找到。"
                : "The questions clients ask most, organized for quick answers."
            }
            description={
              locale === "zh-Hant"
                ? "涵蓋配送、退換貨與日常保養，讓你先看到清楚答案，再決定是否需要直接聯絡。"
                : "Covering shipping, returns, and everyday care, so you can see the clearest answer before reaching out."
            }
          />

          <Accordion className="space-y-3" collapsible type="single">
            {supportArticles.map((article) => (
              <AccordionItem key={article.id} value={article.id}>
                <AccordionTrigger>
                  <div className="space-y-2 pr-6">
                    <p className="eyebrow">{categoryLabels[article.category] ?? article.category}</p>
                    <p className="text-base font-semibold text-[var(--ink)]">{article.title[locale]}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{article.excerpt[locale]}</p>
                  <p className="mt-4">{article.body[locale]}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </section>
    </div>
  );
}
