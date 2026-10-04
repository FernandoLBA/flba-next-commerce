import { appRoutes } from "@/shared/constants/app.routes";

export const navLinks = [
  {
    label: "Products",
    url: appRoutes.PRODUCTS.BASE,
  },
  {
    label: "ErrorPage",
    url: appRoutes.ERROR.BASE,
  },
  {
    label: "NotFoundPage",
    url: appRoutes.NOT_FOUND.BASE,
  },
] as const;
