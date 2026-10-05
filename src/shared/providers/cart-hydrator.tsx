"use client";

import { useCartStore } from "@/shared/stores/cart.store";
import { useEffect } from "react";

export const CartHydrator = () => {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
};
