import { Product } from "../../types/product.types";
import { ProductCard } from "../product-card/product-card";

type ProductListProps = {
  products: Product[];
  /** 1 cuando la lista es lo principal de la página; 2 cuando es una sección. */
  headingLevel?: 1 | 2;
};

export const ProductList = ({ products, headingLevel = 2 }: ProductListProps) => {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <div className="w-full max-w-7xl">
      <Heading className="typo-subtitle mb-8 self-start">
        Nuestros productos
      </Heading>

      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
