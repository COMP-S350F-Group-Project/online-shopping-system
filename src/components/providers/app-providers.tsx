"use client";

import { Toaster } from "sonner";

import { LocaleProvider } from "@/components/providers/locale-provider";
import type { enMessages } from "@/messages/en";
import type { Locale } from "@/types";

type Messages = typeof enMessages;

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
