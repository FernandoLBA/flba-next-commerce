export const appRoutes = {
  HOME: {
    BASE: "/",
  },
  PRODUCTS: {
    BASE: "/products",
    byId: (id: string) => `/products/${id}`,
    byCategory: (slug: string) =>
      `/products?category=${encodeURIComponent(slug)}`,
  },
  CART: {
    BASE: "/cart",
  },
  ABOUT: {
    BASE: "/about",
  },
  IMAGES: {
    BASE: "/images",
  },
};
