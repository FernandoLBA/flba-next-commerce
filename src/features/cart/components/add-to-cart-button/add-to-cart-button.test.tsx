import { useCartStore } from "@/shared/stores/cart/cart.store";
import { mascara, seedCart } from "@/test-utils/cart";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AddToCartButton } from "./add-to-cart-button";

beforeEach(async () => {
  await seedCart([]);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("AddToCartButton", () => {
  it("agrega el producto al carrito al pulsar", async () => {
    const user = userEvent.setup();
    render(<AddToCartButton item={mascara} />);

    await user.click(screen.getByRole("button", { name: "Agregar al carro" }));

    expect(useCartStore.getState().items).toEqual([
      { ...mascara, quantity: 1 },
    ]);
  });

  it("suma otra unidad si se pulsa de nuevo", async () => {
    const user = userEvent.setup();
    render(<AddToCartButton item={mascara} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));

    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it("confirma con «Agregado» y vuelve al texto original", () => {
    vi.useFakeTimers();
    render(<AddToCartButton item={mascara} />);

    fireEvent.click(screen.getByRole("button"));
    expect(
      screen.getByRole("button", { name: "Agregado" }),
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(
      screen.getByRole("button", { name: "Agregar al carro" }),
    ).toBeInTheDocument();
  });

  it("queda desactivado y no agrega sin stock", async () => {
    const user = userEvent.setup();
    render(<AddToCartButton item={{ ...mascara, stock: 0 }} />);

    const button = screen.getByRole("button", { name: "Agotado" });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(useCartStore.getState().items).toEqual([]);
  });
});
