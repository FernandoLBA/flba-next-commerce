import { mascara, perfume, seedCart } from "@/test-utils/cart";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AppCartButton } from "./app-cart-button";

beforeEach(async () => {
  await seedCart([]);
});

describe("AppCartButton", () => {
  it("enlaza al carrito", async () => {
    render(<AppCartButton />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/cart");
  });

  it("no muestra el círculo con el carrito vacío", () => {
    render(<AppCartButton />);

    expect(
      screen.getByRole("link", { name: "Carrito, 0 artículos" }),
    ).toBeInTheDocument();

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("muestra el total de unidades, no de productos", async () => {
    await seedCart([
      { item: mascara, quantity: 2 },
      { item: perfume, quantity: 3 },
    ]);

    render(<AppCartButton />);

    expect(
      screen.getByRole("link", { name: "Carrito, 5 artículos" }),
    ).toBeInTheDocument();

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("usa el singular con una sola unidad", async () => {
    await seedCart([{ item: mascara, quantity: 1 }]);
    render(<AppCartButton />);

    expect(
      screen.getByRole("link", { name: "Carrito, 1 artículo" }),
    ).toBeInTheDocument();
  });

  it("muestra 99+ cuando se pasa de 99", async () => {
    await seedCart([{ item: { ...mascara, stock: 500 }, quantity: 120 }]);

    render(<AppCartButton />);

    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("muestra 0 mientras el carrito no se ha hidratado", async () => {
    vi.resetModules();
    const { useCartStore } = await import("@/shared/stores/cart/cart.store");
    const { AppCartButton: Fresh } = await import("./app-cart-button");
    useCartStore.setState({ items: [{ ...mascara, quantity: 3 }] });

    render(<Fresh />);

    expect(useCartStore.persist.hasHydrated()).toBe(false);
    
    expect(
      screen.getByRole("link", { name: "Carrito, 0 artículos" }),
    ).toBeInTheDocument();
  });
});
