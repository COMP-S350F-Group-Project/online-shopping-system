import { cn } from "@/lib/utils";
import type { Locale, ProductVisual as ProductVisualType } from "@/types";

type DeviceProps = {
  base: string;
  accent: string;
  surface: string;
};

function renderDevice(kind: ProductVisualType["kind"], colors: DeviceProps) {
  const shared = {
    backgroundColor: colors.base,
    borderColor: `${colors.surface}55`,
  };

  switch (kind) {
    case "headphones":
      return (
        <>
          <div className="absolute left-1/2 top-[18%] h-28 w-40 -translate-x-1/2 rounded-[999px] border-8" style={shared} />
          <div className="absolute left-[26%] top-[44%] h-24 w-14 rounded-[32px] border-4" style={shared} />
          <div className="absolute right-[26%] top-[44%] h-24 w-14 rounded-[32px] border-4" style={shared} />
        </>
      );
    case "speaker":
      return (
        <>
          <div className="absolute left-1/2 top-[22%] h-40 w-40 -translate-x-1/2 rounded-[36px] border-4" style={shared} />
          <div className="absolute left-1/2 top-[38%] h-16 w-16 -translate-x-1/2 rounded-full border-4" style={shared} />
        </>
      );
    case "earbuds":
      return (
        <>
          <div className="absolute left-1/2 top-[44%] h-28 w-44 -translate-x-1/2 rounded-[32px] border-4" style={shared} />
          <div className="absolute left-[34%] top-[28%] h-[4.5rem] w-10 rounded-[32px] border-4" style={shared} />
          <div className="absolute right-[34%] top-[28%] h-[4.5rem] w-10 rounded-[32px] border-4" style={shared} />
        </>
      );
    case "dock":
      return (
        <>
          <div className="absolute left-1/2 top-[46%] h-16 w-44 -translate-x-1/2 rounded-[28px] border-4" style={shared} />
          <div className="absolute left-1/2 top-[24%] h-24 w-24 -translate-x-1/2 rounded-[24px] border-4" style={shared} />
        </>
      );
    case "display":
      return (
        <>
          <div className="absolute left-1/2 top-[22%] h-36 w-52 -translate-x-1/2 rounded-[28px] border-4" style={shared} />
          <div className="absolute left-1/2 top-[66%] h-8 w-20 -translate-x-1/2 rounded-[999px]" style={{ backgroundColor: colors.base }} />
        </>
      );
    case "keyboard":
      return (
        <div className="absolute left-1/2 top-[36%] h-28 w-56 -translate-x-1/2 rounded-[28px] border-4" style={shared}>
          <div className="grid h-full grid-cols-10 gap-1 p-4">
            {Array.from({ length: 40 }).map((_, index) => (
              <div
                key={`key-${index}`}
                className="rounded-md"
                style={{ backgroundColor: `${colors.surface}40` }}
              />
            ))}
          </div>
        </div>
      );
    case "lamp":
      return (
        <>
          <div className="absolute left-1/2 top-[22%] h-14 w-24 -translate-x-1/2 rounded-[999px] border-4" style={shared} />
          <div className="absolute left-1/2 top-[30%] h-28 w-3 -translate-x-1/2 rounded-full" style={{ backgroundColor: colors.base }} />
          <div className="absolute left-1/2 top-[58%] h-8 w-28 -translate-x-1/2 rounded-[999px]" style={{ backgroundColor: colors.base }} />
        </>
      );
    case "diffuser":
      return <div className="absolute left-1/2 top-[26%] h-40 w-32 -translate-x-1/2 rounded-[36px] border-4" style={shared} />;
    case "hub":
      return (
        <>
          <div className="absolute left-1/2 top-[26%] h-36 w-36 -translate-x-1/2 rounded-[32px] border-4" style={shared} />
          <div className="absolute left-1/2 top-[40%] h-12 w-12 -translate-x-1/2 rounded-full" style={{ backgroundColor: colors.accent }} />
        </>
      );
    case "weekender":
      return (
        <>
          <div className="absolute left-1/2 top-[34%] h-32 w-56 -translate-x-1/2 rounded-[32px] border-4" style={shared} />
          <div className="absolute left-[34%] top-[22%] h-12 w-10 rounded-[999px] border-4" style={shared} />
          <div className="absolute right-[34%] top-[22%] h-12 w-10 rounded-[999px] border-4" style={shared} />
        </>
      );
    case "sling":
      return <div className="absolute left-1/2 top-[34%] h-28 w-48 -translate-x-1/2 rounded-[30px] border-4" style={shared} />;
    case "wallet":
      return <div className="absolute left-1/2 top-[34%] h-28 w-44 -translate-x-1/2 rounded-[28px] border-4" style={shared} />;
    case "charger":
      return (
        <>
          <div className="absolute left-1/2 top-[34%] h-28 w-36 -translate-x-1/2 rounded-[28px] border-4" style={shared} />
          <div className="absolute left-[42%] top-[28%] h-6 w-2 rounded-full" style={{ backgroundColor: colors.base }} />
          <div className="absolute right-[42%] top-[28%] h-6 w-2 rounded-full" style={{ backgroundColor: colors.base }} />
        </>
      );
    default:
      return null;
  }
}

export function ProductVisual({
  visual,
  locale = "en",
  className,
}: {
  visual: ProductVisualType;
  locale?: Locale;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[32px] border border-white/40 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.82),_transparent_48%),linear-gradient(180deg,#faf7f1_0%,#efe8dd_100%)]",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(circle at 78% 18%, ${visual.palette.glow}, transparent 30%), linear-gradient(135deg, ${visual.palette.surface} 0%, ${visual.palette.surface} 25%, transparent 100%)`,
        }}
      />
      <div
        className="absolute -right-12 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: `${visual.palette.accent}66` }}
      />
      <div
        className="absolute -bottom-10 -left-8 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: `${visual.palette.base}22` }}
      />
      <div className="absolute inset-0">{renderDevice(visual.kind, visual.palette)}</div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/35 bg-white/60 px-5 py-4 backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
          {visual.label[locale]}
        </p>
        <p className="text-sm text-slate-600">{visual.caption[locale]}</p>
      </div>
    </div>
  );
}
