import { api } from "@/shared/api/client";
import { appSettings } from "@/shared/constants/app.settings";
import { ApiResponse, PaginatedResponse } from "@/shared/types/api-response";
import { Product, ProductFilters } from "../types/product.types";
import { productsRoutes } from "./products.routes";

export const getProducts = async (filters?: ProductFilters) => {
  const products = await api.get<PaginatedResponse<Product>>(
    productsRoutes.PRODUCTS,
    {
      params: {
        ...filters,
        limit: filters?.limit ?? appSettings.PRODUCTS_LIMIT,
      },
      next: { tags: ["products"] },
    },
  );

  return products.data;
};

export const getProductById = async (id: string) => {
  const product = await api.get<ApiResponse<Product>>(
    `${productsRoutes.PRODUCTS}/${id}`,
    {
      next: { tags: ["products", `product-${id}`] },
    },
  );

  return product.data;
};
