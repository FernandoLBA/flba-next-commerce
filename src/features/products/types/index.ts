export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  ratingstock: number;
  thumbnail: string;
}

export type ProductFilters = {
  category?: string;
  page?: number;
};
