"use client";

import type React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetPortal({ ...props }: React.ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal {...props} />;
}

export function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn("fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm", className)}
      {...props}
    />
  );
}

export function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Content>) {
  const t = useTranslations();

  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-[var(--surface)] p-6 shadow-2xl",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-black/5">
          <X className="h-4 w-4" />
          <span className="sr-only">{t("common.close")}</span>
        </Dialog.Close>
      </Dialog.Content>
    </SheetPortal>
  );
}

export function SheetTitle({ ...props }: React.ComponentProps<typeof Dialog.Title>) {
  return <Dialog.Title className="text-lg font-semibold text-[var(--ink)]" {...props} />;
}

export function SheetDescription({
  ...props
}: React.ComponentProps<typeof Dialog.Description>) {
  return <Dialog.Description className="text-sm text-slate-600" {...props} />;
}
