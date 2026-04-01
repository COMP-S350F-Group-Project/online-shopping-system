import { enMessages } from "@/messages/en";
import { zhHantMessages } from "@/messages/zh-Hant";
import type { Locale, LocalizedText } from "@/types";

interface MessageTree {
  [key: string]: string | MessageTree;
}

export const locales = ["en", "zh-Hant"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "en";
export const localeCookieName = "preferred-locale";

export function isSupportedLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: Locale) {
  return locale === "zh-Hant" ? zhHantMessages : enMessages;
}

export function localizedText(en: string, zhHant: string): LocalizedText {
  return {
    en,
    "zh-Hant": zhHant,
  };
}

export function localize(
  value: LocalizedText,
  locale: Locale,
  fallback: Locale = defaultLocale,
) {
  return value[locale] ?? value[fallback];
}

export function translate(
  messages: MessageTree,
  key: string,
  values?: Record<string, string | number>,
) {
  const resolved = key.split(".").reduce<string | MessageTree | undefined>(
    (accumulator, segment) => {
      if (!accumulator || typeof accumulator === "string") {
        return accumulator;
      }

      return accumulator[segment];
    },
    messages,
  );

  if (typeof resolved !== "string") {
    return key;
  }

  if (!values) {
    return resolved;
  }

  return Object.entries(values).reduce(
    (result, [token, tokenValue]) =>
      result.replaceAll(`{${token}}`, String(tokenValue)),
    resolved,
  );
}

export function detectLocaleFromHeader(
  acceptLanguage: string | null | undefined,
): Locale {
  const value = acceptLanguage?.toLowerCase() ?? "";

  if (value.includes("zh-hk") || value.includes("zh-tw") || value.includes("zh")) {
    return "zh-Hant";
  }

  return defaultLocale;
}

export function replaceLocaleInPath(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${locale}`;
  }

  const [head, ...tail] = segments;

  if (head && isSupportedLocale(head)) {
    return `/${[locale, ...tail].join("/")}`;
  }

  return `/${[locale, ...segments].join("/")}`;
}
