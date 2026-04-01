"use client";

import type React from "react";
import { startTransition, useDeferredValue, useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, LoaderCircle, Search, Star } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { SearchDiscoveryPanel } from "@/components/store/search-discovery-panel";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Locale, PredictiveSearchPayload } from "@/types";

type SearchComboboxProps = {
  locale: Locale;
  initialQuery?: string;
  panelMode?: "floating" | "inline";
  discoveryVariant?: "floating" | "sheet" | "inline";
  showDiscoveryWhenEmpty?: boolean;
  className?: string;
  inputClassName?: string;
  panelClassName?: string;
};

type FlattenedSuggestion = {
  id: string;
  href: string;
};

export function SearchCombobox({
  locale,
  initialQuery = "",
  panelMode = "floating",
  discoveryVariant = "inline",
  showDiscoveryWhenEmpty = true,
  className,
  inputClassName,
  panelClassName,
}: SearchComboboxProps) {
  const router = useRouter();
  const t = useTranslations();
  const listboxId = useId();
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [payload, setPayload] = useState<PredictiveSearchPayload | null>(null);
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim();
  const showPredictive = isOpen && normalizedQuery.length >= 2;
  const showDiscovery = isOpen && !showPredictive && showDiscoveryWhenEmpty;
  const flattenedSuggestions: FlattenedSuggestion[] = payload
    ? [
        ...payload.queries.map((item) => ({ id: item.id, href: item.href })),
        ...payload.products.map((item) => ({ id: item.id, href: item.href })),
        ...payload.categories.map((item) => ({ id: item.id, href: item.href })),
        ...payload.collections.map((item) => ({ id: item.id, href: item.href })),
      ]
    : [];

  useEffect(() => {
    if (!showPredictive) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search/suggest?q=${encodeURIComponent(normalizedQuery)}&locale=${locale}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch predictive search results");
        }

        const nextPayload = (await response.json()) as PredictiveSearchPayload;
        setPayload(nextPayload);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error(error);
        setPayload(null);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [locale, normalizedQuery, showPredictive]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [normalizedQuery, payload]);

  const navigateTo = (href: string) => {
    setIsOpen(false);
    startTransition(() => {
      router.push(href);
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showPredictive || flattenedSuggestions.length === 0) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        currentIndex >= flattenedSuggestions.length - 1 ? 0 : currentIndex + 1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        currentIndex <= 0 ? flattenedSuggestions.length - 1 : currentIndex - 1,
      );
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      navigateTo(flattenedSuggestions[activeIndex].href);
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const renderTextSuggestions = (
    title: string,
    items: Array<{ id: string; href: string; label: string; description?: string }>,
    offset: number,
  ) => {
    if (items.length === 0) {
      return null;
    }

    return (
      <section className="space-y-3">
        <p className="eyebrow">{title}</p>
        <div className="grid gap-2">
          {items.map((item, index) => {
            const absoluteIndex = offset + index;
            const isActive = activeIndex === absoluteIndex;

            return (
              <button
                aria-selected={isActive}
                key={item.id}
                className={cn(
                  "rounded-[20px] border border-[var(--line)] bg-white/80 px-4 py-3 text-left transition hover:bg-white",
                  isActive && "border-[var(--accent)] bg-[var(--accent-soft)]",
                )}
                id={`${listboxId}-${item.id}`}
                onClick={() => navigateTo(item.href)}
                role="option"
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">{item.label}</p>
                    {item.description ? (
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    ) : null}
                  </div>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    );
  };

  let runningIndex = 0;
  const queryOffset = runningIndex;
  runningIndex += payload?.queries.length ?? 0;
  const productOffset = runningIndex;
  runningIndex += payload?.products.length ?? 0;
  const categoryOffset = runningIndex;
  runningIndex += payload?.categories.length ?? 0;
  const collectionOffset = runningIndex;

  return (
    <div
      className={cn("relative", className)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
      }}
      onFocusCapture={() => setIsOpen(true)}
    >
      <form action={`/${locale}/search`} className="relative">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          aria-activedescendant={
            activeIndex >= 0 && flattenedSuggestions[activeIndex]
              ? `${listboxId}-${flattenedSuggestions[activeIndex].id}`
              : undefined
          }
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={showDiscovery || showPredictive}
          aria-label={t("common.search")}
          className={cn(
            "h-12 w-full rounded-full border border-[var(--line)] bg-white/80 pl-12 pr-5 text-sm text-[var(--ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15",
            inputClassName,
          )}
          name="q"
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t("common.searchPlaceholder")}
          role="combobox"
          type="search"
          value={query}
        />
      </form>

      {showDiscovery || showPredictive ? (
        <div
          className={cn(
            panelMode === "floating"
              ? "absolute left-0 right-0 top-[calc(100%+14px)] z-30"
              : "mt-4",
            panelClassName,
          )}
        >
          {showDiscovery ? (
            <SearchDiscoveryPanel locale={locale} variant={discoveryVariant} />
          ) : (
            <div
              aria-busy={isLoading}
              className="rounded-[32px] border border-[var(--line)] bg-[rgba(252,249,243,0.98)] p-5 shadow-[0_28px_110px_rgba(15,23,42,0.14)]"
              id={listboxId}
              role="listbox"
            >
              {isLoading ? (
                <div className="flex items-center gap-3 rounded-[24px] border border-[var(--line)] bg-white/80 px-4 py-4 text-sm text-slate-600">
                  <LoaderCircle className="h-4 w-4 animate-spin text-[var(--accent)]" />
                  <span>{t("header.loadingSuggestions")}</span>
                </div>
              ) : payload ? (
                <div className="space-y-5">
                  {renderTextSuggestions(t("header.querySuggestions"), payload.queries, queryOffset)}

                  {payload.products.length > 0 ? (
                    <section className="space-y-3">
                      <p className="eyebrow">{t("header.productSuggestions")}</p>
                      <div className="grid gap-2">
                        {payload.products.map((product, index) => {
                          const absoluteIndex = productOffset + index;
                          const isActive = activeIndex === absoluteIndex;

                          return (
                            <button
                              aria-selected={isActive}
                              key={product.id}
                              className={cn(
                                "rounded-[22px] border border-[var(--line)] bg-white/80 px-4 py-4 text-left transition hover:bg-white",
                                isActive && "border-[var(--accent)] bg-[var(--accent-soft)]",
                              )}
                              id={`${listboxId}-${product.id}`}
                              onClick={() => navigateTo(product.href)}
                              role="option"
                              type="button"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-500">
                                    <span>{product.category}</span>
                                    <span className="inline-flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-current text-[var(--accent)]" />
                                      {product.rating.toFixed(1)}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-sm font-semibold text-[var(--ink)]">{product.title}</p>
                                  <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-semibold text-[var(--ink)]">
                                    {formatCurrency(product.price, locale)}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-500">
                                    {t("common.reviews", { count: product.reviewCount })}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ) : null}

                  <div className="grid gap-4 md:grid-cols-2">
                    {renderTextSuggestions(t("header.categorySuggestions"), payload.categories, categoryOffset)}
                    {renderTextSuggestions(t("header.collectionSuggestions"), payload.collections, collectionOffset)}
                  </div>

                  {payload.products.length === 0 &&
                  payload.queries.length === 0 &&
                  payload.categories.length === 0 &&
                  payload.collections.length === 0 ? (
                    <div className="rounded-[24px] border border-[var(--line)] bg-white/80 px-4 py-4 text-sm leading-7 text-slate-600">
                      {t("header.noInstantMatches")}
                    </div>
                  ) : null}

                  <Button
                    className="w-full"
                    onClick={() => navigateTo(`/${locale}/search?q=${encodeURIComponent(query.trim())}`)}
                    type="button"
                    variant="subtle"
                  >
                    {t("header.viewAllResults", { query: query.trim() })}
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
