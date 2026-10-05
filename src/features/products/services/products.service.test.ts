import { api } from "@/shared/api/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCategories, getProductById, getProducts } from "./products.service";

vi.mock("@/shared/api/client", () => ({ api: { get: vi.fn() } }));

const get = vi.mocked(api.get);

const listResponse = (overrides = {}) => ({
  products: [{ id: 1 }],
  total: 194,
  skip: 0,
  limit: 20,
  ...overrides,
});

beforeEach(() => {
  get.mockReset();
});

describe("getProducts", () => {
  it("pide la lista con limit, skip y los campos necesarios", async () => {
    get.mockResolvedValue(listResponse());

    await getProducts({ page: 3 });

    const [path, options] = get.mock.calls[0];

    expect(path).toBe("/products");
    expect(options?.params).toMatchObject({ limit: 20, skip: 40 });
    expect(String(options?.params?.select)).toContain("thumbnail");
  });

  it("usa la ruta de la categoría cuando hay filtro", async () => {
    get.mockResolvedValue(listResponse());

    await getProducts({ category: "home-decoration" });

    expect(get.mock.calls[0][0]).toBe("/products/category/home-decoration");
  });

  it("declara tags y revalidate para la caché de Next", async () => {
    get.mockResolvedValue(listResponse());

    await getProducts();

    expect(get.mock.calls[0][1]?.next).toEqual({
      tags: ["products"],
      revalidate: 60,
    });
  });

  it("devuelve productos con la paginación calculada", async () => {
    get.mockResolvedValue(listResponse({ skip: 20 }));

    const result = await getProducts({ page: 2 });

    expect(result.products).toEqual([{ id: 1 }]);
    expect(result.page).toBe(2);
    expect(result.totalPages).toBe(10);
  });

  it("calcula totalPages con el límite pedido en la última página", async () => {
    get.mockResolvedValue(listResponse({ skip: 190, limit: 4 }));

    const result = await getProducts({ page: 10 });

    expect(result.page).toBe(10);
    expect(result.totalPages).toBe(10);
  });
});

describe("getProductById", () => {
  it("pide el detalle con sus tags", async () => {
    get.mockResolvedValue({ id: 30 });

    await getProductById("30");

    expect(get.mock.calls[0][0]).toBe("/products/30");

    expect(get.mock.calls[0][1]?.next).toMatchObject({
      tags: ["products", "product-30"],
      revalidate: 300,
    });
  });
});

describe("getCategories", () => {
  it("pide las categorías con revalidación de 24 horas", async () => {
    get.mockResolvedValue([{ slug: "beauty", name: "Beauty" }]);

    const categories = await getCategories();

    expect(get.mock.calls[0][0]).toBe("/products/categories");
    expect(get.mock.calls[0][1]?.next).toMatchObject({ revalidate: 86400 });
    expect(categories).toEqual([{ slug: "beauty", name: "Beauty" }]);
  });
});

describe("getProducts: búsqueda y orden", () => {
  it("busca en /products/search enviando q", async () => {
    get.mockResolvedValue(listResponse());

    await getProducts({ q: "phone" });

    const [path, options] = get.mock.calls[0];

    expect(path).toBe("/products/search");
    expect(options?.params).toMatchObject({ q: "phone", limit: 20, skip: 0 });
  });

  it("envía el campo y el sentido del orden", async () => {
    get.mockResolvedValue(listResponse());

    await getProducts({ sortBy: "price", order: "desc" });

    expect(get.mock.calls[0][1]?.params).toMatchObject({
      sortBy: "price",
      order: "desc",
    });
  });

  it("usa orden ascendente si falta el sentido", async () => {
    get.mockResolvedValue(listResponse());

    await getProducts({ sortBy: "title" });

    expect(get.mock.calls[0][1]?.params).toMatchObject({ order: "asc" });
  });

  it("no envía parámetros de orden cuando no se ordena", async () => {
    get.mockResolvedValue(listResponse());

    await getProducts();

    expect(get.mock.calls[0][1]?.params).not.toHaveProperty("sortBy");
    expect(get.mock.calls[0][1]?.params).not.toHaveProperty("order");
  });

  it("solo envía a la API lo que ella usa", async () => {
    get.mockResolvedValue(listResponse());

    await getProducts({ category: "beauty", page: 2 });

    const params = get.mock.calls[0][1]?.params ?? {};

    expect(params).not.toHaveProperty("page");
    expect(params).not.toHaveProperty("category");
    expect(params).not.toHaveProperty("q");
  });

  it("devuelve el total de resultados", async () => {
    get.mockResolvedValue(listResponse({ total: 23 }));

    const result = await getProducts({ q: "phone" });

    expect(result.totalItems).toBe(23);
  });
});

describe("getProducts: búsqueda dentro de una categoría", () => {
  const matches = [
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      category: "smartphones",
    })),
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 100,
      category: "mobile-accessories",
    })),
  ];

  beforeEach(() => {
    get.mockResolvedValue(
      listResponse({ products: matches, total: 45, limit: 45 }),
    );
  });

  it("pide todas las coincidencias en una sola llamada", async () => {
    await getProducts({ q: "phone", category: "smartphones" });

    expect(get).toHaveBeenCalledTimes(1);
    expect(get.mock.calls[0][0]).toBe("/products/search");

    expect(get.mock.calls[0][1]?.params).toMatchObject({
      q: "phone",
      limit: 0,
    });

    expect(String(get.mock.calls[0][1]?.params?.select)).toContain("category");
  });

  it("deja solo los productos de la categoría y cuenta el total filtrado", async () => {
    const result = await getProducts({ q: "phone", category: "smartphones" });

    expect(result.totalItems).toBe(30);

    expect(result.products.every((p) => p.category === "smartphones")).toBe(
      true,
    );
  });

  it("pagina el resultado filtrado", async () => {
    const first = await getProducts({
      q: "phone",
      category: "smartphones",
      page: 1,
    });

    const second = await getProducts({
      q: "phone",
      category: "smartphones",
      page: 2,
    });

    expect(first.products).toHaveLength(20);
    expect(second.products).toHaveLength(10);
    expect(second.products[0].id).toBe(21);
    expect(first.totalPages).toBe(2);
    expect(second.page).toBe(2);
  });

  it("devuelve una lista vacía si ninguna coincidencia es de la categoría", async () => {
    const result = await getProducts({ q: "phone", category: "beauty" });

    expect(result.products).toEqual([]);
    expect(result.totalItems).toBe(0);
    expect(result.totalPages).toBe(1);
  });
});
