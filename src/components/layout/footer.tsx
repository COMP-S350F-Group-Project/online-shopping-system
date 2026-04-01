import { footerColumns } from "@/lib/site";
import type { Locale } from "@/types";

import { LocaleLink } from "@/components/shared/locale-link";

export function Footer({
  locale,
  footerNote,
}: {
  locale: Locale;
  footerNote: string;
}) {
  return (
    <footer className="border-t border-[var(--line)] bg-[rgba(252,249,244,0.84)]">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <p className="font-display text-4xl">Velora</p>
          <p className="max-w-md text-sm leading-7 text-slate-600">{footerNote}</p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title.en} className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              {column.title[locale]}
            </p>
            <div className="grid gap-3">
              {column.links.map((link) => (
                <LocaleLink
                  key={link.href}
                  className="text-sm text-slate-600 transition hover:text-[var(--ink)]"
                  href={link.href}
                  locale={locale}
                >
                  {link.label[locale]}
                </LocaleLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
