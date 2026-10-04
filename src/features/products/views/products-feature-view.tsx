import { Pagination } from "@/shared/components/ui";
import { getProducts } from "../services/products.service";
import type { Product, ProductFilters } from "../types/product.types";

export const ProductsFeatureView = async ({
  filters,
}: {
  filters: ProductFilters;
}) => {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;
  const products = await getProducts({
    category: filters.category || undefined,
    page,
    limit,
  });

  return (
    <>
      {products.data.map((product: Product) => (
        <p key={product.id}>{product.title}</p>
      ))}

      <Pagination page={page} totalPages={products.totalPages} />
    </>
  );
};
