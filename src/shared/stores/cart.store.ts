import type { CartItem, CartItemInput } from "@/shared/types/cart.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartState = {
  items: CartItem[];
  add: (item: CartItemInput, quantity?: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const clamp = (quantity: number, stock: number) =>
  Math.min(Math.max(1, quantity), Math.max(1, stock));

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item, quantity = 1) =>
        set((state) => {
          if (item.stock <= 0) return state;
          const exists = state.items.some((i) => i.id === item.id);

          return {
            items: exists
              ? state.items.map((i) =>
                  i.id === item.id
                    ? {
                        ...i,
                        stock: item.stock,
                        quantity: clamp(i.quantity + quantity, item.stock),
                      }
                    : i,
                )
              : [
                  ...state.items,
                  { ...item, quantity: clamp(quantity, item.stock) },
                ],
          };
        }),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: clamp(quantity, i.stock) } : i,
          ),
        })),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "flba-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
);
