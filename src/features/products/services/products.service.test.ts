import { api } from "@/shared/api/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getCategories,
  getProductById,
  getProducts,
} from "./products.service";

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

  // Regresión: en la última página la API responde con limit = elementos traídos.
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
