export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  /** La API no lo envía en todos los productos (por ejemplo, groceries). */
  brand?: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus: string;
  sku: string;
  tags: string[];
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  reviews: ProductReview[];
  thumbnail: string;
  images: string[];
};

/** Lo que necesita el listado (se pide con `select=`, sin el detalle completo). */
export type ProductSummary = Pick<
  Product,
  | "id"
  | "title"
  | "category"
  | "brand"
  | "price"
  | "discountPercentage"
  | "rating"
  | "stock"
  | "thumbnail"
>;

export type ProductCategory = {
  slug: string;
  name: string;
  url: string;
};

export type ProductSortBy = "price" | "title" | "rating";

export type SortOrder = "asc" | "desc";

export type ProductFilters = {
  category?: string;
  q?: string;
  sortBy?: ProductSortBy;
  order?: SortOrder;
  page?: number;
  limit?: number;
};
