import type { CartState } from "./cart.store";

export const selectCount = (s: CartState) =>
  s.items.reduce((total, i) => total + i.quantity, 0);

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, i) => sum + Math.round(i.price * 100) * i.quantity, 0) /
  100;
