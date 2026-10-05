export { ProductCard } from "./components/product-card/product-card";
export { ProductJsonLd } from "./components/product-json-ld/product-json-ld";
export { ProductList } from "./components/product-list/product-list";
export { useProducts } from "./hooks/use-products";
export {
  getCategories,
  getProductById,
  getProducts,
} from "./services/products.service";
export type {
  Product,
  ProductCategory,
  ProductFilters,
  ProductReview,
  ProductSortBy,
  SortOrder,
} from "./types/product.types";
export {
  buildProductsHref,
  parseProductFilters,
} from "./utils/product-filters";
export { ProductDetailView } from "./views/product-detail-view";
export { ProductsFeatureView } from "./views/products-feature-view";
