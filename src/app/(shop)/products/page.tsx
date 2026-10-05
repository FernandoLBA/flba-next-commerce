import {
  getProducts,
  type ProductFilters,
  ProductsFeatureView,
} from "@/features/products";
import { notFound } from "next/navigation";

type ProductListingPage = {
  searchParams: Promise<ProductFilters>;
};

const ProductListingPage = async (props: ProductListingPage) => {
  const filters = await props.searchParams;
  const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
  const res = await getProducts({ ...filters, page });

  if (page > res.totalPages) notFound();
  if (filters.category && res.products.length === 0) notFound();

  return (
    <ProductsFeatureView
      paginatedProducts={res}
      activeCategory={filters.category ?? ""}
    />
  );
};

export default ProductListingPage;
