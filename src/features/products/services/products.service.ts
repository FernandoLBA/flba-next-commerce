import { api, RequestOptions } from "@/shared/config";
import { ApiResponse } from "../../../shared/types/api-responde";
import { Product } from "../types";

export const getProductsService = async (options: RequestOptions) => {
  return await api.get<ApiResponse<Product[]>>(
    "/api/v1/public/randomproducts",
    options,
  );
};
