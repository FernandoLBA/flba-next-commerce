export const productsCache = {
  tags: {
    products: "products",
    categories: "categories",
    product: (id: string) => `product-${id}`,
  },
  //? Segundos: next.revalidate en el server y staleTime en el client
  revalidate: {
    list: 60,
    detail: 300,
    categories: 86_400, //? estas casi nunca cambian
  },
} as const;
