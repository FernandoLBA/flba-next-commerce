import { api } from "@/shared/api/client";
import { PaginatedResponse } from "@/shared/types/api-response";
import { Product, ProductFilters } from "../types/product.types";
import { productsRoutes } from "./products.routes";

export const getProducts = async (filters?: ProductFilters) => {
  const products = await api.get<PaginatedResponse<Product>>(
    productsRoutes.PRODUCTS,
    {
      params: filters,
      next: { tags: ["products"] },
    },
  );

  return products.data;
};
