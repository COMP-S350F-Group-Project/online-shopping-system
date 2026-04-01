import type React from "react";
import Link from "next/link";

import { buildLocaleHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function LocaleLink({
  locale,
  href,
  className,
  children,
}: React.PropsWithChildren<{
  locale: Locale;
  href: string;
  className?: string;
}>) {
  return (
    <Link className={cn(className)} href={buildLocaleHref(locale, href)}>
      {children}
    </Link>
  );
}
