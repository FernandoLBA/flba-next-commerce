import {
  getCategories,
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
  const categories = await getCategories();

  console.log("🚀 ~ ProductListingPage ~ page:", {page, total:res.totalPages})
  if (page > res.totalPages) notFound();
  console.log("🚀 ~ ProductListingPage ~ categories:", categories);

  return <ProductsFeatureView paginatedProducts={res} />;
};

export default ProductListingPage;
