"use client";

import { ArrowUpRight, Compass, LifeBuoy, Sparkles } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/catalog";
import { collections, searchPopularTerms, searchServiceLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

type SearchDiscoveryPanelProps = {
  locale: Locale;
  variant?: "inline" | "floating" | "sheet";
  className?: string;
};

export function SearchDiscoveryPanel({
  locale,
  variant = "inline",
  className,
}: SearchDiscoveryPanelProps) {
  const t = useTranslations();
  const isFloating = variant === "floating";
  const isSheet = variant === "sheet";

  return (
    <div
      className={cn(
        "rounded-[32px] border border-[var(--line)] bg-white/82 backdrop-blur-xl",
        isFloating
          ? "bg-[rgba(252,249,243,0.98)] p-5 shadow-[0_28px_110px_rgba(15,23,42,0.14)]"
          : "surface-panel p-6",
        className,
      )}
    >
      <div className="border-b border-[var(--line)] pb-5">
        <p className="eyebrow">{t("header.searchTrayTitle")}</p>
        <p className={cn("mt-3 text-sm leading-7 text-slate-600", isFloating && "max-w-3xl")}>
          {t("header.searchTrayCopy")}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {searchPopularTerms.map((term) => (
            <Button key={term.id} asChild size="sm" variant="secondary">
              <LocaleLink href={`/search?q=${encodeURIComponent(term.query[locale])}`} locale={locale}>
                {term.label[locale]}
              </LocaleLink>
            </Button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "mt-5 grid gap-4",
          isSheet ? "md:grid-cols-2" : "md:grid-cols-3",
        )}
      >
        <section className="rounded-[26px] border border-[var(--line)] bg-white/70 p-5">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-[var(--accent)]" />
            <p className="eyebrow">{t("searchPage.browseCategories")}</p>
          </div>
          <div className="mt-4 grid gap-3">
            {categories.slice(0, 4).map((category) => (
              <LocaleLink
                key={category.slug}
                className="rounded-[20px] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-white"
                href={`/categories/${category.slug}`}
                locale={locale}
              >
                {category.name[locale]}
              </LocaleLink>
            ))}
          </div>
        </section>

        <section className="rounded-[26px] border border-[var(--line)] bg-white/70 p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            <p className="eyebrow">{t("searchPage.curatedEdits")}</p>
          </div>
          <div className="mt-4 grid gap-3">
            {collections.map((collection) => (
              <LocaleLink
                key={collection.slug}
                className="rounded-[20px] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-white"
                href={`/search?collection=${collection.slug}`}
                locale={locale}
              >
                {collection.name[locale]}
              </LocaleLink>
            ))}
          </div>
        </section>

        <section
          className={cn(
            "rounded-[26px] border border-[var(--line)] bg-white/70 p-5",
            isSheet && "md:col-span-2",
          )}
        >
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-4 w-4 text-[var(--accent)]" />
            <p className="eyebrow">{t("searchPage.serviceShortcuts")}</p>
          </div>
          <div className="mt-4 grid gap-3">
            {searchServiceLinks.map((item) => (
              <LocaleLink
                key={item.id}
                className="rounded-[20px] border border-[var(--line)] bg-white/80 px-4 py-3 transition hover:bg-white"
                href={item.href}
                locale={locale}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">{item.title[locale]}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description[locale]}</p>
                  </div>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                </div>
              </LocaleLink>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
