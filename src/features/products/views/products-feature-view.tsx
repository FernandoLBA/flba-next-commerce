import { Pagination } from "@/shared/components/ui";
import { AppPagination } from "@/shared/types/app-pagination.type";
import { ProductList } from "../components/product-list/product-list";
import type { Product } from "../types/product.types";

export const ProductsFeatureView = async ({
  paginatedProducts,
}: {
  paginatedProducts: AppPagination<"products", Product>;
}) => {
  const { page, products, totalPages } = paginatedProducts;

  return (
    <section className="w-full flex flex-col items-center">
      <ProductList products={products} headingLevel={1} />

      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
};
