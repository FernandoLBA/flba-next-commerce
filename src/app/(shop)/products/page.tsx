import { type ProductFilters, ProductsFeatureView } from "@/features/products";

type ProductListingPage = {
  searchParams: Promise<ProductFilters>;
};

const ProductListingPage = async (props: ProductListingPage) => {
  const filters = await props.searchParams;

  return (
    <>
      <ProductsFeatureView
        filters={{
          ...filters,
          page: Number(filters.page) > 0 ? Number(filters.page) : 1,
        }}
      />
    </>
  );
};

export default ProductListingPage;
