import { Pagination as AppPagination } from "@/shared/components/ui";
import { type Pagination } from "../../../shared/types/api-response";
import { ProductCard } from "../components/product-card/product-card";
import type { Product } from "../types/product.types";

export const ProductsFeatureView = async ({
  paginatedProducts,
}: {
  paginatedProducts: Pagination<Product>;
}) => {
  const { data: products, page, totalPages } = paginatedProducts;

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full max-w-7xl">
        <h1 className="self-start text-xl md:text-2xl font-bold mb-8">
          Products
        </h1>

        <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <AppPagination page={page} totalPages={totalPages} />
    </section>
  );
};
