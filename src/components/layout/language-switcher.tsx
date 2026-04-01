"use client";

import { startTransition } from "react";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useLocaleContext } from "@/components/providers/locale-provider";
import { localeCookieName, replaceLocaleInPath } from "@/lib/i18n";
import { useCommerceStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

const languageOptions: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh-Hant", label: "繁中" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useLocaleContext();
  const setLocalePreference = useCommerceStore((state) => state.setLocalePreference);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-white/75 p-1 text-sm backdrop-blur",
        className,
      )}
    >
      <Languages className="ml-2 h-4 w-4 text-slate-500" />
      {languageOptions.map((option) => (
        <button
          key={option.value}
          className={cn(
            "rounded-full px-3 py-1.5 font-medium transition",
            option.value === locale
              ? "bg-[var(--ink)] text-white"
              : "text-slate-600 hover:bg-black/5",
          )}
          onClick={() => {
            if (option.value === locale) {
              return;
            }

            document.cookie = `${localeCookieName}=${option.value}; path=/; max-age=31536000`;
            localStorage.setItem(localeCookieName, option.value);
            setLocalePreference(option.value);
            startTransition(() => {
              router.replace(replaceLocaleInPath(pathname, option.value));
            });
          }}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
