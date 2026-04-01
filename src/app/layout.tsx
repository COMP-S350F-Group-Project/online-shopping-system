import type React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Sans_TC,
  Noto_Serif_TC,
} from "next/font/google";

import { defaultLocale, isSupportedLocale, localeCookieName } from "@/lib/i18n";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans-en",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display-en",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const notoSansTc = Noto_Sans_TC({
  variable: "--font-sans-zh",
  weight: ["400", "500", "600", "700"],
});

const notoSerifTc = Noto_Serif_TC({
  variable: "--font-display-zh",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://velora.house"),
  title: {
    default: "Velora",
    template: "%s | Velora",
  },
  description:
    "Premium online shopping for refined audio, personal carry, and smart-living essentials.",
  applicationName: "Velora",
  openGraph: {
    title: "Velora",
    description:
      "Premium online shopping for refined audio, personal carry, and smart-living essentials.",
    siteName: "Velora",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const preferredLocale = cookieStore.get(localeCookieName)?.value;
  const locale =
    preferredLocale && isSupportedLocale(preferredLocale)
      ? preferredLocale
      : defaultLocale;

  return (
    <html
      className={`${manrope.variable} ${cormorant.variable} ${notoSansTc.variable} ${notoSerifTc.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      lang={locale}
    >
      <body className="min-h-full flex flex-col" data-locale={locale}>
        {children}
      </body>
    </html>
  );
}
