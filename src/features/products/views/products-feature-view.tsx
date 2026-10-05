import { Pagination } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { AppPagination } from "@/shared/types/app-pagination.type";
import { CategorySidebar } from "../components/category-sidebar/category-sidebar";
import { ProductList } from "../components/product-list/product-list";
import { ProductToolbar } from "../components/product-toolbar/product-toolbar";
import { ProductsEmpty } from "../components/products-empty/products-empty";
import type { Product, ProductFilters } from "../types/product.types";

const text = appMessages.PRODUCTS;

export const ProductsFeatureView = ({
  paginatedProducts,
  filters,
}: {
  paginatedProducts: AppPagination<"products", Product>;
  filters: ProductFilters;
}) => {
  const { page, products, totalPages, totalItems } = paginatedProducts;

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[14rem_1fr]">
      <CategorySidebar
        activeCategory={filters.category ?? ""}
        filters={filters}
      />

      <section className="flex min-w-0 flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="typo-subtitle">
            {filters.q ? `${text.SEARCH_TITLE} «${filters.q}»` : text.TITLE}
          </h1>
          <p aria-live="polite" className="typo-body-sm text-muted">
            {totalItems} {totalItems === 1 ? text.RESULT : text.RESULTS}
          </p>
        </header>

        <ProductToolbar key={filters.q ?? ""} filters={filters} />

        {products.length === 0 ? (
          <ProductsEmpty filters={filters} />
        ) : (
          <>
            <ProductList products={products} showHeading={false} />

            <div className="flex justify-center">
              <Pagination page={page} totalPages={totalPages} />
            </div>
          </>
        )}
      </section>
    </div>
  );
};
