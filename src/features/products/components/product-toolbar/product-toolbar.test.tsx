import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ProductFilters } from "../../types/product.types";
import { ProductToolbar } from "./product-toolbar";

const push = vi.fn();

beforeEach(() => {
  push.mockReset();
  vi.mocked(useRouter).mockReturnValue({ push } as unknown as ReturnType<typeof useRouter>);
});

const renderToolbar = (filters: ProductFilters = {}) =>
  render(<ProductToolbar filters={filters} />);

const searchBox = () => screen.getByRole("searchbox", { name: "Buscar productos" });
const sortSelect = () => screen.getByRole("combobox", { name: "Ordenar por" });

describe("ProductToolbar", () => {
  it("muestra la búsqueda y el orden activos", () => {
    renderToolbar({ q: "phone", sortBy: "price", order: "asc" });

    expect(searchBox()).toHaveValue("phone");
    expect(sortSelect()).toHaveValue("price:asc");
  });

  it("ofrece las cinco formas de ordenar", () => {
    renderToolbar();

    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual([
      "Relevancia",
      "Precio: menor a mayor",
      "Precio: mayor a menor",
      "Mejor valorados",
      "Nombre: A a Z",
    ]);
  });

  it("busca navegando a la URL con la búsqueda", async () => {
    const user = userEvent.setup();
    renderToolbar();

    await user.type(searchBox(), "laptop{Enter}");

    expect(push).toHaveBeenCalledWith("/products?q=laptop");
  });

  it("conserva la categoría y el orden, y vuelve a la primera página", async () => {
    const user = userEvent.setup();
    renderToolbar({ category: "beauty", sortBy: "price", order: "asc", page: 3 });

    await user.type(searchBox(), "crema{Enter}");

    expect(push).toHaveBeenCalledWith(
      "/products?category=beauty&q=crema&sortBy=price&order=asc",
    );
  });

  it("recorta los espacios y una búsqueda vacía quita el filtro", async () => {
    const user = userEvent.setup();
    renderToolbar({ q: "phone" });

    await user.clear(searchBox());
    await user.type(searchBox(), "   {Enter}");

    expect(push).toHaveBeenCalledWith("/products");
  });

  it("solo ofrece «Limpiar» cuando hay una búsqueda", async () => {
    const { unmount } = renderToolbar();
    expect(screen.queryByRole("button", { name: "Limpiar" })).not.toBeInTheDocument();
    unmount();

    renderToolbar({ q: "phone" });
    expect(screen.getByRole("button", { name: "Limpiar" })).toBeInTheDocument();
  });

  it("«Limpiar» quita la búsqueda pero conserva la categoría", async () => {
    const user = userEvent.setup();
    renderToolbar({ q: "phone", category: "smartphones" });

    await user.click(screen.getByRole("button", { name: "Limpiar" }));

    expect(searchBox()).toHaveValue("");
    expect(push).toHaveBeenCalledWith("/products?category=smartphones");
  });

  it("cambiar el orden navega con el nuevo orden", async () => {
    const user = userEvent.setup();
    renderToolbar({ q: "phone" });

    await user.selectOptions(sortSelect(), "price:desc");

    expect(push).toHaveBeenCalledWith("/products?q=phone&sortBy=price&order=desc");
  });

  it("elegir «Relevancia» quita el orden", async () => {
    const user = userEvent.setup();
    renderToolbar({ sortBy: "rating", order: "desc" });

    await user.selectOptions(sortSelect(), "");

    expect(push).toHaveBeenCalledWith("/products");
  });
});
