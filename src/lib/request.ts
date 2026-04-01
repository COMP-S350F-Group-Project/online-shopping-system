import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { defaultLocale, detectLocaleFromHeader, isSupportedLocale } from "@/lib/i18n";
import type { Locale } from "@/types";

export type SearchParamsPromise = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function resolveCurrentLocaleFromHeaders() {
  const headerStore = await headers();
  return detectLocaleFromHeader(headerStore.get("accept-language")) ?? defaultLocale;
}
