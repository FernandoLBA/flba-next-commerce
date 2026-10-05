import type { CartItemInput } from "@/shared/types/cart.type";
import { beforeEach, describe, expect, it } from "vitest";
import { selectCount, selectSubtotal } from "./cart.selectors";
import { useCartStore } from "./cart.store";

const mascara: CartItemInput = {
  id: 1,
  title: "Mascara",
  price: 9.99,
  thumbnail: "https://cdn.dummyjson.com/m.webp",
  stock: 5,
};
const perfume: CartItemInput = { ...mascara, id: 2, title: "Perfume", price: 19.99 };

const state = () => useCartStore.getState();

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe("cart store", () => {
  describe("add", () => {
    it("agrega un producto nuevo con cantidad 1", () => {
      state().add(mascara);

      expect(state().items).toEqual([{ ...mascara, quantity: 1 }]);
    });

    it("suma la cantidad cuando el producto ya está en el carrito", () => {
      state().add(mascara);
      state().add(mascara, 2);

      expect(state().items).toHaveLength(1);
      expect(state().items[0].quantity).toBe(3);
    });

    it("no supera el stock", () => {
      state().add(mascara, 4);
      state().add(mascara, 4);

      expect(state().items[0].quantity).toBe(5);
    });

    it("no agrega un producto sin stock", () => {
      state().add({ ...mascara, stock: 0 });

      expect(state().items).toEqual([]);
    });

    it("conserva el orden de inserción", () => {
      state().add(mascara);
      state().add(perfume);

      expect(state().items.map((i) => i.id)).toEqual([1, 2]);
    });
  });

  describe("setQuantity", () => {
    beforeEach(() => state().add(mascara));

    it("cambia la cantidad", () => {
      state().setQuantity(1, 3);

      expect(state().items[0].quantity).toBe(3);
    });

    it("limita la cantidad entre 1 y el stock", () => {
      state().setQuantity(1, 99);
      expect(state().items[0].quantity).toBe(5);

      state().setQuantity(1, 0);
      expect(state().items[0].quantity).toBe(1);
    });

    it("ignora un id que no está en el carrito", () => {
      state().setQuantity(999, 3);

      expect(state().items[0].quantity).toBe(1);
    });
  });

  describe("remove y clear", () => {
    beforeEach(() => {
      state().add(mascara);
      state().add(perfume);
    });

    it("quita solo el producto indicado", () => {
      state().remove(1);

      expect(state().items.map((i) => i.id)).toEqual([2]);
    });

    it("vacía el carrito", () => {
      state().clear();

      expect(state().items).toEqual([]);
    });
  });

  describe("selectores", () => {
    it("cuentan las unidades, no los productos", () => {
      state().add(mascara, 2);
      state().add(perfume, 3);

      expect(selectCount(state())).toBe(5);
    });

    it("calculan el subtotal en céntimos, sin errores de decimales", () => {
      // 19.99 * 3 en coma flotante da 59.96999999999999
      state().add(perfume, 3);

      expect(selectSubtotal(state())).toBe(59.97);
    });

    it("dan 0 con el carrito vacío", () => {
      expect(selectCount(state())).toBe(0);
      expect(selectSubtotal(state())).toBe(0);
    });
  });

  describe("persistencia", () => {
    it("guarda solo los ítems y la versión, sin las acciones", () => {
      state().add(mascara);

      const saved = JSON.parse(localStorage.getItem("flba-cart") ?? "null");

      expect(saved.version).toBe(1);
      expect(Object.keys(saved.state)).toEqual(["items"]);
      expect(saved.state.items).toEqual([{ ...mascara, quantity: 1 }]);
    });

    it("se rehidrata a mano desde localStorage (skipHydration)", async () => {
      localStorage.setItem(
        "flba-cart",
        JSON.stringify({
          state: { items: [{ ...perfume, quantity: 2 }] },
          version: 1,
        }),
      );
      expect(state().items).toEqual([]);

      await useCartStore.persist.rehydrate();

      expect(useCartStore.persist.hasHydrated()).toBe(true);
      expect(state().items).toEqual([{ ...perfume, quantity: 2 }]);
    });
  });
});
