import { Pagination } from "@/shared/components";
import { getProducts } from "./services";
import { ProductFilters } from "./types";

export const ProductsFeaturePage = async (props: ProductFilters) => {
  const filters = props;
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;
  const products = await getProducts({
    category: filters.category || undefined,
    page,
    limit,
  });

  return (
    <>
      {products.data.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}

      {/* Paginado */}
      <Pagination page={page} totalPages={products.totalPages} />
    </>
  );
};
