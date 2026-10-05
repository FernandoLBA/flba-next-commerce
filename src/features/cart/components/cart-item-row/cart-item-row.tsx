"use client";

import { AppButton, AppLink } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { appRoutes } from "@/shared/constants/app.routes";
import { useCartStore } from "@/shared/stores/cart/cart.store";
import type { CartItem } from "@/shared/types/cart.type";
import { formatPrice } from "@/shared/utils/format-price";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export const CartItemRow = ({ item }: { item: CartItem }) => {
  const text = appMessages.CART;
  const setQuantity = useCartStore((state) => state.setQuantity);
  const remove = useCartStore((state) => state.remove);
  const href = appRoutes.PRODUCTS.byId(String(item.id));
  const lineTotal = (Math.round(item.price * 100) * item.quantity) / 100;

  return (
    <li className="flex gap-4 rounded-md border border-border p-3">
      <AppLink
        href={href}
        className="relative block size-24 shrink-0 overflow-hidden rounded-md bg-secondary"
      >
        <Image
          className="object-contain"
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="96px"
        />
      </AppLink>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex-x-between items-start gap-2">
          <AppLink href={href} className="text-foreground">
            {item.title}
          </AppLink>

          <AppButton
            variant="ghost"
            aria-label={`${text.REMOVE}: ${item.title}`}
            onClick={() => remove(item.id)}
          >
            <Trash2 aria-hidden className="size-4" />
          </AppButton>
        </div>

        <div className="flex-x-between mt-auto gap-2">
          <div
            role="group"
            aria-label={text.QUANTITY}
            className="flex items-center gap-2"
          >
            <AppButton
              variant="outline"
              className="p-1"
              aria-label={text.DECREASE}
              disabled={item.quantity <= 1}
              onClick={() => setQuantity(item.id, item.quantity - 1)}
            >
              <Minus aria-hidden className="size-4" />
            </AppButton>

            <span aria-live="polite" className="typo-label min-w-6 text-center">
              {item.quantity}
            </span>

            <AppButton
              variant="outline"
              className="p-1"
              aria-label={text.INCREASE}
              disabled={item.quantity >= item.stock}
              onClick={() => setQuantity(item.id, item.quantity + 1)}
            >
              <Plus aria-hidden className="size-4" />
            </AppButton>
          </div>

          <p className="typo-price">{formatPrice(lineTotal)}</p>
        </div>
      </div>
    </li>
  );
};
