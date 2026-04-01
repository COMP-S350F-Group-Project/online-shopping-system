import type React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppProviders } from "@/components/providers/app-providers";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getMessages, isSupportedLocale, locales } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  return {
    alternates: {
      languages: {
        en: "/en",
        "zh-Hant": "/zh-Hant",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);

  return (
    <AppProviders locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer footerNote={messages.footer.note} locale={locale} />
      </div>
    </AppProviders>
  );
}
