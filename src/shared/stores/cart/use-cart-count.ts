"use client";

import { useSyncExternalStore } from "react";
import { selectCount } from "./cart.selectors";
import { useCartStore } from "./cart.store";

export const useCartHydrated = () =>
  useSyncExternalStore(
    (onChange) => useCartStore.persist.onFinishHydration(onChange),
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );

export const useCartCount = () => {
  const hydrated = useCartHydrated();
  const count = useCartStore(selectCount);

  return hydrated ? count : 0;
};
