import { appRoutes } from "@/shared/constants/app.routes";
import { cn } from "@/shared/utils/cn";
import { ShoppingCart } from "lucide-react";
import { ComponentProps } from "react";
import { AppLink } from "../app-link/app-link";

export const AppCartButton = ({
  onClick,
  className,
  ...props
}: ComponentProps<"a">) => {
  return (
    <AppLink
      className={cn("", className)}
      href={appRoutes.CART.BASE}
      onClick={onClick}
      {...props}
    >
      <ShoppingCart />
    </AppLink>
  );
};
