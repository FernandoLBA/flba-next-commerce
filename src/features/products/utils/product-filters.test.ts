import { describe, expect, it } from "vitest";
import {
  buildProductsHref,
  parseProductFilters,
  parseSortOption,
  sortOptionValue,
} from "./product-filters";

describe("parseProductFilters", () => {
  it("devuelve solo la página 1 cuando no hay parámetros", () => {
    expect(parseProductFilters({})).toEqual({ page: 1 });
  });

  it("recorta los espacios de la búsqueda y de la categoría", () => {
    expect(parseProductFilters({ q: "  phone  ", category: " beauty " })).toMatchObject({
      q: "phone",
      category: "beauty",
    });
  });

  it("descarta la búsqueda y la categoría vacías", () => {
    const filters = parseProductFilters({ q: "   ", category: "" });

    expect(filters.q).toBeUndefined();
    expect(filters.category).toBeUndefined();
  });

  it("limita la longitud de la búsqueda", () => {
    expect(parseProductFilters({ q: "a".repeat(500) }).q).toHaveLength(80);
  });

  it("toma el primer valor cuando el parámetro se repite", () => {
    expect(parseProductFilters({ q: ["uno", "dos"], category: ["a", "b"] })).toMatchObject({
      q: "uno",
      category: "a",
    });
  });

  it.each([
    ["price", "asc"],
    ["price", "desc"],
    ["rating", "desc"],
    ["title", "asc"],
  ])("acepta el orden %s %s que ofrece la interfaz", (sortBy, order) => {
    expect(parseProductFilters({ sortBy, order })).toMatchObject({ sortBy, order });
  });

  it.each([
    ["una combinación que no se ofrece", { sortBy: "title", order: "desc" }],
    ["otra combinación que no se ofrece", { sortBy: "rating", order: "asc" }],
    ["un campo desconocido", { sortBy: "zzz", order: "asc" }],
    ["un sentido desconocido", { sortBy: "price", order: "sideways" }],
    ["un campo sin sentido", { sortBy: "price" }],
    ["un sentido sin campo", { order: "asc" }],
  ])("ignora el orden con %s", (_, params) => {
    const filters = parseProductFilters(params);

    expect(filters.sortBy).toBeUndefined();
    expect(filters.order).toBeUndefined();
  });

  it.each([
    ["3", 3],
    ["12", 12],
    ["0", 1],
    ["-2", 1],
    ["abc", 1],
    ["1.5", 1],
    ["", 1],
  ])("interpreta la página %j como %i", (page, expected) => {
    expect(parseProductFilters({ page }).page).toBe(expected);
  });
});

describe("buildProductsHref", () => {
  it("apunta al listado sin filtros", () => {
    expect(buildProductsHref()).toBe("/products");
    expect(buildProductsHref({})).toBe("/products");
  });

  it("incluye solo los filtros con valor, en un orden estable", () => {
    expect(
      buildProductsHref({
        page: 2,
        order: "asc",
        sortBy: "price",
        q: "phone",
        category: "beauty",
      }),
    ).toBe("/products?category=beauty&q=phone&sortBy=price&order=asc&page=2");
  });

  it("omite la página 1", () => {
    expect(buildProductsHref({ category: "beauty", page: 1 })).toBe(
      "/products?category=beauty",
    );
  });

  it("omite el campo de orden si falta el sentido, y al revés", () => {
    expect(buildProductsHref({ sortBy: "price" })).toBe("/products");
    expect(buildProductsHref({ order: "asc" })).toBe("/products");
  });

  it("codifica espacios, tildes y símbolos", () => {
    expect(buildProductsHref({ q: "café & té" })).toBe(
      "/products?q=caf%C3%A9+%26+t%C3%A9",
    );
  });
});

describe("opciones de orden", () => {
  it("sortOptionValue devuelve el valor del selector", () => {
    expect(sortOptionValue({})).toBe("");
    expect(sortOptionValue({ sortBy: "price", order: "asc" })).toBe("price:asc");
  });

  it("parseSortOption convierte el valor del selector en campo y sentido", () => {
    expect(parseSortOption("price:desc")).toEqual({ sortBy: "price", order: "desc" });
  });

  it("parseSortOption quita el orden con la opción por defecto o un valor desconocido", () => {
    expect(parseSortOption("")).toEqual({ sortBy: undefined, order: undefined });
    expect(parseSortOption("zzz:asc")).toEqual({ sortBy: undefined, order: undefined });
  });
});
