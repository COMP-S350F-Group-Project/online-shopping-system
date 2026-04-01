import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 text-amber-500", className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={`${value}-${index}`}
          className={cn(
            "h-4 w-4",
            value >= index + 1 ? "fill-current" : "fill-none opacity-40",
          )}
        />
      ))}
    </div>
  );
}
