import {
  getProducts,
  type ProductFilters,
  ProductsFeatureView,
} from "@/features/products";

type ProductListingPage = {
  searchParams: Promise<ProductFilters>;
};

const ProductListingPage = async (props: ProductListingPage) => {
  const filters = await props.searchParams;
  const products = await getProducts(filters);

  return <ProductsFeatureView paginatedProducts={products} />;
};

export default ProductListingPage;
