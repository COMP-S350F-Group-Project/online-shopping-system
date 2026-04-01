"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useTranslations } from "@/components/providers/locale-provider";
import { LocaleLink } from "@/components/shared/locale-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/types";

type AuthMode = "sign-in" | "sign-up";

export function AuthForm({
  locale,
  mode,
}: {
  locale: Locale;
  mode: AuthMode;
}) {
  const router = useRouter();
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignIn = mode === "sign-in";

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        setIsSubmitting(true);
        toast.success(t(isSignIn ? "auth.signInSuccess" : "auth.signUpSuccess"));
        startTransition(() => {
          router.push(`/${locale}/account`);
        });
      }}
    >
      {isSignIn ? null : (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[var(--ink)]">
              {t("auth.firstName")}
            </label>
            <Input autoComplete="given-name" name="firstName" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[var(--ink)]">
              {t("auth.lastName")}
            </label>
            <Input autoComplete="family-name" name="lastName" required />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--ink)]">
          {t("auth.email")}
        </label>
        <Input autoComplete="email" name="email" placeholder="name@example.com" required type="email" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--ink)]">
          {t("auth.password")}
        </label>
        <Input
          autoComplete={isSignIn ? "current-password" : "new-password"}
          name="password"
          required
          type="password"
        />
      </div>

      <div className="grid gap-3 pt-3">
        <Button className="w-full" disabled={isSubmitting} type="submit">
          {t(isSignIn ? "auth.signIn" : "auth.createAccount")}
        </Button>
        <Button asChild className="w-full" variant="secondary">
          <LocaleLink href={isSignIn ? "/auth/sign-up" : "/auth/sign-in"} locale={locale}>
            {t(isSignIn ? "auth.createAccount" : "auth.signIn")}
          </LocaleLink>
        </Button>
      </div>
    </form>
  );
}
