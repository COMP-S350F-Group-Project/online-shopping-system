import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  defaultLocale,
  detectLocaleFromHeader,
  isSupportedLocale,
  localeCookieName,
} from "@/lib/i18n";

export default async function Page() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const locale =
    cookieLocale && isSupportedLocale(cookieLocale)
      ? cookieLocale
      : detectLocaleFromHeader(headerStore.get("accept-language")) ?? defaultLocale;

  redirect(`/${locale}`);
}
