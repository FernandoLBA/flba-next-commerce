import { useCartStore } from "@/shared/stores/cart/cart.store";
import type { CartItemInput } from "@/shared/types/cart.type";
import { act } from "@testing-library/react";

export const mascara: CartItemInput = {
  id: 1,
  title: "Mascara",
  price: 9.99,
  thumbnail: "https://cdn.dummyjson.com/m.webp",
  stock: 5,
};

export const perfume: CartItemInput = {
  ...mascara,
  id: 2,
  title: "Perfume",
  price: 19.99,
};

export const hydrateCart = () =>
  act(async () => {
    await useCartStore.persist.rehydrate();
  });

export const seedCart = async (items: { item: CartItemInput; quantity: number }[]) => {
  useCartStore.setState({ items: [] });
  items.forEach(({ item, quantity }) => useCartStore.getState().add(item, quantity));
  await hydrateCart();
};
