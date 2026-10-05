import { appMessages } from "@/shared/constants/app.messages";
import { Product } from "../../types/product.types";
import { ProductCard } from "../product-card/product-card";

type ProductListProps = {
  products: Product[];
  headingLevel?: 1 | 2;
  showHeading?: boolean;
};

export const ProductList = ({
  products,
  headingLevel = 2,
  showHeading = true,
}: ProductListProps) => {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <div className="w-full max-w-7xl">
      {showHeading && (
        <Heading className="typo-subtitle mb-8 self-start">
          {appMessages.PRODUCTS.TITLE}
        </Heading>
      )}

      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
