import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocaleLink } from "@/components/shared/locale-link";
import { resolveLocale } from "@/lib/request";

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  return (
    <div className="container-shell py-10">
      <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10">
          <p className="eyebrow">{locale === "zh-Hant" ? "歡迎回來" : "Welcome back"}</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95]">
            {locale === "zh-Hant" ? "登入你的 Velora 帳戶。" : "Sign in to your Velora account."}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {locale === "zh-Hant"
              ? "查看訂單、管理收藏、加快結帳流程，並獲得專屬顧問支援。"
              : "Access order history, saved products, faster checkout, and concierge support."}
          </p>
          <div className="mt-10 grid gap-4">
            {[
              locale === "zh-Hant" ? "訂單與物流一站式管理" : "One place for orders and tracking",
              locale === "zh-Hant" ? "保留你偏好的商品與設定" : "Saved products and preferences",
              locale === "zh-Hant" ? "更流暢的結帳與售後體驗" : "Faster checkout and aftercare",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[var(--line)] bg-white/70 px-4 py-4 text-sm text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="surface-panel rounded-[40px] px-6 py-10 md:px-10">
          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--ink)]">
                {locale === "zh-Hant" ? "電郵地址" : "Email address"}
              </label>
              <Input defaultValue="evelyn@private-mail.com" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--ink)]">
                {locale === "zh-Hant" ? "密碼" : "Password"}
              </label>
              <Input defaultValue="Velora2026" type="password" />
            </div>
            <div className="grid gap-3 pt-3">
              <Button asChild className="w-full">
                <LocaleLink href="/account" locale={locale}>
                  {locale === "zh-Hant" ? "登入" : "Continue"}
                </LocaleLink>
              </Button>
              <Button asChild className="w-full" variant="secondary">
                <LocaleLink href="/auth/sign-up" locale={locale}>
                  {locale === "zh-Hant" ? "建立新帳戶" : "Create account"}
                </LocaleLink>
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
