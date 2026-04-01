import type { MetadataRoute } from "next";

import { categories, products } from "@/lib/catalog";
import { locales } from "@/lib/i18n";

const staticRoutes = [
  "",
  "/shop",
  "/offers",
  "/about",
  "/help",
  "/contact",
  "/wishlist",
  "/cart",
  "/checkout",
  "/account",
  "/account/orders",
  "/account/tracking",
  "/auth/sign-in",
  "/auth/sign-up",
  "/admin",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...locales.flatMap((locale) =>
      staticRoutes.map((route) => ({
        url: `https://velora.house/${locale}${route}`,
        lastModified: now,
      })),
    ),
    ...locales.flatMap((locale) =>
      categories.map((category) => ({
        url: `https://velora.house/${locale}/categories/${category.slug}`,
        lastModified: now,
      })),
    ),
    ...locales.flatMap((locale) =>
      products.map((product) => ({
        url: `https://velora.house/${locale}/products/${product.slug}`,
        lastModified: now,
      })),
    ),
  ];
}
