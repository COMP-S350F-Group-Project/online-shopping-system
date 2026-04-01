"use client";

import type React from "react";
import { startTransition, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock3,
  CreditCard,
  LoaderCircle,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  accountProfile,
  getProductBySlug,
  getProductPriceForSelection,
  getSelectionSummary,
  sampleOrders,
} from "@/lib/catalog";
import { calculateOrderSummary, getShippingOptionContent } from "@/lib/commerce";
import { formatCurrency } from "@/lib/format";
import { useCommerceStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Locale, ShippingMethod } from "@/types";

const [defaultFirstName, defaultLastName] = accountProfile.name.split(" ");
const defaultAddress = sampleOrders[0]?.shippingAddress;

const shippingMethods: ShippingMethod[] = ["complimentary", "express", "studio"];

function FieldLabel({
  children,
  htmlFor,
}: {
  children: string;
  htmlFor: string;
}) {
  return (
    <label className="mb-2 block text-sm font-semibold text-[var(--ink)]" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

function SectionPanel({
  children,
  title,
  copy,
}: React.PropsWithChildren<{
  title: string;
  copy?: string;
}>) {
  return (
    <section className="rounded-[32px] border border-[var(--line)] bg-white/75 p-5 backdrop-blur md:p-6">
      <div className="mb-5 space-y-2">
        <h2 className="font-display text-[1.7rem] leading-tight md:text-3xl">{title}</h2>
        {copy ? <p className="text-sm leading-7 text-slate-600">{copy}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function CheckoutExperience({ locale }: { locale: Locale }) {
  const router = useRouter();
  const t = useTranslations();
  const cart = useCommerceStore((state) => state.cart);
  const appliedCoupon = useCommerceStore((state) => state.appliedCoupon);
  const shippingMethod = useCommerceStore((state) => state.shippingMethod);
  const setShippingMethod = useCommerceStore((state) => state.setShippingMethod);
  const completeCheckout = useCommerceStore((state) => state.completeCheckout);
  const [paymentMode, setPaymentMode] = useState<"saved" | "new">("saved");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStage, setSubmissionStage] = useState<"idle" | "authorizing" | "finalizing">(
    "idle",
  );

  const summary = useMemo(
    () => calculateOrderSummary(cart, appliedCoupon, shippingMethod),
    [appliedCoupon, cart, shippingMethod],
  );
  const selectedShipping = getShippingOptionContent(shippingMethod, locale);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <EmptyState
        description={
          locale === "zh-Hant"
            ? "你的購物袋目前沒有商品，請先加入想購買的內容後再進行結帳。"
            : "Your bag is currently empty. Add products before continuing to checkout."
        }
        locale={locale}
        primaryHref="/shop"
        primaryLabel={locale === "zh-Hant" ? "前往選購" : "Browse the collection"}
        secondaryHref="/cart"
        secondaryLabel={locale === "zh-Hant" ? "返回購物袋" : "Return to bag"}
        title={locale === "zh-Hant" ? "尚未有可結帳商品" : "Nothing ready for checkout"}
      />
    );
  }

  const orderButtonLabel =
    submissionStage === "authorizing"
      ? t("checkout.authorizing")
      : submissionStage === "finalizing"
        ? t("checkout.finalizing")
        : t("checkout.placeOrder");

  return (
    <div className="grid gap-8 pb-28 lg:grid-cols-[1.14fr_0.86fr] lg:pb-0">
      <form
        id="checkout-form"
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const firstName = String(formData.get("firstName") ?? "").trim();
          const lastName = String(formData.get("lastName") ?? "").trim();
          const email = String(formData.get("email") ?? "").trim();
          const phone = String(formData.get("phone") ?? "").trim();
          const line1 = String(formData.get("line1") ?? "").trim();
          const line2 = String(formData.get("line2") ?? "").trim();
          const city = String(formData.get("city") ?? "").trim();
          const region = String(formData.get("region") ?? "").trim();
          const postcode = String(formData.get("postcode") ?? "").trim();
          const orderNotes = String(formData.get("orderNotes") ?? "").trim();
          const cardNumber = String(formData.get("cardNumber") ?? "").replace(/\s+/g, "");
          const last4 = cardNumber.replace(/\D/g, "").slice(-4) || "0488";
          const orderNumber = `VLR-${Math.floor(10000 + Math.random() * 89999)}`;
          const paymentLabel =
            paymentMode === "saved"
              ? accountProfile.defaultPayment[locale]
              : locale === "zh-Hant"
                ? `Visa 尾號 ${last4}`
                : `Visa ending ${last4}`;

          setIsSubmitting(true);
          setSubmissionStage("authorizing");

          window.setTimeout(() => {
            setSubmissionStage("finalizing");

            completeCheckout({
              orderNumber,
              placedAt: new Date().toISOString(),
              contact: {
                firstName,
                lastName,
                email,
                phone,
              },
              shippingAddress: {
                name: `${firstName} ${lastName}`.trim(),
                line1,
                line2: line2 || undefined,
                city,
                region,
                postcode,
                country: locale === "zh-Hant" ? "香港特別行政區" : "Hong Kong SAR",
              },
              shippingMethod,
              paymentLabel,
              orderNotes: orderNotes || undefined,
              items: cart,
              ...summary,
            });

            startTransition(() => {
              router.push(`/${locale}/checkout/confirmation?order=${orderNumber}`);
            });
          }, 700);
        }}
      >
        <div className="grid auto-cols-[minmax(220px,82%)] grid-flow-col gap-3 overflow-x-auto pb-1 md:grid-cols-3 md:grid-flow-row md:auto-cols-auto md:overflow-visible">
          {[
            {
              icon: LockKeyhole,
              title: t("checkout.assuranceSecureTitle"),
              copy: t("checkout.assuranceSecureCopy"),
            },
            {
              icon: Clock3,
              title: t("checkout.assuranceDeliveryTitle"),
              copy: t("checkout.assuranceDeliveryCopy"),
            },
            {
              icon: PackageCheck,
              title: t("checkout.assuranceAftercareTitle"),
              copy: t("checkout.assuranceAftercareCopy"),
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-[var(--line)] bg-white/70 px-5 py-4"
            >
              <item.icon className="h-5 w-5 text-[var(--accent)]" />
              <p className="mt-4 text-sm font-semibold text-[var(--ink)]">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.copy}</p>
            </div>
          ))}
        </div>

        <SectionPanel copy={t("checkout.contactCopy")} title={t("checkout.contact")}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="checkout-first-name">{t("auth.firstName")}</FieldLabel>
              <Input
                autoComplete="given-name"
                defaultValue={defaultFirstName}
                id="checkout-first-name"
                name="firstName"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="checkout-last-name">{t("auth.lastName")}</FieldLabel>
              <Input
                autoComplete="family-name"
                defaultValue={defaultLastName}
                id="checkout-last-name"
                name="lastName"
                required
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel htmlFor="checkout-email">{t("auth.email")}</FieldLabel>
              <Input
                autoComplete="email"
                defaultValue={accountProfile.email}
                id="checkout-email"
                name="email"
                required
                type="email"
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel htmlFor="checkout-phone">{t("common.phone")}</FieldLabel>
              <Input
                autoComplete="tel"
                defaultValue="+852 6123 4568"
                id="checkout-phone"
                name="phone"
                required
                type="tel"
              />
            </div>
          </div>
        </SectionPanel>

        <SectionPanel copy={t("checkout.deliveryMethodCopy")} title={t("checkout.deliveryMethod")}>
          <div aria-label={t("checkout.deliveryMethod")} className="grid gap-3" role="radiogroup">
            {shippingMethods.map((method) => {
              const option = getShippingOptionContent(method, locale);

              return (
                <button
                  aria-checked={method === shippingMethod}
                  aria-describedby={`checkout-shipping-${method}`}
                  key={method}
                  className={cn(
                    "rounded-[26px] border px-5 py-4 text-left transition",
                    method === shippingMethod
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-[0_18px_40px_rgba(163,127,76,0.08)]"
                      : "border-[var(--line)] bg-white/70 hover:bg-white",
                  )}
                  onClick={() => setShippingMethod(method)}
                  role="radio"
                  type="button"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--ink)]">{option.label}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{option.promise}</p>
                    </div>
                    <p className="text-sm font-semibold text-[var(--ink)]">
                      {option.fee ? formatCurrency(option.fee, locale) : t("common.free")}
                    </p>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-slate-500" id={`checkout-shipping-${method}`}>
                    {option.detail}
                  </p>
                </button>
              );
            })}
          </div>
        </SectionPanel>

        <SectionPanel copy={t("checkout.shippingAddressCopy")} title={t("checkout.shippingAddress")}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <FieldLabel htmlFor="checkout-line1">{t("checkout.addressLine1")}</FieldLabel>
              <Input
                autoComplete="address-line1"
                defaultValue={defaultAddress?.line1}
                id="checkout-line1"
                name="line1"
                required
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel htmlFor="checkout-line2">{t("checkout.addressLine2")}</FieldLabel>
              <Input
                autoComplete="address-line2"
                defaultValue={defaultAddress?.line2}
                id="checkout-line2"
                name="line2"
              />
            </div>
            <div>
              <FieldLabel htmlFor="checkout-city">{t("checkout.city")}</FieldLabel>
              <Input
                autoComplete="address-level2"
                defaultValue={defaultAddress?.city ?? (locale === "zh-Hant" ? "香港" : "Hong Kong")}
                id="checkout-city"
                name="city"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="checkout-region">{t("checkout.region")}</FieldLabel>
              <Input
                autoComplete="address-level1"
                defaultValue={
                  defaultAddress?.region ?? (locale === "zh-Hant" ? "香港島" : "Hong Kong Island")
                }
                id="checkout-region"
                name="region"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="checkout-postcode">{t("checkout.postcode")}</FieldLabel>
              <Input
                autoComplete="postal-code"
                defaultValue={defaultAddress?.postcode}
                id="checkout-postcode"
                name="postcode"
                placeholder={t("checkout.optional")}
              />
            </div>
            <div>
              <FieldLabel htmlFor="checkout-country">{t("checkout.country")}</FieldLabel>
              <Input
                defaultValue={locale === "zh-Hant" ? "香港特別行政區" : "Hong Kong SAR"}
                id="checkout-country"
                readOnly
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel htmlFor="checkout-order-notes">{t("checkout.orderNotes")}</FieldLabel>
              <Textarea
                id="checkout-order-notes"
                name="orderNotes"
                placeholder={t("checkout.orderNotesPlaceholder")}
              />
            </div>
          </div>
        </SectionPanel>

        <SectionPanel copy={t("checkout.paymentCopy")} title={t("checkout.payment")}>
          <div aria-label={t("checkout.payment")} className="grid gap-3 md:grid-cols-2" role="radiogroup">
            <button
              aria-checked={paymentMode === "saved"}
              aria-describedby="checkout-payment-saved"
              className={cn(
                "rounded-[26px] border px-5 py-4 text-left transition",
                paymentMode === "saved"
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--line)] bg-white/70 hover:bg-white",
              )}
              onClick={() => setPaymentMode("saved")}
              role="radio"
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[var(--ink)]">{t("checkout.savedCardTitle")}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {accountProfile.defaultPayment[locale]}
                  </p>
                </div>
                <CreditCard className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <p className="mt-3 text-xs leading-6 text-slate-500" id="checkout-payment-saved">
                {t("checkout.savedCardCopy")}
              </p>
            </button>

            <button
              aria-checked={paymentMode === "new"}
              aria-describedby="checkout-payment-new"
              className={cn(
                "rounded-[26px] border px-5 py-4 text-left transition",
                paymentMode === "new"
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--line)] bg-white/70 hover:bg-white",
              )}
              onClick={() => setPaymentMode("new")}
              role="radio"
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[var(--ink)]">{t("checkout.newCardTitle")}</p>
                </div>
                <ShieldCheck className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <p className="mt-3 text-xs leading-6 text-slate-500" id="checkout-payment-new">
                {t("checkout.newCardCopy")}
              </p>
            </button>
          </div>

          {paymentMode === "saved" ? (
            <div className="mt-5 rounded-[26px] border border-[var(--line)] bg-[var(--surface-strong)] p-5">
              <div className="grid gap-4 md:grid-cols-[1fr_0.32fr]">
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">{accountProfile.defaultPayment[locale]}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{t("checkout.savedCardSecurityCopy")}</p>
                </div>
                <div>
                  <FieldLabel htmlFor="checkout-saved-cvc">{t("checkout.cvc")}</FieldLabel>
                  <Input
                    autoComplete="cc-csc"
                    defaultValue="482"
                    id="checkout-saved-cvc"
                    inputMode="numeric"
                    required
                  />
                </div>
              </div>
              <input name="cardNumber" type="hidden" value="4835 2210 6842 1906" />
            </div>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <FieldLabel htmlFor="checkout-card-name">{t("checkout.cardName")}</FieldLabel>
                <Input
                  autoComplete="cc-name"
                  defaultValue={accountProfile.name}
                  id="checkout-card-name"
                  name="cardName"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <FieldLabel htmlFor="checkout-card-number">{t("checkout.cardNumber")}</FieldLabel>
                <Input
                  autoComplete="cc-number"
                  id="checkout-card-number"
                  inputMode="numeric"
                  name="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="checkout-expiry">{t("checkout.expiry")}</FieldLabel>
                <Input
                  autoComplete="cc-exp"
                  id="checkout-expiry"
                  inputMode="numeric"
                  name="expiry"
                  placeholder="08 / 29"
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="checkout-cvc">{t("checkout.cvc")}</FieldLabel>
                <Input
                  autoComplete="cc-csc"
                  id="checkout-cvc"
                  inputMode="numeric"
                  name="cvc"
                  placeholder="482"
                  required
                />
              </div>
            </div>
          )}
        </SectionPanel>

        <SectionPanel copy={t("checkout.reviewCopy")} title={t("checkout.reviewTitle")}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
              <p className="text-sm text-slate-500">{t("checkout.reviewContact")}</p>
              <p className="mt-2 font-semibold text-[var(--ink)]">{t("auth.email")}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {locale === "zh-Hant"
                  ? "訂單確認、付款通知與物流更新會寄送到上方填寫的電郵與電話。"
                  : "Order confirmation, payment updates, and shipping milestones will follow the contact details above."}
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--line)] bg-white/70 p-5">
              <p className="text-sm text-slate-500">{t("checkout.reviewDelivery")}</p>
              <p className="mt-2 font-semibold text-[var(--ink)]">{selectedShipping.label}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{selectedShipping.promise}</p>
            </div>
          </div>
        </SectionPanel>
      </form>

      <aside className="order-first space-y-5 lg:order-none lg:sticky lg:top-24 lg:self-start">
        <div
          className="rounded-[32px] border border-[var(--line)] bg-white/75 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.05)] backdrop-blur md:p-6"
          id="checkout-summary"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-[1.7rem] leading-tight md:text-3xl">
                {t("cartPage.summaryTitle")}
              </h2>
              <p className="text-sm text-slate-500">
                {locale === "zh-Hant" ? `${itemCount} 件商品` : `${itemCount} items`}
              </p>
            </div>

            <div className="space-y-4">
              {cart.map((item) => {
                const product = getProductBySlug(item.productSlug);
                if (!product) {
                  return null;
                }

                return (
                  <div
                    key={`${item.productSlug}-${JSON.stringify(item.selections)}`}
                    className="rounded-[24px] border border-[var(--line)] bg-white/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-[var(--ink)]">{product.name[locale]}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {getSelectionSummary(product, item.selections, locale)}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">× {item.quantity}</p>
                      </div>
                      <p className="font-medium text-[var(--ink)]">
                        {formatCurrency(
                          getProductPriceForSelection(product, item.selections) * item.quantity,
                          locale,
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[24px] bg-[var(--surface-strong)] px-4 py-4">
              <p className="text-sm font-semibold text-[var(--ink)]">{selectedShipping.label}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{selectedShipping.promise}</p>
              <p className="mt-2 text-xs leading-6 text-slate-500">{selectedShipping.detail}</p>
            </div>

            <div className="space-y-3 border-t border-[var(--line)] pt-4 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>{t("common.subtotal")}</span>
                <span>{formatCurrency(summary.subtotal, locale)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t("common.discount")}</span>
                <span>{summary.discount ? `-${formatCurrency(summary.discount, locale)}` : "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t("common.shipping")}</span>
                <span>{summary.shipping ? formatCurrency(summary.shipping, locale) : "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t("common.tax")}</span>
                <span>{formatCurrency(summary.tax, locale)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--line)] pt-4 text-lg font-semibold text-[var(--ink)]">
              <span>{t("common.total")}</span>
              <span>{formatCurrency(summary.total, locale)}</span>
            </div>

            <div className="rounded-[24px] border border-[var(--line)] bg-white/60 p-4">
              <p className="text-sm font-semibold text-[var(--ink)]">{t("checkout.secureSummaryTitle")}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{t("checkout.secureSummaryCopy")}</p>
            </div>

            <Button className="hidden w-full lg:inline-flex" disabled={isSubmitting} form="checkout-form" type="submit">
              {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
              {orderButtonLabel}
            </Button>

            <p aria-live="polite" className="text-sm leading-7 text-slate-500">
              {isSubmitting ? t("checkout.processingNotice") : t("checkout.submitNotice")}
            </p>
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+0.8rem)] z-30 lg:hidden">
        <div className="rounded-[26px] border border-[var(--line)] bg-[rgba(249,246,239,0.94)] p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {t("checkout.mobileTotalLabel")}
              </p>
              <p className="mt-1 truncate font-display text-2xl text-[var(--ink)]">
                {formatCurrency(summary.total, locale)}
              </p>
            </div>
            <Button className="min-w-[10rem]" disabled={isSubmitting} form="checkout-form" type="submit">
              {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
              {orderButtonLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
