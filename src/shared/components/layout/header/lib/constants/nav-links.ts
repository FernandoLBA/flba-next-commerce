import { appMessages } from "@/shared/constants/app.messages";
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
  {
    label: appMessages.ABOUT.TITLE,
    url: appRoutes.ABOUT.BASE,
  },
] as const;
