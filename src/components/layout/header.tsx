"use client";

import { Heart, Menu, User } from "lucide-react";

import { useLocaleContext, useTranslations } from "@/components/providers/locale-provider";
import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { primaryNavigation } from "@/lib/site";
import { useCommerceStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export function Header() {
  const { locale } = useLocaleContext();
  const t = useTranslations();
  const wishlistCount = useCommerceStore((state) => state.wishlist.length);

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-[rgba(249,246,239,0.75)] backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <LocaleLink className="font-display text-3xl tracking-[0.04em]" href="" locale={locale}>
            Velora
          </LocaleLink>
          <nav className="hidden items-center gap-6 lg:flex">
            {primaryNavigation.map((item) => (
              <LocaleLink
                key={item.key}
                className="text-sm font-medium text-slate-600 transition hover:text-[var(--ink)]"
                href={item.href}
                locale={locale}
              >
                {t(`nav.${item.key}`)}
              </LocaleLink>
            ))}
          </nav>
        </div>

        <div className="hidden flex-1 justify-center xl:flex">
          <form action={`/${locale}/search`} className="w-full max-w-xl">
            <input
              className="h-12 w-full rounded-full border border-[var(--line)] bg-white/70 px-5 text-sm text-[var(--ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15"
              name="q"
              placeholder={t("common.searchPlaceholder")}
              type="search"
            />
          </form>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden lg:inline-flex" />
          <LocaleLink
            className="relative hidden h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/75 text-[var(--ink)] backdrop-blur transition hover:bg-white md:inline-flex"
            href="/wishlist"
            locale={locale}
          >
            <Heart className={cn("h-4 w-4", wishlistCount > 0 && "fill-current text-rose-500")} />
            {wishlistCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--ink)] px-1 text-[10px] font-semibold text-white">
                {wishlistCount}
              </span>
            ) : null}
          </LocaleLink>
          <LocaleLink
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/75 text-[var(--ink)] backdrop-blur transition hover:bg-white md:inline-flex"
            href="/account"
            locale={locale}
          >
            <User className="h-4 w-4" />
          </LocaleLink>
          <CartDrawer />

          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/75 text-[var(--ink)] backdrop-blur lg:hidden"
                type="button"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent className="max-w-sm">
              <div className="space-y-6">
                <div className="space-y-2 border-b border-[var(--line)] pb-5 pr-8">
                  <SheetTitle>Velora</SheetTitle>
                  <SheetDescription>{t("home.description")}</SheetDescription>
                </div>
                <div className="space-y-4">
                  <LanguageSwitcher />
                  <form action={`/${locale}/search`} className="space-y-2">
                    <input
                      className="h-12 w-full rounded-full border border-[var(--line)] bg-white/80 px-5 text-sm text-[var(--ink)] outline-none"
                      name="q"
                      placeholder={t("common.searchPlaceholder")}
                      type="search"
                    />
                  </form>
                </div>
                <nav className="grid gap-3">
                  {primaryNavigation.map((item) => (
                    <LocaleLink
                      key={item.key}
                      className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm font-semibold text-[var(--ink)]"
                      href={item.href}
                      locale={locale}
                    >
                      {t(`nav.${item.key}`)}
                    </LocaleLink>
                  ))}
                </nav>
                <div className="grid gap-3">
                  <Button asChild variant="secondary">
                    <LocaleLink href="/account" locale={locale}>
                      {t("nav.account")}
                    </LocaleLink>
                  </Button>
                  <Button asChild>
                    <LocaleLink href="/shop" locale={locale}>
                      {t("common.shopNow")}
                    </LocaleLink>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
