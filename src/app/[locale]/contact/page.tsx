import { supportChannels } from "@/lib/site";
import { resolveLocale } from "@/lib/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  return (
    <div className="container-shell space-y-8 py-10">
      <div>
        <p className="eyebrow">{locale === "zh-Hant" ? "聯絡我們" : "Contact"}</p>
        <h1 className="mt-3 font-display text-5xl leading-[0.95]">
          {locale === "zh-Hant" ? "與 Velora 團隊直接聯繫。" : "Speak directly with the Velora team."}
        </h1>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="space-y-4">
          {supportChannels.map((channel) => (
            <div key={channel.id} className="surface-panel rounded-[32px] p-6">
              <p className="font-display text-3xl">{channel.title[locale]}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {channel.description[locale]}
              </p>
              <p className="mt-4 text-sm font-semibold text-[var(--ink)]">{channel.value}</p>
            </div>
          ))}
        </section>

        <section className="surface-panel rounded-[32px] p-6">
          <form className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Input placeholder={locale === "zh-Hant" ? "名字" : "First name"} />
              <Input placeholder={locale === "zh-Hant" ? "姓氏" : "Last name"} />
            </div>
            <Input placeholder={locale === "zh-Hant" ? "電郵地址" : "Email address"} />
            <Input placeholder={locale === "zh-Hant" ? "主旨" : "Subject"} />
            <Textarea
              placeholder={
                locale === "zh-Hant"
                  ? "請簡述你的需求，例如產品建議、送禮安排或訂單更新。"
                  : "Tell us what you need help with, such as product advice, gifting, or an order update."
              }
            />
            <Button type="submit">
              {locale === "zh-Hant" ? "送出訊息" : "Send message"}
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
