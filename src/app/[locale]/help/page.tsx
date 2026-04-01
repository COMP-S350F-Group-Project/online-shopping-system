import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getMessages } from "@/lib/i18n";
import { resolveLocale } from "@/lib/request";
import { helpQuickPaths, helpServiceStandards, supportArticles, supportChannels } from "@/lib/site";

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const messages = getMessages(locale);

  const categoryLabels: Record<string, string> = {
    shipping: messages.helpPage.shippingLabel,
    returns: messages.helpPage.returnsLabel,
    care: messages.helpPage.careLabel,
  };

  return (
    <div className="container-shell space-y-8 py-10">
      <section className="surface-panel rounded-[40px] px-5 py-8 md:px-10 md:py-14">
        <p className="eyebrow">{messages.helpPage.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[0.95] md:text-7xl">{messages.helpPage.heroTitle}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {messages.helpPage.heroCopy}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="subtle">
            <LocaleLink href="/account/tracking" locale={locale}>
              {messages.helpPage.trackOrderCta}
            </LocaleLink>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <LocaleLink href="/contact" locale={locale}>
              {messages.helpPage.contactCareCta}
            </LocaleLink>
          </Button>
        </div>
      </section>

      <section className="grid auto-cols-[minmax(270px,88%)] grid-flow-col gap-5 overflow-x-auto pb-1 xl:grid-cols-3 xl:grid-flow-row xl:auto-cols-auto xl:overflow-visible">
        {helpQuickPaths.map((path) => (
          <LocaleLink
            key={path.id}
            className="surface-panel rounded-[32px] p-6 transition hover:-translate-y-1"
            href={path.href}
            locale={locale}
          >
            <p className="eyebrow">{messages.helpPage.quickPathEyebrow}</p>
            <p className="mt-4 font-display text-3xl leading-tight">{path.title[locale]}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{path.description[locale]}</p>
            <p className="mt-6 text-sm font-semibold text-[var(--accent)]">
              {messages.helpPage.quickPathCta}
            </p>
          </LocaleLink>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-5">
          <section className="surface-panel rounded-[32px] p-5 md:p-6">
            <h2 className="font-display text-[1.7rem] leading-tight md:text-3xl">
              {messages.helpPage.channelsTitle}
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

          <section className="surface-panel rounded-[32px] p-5 md:p-6">
            <p className="eyebrow">{messages.helpPage.standardsTitle}</p>
            <div className="mt-5 grid auto-cols-[minmax(210px,82%)] grid-flow-col gap-4 overflow-x-auto pb-1 md:grid-cols-3 md:grid-flow-row md:auto-cols-auto md:overflow-visible">
              {helpServiceStandards.map((standard) => (
                <div
                  key={standard.label.en}
                  className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5"
                >
                  <p className="font-display text-3xl">{standard.value[locale]}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{standard.label[locale]}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="space-y-6">
          <SectionHeading
            eyebrow={messages.helpPage.faqEyebrow}
            title={messages.helpPage.faqTitle}
            description={messages.helpPage.faqDescription}
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
