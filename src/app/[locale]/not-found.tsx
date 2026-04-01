import { cookies } from "next/headers";

import { EmptyState } from "@/components/shared/empty-state";
import { defaultLocale, isSupportedLocale, localeCookieName } from "@/lib/i18n";

export default async function NotFound() {
  const cookieStore = await cookies();
  const preferredLocale = cookieStore.get(localeCookieName)?.value;
  const locale =
    preferredLocale && isSupportedLocale(preferredLocale)
      ? preferredLocale
      : defaultLocale;

  return (
    <div className="container-shell py-16">
      <EmptyState
        description={
          locale === "zh-Hant"
            ? "可回到首頁、查看帳戶，或從商品系列繼續探索。"
            : "Return home, review your account, or continue shopping from the collection."
        }
        locale={locale}
        primaryHref="/"
        primaryLabel={locale === "zh-Hant" ? "返回首頁" : "Return home"}
        secondaryHref="/shop"
        secondaryLabel={locale === "zh-Hant" ? "瀏覽商品系列" : "Browse the collection"}
        title={
          locale === "zh-Hant"
            ? "你要找的頁面已不存在"
            : "The page you requested is no longer here"
        }
      />
    </div>
  );
}
