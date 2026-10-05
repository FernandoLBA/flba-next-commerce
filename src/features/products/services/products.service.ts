import { api } from "@/shared/api/client";
import { appSettings } from "@/shared/constants/app.settings";
import { PaginatedResponse } from "@/shared/types/api-response.type";
import { toPagination } from "@/shared/utils/pagination";
import {
  Product,
  ProductCategory,
  ProductFilters,
} from "../types/product.types";
import { productsCache } from "./products.cache";
import { productsRoutes } from "./products.routes";

//* Solo requiero estos campos en la app;
const LIST_FIELDS =
  "id,title,category,brand,price,discountPercentage,stock,rating,thumbnail";

/**
 * Trae los productos filtrados por categoría y/o búsqueda, ordenados y paginados.
 *
 * La API no combina búsqueda con categoría, así que en ese caso se piden todas
 * las coincidencias (`limit=0`), se filtran por categoría y se pagina aquí.
 * @param filters
 * @returns
 */
export const getProducts = async (filters?: ProductFilters) => {
  const limit = filters?.limit ?? appSettings.PRODUCTS_LIMIT;
  const page = filters?.page ?? 1;
  const skip = (page - 1) * limit;
  const sort = filters?.sortBy
    ? { sortBy: filters.sortBy, order: filters.order ?? "asc" }
    : {};
  const next = {
    tags: [productsCache.tags.products],
    revalidate: productsCache.revalidate.list,
  };

  if (filters?.q && filters.category) {
    const matches = await api.get<PaginatedResponse<"products", Product>>(
      productsRoutes.PRODUCTS.SEARCH,
      {
        params: { q: filters.q, limit: 0, select: LIST_FIELDS, ...sort },
        next,
      },
    );
    const inCategory = matches.products.filter(
      (product) => product.category === filters.category,
    );

    return {
      products: inCategory.slice(skip, skip + limit),
      totalItems: inCategory.length,
      ...toPagination({ total: inCategory.length, skip, limit }),
    };
  }

  const apiUrl = filters?.q
    ? productsRoutes.PRODUCTS.SEARCH
    : filters?.category
      ? productsRoutes.CATEGORIES.byCategorySlug(filters.category)
      : productsRoutes.PRODUCTS.BASE;

  const res = await api.get<PaginatedResponse<"products", Product>>(apiUrl, {
    params: {
      ...(filters?.q ? { q: filters.q } : {}),
      limit,
      skip,
      select: LIST_FIELDS,
      ...sort,
    },
    next,
  });

  return {
    products: res.products,
    totalItems: res.total,
    ...toPagination({ total: res.total, skip: res.skip, limit }),
  };
};

/**
 * Trae un producto por ID
 * @param id
 * @returns
 */
export const getProductById = async (id: string) =>
  await api.get<Product>(productsRoutes.PRODUCTS.byProductId(id), {
    next: {
      tags: [productsCache.tags.products, productsCache.tags.product(id)],
      revalidate: productsCache.revalidate.detail,
    },
  });

/**
 * Trae todas las categorías
 * Parece que esta api no acepta filtros
 * @returns
 */
export const getCategories = async () =>
  await api.get<ProductCategory[]>(productsRoutes.CATEGORIES.BASE, {
    next: {
      tags: [productsCache.tags.categories],
      revalidate: productsCache.revalidate.categories,
    },
  });
