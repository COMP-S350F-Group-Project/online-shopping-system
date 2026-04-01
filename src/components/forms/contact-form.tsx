"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-3xl">{t("contactPage.formTitle")}</h2>
        <p className="text-sm leading-7 text-slate-600">{t("contactPage.formDescription")}</p>
      </div>

      <form
        className="grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setIsSubmitting(true);

          const form = event.currentTarget;

          window.setTimeout(() => {
            form.reset();
            setIsSubmitting(false);
            toast.success(t("contactPage.success"));
          }, 450);
        }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[var(--ink)]">
              {t("contactPage.firstName")}
            </label>
            <Input autoComplete="given-name" name="firstName" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[var(--ink)]">
              {t("contactPage.lastName")}
            </label>
            <Input autoComplete="family-name" name="lastName" required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--ink)]">
            {t("auth.email")}
          </label>
          <Input autoComplete="email" name="email" required type="email" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--ink)]">
            {t("contactPage.subject")}
          </label>
          <Input name="subject" required />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--ink)]">
            {t("contactPage.messageLabel")}
          </label>
          <Textarea name="message" placeholder={t("contactPage.messagePlaceholder")} required />
        </div>

        <Button disabled={isSubmitting} type="submit">
          {t("contactPage.submit")}
        </Button>
      </form>
    </div>
  );
}
