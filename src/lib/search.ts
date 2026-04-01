import { categories, getCategoryBySlug, products } from "@/lib/catalog";
import { collections, searchPopularTerms } from "@/lib/site";
import type { Locale, PredictiveSearchPayload, Product } from "@/types";

const searchIntentGroups = [
  {
    id: "noise-cancelling",
    aliases: ["noise cancelling", "noise canceling", "anc", "quiet mode", "降噪", "降噪耳機", "靜音"],
  },
  {
    id: "travel",
    aliases: ["travel", "carry", "commute", "transit", "flight", "journey", "旅行", "通勤", "出差"],
  },
  {
    id: "workspace",
    aliases: ["workspace", "desk", "typing", "setup", "desk light", "lamp", "工作", "桌面", "桌燈", "鍵盤"],
  },
  {
    id: "smart-living",
    aliases: ["smart home", "smart living", "home", "ambient", "calendar", "智慧家居", "智慧生活", "居家", "香氛"],
  },
  {
    id: "power",
    aliases: ["charger", "gan", "usb c", "dock", "power", "charging", "充電器", "充電", "供電", "底座"],
  },
  {
    id: "audio",
    aliases: ["audio", "speaker", "earbuds", "headphones", "sound", "音訊", "音箱", "耳機"],
  },
  {
    id: "carry",
    aliases: ["bag", "sling", "wallet", "weekender", "leather", "收納", "皮件", "旅行袋", "隨行"],
  },
] as const;

const categoryAliases: Record<string, string[]> = {
  audio: ["audio", "speaker", "headphones", "earbuds", "noise cancelling", "音訊", "耳機", "音箱", "降噪"],
  workspace: ["workspace", "keyboard", "desk light", "lamp", "desk", "工作桌面", "鍵盤", "桌燈", "工作"],
  "smart-living": ["smart home", "smart living", "home", "display", "diffuser", "智慧家居", "智慧生活", "居家", "顯示器"],
  "personal-carry": ["bag", "sling", "wallet", "weekender", "carry", "旅行袋", "收納", "皮夾", "隨行收納"],
  "travel-power": ["charger", "dock", "gan", "power", "travel power", "旅途供電", "充電器", "供電", "底座"],
};

const collectionAliases: Record<string, string[]> = {
  "spring-edit": ["spring edit", "gift set", "seasonal", "best sellers", "春季選品", "送禮套裝", "熱門"],
  "quiet-motion": ["quiet motion", "travel audio", "commute", "靜謐行旅", "通勤", "旅途"],
  "studio-living": ["studio living", "desk setup", "home office", "居家工作場景", "桌面", "居家工作"],
};

function normalizeSearchValue(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeSearchValue(value: string) {
  return normalizeSearchValue(value)
    .split(" ")
    .filter((token) => token.length > 1);
}

function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

function scoreText(value: string, query: string, tokens: string[]) {
  if (!value) {
    return 0;
  }

  let score = 0;
  const isShortLatinQuery = /[a-z]/.test(query) && query.length <= 3;
  const words = value.split(/[\s-]+/).filter(Boolean);

  if (value === query) {
    score += 120;
  } else if (isShortLatinQuery && words.includes(query)) {
    score += 88;
  } else if (isShortLatinQuery && words.some((word) => word.startsWith(query))) {
    score += 42;
  } else if (value.startsWith(query)) {
    score += 72;
  } else if (!isShortLatinQuery && value.includes(query)) {
    score += 38;
  }

  for (const token of tokens) {
    const isShortLatinToken = /[a-z]/.test(token) && token.length <= 3;

    if (value === token) {
      score += 28;
    } else if (isShortLatinToken && words.includes(token)) {
      score += 22;
    } else if (isShortLatinToken && words.some((word) => word.startsWith(token))) {
      score += 12;
    } else if (value.startsWith(token)) {
      score += 16;
    } else if (!isShortLatinToken && value.includes(token)) {
      score += 10;
    }
  }

  return score;
}

function getMatchedIntentIds(query: string, tokens: string[]) {
  return searchIntentGroups
    .filter((group) =>
      group.aliases.some((alias) => {
        const normalizedAlias = normalizeSearchValue(alias);
        return (
          normalizedAlias.includes(query) ||
          query.includes(normalizedAlias) ||
          tokens.some((token) => normalizedAlias.includes(token) || token.includes(normalizedAlias))
        );
      }),
    )
    .map((group) => group.id);
}

function scoreAliasGroup(aliases: string[], query: string, tokens: string[]) {
  return aliases.reduce((total, alias) => total + scoreText(normalizeSearchValue(alias), query, tokens), 0);
}

function matchesAliasInText(text: string, alias: string) {
  const normalizedAlias = normalizeSearchValue(alias);
  const isShortLatinAlias = /[a-z]/.test(normalizedAlias) && normalizedAlias.length <= 3;

  if (isShortLatinAlias) {
    return text.split(/[\s-]+/).includes(normalizedAlias);
  }

  return text.includes(normalizedAlias);
}

function getProductSearchScore(product: Product, query: string, tokens: string[]) {
  const normalizedNameEn = normalizeSearchValue(product.name.en);
  const normalizedNameZh = normalizeSearchValue(product.name["zh-Hant"]);
  const normalizedShortEn = normalizeSearchValue(product.shortDescription.en);
  const normalizedShortZh = normalizeSearchValue(product.shortDescription["zh-Hant"]);
  const normalizedDescriptionEn = normalizeSearchValue(product.description.en);
  const normalizedDescriptionZh = normalizeSearchValue(product.description["zh-Hant"]);
  const normalizedTags = product.tags.map((tag) => normalizeSearchValue(tag));
  const normalizedSlug = normalizeSearchValue(product.slug.replaceAll("-", " "));
  const category = getCategoryBySlug(product.category);
  const collection = getCollectionBySlug(product.collection);
  const categoryLabels = category
    ? [normalizeSearchValue(category.name.en), normalizeSearchValue(category.name["zh-Hant"])]
    : [];
  const collectionLabels = collection
    ? [normalizeSearchValue(collection.name.en), normalizeSearchValue(collection.name["zh-Hant"])]
    : [];
  const matchedIntentIds = getMatchedIntentIds(query, tokens);

  let score = 0;

  score += scoreText(normalizedNameEn, query, tokens) * 1.35;
  score += scoreText(normalizedNameZh, query, tokens) * 1.35;
  score += scoreText(normalizedSlug, query, tokens) * 1.25;
  score += scoreText(normalizedShortEn, query, tokens) * 0.9;
  score += scoreText(normalizedShortZh, query, tokens) * 0.9;
  score += scoreText(normalizedDescriptionEn, query, tokens) * 0.35;
  score += scoreText(normalizedDescriptionZh, query, tokens) * 0.35;
  score += normalizedTags.reduce((total, tag) => total + scoreText(tag, query, tokens) * 1.15, 0);
  score += categoryLabels.reduce((total, label) => total + scoreText(label, query, tokens), 0);
  score += collectionLabels.reduce((total, label) => total + scoreText(label, query, tokens) * 0.9, 0);
  score += scoreAliasGroup(categoryAliases[product.category] ?? [], query, tokens);
  score += scoreAliasGroup(collectionAliases[product.collection] ?? [], query, tokens) * 0.8;

  for (const intentId of matchedIntentIds) {
    const intent = searchIntentGroups.find((group) => group.id === intentId);
    if (!intent) {
      continue;
    }

    const haystack = [
      normalizedNameEn,
      normalizedNameZh,
      normalizedShortEn,
      normalizedShortZh,
      normalizedDescriptionEn,
      normalizedDescriptionZh,
      normalizedSlug,
      ...normalizedTags,
    ].join(" ");

    if (intent.aliases.some((alias) => matchesAliasInText(haystack, alias))) {
      score += 24;
    }
  }

  if (tokens.length > 1) {
    const combinedText = [
      normalizedNameEn,
      normalizedNameZh,
      normalizedShortEn,
      normalizedShortZh,
      normalizedDescriptionEn,
      normalizedDescriptionZh,
      normalizedSlug,
      ...normalizedTags,
      ...categoryLabels,
      ...collectionLabels,
    ].join(" ");

    if (tokens.every((token) => combinedText.includes(token))) {
      score += 28;
    }
  }

  return score > 0 ? score + product.rating * 2 + Math.min(product.reviewCount / 14, 16) : 0;
}

function buildRelatedQueries(query: string, locale: Locale) {
  const normalizedQuery = normalizeSearchValue(query);
  const tokens = tokenizeSearchValue(query);
  const matchedIntentIds = getMatchedIntentIds(normalizedQuery, tokens);

  return searchPopularTerms
    .map((term) => {
      const normalizedTerm = normalizeSearchValue(term.query[locale]);
      let score = scoreText(normalizedTerm, normalizedQuery, tokens);
      const termIntentIds = getMatchedIntentIds(normalizedTerm, tokenizeSearchValue(term.query[locale]));

      if (termIntentIds.some((intentId) => matchedIntentIds.includes(intentId))) {
        score += 32;
      }

      return {
        label: term.query[locale],
        score,
      };
    })
    .filter((term) => term.label !== query && term.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 5)
    .map((term) => term.label);
}

function getMatchingCategories(query: string, tokens: string[], matchedProducts: Product[]) {
  return categories
    .map((category) => {
      const categoryScore =
        scoreText(normalizeSearchValue(category.name.en), query, tokens) +
        scoreText(normalizeSearchValue(category.name["zh-Hant"]), query, tokens) +
        scoreAliasGroup(categoryAliases[category.slug] ?? [], query, tokens);

      const productScore = matchedProducts.some((product) => product.category === category.slug) ? 18 : 0;

      return {
        category,
        score: categoryScore + productScore,
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.category);
}

function getMatchingCollections(query: string, tokens: string[], matchedProducts: Product[]) {
  return collections
    .map((collection) => {
      const collectionScore =
        scoreText(normalizeSearchValue(collection.name.en), query, tokens) +
        scoreText(normalizeSearchValue(collection.name["zh-Hant"]), query, tokens) +
        scoreAliasGroup(collectionAliases[collection.slug] ?? [], query, tokens);

      const productScore = matchedProducts.some((product) => product.collection === collection.slug) ? 16 : 0;

      return {
        collection,
        score: collectionScore + productScore,
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.collection);
}

export function searchProducts({
  items = products,
  query,
  category,
  collection,
  locale = "en",
}: {
  items?: Product[];
  query?: string;
  category?: string;
  collection?: string;
  locale?: Locale;
}) {
  const normalizedQuery = normalizeSearchValue(query ?? "");
  const tokens = tokenizeSearchValue(query ?? "");
  const minimumScore = /[a-z]/.test(normalizedQuery) && normalizedQuery.length <= 3 ? 24 : 0;

  if (!normalizedQuery) {
    const filtered = items.filter((product) => {
      const categoryMatch = category ? product.category === category : true;
      const collectionMatch = collection ? product.collection === collection : true;
      return categoryMatch && collectionMatch;
    });

    return {
      results: filtered,
      matchingCategories: categories.filter((entry) => filtered.some((product) => product.category === entry.slug)),
      matchingCollections: collections.filter((entry) => filtered.some((product) => product.collection === entry.slug)),
      relatedQueries: [] as string[],
    };
  }

  const scored = items
    .map((product) => ({
      product,
      score: getProductSearchScore(product, normalizedQuery, tokens),
    }))
    .filter((entry) => entry.score > minimumScore)
    .filter((entry) => (category ? entry.product.category === category : true))
    .filter((entry) => (collection ? entry.product.collection === collection : true))
    .sort((left, right) => right.score - left.score);

  const results = scored.map((entry) => entry.product);

  return {
    results,
    matchingCategories: getMatchingCategories(normalizedQuery, tokens, results),
    matchingCollections: getMatchingCollections(normalizedQuery, tokens, results),
    relatedQueries: buildRelatedQueries(query ?? "", locale),
  };
}

export function buildPredictiveSearchPayload(query: string, locale: Locale): PredictiveSearchPayload {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery || normalizedQuery.length < 2) {
    return {
      query,
      totalResults: 0,
      queries: [],
      categories: [],
      collections: [],
      products: [],
    };
  }

  const { results, matchingCategories, matchingCollections } = searchProducts({ query, locale });
  const querySuggestions = buildRelatedQueries(query, locale);

  return {
    query,
    totalResults: results.length,
    queries: querySuggestions.slice(0, 4).map((term) => ({
      id: `query-${normalizeSearchValue(term).replaceAll(" ", "-")}`,
      href: `/${locale}/search?q=${encodeURIComponent(term)}`,
      label: term,
      kind: "query",
    })),
    categories: matchingCategories.slice(0, 3).map((category) => ({
      id: `category-${category.slug}`,
      href: `/${locale}/categories/${category.slug}`,
      label: category.name[locale],
      description: category.description[locale],
      kind: "category",
    })),
    collections: matchingCollections.slice(0, 3).map((collection) => ({
      id: `collection-${collection.slug}`,
      href: `/${locale}/search?collection=${collection.slug}`,
      label: collection.name[locale],
      description: collection.description[locale],
      kind: "collection",
    })),
    products: results.slice(0, 4).map((product) => ({
      id: `product-${product.slug}`,
      href: `/${locale}/products/${product.slug}`,
      title: product.name[locale],
      description: product.shortDescription[locale],
      category: getCategoryBySlug(product.category)?.name[locale] ?? "",
      price: product.price,
      rating: product.rating,
      reviewCount: product.reviewCount,
      stockState: product.stockState,
    })),
  };
}
