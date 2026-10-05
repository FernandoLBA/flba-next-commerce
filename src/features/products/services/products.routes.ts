export const productsRoutes = {
  PRODUCTS: {
    BASE: "/products",
    byProductId: (id: string) => `/products/${id}`,
    SEARCH: "/products/search",
  },
  CATEGORIES: {
    BASE: "/products/categories",
    byCategorySlug: (slug: string) =>
      `/products/category/${encodeURIComponent(slug)}`,
  },
};
