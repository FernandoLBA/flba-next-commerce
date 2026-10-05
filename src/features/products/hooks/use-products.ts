"use client";

import { useQuery } from "@tanstack/react-query";
import { productsCache } from "../services/products.cache";
import { getProductById, getProducts } from "../services/products.service";
import { ProductFilters } from "../types/product.types";
import { productKeys } from "./product-keys";

export const useProducts = (filters?: ProductFilters) =>
  useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    staleTime: productsCache.revalidate.list * 1000,
  });

export const useProduct = (id: string) =>
  useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    staleTime: productsCache.revalidate.detail * 1000,
  });
