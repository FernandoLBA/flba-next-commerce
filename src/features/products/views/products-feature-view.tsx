import { Pagination } from "@/shared/components/ui";
import { AppPagination } from "@/shared/types/app-pagination.type";
import { CategorySidebar } from "../components/category-sidebar/category-sidebar";
import { ProductList } from "../components/product-list/product-list";
import type { Product } from "../types/product.types";

export const ProductsFeatureView = async ({
  paginatedProducts,
  activeCategory,
}: {
  paginatedProducts: AppPagination<"products", Product>;
  activeCategory: string;
}) => {
  const { page, products, totalPages } = paginatedProducts;

  return (
    <div className="mx-auto w-full max-w-7xl gap-8 grid lg:grid-cols-[14rem_1fr]">
      {<CategorySidebar activeCategory={activeCategory} />}

      <section className="flex w-full flex-col items-center">
        {products.length !== 0 && (
          <ProductList products={products} headingLevel={1} />
        )}

        {totalPages !== 0 && <Pagination page={page} totalPages={totalPages} />}
      </section>
    </div>
  );
};
