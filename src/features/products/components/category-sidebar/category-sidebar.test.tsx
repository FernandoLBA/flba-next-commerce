import { CategoriesProvider } from "@/shared/providers/categories-provider";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CategorySidebar } from "./category-sidebar";

const categories = [
  { slug: "beauty", name: "Beauty" },
  { slug: "home-decoration", name: "Home Decoration" },
];

const renderSidebar = (activeCategory?: string) =>
  render(
    <CategoriesProvider categories={categories}>
      <CategorySidebar activeCategory={activeCategory} />
    </CategoriesProvider>,
  );

describe("CategorySidebar", () => {
  it("lista «Todos» y cada categoría con su filtro en la URL", () => {
    renderSidebar();

    expect(screen.getByRole("link", { name: "Todos" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: "Beauty" })).toHaveAttribute(
      "href",
      "/products?category=beauty",
    );
    expect(screen.getByRole("link", { name: "Home Decoration" })).toHaveAttribute(
      "href",
      "/products?category=home-decoration",
    );
  });

  it("marca «Todos» cuando no hay categoría activa", () => {
    renderSidebar();

    expect(screen.getByRole("link", { name: "Todos" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Beauty" })).not.toHaveAttribute("aria-current");
  });

  it("marca la categoría activa", () => {
    renderSidebar("beauty");

    expect(screen.getByRole("link", { name: "Beauty" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Todos" })).not.toHaveAttribute("aria-current");
  });

  it("no pinta nada sin categorías (por ejemplo, si la API falló)", () => {
    const { container } = render(
      <CategoriesProvider categories={[]}>
        <CategorySidebar />
      </CategoriesProvider>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
