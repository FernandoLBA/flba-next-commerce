import { appRoutes } from "@/shared/lib";

export const navLinks = [
  {
    label: "Products",
    url: appRoutes.PRODUCTS.BASE,
  },
  {
    label: "Categories",
    url: "/categories",
  },
  {
    label: "Cart",
    url: appRoutes.CART.BASE,
  },
];
