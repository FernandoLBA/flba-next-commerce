import { ProductsFeaturePage } from "@/features/products";
import { ProductFilters } from "@/features/products/types";

type ProductsFeaturePage = {
  searchParams: Promise<ProductFilters>;
};

const ProductsPage = async (props: ProductsFeaturePage) => {
  const params = await props.searchParams;

  return (
    <>
      <ProductsFeaturePage {...params} />
    </>
  );
};

export default ProductsPage;
