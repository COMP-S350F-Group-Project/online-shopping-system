import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocaleLink } from "@/components/shared/locale-link";
import { resolveLocale } from "@/lib/request";

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  return (
    <div className="container-shell py-10">
      <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10">
          <p className="eyebrow">{locale === "zh-Hant" ? "建立帳戶" : "Create account"}</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95]">
            {locale === "zh-Hant"
              ? "把你的喜好、地址與訂單整理在同一處。"
              : "Keep preferences, addresses, and orders in one place."}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {locale === "zh-Hant"
              ? "建立帳戶後可快速結帳、追蹤物流、保留收藏，並接收更貼近你的產品推薦。"
              : "Save time at checkout, track deliveries, keep favourites close, and receive more relevant product suggestions."}
          </p>
        </section>

        <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10">
          <form className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--ink)]">
                  {locale === "zh-Hant" ? "名字" : "First name"}
                </label>
                <Input defaultValue="Evelyn" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--ink)]">
                  {locale === "zh-Hant" ? "姓氏" : "Last name"}
                </label>
                <Input defaultValue="Lau" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--ink)]">
                {locale === "zh-Hant" ? "電郵地址" : "Email address"}
              </label>
              <Input defaultValue="evelyn@private-mail.com" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--ink)]">
                {locale === "zh-Hant" ? "建立密碼" : "Create password"}
              </label>
              <Input defaultValue="Velora2026" type="password" />
            </div>
            <Button asChild className="mt-3 w-full">
              <LocaleLink href="/account" locale={locale}>
                {locale === "zh-Hant" ? "建立帳戶" : "Create account"}
              </LocaleLink>
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
