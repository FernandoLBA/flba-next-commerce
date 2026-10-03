"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products.service";
import { ProductFilters } from "../types";

export const useProducts = (filters?: ProductFilters) =>
  useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
