"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getPromotionByCode, initialCart, initialWishlist } from "@/lib/catalog";
import { defaultLocale } from "@/lib/i18n";
import { serialiseSelections } from "@/lib/utils";
import type { CartItem, Locale } from "@/types";

type ShippingMethod = "complimentary" | "express" | "studio";

type CommerceState = {
  cart: CartItem[];
  wishlist: string[];
  appliedCoupon?: string;
  shippingMethod: ShippingMethod;
  localePreference: Locale;
  lastOrderNumber?: string;
  addToCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  removeFromCart: (item: CartItem) => void;
  moveToWishlist: (item: CartItem) => void;
  toggleWishlist: (productSlug: string) => void;
  moveWishlistToCart: (productSlug: string, selections?: Record<string, string>) => void;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setLocalePreference: (locale: Locale) => void;
  completeCheckout: (orderNumber: string) => void;
};

function isSameLineItem(a: CartItem, b: CartItem) {
  return (
    a.productSlug === b.productSlug &&
    serialiseSelections(a.selections) === serialiseSelections(b.selections)
  );
}

export const useCommerceStore = create<CommerceState>()(
  persist(
    (set) => ({
      cart: initialCart,
      wishlist: initialWishlist,
      appliedCoupon: "FIRSTLIGHT",
      shippingMethod: "complimentary",
      localePreference: defaultLocale,
      lastOrderNumber: undefined,
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((entry) => isSameLineItem(entry, item));

          if (!existing) {
            return {
              cart: [...state.cart, item],
            };
          }

          return {
            cart: state.cart.map((entry) =>
              isSameLineItem(entry, item)
                ? { ...entry, quantity: entry.quantity + item.quantity }
                : entry,
            ),
          };
        }),
      updateQuantity: (item, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((entry) => !isSameLineItem(entry, item))
              : state.cart.map((entry) =>
                  isSameLineItem(entry, item) ? { ...entry, quantity } : entry,
                ),
        })),
      removeFromCart: (item) =>
        set((state) => ({
          cart: state.cart.filter((entry) => !isSameLineItem(entry, item)),
        })),
      moveToWishlist: (item) =>
        set((state) => ({
          cart: state.cart.filter((entry) => !isSameLineItem(entry, item)),
          wishlist: state.wishlist.includes(item.productSlug)
            ? state.wishlist
            : [...state.wishlist, item.productSlug],
        })),
      toggleWishlist: (productSlug) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productSlug)
            ? state.wishlist.filter((slug) => slug !== productSlug)
            : [productSlug, ...state.wishlist],
        })),
      moveWishlistToCart: (productSlug, selections = {}) =>
        set((state) => ({
          cart: [...state.cart, { productSlug, quantity: 1, selections }],
          wishlist: state.wishlist.filter((slug) => slug !== productSlug),
        })),
      applyCoupon: (code) => {
        const promotion = getPromotionByCode(code);

        if (!promotion) {
          return false;
        }

        set({
          appliedCoupon: promotion.code,
        });

        return true;
      },
      clearCoupon: () => set({ appliedCoupon: undefined }),
      setShippingMethod: (shippingMethod) => set({ shippingMethod }),
      setLocalePreference: (localePreference) => set({ localePreference }),
      completeCheckout: (orderNumber) =>
        set({
          cart: [],
          appliedCoupon: undefined,
          lastOrderNumber: orderNumber,
        }),
    }),
    {
      name: "velora-commerce",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        appliedCoupon: state.appliedCoupon,
        shippingMethod: state.shippingMethod,
        localePreference: state.localePreference,
        lastOrderNumber: state.lastOrderNumber,
      }),
    },
  ),
);
