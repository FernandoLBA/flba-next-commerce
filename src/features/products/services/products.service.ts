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
 * Trae todos los productos filtrados por categoría y paginados
 * @param filters
 * @returns
 */
export const getProducts = async (filters?: ProductFilters) => {
  const limit = filters?.limit ?? appSettings.PRODUCTS_LIMIT;
  const page = filters?.page ?? 1;
  const apiUrl = filters?.category
    ? productsRoutes.CATEGORIES.byCategorySlug(filters.category)
    : productsRoutes.PRODUCTS.BASE;

  const res = await api.get<PaginatedResponse<"products", Product>>(apiUrl, {
    params: {
      ...filters,
      limit,
      skip: (page - 1) * limit,
      select: LIST_FIELDS,
    },
    next: {
      tags: [productsCache.tags.products],
      revalidate: productsCache.revalidate.list,
    },
  });

  return {
    products: res.products,
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
