"use client";

import type React from "react";
import { createContext, useContext } from "react";

import { translate } from "@/lib/i18n";
import { enMessages } from "@/messages/en";
import type { Locale } from "@/types";

type Messages = typeof enMessages;

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  locale,
  messages,
}: React.PropsWithChildren<LocaleContextValue>) {
  return (
    <LocaleContext.Provider value={{ locale, messages }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }

  return context;
}

export function useTranslations() {
  const { messages } = useLocaleContext();

  return (key: string, values?: Record<string, string | number>) =>
    translate(messages, key, values);
}
