import { useQuery } from "@tanstack/react-query";
import { productsCache } from "../services/products.cache";
import { getCategories } from "../services/products.service";
import { productKeys } from "./product-keys";

export const useCategories = () =>
  useQuery({
    queryKey: productKeys.categories,
    queryFn: getCategories,
    staleTime: productsCache.revalidate.categories * 1000,
  });
