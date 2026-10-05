export const productsRoutes = {
  PRODUCTS: {
    BASE: "/products",
    byProductId: (id: string) => `/products/${id}`,
  },
  CATEGORIES: {
    BASE: "/products/categories",
    byCategorySlug: (slug: string) =>
      `/products/category/${encodeURIComponent(slug)}`,
  },
};
