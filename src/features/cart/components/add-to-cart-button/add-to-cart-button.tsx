"use client";

import { AppButton } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { useCartStore } from "@/shared/stores/cart/cart.store";
import type { CartItemInput } from "@/shared/types/cart.type";
import { useEffect, useState } from "react";

type Props = { item: CartItemInput; className?: string };

export const AddToCartButton = ({ item, className }: Props) => {
  const add = useCartStore((s) => s.add);
  const [added, setAdded] = useState(false);
  const outOfStock = item.stock <= 0;

  useEffect(() => {
    if (!added) return;

    const timer = setTimeout(() => setAdded(false), 1500);

    return () => clearTimeout(timer);
  }, [added]);

  return (
    <AppButton
      className={className}
      disabled={outOfStock}
      onClick={() => {
        add(item);
        setAdded(true);
      }}
    >
      {outOfStock
        ? appMessages.PRODUCT_DETAIL.OUT_OF_STOCK
        : added
          ? "Agregado"
          : appMessages.PRODUCT_DETAIL.ADD_TO_CART}
    </AppButton>
  );
};
