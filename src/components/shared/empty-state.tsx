import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/types";

export function EmptyState({
  locale,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  locale: Locale;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="rounded-[36px] border border-[var(--line)] bg-white/75 px-6 py-12 text-center shadow-[0_24px_90px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="mx-auto max-w-xl space-y-4">
        <h2 className="font-display text-3xl leading-tight md:text-4xl">{title}</h2>
        <p className="text-base leading-7 text-slate-600">{description}</p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild>
            <LocaleLink href={primaryHref} locale={locale}>
              {primaryLabel}
            </LocaleLink>
          </Button>
          {secondaryLabel && secondaryHref ? (
            <Button asChild variant="secondary">
              <LocaleLink href={secondaryHref} locale={locale}>
                {secondaryLabel}
              </LocaleLink>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
