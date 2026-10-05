import { render, screen } from "@testing-library/react";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

const setUrl = (pathname: string, query = "") => {
  vi.mocked(usePathname).mockReturnValue(pathname);
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams(query) as unknown as ReadonlyURLSearchParams,
  );
};

beforeEach(() => setUrl("/products"));

describe("Pagination", () => {
  it("genera un enlace por página", () => {
    render(<Pagination page={1} totalPages={4} />);

    const nav = screen.getByRole("navigation", { name: "Paginación" });
    const pageLinks = ["1", "2", "3", "4"].map((n) =>
      screen.getByRole("link", { name: n }),
    );

    expect(nav).toBeInTheDocument();
    expect(pageLinks.map((l) => l.getAttribute("href"))).toEqual([
      "/products?page=1",
      "/products?page=2",
      "/products?page=3",
      "/products?page=4",
    ]);
  });

  it("marca la página actual", () => {
    render(<Pagination page={3} totalPages={5} />);

    expect(screen.getByRole("link", { name: "3" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "2" })).not.toHaveAttribute("aria-current");
  });

  it("conserva la categoría al cambiar de página", () => {
    setUrl("/products", "category=beauty&page=2");
    render(<Pagination page={2} totalPages={5} />);

    expect(screen.getByRole("link", { name: "Página siguiente" })).toHaveAttribute(
      "href",
      "/products?category=beauty&page=3",
    );
    expect(screen.getByRole("link", { name: "Página anterior" })).toHaveAttribute(
      "href",
      "/products?category=beauty&page=1",
    );
  });

  it("no ofrece «anterior» en la primera página", () => {
    render(<Pagination page={1} totalPages={5} />);

    expect(screen.queryByRole("link", { name: "Página anterior" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Página siguiente" })).toBeInTheDocument();
  });

  it("no ofrece «siguiente» en la última página", () => {
    render(<Pagination page={5} totalPages={5} />);

    expect(screen.queryByRole("link", { name: "Página siguiente" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Página anterior" })).toBeInTheDocument();
  });
});
