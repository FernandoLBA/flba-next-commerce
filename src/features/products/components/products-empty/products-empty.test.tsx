import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductsEmpty } from "./products-empty";

describe("ProductsEmpty", () => {
  it("nombra la búsqueda y ofrece quitarla conservando la categoría", () => {
    render(<ProductsEmpty filters={{ q: "zzzz", category: "beauty", sortBy: "price", order: "asc" }} />);

    expect(screen.getByRole("status")).toHaveTextContent("No hay resultados para «zzzz»");
    expect(screen.getByRole("link", { name: "Quitar la búsqueda" })).toHaveAttribute(
      "href",
      "/products?category=beauty&sortBy=price&order=asc",
    );
  });

  it("sin búsqueda muestra el mensaje general y ningún enlace", () => {
    render(<ProductsEmpty filters={{}} />);

    expect(screen.getByText("No encontramos productos")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
