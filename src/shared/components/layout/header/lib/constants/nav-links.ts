import { appRoutes } from "@/shared/constants/app.routes";

export const navLinks = [
  {
    label: "Inicio",
    url: appRoutes.HOME.BASE,
  },
  {
    label: "Productos",
    url: appRoutes.PRODUCTS.BASE,
  },
] as const;
