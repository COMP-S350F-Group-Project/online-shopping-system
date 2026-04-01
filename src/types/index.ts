export type Locale = "en" | "zh-Hant";

export type LocalizedText = Record<Locale, string>;

export type StockState = "in-stock" | "low" | "preorder";

export type ShippingMethod = "complimentary" | "express" | "studio";

export type VariantDisplay = "swatch" | "button";

export type ProductVisualKind =
  | "headphones"
  | "speaker"
  | "earbuds"
  | "dock"
  | "display"
  | "keyboard"
  | "lamp"
  | "diffuser"
  | "hub"
  | "weekender"
  | "sling"
  | "wallet"
  | "charger";

export type ProductVisual = {
  id: string;
  label: LocalizedText;
  kind: ProductVisualKind;
  palette: {
    base: string;
    glow: string;
    accent: string;
    surface: string;
  };
  caption: LocalizedText;
};

export type ProductVariantOption = {
  id: string;
  label: LocalizedText;
  value: string;
  hex?: string;
  surcharge?: number;
};

export type ProductVariantGroup = {
  id: string;
  name: LocalizedText;
  display: VariantDisplay;
  options: ProductVariantOption[];
};

export type ProductFeature = {
  title: LocalizedText;
  description: LocalizedText;
};

export type ProductSpecificationItem = {
  label: LocalizedText;
  value: LocalizedText;
};

export type ProductSpecificationGroup = {
  title: LocalizedText;
  items: ProductSpecificationItem[];
};

export type ProductFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type ProductReview = {
  id: string;
  author: string;
  location: LocalizedText;
  rating: number;
  title: LocalizedText;
  body: LocalizedText;
  date: string;
};

export type Product = {
  slug: string;
  category: string;
  collection: string;
  tags: string[];
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  stockState: StockState;
  stockCount: number;
  highlights: LocalizedText[];
  variants: ProductVariantGroup[];
  defaultVariantSelection: Record<string, string>;
  visuals: ProductVisual[];
  features: ProductFeature[];
  specifications: ProductSpecificationGroup[];
  faq: ProductFaq[];
  shipping: {
    dispatch: LocalizedText;
    delivery: LocalizedText;
    returns: LocalizedText;
  };
  reviews: ProductReview[];
  relatedSlugs: string[];
  boughtTogetherSlugs: string[];
};

export type Category = {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  eyebrow: LocalizedText;
  heroTitle: LocalizedText;
  heroCopy: LocalizedText;
};

export type Collection = {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
};

export type Promotion = {
  code: string;
  title: LocalizedText;
  description: LocalizedText;
  minimumSpend: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  badge: LocalizedText;
};

export type CartItem = {
  productSlug: string;
  quantity: number;
  selections: Record<string, string>;
};

export type OrderItem = CartItem;

export type TrackingEvent = {
  label: LocalizedText;
  description: LocalizedText;
  timestamp: string;
  complete: boolean;
};

export type OrderStatus = "processing" | "in-transit" | "delivered";

export type PostalAddress = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
};

export type CustomerOrder = {
  id: string;
  number: string;
  placedAt: string;
  status: OrderStatus;
  paymentMethod: string;
  trackingNumber: string;
  shippingMethod: ShippingMethod;
  shippingAddress: PostalAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  timeline: TrackingEvent[];
};

export type CheckoutSnapshot = {
  orderNumber: string;
  placedAt: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: PostalAddress;
  shippingMethod: ShippingMethod;
  paymentLabel: string;
  orderNotes?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

export type SupportArticle = {
  id: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText;
  category: string;
};

export type SupportChannel = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  value: string;
};

export type StoryBlock = {
  title: LocalizedText;
  body: LocalizedText;
};

export type ContentLink = {
  id: string;
  href: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type LabelValue = {
  label: LocalizedText;
  value: LocalizedText;
};

export type SearchTerm = {
  id: string;
  label: LocalizedText;
  query: LocalizedText;
};

export type PredictiveSearchLink = {
  id: string;
  href: string;
  label: string;
  description?: string;
  kind: "query" | "category" | "collection";
};

export type PredictiveSearchProduct = {
  id: string;
  href: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  stockState: StockState;
};

export type PredictiveSearchPayload = {
  query: string;
  totalResults: number;
  queries: PredictiveSearchLink[];
  categories: PredictiveSearchLink[];
  collections: PredictiveSearchLink[];
  products: PredictiveSearchProduct[];
};

export type AdminMetric = {
  label: LocalizedText;
  value: string;
  delta: LocalizedText;
};

export type AdminQueueItem = {
  id: string;
  title: LocalizedText;
  detail: LocalizedText;
  status: LocalizedText;
};
