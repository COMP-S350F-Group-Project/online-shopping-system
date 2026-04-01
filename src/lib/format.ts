import type { CustomerOrder, Locale, OrderStatus, Product } from "@/types";

const localeMap: Record<Locale, string> = {
  en: "en-HK",
  "zh-Hant": "zh-HK",
};

export function formatCurrency(
  value: number,
  locale: Locale,
  currency = "HKD",
) {
  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeMap[locale], {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function sortProducts(
  products: Product[],
  sort: string,
  search?: string,
) {
  const query = search?.trim().toLowerCase();
  const filtered = query
    ? products.filter((product) => {
        const haystack = [
          product.slug,
          product.category,
          product.collection,
          product.name.en,
          product.name["zh-Hant"],
          product.shortDescription.en,
          product.shortDescription["zh-Hant"],
          product.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(query);
      })
    : products;

  const nextProducts = [...filtered];

  switch (sort) {
    case "price-asc":
      return nextProducts.sort((a, b) => a.price - b.price);
    case "price-desc":
      return nextProducts.sort((a, b) => b.price - a.price);
    case "rating":
      return nextProducts.sort((a, b) => b.rating - a.rating);
    case "latest":
      return nextProducts.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return nextProducts.sort((a, b) => a.name.en.localeCompare(b.name.en));
  }
}

export function getOrderStatusTone(status: OrderStatus) {
  switch (status) {
    case "delivered":
      return "bg-emerald-500/10 text-emerald-700";
    case "in-transit":
      return "bg-amber-500/10 text-amber-700";
    default:
      return "bg-slate-900/5 text-slate-700";
  }
}

export function getOrderProgress(order: CustomerOrder) {
  const completed = order.timeline.filter((entry) => entry.complete).length;
  return Math.round((completed / order.timeline.length) * 100);
}

export function formatOrderStatus(status: OrderStatus, locale: Locale) {
  const labels = {
    processing: {
      en: "Processing",
      "zh-Hant": "處理中",
    },
    "in-transit": {
      en: "In transit",
      "zh-Hant": "配送途中",
    },
    delivered: {
      en: "Delivered",
      "zh-Hant": "已送達",
    },
  } as const;

  return labels[status][locale];
}
