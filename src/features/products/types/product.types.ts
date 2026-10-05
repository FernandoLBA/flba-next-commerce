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
