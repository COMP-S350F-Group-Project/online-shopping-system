import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isSupportedLocale } from "@/lib/i18n";
import { buildPredictiveSearchPayload } from "@/lib/search";

export function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.slice(0, 80) ?? "";
  const localeParam = request.nextUrl.searchParams.get("locale") ?? defaultLocale;
  const locale = isSupportedLocale(localeParam) ? localeParam : defaultLocale;

  return NextResponse.json(buildPredictiveSearchPayload(query, locale), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
