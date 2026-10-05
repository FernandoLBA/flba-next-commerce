import { useCartStore } from "@/shared/stores/cart/cart.store";
import { mascara, perfume, seedCart } from "@/test-utils/cart";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CartView } from "./cart-view";

const items = () => useCartStore.getState().items;

describe("CartView", () => {
  describe("carrito vacío", () => {
    beforeEach(async () => {
      await seedCart([]);
    });

    it("muestra el estado vacío con un enlace a los productos", () => {
      render(<CartView />);

      expect(
        screen.getByRole("heading", { name: "Tu carrito está vacío" }),
      ).toBeInTheDocument();
      
      expect(
        screen.getByRole("link", { name: "Ver productos" }),
      ).toHaveAttribute("href", "/products");
    });
  });

  describe("con productos", () => {
    beforeEach(async () => {
      await seedCart([
        { item: mascara, quantity: 2 },
        { item: perfume, quantity: 3 },
      ]);
    });

    it("lista los productos y calcula el resumen", () => {
      render(<CartView />);

      expect(screen.getAllByRole("listitem")).toHaveLength(2);
      expect(screen.getByText("5 artículos")).toBeInTheDocument();
      expect(screen.getByText("S/ 79.95")).toBeInTheDocument();
    });

    it("muestra el total de cada línea", () => {
      render(<CartView />);

      expect(screen.getByText("S/ 19.98")).toBeInTheDocument();
      expect(screen.getByText("S/ 59.97")).toBeInTheDocument();
    });

    it("aumenta y disminuye la cantidad", async () => {
      const user = userEvent.setup();
      render(<CartView />);
      const row = screen.getAllByRole("listitem")[0];

      await user.click(
        within(row).getByRole("button", { name: "Aumentar cantidad" }),
      );

      expect(items()[0].quantity).toBe(3);

      await user.click(
        within(row).getByRole("button", { name: "Disminuir cantidad" }),
      );

      expect(items()[0].quantity).toBe(2);
    });

    it("desactiva «+» al llegar al stock y «−» en la unidad mínima", async () => {
      await seedCart([
        { item: { ...mascara, stock: 2 }, quantity: 2 },
        { item: perfume, quantity: 1 },
      ]);

      render(<CartView />);
      const [full, single] = screen.getAllByRole("listitem");

      expect(
        within(full).getByRole("button", { name: "Aumentar cantidad" }),
      ).toBeDisabled();

      expect(
        within(single).getByRole("button", { name: "Disminuir cantidad" }),
      ).toBeDisabled();
    });

    it("quita un producto", async () => {
      const user = userEvent.setup();
      render(<CartView />);

      await user.click(screen.getByRole("button", { name: "Quitar: Mascara" }));

      expect(items().map((i) => i.id)).toEqual([2]);
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });

    it("vacía el carrito y vuelve al estado vacío", async () => {
      const user = userEvent.setup();
      render(<CartView />);

      await user.click(screen.getByRole("button", { name: "Vaciar carrito" }));

      expect(items()).toEqual([]);

      expect(
        screen.getByRole("heading", { name: "Tu carrito está vacío" }),
      ).toBeInTheDocument();
    });

    it("deja el pago deshabilitado (fuera del alcance del reto)", () => {
      render(<CartView />);

      expect(
        screen.getByRole("button", { name: "Proceder al pago" }),
      ).toBeDisabled();
    });
  });
});
