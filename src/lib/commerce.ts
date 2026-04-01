import { getProductBySlug, getProductPriceForSelection, getPromotionByCode } from "@/lib/catalog";
import { localize, localizedText } from "@/lib/i18n";
import type { CartItem, Locale, ShippingMethod } from "@/types";

export const shippingFees: Record<ShippingMethod, number> = {
  complimentary: 0,
  express: 90,
  studio: 0,
};

const shippingContent = {
  complimentary: {
    label: localizedText("Complimentary delivery", "免運配送"),
    promise: localizedText("Arrives in 2 to 4 business days", "約 2 至 4 個工作天送達"),
    detail: localizedText(
      "Handled through Velora’s standard courier network with full milestone updates.",
      "由 Velora 合作快遞配送，並提供完整物流節點通知。",
    ),
  },
  express: {
    label: localizedText("Express courier", "快遞配送"),
    promise: localizedText("Priority arrival in 1 to 2 business days", "優先安排，約 1 至 2 個工作天送達"),
    detail: localizedText(
      "Priority handling with tighter handoff windows for time-sensitive orders.",
      "提供更緊密的交付節奏，適合時效要求較高的訂單。",
    ),
  },
  studio: {
    label: localizedText("Studio pickup", "工作室取貨"),
    promise: localizedText("Ready within 24 hours", "約 24 小時內可安排取貨"),
    detail: localizedText(
      "Collect from the Velora studio with a reserved pickup window and gift inspection.",
      "可於 Velora 工作室取貨，並預留取貨時段與禮品確認服務。",
    ),
  },
} as const;

export function getShippingOptionContent(
  shippingMethod: ShippingMethod,
  locale: Locale,
) {
  const content = shippingContent[shippingMethod];

  return {
    label: localize(content.label, locale),
    promise: localize(content.promise, locale),
    detail: localize(content.detail, locale),
    fee: shippingFees[shippingMethod],
  };
}

export function calculateOrderSummary(
  cart: CartItem[],
  appliedCoupon: string | undefined,
  shippingMethod: ShippingMethod,
) {
  const subtotal = cart.reduce((sum, item) => {
    const product = getProductBySlug(item.productSlug);
    if (!product) {
      return sum;
    }

    return sum + getProductPriceForSelection(product, item.selections) * item.quantity;
  }, 0);

  const promotion = appliedCoupon ? getPromotionByCode(appliedCoupon) : undefined;
  const discount =
    promotion && subtotal >= promotion.minimumSpend
      ? promotion.discountType === "fixed"
        ? promotion.discountValue
        : Math.round((subtotal * promotion.discountValue) / 100)
      : 0;
  const shipping = shippingFees[shippingMethod];
  const tax = Math.round((subtotal - discount) * 0.03);

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total: subtotal - discount + shipping + tax,
  };
}
