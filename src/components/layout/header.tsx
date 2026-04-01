"use client";

import { Heart, Menu, User } from "lucide-react";

import { useLocaleContext, useTranslations } from "@/components/providers/locale-provider";
import { LocaleLink } from "@/components/shared/locale-link";
import { SearchCombobox } from "@/components/store/search-combobox";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/lib/catalog";
import { accountQuickPaths, collections, primaryNavigation, searchServiceLinks } from "@/lib/site";
import { useCommerceStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export function Header() {
  const { locale } = useLocaleContext();
  const t = useTranslations();
  const wishlistCount = useCommerceStore((state) => state.wishlist.length);
  const bagCount = useCommerceStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  );
  const mobileQuickAccess = [
    { href: "/account", label: t("nav.account"), count: undefined },
    { href: "/wishlist", label: t("nav.wishlist"), count: wishlistCount || undefined },
    { href: "/cart", label: t("nav.cart"), count: bagCount || undefined },
    { href: "/account/tracking", label: t("accountPage.tracking"), count: undefined },
  ];

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
          <SearchCombobox
            className="w-full max-w-xl"
            discoveryVariant="floating"
            inputClassName="bg-white/70"
            locale={locale}
            panelMode="floating"
          />
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden lg:inline-flex" />
          <LocaleLink
            aria-label={t("nav.wishlist")}
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
            aria-label={t("nav.account")}
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
                aria-label={t("common.openMenu")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/75 text-[var(--ink)] backdrop-blur lg:hidden"
                type="button"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent className="max-w-[420px] overflow-y-auto">
              <div className="space-y-6 pr-2">
                <div className="space-y-2 border-b border-[var(--line)] pb-5 pr-8">
                  <SheetTitle>Velora</SheetTitle>
                  <SheetDescription>{t("home.description")}</SheetDescription>
                </div>
                <div className="space-y-4">
                  <LanguageSwitcher />
                  <SearchCombobox
                    discoveryVariant="sheet"
                    inputClassName="bg-white/80"
                    locale={locale}
                    panelMode="inline"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {mobileQuickAccess.map((item) => (
                    <LocaleLink
                      key={item.href}
                      className="rounded-[22px] border border-[var(--line)] bg-white/75 px-4 py-4 text-sm text-[var(--ink)] transition hover:bg-white"
                      href={item.href}
                      locale={locale}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold">{item.label}</span>
                        {item.count ? (
                          <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--ink)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            {item.count}
                          </span>
                        ) : null}
                      </div>
                    </LocaleLink>
                  ))}
                </div>

                <div className="rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(243,238,227,0.94))] p-5">
                  <p className="eyebrow">{t("searchPage.curatedEdits")}</p>
                  <p className="mt-3 font-display text-3xl leading-tight text-[var(--ink)]">
                    {collections[0].name[locale]}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {collections[0].description[locale]}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button asChild>
                      <LocaleLink href={`/search?collection=${collections[0].slug}`} locale={locale}>
                        {t("common.shopNow")}
                      </LocaleLink>
                    </Button>
                    <Button asChild variant="secondary">
                      <LocaleLink href="/shop" locale={locale}>
                        {t("common.allProducts")}
                      </LocaleLink>
                    </Button>
                  </div>
                </div>

                <section className="space-y-3">
                  <p className="eyebrow">{t("searchPage.browseCategories")}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <LocaleLink
                        key={category.slug}
                        className="rounded-[22px] border border-[var(--line)] bg-white/75 px-4 py-4 text-sm transition hover:bg-white"
                        href={`/categories/${category.slug}`}
                        locale={locale}
                      >
                        <p className="font-semibold text-[var(--ink)]">{category.name[locale]}</p>
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                          {category.description[locale]}
                        </p>
                      </LocaleLink>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <p className="eyebrow">{t("accountPage.quickAccessTitle")}</p>
                  <div className="grid gap-3">
                    {accountQuickPaths.map((item) => (
                      <LocaleLink
                        key={item.id}
                        className="rounded-[22px] border border-[var(--line)] bg-white/75 px-4 py-4 transition hover:bg-white"
                        href={item.href}
                        locale={locale}
                      >
                        <p className="text-sm font-semibold text-[var(--ink)]">{item.title[locale]}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.description[locale]}
                        </p>
                      </LocaleLink>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <p className="eyebrow">{t("searchPage.serviceShortcuts")}</p>
                  <div className="grid gap-3">
                    {searchServiceLinks.map((item) => (
                      <LocaleLink
                        key={item.id}
                        className="rounded-[22px] border border-[var(--line)] bg-white/75 px-4 py-4 transition hover:bg-white"
                        href={item.href}
                        locale={locale}
                      >
                        <p className="text-sm font-semibold text-[var(--ink)]">{item.title[locale]}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.description[locale]}
                        </p>
                      </LocaleLink>
                    ))}
                  </div>
                </section>

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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
