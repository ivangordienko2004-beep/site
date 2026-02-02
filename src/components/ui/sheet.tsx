import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/cn";

/** Простая выезжающая панель справа (бургер-меню) */
export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:opacity-0 transition-opacity" />
      <Dialog.Content
        className={cn(
          "fixed right-0 top-0 h-dvh w-[84%] max-w-sm bg-bg text-fg border-l border-muted/30 p-4 shadow-xl",
          "data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full transition-transform",
          className
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
