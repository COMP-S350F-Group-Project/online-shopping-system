import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl space-y-3", className)}>
      {eyebrow ? (
        <p className="eyebrow">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight md:text-5xl">{title}</h2>
      {description ? (
        <p className="text-base leading-7 text-slate-600 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
