import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        default: "bg-[var(--accent-soft)] text-[var(--ink)]",
        outline: "border border-[var(--line)] bg-white/60 text-[var(--ink)]",
        success: "bg-emerald-500/10 text-emerald-700",
        warning: "bg-amber-500/10 text-amber-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  children,
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant, className }))}>{children}</div>;
}
