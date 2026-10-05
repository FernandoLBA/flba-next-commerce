export const productsCache = {
  tags: {
    products: "products",
    categories: "categories",
    product: (id: string) => `product-${id}`,
  },
  revalidate: {
    list: 60,
    detail: 300,
    categories: 86_400,
  },
} as const;
