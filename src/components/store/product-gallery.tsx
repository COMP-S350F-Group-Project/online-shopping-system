"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useState } from "react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/store/product-visual";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types";

export function ProductGallery({
  locale,
  product,
}: {
  locale: Locale;
  product: Product;
}) {
  const t = useTranslations();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const visual = product.visuals[activeIndex] ?? product.visuals[0];

  const goToIndex = (index: number) => {
    const total = product.visuals.length;
    setActiveIndex((index + total) % total);
  };

  return (
    <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <div className="grid gap-4 lg:grid-cols-[6rem_1fr] lg:items-start">
        <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">
          {product.visuals.map((item, index) => (
            <button
              key={item.id}
              aria-label={item.label[locale]}
              className={cn(
                "min-w-[5.5rem] rounded-[24px] border border-[var(--line)] bg-white/70 p-2 transition lg:min-w-0",
                index === activeIndex &&
                  "border-[var(--accent)] shadow-[0_10px_40px_rgba(178,132,76,0.16)]",
              )}
              onClick={() => goToIndex(index)}
              type="button"
            >
              <ProductVisual
                className="aspect-square rounded-[18px]"
                locale={locale}
                visual={item}
              />
            </button>
          ))}
        </div>

        <div className="order-1 space-y-4 lg:order-2">
          <div className="group relative overflow-hidden rounded-[36px] border border-[var(--line)] bg-white/70 p-4 backdrop-blur">
            <div className="absolute left-5 top-5 z-10 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-slate-600 backdrop-blur">
              {t("product.mediaCount", {
                current: activeIndex + 1,
                total: product.visuals.length,
              })}
            </div>
            <div className="absolute right-5 top-5 z-10 flex items-center gap-2">
              <button
                aria-label={t("product.previousMedia")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/85 text-[var(--ink)] shadow-sm backdrop-blur transition hover:bg-white"
                onClick={() => goToIndex(activeIndex - 1)}
                type="button"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label={t("product.nextMedia")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/85 text-[var(--ink)] shadow-sm backdrop-blur transition hover:bg-white"
                onClick={() => goToIndex(activeIndex + 1)}
                type="button"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <ProductVisual
              className="aspect-[4/4.6] transition duration-500 group-hover:scale-[1.01]"
              locale={locale}
              visual={visual}
            />
            <div className="absolute bottom-5 right-5 z-10">
              <Dialog.Trigger asChild>
                <Button size="sm" variant="secondary">
                  <Expand className="h-4 w-4" />
                  {t("product.immersiveView")}
                </Button>
              </Dialog.Trigger>
            </div>
          </div>

          <div className="surface-panel rounded-[28px] px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                  {visual.label[locale]}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{visual.caption[locale]}</p>
              </div>
              <Dialog.Trigger asChild>
                <Button size="sm" variant="subtle">
                  <Expand className="h-4 w-4" />
                  {t("product.immersiveView")}
                </Button>
              </Dialog.Trigger>
            </div>
          </div>
        </div>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md" />
        <Dialog.Content className="fixed inset-0 z-50 p-4 md:p-8">
          <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[40px] border border-white/10 bg-[rgba(251,248,243,0.94)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-5">
              <div>
                <Dialog.Title className="font-display text-3xl text-[var(--ink)]">
                  {product.name[locale]}
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-slate-600">
                  {visual.caption[locale]}
                </Dialog.Description>
              </div>
              <Dialog.Close className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/70 text-[var(--ink)] transition hover:bg-white">
                <X className="h-4 w-4" />
                <span className="sr-only">{t("common.close")}</span>
              </Dialog.Close>
            </div>

            <div className="grid flex-1 gap-5 overflow-hidden p-5 lg:grid-cols-[7rem_1fr]">
              <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
                {product.visuals.map((item, index) => (
                  <button
                    key={`lightbox-${item.id}`}
                    aria-label={item.label[locale]}
                    className={cn(
                      "min-w-[5.5rem] rounded-[24px] border border-[var(--line)] bg-white/70 p-2 transition lg:min-w-0",
                      index === activeIndex &&
                        "border-[var(--accent)] bg-[var(--accent-soft)] shadow-[0_10px_40px_rgba(178,132,76,0.16)]",
                    )}
                    onClick={() => goToIndex(index)}
                    type="button"
                  >
                    <ProductVisual
                      className="aspect-square rounded-[18px]"
                      locale={locale}
                      visual={item}
                    />
                  </button>
                ))}
              </div>

              <div className="order-1 flex min-h-0 flex-col rounded-[32px] border border-[var(--line)] bg-white/80 p-4 lg:order-2">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold tracking-[0.14em] text-[var(--ink)]">
                    {t("product.mediaCount", {
                      current: activeIndex + 1,
                      total: product.visuals.length,
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label={t("product.previousMedia")}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--ink)] transition hover:bg-[var(--surface-strong)]"
                      onClick={() => goToIndex(activeIndex - 1)}
                      type="button"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      aria-label={t("product.nextMedia")}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--ink)] transition hover:bg-[var(--surface-strong)]"
                      onClick={() => goToIndex(activeIndex + 1)}
                      type="button"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <ProductVisual
                  className="min-h-0 flex-1 rounded-[28px] border border-white/50"
                  locale={locale}
                  visual={visual}
                />
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
