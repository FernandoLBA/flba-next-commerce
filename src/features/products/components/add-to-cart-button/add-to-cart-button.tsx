"use client";

import { AppButton } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";

type AddToCartButtonProps = {
  disabled?: boolean;
};

// TODO: conectar con carrito.
export const AddToCartButton = ({ disabled }: AddToCartButtonProps) => (
  <AppButton className="w-full md:w-auto" disabled={disabled}>
    {disabled
      ? appMessages.PRODUCT_DETAIL.OUT_OF_STOCK
      : appMessages.PRODUCT_DETAIL.ADD_TO_CART}
  </AppButton>
);
