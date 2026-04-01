"use client";

import { startTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Category, Collection, Locale } from "@/types";
import { cn, deserialiseSearchValue } from "@/lib/utils";

const sortOptions = [
  { value: "featured", label: { en: "Featured", "zh-Hant": "精選排序" } },
  { value: "price-asc", label: { en: "Price: low to high", "zh-Hant": "價格由低至高" } },
  { value: "price-desc", label: { en: "Price: high to low", "zh-Hant": "價格由高至低" } },
  { value: "rating", label: { en: "Highest rated", "zh-Hant": "評分最高" } },
  { value: "latest", label: { en: "Most popular", "zh-Hant": "人氣排序" } },
] as const;

export function CatalogToolbar({
  locale,
  categories,
  collections,
}: {
  locale: Locale;
  categories: Category[];
  collections: Collection[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = deserialiseSearchValue(searchParams.get("category") ?? undefined);
  const activeCollection = deserialiseSearchValue(
    searchParams.get("collection") ?? undefined,
  );
  const activeSort =
    deserialiseSearchValue(searchParams.get("sort") ?? undefined) || "featured";

  const updateParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname);
    });
  };

  return (
    <div className="space-y-4 rounded-[32px] border border-[var(--line)] bg-white/75 p-5 backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              activeCategory
                ? "border-[var(--line)] bg-white/70 text-slate-700"
                : "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]",
            )}
            onClick={() => updateParam("category")}
            type="button"
          >
            {locale === "zh-Hant" ? "全部分類" : "All categories"}
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                activeCategory === category.slug
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]"
                  : "border-[var(--line)] bg-white/70 text-slate-700 hover:bg-white",
              )}
              onClick={() => updateParam("category", category.slug)}
              type="button"
            >
              {category.name[locale]}
            </button>
          ))}
        </div>

        <select
          className="h-11 rounded-full border border-[var(--line)] bg-white/70 px-4 text-sm text-[var(--ink)] outline-none"
          onChange={(event) => updateParam("sort", event.target.value)}
          value={activeSort}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label[locale]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition",
            activeCollection
              ? "border-[var(--line)] bg-white/70 text-slate-700"
              : "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]",
          )}
          onClick={() => updateParam("collection")}
          type="button"
        >
          {locale === "zh-Hant" ? "全部系列" : "All edits"}
        </button>
        {collections.map((collection) => (
          <button
            key={collection.slug}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              activeCollection === collection.slug
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]"
                : "border-[var(--line)] bg-white/70 text-slate-700 hover:bg-white",
            )}
            onClick={() => updateParam("collection", collection.slug)}
            type="button"
          >
            {collection.name[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
