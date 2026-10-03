import { api } from "@/shared/config";
import { apiRoutes } from "@/shared/lib";
import { PaginatedResponse } from "@/shared/types";
import { Product, ProductFilters } from "../types";

export const getProducts = async (filters?: ProductFilters) => {
  const products = await api.get<PaginatedResponse<Product>>(
    apiRoutes.PRODUCTS,
    {
      params: filters,
      next: { tags: ["products"] },
    },
  );

  return products.data;
};
