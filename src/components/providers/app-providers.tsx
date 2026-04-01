"use client";

import type React from "react";
import { Toaster } from "sonner";

import { LocaleProvider } from "@/components/providers/locale-provider";
import type { Locale } from "@/types";

interface Messages {
  [key: string]: string | Messages;
}

export function AppProviders({
  children,
  locale,
  messages,
}: React.PropsWithChildren<{
  locale: Locale;
  messages: Messages;
}>) {
  return (
    <LocaleProvider locale={locale} messages={messages}>
      {children}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          className: "!rounded-2xl !border !border-white/40 !bg-slate-950 !text-white",
        }}
      />
    </LocaleProvider>
  );
}
